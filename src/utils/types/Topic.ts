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
  variables: Variable[];
  tags: string[];
  topics: string[];
  createdAt: Date;
}

/**
 * Estrutura para um símbolo de equação
 */
export interface Symbol {
  display: string;
  insert: string;
  tooltip: string;
}

/**
 * Categoria de símbolos para o editor de equações
 */
export interface SymbolCategory {
  id: string;
  title: string;
  symbols: Symbol[];
}

export interface Variable {
  symbol: string;
  name: string; 
  unit: string[];
}