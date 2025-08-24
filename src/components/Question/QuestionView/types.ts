import { Question } from "../../../types/evaluation/Question";

export type ViewMode = 'cards' | 'table';

export interface QuestionViewModeToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  className?: string;
}

export interface QuestionDetailModalProps {
  question: Question;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}