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
    id: string;
    title: string;
    description: string;
    questions: string[];
    classIds: string[];
    totalPoints: number;
    qrCode: string;
    barCode: string;
    password: string;
    createdAt: Date;
    createdBy: string;
    questionDistribution: {
        categories: string[];
        difficulty: 'easy' | 'medium' | 'hard';
        count: number;
    }[];
    useQRCode: boolean;
    useBarCode: boolean;
    requirePassword: boolean;
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