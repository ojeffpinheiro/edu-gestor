// src/mocks/assessmentData.ts

import { Question, Exam, EvaluationRubric, ExamResult, ReportTemplate } from '../utils/types/Assessment';

export const mockQuestions: Question[] = [
  {
    id: '1',
    content: 'Qual é a capital do Brasil?',
    difficulty: 'easy',
    categories: ['Geografia', 'Brasil'],
    createdBy: 'professor1',
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-01-15'),
    explanation: 'Brasília é a capital federal do Brasil desde 21 de abril de 1960.',
    correctAnswer: 'Brasília',
  },
  {
    id: '2',
    content: 'Quais são os três princípios fundamentais da Programação Orientada a Objetos?',
    difficulty: 'medium',
    categories: ['Programação', 'POO'],
    createdBy: 'professor1',
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-02-05'),
    explanation: 'Os três princípios fundamentais da POO são Encapsulamento, Herança e Polimorfismo.',
    correctAnswer: 'Encapsulamento, Herança e Polimorfismo',
  },
  {
    id: '3',
    content: 'Explique o conceito de DNA e sua função nos organismos vivos.',
    difficulty: 'hard',
    categories: ['Biologia', 'Genética'],
    createdBy: 'professor2',
    createdAt: new Date('2023-02-10'),
    updatedAt: new Date('2023-02-10'),
    explanation: 'O DNA é uma molécula que contém as instruções genéticas para o desenvolvimento e funcionamento de todos os organismos vivos.',
    correctAnswer: 'DNA é o material genético que carrega informações hereditárias...',
  },
  {
    id: '4',
    content: 'Resolva a equação: 2x² + 5x - 3 = 0',
    difficulty: 'medium',
    categories: ['Matemática', 'Álgebra'],
    createdBy: 'professor3',
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2023-03-02'),
    explanation: 'Usando a fórmula de Bhaskara: x = (-5 ± √(25+24))/4 = (-5 ± √49)/4 = (-5 ± 7)/4',
    correctAnswer: 'x = 0.5 ou x = -3',
  },
  {
    id: '5',
    content: 'O que foi a Revolução Industrial e quais seus principais impactos?',
    difficulty: 'medium',
    categories: ['História', 'Economia'],
    createdBy: 'professor4',
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-03-15'),
    explanation: 'A Revolução Industrial foi um período de grandes mudanças tecnológicas e sociais que começou na Grã-Bretanha no século XVIII.',
    correctAnswer: 'A Revolução Industrial foi um processo de mecanização...',
  },
];


export const mockExams: Exam[] = [
  {
    id: 'exam1',
    title: 'Prova Trimestral de Geografia',
    description: 'Avaliação do primeiro trimestre cobrindo os tópicos de geografia mundial',
    questions: ['1', '5'],
    classIds: ['class1', 'class2'],
    totalPoints: 10,
    qrCode: 'data:image/svg+xml;base64,...',
    barCode: 'data:image/svg+xml;base64,...',
    password: 'GEO2023',
    createdAt: new Date('2023-04-01'),
    createdBy: 'professor1',
    questionDistribution: [
      {
        categories: ['Geografia'],
        difficulty: 'medium',
        count: 2
      }
    ],
    useQRCode: true,
    useBarCode: true,
    requirePassword: true,
    variants: []
  },
  {
    id: 'exam2',
    title: 'Avaliação Final de Programação',
    description: 'Prova final sobre conceitos de programação e algoritmos',
    questions: ['2', '4'],
    classIds: ['class3'],
    totalPoints: 20,
    qrCode: 'data:image/svg+xml;base64,...',
    barCode: 'data:image/svg+xml;base64,...',
    password: 'PROG2023',
    createdAt: new Date('2023-04-15'),
    createdBy: 'professor2',
    questionDistribution: [
      {
        categories: ['Programação'],
        difficulty: 'hard',
        count: 2
      }
    ],
    useQRCode: false,
    useBarCode: true,
    requirePassword: true,
    variants: []
  },
];

