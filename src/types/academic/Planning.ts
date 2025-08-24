import { LessonPlan } from "./DidacticSequence";
import { Event } from "../shared/Event";

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

export interface SchoolInfo {
  id: string;
  school: string;
  discipline: string;
  stage: string;
  grade: string;
  knowledgeArea: string;
  studentCount: number;
  classes: string[];
  period: string;
  trimester: string;
}

export interface GeneralObjective {
  id: string;
  description: string;
}

export interface Topic {
  id: string;
  title: string;
  competencies: string[];
  knowledgeObjects: string[];
  transversalTopics: {
    topics: string[];
    skills: string[];
  };
  projects: string[];
  research: {
    topics: string[];
    criteria: string[];
    contents: string[];
  };
}

export interface DetailedPlanning {
  id: string;
  topic: string;
  thematicAxis: string;
  stage: 'initial' | 'intermediate' | 'final';
  skills: string[];
  objectives: string[];
  content: string;
  justification: string;
  methodology: string;
  resources: string[];
  duration: string;
}

export interface DidacticSequence {
  introduction: string;
  development: string;
  application: string;
  evaluationWeek: string;
}

export interface Activity {
  id: string;
  type: 'practice' | 'exercise' | 'list';
  description: string;
  research?: {
    topics: string[];
    content: string[];
    evaluationCriteria: string[];
  };
  evaluative?: {
    criteria: string[];
  };
  leveling?: string;
  answerKey?: string;
}

export interface SupportMaterial {
  slides: string[];
  learningNotebook: string[];
  exerciseLists: string[];
  readingsAndMedia: {
    films: string[];
    books: string[];
    simulators: string[];
    mindMaps: string[];
    infographics: string[];
  };
}

export interface Evaluation {
  criteria: string[];
  instruments: string[];
  selfEvaluation?: string;
}

export interface DiagnosticEvaluation {
  initialEvaluation: string;
  periodicEvaluations: string[];
}

export interface RegistrationAndFeedback {
  registrationMethods: string[];
  feedbackMethods: string[];
}

export interface InclusionAndAccessibility {
  adaptations: string[];
  strategies: string[];
}

export interface DigitalTechnologies {
  platforms: string[];
  activities: {
    synchronous: string[];
    asynchronous: string[];
  };
}

export interface PlanningData {
  id: string;
  schoolInfo: SchoolInfo;
  generalObjectives: GeneralObjective[];
  trimesterTopics: Topic[];
  detailedPlanning: DetailedPlanning[];
  didacticSequence: DidacticSequence;
  activities: Activity[];
  supportMaterials: SupportMaterial;
  evaluation: Evaluation;
  diagnosticEvaluation: DiagnosticEvaluation;
  registrationAndFeedback: RegistrationAndFeedback;
  inclusionAndAccessibility: InclusionAndAccessibility;
  digitalTechnologies: DigitalTechnologies;
  conclusions: string;
  references: string[];
}