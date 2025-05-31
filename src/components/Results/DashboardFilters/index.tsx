import React from 'react';
import { TimeframeFilter, ViewMode } from '../../../utils/types/Assessment';
import { FilterGroup, FiltersContainer, ViewButton, ViewToggle } from './styles';
import { Label, Select } from '../../../styles/inputs';

interface DashboardFiltersProps {
  timeRange: TimeframeFilter;
  onTimeRangeChange: (range: TimeframeFilter) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({ 
  timeRange, 
  onTimeRangeChange, 
  viewMode, 
  onViewModeChange 
}) => {
  const timeRangeOptions = [
    { value: 'week', label: 'Semana' },
    { value: 'month', label: 'Mês' },
    { value: 'semester', label: 'Semestre' },
    { value: 'custom', label: 'Personalizado' },
  ];

  const viewModeOptions = [
    { value: 'overview', label: 'Visão Geral' },
    { value: 'class', label: 'Por Turma' },
    { value: 'student', label: 'Por Aluno' },
    { value: 'questions', label: 'Por Questão' },
  ];

  return (
    <FiltersContainer>
      <FilterGroup>
        <Label>Período:</Label>
        <Select
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value as TimeframeFilter)}
        >
          {timeRangeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FilterGroup>

      <FilterGroup>
        <Label>Visualização:</Label>
        <ViewToggle>
          {viewModeOptions.map(option => (
            <ViewButton
              key={option.value}
              $active={viewMode === option.value}
              onClick={() => onViewModeChange(option.value as ViewMode)}
            >
              {option.label}
            </ViewButton>
          ))}
        </ViewToggle>
      </FilterGroup>
    </FiltersContainer>
  );
};

export default DashboardFilters;