// Mock de Rubrics
export const mockRubrics: EvaluationRubric[] = [
  {
    id: 'rubric1',
    title: 'Rubrica para Avaliação de Redações',
    criteria: [
      {
        id: 'crit1',
        description: 'Coesão e coerência textual',
        weight: 0.3,
        levels: [
          { score: 0, description: 'Texto sem coesão e incoerente' },
          { score: 1, description: 'Texto com problemas graves de coesão' },
          { score: 2, description: 'Texto parcialmente coeso' },
          { score: 3, description: 'Texto bem estruturado e coeso' }
        ]
      },
      {
        id: 'crit2',
        description: 'Argumentação',
        weight: 0.4,
        levels: [
          { score: 0, description: 'Sem argumentos válidos' },
          { score: 1, description: 'Argumentação fraca e inconsistente' },
          { score: 2, description: 'Boa argumentação com algumas falhas' },
          { score: 3, description: 'Excelente argumentação' }
        ]
      },
      {
        id: 'crit3',
        description: 'Norma culta',
        weight: 0.3,
        levels: [
          { score: 0, description: 'Muitos erros gramaticais graves' },
          { score: 1, description: 'Diversos erros gramaticais' },
          { score: 2, description: 'Poucos erros gramaticais' },
          { score: 3, description: 'Sem erros gramaticais relevantes' }
        ]
      }
    ]
  }
];

// Mock de ExamResults
export const mockResults: ExamResult[] = [
  {
    id: 'result1',
    examId: 'exam1',
    studentId: 'student1',
    answers: [
      {
        questionId: '1',
        answer: 'Brasília',
        score: 5
      },
      {
        questionId: '5',
        answer: 'A Revolução Industrial foi um processo...',
        score: 4
      }
    ],
    totalScore: 9,
    completedAt: new Date('2023-04-10')
  },
  {
    id: 'result2',
    examId: 'exam2',
    studentId: 'student2',
    answers: [
      {
        questionId: '2',
        answer: 'Encapsulamento, Herança, Polimorfismo',
        score: 10
      },
      {
        questionId: '4',
        answer: 'x = 0.5 ou x = -3',
        score: 8
      }
    ],
    totalScore: 18,
    completedAt: new Date('2023-04-20')
  },
  {
    id: 'result1',
    examId: 'exam1',
    studentId: 'student1',
    answers: [
      { questionId: 'q1', answer: 'resposta1', score: 20 },
      { questionId: 'q2', answer: 'resposta2', score: 15 },
      { questionId: 'q3', answer: 'resposta3', score: 18 },
      { questionId: 'q4', answer: 'resposta4', score: 10 },
      { questionId: 'q5', answer: 'resposta5', score: 20 }
    ],
    totalScore: 83,
    completedAt: new Date('2023-03-20')
  },
  {
    id: 'result2',
    examId: 'exam1',
    studentId: 'student2',
    answers: [
      { questionId: 'q1', answer: 'resposta1', score: 18 },
      { questionId: 'q2', answer: 'resposta2', score: 12 },
      { questionId: 'q3', answer: 'resposta3', score: 15 },
      { questionId: 'q4', answer: 'resposta4', score: 8 },
      { questionId: 'q5', answer: 'resposta5', score: 17 }
    ],
    totalScore: 70,
    completedAt: new Date('2023-03-20')
  },
  {
    id: 'result3',
    examId: 'exam1',
    studentId: 'student3',
    answers: [
      { questionId: 'q1', answer: 'resposta1', score: 10 },
      { questionId: 'q2', answer: 'resposta2', score: 8 },
      { questionId: 'q3', answer: 'resposta3', score: 12 },
      { questionId: 'q4', answer: 'resposta4', score: 5 },
      { questionId: 'q5', answer: 'resposta5', score: 10 }
    ],
    totalScore: 45,
    completedAt: new Date('2023-03-21')
  },
  {
    id: 'result4',
    examId: 'exam2',
    studentId: 'student1',
    answers: [
      { questionId: 'q6', answer: 'resposta6', score: 18 },
      { questionId: 'q7', answer: 'resposta7', score: 17 },
      { questionId: 'q8', answer: 'resposta8', score: 19 },
      { questionId: 'q9', answer: 'resposta9', score: 20 },
      { questionId: 'q10', answer: 'resposta10', score: 16 }
    ],
    totalScore: 90,
    completedAt: new Date('2023-03-25')
  }
];

