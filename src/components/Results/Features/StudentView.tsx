import React from 'react';
import { StudentResult } from '../../../utils/types/Assessment';
import StudentProgressChart from '../Charts/StudentProgressChart';
import ScoreBreakdownChart from '../Charts/ScoreBreakdownChart';

interface StudentViewProps {
  studentResults: StudentResult[];
  selectedStudent: string | null;
  onStudentSelect: (studentId: string | null) => void;
}

const StudentView: React.FC<StudentViewProps> = ({ 
  studentResults, 
  selectedStudent,
  onStudentSelect
}) => {
  const currentStudent = selectedStudent 
    ? studentResults.find(s => s.studentId === selectedStudent)
    : null;

  return (
    <div className="student-view">
      <div className="student-selector">
        <select 
          value={selectedStudent || ''}
          onChange={(e) => onStudentSelect(e.target.value || null)}
        >
          <option value="">Selecione um aluno</option>
          {studentResults.map(s => (
            <option key={s.studentId} value={s.studentId}>
              {s.studentName}
            </option>
          ))}
        </select>
      </div>

      {currentStudent && (
        <>
          <div className="chart-row">
            <div className="chart-container">
              <h2>Progresso ao Longo do Tempo</h2>
              <StudentProgressChart studentResult={currentStudent} />
            </div>
            <div className="chart-container">
              <h2>Desempenho por Categoria</h2>
              <ScoreBreakdownChart studentResult={currentStudent} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentView;