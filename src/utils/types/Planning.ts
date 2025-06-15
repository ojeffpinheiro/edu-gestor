import { LessonPlan } from "./DidacticSequence";

export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

export interface Event {
    id: number,
    title: string;
    date: string;
    type: string;
}

export interface Lesson {
    id: number;
    team: string;
    day: 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta';
    timeSlot: string;
    discipline: string;
}

export interface Team {
    id: number;
    name: string;
    session: 'Manhã' | 'Tarde' | 'Noite';
    numStudent: number;
}

export interface NonSchoolDay {
  id: number;
  description: string;
  date: string;
  affectsAllTeams: boolean;
  affectedTeams?: number[];
}

export interface Holiday extends Event {
  recurring: boolean;
  recurrencePattern?: string;
}

export interface GradeSettings {
  id: string;
  gradeLevel: string;
  curriculum: string;
  specificRequirements: string;
}

export interface LessonPlanTemplate {
  id: string;
  name: string;
  template: Partial<LessonPlan>;
  applicableGrades: string[];
}