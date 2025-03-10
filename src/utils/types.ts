export interface Student {
  id: number;
  name: string;
  email: string;
}

export interface Event {
  id: number;
  title: string;
  date: Date;
  type: 'activity' | 'assessment' | 'event';
  description: string;
}

export interface EventFilter {
  type?: 'activity' | 'assessment' | 'event' | 'all';
  startDate?: Date;
  endDate?: Date;
}


export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

/**
 * Tipos de status de frequência disponíveis
 */
export type AttendanceStatus = 'Presente' | 'Ausente' | 'Justificada';

/**
 * Interface para representar um registro de frequência
 */
export interface AttendanceRecord {
    date: string;
    status: AttendanceStatus;
}

/**
 * Interface para representar uma avaliação
 */
export interface Assessment {
    instrument: string;
    grade: number;
}

/**
 * Interface para representar um estudante
 */
export interface StudentData {
    id: string;           // Adicionado ID do aluno para identificação única
    name: string;
    email: string;
    assessments: Assessment[];
    attendance: AttendanceRecord[];
    comments: string;
}

export interface ExportOptions {
    includeGrades: boolean;
    includeAttendance: boolean;
    includeComments: boolean;
}

/**
 * Propriedades do componente ModalAluno
 */
export interface StudentModalProps {
    studentData?: StudentData;     // Dados do aluno (opcional)
    isLoading?: boolean;           // Indicador de carregamento
    onClose: () => void;           // Callback para fechar o modal
    onExport?: (studentId: string, exportOptions: ExportOptions) => void; // Callback opcional para exportação
    onError?: (error: Error) => void; // Callback para tratamento de erros
}

export interface Report {
    checked: boolean;
    onChange: () => void;
    label: string;
    disabled?: boolean;
}

export interface CollapsibleProps {
    title: string;
    initiallyExpanded?: boolean;
    sectionColor: string;
    includeInReport: boolean;
    onToggleInclude: () => void;
    disableToggle?: boolean;
    children: React.ReactNode;
}

/**
 * Tipos de formação de grupos disponíveis
 */
export enum GroupFormationType {
    BY_SIZE = 'bySize',
    BY_NUMBER = 'byNumber'
}

/**
 * Constantes para configuração do componente
 */
export const FORMATION_CONFIG = {
    MIN_GROUP_SIZE: 2,
    MIN_GROUPS: 1,
    DEFAULT_PROCESSING_DELAY: 600
};

/**
 * Props interface para o componente GroupFormationModal
 */
export interface GroupFormationModalProps {
    /** Lista de estudantes disponíveis para formar grupos */
    students: Student[];
    /** Função chamada quando o modal é fechado */
    onClose: () => void;
    /** Função opcional para salvar os grupos formados */
    onSave?: (groups: Student[][]) => void;
    /** Tempo de simulação do processamento em ms (para fins de teste) */
    processingDelay?: number;
}

/**
 * Interface para o estado do formulário de formação de grupos
 */
export interface GroupFormationState {
    groupSize: number;
    numberOfGroups: number;
    formationType: GroupFormationType;
}

/**
 * Interface para o estado de feedback do modal
 */
export interface FeedbackState {
    errorMessage: string;
    successMessage: string;
    isProcessing: boolean;
    showResults: boolean;
    hasUnsavedChanges: boolean;
}