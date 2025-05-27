import { ClassPerformance, EnhancedExamResult, EvaluationRubric, ExamSummary, StudentResult } from "../utils/types/Assessment";
import { Question } from "../utils/types/Question";

export const mockRubrics: EvaluationRubric[] = [
  {
    id: 'rubric-1',
    title: 'Critérios de Correção Padrão',
    criteria: [
      {
        id: 'criteria-1',
        description: 'Precisão da Resposta',
        weight: 0.6,
        levels: [
          { score: 0, description: 'Resposta incorreta ou em branco' },
          { score: 0.5, description: 'Resposta parcialmente correta' },
          { score: 1, description: 'Resposta totalmente correta' }
        ]
      },
      {
        id: 'criteria-2',
        description: 'Clareza da Explicação',
        weight: 0.4,
        levels: [
          { score: 0, description: 'Sem explicação' },
          { score: 0.3, description: 'Explicação confusa' },
          { score: 0.7, description: 'Explicação adequada' },
          { score: 1, description: 'Explicação excelente' }
        ]
      }
    ]
  }
];

// Mock de questões
export const mockQuestions: Question[] = [
  {
    id: '1',
    contentId: 'content-001',
    statement: 'Qual é a capital da França?',
    questionType: 'multiple_choice',
    difficultyLevel: 'easy',
    discipline: 'Geografia',
    alternatives: [
      { id: 'a1', text: 'Londres', isCorrect: false },
      { id: 'a2', text: 'Paris', isCorrect: true },
      { id: 'a3', text: 'Berlim', isCorrect: false },
      { id: 'a4', text: 'Madri', isCorrect: false },
    ],
    explanation: 'Paris é a capital da França.',
    createdAt: '2025-05-01T10:00:00Z',
    updatedAt: '2025-05-01T12:00:00Z',
    status: 'active',
    imageUrl: 'https://example.com/paris.jpg',
    tags: ['geografia', 'capitais'],
    source: 'Enciclopédia Escolar',
    accessDate: '2025-04-30',
    optionsLayout: 'one-column',
  },
  {
    id: '2',
    contentId: 'content-002',
    statement: 'A água ferve a 100 graus Celsius ao nível do mar.',
    questionType: 'true_false',
    difficultyLevel: 'easy',
    discipline: 'Ciências',
    alternatives: [
      { id: 'a1', text: 'Verdadeiro', isCorrect: true },
      { id: 'a2', text: 'Falso', isCorrect: false },
    ],
    explanation: 'A 100°C, a água entra em ebulição ao nível do mar.',
    createdAt: '2025-05-10T09:00:00Z',
    updatedAt: '2025-05-10T10:00:00Z',
    status: 'active',
    tags: ['ciência', 'física'],
    optionsLayout: 'two-columns',
  },
  {
    id: '3',
    contentId: 'content-003',
    statement: 'Descreva o impacto da Revolução Francesa na sociedade moderna.',
    questionType: 'essay',
    difficultyLevel: 'hard',
    discipline: 'História',
    alternatives: [],
    explanation: 'Resposta discursiva esperada baseada em conceitos históricos.',
    createdAt: '2025-04-20T14:00:00Z',
    updatedAt: '2025-04-21T08:30:00Z',
    status: 'draft',
    tags: ['história', 'revolução'],
    source: 'Livro de História Moderna',
    accessDate: '2025-03-15',
  },
  {
    id: '4',
    contentId: 'content-004',
    statement: 'A fórmula da água é ____.',
    questionType: 'fill_in_the_blank',
    difficultyLevel: 'medium',
    discipline: 'Química',
    alternatives: [],
    correctAnswer: 'H2O',
    explanation: 'H2O é a fórmula da água, composta por dois átomos de hidrogênio e um de oxigênio.',
    createdAt: '2025-05-05T16:00:00Z',
    updatedAt: '2025-05-06T10:00:00Z',
    status: 'active',
    tags: ['química', 'fórmulas'],
    optionsLayout: 'one-column',
  },
  {
    id: '5',
    contentId: 'content-005',
    statement: 'Qual desses animais é um mamífero?',
    questionType: 'multiple_choice',
    difficultyLevel: 'medium',
    discipline: 'Biologia',
    alternatives: [
      { id: 'a1', text: 'Tubarão', isCorrect: false },
      { id: 'a2', text: 'Golfinho', isCorrect: true },
      { id: 'a3', text: 'Pinguim', isCorrect: false },
      { id: 'a4', text: 'Polvo', isCorrect: false },
    ],
    explanation: 'Golfinhos são mamíferos aquáticos, ao contrário dos demais listados.',
    createdAt: '2025-05-15T08:00:00Z',
    updatedAt: '2025-05-15T08:30:00Z',
    status: 'active',
    tags: ['biologia', 'animais'],
    optionsLayout: 'two-columns',
  },
  {
    id: '6',
    contentId: 'content-006',
    statement: 'A soma dos ângulos internos de um triângulo é igual a 180 graus.',
    questionType: 'true_false',
    difficultyLevel: 'easy',
    discipline: 'Matemática',
    alternatives: [
      { id: 'a1', text: 'Verdadeiro', isCorrect: true },
      { id: 'a2', text: 'Falso', isCorrect: false },
    ],
    explanation: 'Em qualquer triângulo, a soma dos ângulos internos é sempre 180 graus.',
    createdAt: '2025-05-16T10:10:00Z',
    updatedAt: '2025-05-16T11:00:00Z',
    status: 'active',
    tags: ['matemática', 'geometria'],
    optionsLayout: 'one-column',
  },
  {
    id: '7',
    contentId: 'content-007',
    statement: 'Explique como ocorre a fotossíntese nas plantas.',
    questionType: 'essay',
    difficultyLevel: 'medium',
    discipline: 'Biologia',
    alternatives: [],
    explanation: 'A fotossíntese é o processo pelo qual as plantas convertem luz solar em energia química.',
    createdAt: '2025-04-10T07:00:00Z',
    updatedAt: '2025-04-11T09:00:00Z',
    status: 'draft',
    tags: ['biologia', 'fotossíntese'],
    source: 'Manual do Ensino Médio',
    accessDate: '2025-03-20',
  },
  {
    id: '8',
    contentId: 'content-008',
    statement: 'O elemento químico representado pelo símbolo "Na" é o ____.',
    questionType: 'fill_in_the_blank',
    difficultyLevel: 'medium',
    discipline: 'Química',
    alternatives: [],
    correctAnswer: 'Sódio',
    explanation: 'Na é o símbolo do elemento químico sódio.',
    createdAt: '2025-05-17T13:00:00Z',
    updatedAt: '2025-05-18T08:00:00Z',
    status: 'active',
    tags: ['química', 'elementos'],
    optionsLayout: 'one-column',
  },
  {
    id: '9',
    contentId: 'content-009',
    statement: 'Marque a alternativa que completa corretamente a frase: "O sol nasce no ____".',
    questionType: 'multiple_choice',
    difficultyLevel: 'easy',
    discipline: 'Geografia',
    alternatives: [
      { id: 'a1', text: 'Sul', isCorrect: false },
      { id: 'a2', text: 'Oeste', isCorrect: false },
      { id: 'a3', text: 'Leste', isCorrect: true },
      { id: 'a4', text: 'Norte', isCorrect: false },
    ],
    explanation: 'O sol nasce no leste e se põe no oeste.',
    createdAt: '2025-05-18T10:00:00Z',
    updatedAt: '2025-05-18T10:15:00Z',
    status: 'active',
    imageUrl: 'https://example.com/sunrise.jpg',
    tags: ['geografia', 'orientação'],
    optionsLayout: 'two-columns',
  },
  {
    id: '10',
    contentId: 'content-010',
    statement: 'Resolva a equação: 2x + 3 = 7. O valor de x é ____.',
    questionType: 'fill_in_the_blank',
    difficultyLevel: 'medium',
    discipline: 'Matemática',
    alternatives: [],
    correctAnswer: '2',
    explanation: 'Subtraindo 3 de ambos os lados e dividindo por 2, temos x = 2.',
    createdAt: '2025-05-19T08:00:00Z',
    updatedAt: '2025-05-19T08:30:00Z',
    status: 'active',
    tags: ['matemática', 'álgebra'],
    optionsLayout: 'one-column',
  },
  {
    id: '11',
    contentId: 'content-011',
    statement: 'A Segunda Guerra Mundial terminou em 1945.',
    questionType: 'true_false',
    difficultyLevel: 'easy',
    discipline: 'História',
    alternatives: [
      { id: 'a1', text: 'Verdadeiro', isCorrect: true },
      { id: 'a2', text: 'Falso', isCorrect: false },
    ],
    explanation: 'A Segunda Guerra Mundial terminou oficialmente em setembro de 1945.',
    createdAt: '2025-05-20T09:15:00Z',
    updatedAt: '2025-05-20T09:30:00Z',
    status: 'active',
    tags: ['história', 'guerras'],
    source: 'Enciclopédia Britannica',
    accessDate: '2025-04-10',
  },
  {
    id: '12',
    contentId: 'content-012',
    statement: 'Explique a diferença entre um vírus e uma bactéria.',
    questionType: 'essay',
    difficultyLevel: 'hard',
    discipline: 'Biologia',
    alternatives: [],
    explanation: 'Resposta esperada: vírus não possuem metabolismo próprio e dependem de células hospedeiras.',
    createdAt: '2025-05-15T11:00:00Z',
    updatedAt: '2025-05-16T10:00:00Z',
    status: 'draft',
    tags: ['biologia', 'microbiologia'],
    optionsLayout: 'one-column',
  },
  {
    id: '13',
    contentId: 'content-013',
    statement: 'Qual destas palavras é um advérbio?',
    questionType: 'multiple_choice',
    difficultyLevel: 'medium',
    discipline: 'Português',
    alternatives: [
      { id: 'a1', text: 'Feliz', isCorrect: false },
      { id: 'a2', text: 'Rapidamente', isCorrect: true },
      { id: 'a3', text: 'Cadeira', isCorrect: false },
      { id: 'a4', text: 'Andando', isCorrect: false },
    ],
    explanation: 'Advérbios geralmente modificam verbos, e "rapidamente" é um exemplo clássico.',
    createdAt: '2025-05-21T07:45:00Z',
    updatedAt: '2025-05-21T08:00:00Z',
    status: 'active',
    tags: ['português', 'gramática'],
    optionsLayout: 'two-columns',
  },
  {
    id: '14',
    contentId: 'content-014',
    statement: 'Complete a frase: "O livro está ____ da mesa."',
    questionType: 'fill_in_the_blank',
    difficultyLevel: 'easy',
    discipline: 'Português',
    alternatives: [],
    correctAnswer: 'em cima',
    explanation: 'A resposta correta é uma locução adverbial de lugar: "em cima".',
    createdAt: '2025-05-19T14:30:00Z',
    updatedAt: '2025-05-20T08:00:00Z',
    status: 'active',
    tags: ['português', 'preposições'],
  },
  {
    id: '15',
    contentId: 'content-015',
    statement: 'Qual a fórmula da área de um triângulo?',
    questionType: 'multiple_choice',
    difficultyLevel: 'medium',
    discipline: 'Matemática',
    alternatives: [
      { id: 'a1', text: 'base + altura', isCorrect: false },
      { id: 'a2', text: '(base × altura) ÷ 2', isCorrect: true },
      { id: 'a3', text: 'lado × lado', isCorrect: false },
      { id: 'a4', text: 'π × raio²', isCorrect: false },
    ],
    explanation: 'A área de um triângulo é dada por (base × altura) ÷ 2.',
    createdAt: '2025-05-20T12:00:00Z',
    updatedAt: '2025-05-20T12:30:00Z',
    status: 'active',
    tags: ['matemática', 'geometria'],
    optionsLayout: 'one-column',
  },
  {
    id: '16',
    contentId: 'content-016',
    statement: 'O que representa a sigla ONU?',
    questionType: 'multiple_choice',
    difficultyLevel: 'easy',
    discipline: 'Atualidades',
    alternatives: [
      { id: 'a1', text: 'Organização das Nações Unidas', isCorrect: true },
      { id: 'a2', text: 'Organização Nacional Urbana', isCorrect: false },
      { id: 'a3', text: 'Ordem Nacional Unificada', isCorrect: false },
      { id: 'a4', text: 'Operação das Nações Unidas', isCorrect: false },
    ],
    explanation: 'ONU significa Organização das Nações Unidas.',
    createdAt: '2025-05-18T09:00:00Z',
    updatedAt: '2025-05-18T09:20:00Z',
    status: 'active',
    tags: ['atualidades', 'organizações'],
    optionsLayout: 'two-columns',
  },
  {
    id: '17',
    contentId: 'content-017',
    statement: 'Complete com a forma verbal correta: "Se eu ____ tempo, viajaria mais."',
    questionType: 'fill_in_the_blank',
    difficultyLevel: 'medium',
    discipline: 'Português',
    alternatives: [],
    correctAnswer: 'tivesse',
    explanation: 'O correto é "Se eu tivesse tempo", pois é uma oração condicional no pretérito imperfeito do subjuntivo.',
    createdAt: '2025-05-17T15:00:00Z',
    updatedAt: '2025-05-17T15:45:00Z',
    status: 'active',
    tags: ['português', 'verbo'],
  },
  {
    id: '18',
    contentId: 'content-018',
    statement: 'Explique os principais fatores da urbanização no Brasil.',
    questionType: 'essay',
    difficultyLevel: 'hard',
    discipline: 'Geografia',
    alternatives: [],
    explanation: 'Resposta deve abordar migração rural-urbana, industrialização e crescimento das cidades.',
    createdAt: '2025-05-16T10:00:00Z',
    updatedAt: '2025-05-16T10:30:00Z',
    status: 'draft',
    tags: ['geografia', 'urbanização'],
    source: 'Atlas Escolar IBGE',
    accessDate: '2025-04-12',
  },
  {
    id: '19',
    contentId: 'content-019',
    statement: 'A fotossíntese ocorre nas mitocôndrias das células vegetais.',
    questionType: 'true_false',
    difficultyLevel: 'medium',
    discipline: 'Biologia',
    alternatives: [
      { id: 'a1', text: 'Verdadeiro', isCorrect: false },
      { id: 'a2', text: 'Falso', isCorrect: true },
    ],
    explanation: 'A fotossíntese ocorre nos cloroplastos, não nas mitocôndrias.',
    createdAt: '2025-05-18T08:00:00Z',
    updatedAt: '2025-05-18T08:30:00Z',
    status: 'active',
    tags: ['biologia', 'célula'],
    optionsLayout: 'one-column',
  },
  {
    id: '20',
    contentId: 'content-020',
    statement: 'Qual é o valor de π (pi) aproximado até duas casas decimais?',
    questionType: 'multiple_choice',
    difficultyLevel: 'easy',
    discipline: 'Matemática',
    alternatives: [
      { id: 'a1', text: '3.12', isCorrect: false },
      { id: 'a2', text: '3.14', isCorrect: true },
      { id: 'a3', text: '3.16', isCorrect: false },
      { id: 'a4', text: '3.10', isCorrect: false },
    ],
    explanation: 'O valor aproximado de π é 3.14.',
    createdAt: '2025-05-21T11:00:00Z',
    updatedAt: '2025-05-21T11:30:00Z',
    status: 'active',
    tags: ['matemática', 'constantes'],
    optionsLayout: 'two-columns',
  },
  {
    id: '21',
    contentId: 'content-021',
    statement: 'Analise criticamente os impactos da globalização nas economias em desenvolvimento.',
    questionType: 'essay',
    difficultyLevel: 'hard',
    discipline: 'Geografia',
    alternatives: [],
    explanation: 'A resposta deve discutir vantagens como o acesso a mercados, e desvantagens como dependência econômica.',
    createdAt: '2025-05-21T13:00:00Z',
    updatedAt: '2025-05-21T13:30:00Z',
    status: 'active',
    tags: ['globalização', 'economia', 'geografia'],
    optionsLayout: 'three-columns',
  },
  {
    id: '22',
    contentId: 'content-022',
    statement: 'Explique a importância da ética na pesquisa científica e os riscos da sua negligência.',
    questionType: 'essay',
    difficultyLevel: 'hard',
    discipline: 'Ciências',
    alternatives: [],
    explanation: 'A resposta deve abordar consentimento, manipulação de dados, e impacto social.',
    createdAt: '2025-05-21T13:45:00Z',
    updatedAt: '2025-05-21T14:00:00Z',
    status: 'active',
    tags: ['ciência', 'ética'],
    optionsLayout: 'three-columns',
  },
  {
    id: '23',
    contentId: 'content-023',
    statement: 'Disserte sobre o papel da arte como ferramenta de transformação social.',
    questionType: 'essay',
    difficultyLevel: 'hard',
    discipline: 'Artes',
    alternatives: [],
    explanation: 'A resposta deve explorar o papel histórico da arte em movimentos sociais, cultura e política.',
    createdAt: '2025-05-21T14:15:00Z',
    updatedAt: '2025-05-21T14:45:00Z',
    status: 'active',
    tags: ['arte', 'sociedade'],
    optionsLayout: 'three-columns',
  },
  {
    id: '24',
    contentId: 'content-024',
    statement: 'Avalie os efeitos da revolução digital nas relações interpessoais no século XXI.',
    questionType: 'essay',
    difficultyLevel: 'hard',
    discipline: 'Sociologia',
    alternatives: [],
    explanation: 'Esperado: análise sobre redes sociais, isolamento, conectividade e mudanças comportamentais.',
    createdAt: '2025-05-21T15:00:00Z',
    updatedAt: '2025-05-21T15:30:00Z',
    status: 'active',
    tags: ['tecnologia', 'sociologia'],
    optionsLayout: 'three-columns',
  },
  {
    id: '25',
    contentId: 'content-025',
    statement: 'Comente sobre a crise climática atual e os desafios para a sustentabilidade global.',
    questionType: 'essay',
    difficultyLevel: 'hard',
    discipline: 'Geografia',
    alternatives: [],
    explanation: 'Resposta deve considerar emissões de carbono, políticas ambientais e desigualdade climática.',
    createdAt: '2025-05-21T16:00:00Z',
    updatedAt: '2025-05-21T16:30:00Z',
    status: 'active',
    tags: ['clima', 'meio ambiente'],
    optionsLayout: 'three-columns',
  }
];

