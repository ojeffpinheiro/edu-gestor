/**
 * Formata uma data para o formato local brasileiro (DD/MM/YYYY)
 * Aceita string ISO, objeto Date ou timestamp
 * 
 * @param date - Data a ser formatada (string ISO, Date ou timestamp)
 * @returns Data formatada como string
 */
export const formatDate = (date: string | Date | number): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : 
                    date instanceof Date ? date : 
                    new Date(date);
    
    // Verifica se a data é válida
    if (isNaN(dateObj.getTime())) {
      console.error('Data inválida:', date);
      return 'Data inválida';
    }
    
    // Formatação para o padrão brasileiro
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(dateObj);
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Erro na data';
  }
};

/**
 * utils/dateTimeFormatter.ts
 * Utilitário expandido para formatação de datas e horas
 */
/**
 * Formata uma data para o formato local brasileiro com hora (DD/MM/YYYY HH:MM)
 * 
 * @param date - Data a ser formatada
 * @param time - Hora opcional (se não fornecida, usa a hora da data)
 * @returns Data e hora formatadas como string
 */
export const formatDateTime = (date: string | Date, time?: string): string => {
  try {
    const dateObj = new Date(date);
    
    // Se um horário específico foi fornecido, combina com a data
    if (time) {
      const [hours, minutes] = time.split(':').map(Number);
      dateObj.setHours(hours || 0, minutes || 0);
    }
    
    // Formatação para o padrão brasileiro com hora
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj);
  } catch (error) {
    console.error('Erro ao formatar data e hora:', error);
    return 'Erro na data/hora';
  }
};