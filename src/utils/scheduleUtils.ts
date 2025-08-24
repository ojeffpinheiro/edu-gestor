/**
 * Utilitários para gerenciamento de horários
 * @module scheduleUtils
 */

import { Lesson } from "../types/academic/Planning";

/**
 * Verifica conflitos de horário
 * @param {Lesson[]} existingLessons - Aulas existentes
 * @param {Lesson} newLesson - Nova aula a ser verificada
 * @returns {boolean} True se houver conflito
 */
export function hasScheduleConflict(existingLessons: Lesson[], newLesson: Lesson): boolean {
  return existingLessons.some(lesson => 
    lesson.day === newLesson.day &&
    lesson.team === newLesson.team &&
    lesson.timeSlot === newLesson.timeSlot
  );
}

/**
 * Filtra aulas por turma e dia
 * @param {Lesson[]} lessons - Todas as aulas
 * @param {string} team - Nome da turma
 * @param {string} day - Dia da semana
 * @returns {Lesson[]} Aulas filtradas
 */
export function filterLessons(lessons: Lesson[], team: string, day: string): Lesson[] {
  return lessons.filter(lesson => 
    lesson.team === team && 
    lesson.day === day
  );
}