// Mock de sumários de exames
export const mockExamSummaries: ExamSummary[] = [
  {
    id: 'exam-1',
    title: 'Prova de Geografia - 1º Bimestre',
    totalStudents: 30,
    averageScore: 7.5,
    passingRate: 80,
    highestScore: 9.8,
    lowestScore: 4.2,
    completionRate: 100
  },
  {
    id: 'exam-2',
    title: 'Avaliação de Matemática',
    totalStudents: 30,
    averageScore: 6.8,
    passingRate: 70,
    highestScore: 10,
    lowestScore: 3.5,
    completionRate: 95
  },
  {
    id: 'exam-3',
    title: 'Teste de Ciências',
    totalStudents: 30,
    averageScore: 8.2,
    passingRate: 90,
    highestScore: 9.5,
    lowestScore: 6.0,
    completionRate: 100
  }
];

// Mock de resultados de alunos
export const mockStudentResults: StudentResult[] = [
  {
    studentId: 'stu-1',
    studentName: 'Ana Silva',
    examResults: [
      {
        id: 'result-1',
        examId: 'exam-1',
        studentId: 'stu-1',
        answers: [
          { questionId: 'q1', answer: 'a3', score: 1 },
          { questionId: 'q2', answer: 'x = 5', score: 0.8 },
          { questionId: 'q3', answer: 'a2', score: 1 }
        ],
        totalScore: 9.3,
        completedAt: new Date('2023-04-15')
      },
      {
        id: 'result-2',
        examId: 'exam-2',
        studentId: 'stu-1',
        answers: [
          { questionId: 'q1', answer: 'a3', score: 1 },
          { questionId: 'q2', answer: 'x = 10', score: 0 },
          { questionId: 'q3', answer: 'a1', score: 0 }
        ],
        totalScore: 7.1,
        completedAt: new Date('2023-05-20')
      }
    ],
    overallAverage: 8.2,
    progressTrend: 'improving'
  },
  {
    studentId: 'stu-2',
    studentName: 'Carlos Oliveira',
    examResults: [
      {
        id: 'result-3',
        examId: 'exam-1',
        studentId: 'stu-2',
        answers: [
          { questionId: 'q1', answer: 'a1', score: 0 },
          { questionId: 'q2', answer: 'x = 5', score: 1 },
          { questionId: 'q3', answer: 'a2', score: 1 }
        ],
        totalScore: 7.5,
        completedAt: new Date('2023-04-15')
      },
      {
        id: 'result-4',
        examId: 'exam-2',
        studentId: 'stu-2',
        answers: [
          { questionId: 'q1', answer: 'a3', score: 1 },
          { questionId: 'q2', answer: 'x = 5', score: 1 },
          { questionId: 'q3', answer: 'a2', score: 1 }
        ],
        totalScore: 9.8,
        completedAt: new Date('2023-05-20')
      }
    ],
    overallAverage: 8.7,
    progressTrend: 'stable'
  },
  {
    studentId: 'stu-3',
    studentName: 'Mariana Costa',
    examResults: [
      {
        id: 'result-5',
        examId: 'exam-1',
        studentId: 'stu-3',
        answers: [
          { questionId: 'q1', answer: 'a3', score: 1 },
          { questionId: 'q2', answer: 'x = 3', score: 0.4 },
          { questionId: 'q3', answer: 'a4', score: 0 }
        ],
        totalScore: 5.6,
        completedAt: new Date('2023-04-15')
      },
      {
        id: 'result-6',
        examId: 'exam-2',
        studentId: 'stu-3',
        answers: [
          { questionId: 'q1', answer: 'a1', score: 0 },
          { questionId: 'q2', answer: 'x = 7', score: 0.2 },
          { questionId: 'q3', answer: 'a3', score: 0 }
        ],
        totalScore: 4.2,
        completedAt: new Date('2023-05-20')
      }
    ],
    overallAverage: 4.9,
    progressTrend: 'declining'
  }
];

