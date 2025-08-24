import { ClassPerformance, EnhancedExamResult, EvaluationRubric, ExamSummary, StudentResult } from "../types/academic/Assessment";
import { Question } from "../types/evaluation/Question";

export const mockEvaluationRubrics: EvaluationRubric[] = [
  {
    id: "rubric001",
    title: "Redação - ENEM",
    description: "Rubrica oficial baseada nas cinco competências da redação do ENEM.",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-05-15"),
    criteria: [
      {
        id: "crit1",
        description: "Domínio da norma padrão da língua portuguesa",
        weight: 0.2,
        skillCategory: "Linguagem",
        levels: [
          {
            score: 0,
            description: "Texto com grave comprometimento da norma padrão.",
            examples: ["Erros recorrentes de ortografia", "Ininteligibilidade"],
          },
          {
            score: 100,
            description: "Domínio pleno da norma padrão.",
            examples: ["Uso correto de tempos verbais", "Ortografia impecável"],
          },
        ],
      },
      {
        id: "crit2",
        description: "Compreensão da proposta e desenvolvimento do tema",
        weight: 0.2,
        skillCategory: "Compreensão textual",
        levels: [
          {
            score: 0,
            description: "Fuga total do tema proposto.",
            examples: ["Texto fora do contexto solicitado"],
          },
          {
            score: 100,
            description: "Compreensão completa e desenvolvimento adequado.",
            examples: ["Argumentos alinhados ao tema", "Tese clara"],
          },
        ],
      },
    ],
  },
  {
    id: "rubric002",
    title: "Apresentação Oral - Projeto de Ciências",
    description: "Critérios para avaliar apresentações em grupo sobre projetos científicos.",
    createdAt: new Date("2025-02-20"),
    updatedAt: new Date("2025-05-10"),
    criteria: [
      {
        id: "crit3",
        description: "Clareza na comunicação",
        weight: 0.3,
        skillCategory: "Comunicação oral",
        levels: [
          {
            score: 0,
            description: "Dificuldade de expressão, fala incoerente.",
            examples: ["Fala inaudível", "Uso excessivo de muletas linguísticas"],
          },
          {
            score: 5,
            description: "Clareza e coerência ao apresentar ideias.",
            examples: ["Tom de voz adequado", "Ideias bem conectadas"],
          },
        ],
      },
      {
        id: "crit4",
        description: "Domínio do conteúdo apresentado",
        weight: 0.4,
        skillCategory: "Conhecimento científico",
        levels: [
          {
            score: 0,
            description: "Desconhecimento do tema.",
            examples: ["Respostas incorretas", "Leitura do conteúdo sem entendimento"],
          },
          {
            score: 5,
            description: "Domínio claro e aprofundado do conteúdo.",
            examples: ["Explicações espontâneas e corretas", "Exemplos relevantes"],
          },
        ],
      },
    ],
  },
  {
    id: "rubric003",
    title: "Trabalho de Filosofia - Análise Crítica",
    createdAt: new Date("2025-03-10"),
    updatedAt: new Date("2025-05-01"),
    criteria: [
      {
        id: "crit5",
        description: "Capacidade argumentativa",
        weight: 0.5,
        skillCategory: "Pensamento crítico",
        levels: [
          {
            score: 1,
            description: "Argumentação vaga e sem fundamentação.",
            examples: ["Frases genéricas", "Ausência de contra-argumentos"],
          },
          {
            score: 5,
            description: "Argumentação lógica, fundamentada e bem estruturada.",
            examples: ["Uso de autores filosóficos", "Raciocínio encadeado"],
          },
        ],
      },
      {
        id: "crit6",
        description: "Organização das ideias",
        weight: 0.3,
        skillCategory: "Organização textual",
        levels: [
          {
            score: 1,
            description: "Ideias desconexas, sem estrutura lógica.",
            examples: ["Saltos de lógica", "Parágrafos sem coesão"],
          },
          {
            score: 5,
            description: "Sequência lógica e clara entre os argumentos.",
            examples: ["Introdução, desenvolvimento e conclusão bem definidos"],
          },
        ],
      },
    ],
  },
];

