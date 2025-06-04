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

export interface RubricLevel {
  score: number;
  description: string;
  examples?: string[]; // Exemplos de desempenho
}

export interface RubricCriteria {
  id: string;
  description: string;
  weight: number;
  levels: RubricLevel[];
  skillCategory?: string; // Categoria de habilidade associada
}

export interface EvaluationRubric {
  id: string;
  title: string;
  description?: string;
  criteria: RubricCriteria[];
  createdAt: Date;
  updatedAt: Date;
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
    skills?: Record<string, number>;
  }[];
  totalScore: number;
  completedAt: Date;
  metadata?: {
    timeSpent?: number; // Tempo gasto na prova (em minutos)
    attempts?: number; // Número de tentativas
  };
}

export interface ExamSummary {
  examId: string;
  title: string;
  subject: string;
  date: Date;
  totalStudents: number;
  averageScore: number;
  skillAverages?: Record<string, number>;
  passingRate: number;
  highestScore: number;
  lowestScore: number;
  completionRate: number;
  questionStatistics?: {
    easiestQuestion: string;
    hardestQuestion: string;
  };
  results?: ExamResult[];
}

export interface StudentResult {
  studentId: string;
  studentName: string;
  studentEmail?: string;
  classId: string;
  className?: string;
  examResults: ExamResult[];
  overallAverage: number;
  progressTrend: 'improving' | 'declining' | 'stable';
  attendanceRate?: number;
  skillProfile?: Record<string, number>;
  riskAssessment?: {
    level:  'low' | 'medium' | 'high' | 'critical';
    factors: string[];
  };
}

export type Subject = { 
  name: string;
  averageScore: number;
  schoolAverage: number;
 };

export interface ClassPerformance {
  classId: string;
  className: string;
  teacher?: string;
  academicPeriod?: string;
  averageScore: number;
  passingRate: number;
  examResults: ExamSummary[];
  studentCount: number;
  performanceTrend?: 'improving' | 'declining' | 'stable';
  skillBreakdown: Record<string, number>;
  subjects: Subject[];
  schoolAverage?: number;
  schoolSkillAverages?: number[];
  studentScores?: number[];
  schoolComparisons?: {
    name: string;
    averageScore: number;
    schoolAverage: number;
  }[];
  students: {
    id: string;
    name: string;
    email?: string;
    attendanceRate?: number;
    overallPercentile?: number;
    overallAverage?: number;
  }[];
  attendanceRate?: number;
  failingRate?: number;
  metrics?: {
    attendanceRate?: number;
    [key: string]: number | undefined;
  }
}

export type TimeframeFilter = 'week' | 'month' | 'semester' | 'custom';
export type ViewMode = 'overview' | 'class' | 'student' | 'questions';

export interface EnhancedExamResult extends ExamResult {
  student: {
    id: string;
    name: string;
    email?: string;
    classId: string;
    avatar?: string;
  };
  classId: string;
  examDetails?: {
    title: string;
    totalPoints: number;
    averageScore?: number;
  };
}

export interface ReportSection {
  id: string;
  title: string;
  type: 'scores' | 'chart' | 'statistics' | 'comments' | 'questions';
  config: any;
}

export interface ReportTemplate {
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

export interface ClassMetricsType {
  totalStudents: number;
  averageScore: number;
  passingRate: number;
  failingRate: number;
  frequentStudents: number;
  infrequentStudents: number;
  attendanceRate: number;
  failingStudents: number;
  failingStudentsChange?: number;
}

export type ChartTab = 'radar' | 'distribution' | 'progress';
export type ComparisonTab = 'ranking' | 'value-added' | 'equity';
export type TimeRange = 'week' | 'month' | 'quarter' | 'semester' | 'year';

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export interface InstitutionalGoalsTypes {
  averageScore: number; 
  passingRate: number; 
  attendanceRate: number
}