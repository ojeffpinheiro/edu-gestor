import { hasScheduleConflict } from "./scheduleUtils";
import { DayOfWeek, Holiday, Lesson } from "./types/Planning";

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


export const daysOfWeek: DayOfWeek[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

export const timeSlots = [
  '07:00 - 08:00',
  '08:00 - 09:00',
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
  '17:00 - 18:00',
];

export const timeFormatRule = {
  pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
  customMessage: 'Formato inválido (use HH:MM)'
};

export const futureDateRule = {
  custom: (value: string) =>
    new Date(value) < new Date() ? 'Data deve ser futura' : null
};