// Mock de questões
export const mockQuestions: Question[] = [
  // Múltipla escolha
  {
    id: "q1",
    contentId: "c1",
    statement: "Qual é o resultado de 7 × 8?",
    questionType: "multiple_choice",
    difficultyLevel: "easy",
    discipline: "Matemática",
    alternatives: [
      { id: "a1", text: "54", isCorrect: false },
      { id: "a2", text: "56", isCorrect: true },
      { id: "a3", text: "64", isCorrect: false }
    ],
    explanation: "7 multiplicado por 8 é igual a 56.",
    createdAt: "2025-08-09T12:00:00Z",
    updatedAt: "2025-08-09T12:00:00Z",
    status: "active",
    tags: ["tabuada", "multiplicação"],
    answers: [],
    correctAnswers: ["a2"],
    timesUsed: 8,
    correctRate: 0.9
  },
  // Verdadeiro/Falso
  {
    id: "q2",
    contentId: "c2",
    statement: "A água ferve a 100 °C ao nível do mar.",
    questionType: "true_false",
    difficultyLevel: "easy",
    discipline: "Ciências",
    alternatives: [
      { id: "a1", text: "Verdadeiro", isCorrect: true },
      { id: "a2", text: "Falso", isCorrect: false }
    ],
    explanation: "A 1 atm de pressão, a água entra em ebulição a 100 °C.",
    createdAt: "2025-08-09T12:05:00Z",
    updatedAt: "2025-08-09T12:05:00Z",
    status: "active",
    tags: ["física", "ebulição"],
    answers: [],
    correctAnswers: ["a1"],
    correctRate: 0.97
  },
  // Dissertativa
  {
    id: "q3",
    contentId: "c3",
    statement: "Explique as principais causas da Revolução Francesa.",
    questionType: "essay",
    difficultyLevel: "hard",
    discipline: "História",
    alternatives: [],
    explanation:
      "A Revolução Francesa foi causada por desigualdades sociais, crise econômica e influências iluministas.",
    createdAt: "2025-08-09T12:10:00Z",
    updatedAt: "2025-08-09T12:10:00Z",
    status: "active",
    tags: ["história moderna", "França"],
    answers: []
  },
  // Preenchimento de lacuna
  {
    id: "q4",
    contentId: "c4",
    statement: "Complete: A fórmula química da água é ____.",
    questionType: "fill_in_the_blank",
    difficultyLevel: "easy",
    discipline: "Ciências",
    alternatives: [],
    correctAnswer: "H2O",
    explanation: "A água é formada por duas moléculas de hidrogênio e uma de oxigênio.",
    createdAt: "2025-08-09T12:15:00Z",
    updatedAt: "2025-08-09T12:15:00Z",
    status: "active",
    tags: ["química", "moléculas"],
    answers: [],
    correctAnswers: ["H2O"]
  },
  // Resposta curta
  {
    id: "q5",
    contentId: "c5",
    statement: "Qual é o maior planeta do Sistema Solar?",
    questionType: "short_answer",
    difficultyLevel: "medium",
    discipline: "Ciências",
    alternatives: [],
    correctAnswer: "Júpiter",
    explanation: "Júpiter é o maior planeta do Sistema Solar em diâmetro e massa.",
    createdAt: "2025-08-09T12:20:00Z",
    updatedAt: "2025-08-09T12:20:00Z",
    status: "active",
    tags: ["astronomia", "planetas"],
    answers: [],
    correctAnswers: ["Júpiter"]
  },
  // Correspondência
  {
    id: "q6",
    contentId: "c6",
    statement: "Associe o autor à sua obra.",
    questionType: "matching",
    difficultyLevel: "medium",
    discipline: "Português",
    alternatives: [
      { id: "a1", text: "Machado de Assis → Dom Casmurro", isCorrect: true },
      { id: "a2", text: "José de Alencar → Iracema", isCorrect: true },
      { id: "a3", text: "Carlos Drummond de Andrade → A Rosa do Povo", isCorrect: true }
    ],
    explanation: "Cada autor é conhecido principalmente por essas obras.",
    createdAt: "2025-08-09T12:25:00Z",
    updatedAt: "2025-08-09T12:25:00Z",
    status: "active",
    tags: ["literatura brasileira"],
    answers: []
  },
  // Ordenação
  {
    id: "q7",
    contentId: "c7",
    statement: "Ordene os planetas a partir do mais próximo do Sol.",
    questionType: "ordering",
    difficultyLevel: "medium",
    discipline: "Ciências",
    alternatives: [
      { id: "a1", text: "Mercúrio", isCorrect: true },
      { id: "a2", text: "Vênus", isCorrect: true },
      { id: "a3", text: "Terra", isCorrect: true },
      { id: "a4", text: "Marte", isCorrect: true }
    ],
    explanation: "A ordem correta é Mercúrio, Vênus, Terra e Marte.",
    createdAt: "2025-08-09T12:30:00Z",
    updatedAt: "2025-08-09T12:30:00Z",
    status: "active",
    tags: ["astronomia", "sequência"],
    answers: []
  }
];


