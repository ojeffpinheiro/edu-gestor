import { Exam } from "../types/evaluation/Exam";
import { Question } from "../types/evaluation/Question";

const questionBank: Question[] = [];

// Configuração base para novas provas
const baseExamConfig: Partial<Exam> = {
  documentType: 'exam',
  questionLayout: 'list',
  shuffleQuestions: false,
  shuffleAlternatives: false,
  showAnswerGrid: true,
  correctionType: 'manual',
  status: 'draft'
};

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

interface ManualSelectionParams {
  selectedQuestions: string[]; // IDs das questões
  examConfig: Partial<Exam>;
}

/**
 * Cria uma prova a partir de uma seleção manual de questões
 * @param params Parâmetros para criação da prova
 * @returns Exam configurada
 */
export function createExamFromSelection(params: ManualSelectionParams): Exam {
  const selectedQuestions = questionBank.filter((q: Question) => 
    q.id !== undefined && params.selectedQuestions.includes(q.id)
  );
  const examId = Math.floor(Math.random() * 1_000_000_000); // generates a numeric id
  
  return {
    ...baseExamConfig,
    ...params.examConfig,
    id: examId,
    questions: selectedQuestions,
    totalQuestions: selectedQuestions.length,
    variants: [],
    accessCode: generateAccessCode(),
    qrCode: generateQRCode(examId.toString()),
    barcode: generateBarcode(examId.toString()),
    password: params.examConfig.password || generatePassword(),
    answerKey: generateAnswerKey(selectedQuestions),
    createdAt: new Date(),
    updatedAt: new Date()
  } as Exam;
}

export const examService = {
  createExamFromSelection, generateUniqueId
};