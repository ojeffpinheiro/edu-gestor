import React, { useState } from 'react';
import { ClassPerformance } from '../../../types/academic/Assessment';
import ClassSelector from '../ClassSelector';
import SubjectSelector from '../SubjectSelector';
import { useFilters } from '../../../hooks/userResultsFilters';
import AdvancedFilters from '../AdvancedFilters';

interface ClassControlsProps {
  classPerformances: ClassPerformance[];
  selectedClass: string | null;
  onClassSelect: (classId: string | null) => void;
  currentClass: ClassPerformance;
}

const ClassControls: React.FC<ClassControlsProps> = ({
  classPerformances,
  selectedClass,
  onClassSelect,
  currentClass
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const { filters, setFilter, resetFilters, availableOptions } = useFilters(classPerformances);

  return (
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

      {currentClass.subjects && currentClass.subjects.length > 0 && (
        <SubjectSelector
          subjects={currentClass.subjects}
          selectedSubject={selectedSubject}
          onSelect={setSelectedSubject}
        />
      )}
    </div>
  );
};

export default ClassControls;