// Mock de sumários de exames
export const mockExamSummaries: ExamSummary[] = [
  {
    examId: "exam123",
    title: "Avaliação de Matemática - 2º Semestre",
    subject: "Matemática",
    date: new Date("2025-06-10T09:00:00Z"),
    totalStudents: 150,
    averageScore: 78.4,
    skillAverages: {
      "algebra": 85.6,
      "geometria": 72.1,
      "aritmetica": 80.3,
      "estatistica": 65.4
    },
    passingRate: 85,
    highestScore: 98,
    lowestScore: 45,
    completionRate: 95,
    questionStatistics: {
      easiestQuestion: "q3",
      hardestQuestion: "q8"
    },
    results: [
      {
        id: "result001",
        examId: "exam123",
        studentId: "student001",
        answers: [
          { questionId: "q1", answer: "A", score: 9 },
          { questionId: "q2", answer: "C", score: 7 },
          { questionId: "q3", answer: "B", score: 10 },
          { questionId: "q4", answer: "A", score: 8 },
          { questionId: "q5", answer: "D", score: 6 },
          { questionId: "q6", answer: "C", score: 7 },
          { questionId: "q7", answer: "B", score: 9 },
          { questionId: "q8", answer: "A", score: 5 }
        ],
        totalScore: 61,
        completedAt: new Date("2025-06-10T10:30:00Z"),
        metadata: {
          timeSpent: 45,
          attempts: 1
        }
      },
      {
        id: "result002",
        examId: "exam123",
        studentId: "student002",
        answers: [
          { questionId: "q1", answer: "B", score: 8 },
          { questionId: "q2", answer: "A", score: 9 },
          { questionId: "q3", answer: "B", score: 10 },
          { questionId: "q4", answer: "C", score: 7 },
          { questionId: "q5", answer: "D", score: 6 },
          { questionId: "q6", answer: "A", score: 8 },
          { questionId: "q7", answer: "B", score: 9 },
          { questionId: "q8", answer: "D", score: 6 }
        ],
        totalScore: 63,
        completedAt: new Date("2025-06-10T11:00:00Z"),
        metadata: {
          timeSpent: 50,
          attempts: 1
        }
      }
    ]
  },
]

// Mock de resultados de alunos
export const mockStudentResults: StudentResult[] = [
  {
    studentId: "stu001",
    studentName: "Ana Paula Silva",
    studentEmail: "ana.silva@example.com",
    classId: "class101",
    className: "3º Ano A - Ensino Médio",
    examResults: [
      {
        id: "res001",
        examId: "exam001",
        studentId: "stu001",
        completedAt: new Date("2025-05-10"),
        totalScore: 82,
        answers: [
          {
            questionId: "q1",
            answer: "B",
            score: 10,
            skills: { "Álgebra": 1.0 }
          },
          {
            questionId: "q2",
            answer: "A",
            score: 8,
            skills: { "Geometria": 0.8 }
          },
          {
            questionId: "q3",
            answer: "C",
            score: 9,
            skills: { "Estatística": 0.9 }
          }
        ],
        metadata: {
          timeSpent: 60,
          attempts: 1,
        }
      },
      {
        id: "res002",
        examId: "exam003",
        studentId: "stu001",
        completedAt: new Date("2025-03-20"),
        totalScore: 75,
        answers: [
          {
            questionId: "q1",
            answer: "C",
            score: 9,
            skills: { "Cinemática": 0.9 }
          },
          {
            questionId: "q4",
            answer: "D",
            score: 6,
            skills: { "Dinâmica": 0.6 }
          }
        ],
        metadata: {
          timeSpent: 55,
          attempts: 1,
        }
      }
    ],
    overallAverage: 78.5,
    progressTrend: "improving",
    attendanceRate: 0.93,
    skillProfile: {
      "Álgebra": 0.95,
      "Geometria": 0.8,
      "Estatística": 0.88,
      "Cinemática": 0.9,
      "Dinâmica": 0.7
    },
    riskAssessment: {
      level: "low",
      factors: ["Alta frequência", "Boa evolução de notas"]
    }
  },
  {
    studentId: "stu002",
    studentName: "Carlos Henrique Mendes",
    studentEmail: "carlos.mendes@example.com",
    classId: "class101",
    className: "3º Ano A - Ensino Médio",
    examResults: [
      {
        id: "res003",
        examId: "exam001",
        studentId: "stu002",
        completedAt: new Date("2025-05-10"),
        totalScore: 58,
        answers: [
          {
            questionId: "q1",
            answer: "A",
            score: 5,
            skills: { "Álgebra": 0.5 }
          },
          {
            questionId: "q2",
            answer: "C",
            score: 7,
            skills: { "Geometria": 0.7 }
          }
        ],
        metadata: {
          timeSpent: 70,
          attempts: 2,
        }
      },
      {
        id: "res004",
        examId: "exam003",
        studentId: "stu002",
        completedAt: new Date("2025-03-20"),
        totalScore: 49,
        answers: [
          {
            questionId: "q1",
            answer: "D",
            score: 4,
            skills: { "Cinemática": 0.4 }
          },
          {
            questionId: "q5",
            answer: "B",
            score: 3,
            skills: { "Dinâmica": 0.3 }
          }
        ],
        metadata: {
          timeSpent: 65,
          attempts: 1,
        }
      }
    ],
    overallAverage: 53.5,
    progressTrend: "declining",
    attendanceRate: 0.75,
    skillProfile: {
      "Álgebra": 0.5,
      "Geometria": 0.65,
      "Cinemática": 0.4,
      "Dinâmica": 0.3
    },
    riskAssessment: {
      level: "high",
      factors: ["Baixo desempenho em áreas fundamentais", "Frequência abaixo do ideal"]
    }
  }
];

