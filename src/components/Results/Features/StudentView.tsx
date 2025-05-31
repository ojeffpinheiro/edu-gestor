import React from 'react';
import { EnhancedExamResult, StudentResult } from '../../../utils/types/Assessment';
import DashboardCard from '../DashboardCard';
import StudentProgressChart from '../Charts/StudentProgressChart';
import ScoreBreakdownChart from '../Charts/ScoreBreakdownChart';
import EmptyState from '../EmptyState';
import StudentSelector from '../StudentSelector';
import { Question } from '../../../utils/types/Question';

interface StudentViewProps {
  studentResults: StudentResult[];
  selectedStudent: string | null;
  onStudentSelect: (studentId: string | null) => void;
  examResults?: EnhancedExamResult[];
  questions?: Question[];
  isLoading?: boolean;
}

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
    <div className="student-view">
      <StudentSelector
        students={studentResults}
        selectedStudent={selectedStudent}
        onSelect={onStudentSelect}
      />

      {currentStudent ? (
        <div className="chart-row">
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
        </div>
      ) : (
        <EmptyState message="Nenhum aluno selecionado" />
      )}
    </div>
  );
};

export default StudentView;