import { useState } from 'react';
import { DayOfWeek, Lesson } from '../utils/types/Planning';

export const useSchedule = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const days: DayOfWeek[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  const moveLesson = (lessonId: number, newDay: DayOfWeek) => {
    setLessons(prev => prev.map(lesson => 
      lesson.id === lessonId ? { ...lesson, day: newDay } : lesson
    ));
  };

  const handleReorder = (draggedId: number, targetId: number) => {
    // Lógica para reordenar aulas no mesmo dia
  };

  return { lessons, moveLesson, handleReorder, days };
};