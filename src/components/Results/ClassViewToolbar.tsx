import React from 'react';
import { ClassPerformance } from '../../utils/types/Assessment';
import ClassSelector from './ClassSelectorView';
import PeriodSelector from './PeriodSelector';
import ViewToggle from './ViewToggle';
import SubjectSelector from './SubjectSelector';

interface ClassViewToolbarProps {
  classPerformances: ClassPerformance[];
  selectedClass: string | null;
  onClassSelect: (classId: string | null) => void;
  availablePeriods: string[];
  selectedPeriod: string | null;
  setSelectedPeriod: (period: string | null) => void;
  activeView: 'class' | 'school';
  setActiveView: (view: 'class' | 'school') => void;
  subjects: { name: string }[]; 
  selectedSubject: string | null;
  setSelectedSubject: (subject: string | null) => void;
}

const ClassViewToolbar: React.FC<ClassViewToolbarProps> = ({
    classPerformances,
    selectedClass,
    availablePeriods,
    activeView,
    subjects,
    selectedSubject,
    selectedPeriod,
    onClassSelect,
    setSelectedPeriod,
    setActiveView,
    setSelectedSubject,
}) => {
  return (
    <div className="class-controls">
      <ClassSelector
        classes={classPerformances}
        selectedClass={selectedClass}
        onSelect={onClassSelect}
      />
      <PeriodSelector
        periods={availablePeriods}
        selectedPeriod={selectedPeriod}
        onSelect={setSelectedPeriod}
      />
      <ViewToggle
        activeView={activeView}
        onViewChange={setActiveView}
      />
      {subjects?.length > 0 && (
        <SubjectSelector
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSelect={setSelectedSubject}
        />
      )}
    </div>
  );
};

export default ClassViewToolbar;