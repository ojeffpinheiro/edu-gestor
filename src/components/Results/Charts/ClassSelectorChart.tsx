// components/ClassSelectorChart.tsx
import React, { useState } from 'react';
import { ClassPerformance } from '../../../utils/types/Assessment';

interface ClassSelectorChartProps {
  classes: ClassPerformance[];
  initialSelection?: string[];
  children: (selectedClasses: ClassPerformance[]) => React.ReactNode;
}

const ClassSelectorChart: React.FC<ClassSelectorChartProps> = ({ 
  classes, 
  initialSelection = [], 
  children 
}) => {
  const [selectedClassIds, setSelectedClassIds] = useState<string[]>(initialSelection);

  const toggleClassSelection = (classId: string) => {
    setSelectedClassIds(prev => 
      prev.includes(classId) 
        ? prev.filter(id => id !== classId)
        : [...prev, classId]
    );
  };

  const selectedClasses = classes.filter(c => 
    selectedClassIds.includes(c.classId) || selectedClassIds.length === 0
  );

  return (
    <div className="chart-with-selector">
      <div className="class-selection-panel">
        {classes.map(c => (
          <label key={c.classId} className="class-checkbox">
            <input
              type="checkbox"
              checked={selectedClassIds.includes(c.classId)}
              onChange={() => toggleClassSelection(c.classId)}
            />
            {c.className}
          </label>
        ))}
      </div>
      
      <div className="chart-container">
        {children(selectedClasses)}
      </div>
    </div>
  );
};

export default ClassSelectorChart;