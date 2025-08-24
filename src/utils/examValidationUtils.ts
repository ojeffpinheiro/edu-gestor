import { Exam } from '../types/academic/Assessment';

/**
 * Interface para erros de validação de exames
 */
export interface ExamValidationError {
  field: string;
  message: string;
}

/**
 * Valida um objeto de exame completo
 * @param exam O exame a ser validado
 * @returns Array de erros de validação (vazio se não houver erros)
 */
export const validateExam = (exam: Partial<Exam>): ExamValidationError[] => {
  const errors: ExamValidationError[] = [];

  // Validar título
  if (!exam.title || exam.title.trim() === '') {
    errors.push({
      field: 'title',
      message: 'O título do exame é obrigatório'
    });
  } else if (exam.title.length > 100) {
    errors.push({
      field: 'title',
      message: 'O título não pode ter mais de 100 caracteres'
    });
  }

  // Validar descrição
  if (!exam.description || exam.description.trim() === '') {
    errors.push({
      field: 'description',
      message: 'A descrição do exame é obrigatória'
    });
  }

  // Validar questões
  if (!exam.questions || !Array.isArray(exam.questions) || exam.questions.length === 0) {
    errors.push({
      field: 'questions',
      message: 'O exame deve conter pelo menos uma questão'
    });
  }

  // Validar pontuação total
  if (typeof exam.totalPoints !== 'number' || exam.totalPoints <= 0) {
    errors.push({
      field: 'totalPoints',
      message: 'A pontuação total deve ser um número maior que zero'
    });
  }

  // Validar tempo limite
  if (exam.timeLimit !== undefined) {
    if (typeof exam.timeLimit !== 'number' || exam.timeLimit <= 0) {
      errors.push({
        field: 'timeLimit',
        message: 'O tempo limite deve ser um número maior que zero'
      });
    }
  }

  // Validar datas
  if (exam.startTime && exam.endTime) {
    const start = new Date(exam.startTime);
    const end = new Date(exam.endTime);
    
    if (start >= end) {
      errors.push({
        field: 'dateRange',
        message: 'A data de início deve ser anterior à data de término'
      });
    }
  }

  // Validar configurações de segurança
  if (exam.requirePassword && (!exam.password || exam.password.trim() === '')) {
    errors.push({
      field: 'password',
      message: 'Uma senha é obrigatória quando "Requer senha" está ativado'
    });
  }

  // Validar QR Code
  if (exam.useQRCode && (!exam.qrCode || exam.qrCode.trim() === '')) {
    errors.push({
      field: 'qrCode',
      message: 'O código QR é obrigatório quando "Usar QR Code" está ativado'
    });
  }

  // Validar código de barras
  if (exam.useBarCode && (!exam.barCode || exam.barCode.trim() === '')) {
    errors.push({
      field: 'barCode',
      message: 'O código de barras é obrigatório quando "Usar código de barras" está ativado'
    });
  }

  // Validar distribuição de questões
  if (exam.questionDistribution && Array.isArray(exam.questionDistribution)) {
    exam.questionDistribution.forEach((dist, index) => {
      if (!dist.categories || !Array.isArray(dist.categories) || dist.categories.length === 0) {
        errors.push({
          field: `questionDistribution[${index}].categories`,
          message: 'Pelo menos uma categoria deve ser selecionada'
        });
      }
      
      if (!dist.difficulty) {
        errors.push({
          field: `questionDistribution[${index}].difficulty`,
          message: 'A dificuldade é obrigatória'
        });
      }
      
      if (typeof dist.count !== 'number' || dist.count <= 0) {
        errors.push({
          field: `questionDistribution[${index}].count`,
          message: 'A contagem deve ser um número maior que zero'
        });
      }
    });
  }

  return errors;
};

/**
 * Verifica se há colisão entre dois exames (mesmo horário)
 * @param examA Primeiro exame
 * @param examB Segundo exame
 * @returns Boolean indicando se há colisão
 */
export const checkExamCollision = (examA: Exam, examB: Exam): boolean => {
  // Se algum exame não tiver horário definido, não há colisão
  if (!examA.startTime || !examA.endTime || !examB.startTime || !examB.endTime) {
    return false;
  }
  
  const startA = new Date(examA.startTime).getTime();
  const endA = new Date(examA.endTime).getTime();
  const startB = new Date(examB.startTime).getTime();
  const endB = new Date(examB.endTime).getTime();
  
  // Verificar se há sobreposição de horários
  return (startA < endB && startB < endA);
};

/**
 * Calcula o tempo total estimado para completar o exame
 * @param exam O exame para calcular o tempo
 * @returns Tempo estimado em minutos
 */
export const calculateEstimatedTime = (exam: Exam): number => {
  if (!exam.questions || !Array.isArray(exam.questions)) {
    return 0;
  }
  
  // Se já tiver um tempo limite definido, retorná-lo
  if (exam.timeLimit && typeof exam.timeLimit === 'number' && exam.timeLimit > 0) {
    return exam.timeLimit;
  }
  
  // Caso contrário, estimar com base no número de questões (3 minutos por questão)
  const questionCount = exam.questions.length;
  return questionCount * 3;
};