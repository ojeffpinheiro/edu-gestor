import { Content, Question, Topic } from "../types/evaluation/Question";

export const mockTopics: Topic[] = [
    { id: '1', name: 'Matemática' },
    { id: '2', name: 'Português' },
];

export const mockContents: Content[] = [
    { id: '1', topicId: '1', name: 'Álgebra' },
    { id: '2', topicId: '1', name: 'Geometria' },
    { id: '3', topicId: '2', name: 'Gramática' },
];

export const mockQuestions: Question[] = [
  {
    id: "q1",
    contentId: "c1",
    statement: "Qual é o resultado de 2 + 2?",
    questionType: "multiple_choice",
    difficultyLevel: "easy",
    discipline: "Matemática",
    alternatives: [
      { id: "a1", text: "3", isCorrect: false },
      { id: "a2", text: "4", isCorrect: true },
      { id: "a3", text: "5", isCorrect: false }
    ],
    explanation: "2 + 2 é igual a 4.",
    createdAt: "2025-08-09T12:00:00Z",
    updatedAt: "2025-08-09T12:00:00Z",
    status: "active",
    tags: ["soma", "aritmética"],
    answers: [],
    correctAnswers: ["a2"],
    timesUsed: 10,
    correctRate: 0.85
  },
  {
    id: "q2",
    contentId: "c2",
    statement: "A Terra é plana.",
    questionType: "true_false",
    difficultyLevel: "easy",
    discipline: "Ciências",
    alternatives: [
      { id: "a1", text: "Verdadeiro", isCorrect: false },
      { id: "a2", text: "Falso", isCorrect: true }
    ],
    explanation: "A Terra é aproximadamente esférica.",
    createdAt: "2025-08-09T12:10:00Z",
    updatedAt: "2025-08-09T12:10:00Z",
    status: "active",
    tags: ["astronomia", "planeta"],
    answers: [],
    correctAnswers: ["a2"],
    correctRate: 0.98
  },
  {
    id: "q3",
    contentId: "c3",
    statement: "Explique a importância da fotossíntese para os seres vivos.",
    questionType: "essay",
    difficultyLevel: "medium",
    discipline: "Ciências",
    alternatives: [],
    explanation: "A fotossíntese produz oxigênio e matéria orgânica essenciais à vida.",
    createdAt: "2025-08-09T12:20:00Z",
    updatedAt: "2025-08-09T12:20:00Z",
    status: "active",
    tags: ["fotossíntese", "biologia"],
    answers: []
  },
  {
    id: "q4",
    contentId: "c4",
    statement: "Complete: O Brasil foi descoberto em ____.",
    questionType: "fill_in_the_blank",
    difficultyLevel: "medium",
    discipline: "História",
    alternatives: [],
    correctAnswer: "1500",
    explanation: "O descobrimento oficial do Brasil ocorreu em 1500.",
    createdAt: "2025-08-09T12:30:00Z",
    updatedAt: "2025-08-09T12:30:00Z",
    status: "active",
    tags: ["descobrimento", "história do Brasil"],
    answers: [],
    correctAnswers: ["1500"]
  },
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
  },{
    id: "q8",
    contentId: "c4",
    statement: "O elemento químico representado pelo símbolo 'O' é o ______.",
    questionType: "fill_in_the_blank",
    difficultyLevel: "easy",
    discipline: "Ciências",
    alternatives: [],
    correctAnswer: "Oxigênio",
    explanation: "O 'O' é o símbolo químico para o Oxigênio.",
    createdAt: "2025-08-08T09:00:00Z",
    updatedAt: "2025-08-08T09:00:00Z",
    status: "active",
    tags: ["química", "elementos"],
    timesUsed: 2,
    correctRate: 0.85,
    pinned: false,
    rating: 4,
    isFavorite: false,
    usageCount: 2,
    answerStats: { totalAttempts: 20, correctAttempts: 17 },
    answers: [{ id: "ans4", type: "text", content: "Oxigênio", isCorrect: true }]
  },

  // 5 - Short Answer
  {
    id: "q9",
    contentId: "c5",
    statement: "Quem foi o primeiro presidente do Brasil?",
    questionType: "short_answer",
    difficultyLevel: "medium",
    discipline: "História",
    alternatives: [],
    correctAnswer: "Deodoro da Fonseca",
    explanation: "Marechal Deodoro da Fonseca assumiu a presidência em 1889.",
    createdAt: "2025-08-07T11:30:00Z",
    updatedAt: "2025-08-07T11:30:00Z",
    status: "active",
    tags: ["história do brasil", "república"],
    timesUsed: 4,
    correctRate: 0.7,
    pinned: false,
    rating: 3.5,
    isFavorite: false,
    usageCount: 4,
    answerStats: { totalAttempts: 10, correctAttempts: 7 },
    answers: [{ id: "ans5", type: "text", content: "Deodoro da Fonseca", isCorrect: true }]
  },

  // 6 - Matching
  {
    id: "q10",
    contentId: "c6",
    statement: "Associe cada capital ao seu respectivo estado.",
    questionType: "matching",
    difficultyLevel: "medium",
    discipline: "Geografia",
    alternatives: [
      { id: "a1", text: "São Paulo - SP", isCorrect: true },
      { id: "a2", text: "Belo Horizonte - MG", isCorrect: true },
      { id: "a3", text: "Curitiba - PR", isCorrect: true }
    ],
    explanation: "Cada capital está corretamente associada ao seu estado.",
    createdAt: "2025-08-06T14:00:00Z",
    updatedAt: "2025-08-06T14:00:00Z",
    status: "active",
    tags: ["brasil", "capitais"],
    timesUsed: 6,
    correctRate: 0.9,
    pinned: false,
    rating: 4.2,
    isFavorite: false,
    usageCount: 6,
    answerStats: { totalAttempts: 15, correctAttempts: 13 },
    answers: []
  },

  // 7 - Ordering
  {
    id: "q11",
    contentId: "c7",
    statement: "Organize os planetas do sistema solar em ordem de proximidade do Sol.",
    questionType: "ordering",
    difficultyLevel: "hard",
    discipline: "Ciências",
    alternatives: [
      { id: "a1", text: "Mercúrio", isCorrect: true },
      { id: "a2", text: "Vênus", isCorrect: true },
      { id: "a3", text: "Terra", isCorrect: true },
      { id: "a4", text: "Marte", isCorrect: true }
    ],
    explanation: "A ordem correta é: Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano e Netuno.",
    createdAt: "2025-08-05T15:45:00Z",
    updatedAt: "2025-08-05T15:45:00Z",
    status: "active",
    tags: ["astronomia", "ordenação"],
    timesUsed: 3,
    correctRate: 0.6,
    pinned: false,
    rating: 3.8,
    isFavorite: false,
    usageCount: 3,
    answerStats: { totalAttempts: 10, correctAttempts: 6 },
    answers: []
  },

  // 8 - Composite
  {
    id: "q12",
    contentId: "c8",
    statement: "Prova de Matemática - Questões compostas.",
    questionType: "composite",
    difficultyLevel: "hard",
    discipline: "Matemática",
    alternatives: [],
    explanation: "Contém várias questões em um único bloco.",
    createdAt: "2025-08-04T10:20:00Z",
    updatedAt: "2025-08-04T10:20:00Z",
    status: "active",
    tags: ["matemática", "composto"],
    timesUsed: 1,
    correctRate: 0.5,
    pinned: false,
    rating: 4,
    isFavorite: false,
    usageCount: 1,
    answerStats: { totalAttempts: 4, correctAttempts: 2 },
    answers: [],
    isComposite: true,
    componentQuestions: ["q1", "q4", "q7"]
  },

  // 9 - Multiple Choice Avançada
  {
    id: "q13",
    contentId: "c9",
    statement: "Qual a capital da Austrália?",
    questionType: "multiple_choice",
    difficultyLevel: "medium",
    discipline: "Geografia",
    alternatives: [
      { id: "a1", text: "Sydney", isCorrect: false },
      { id: "a2", text: "Melbourne", isCorrect: false },
      { id: "a3", text: "Camberra", isCorrect: true }
    ],
    explanation: "A capital da Austrália é Camberra, não Sydney ou Melbourne.",
    createdAt: "2025-08-03T09:15:00Z",
    updatedAt: "2025-08-03T09:15:00Z",
    status: "active",
    tags: ["geografia mundial", "capitais"],
    timesUsed: 2,
    correctRate: 0.88,
    pinned: false,
    rating: 4.3,
    isFavorite: false,
    usageCount: 2,
    answerStats: { totalAttempts: 8, correctAttempts: 7 },
    answers: [{ id: "ans9", type: "single_select", content: "Camberra", isCorrect: true }]
  },

  // 10 - True/False Avançada
  {
    id: "q14",
    contentId: "c10",
    statement: "A fotossíntese é um processo exclusivo das plantas.",
    questionType: "true_false",
    difficultyLevel: "medium",
    discipline: "Ciências",
    alternatives: [
      { id: "a1", text: "Verdadeiro", isCorrect: false },
      { id: "a2", text: "Falso", isCorrect: true }
    ],
    explanation: "Algumas bactérias e algas também realizam fotossíntese.",
    createdAt: "2025-08-02T08:00:00Z",
    updatedAt: "2025-08-02T08:00:00Z",
    status: "active",
    tags: ["biologia", "fotossíntese"],
    timesUsed: 3,
    correctRate: 0.92,
    pinned: false,
    rating: 4.7,
    isFavorite: true,
    usageCount: 3,
    answerStats: { totalAttempts: 12, correctAttempts: 11 },
    answers: [{ id: "ans10", type: "boolean", content: false, isCorrect: true }]
  }
];