// Mock de classes
export const mockClasses = [
  {
    id: 'class1',
    name: 'Turma A - Geografia 2023',
    students: ['student1', 'student3', 'student5']
  },
  {
    id: 'class2',
    name: 'Turma B - Geografia 2023',
    students: ['student2', 'student4', 'student6']
  },
  {
    id: 'class3',
    name: 'Turma C - Programação 2023',
    students: ['student1', 'student2', 'student7', 'student8']
  }
];

export const predefinedTemplates: ReportTemplate[] = [
  {
    id: 'template-individual',
    name: 'Relatório Individual',
    description: 'Relatório detalhado do desempenho de um estudante específico',
    type: 'individual',
    sections: [
      {
        id: 'section-1',
        title: 'Informações da Avaliação',
        type: 'statistics',
        config: { showDate: true, showScore: true }
      },
      {
        id: 'section-2',
        title: 'Desempenho por Questão',
        type: 'questions',
        config: { showDifficulty: true, showCategories: true }
      },
      {
        id: 'section-3',
        title: 'Comentários',
        type: 'comments',
        config: { editable: true }
      }
    ]
  },
  {
    id: 'template-class',
    name: 'Relatório de Turma',
    description: 'Visão geral do desempenho de toda a turma na avaliação',
    type: 'class',
    sections: [
      {
        id: 'section-1',
        title: 'Estatísticas Gerais',
        type: 'statistics',
        config: { showAverage: true, showMedian: true, showHighest: true, showLowest: true }
      },
      {
        id: 'section-2',
        title: 'Gráfico de Desempenho',
        type: 'chart',
        config: { chartType: 'bar', showLabels: true }
      },
      {
        id: 'section-3',
        title: 'Resultados Individuais',
        type: 'scores',
        config: { sortBy: 'score', order: 'desc' }
      }
    ]
  },
  {
    id: 'template-questions',
    name: 'Análise de Questões',
    description: 'Análise detalhada das respostas para cada questão',
    type: 'question',
    sections: [
      {
        id: 'section-1',
        title: 'Estatísticas por Questão',
        type: 'statistics',
        config: { showPercentCorrect: true, showAverageScore: true }
      },
      {
        id: 'section-2',
        title: 'Gráfico de Acertos',
        type: 'chart',
        config: { chartType: 'pie', showPercentage: true }
      }
    ]
  },
  {
    id: 'template-summary',
    name: 'Resumo Executivo',
    description: 'Visão geral concisa dos principais resultados da avaliação',
    type: 'summary',
    sections: [
      {
        id: 'section-1',
        title: 'Resumo da Avaliação',
        type: 'statistics',
        config: {
          showAverage: true,
          showPassRate: true,
          showTotalStudents: true
        }
      },
      {
        id: 'section-2',
        title: 'Análise por Categoria',
        type: 'chart',
        config: {
          chartType: 'radar',
          groupBy: 'category'
        }
      }
    ]
  }
];

// Mock students for testing
export const mockStudents = {
  'student1': { id: 'student1', name: 'João Silva', email: 'joao@example.com', classId: 101 },
  'student2': { id: 'student2', name: 'Maria Oliveira', email: 'maria@example.com', classId: 101 },
  'student3': { id: 'student3', name: 'Pedro Santos', email: 'pedro@example.com', classId: 101 },
  'student4': { id: 'student4', name: 'Ana Silva', email: 'ana@email.com', classId: 102 },
  'student5': { id: 'student5', name: 'Bruno Santos', email: 'bruno@email.com', classId: 102 },
  'student6': { id: 'student6', name: 'Carla Oliveira', email: 'carla@email.com', classId: 102 },
  'student7': { id: 'student7', name: 'Daniel Souza', email: 'daniel@email.com', classId: 102 },
  'student8': { id: 'student8', name: 'Elena Martins', email: 'elena@email.com', classId: 102 },
  'student9': { id: 'student9', name: 'Felipe Costa', email: 'felipe@email.com', classId: 102 },
  'student10': { id: 'student10', name: 'Gabriela Lima', email: 'gabriela@email.com', classId: 102 },
  'student11': { id: 'student11', name: 'Henrique Alves', email: 'henrique@email.com', classId: 102 }
};

