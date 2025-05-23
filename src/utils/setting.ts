import { StudentData } from "./types/BasicUser";
import { Discipline } from "./types/DidacticSequence";

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
        {
          instrument: 'Prova Final', grade: 8.5,
          id: "",
          title: "",
          subject: "",
          questions: []
        },
    ],
    attendance: [
        { date: '2025-03-01', status: 'Presente' },
        { date: '2025-03-02', status: 'Ausente' },
        { date: '2025-03-03', status: 'Justificada' },
    ],
    comments: 'Aluno muito participativo e dedicado. Demonstra bom domínio do conteúdo e colabora nas atividades em grupo. Precisa melhorar pontualidade na entrega de trabalhos.',
};

export {SECTION_CONFIG, DEFAULT_STUDENT_DATA};

export const mockDiscipline: Discipline = {
  id: 'mat-fundamental-01',
  name: 'Matemática - Ensino Fundamental'
};

// Optional: If you want some initial mock data
export const mockInitialSequences = [
  {
    id: 'seq-mat-01',
    disciplineId: 'mat-fundamental-01',
    title: 'Introdução à Álgebra',
    description: 'Sequência didática para introduzir conceitos básicos de álgebra para alunos do 7º ano',
    grade: '7º ano',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'seq-mat-02',
    disciplineId: 'mat-fundamental-01',
    title: 'Geometria Plana',
    description: 'Exploração de formas geométricas e seus principais conceitos',
    grade: '8º ano',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const mockInitialStages = [
  {
    id: 'stage-mat-01',
    sequenceId: 'seq-mat-01',
    title: 'Variáveis e Expressões Algébricas',
    order: 1,
    learningObjectives: [
      'Compreender o conceito de variável',
      'Identificar expressões algébricas',
      'Resolver expressões simples'
    ]
  },
  {
    id: 'stage-mat-02',
    sequenceId: 'seq-mat-02',
    title: 'Formas Geométricas Básicas',
    order: 1,
    learningObjectives: [
      'Identificar formas geométricas planas',
      'Calcular área de figuras simples',
      'Diferenciar tipos de polígonos'
    ]
  }
];