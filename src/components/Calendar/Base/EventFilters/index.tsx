import React from 'react';
import { FilterButton, FiltersContainer } from './styles';

interface FilterOption {
  key: string;
  label: string;
  color: string;
}

interface EventFiltersProps {
  filters: Record<string, boolean>;
  options: FilterOption[];
  onChange: (key: string) => void;
}

export const EventFilters: React.FC<EventFiltersProps> = ({ filters, options, onChange }) => {
  return (
    <FiltersContainer>
      {options.map(option => (
        <FilterButton
          key={option.key}
          active={filters[option.key]}
          color={option.color}
          onClick={() => onChange(option.key)}
        >
          {option.label}
        </FilterButton>
      ))}
    </FiltersContainer>
  );
};