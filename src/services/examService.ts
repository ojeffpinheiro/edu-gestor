import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { encryptData } from './encryptionService';

import BarCodeGenerator from '../utils/barCodeGenerator';
import ExamPdfGenerator from '../utils/examPdfGenerator';
import QRCodeService from '../utils/qrCodeGenerator';

import { ClassPerformance, Exam, ExamResult, ExamSummary, StudentResult, TimeframeFilter } from '../utils/types/Assessment';

// Interface for exam creation
interface CreateExamData {
  title: string;
  description: string;
  questions: string[];
  classIds: string[];
  totalPoints: number;
  password?: string;
  questionDistribution?: {
    categories: string[];
    difficulty: 'easy' | 'medium' | 'hard';
    count: number;
  }[];
}

// Interface for API response
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Interface for publish options
interface PublishOptions {
  sendEmails: boolean;
  scheduledDate?: Date;
  accessDuration: number; // in minutes
  allowRetake: boolean;
}

// Interface for variant configuration
interface VariantConfig {
  numVariants: number;
  shuffleQuestions: boolean;
  shuffleOptions?: boolean; // For questions with options
}

// API base URL - should be configured by environment
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.classroom-system.com';

const { generateExamPdf } = ExamPdfGenerator;
const { generateExamBarCode } = BarCodeGenerator;
const { createQRCodeComponent } = QRCodeService;

/**
 * Service for exam management
 */