export const studentList = ['Ana Souza', 'Carlos Oliveira', 'Fernanda Lima', 'Rafael Mendes'];

export const categorias = [
    {
        titulo: 'Presença',
        subcategorias: [
            { nome: 'Presença', opcoes: ['Presente', 'Ausente', 'Ausência justificada'] },
            { nome: 'Pontualidade', opcoes: ['Pontual', 'Atraso', 'Atraso justificado'] }
        ]
    },
    {
        titulo: 'Colaboração',
        subcategorias: [
            { nome: 'Ajuda colegas', opcoes: ['Não ajudou', 'Ajudou às vezes', 'Sempre ajuda'] },
            { nome: 'Trabalho em grupo', opcoes: ['Excelente', 'Limitado', 'Não colabora'] },
            { nome: 'Colaboração', opcoes: ['Baixa', 'Ocasional', 'Constante'] }
        ]
    },
    {
        titulo: 'Participação',
        subcategorias: [
            { nome: 'Atividades', opcoes: ['Ativa', 'Mínima', 'Não participou', 'Dormiu'] },
            { nome: 'Conversas', opcoes: ['Focado', 'Algumas distrações', 'Muitas distrações'] },
            { nome: 'Concentração', opcoes: ['Total', 'Parcial', 'Ausente'] },
            { nome: 'Uso de celular', opcoes: ['Não usou', 'Uso frequente', 'Uso constante'] }
        ]
    },
    {
        titulo: 'Comportamento',
        subcategorias: [
            { nome: 'Integridade', opcoes: ['Honesto', 'Plágio', 'Sem integridade'] },
            { nome: 'Conduta', opcoes: ['Adequada', 'Inadequada', 'Desrespeitosa'] },
            { nome: 'Respeito', opcoes: ['Com todos', 'Parcial', 'Ausente'] },
            { nome: 'Uniforme', opcoes: ['Completo', 'Parcial', 'Sem uniforme'] },
            { nome: 'Regras', opcoes: ['Cumpriu todas', 'Cumpriu algumas', 'Não cumpriu'] }
        ]
    },
    {
        titulo: 'Organização',
        subcategorias: [
            { nome: 'Material', opcoes: ['Completo', 'Parcial', 'Ausente'] },
            { nome: 'Calculadora', opcoes: ['Trouxe', 'Não trouxe'] }
        ]
    },
    {
        titulo: 'Caderno',
        subcategorias: [
            { nome: 'Atividades', opcoes: ['Completas', 'Incompletas'] },
            { nome: 'Organização', opcoes: ['Muito organizado', 'Organizado', 'Desorganizado'] },
            { nome: 'Tarefas', opcoes: ['Todas completas', 'Algumas completas', 'Incompletas'] }
        ]
    },
    {
        titulo: 'Responsabilidade',
        subcategorias: [
            { nome: 'Prazos', opcoes: ['No prazo', 'Atraso justificado', 'Atraso', 'Não entregou'] },
            { nome: 'Patrimônio', opcoes: ['Cuidadoso', 'Descuidado'] },
            { nome: 'Materiais', opcoes: ['Uso adequado', 'Uso inadequado'] },
            { nome: 'Laboratório', opcoes: ['Seguiu instruções', 'Dificuldades parciais', 'Não seguiu'] }
        ]
    }
];

export const getAllMockData = () => {
  return {
    questions: mockQuestions,
    exams: mockExams,
    rubrics: mockRubrics,
    results: mockResults,
    classes: mockClasses,
    students: mockStudents
  };
};