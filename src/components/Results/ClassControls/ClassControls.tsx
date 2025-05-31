import React, { useState } from 'react';
import { ClassPerformance } from '../../../utils/types/Assessment';
import ClassSelector from '../ClassSelector';
import AdvancedFilters from '../AdvancedFilters';
import SubjectSelector from '../SubjectSelector';
import { useFilters } from '../../../hooks/userResultsFilters';

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