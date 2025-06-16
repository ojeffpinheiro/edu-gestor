import { Lesson } from "../utils/types/Planning";


class ScheduleManager {
  /**
   * Verifica disponibilidade de horário considerando:
   * - Conflitos com aulas existentes
   * - Feriados
   * - Limites de horário escolar
   */
  static checkAvailability(
    lessons: Lesson[], 
    newLesson: Lesson, 
    holidays: { date: string }[] = []
  ): { available: boolean; conflictReason?: string } {
    // Verificar conflito com aulas existentes
    const timeConflict = lessons.some(lesson => 
      lesson.day === newLesson.day &&
      lesson.timeSlot === newLesson.timeSlot &&
      lesson.team === newLesson.team
    );

    if (timeConflict) {
      return { available: false, conflictReason: 'Conflito de horário com outra aula' };
    }

    // Verificar se é feriado
    const lessonDate = this.parseLessonDate(newLesson.day);
    if (holidays.some(h => new Date(h.date).toDateString() === lessonDate.toDateString())) {
      return { available: false, conflictReason: 'Data é um feriado' };
    }

    // Verificar horário dentro do período letivo
    const [startTime] = newLesson.timeSlot.split(' - ');
    if (!this.isValidSchoolTime(startTime)) {
      return { available: false, conflictReason: 'Fora do horário escolar' };
    }

    return { available: true };
  }

  /**
   * Gera intervalos de tempo para seleção no formulário
   */
  static generateTimeSlots(
    start: string = '07:00',
    end: string = '22:00',
    interval: number = 30
  ): string[] {
    const slots: string[] = [];
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    let currentHour = startHour;
    let currentMinute = startMinute;

    while (
      currentHour < endHour || 
      (currentHour === endHour && currentMinute <= endMinute)
    ) {
      const endTimeHour = currentMinute + interval >= 60 ? currentHour + 1 : currentHour;
      const endTimeMinute = (currentMinute + interval) % 60;

      slots.push(
        `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')} - ` +
        `${String(endTimeHour).padStart(2, '0')}:${String(endTimeMinute).padStart(2, '0')}`
      );

      currentHour = currentMinute + interval >= 60 ? currentHour + 1 : currentHour;
      currentMinute = (currentMinute + interval) % 60;
    }

    return slots;
  }

  private static parseLessonDate(day: string): Date {
    // Implementação que converte "Segunda", "Terça", etc. para uma data real
    // (considerando a semana atual)
    const daysMap: Record<string, number> = {
      'Segunda': 1,
      'Terça': 2,
      'Quarta': 3,
      'Quinta': 4,
      'Sexta': 5
    };
    
    const today = new Date();
    const targetDay = daysMap[day];
    const currentDay = today.getDay() || 7;
    const diff = targetDay - currentDay;
    
    const result = new Date(today);
    result.setDate(today.getDate() + diff);
    return result;
  }

  private static isValidSchoolTime(time: string): boolean {
    const hour = Number(time.split(':')[0]);
    return hour >= 7 && hour <= 22;
  }
}

export default ScheduleManager;