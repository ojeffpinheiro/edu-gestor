// src/mocks/assessmentData.ts

import { Question, Exam, EvaluationRubric, ExamResult } from '../utils/types/Assessment';

// Mock de Questions
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

// Mock de Exams
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
    requirePassword: true
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
    requirePassword: true
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

// Mock de students
export const mockStudents = [
  { id: 'student1', name: 'Ana Silva', email: 'ana@email.com' },
  { id: 'student2', name: 'Bruno Santos', email: 'bruno@email.com' },
  { id: 'student3', name: 'Carla Oliveira', email: 'carla@email.com' },
  { id: 'student4', name: 'Daniel Souza', email: 'daniel@email.com' },
  { id: 'student5', name: 'Elena Martins', email: 'elena@email.com' },
  { id: 'student6', name: 'Felipe Costa', email: 'felipe@email.com' },
  { id: 'student7', name: 'Gabriela Lima', email: 'gabriela@email.com' },
  { id: 'student8', name: 'Henrique Alves', email: 'henrique@email.com' }
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