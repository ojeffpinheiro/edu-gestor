import { Assessment } from "../../types/evaluation/AssessmentEvaluation";
import { AttendanceRecord } from "../../types/academic/Attendance";
import { PriorityType } from "../../types/classroom/Team";

// Student Interface
export interface Student {
    id: number;
    name: string;
    email: string;
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

export interface StudentFormData {
    id?: number; // Identificador
    name: string; // Nome do aluno
    email: string; // E-mail do aluno
    attendance?: number; // Frequência do aluno
    birthDate?: string; // Data de nascimento do aluno
    className?: string; // Nome da turma do aluno
    rollNumber?: number; // Número de matrícula do aluno
    status?: string; // Status do aluno
    gender?: string; // Gênero do aluno
    specialNeeds: PriorityType | null; // Necessidades especiais do aluno
}