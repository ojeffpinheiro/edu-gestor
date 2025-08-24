import React, { memo } from 'react';
import { StudentResult } from '../../utils/types/Assessment';
import styled from 'styled-components';

interface StudentSelectorProps {
  students: StudentResult[];
  selectedStudent: string | null;
  onSelect: (studentId: string | null) => void;
  className?: string;
}

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  max-width: 500px;
`;

const StyledLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;

const StyledSelect = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background-color: white;
  font-size: 1rem;
  color: #2d3748;
  transition: all 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const StudentSelector: React.FC<StudentSelectorProps> = ({
  students,
  selectedStudent,
  onSelect,
  className = ''
}) => {
  return (
    <SelectorContainer className={`student-selector ${className}`}>
      <StyledLabel htmlFor="student-select">Selecione um aluno</StyledLabel>
      <StyledSelect
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
            {student.studentName} • Média: {student.overallAverage.toFixed(1)}%
            {student.riskAssessment && ` • Risco: ${student.riskAssessment.level}`}
          </option>
        ))}
      </StyledSelect>
    </SelectorContainer>
  );
};

export default memo(StudentSelector);