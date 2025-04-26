/**
 * Utilitário de segurança para operações de exames
 */

/**
 * Valida se uma senha atende aos requisitos mínimos de segurança
 * @param password A senha a ser validada
 * @returns Um objeto contendo o resultado da validação e mensagens
 */
export const validateExamPassword = (password: string): { isValid: boolean; message: string } => {
    if (!password || password.length < 6) {
      return {
        isValid: false,
        message: 'A senha deve ter pelo menos 6 caracteres'
      };
    }
  
    // Verificar complexidade: pelo menos um número e uma letra
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
  
    if (!hasLetter || !hasNumber) {
      return {
        isValid: false,
        message: 'A senha deve conter pelo menos uma letra e um número'
      };
    }
  
    return { isValid: true, message: 'Senha válida' };
  };
  
  /**
   * Mascara uma senha para exibição parcial
   * @param password A senha a ser mascarada
   * @returns Senha mascarada (ex: ••••••)
   */
  export const maskPassword = (password: string): string => {
    if (!password) return '';
    return '•'.repeat(Math.min(password.length, 10));
  };
  
  /**
   * Verifica se a senha de um exame está correta
   * @param providedPassword Senha fornecida pelo usuário
   * @param actualPassword Senha real do exame
   * @returns Boolean indicando se a senha é válida
   */
  export const verifyExamPassword = (providedPassword: string, actualPassword: string): boolean => {
    if (!providedPassword || !actualPassword) return false;
    return providedPassword === actualPassword;
  };
  
  /**
   * Gera um token de acesso temporário para um exame
   * @param examId ID do exame
   * @param userId ID do usuário
   * @returns Token de acesso temporário
   */
  export const generateExamAccessToken = (examId: string, userId: string): string => {
    const timestamp = Date.now();
    const randomPart = Math.random().toString(36).substring(2, 10);
    return `exam_${examId}_${userId}_${timestamp}_${randomPart}`;
  };
  
  /**
   * Valida um token de acesso a um exame
   * @param token Token a ser validado
   * @param examId ID do exame que o token deve acessar
   * @returns Boolean indicando se o token é válido
   */
  export const validateExamAccessToken = (token: string, examId: string): boolean => {
    if (!token || !examId) return false;
    
    // Verificar se o token contém o ID do exame correto
    if (!token.includes(`exam_${examId}_`)) return false;
    
    // Extrair timestamp do token
    const parts = token.split('_');
    if (parts.length < 4) return false;
    
    const timestamp = parseInt(parts[3], 10);
    if (isNaN(timestamp)) return false;
    
    // Verificar se o token não expirou (30 minutos = 1800000 ms)
    const expirationTime = 1800000;
    const now = Date.now();
    
    return (now - timestamp) < expirationTime;
  };