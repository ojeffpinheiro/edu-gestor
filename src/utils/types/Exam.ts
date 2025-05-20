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
    description: string; // Descrição adicional sobre o exame
    discipline: string;
    topicId: string; // Identificador do tópico específico da prova (relacionado ao conteúdo).
    documentType: ExamTypes | string; // Tipo da prova (diagnóstica, somativa, simulados etc).
    status: string; // Status do exame (ativo, inativo, concluído etc).

    // Configurações do exame
    totalQuestions: number; // Número total de questões do exame.
    totalPoints: number; // Número total de pontos do exame.
    questions: Question[]; // Lista de objetos Question usados na prova.
    questionDistribution: DifficultyDistribution[]; // Dados de distribuição de questões por dificuldade.
    selectionMode: 'manual' | 'random'; // Modo de seleção de questões (manual ou randomizado).
    instructions: string[]; // Instruções exibidas ao aluno (ex: “não usar calculadora”).
    questionLayout: 'grid' | 'list'; // Layout das questões (grid ou list).
    shuffleQuestions: boolean; // Se as questões devem ser embaralhadas.
    shuffleAlternatives: boolean; // Se as alternativas devem ser embaralhadas.

    // Configurações visuais do cabeçalho
    schoolInfos?: string[]; // Informações da escola
    schoolName: string; // Nome da escola
    headerStyle: 'standard' | 'simplified' | 'custom'; // Estilo do cabeçalho (padrão, simplificado ou personalizado)
    headerTitle: string; // Título principal do cabeçalho (ex: “Avaliação Final”).
    headerSubtitle: string; // Subtítulo do cabeçalho (ex: “Disciplina: Matemática”)
    customHeaderImage: File | string | null; // Imagem personalizada do cabeçalho (opcional)
    institutionLogo: File | null; // Logo da instituição (opcional)

    // Visibilidade de elementos
    showAnswerGrid: boolean; // Se a grade de respostas deve ser exibida.
    showStudentName: boolean; // Se o nome do aluno deve ser exibido.
    showStudentId: boolean; // Se o ID do aluno deve ser exibido.
    showDate: boolean; // Se a data da prova deve ser exibida.
    showGrade: boolean; // Se Exibe campo para nota
    withGradeSpace: boolean; // Se o espaço para nota deve ser exibido.

    // Segurança
    isPublic: boolean; // Se o exame é público ou privada.
    requirePassword: boolean; // Se o exame requer senha para acesso.
    password: string; // Senha do exame (opcional)
    accessCode: string; // Código de acesso do exame (opcional)
    useBarCode: boolean; // Se o código de barras deve ser exibido.

    // Correção e identificação
    correctionType: CorrectionType; // Tipo de correção (auto, manual, etc).
    identificationMethod: IdentificationMethod; // Método de identificação (auto, manual, etc).

    // Aplicação
    applicationDate: Date; // Data de aplicação do exame.
    classIds: number[]; // IDs das turmas que farão o exame.
    grade: number; // Série escolar (ex: 6, 7, 9).

    // Variantes
    variants: string[]; // Gera diferentes versões da prova (ex: A, B, C).

    // Metadados
    createdAt: Date; // Data de criação do exame.
    updatedAt: Date; // Data de atualização do exame.
    createdBy: string; // Nome do usuário que criou o exame.
    updatedBy: string; // Nome do usuário que atualizou o exame.

    preventCopying?: boolean; // Se o exame pode ser copiado.

    showQuestionNumber: boolean;
    showQuestionTypeIndicator: boolean;
    compactMode: boolean; // Para reduzir espaçamento
    fontFamily: 'serif' | 'sans-serif' | 'monospace';
    fontSize: 'small' | 'medium' | 'large';
}