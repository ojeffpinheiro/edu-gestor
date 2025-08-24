import { Exam, ExamTypes } from '../types/evaluation/Exam';

/**
 * Inicializa os dados do exame com valores padrão
 * @returns Um objeto Exam com valores padrão
 */
export const initializeExamData = (): Exam => {
  const inittialExamData: Exam = {
      id: 0,
      title: 'Exame 1',
      description: 'Descrição padrão',
      discipline: '',
      topicId: '',
      documentType: ExamTypes.Exam,
      totalQuestions: 6,
      totalPoints: 10,
      questions: [],
      questionDistribution: [
        { difficulty: 'easy', count: 4, selected: 0 },
        { difficulty: 'medium', count: 4, selected: 0 },
        { difficulty: 'hard', count: 2, selected: 0 },
      ],
      selectionMode: 'manual',
      instructions: [
        'A avaliação é individual;',
        'Faça com tranquilidade e empenho para ter um bom resultado;',
        'Leia os enunciados com atenção, a interpretação faz parte da avaliação;',
        'É permitido o uso de calculadora (não é válido em formato digital);',
        'Não é permitido nenhum outro tipo de consulta externa (cola), celulares ou qualquer aparelho eletrônico;',
        'Reserve tempo suficiente para preencher a grade de respostas',
        'Preencha o cabeçalho de forma correta. Letra ilegível ou informações faltantes impedem a correção.',
        'Marque apenas uma das opções que lhe são apresentadas em cada questão.',
        'Marque suas respostas na grade de respostas utilizando apenas caneta esferográfica azul ou preta conforme o exemplo.',
        'Somente será considerado como marcação válida na grade de respostas a questão que apresentar apenas uma marcação conforme o exemplo.',
        'Se a questão não apresentar resolução completa e devidamente identificada, será considerada como errada, mesmo que a resposta assinalada corretamente no cartão resposta.',
        'Não é permitido rasurar ou alterar a marcação feita na grade de respostas.',
        'Para efeito de correção, serão consideradas 10 questões, então, se preferir, escolha 2 questões para não responder ou anular.'
      ],
      questionLayout: 'list',
      shuffleQuestions: false,
      shuffleAlternatives: false,
      schoolName: 'ESCOLA ESTADUAL DE ENSINO MÉDIO 9 DE OUTUBRO',
      headerStyle: 'standard',
      headerTitle: '',
      headerSubtitle: '',
      institutionLogo: null,
      showAnswerGrid: true,
      showStudentName: true,
      showStudentId: true,
      showDate: true,
      showGrade: true,
      withGradeSpace: true,
      isPublic: false,
      requirePassword: false,
      password: '',
      accessCode: generateAccessCode(6),
      useBarCode: false,
      correctionType: 'manual',
      identificationMethod: 'manual',
      applicationDate: new Date(),
      classIds: [],
      grade: 0,
      variants: [],
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: 'João Leivas',
      updatedBy: '',
      customHeaderImage: '',
      preventCopying: false,
      schoolInfos: ['ESTADO DO RIO GRANDE DO SUL', 'SECRETARIA DA EDUCAÇÃO – 2ª CRE'],
      compactMode: false,
      fontFamily: 'serif',
      fontSize: 'medium',
      showQuestionNumber: true,
      showQuestionTypeIndicator: true,
      variantsCount: 0,
      variantsEnabled: false,
      variantsGenerationMethod: 'questionBank',
    }
  return inittialExamData;
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