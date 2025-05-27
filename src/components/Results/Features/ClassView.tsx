import React from 'react';
import { ClassPerformance } from '../../../utils/types/Assessment';
import RadarChart from '../Charts/RadarChart';
import ClassResultsTable from '../ClassResultsTable';

interface ClassViewProps {
  classPerformances: ClassPerformance[];
  selectedClass: string | null;
  onClassSelect: (classId: string | null) => void;
  onStudentSelect: (studentId: string | null) => void;
}

const ClassView: React.FC<ClassViewProps> = ({ 
  classPerformances, 
  selectedClass,
  onClassSelect,
  onStudentSelect
}) => {
  const currentClass = selectedClass 
    ? classPerformances.find(c => c.classId === selectedClass)
    : null;

  return (
    <div className="class-view">
      <div className="class-selector">
        <select 
          value={selectedClass || ''}
          onChange={(e) => onClassSelect(e.target.value || null)}
        >
          <option value="">Selecione uma turma</option>
          {classPerformances.map(c => (
            <option key={c.classId} value={c.classId}>
              {c.className}
            </option>
          ))}
        </select>
      </div>

      {currentClass && (
        <>
          <div className="chart-row">
            <div className="chart-container">
              <h2>Desempenho por Habilidade</h2>
              <RadarChart classPerformance={currentClass} />
            </div>
            <div className="chart-container">
              <h2>Resultados Detalhados</h2>
              <ClassResultsTable
                classPerformance={currentClass}
                onStudentSelect={onStudentSelect}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ClassView;