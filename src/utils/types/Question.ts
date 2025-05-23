export interface Topic {
  id: string;
  name: string;
}

export interface Content {
  id: string;
  topicId: string;
  name: string;
}

export type QuestionType = 'multiple_choice' | 'true_false' | 'essay' | 'fill_in_the_blank' | 'all';

export type DifficultyLevelType = 'easy' | 'medium' | 'hard';

export type QuestionStatus = 'draft' | 'active' | 'inactive';

export interface Alternative {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id?: string;
  contentId: string;
  statement: string;
  questionType: QuestionType;
  difficultyLevel: DifficultyLevelType;
  discipline: string;
  alternatives: Alternative[];
  correctAnswer?: string;
  explanation: string;
  createdAt: string;
  updatedAt: string;
  status: QuestionStatus;
  imageUrl?: string;
  tags?: string[];source?: string;
  accessDate?: string;
  optionsLayout?: 'one-column' | 'two-columns' | 'three-columns';
}

// Interface para as props dos componentes de passo
export interface StepProps {
    formData: Question;
    updateFormData: (updates: Partial<Question>) => void;
    validationErrors: { [key: string]: string };
    topics: Topic[];
    contents?: Content[];
    selectedTopicId: string;
    setSelectedTopicId: (id: string) => void;
    filteredContents: Content[];
    setValidationErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

export interface Variable {
  name: string;
  min: number;
  max: number;
  unit: string;
  precision: number;
  value?: number;
  step?: number;
  isRandom?: boolean;
  currentValue?: number;
}

export enum FormStep {
  Classification = 0,
  Content = 1,
  Alternatives = 2,
  Feedback = 3
}

export interface UnitType {
  id: string;
  name: string;
  symbol: string;
  type: string;
  description?: string;
  baseUnit?: boolean;
  conversionFactor?: number;
  baseUnitId?: string;
}

export interface ConversionRelation {
  fromUnit: string;
  toUnit: string;
  factor: number;
  formula?: string;
  description?: string;
}

export type DisciplineType = 'Matemática' | 'Português' | 'Ciências' | 'História' | 'Geografia';

export interface Filters {
  contentId: string;
  difficulty: DifficultyLevelType | '';
}

export interface QuestionFilters {
  contentId: string;
  difficulty: DifficultyLevelType;
  questionType?: 'multiple_choice' | 'true_false' | 'essay' | '';
  status?: 'active' | 'inactive' | '';
}