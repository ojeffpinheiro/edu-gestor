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
    isSameMonth,
    isBefore,
    isAfter,
    parseISO
  } from 'date-fns';
  import { ptBR } from 'date-fns/locale';
  
  // Format date for display
  export const formatDate = (date: Date | string, formatString: string): string => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatString, { locale: ptBR });
  };
  
  // Format time only (HH:mm)
  export const formatTime = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'HH:mm', { locale: ptBR });
  };
  
  // Format for full date display (e.g., "Segunda-feira, 29 de março de 2025")
  export const formatFullDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
  };
  
  // Generate an array of dates for a week
  export const getWeekDays = (date: Date): Date[] => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const end = endOfWeek(date, { weekStartsOn: 0 });
    
    return eachDayOfInterval({ start, end });
  };
  
  // Generate an array of dates for a month view (including days from prev/next months)
  export const getMonthCalendarDays = (date: Date): Date[] => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
    
    return eachDayOfInterval({ start: startDate, end: endDate });
  };
  
  // Navigate to next period based on view
  export const navigateToNext = (date: Date, view: string): Date => {
    switch (view) {
      case 'day':
        return addDays(date, 1);
      case 'week':
        return addWeeks(date, 1);
      case 'month':
        return addMonths(date, 1);
      default:
        return date;
    }
  };
  
  // Navigate to previous period based on view
  export const navigateToPrevious = (date: Date, view: string): Date => {
    switch (view) {
      case 'day':
        return addDays(date, -1);
      case 'week':
        return addWeeks(date, -1);
      case 'month':
        return addMonths(date, -1);
      default:
        return date;
    }
  };
  
  // Check if date is today
  export const isToday = (date: Date): boolean => {
    return isSameDay(date, new Date());
  };
  
  // Check if date is weekend
  export const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };
  
  // Check if event overlaps with time slot
  export const eventOverlapsTimeSlot = (
    eventStart: Date | string,
    eventEnd: Date | string,
    slotStart: Date,
    slotEnd: Date
  ): boolean => {
    const start = typeof eventStart === 'string' ? parseISO(eventStart) : eventStart;
    const end = typeof eventEnd === 'string' ? parseISO(eventEnd) : eventEnd;
    
    return (
      (isAfter(start, slotStart) || isSameDay(start, slotStart)) &&
      (isBefore(start, slotEnd)) ||
      (isAfter(end, slotStart) && isBefore(end, slotEnd)) ||
      (isBefore(start, slotStart) && isAfter(end, slotEnd))
    );
  };
  
  // Generate array of hours for day view
  export const getHoursOfDay = (): string[] => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(`${i.toString().padStart(2, '0')}:00`);
    }
    return hours;
  };