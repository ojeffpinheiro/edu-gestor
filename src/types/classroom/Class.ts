/**
 * Interface para os dados de turma
 */
export interface ClassData {
    id: number;
    name: string;
    description: string;
    subject?: string;
    grade?: string;
    studentsCount?: number;
    shift?: string;
    color?: string;
    createdAt?: string;
}

/**
 * Interface para os filtros aplicados
 */
export interface ClassFilters {
    subject: string;
    grade: string;
    shift: string;
}