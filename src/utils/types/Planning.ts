import { LessonPlan } from "./DidacticSequence";
import { Event } from "./Event";

export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

export interface Lesson {
    id: number;
    team: string;
    day: DayOfWeek;
    timeSlot: string;
    discipline: string;
    order?: number;
}

export interface Team {
  id: number;
  name: string;
  session: 'Manhã' | 'Tarde' | 'Noite';
  numStudent: number;
  gradeLevel?: string;
  specificRequirements?: string;
  schedule?: string[];
  learningObjectives?: LearningObjective[];
  studentList?: string;
}

export type DayOfWeek = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta'

export interface NonSchoolDay {
  id: number;
  description: string;
  date: string;
  affectsAllTeams: boolean;
  affectedTeams?: number[];
}

export interface Holiday extends Event {
  type: 'event';
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

export interface LearningObjective {
  id: number;
  description: string;
  completed: boolean;
}