import { hasScheduleConflict } from "./scheduleUtils";
import { DayOfWeek, Holiday, Lesson, Period, Shift, ShiftSettings } from "../types/academic/Planning";

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
  customMessage?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateForm<T extends Record<string, any>>(
  data: T,
  rules: Partial<Record<keyof T, ValidationRules>>
): ValidationResult {
  const errors: Record<string, string> = {};

  Object.entries(data).forEach(([field, value]) => {
    const fieldRules = rules[field as keyof T];
    if (!fieldRules) return;

    if (fieldRules.required && !value) {
      errors[field] = fieldRules.customMessage || 'Este campo é obrigatório';
      return;
    }

    if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
      errors[field] = fieldRules.customMessage || `Mínimo de ${fieldRules.minLength} caracteres`;
      return;
    }

    if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
      errors[field] = fieldRules.customMessage || `Máximo de ${fieldRules.maxLength} caracteres`;
      return;
    }

    if (fieldRules.pattern && value && !fieldRules.pattern.test(value)) {
      errors[field] = fieldRules.customMessage || 'Formato inválido';
      return;
    }

    if (fieldRules.custom) {
      const customError = fieldRules.custom(value);
      if (customError) {
        errors[field] = customError;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export const scheduleConflictRule = (existingLessons: Lesson[], newLesson: Lesson) => ({
  custom: (value: any) =>
    hasScheduleConflict(existingLessons, newLesson) ? 'Conflito de horário detectado' : null
});

export const dateValidationRule = (holidays: Holiday[], date: Date) => ({
  custom: (value: any) => {
    const day = date.getDay();
    if (day === 0 || day === 6) return 'Data cai em um fim de semana';
    if (holidays.some(h => new Date(h.date).toDateString() === date.toDateString())) {
      return 'Data é um feriado';
    }
    return null;
  }
});

export const classLimitRule = (currentCount: number, max: number) => ({
  custom: (value: any) =>
    currentCount >= max ? `Limite máximo de ${max} aulas atingido` : null
});

export const maxStudentsRule = (current: number, max: number) => ({
  custom: (value: any) =>
    current > max ? `Turma excede limite de ${max} alunos` : null
});

export const generateTimeSlots = (shift: Shift, periods: Period[]): string[] => {
  return periods
    .filter(period => !period.isBreak)
    .map(period => `${period.startTime} - ${period.endTime}`);
};

export const defaultShiftSettings: Record<Shift, ShiftSettings> = {
  'Manhã': {
    name: 'Manhã',
    startTime: '07:00',
    endTime: '12:00',
    periodDuration: 60,
    breakDuration: 15,
    periods: [
      { id: 1, name: '1º período', startTime: '07:00', endTime: '08:00' },
      { id: 2, name: '2º período', startTime: '08:00', endTime: '09:00' },
      { id: 3, name: 'Intervalo', startTime: '09:00', endTime: '09:15', isBreak: true },
      { id: 4, name: '3º período', startTime: '09:15', endTime: '10:15' },
      { id: 5, name: '4º período', startTime: '10:15', endTime: '11:15' },
      { id: 6, name: '5º período', startTime: '11:15', endTime: '12:00' }
    ]
  },
  'Tarde': {
    name: 'Tarde',
    startTime: '13:00',
    endTime: '18:00',
    periodDuration: 60,
    breakDuration: 15,
    periods: [
      { id: 1, name: '1º período', startTime: '13:00', endTime: '14:00' },
      { id: 2, name: '2º período', startTime: '14:00', endTime: '15:00' },
      { id: 3, name: 'Intervalo', startTime: '15:00', endTime: '15:15', isBreak: true },
      { id: 4, name: '3º período', startTime: '15:15', endTime: '16:15' },
      { id: 5, name: '4º período', startTime: '16:15', endTime: '17:15' },
      { id: 6, name: '5º período', startTime: '17:15', endTime: '18:00' }
    ]
  },
  'Noite': {
    name: 'Noite',
    startTime: '19:00',
    endTime: '22:30',
    periodDuration: 50,
    breakDuration: 10,
    periods: [
      { id: 1, name: '1º período', startTime: '19:00', endTime: '19:50' },
      { id: 2, name: '2º período', startTime: '19:50', endTime: '20:40' },
      { id: 3, name: 'Intervalo', startTime: '20:40', endTime: '20:50', isBreak: true },
      { id: 4, name: '3º período', startTime: '20:50', endTime: '21:40' },
      { id: 5, name: '4º período', startTime: '21:40', endTime: '22:30' }
    ]
  }
};

export const daysOfWeek: DayOfWeek[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

export const timeFormatRule = {
  pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
  customMessage: 'Formato inválido (use HH:MM)'
};

export const futureDateRule = {
  custom: (value: string) =>
    new Date(value) < new Date() ? 'Data deve ser futura' : null
};