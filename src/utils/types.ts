// Student Interface
export interface Student {
    id: number;
    name: string;
    email: string;
}

// Event Interface
export interface Event {
    id: number;
    title: string;
    date: Date;
    type: 'activity' | 'assessment' | 'event';
    description: string;
}

// Event Filter Interface
export interface EventFilter {
    type?: 'activity' | 'assessment' | 'event' | 'all';
    startDate?: Date;
    endDate?: Date;
}

// Button Variants
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

// Attendance Status Types
export type AttendanceStatus = 'Presente' | 'Ausente' | 'Justificada';

// Attendance Record Interface
export interface AttendanceRecord {
    date: string;
    status: AttendanceStatus;
}

// Assessment Interface
export interface Assessment {
    instrument: string;
    grade: number;
}

// Student Data Interface
export interface StudentData {
    id: string; // Unique identifier for the student
    name: string;
    email: string;
    assessments: Assessment[];
    attendance: AttendanceRecord[];
    comments: string;
}

// Export Options Interface
export interface ExportOptions {
    includeGrades: boolean;
    includeAttendance: boolean;
    includeComments: boolean;
}

// Student Modal Props Interface
export interface StudentModalProps {
    studentData?: StudentData; // Optional student data
    isLoading?: boolean; // Loading indicator
    onClose: () => void; // Callback to close the modal
    onExport?: (studentId: string, exportOptions: ExportOptions) => void; // Optional export callback
    onError?: (error: Error) => void; // Error handling callback
}

// Report Interface
export interface Report {
    checked: boolean;
    onChange: () => void;
    label: string;
    disabled?: boolean;
}

// Collapsible Props Interface
export interface CollapsibleProps {
    title: string;
    initiallyExpanded?: boolean;
    sectionColor: string;
    includeInReport: boolean;
    onToggleInclude: () => void;
    disableToggle?: boolean;
    children: React.ReactNode;
}

// Group Formation Types Enum
export enum GroupFormationType {
    BY_SIZE = 'bySize',
    BY_NUMBER = 'byNumber'
}

// Formation Configuration Constants
export const FORMATION_CONFIG = {
    MIN_GROUP_SIZE: 2,
    MIN_GROUPS: 1,
    DEFAULT_PROCESSING_DELAY: 600
};

// Group Formation Modal Props Interface
export interface GroupFormationModalProps {
    students: StudentAttendance[]; // List of available students
    onClose: () => void; // Callback when the modal is closed
    onSave?: (groups: Student[][]) => void; // Optional save function for formed groups
    processingDelay?: number; // Simulation processing time in ms
}

// Group Formation State Interface
export interface GroupFormationState {
    groupSize: number;
    numberOfGroups: number;
    formationType: GroupFormationType;
}

// Feedback State Interface
export interface FeedbackState {
    errorMessage: string;
    successMessage: string;
    isProcessing: boolean;
    showResults: boolean;
    hasUnsavedChanges: boolean;
}

// Evaluation Part Interface
export interface EvaluationPart {
    id: string;
    name: string;
    weight: number;
    maxScore: number;
}

// Evaluation Tool Interface
export interface EvaluationTool {
    id: string;
    name: string;
    partId: string;
    weight: number;
    maxScore: number;
}

// Student Score Interface
export interface StudentScore {
    studentId: string;
    toolId: string;
    score: number;
}

// Student Attendance Interface
export interface StudentAttendance {
    id: number;
    name: string;
    email: string;
    attendance: number;
}

export enum EvaluationType {
    PROVA = "PROVA",
    TRABALHO = "TRABALHO",
    PROJETO = "PROJETO",
    APRESENTACAO = "APRESENTACAO",
    OUTRO = "OUTRO"
}

export enum EvaluationStatus {
    RASCUNHO = "RASCUNHO",
    PLANEJADA = "PLANEJADA",
    AGENDADA = "AGENDADA",
    APLICADA = "APLICADA",
    CORRIGIDA = "CORRIGIDA",
    FINALIZADA = "FINALIZADA",
    CANCELADA = "CANCELADA"
}


/**
 * Interface para representar um recurso
 */
export interface Resource {
    id?: number;
    name: string;
    quantity?: number;
}

// Evaluation Interface
export interface Evaluation {
    id: number;
    name: string;
    trimester: number;
    passingGrade: number;
    formula: string;
    parts: EvaluationPart[];
    tools: EvaluationTool[];
    school: string;
    series: string;
    class: string;
    objective: string;
    contents: string;
    evaluationCriteria: string;
    subject: string;
    record: string;
    applicationDate: string | number | Date;
    type: EvaluationType | string;
    status: EvaluationStatus | string;
    resources: Resource[] | string[];
    evaluationMethod?: string;
    calculationMethod?: string;
}

export interface EvaluationPart {
    id: string;
    name: string;
    weight: number;
    maxScore: number;
}

// Interfaces para o formulário
export interface EvaluationFormProps {
    evaluation: Evaluation | null;
    onSave: (evaluation: Evaluation) => Promise<void>;
    onClose: () => void;
}

export interface FormFeedback {
    errorMessage?: string;
    successMessage?: string;
    hasChanges: boolean;
}

export enum FormSectionOptions {
    BASIC_INFO = "Definições Básicas",
    RESOURCES = "Recursos",
    PARTS = "Partes",
    EVALUATION_CRITERIA = "Critérios de Avaliação",
    EVALUATION_METHOD = "Forma de Avaliação",
    CALCULATION = "Cálculo"
}

export enum SequenceFormOptions {
    BASIC_INFO = 'Definições básicas',
    OBJECTIVES = 'Objetivos',
    SKILLS = 'Habilidades',
    BNCC_CODES ='Códigos BNCC',
    STAGES = 'Fases'
}

export interface RubricOrConcept {
    id: string;
    name: string;
    description: string;
}

export interface CriterionOption {
    id: string;
    description: string;
}

export interface EvaluationCriterion {
    id: string;
    name: string;
    weight: number;
    options: CriterionOption[];
    comment: string;
    isExpanded: boolean;
}

export interface EvaluationCriteria {
    id: string;
    name: string;
    description: string;
    weight: number;
}

// Types for Didactic Sequences

// src/utils/types.ts
export interface Discipline {
    id: string;
    name: string;
  }
  
  export interface DidacticSequence {
    id: string;
    disciplineId: string;
    title: string;
    description: string;
    grade: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface DidacticSequenceStage {
    id: string;
    sequenceId: string;
    title: string;
    learningObjectives: string[];
    order: number;
  }
  
  export interface ContentSection {
    id: string;
    stageId: string;
    type: 'text' | 'example' | 'solved-exercise' | 'exercise-list';
    content: string;
    explanation?: string;
    order: number;
  }
  
  export interface Exercise {
    id: string;
    contentSectionId: string;
    question: string;
    solution?: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }