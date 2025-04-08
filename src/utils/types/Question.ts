export interface Topic {
  id: string;
  name: string;
}

export interface Content {
  id: string;
  topicId: string;
  name: string;
}

export interface Alternative {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id?: string;
  contentId: string;
  statement: string;
  questionType: 'multiple_choice' | 'true_false' | 'essay';
  difficultyLevel: 'easy' | 'medium' | 'hard';
  alternatives: Alternative[];
  explanation: string;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive';
  imageUrl?: string;
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

export enum FormStep {
  Classification = 0,
  Content = 1,
  Alternatives = 2,
  Feedback = 3
}