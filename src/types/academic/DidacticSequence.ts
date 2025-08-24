// src/utils/types/DidacticSequence.ts

export type DisciplineType = 'Português' | 'Matemática' | 'História' | 'Geografia' | 'Ciências' | 'Artes' | 'Educação Física';

export type EducationLevel = 'Infantil' | 'Fundamental I' | 'Fundamental II' | 'Médio' | 'Superior';

export type SequenceStatus = 'draft' | 'active' | 'completed';

export type StageType = {
  id: string;
  title: string;
  description: string;
  duration: number;
  status: 'draft' | 'active' | 'completed';
  type: 'aula' | 'atividade' | 'outro' | 'bncc' | 'objective';
  objectives: string[];
  skills: string[];
  evaluationCriteria: string[];
  methodologies: string[];
  bnccCodes: string[];
  prerequisites: string[];
  comments: string[];
  attachments: string[];
  estimatedTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  resources: string[];
  activities: string[];
  contentExplanation: string;
  evaluationType: string;
  evaluationMethod: string;
  evaluationWeight: number;
  evaluationNotes: string;
};

export interface DidacticSequence {
  id: string;
  title: string;
  discipline: DisciplineType;
  author: string;
  thematicAxis: string;
  sequence: string;
  educationLevel: EducationLevel;
  workload: number; // em horas
  overview: string;
  
  // Habilidades
  skills: string[];
  bnccCodes: string[];
  lessonsCount: number;
  
  // Objetivos
  objectives: string[];
  
  // Etapas
  stages: StageType[];
  
  // Metadados
  createdAt: string;
  updatedAt: string;
  status: SequenceStatus;
}

export interface LessonPlan {
  id: string;
  sequenceId: string;
  title: string;
  description: string;
  duration: number; // em minutos
  discipline: DisciplineType;
  applicationWeek: string;
  status: 'Em planejamento' | 'Planejada' | 'Em aplicação' | 'Aplicada' | 'Lançada';
  classGroup: string;
  type: 'Avaliação' | 'Aula';
  objectives: string[];
  skills: string[];
  bnccCodes: string[];
  developedSkills: string[];
  learningObjectives: string[];
  methodologies: string[];
  knowledgeObjects: {
    title: string;
    subtitles?: string[];
  }[];
  necessaryResources: string[];
  contentExplanation: string;
  solvedExercises: {
    statement: string;
    solution: string;
  }[];
  evaluation: {
    type: string;
    criteria: string[];
    weight: number;
    registrationText: string;
    exercises?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface SequenceFormData {
  id: string;
  title: string;
  thematicAxis: string;
  sequence: string;
  educationLevel: string;
  discipline: string;
  author: string;
  workload: number;
  overview: string;
  lessonsCount: number;
  skills: string[];
  objectives: string[];
  bnccCodes: string[];
  stages: StageType[];
  createdAt: string;
  updatedAt: string;
  status: SequenceStatus;
}

export interface Discipline {
  id: string;
  name: string;
}

export interface DidacticSequenceType {
  id: string;
  disciplineId: string;
  title: string;
  description: string;
  grade: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DidacticSequenceStage {
  id: string;
  sequenceId: string;
  title: string;
  learningObjectives: string[];
  order: number;
}

export interface ContentSection {
  id: string;
  stageId: string;
  type: 'text' | 'example' | 'solved-exercise' | 'exercise-list';
  content: string;
  explanation?: string;
  order: number;
}

export interface Exercise {
  id: string;
  contentSectionId: string;
  question: string;
  solution?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}