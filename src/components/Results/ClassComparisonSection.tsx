import React from 'react';
import { ChartData, ClassPerformance } from '../../utils/types/Assessment';
import ClassSelectorChart from './Charts/ClassSelectorChart';
import InteractiveChart from './InteractiveChart';
import ComparisonTabs from './ComparisonTabs';

export interface ClassComparisonSectionProps {
  classPerformances: ClassPerformance[];
  selectedClasses: string[];
  onClassSelect: (ids: string[]) => void;
  onTabChange: (tab: 'ranking' | 'value-added' | 'equity') => void;
  prepareComparisonData: (classes: ClassPerformance[]) => ChartData;
  onElementClick?: (element: { label: string; value: number; datasetIndex: number }) => void;
}

const ClassComparisonSection: React.FC<ClassComparisonSectionProps> = ({
  classPerformances,
  selectedClasses,
  onClassSelect,
  onTabChange,
  prepareComparisonData,
  onElementClick
}) => {
  // Função para lidar com seleção de classes
  const handleClassSelect = (selected: ClassPerformance[]) => {
    onClassSelect(selected.map(c => c.classId));
  };

  return (
    <div className="benchmark-section">
      <ClassSelectorChart
        classes={classPerformances}
        initialSelection={selectedClasses}
        onSelectionChange={handleClassSelect}
      >
        {(selectedClasses) => (
          <InteractiveChart
            data={prepareComparisonData(selectedClasses)}
            onElementClick={onElementClick}
          />
        )}
      </ClassSelectorChart>
      <ComparisonTabs
        tabs={['ranking', 'value-added', 'equity']}
        onTabChange={onTabChange}
      />
    </div>
  );
};

export default ClassComparisonSection;