// Mock de desempenho de turmas
export const mockClassPerformances: ClassPerformance[] = [
  {
    classId: 'class-1',
    className: '9º Ano A',
    averageScore: 7.8,
    passingRate: 85,
    examResults: [
      {
        id: 'exam-1',
        title: 'Prova de Geografia - 1º Bimestre',
        totalStudents: 15,
        averageScore: 7.9,
        passingRate: 87,
        highestScore: 9.8,
        lowestScore: 5.6,
        completionRate: 100
      },
      {
        id: 'exam-2',
        title: 'Avaliação de Matemática',
        totalStudents: 15,
        averageScore: 7.2,
        passingRate: 80,
        highestScore: 10,
        lowestScore: 4.2,
        completionRate: 93
      }
    ]
  },
  {
    classId: 'class-2',
    className: '9º Ano B',
    averageScore: 7.1,
    passingRate: 75,
    examResults: [
      {
        id: 'exam-1',
        title: 'Prova de Geografia - 1º Bimestre',
        totalStudents: 15,
        averageScore: 7.1,
        passingRate: 73,
        highestScore: 9.2,
        lowestScore: 4.2,
        completionRate: 100
      },
      {
        id: 'exam-2',
        title: 'Avaliação de Matemática',
        totalStudents: 15,
        averageScore: 6.4,
        passingRate: 60,
        highestScore: 9.5,
        lowestScore: 3.5,
        completionRate: 97
      }
    ]
  }
];

