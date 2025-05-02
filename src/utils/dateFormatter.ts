/**
 * Utilitário unificado para formatação e manipulação de datas
 */
import {
  format,
  addDays,
  addMonths,
  addWeeks,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isBefore,
  isAfter,
  parseISO
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Converte vários tipos de entrada para objeto Date
 * 
 * @param date - Data a ser convertida (string ISO, Date ou timestamp)
 * @returns Objeto Date ou null se inválido
 */
export const toDateObject = (date: string | Date | number): Date | null => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) :
      date instanceof Date ? date :
        new Date(date);

    // Verifica se a data é válida
    if (isNaN(dateObj.getTime())) {
      console.error('Data inválida:', date);
      return null;
    }

    return dateObj;
  } catch (error) {
    console.error('Erro ao converter data:', error);
    return null;
  }
};

/**
 * Formata uma data usando o padrão especificado
 * 
 * @param date - Data a ser formatada (string ISO, Date ou timestamp)
 * @param formatString - String de formatação (padrão: 'dd/MM/yyyy')
 * @returns Data formatada como string
 */
export const formatDate = (
  date: string | Date | number,
  formatString: string = 'dd/MM/yyyy'
): string => {
  try {
    const dateObj = toDateObject(date);
    if (!dateObj) return 'Data inválida';

    return format(dateObj, formatString, { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Erro na data';
  }
};

/**
 * Formata uma data para o formato local brasileiro (DD/MM/YYYY)
 * Método legado mantido para compatibilidade
 * 
 * @param date - Data a ser formatada (string ISO, Date ou timestamp)
 * @returns Data formatada como string
 */
export const formatDateBR = (date: string | Date | number): string => {
  try {
    const dateObj = toDateObject(date);
    if (!dateObj) return 'Data inválida';

    // Formatação para o padrão brasileiro usando Intl
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
 * Formata apenas a hora (HH:mm)
 * 
 * @param date - Data a ser formatada
 * @returns Hora formatada como string
 */
export const formatTime = (date: string | Date | number): string => {
  try {
    const dateObj = toDateObject(date);
    if (!dateObj) return 'Hora inválida';

    return format(dateObj, 'HH:mm', { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar hora:', error);
    return 'Erro na hora';
  }
};

/**
 * Formata uma data para o formato local brasileiro com hora (DD/MM/YYYY HH:MM)
 * 
 * @param date - Data a ser formatada
 * @param time - Hora opcional (se não fornecida, usa a hora da data)
 * @returns Data e hora formatadas como string
 */
export const formatDateTime = (date: string | Date | number, time?: string): string => {
  try {
    const dateObj = toDateObject(date);
    if (!dateObj) return 'Data/hora inválida';

    // Se um horário específico foi fornecido, combina com a data
    if (time) {
      const [hours, minutes] = time.split(':').map(Number);
      dateObj.setHours(hours || 0, minutes || 0);
    }

    return format(dateObj, 'dd/MM/yyyy HH:mm', { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data e hora:', error);
    return 'Erro na data/hora';
  }
};

/**
 * Formata para exibição de data completa (ex: "Segunda-feira, 29 de março de 2025")
 * 
 * @param date - Data a ser formatada
 * @returns Data formatada por extenso
 */
export const formatFullDate = (date: Date | string): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!dateObj) return 'Data inválida';
    return format(dateObj, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data completa:', error);
    return 'Erro na data';
  }
};

/**
 * Gera um array de datas para uma semana
 * 
 * @param date - Data de referência
 * @returns Array de Dates representando os dias da semana
 */
export const getWeekDays = (date: string | Date | number): Date[] => {
  const dateObj = toDateObject(date);
  if (!dateObj) return [];

  const start = startOfWeek(dateObj, { weekStartsOn: 0 });
  const end = endOfWeek(dateObj, { weekStartsOn: 0 });

  return eachDayOfInterval({ start, end });
};

/**
 * Gera um array de datas para visualização de um mês (incluindo dias de meses adjacentes)
 * 
 * @param date - Data de referência
 * @returns Array de Dates para calendário mensal
 */
export const getMonthCalendarDays = (date: string | Date | number): Date[] => {
  const dateObj = toDateObject(date);
  if (!dateObj) return [];
  
  const monthStart = startOfMonth(dateObj);
  const monthEnd = endOfMonth(dateObj);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
  
  return eachDayOfInterval({ start: startDate, end: endDate });
};

/**
 * Navega para o próximo período com base na visualização
 * 
 * @param date - Data atual
 * @param view - Tipo de visualização ('day', 'week', 'month')
 * @returns Nova data
 */
export const navigateToNext = (date: string | Date | number, view: string): Date | null => {
  const dateObj = toDateObject(date);
  if (!dateObj) return null;
  
  switch (view) {
    case 'day':
      return addDays(dateObj, 1);
    case 'week':
      return addWeeks(dateObj, 1);
    case 'month':
      return addMonths(dateObj, 1);
    default:
      return dateObj;
  }
};

/**
 * Navega para o período anterior com base na visualização
 * 
 * @param date - Data atual
 * @param view - Tipo de visualização ('day', 'week', 'month')
 * @returns Nova data
 */
export const navigateToPrevious = (date: string | Date | number, view: string): Date | null => {
  const dateObj = toDateObject(date);
  if (!dateObj) return null;
  
  switch (view) {
    case 'day':
      return addDays(dateObj, -1);
    case 'week':
      return addWeeks(dateObj, -1);
    case 'month':
      return addMonths(dateObj, -1);
    default:
      return dateObj;
  }
};

/**
 * Verifica se a data é hoje
 * 
 * @param date - Data a ser verificada
 * @returns Verdadeiro se for hoje
 */
export const isToday = (date: string | Date | number): boolean => {
  const dateObj = toDateObject(date);
  if (!dateObj) return false;
  
  return isSameDay(dateObj, new Date());
};

/**
 * Verifica se a data é fim de semana
 * 
 * @param date - Data a ser verificada
 * @returns Verdadeiro se for fim de semana (sábado ou domingo)
 */
export const isWeekend = (date: string | Date | number): boolean => {
  const dateObj = toDateObject(date);
  if (!dateObj) return false;
  
  const day = dateObj.getDay();
  return day === 0 || day === 6;
};

/**
 * Verifica se um evento se sobrepõe a um intervalo de tempo
 * 
 * @param eventStart - Data/hora de início do evento
 * @param eventEnd - Data/hora de fim do evento
 * @param slotStart - Data/hora de início do intervalo
 * @param slotEnd - Data/hora de fim do intervalo
 * @returns Verdadeiro se houver sobreposição
 */
export const eventOverlapsTimeSlot = (
  eventStart: string | Date | number,
  eventEnd: string | Date | number,
  slotStart: string | Date | number,
  slotEnd: string | Date | number
): boolean => {
  const start = toDateObject(eventStart);
  const end = toDateObject(eventEnd);
  const slotStartObj = toDateObject(slotStart);
  const slotEndObj = toDateObject(slotEnd);
  
  if (!start || !end || !slotStartObj || !slotEndObj) return false;
  
  return (
    ((isAfter(start, slotStartObj) || isSameDay(start, slotStartObj)) &&
    (isBefore(start, slotEndObj))) ||
    (isAfter(end, slotStartObj) && isBefore(end, slotEndObj)) ||
    (isBefore(start, slotStartObj) && isAfter(end, slotEndObj))
  );
};

/**
 * Gera array de horas para visualização diária
 * 
 * @returns Array de strings no formato "HH:00"
 */
export const getHoursOfDay = (): string[] => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(`${i.toString().padStart(2, '0')}:00`);
  }
  return hours;
};