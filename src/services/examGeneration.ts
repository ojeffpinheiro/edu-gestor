import { Exam } from "../types/evaluation/Exam";
import { Question, QuestionFilters } from "../types/evaluation/Question";

const questionBank: Question[] = []; // Inicialize com suas questões

const baseExamConfig: Partial<Exam> = {
  documentType: 'exam',
  questionLayout: 'list',
  shuffleQuestions: false,
  shuffleAlternatives: false,
  showAnswerGrid: true,
  correctionType: 'manual',
  status: 'draft'
};

// Função para filtrar questões
function filterQuestions(questions: Question[], filters?: QuestionFilters): Question[] {
  if (!filters) return [...questions];
  
  return questions.filter(q => {
    const matchesDifficulty = !filters.difficulty || q.difficultyLevel === filters.difficulty;
    const matchesDiscipline = !filters.discipline || q.discipline === filters.discipline;
    const matchesType = !filters.questionType || q.questionType === filters.questionType;
    
    return matchesDifficulty && matchesDiscipline && matchesType;
  });
}

// Função para validar disponibilidade de questões
function validateQuestionAvailability(questions: Question[], params: ExamGenerationParams): void {
  const difficulties = ['easy', 'medium', 'hard'] as const;
  
  difficulties.forEach(difficulty => {
    const count = params.difficultyDistribution?.[difficulty] || 0;
    const available = questions.filter(q => q.difficultyLevel === difficulty).length;
    
    if (available < count) {
      throw new Error(`Não há questões suficientes de dificuldade ${difficulty}. Necessário: ${count}, Disponível: ${available}`);
    }
  });
}

// Função para embaralhar array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Funções auxiliares para geração de identificadores
function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function generateAccessCode(length = 6): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({length}, () => 
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
}

function generateQRCode(content: string): string {
  // Implementação real usando uma biblioteca QR code
  return `QR-${content}`;
}

function generateBarcode(content: string): string {
  // Implementação real usando uma biblioteca de código de barras
  return `BAR-${content}`;
}

function generatePassword(length = 8): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({length}, () => 
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
}

function generateAnswerKey(questions: Question[]): Record<number, string> {
  return questions.reduce((acc, q, index) => {
    if (q.questionType === 'multiple_choice') {
      const correctIndex = q.alternatives?.findIndex(a => a.isCorrect) ?? -1;
      if (correctIndex >= 0) {
        acc[index + 1] = String.fromCharCode(65 + correctIndex);
      }
    }
    return acc;
  }, {} as Record<number, string>);
}

interface ExamGenerationParams {
  examCount: number;
  questionCount: number;
  discipline: string;
  topicId?: string;
  difficultyDistribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  filters?: QuestionFilters;
}

export function generateRandomExams(params: ExamGenerationParams): Exam[] {
  // 1. Aplicar filtros
  const filteredQuestions = filterQuestions(questionBank, params.filters);
  
  // 2. Validar questões disponíveis vs necessárias
  validateQuestionAvailability(filteredQuestions, params);
  
  // 3. Gerar as provas
  return Array.from({length: params.examCount}, (_, i) => {
    const examQuestions: Question[] = [];
    const examId = generateUniqueId();
    
    // Distribuição por dificuldade
    Object.entries(params.difficultyDistribution).forEach(([difficulty, count]) => {
      const questionsOfDifficulty = filteredQuestions
        .filter(q => q.difficultyLevel === difficulty)
        .sort(() => 0.5 - Math.random())
        .slice(0, count);
      
      examQuestions.push(...questionsOfDifficulty);
    });
    
    // Embaralhar questões finais
    const shuffledQuestions = shuffleArray(examQuestions);
    
    return {
      ...baseExamConfig,
      id: Number(examId),
      questions: shuffledQuestions,
      variants: [],
      accessCode: generateAccessCode(),
      qrCode: generateQRCode(examId),
      barcode: generateBarcode(examId),
      password: generatePassword(),
      answerKey: generateAnswerKey(shuffledQuestions),
      discipline: params.discipline,
      topicId: params.topicId,
      totalQuestions: params.questionCount,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Exam;
  });
}

interface ManualSelectionParams {
  selectedQuestions: string[]; // IDs das questões
  examConfig: Partial<Exam>;
}

export function createExamFromSelection(params: ManualSelectionParams): Exam {
  const selectedQuestions = questionBank.filter(q => 
    q.id !== undefined && params.selectedQuestions.includes(q.id)
  );
  const examId = generateUniqueId();
  
  return {
    ...baseExamConfig,
    ...params.examConfig,
    id: Number(examId),
    questions: selectedQuestions,
    totalQuestions: selectedQuestions.length,
    variants: [],
    accessCode: generateAccessCode(),
    qrCode: generateQRCode(examId),
    barcode: generateBarcode(examId),
    password: params.examConfig.password || generatePassword(),
    answerKey: generateAnswerKey(selectedQuestions),
    createdAt: new Date(),
    updatedAt: new Date()
  } as Exam;
}