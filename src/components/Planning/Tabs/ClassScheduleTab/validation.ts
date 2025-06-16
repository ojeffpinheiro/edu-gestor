import { Lesson } from "../../../../utils/types/Planning";

export const validateLesson = (lesson: Lesson): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!lesson.team || lesson.team.trim() === '') {
        errors.team = 'Selecione uma turma';
    }

    if (!lesson.day || lesson.day.trim() === '') {
        errors.day = 'Selecione um dia da semana';
    }

    if (!lesson.timeSlot || lesson.timeSlot.trim() === '') {
        errors.timeSlot = 'Selecione um horário';
    }

    if (!lesson.discipline || lesson.discipline.trim() === '') {
        errors.discipline = 'Informe a disciplina';
    } else if (lesson.discipline.length < 3) {
        errors.discipline = 'Disciplina muito curta';
    }

    return errors;
};