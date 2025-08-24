// components/AdvancedFilters.tsx
import React, { useMemo, useState } from 'react';
import { ClassPerformance, Subject } from '../../../types/academic/Assessment';
import { FilterGroup, FilterLabel, FiltersContainer, FiltersHeader } from './styles';
import { FiFilter, FiX } from 'react-icons/fi';

export interface FilterState {
  period: string;
  classId: string;
  subject: string;
  searchTerm: string;
}

interface AdvancedFiltersProps {
  periods: string[];
  subjects: Subject[];
  classes: ClassPerformance[];
  isLoading?: boolean;
  currentFilters: {
    period: string;
    classId: string;
    subject: string;
    searchTerm?: string;
  };
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onReset: () => void;
  onApply: (filters: {
    selectedClasses: string[];
    selectedSubjects: string[];
    selectedTimeRange: string;
  }) => void;
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
  isLoading = false,
  onApply,
  onReset,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('all');

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
    ...subjects.map(s => ({ value: s.name, label: s.name }))
  ], [subjects]);


  const handleApply = () => {
    onApply({
      selectedClasses,
      selectedSubjects,
      selectedTimeRange
    });
    setIsOpen(false);
  };

  const handleReset = () => {
    setSelectedClasses([]);
    setSelectedSubjects([]);
    setSelectedTimeRange('all');
    onApply({
      selectedClasses: [],
      selectedSubjects: [],
      selectedTimeRange: 'all'
    });
  };

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)}>
        <FiFilter /> Filtros Avançados
      </button>
    );
  }

  return (
    <FiltersContainer>
      <FiltersHeader>
        <h4>Filtros Avançados</h4>
        <button onClick={() => setIsOpen(false)}>
          <FiX />
        </button>
      </FiltersHeader>

      <SearchInput
        value={currentFilters.searchTerm || ''}
        onChange={(v) => onFilterChange('searchTerm', v)}
        placeholder="Buscar turmas..."
      />

      <FilterGroup>
        <FilterLabel>Turmas</FilterLabel>
        <select
          aria-label="Selecionar Turma"
          value={currentFilters.classId}
          onChange={(e) => onFilterChange('classId', e.target.value)}
          disabled={isLoading}
        >
          {classOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Disciplinas</FilterLabel>
        <select 
          aria-label="Selecionar Disciplina"
          value={currentFilters.subject}
          onChange={(e) => onFilterChange('subject', e.target.value)}
          disabled={isLoading}
        >
          {subjectOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Período</FilterLabel>
        <select
          aria-label="Selecionar Período"
          value={currentFilters.period}
          onChange={(e) => onFilterChange('period', e.target.value)}
          disabled={isLoading}
        >
          {periodOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FilterGroup>

      <div className="filter-actions">
        <button onClick={handleReset}>Limpar</button>
        <button onClick={handleApply}>Aplicar</button>
      </div>
    </FiltersContainer>
  );
};

export default AdvancedFilters;