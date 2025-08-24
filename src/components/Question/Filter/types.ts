import { QuestionType } from "../../../types/evaluation/Question";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FiltersProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  categoryOptions: FilterOption[];
  difficultyOptions: FilterOption[];
  selectedCategory: string;
  selectedDifficulty: string;
  onCategoryChange: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  showAdvanced?: boolean;
  onAdvancedToggle?: () => void;
  onQuestionTypeFilter: (value: QuestionType) => void;
  className?: string;
}