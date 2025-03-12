import { StudentData } from "./types";

const SECTION_CONFIG = {
    GRADES: {
        color: 'var(--color-background-third)',
        title: 'Notas',
        key: 'includeGrades',
        initiallyExpanded: true,
        emptyMessage: 'Nenhuma avaliação registrada para este aluno.'
    },
    ATTENDANCE: {
        color: 'var(--color-background-secondary)',
        title: 'Frequência',
        key: 'includeAttendance',
        initiallyExpanded: false,
        emptyMessage: 'Nenhum registro de frequência disponível para este aluno.'
    },
    COMMENTS: {
        color: 'var(--color-background-third)',
        title: 'Observações',
        key: 'includeComments',
        initiallyExpanded: false,
        emptyMessage: 'Nenhuma observação registrada para este aluno.'
    }
};

const DEFAULT_STUDENT_DATA: StudentData = {
    id: 'default-123',
    name: 'Ana Souza',
    email: 'ana@exemplo.com',
    assessments: [
        { instrument: 'Prova Final', grade: 8.5 },
        { instrument: 'Trabalho', grade: 9 },
    ],
    attendance: [
        { date: '2025-03-01', status: 'Presente' },
        { date: '2025-03-02', status: 'Ausente' },
        { date: '2025-03-03', status: 'Justificada' },
    ],
    comments: 'Aluno muito participativo e dedicado. Demonstra bom domínio do conteúdo e colabora nas atividades em grupo. Precisa melhorar pontualidade na entrega de trabalhos.',
};

export {SECTION_CONFIG, DEFAULT_STUDENT_DATA};