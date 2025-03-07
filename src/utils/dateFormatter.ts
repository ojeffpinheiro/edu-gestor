/**
 * Formata uma string de data no formato ISO para exibição local
 * @param isoDateString String de data no formato ISO (YYYY-MM-DD)
 * @returns Data formatada para exibição (DD/MM/YYYY)
 */
export const formatDate = (isoDateString: string): string => {
  try {
    const date = new Date(isoDateString);
    
    // Verificação para datas inválidas
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Erro na data';
  }
};