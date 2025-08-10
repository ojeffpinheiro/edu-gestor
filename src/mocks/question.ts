import { Content, Question, Topic } from "../utils/types/Question";

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
  }
];