const examService = {
  /**
   * Fetches all exams created by the current user
   */
  async getAllExams(): Promise<ApiResponse<Exam[]>> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('User not authenticated');

      const response = await axios.get(`${API_BASE_URL}/exams`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching exams:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error while fetching exams'
      };
    }
  },

  /**
   * Fetches a specific exam by ID
   */
  async getExamById(id: string): Promise<ApiResponse<Exam>> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('User not authenticated');

      const response = await axios.get(`${API_BASE_URL}/exams/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error(`Error fetching exam ${id}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error while fetching exam'
      };
    }
  },

  /**
   * Creates a new exam
   */
  async createExam(examData: CreateExamData): Promise<ApiResponse<Exam>> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('User not authenticated');

      const decodedToken = jwtDecode<{ sub: string }>(token);
      const userId = decodedToken.sub;

      // Generate QR code and barcode for identification
      const qrCode = await createQRCodeComponent(JSON.stringify({
        examId: 'temp-id', // Will be replaced with the real ID after creation
        createdBy: userId,
        timestamp: new Date().toISOString()
      }));

      const barCode = await generateExamBarCode('temp-id'); // Will be updated after creation

      // Generate password for the exam if not provided
      const password = examData.password ||
        Math.random().toString(36).substring(2, 8).toUpperCase();

      // Encrypt password for storage
      const encryptedPassword = await encryptData(password);

      const examToCreate: Partial<Exam> = {
        ...examData,
        qrCode,
        barCode,
        password: encryptedPassword,
        createdAt: new Date(),
        createdBy: userId,
        useQRCode: true,
        useBarCode: true,
        requirePassword: !!examData.password
      };

      const response = await axios.post(`${API_BASE_URL}/exams`, examToCreate, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update QR code and barcode with the real ID
      const createdExam = response.data;
      const updatedQRCode = await createQRCodeComponent(JSON.stringify({
        examId: createdExam.id,
        createdBy: userId,
        timestamp: createdExam.createdAt
      }));

      const updatedBarCode = await generateExamBarCode(createdExam.id);

      // Update exam with correct QR code and barcode
      const updatedExam = await axios.patch(`${API_BASE_URL}/exams/${createdExam.id}`,
        { qrCode: updatedQRCode, barCode: updatedBarCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return { success: true, data: updatedExam.data };
    } catch (error) {
      console.error('Error creating exam:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error while creating exam'
      };
    }
  },

  /**
   * Updates an existing exam
   */
  async updateExam(id: string, examData: Partial<Exam>): Promise<ApiResponse<Exam>> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('User not authenticated');

      // Avoid updating sensitive fields
      const { createdAt, createdBy, ...updatableData } = examData;

      const response = await axios.put(`${API_BASE_URL}/exams/${id}`, updatableData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error(`Error updating exam ${id}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error while updating exam'
      };
    }
  },

  /**
   * Deletes an exam
   */
  async deleteExam(id: string): Promise<ApiResponse<void>> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('User not authenticated');

      await axios.delete(`${API_BASE_URL}/exams/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return { success: true };
    } catch (error) {
      console.error(`Error deleting exam ${id}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error while deleting exam'
      };
    }
  },

  /**
   * Publishes an exam to selected classes
   */
  async publishExam(id: string, options: PublishOptions): Promise<ApiResponse<boolean>> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('User not authenticated');

      // Fetch the exam to verify linked classes
      const examResponse = await axios.get(`${API_BASE_URL}/exams/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const exam = examResponse.data;

      if (!exam.classIds || exam.classIds.length === 0) {
        throw new Error('The exam has no linked classes for publication');
      }

      // Prepare publication data
      const publishData = {
        examId: id,
        classIds: exam.classIds,
        ...options
      };

      // Call publication endpoint
      const response = await axios.post(`${API_BASE_URL}/exams/publish`, publishData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error(`Error publishing exam ${id}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error while publishing exam'
      };
    }
  },

  /**
   * Generates variants of an exam (different versions with shuffled questions)
   */
  async generateVariants(id: string, config: VariantConfig): Promise<ApiResponse<Exam[]>> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('User not authenticated');

      // Fetch the original exam
      const examResponse = await axios.get(`${API_BASE_URL}/exams/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const originalExam = examResponse.data;

      // Prepare data for variant generation
      const variantData = {
        originalExamId: id,
        ...config
      };

      // Call variant generation endpoint
      const response = await axios.post(`${API_BASE_URL}/exams/variants`, variantData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error(`Error generating variants for exam ${id}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error while generating variants'
      };
    }
  },

  /**
   * Generates a PDF of an exam for printing
   */
  async generateExamPDF(id: string, includeAnswers: boolean = false): Promise<ApiResponse<Blob>> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('User not authenticated');

      // Fetch the exam
      const examResponse = await this.getExamById(id);

      if (!examResponse.success || !examResponse.data) {
        throw new Error('Failed to fetch exam data');
      }

      const exam = examResponse.data;

      // Fetch question details - assuming there's a question service
      const questionsResponse = await axios.post(
        `${API_BASE_URL}/questions/batch`,
        { ids: exam.questions },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const questions = questionsResponse.data;

      // Generate PDF using the PDF generation utility
      // Use static method directly
      const defaultOptions = includeAnswers
        ? { ...ExamPdfGenerator.getDefaultExamPdfOptions(), ...ExamPdfGenerator.getDefaultAnswerKeyPdfOptions() }
        : ExamPdfGenerator.getDefaultExamPdfOptions();

      const pdfBuffer = await ExamPdfGenerator.generateExamPdf(
        exam,
        questions,
        defaultOptions
      );
      const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

      return { success: true, data: pdfBlob };
    } catch (error) {
      console.error(`Error generating PDF for exam ${id}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error while generating PDF'
      };
    }
  },

  /**
   * Distributes an exam to specific students (beyond classes)
   */
  async distributeToStudents(id: string, studentIds: string[]): Promise<ApiResponse<boolean>> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('User not authenticated');

      const distributionData = {
        examId: id,
        studentIds
      };

      const response = await axios.post(
        `${API_BASE_URL}/exams/distribute`,
        distributionData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return { success: true, data: response.data };
    } catch (error) {
      console.error(`Error distributing exam ${id} to students:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error while distributing exam'
      };
    }
  },

  /**
   * Activates or deactivates a published exam
   */
  async toggleExamActivation(id: string, activate: boolean): Promise<ApiResponse<boolean>> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('User not authenticated');

      const endpoint = activate ? 'activate' : 'deactivate';

      const response = await axios.post(
        `${API_BASE_URL}/exams/${id}/${endpoint}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return { success: true, data: response.data };
    } catch (error) {
      const action = activate ? 'activate' : 'deactivate';
      console.error(`Error trying to ${action} exam ${id}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : `Unknown error while trying to ${action} exam`
      };
    }
  },

  /**
   * Gets access statistics for an exam
   */
  async getExamAccessStatistics(id: string): Promise<ApiResponse<ExamSummary>> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('User not authenticated');

      const response = await axios.get(
        `${API_BASE_URL}/exams/${id}/statistics`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return { success: true, data: response.data };
    } catch (error) {
      console.error(`Error getting statistics for exam ${id}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error while getting statistics'
      };
    }
  },
  
  /**
 * Gets exam results based on specified filters
 */
  async getExamResults({ timeframe, classId, examId }: {
    timeframe: TimeframeFilter,
    classId?: string,
    examId?: string
  }): Promise<ApiResponse<ExamResult[]>> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('User not authenticated');

      // Build query parameters
      const params = new URLSearchParams();
      params.append('timeframe', timeframe);
      if (classId) params.append('classId', classId);
      if (examId) params.append('examId', examId);

      const url = `${API_BASE_URL}/exam-results?${params.toString()}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching exam results:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error while fetching exam results'
      };
    }
  },

  /**
   * Gets results for a specific student
   */
  async getStudentResults(studentId: string, timeframe: TimeframeFilter = 'semester'): Promise<ApiResponse<StudentResult>> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('User not authenticated');

      const url = `${API_BASE_URL}/students/${studentId}/results?timeframe=${timeframe}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error(`Error fetching results for student ${studentId}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error while fetching student results'
      };
    }
  },

  /**
   * Gets performance metrics for a class
   */
  async getClassPerformance(classId: string, timeframe: TimeframeFilter = 'semester'): Promise<ApiResponse<ClassPerformance>> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('User not authenticated');

      const url = `${API_BASE_URL}/classes/${classId}/performance?timeframe=${timeframe}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      return { success: true, data: response.data };
    } catch (error) {
      console.error(`Error fetching performance for class ${classId}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error while fetching class performance'
      };
    }
  }
};

export default examService;