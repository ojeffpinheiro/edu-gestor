// components/AdvancedFilters.tsx
import React, { useMemo } from 'react';
import { ClassPerformance } from '../../utils/types/Assessment';
import styled from 'styled-components';

export interface FilterState {
  period: string;
  classId: string;
  subject: string;
  searchTerm: string;
}

interface AdvancedFiltersProps {
  periods: string[];
  subjects: string[];
  classes: ClassPerformance[];
  currentFilters: {
    period: string;
    classId: string;
    subject: string;
    searchTerm?: string;
  };
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  isLoading?: boolean;
}

interface SelectFilterProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const FilterGroup = styled.div`
  margin-bottom: 1rem;
`;

const SelectFilter: React.FC<SelectFilterProps> = ({
  label,
  options,
  value,
  onChange,
  disabled
}) => (
  <FilterGroup>
    <label>{label}:</label>
    <select 
      aria-label={`Selecionar ${label}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </FilterGroup>
);

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder
}) => (
  <FilterGroup>
    <label>Buscar:</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </FilterGroup>
);

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  periods,
  subjects,
  classes,
  currentFilters,
  onFilterChange,
  onReset,
  isLoading = false
}) => {
  const periodOptions = useMemo(() => [
    { value: 'all', label: 'Todos' },
    ...periods.map(p => ({ value: p, label: p }))
  ], [periods]);

  const classOptions = useMemo(() => [
    { value: 'all', label: 'Todas as turmas' },
    ...classes.map(c => ({ value: c.classId, label: c.className }))
  ], [classes]);

  const subjectOptions = useMemo(() => [
    { value: 'all', label: 'Todas as disciplinas' },
    ...subjects.map(s => ({ value: s, label: s }))
  ], [subjects]);

  return (
    <div className="filters-container">
      <SelectFilter
        label="Período"
        options={periodOptions}
        value={currentFilters.period}
        onChange={(v) => onFilterChange('period', v)}
        disabled={isLoading}
      />

      <SelectFilter
        label="Turma"
        options={classOptions}
        value={currentFilters.classId}
        onChange={(v) => onFilterChange('classId', v)}
        disabled={isLoading}
      />

      <SelectFilter
        label="Disciplina"
        options={subjectOptions}
        value={currentFilters.subject}
        onChange={(v) => onFilterChange('subject', v)}
        disabled={isLoading}
      />

      <SearchInput
        value={currentFilters.searchTerm || ''}
        onChange={(v) => onFilterChange('searchTerm', v)}
        placeholder="Buscar turmas..."
      />

      <button
        onClick={onReset}
        disabled={isLoading}
      >
        Limpar filtros
      </button>
    </div>
  );
};

export default AdvancedFilters;