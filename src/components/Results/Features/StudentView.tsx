import React from 'react';
import { EnhancedExamResult, StudentResult } from '../../../utils/types/Assessment';
import { Question } from '../../../utils/types/Question';

import DashboardCard from '../DashboardCard';
import EmptyState from '../EmptyState';
import StudentSelector from '../StudentSelector';

import StudentProgressChart from '../Charts/StudentProgressChart';
import ScoreBreakdownChart from '../Charts/ScoreBreakdownChart';
import styled from 'styled-components';

interface StudentViewProps {
  studentResults: StudentResult[];
  selectedStudent: string | null;
  onStudentSelect: (studentId: string | null) => void;
  examResults?: EnhancedExamResult[];
  questions?: Question[];
  isLoading?: boolean;
}

const StudentViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StudentView: React.FC<StudentViewProps> = ({ 
  studentResults, 
  selectedStudent,
  onStudentSelect,
  examResults,
  questions,
  isLoading
}) => {
  const currentStudent = selectedStudent 
    ? studentResults.find(s => s.studentId === selectedStudent)
    : null;

  if (isLoading) return <EmptyState message="Carregando dados do aluno..." />;

  return (
    <StudentViewContainer className="student-view">
      <StudentSelector
        students={studentResults}
        selectedStudent={selectedStudent}
        onSelect={onStudentSelect}
      />

      {currentStudent ? (
        <ChartsGrid>
          <DashboardCard
            title="Progresso ao Longo do Tempo"
            description="Evolução do desempenho nas avaliações"
          >
            <StudentProgressChart
              studentResult={currentStudent} 
              examResults={examResults}
            />
          </DashboardCard>
          
          <DashboardCard
            title="Desempenho por Categoria"
            description="Distribuição de acertos por área de conhecimento"
          >
            <ScoreBreakdownChart 
              studentResult={currentStudent}
              questions={questions}
            />
          </DashboardCard>
        </ChartsGrid>
      ) : (
        <EmptyState 
          message="Selecione um aluno para visualizar seu desempenho" 
          type="users"
        />
      )}
    </StudentViewContainer>
  );
};

export default StudentView;