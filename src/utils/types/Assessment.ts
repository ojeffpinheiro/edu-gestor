export interface Question {
    id: string;
    content: string;
    difficulty: 'easy' | 'medium' | 'hard';
    categories: string[];
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    points?: number;
    explanation?: string;
    correctAnswer?: string;
}

export type ExamModalType = 'create' | 'security' | 'variants' | null;

export interface EvaluationRubric {
    id: string;
    title: string;
    criteria: {
        id: string;
        description: string;
        weight: number;
        levels: {
            score: number;
            description: string;
        }[];
    }[];
}

export interface Exam {
    id?: string;
    title: string;
    description: string;
    questions: string[];
    classIds: string[];
    totalPoints: number;
    qrCode: string;
    useQRCode: boolean;
    barCode: string;
    useBarCode: boolean;
    password: string;
    requirePassword: boolean;
    startTime?: Date;
    endTime?: Date;
    timeLimit?: number;
    createdAt: Date;
    createdBy: string;
    questionDistribution: {
        categories: string[];
        difficulty: 'easy' | 'medium' | 'hard';
        count: number;
    }[];
    variants: string[];
}

export interface ExamResult {
    id: string;
    examId: string;
    studentId: string;
    answers: {
        questionId: string;
        answer: string;
        score: number;
    }[];
    totalScore: number;
    completedAt: Date;
}

export interface ExamSummary {
    id: string;
    title: string;
    totalStudents: number;
    averageScore: number;
    passingRate: number;
    highestScore: number;
    lowestScore: number;
    completionRate: number;
}

export interface StudentResult {
    studentId: string;
    studentName: string;
    examResults: ExamResult[];
    overallAverage: number;
    progressTrend: 'improving' | 'declining' | 'stable';
}

export interface ClassPerformance {
    classId: string;
    className: string;
    averageScore: number;
    passingRate: number;
    examResults: ExamSummary[];
}

export type TimeframeFilter = 'week' | 'month' | 'semester' | 'custom';

// Interface for enhanced exam result with student info
export interface EnhancedExamResult extends ExamResult {
    student?: {
      id: string;
      name: string;
      email?: string;
      classId?: string;
    };
    classId?: string;
  }

export  interface ReportSection {
    id: string;
    title: string;
    type: 'scores' | 'chart' | 'statistics' | 'comments' | 'questions';
    config: any;
}

export  interface ReportTemplate {
    id: string;
    name: string;
    description: string;
    type: 'individual' | 'class' | 'question' | 'summary';
    sections: ReportSection[];
}

export interface RiskFactor {
  id: string;
  description: string;
  weight: number;
  threshold: number;
}

export interface StudentRiskAssessment {
  studentId: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  mainFactors: RiskFactor[];
  lastUpdated: Date;
}

export interface PerformancePrediction {
  studentId: string;
  examId: string;
  predictedScore: number;
  confidence: number;
  keyImprovementAreas: string[];
  lastUpdated: Date;
}

export interface StudyRecommendation {
  id: string;
  studentId: string;
  category: string;
  resources: {
    type: 'material' | 'exercise' | 'video' | 'external';
    title: string;
    url?: string;
    description: string;
  }[];
  priority: 'low' | 'medium' | 'high';
  created: Date;
  completed?: boolean;
}

export interface TeacherAlert {
  id: string;
  type: 'risk' | 'performance' | 'participation' | 'behavior';
  studentId: string;
  classId: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  createdAt: Date;
  acknowledged: boolean;
  actionItems?: string[];
}