export type Discipline = 'Física' | 'Matemática';

export type KnowledgeArea = {
  id: string;
  name: string;
  discipline: Discipline;
};

export interface Topic {
  id: string;
  title: string;
  description?: string;
  discipline: Discipline;
  knowledgeArea: string;
  parentId: string | null;
  level: number;
  children: Topic[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TopicFormData {
  name: string;
  discipline: string;
  knowledgeArea: string;
  parentId: string;
}

export interface FilterOptions {
  searchTerm: string;
  discipline: string;
  knowledgeArea: string;
}

export interface Equation {
  id: string;
  latex: string;
  name: string;
  description: string;
  variables: Array<{ symbol: string; name: string; unit: string; }>;
  tags: string[];
  topics: string[];
  createdAt: Date;
}