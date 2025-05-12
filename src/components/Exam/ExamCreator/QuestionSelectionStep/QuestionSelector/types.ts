import { Exam } from '../../../../../utils/types/Exam';
import { Question, DifficultyLevelType, QuestionStatus } from '../../../../../utils/types/Question';

export interface QuestionSelectorProps {
  examData: Exam;
  selectedQuestions: Question[];
  onSelectQuestion: (question: Question) => void;
  onQuestionSelect: (question: Question) => void;
  onSelectAll: (questions: Question[]) => void;
  onClearSelection: () => void;
}

export type FilterValues = {
  discipline: string;
  type: string;
  difficulty: DifficultyLevelType | '';
  status: QuestionStatus | '';
  dateStart: string;
  dateEnd: string;
};

export const DIFFICULTY_LABELS: Record<DifficultyLevelType, string> = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
};