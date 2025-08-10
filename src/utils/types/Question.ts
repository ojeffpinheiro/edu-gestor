export interface Topic {
  id: string;
  name: string;
}

export interface Content {
  id: string;
  topicId: string;
  name: string;
}

export type QuestionType =
  | 'multiple_choice'
  | 'true_false'
  | 'essay'
  | 'fill_in_the_blank'
  | 'short_answer'
  | 'matching'
  | 'ordering';

export type AnswerType =
  | 'single_select'
  | 'multi_select'
  | 'text'
  | 'boolean'
  | 'code'
  | 'formula';

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  multiple_choice: 'Múltipla Escolha',
  true_false: 'Verdadeiro/Falso',
  essay: 'Dissertativa',
  fill_in_the_blank: 'Preenchimento',
  short_answer: 'Resposta Curta',
  matching: 'Correspondência',
  ordering: 'Ordenação'
};

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
  tags?: string[]; source?: string;
  accessDate?: string;
  optionsLayout?: 'one-column' | 'two-columns' | 'three-columns';
  timesUsed?: number;
  correctRate?: number;
  pinned?: boolean;
  isComposite?: boolean;
  componentQuestions?: string[];
  rating?: number;
  isFavorite?: boolean;
  usageCount?: number;
  answerStats?: {
    totalAttempts: number;
    correctAttempts: number;
  };
  answers: Answer[];
  correctAnswers?: string[];
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
  difficulty: DifficultyLevelType | '';
  questionType: QuestionType | '';
  discipline: DisciplineType | '';
  status: QuestionStatus | '';
  tags: string[];
  dateRange: { start: string; end: string };
  minCorrectRate?: number;
  maxCorrectRate?: number;
}
export interface Feedback {
  id: string;
  questionId: string;
  type: 'stylistic' | 'pedagogical';
  comment: string;
  severity: 'low' | 'medium' | 'high';
};

export interface Rubric {
  criteria: string;
  levels: {
    description: string;
    points: number;
  }[];
}


export interface Filter {
  difficulty: DifficultyLevelType | '';
  questionType: QuestionType | '';
  status: QuestionStatus | '';
  hasImage: boolean;
  tags: string[];
  dateRange: { start: string; end: string };
  minUsage?: number;
  minCorrectRate?: number;
  contentId?: string;
}

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
  children: React.ReactNode;
  variant?: 'default' | 'underline' | 'pills';
  orientation?: 'horizontal' | 'vertical';
}

export interface FilterOptions {
  searchTerm: string;
  categories: string[];
  difficulties: ('easy' | 'medium' | 'hard')[];
  types: QuestionType[];
  ratingRange: [number, number];
  usageRange: [number, number];
  createdAtRange: [string, string];
  tags: string[];
  discipline: string[];
}

export interface SavedFilter {
  id: string;
  name: string;
  filters: Partial<FilterOptions>;
  isDefault?: boolean;
}

export interface Answer {
  id: string;
  type: AnswerType;
  content: string | string[] | boolean;
  isCorrect: boolean;
  feedback?: string;
}

export interface QuestionBack {
  id: number | string;
  title: string;
  content: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: QuestionType;
  tags: string[];
  createdAt: string;
  lastUsed?: string;
  accuracy?: number;
  usageCount?: number;
  answers?: Answer[];
  explanation?: string;
  correctAnswers?: number[];
  rating?: number; // 0-5
  isFavorite?: boolean;
}
export interface QuestionSimilarity {
  questionId: string;
  similarityScore: number;
  matchedFields: string[];
}