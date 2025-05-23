import { Question } from "./Question";
import { Resource } from "./Resource";

// Assessment Interface
export interface Assessment {
    id: string;
    title: string;
    subject: string;
    questions: Question[];
    instrument: string;
    grade: number;
}

// Student Score Interface
export interface StudentScore {
    studentId: string;
    toolId: string;
    score: number;
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

export interface RecoveryActivity {
    id: number;
    class: string;
    name: string;
    description: string;
    date: string;
    status: 'pending' | 'completed' | 'graded';
    targetStudents: number[]; // student IDs
    evaluationParts: {
        id: string;
        name: string;
        maxScore: number;
    }[];
}