// Mock de desempenho de turmas
export const mockClassPerformances: ClassPerformance = {
  classId: "class-101",
  className: "Matemática Avançada - 3º Ano",
  teacher: "Prof. Ana Beatriz",
  academicPeriod: "2025.1",
  averageScore: 78.4,
  passingRate: 0.85,
  studentCount: 25,
  performanceTrend: "improving",
  skillBreakdown: {
    "Álgebra": 80,
    "Geometria": 75,
    "Estatística": 82
  },
  subjects: [
    {
      name: "Matemática",
      averageScore: 78.4,
      schoolAverage: 73.2
    }
  ],
  schoolAverage: 73.2,
  schoolSkillAverages: [74, 70, 76],
  studentScores: [85, 76, 90, 68, 72, 84, 91, 79, 65, 88, 77, 82, 73, 69, 87, 80, 70, 75, 81, 83, 90, 72, 78, 76, 85],
  schoolComparisons: [
    {
      name: "Matemática",
      averageScore: 78.4,
      schoolAverage: 73.2
    }
  ],
  students: [
    {
      id: "stu-001",
      name: "Lucas Andrade",
      email: "lucas.andrade@email.com",
      attendanceRate: 0.95,
      overallPercentile: 88,
      overallAverage: 85
    },
    {
      id: "stu-002",
      name: "Mariana Silva",
      email: "mariana.silva@email.com",
      attendanceRate: 0.92,
      overallPercentile: 76,
      overallAverage: 78
    }
    // ... mais estudantes conforme necessário
  ],
  attendanceRate: 0.93,
  failingRate: 0.15,
  metrics: {
    attendanceRate: 0.93,
    averageHomeworkScore: 80,
    participationRate: 0.88
  },
  examResults: [
    {
      examId: "exam-001",
      title: "Prova Bimestral 1",
      subject: "Matemática",
      date: new Date("2025-03-15"),
      totalStudents: 25,
      averageScore: 76,
      skillAverages: {
        "Álgebra": 78,
        "Geometria": 72
      },
      passingRate: 0.8,
      highestScore: 95,
      lowestScore: 60,
      completionRate: 1.0,
      questionStatistics: {
        easiestQuestion: "Q2",
        hardestQuestion: "Q5"
      },
      results: [
        {
          id: "res-001",
          examId: "exam-001",
          studentId: "stu-001",
          answers: [
            {
              questionId: "Q1",
              answer: "B",
              score: 5,
              skills: { "Álgebra": 5 }
            },
            {
              questionId: "Q2",
              answer: "C",
              score: 5,
              skills: { "Geometria": 5 }
            }
          ],
          totalScore: 90,
          completedAt: new Date("2025-03-15T10:30:00Z"),
          metadata: {
            timeSpent: 45,
            attempts: 1
          }
        },
        {
          id: "res-002",
          examId: "exam-001",
          studentId: "stu-002",
          answers: [
            {
              questionId: "Q1",
              answer: "A",
              score: 3,
              skills: { "Álgebra": 3 }
            },
            {
              questionId: "Q2",
              answer: "C",
              score: 4,
              skills: { "Geometria": 4 }
            }
          ],
          totalScore: 70,
          completedAt: new Date("2025-03-15T11:00:00Z"),
          metadata: {
            timeSpent: 50,
            attempts: 1
          }
        }
      ]
    }
  ]
};

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