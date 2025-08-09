import React from 'react'
import { SortOption } from '../Sort/types';

interface EnhancedSortControlsProps {
  options: SortOption[];
  value: string;
  direction: 'asc' | 'desc';
  onChange: (field: string, direction: 'asc' | 'desc') => void;
  className?: string;
}

export const EnhancedSortControls: React.FC<EnhancedSortControlsProps> = ({
  options,
  value,
  direction,
  onChange,
  className
}) => {
  return (
    <div className={`sort-controls ${className}`}>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value, direction)}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      <button 
        onClick={() => onChange(value, direction === 'asc' ? 'desc' : 'asc')}
        aria-label={`Ordenação ${direction === 'asc' ? 'ascendente' : 'descendente'}`}
      >
        {direction === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
};