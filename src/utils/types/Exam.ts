import { Question } from "./Question";

/**
 * Enum para os possíveis tipos de documento
 */
export enum ExamTypes {
    Exam = 'exam',        // Prova
    Simulation = 'simulation', // Simulado
    Worksheet = 'worksheet',   // Lista de exercícios
    Assignment = 'assignment'  // Trabalho
}

/**
 * Enum para os estágios do fluxo de criação do exame
 */
export enum ExamStep {
    Settings = 1,
    QuestionSelection = 2,
    Security = 3,
    Preview = 4
}

/**
 * Enum para os possíveis estados de um exame
 */
export enum ExamStatus {
    Draft = 'draft',
    Published = 'published',
    Archived = 'archived',
    Deleted = 'deleted'
}

/**
 * Tipo para métodos de correção de exames
 */
export type CorrectionType = 'manual' | 'automatic';

/**
 * Tipo para métodos de identificação de alunos
 */
export type IdentificationMethod = 'manual' | 'barcode' | 'qrcode';

/**
 * Interface para distribuição de questões por dificuldade
 */
export interface DifficultyDistribution {
    difficulty: string;
    count: number;
    selected: number;
}

/**
 * Interface para armazenar um item de validação
 */
export interface ValidationItem {
    field: string;
    message: string;
}

/**
 * Interface para armazenar resultado de validação
 */
export interface ValidationResult {
    valid: boolean;
    errors: ValidationItem[];
}

/**
 * Interface principal para o tipo Exam
 */
export interface Exam {
    // Identificação do exame
    id: number;
    uuid?: string;
    title: string;
    description: string;
    discipline: string;
    topicId: string;
    documentType: ExamTypes | string;
    status: string;

    // Configurações do exame
    totalQuestions: number;
    totalPoints: number;
    questions: Question[];
    questionDistribution: DifficultyDistribution[];
    selectionMode: 'manual' | 'random';
    instructions: string[];
    questionLayout: 'grid' | 'list';
    shuffleQuestions: boolean;
    shuffleAlternatives: boolean;

    // Configurações visuais do cabeçalho
    schoolName: string;
    schoolSubtitle: string;
    headerTitle: string;
    headerSubtitle: string;
    institutionLogo: File | null;

    // Visibilidade de elementos
    showAnswerGrid: boolean;
    showStudentName: boolean;
    showStudentId: boolean;
    showDate: boolean;
    showGrade: boolean;
    withGradeSpace: boolean;

    // Segurança
    isPublic: boolean;
    requirePassword: boolean;
    password: string;
    accessCode: string;
    useBarCode: boolean;

    // Correção e identificação
    correctionType: CorrectionType;
    identificationMethod: IdentificationMethod;

    // Aplicação
    applicationDate: Date;
    classIds: number[];
    grade: number;

    // Variantes
    variants: string[]; // Variantes para gerar provas diferentes

    // Metadados
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
}