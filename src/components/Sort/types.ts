export interface SortOption {
  value: string;
  label: string;
  direction?: 'asc' | 'desc';
}

export interface SortControlsProps {
  options: SortOption[];
  value: string;
  direction?: 'asc' | 'desc';
  className?: string;
  variant?: 'dropdown' | 'buttons';
  onChange: (value: string, direction: 'asc' | 'desc') => void;
}