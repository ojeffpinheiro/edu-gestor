import React from 'react'
import { ClassPerformance } from '../../utils/types/Assessment';
import AdvancedFilters, { FilterState } from './AdvancedFilters';
import ClassSelector from './ClassSelector';

interface AvailableOptions {
  periods: string[];
  subjects: string[];
  allClasses: ClassPerformance[];
}

const ClassControlsSection = ({
  classPerformances,
  selectedClass,
  availableOptions,
  filters,
  onClassSelect,
  setFilter,
  resetFilters,
}: {
  classPerformances: ClassPerformance[];
  selectedClass: string | null;
  onClassSelect: (id: string | null) => void;
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
  availableOptions: AvailableOptions;
}) => (
  <div className="class-controls">
    <ClassSelector
      classes={classPerformances}
      selectedClass={selectedClass}
      onSelect={onClassSelect}
    />
    <AdvancedFilters
      periods={availableOptions.periods}
      subjects={availableOptions.subjects}
      classes={availableOptions.allClasses}
      currentFilters={filters}
      onFilterChange={setFilter}
      onReset={resetFilters}
    />
  </div>
);

export default ClassControlsSection;