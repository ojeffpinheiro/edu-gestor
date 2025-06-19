import { LessonPlan } from "./DidacticSequence";
import { Event } from "./Event";

export enum Session {
  MORNING = 'Manhã',
  AFTERNOON = 'Tarde',
  EVENING = 'Noite'
}

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
    shift: Shift;
    room?: string; 
    classGroup?: string;
    order?: number;
}

export interface Team {
  id: number;
  name: string;
  session: Session;
  numStudent: number;
  gradeLevel?: string;
  specificRequirements?: string;
  schedule?: Lesson[];
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

// Add to Planning.ts
export type Shift = 'Manhã' | 'Tarde' | 'Noite';

export interface ShiftSettings {
  name: Shift;
  startTime: string;
  endTime: string;
  periodDuration: number;
  breakDuration: number;
  periods: Period[];
}

export interface Period {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  isBreak?: boolean;
}