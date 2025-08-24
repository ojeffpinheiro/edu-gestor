import React from 'react'
import { ClassPerformance, Subject } from '../../types/academic/Assessment';
import ClassSelector from './ClassSelector';
import AdvancedFilters, { FilterState } from './AdvancedFilters';

interface AvailableOptions {
  periods: string[];
  subjects: Subject[];
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
      onApply={(selectedFilters) => {
        // Handle apply logic here, e.g., filter results based on selected filters
        console.log('Applied Filters:', selectedFilters);
      }}
      isLoading={false} // Replace with actual loading state if needed
    />
  </div>
);

export default ClassControlsSection;