// Mock de resultados de exames aprimorados
export const mockEnhancedResults: EnhancedExamResult[] = [
  {
    id: 'result-1',
    examId: 'exam-1',
    studentId: 'stu-1',
    answers: [
      { questionId: 'q1', answer: 'a3', score: 1 },
      { questionId: 'q2', answer: 'x = 5', score: 0.8 },
      { questionId: 'q3', answer: 'a2', score: 1 }
    ],
    totalScore: 9.3,
    completedAt: new Date('2023-04-15'),
    student: {
      id: 'stu-1',
      name: 'Ana Silva',
      email: 'ana.silva@escola.com',
      classId: 'class-1'
    },
    classId: 'class-1'
  },
  {
    id: 'result-2',
    examId: 'exam-2',
    studentId: 'stu-1',
    answers: [
      { questionId: 'q1', answer: 'a3', score: 1 },
      { questionId: 'q2', answer: 'x = 10', score: 0 },
      { questionId: 'q3', answer: 'a1', score: 0 }
    ],
    totalScore: 7.1,
    completedAt: new Date('2023-05-20'),
    student: {
      id: 'stu-1',
      name: 'Ana Silva',
      email: 'ana.silva@escola.com',
      classId: 'class-1'
    },
    classId: 'class-1'
  },
  {
    id: 'result-3',
    examId: 'exam-1',
    studentId: 'stu-2',
    answers: [
      { questionId: 'q1', answer: 'a1', score: 0 },
      { questionId: 'q2', answer: 'x = 5', score: 1 },
      { questionId: 'q3', answer: 'a2', score: 1 }
    ],
    totalScore: 7.5,
    completedAt: new Date('2023-04-15'),
    student: {
      id: 'stu-2',
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@escola.com',
      classId: 'class-1'
    },
    classId: 'class-1'
  },
  {
    id: 'result-4',
    examId: 'exam-2',
    studentId: 'stu-2',
    answers: [
      { questionId: 'q1', answer: 'a3', score: 1 },
      { questionId: 'q2', answer: 'x = 5', score: 1 },
      { questionId: 'q3', answer: 'a2', score: 1 }
    ],
    totalScore: 9.8,
    completedAt: new Date('2023-05-20'),
    student: {
      id: 'stu-2',
      name: 'Carlos Oliveira',
      email: 'carlos.oliveira@escola.com',
      classId: 'class-1'
    },
    classId: 'class-1'
  }
];