import React from 'react';
import { ClassPerformance } from '../../utils/types/Assessment';

interface ClassSelectorProps {
  classes: ClassPerformance[];
  selectedClass: string | null;
  onSelect: (classId: string | null) => void;
  className?: string;
  label?: string;
}

const ClassSelector: React.FC<ClassSelectorProps> = ({
  classes,
  selectedClass,
  onSelect,
  className = '',
  label = 'Selecione uma turma'
}) => {
  return (
    <div className={`class-selector ${className}`}>
      <label htmlFor="class-select">{label}:</label>
      <select
        id="class-select"
        value={selectedClass || ''}
        onChange={(e) => onSelect(e.target.value || null)}
        disabled={classes.length === 0}
        aria-label={label}
      >
        <option value="">
          {classes.length > 0 ? "Selecione uma turma" : "Nenhuma turma disponível"}
        </option>
        {classes.map(classItem => (
          <option key={classItem.classId} value={classItem.classId}>
            {classItem.className}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClassSelector;