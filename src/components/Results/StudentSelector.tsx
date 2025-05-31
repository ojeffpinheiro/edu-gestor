import React from 'react';
import { StudentResult } from '../../utils/types/Assessment';

interface StudentSelectorProps {
  students: StudentResult[];
  selectedStudent: string | null;
  onSelect: (studentId: string | null) => void;
  className?: string;
}

const StudentSelector: React.FC<StudentSelectorProps> = ({
  students,
  selectedStudent,
  onSelect,
  className = ''
}) => {
  return (
    <div className={`student-selector ${className}`}>
      <label htmlFor="student-select">Selecione um aluno:</label>
      <select
        id="student-select"
        value={selectedStudent || ''}
        onChange={(e) => onSelect(e.target.value || null)}
        disabled={students.length === 0}
      >
        <option value="">
          {students.length > 0 ? "Selecione um aluno" : "Nenhum aluno disponível"}
        </option>
        {students.map(student => (
          <option key={student.studentId} value={student.studentId}>
            {student.studentName} (Média: {student.overallAverage.toFixed(1)}%)
          </option>
        ))}
      </select>
    </div>
  );
};

export default StudentSelector;