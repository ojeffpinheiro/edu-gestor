import { FaBook, FaBrain, FaEye, FaUsers } from "react-icons/fa";
import { FiAlertTriangle, FiTarget } from "react-icons/fi";

export type LayoutConfig = {
  rows: number;
  columns: number;
  seats: SeatType[];
};

export interface SeatType {
  id: string;
  studentId?: number;
  position: {
    row: number;
    column: number;
  };
  priority?: PriorityType | null;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastVerified?: string;
  verifications?: DailyVerification[];
}

export type PriorityInfo = {
  label: string;
  color: string;
  icon: string;
}

export type PriorityType =
  | 'low_vision'           // Baixa visão
  | 'intellectual_disability' // Deficiência intelectual
  | 'learning_difficulty'  // Dificuldade de aprendizagem
  | 'good_pair'           // Dupla que funciona bem
  | 'attention_required'   // Necessita atenção especial
  | 'behavioral_support';  // Suporte comportamental

export interface PriorityConfig {
  label: string;
  color: string;
  icon: React.ComponentType<{ size?: number, color?: string }>;
  description: string;
}

export const PRIORITY_CONFIGS: Record<PriorityType, PriorityConfig> = {
  low_vision: {
    label: 'Baixa Visão',
    color: '#ff9800',
    icon: FaEye,
    description: 'Aluno com baixa visão - necessita assento próximo ao quadro'
  },
  intellectual_disability: {
    label: 'Deficiência Intelectual',
    color: '#9c27b0',
    icon: FaBrain,
    description: 'Aluno com deficiência intelectual - necessita suporte adicional'
  },
  learning_difficulty: {
    label: 'Dificuldade de Aprendizagem',
    color: '#f44336',
    icon: FaBook,
    description: 'Aluno com dificuldades de aprendizagem'
  },
  good_pair: {
    label: 'Dupla Eficiente',
    color: '#4caf50',
    icon: FaUsers,
    description: 'Dupla de alunos que trabalha bem em conjunto'
  },
  attention_required: {
    label: 'Atenção Especial',
    color: '#ff5722',
    icon: FiAlertTriangle,
    description: 'Aluno que necessita atenção especial'
  },
  behavioral_support: {
    label: 'Suporte Comportamental',
    color: '#607d8b',
    icon: FiTarget,
    description: 'Aluno que necessita suporte comportamental'
  }
};

export type SeatStatus =
  | 'empty'
  | 'excellent'  // >= 90%
  | 'good'       // >= 75%
  | 'warning'    // >= 60%
  | 'critical';  // < 60%

export interface ClassroomLayout {
  id: number;
  name: string;
  rows: number;
  columns: number;
  seats: SeatType[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SeatArrangement {
  layoutId: number;
  seats: SeatType[];
  verificationStatus: 'pending' | 'verified' | 'needs_review';
  lastVerified?: Date;
  verifiedBy?: number; // userId
}

export interface DailyVerification {
  date: string;
  verifiedSeats: string[];
  mismatchedSeats?: string[];
  totalStudents?: number;
}