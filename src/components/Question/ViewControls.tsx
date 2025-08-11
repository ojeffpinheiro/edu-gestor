import React from 'react';
import { SortControls } from '../Sort/SortControls';
import QuestionViewModeToggle from './QuestionView/QuestionViewModeToggle';

interface ViewControlsProps {
  // Props para SortControls
  sortOptions: Array<{ value: string; label: string }>;
  sortValue: string;
  sortDirection: 'asc' | 'desc';
  onSortChange: (field: string, direction: 'asc' | 'desc') => void;
  
  // Props para QuestionViewModeToggle
  viewMode: 'cards' | 'table';
  onViewModeChange: (mode: 'cards' | 'table') => void;
  
  // Layout props
  align?: 'left' | 'right' | 'space-between';
  gap?: number;
}

const ViewControls: React.FC<ViewControlsProps> = ({
  sortOptions,
  sortValue,
  sortDirection,
  onSortChange,
  viewMode,
  onViewModeChange,
  align = 'space-between',
  gap = 1,
}) => {
  const alignmentStyles = {
    left: 'flex-start',
    right: 'flex-end',
    'space-between': 'space-between',
  };

  return (
    <div 
      className="view-controls"
      style={{
        display: 'flex',
        justifyContent: alignmentStyles[align],
        alignItems: 'center',
        gap: `${gap}rem`,
        marginBottom: '1rem',
      }}
    >
      <SortControls
        options={sortOptions}
        value={sortValue}
        direction={sortDirection}
        onChange={onSortChange}
        variant="dropdown"
      />

      <QuestionViewModeToggle
        mode={viewMode}
        onChange={onViewModeChange}
      />
    </div>
  );
};

export default ViewControls;