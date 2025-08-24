import React from 'react';
import { TimeframeFilter, ViewMode } from '../../../types/academic/Assessment';
import { FilterGroup, FiltersContainer } from './styles';

interface DashboardFiltersProps {
  timeRange: TimeframeFilter;
  onTimeRangeChange: (range: TimeframeFilter) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({ 
  timeRange, 
  onTimeRangeChange
}) => {
  const timeRangeOptions = [
    { value: 'week', label: 'Semana' },
    { value: 'month', label: 'Mês' },
    { value: 'semester', label: 'Semestre' },
    { value: 'custom', label: 'Personalizado' },
  ];

  return (
    <FiltersContainer>
      <FilterGroup>
        <label htmlFor="timeRangeSelect">Período:</label>
        <select
          id="timeRangeSelect"
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value as TimeframeFilter)}
          aria-label="Selecionar período de tempo"
        >
          {timeRangeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FilterGroup>
    </FiltersContainer>
  );
};

export default React.memo(DashboardFilters);