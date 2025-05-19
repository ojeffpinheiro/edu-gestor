// utils/examHelpers.ts
import { v4 as uuidv4 } from 'uuid';
import { Exam, ExamTypes } from './types/Exam';

/**
 * Inicializa os dados do exame com valores padrão
 * @returns Um objeto Exam com valores padrão
 */
export const initializeExamData = (): Exam => {
  const today = new Date();
  return {
    id: 0,
    uuid: uuidv4(),
    title: '',
    description: '',
    discipline: '',
    topicId: '',
    totalQuestions: 6,
    questions: [],
    selectionMode: 'manual',
    accessCode: generateAccessCode(6),
    applicationDate: today,
    classIds: [],
    createdAt: today,
    updatedAt: today,
    createdBy: '',
    updatedBy: '',
    grade: 0,
    isPublic: false,
    password: '',
    requirePassword: false,
    status: 'draft',
    totalPoints: 10,
    useBarCode: false,
    variants: [],
    correctionType: 'automatic',
    identificationMethod: 'barcode',
    questionDistribution: distributeQuestionsByDifficulty(6), // Distribuição padrão
    instructions: [
      'A avaliação é individual',
      'Leia os enunciados com atenção',
      'Não é permitido o uso de aparelhos eletrônicos',
    ],
    questionLayout: 'grid',
    documentType: ExamTypes.Exam,
    headerSubtitle: '',
    headerTitle: '',
    schoolName: 'ESCOLA ESTADUAL',
    headerStyle: 'standard',
    schoolInfos: ['ESTADO DO RIO GRANDE DO SUL', 'SECRETARIA DA EDUCAÇÃO - 2ª CRE'],
    institutionLogo: null,
    showAnswerGrid: true,
    showDate: true,
    showGrade: false,
    showStudentId: true,
    showStudentName: true,
    withGradeSpace: true,
    shuffleQuestions: false,
    shuffleAlternatives: false,
    customHeaderImage: null
  };
};

/**
 * Distribui questões por nível de dificuldade
 * @param totalQuestions Número total de questões a serem distribuídas
 * @returns Array com distribuição de questões por dificuldade
 */
export const distributeQuestionsByDifficulty = (totalQuestions: number) => {
  const easyCount = Math.round(totalQuestions * 0.4);
  const mediumCount = Math.round(totalQuestions * 0.4);
  const hardCount = totalQuestions - easyCount - mediumCount;

  return [
    { difficulty: 'easy', count: easyCount, selected: 0 },
    { difficulty: 'medium', count: mediumCount, selected: 0 },
    { difficulty: 'hard', count: hardCount, selected: 0 }
  ];
};

/**
 * Gera um código de acesso aleatório
 * @param length Comprimento do código (padrão: 6)
 * @returns String com código alfanumérico
 */
export const generateAccessCode = (length: number = 6): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removidos caracteres ambíguos
  let result = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }
  
  return result;
};

/**
 * Formata uma data para exibição
 * @param date Data a ser formatada
 * @returns String formatada
 */
export const formatDate = (date: Date): string => {
  if (!date) return '';
  
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  } catch (e) {
    console.error('Erro ao formatar data:', e);
    return '';
  }
};

/**
 * Extrair extensão de um arquivo
 * @param filename Nome do arquivo
 * @returns Extensão do arquivo (sem o ponto)
 */
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

/**
 * Verifica se um arquivo é uma imagem
 * @param file Arquivo a ser verificado
 * @returns Boolean indicando se é uma imagem
 */
export const isImageFile = (file: File): boolean => {
  const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
  const extension = getFileExtension(file.name);
  return validExtensions.includes(extension);
};

/**
 * Reordena as questões do exame
 * @param questions Lista de questões
 * @param id ID da questão a ser movida
 * @param direction Direção ('up' ou 'down')
 * @returns Nova lista de questões reordenada
 */
export const reorderQuestions = (questions: any[], id: number, direction: 'up' | 'down') => {
  if (!id) return questions;
  
  const updatedQuestions = [...questions];
  const index = updatedQuestions.findIndex(q => q.id === id);
  
  if (index === -1) return questions;
  
  if ((direction === 'up' && index === 0) ||
      (direction === 'down' && index === updatedQuestions.length - 1)) {
    return questions;
  }
  
  const newIndex = direction === 'up' ? index - 1 : index + 1;
  
  // Troca as posições usando desestruturação
  [updatedQuestions[index], updatedQuestions[newIndex]] = 
    [updatedQuestions[newIndex], updatedQuestions[index]];
  
  return updatedQuestions;
};