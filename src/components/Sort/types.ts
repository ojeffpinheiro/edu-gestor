export interface SortOption {
  value: string;
  label: string;
  direction?: 'asc' | 'desc';
}

export interface SortControlsProps {
  options: SortOption[];
  value: string;
  direction?: 'asc' | 'desc';
  onChange: (value: string, direction?: 'asc' | 'desc') => void;
  className?: string;
  variant?: 'dropdown' | 'buttons';
}