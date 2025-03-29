// src/types/DidacticSequence.ts
  export const DisciplineType = {
    Português: 'Português',
    Matemática: 'Matemática',
    História: 'História',
    Geografia: 'Geografia',
    Ciências: 'Ciências',
    Artes: 'Artes',
    'Educação Física': 'Educação Física',
    Inglês: 'Inglês',
    Outro: 'Outro'
  } as const;
  
export type DisciplineType = typeof DisciplineType[keyof typeof DisciplineType];

export interface BNCCCode {
  id: string;
  description: string;
}

export interface SequenceStage {
  id: string;
  title: string;
  description: string;
  duration: number; // em minutos
  resources: string[];
  activities: string[];
  evaluationMethod?: string;
}

export interface DidacticSequence {
  id: string;
  title: string;
  discipline: DisciplineType;
  targetAudience: string; // Ex: "5º Ano", "Ensino Médio"
  overview: string;
  objectives: string[];
  bnccCodes: BNCCCode[];
  skills: string[];
  stages: SequenceStage[];
  totalDuration: number; // Calculado com base nas etapas
  createdAt: Date;
  updatedAt: Date;
  author: string;
}