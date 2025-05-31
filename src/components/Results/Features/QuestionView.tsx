import React from 'react';
import { EnhancedExamResult, EvaluationRubric, StudentResult } from '../../../utils/types/Assessment';
import { Question } from '../../../utils/types/Question';
import DashboardCard from '../DashboardCard';
import StudentProgressChart from '../Charts/StudentProgressChart';
import ScoreBreakdownChart from '../Charts/ScoreBreakdownChart';
import EmptyState from '../EmptyState';
import StudentSelector from '../StudentSelector';
import LoadingSpinner from '../../shared/LoadingSpinner';
import StudentDetails from '../StudentDetails';
import { FaQuestionCircle, FaUserGraduate } from 'react-icons/fa'; // Added React Icon

interface StudentViewProps {
  studentResults: StudentResult[];
  selectedStudent: string | null;
  rubrics: EvaluationRubric[];
  questions?: Question[];
  examResults?: EnhancedExamResult[];
  isLoading?: boolean;
  error?: Error | null;
  onStudentSelect: (studentId: string | null) => void;
}

const StudentView: React.FC<StudentViewProps> = ({ 
  studentResults, 
  selectedStudent,
  examResults = [],
  questions = [],
  isLoading = false,
  error = null,
  rubrics,
  onStudentSelect,
}) => {
  const currentStudent = selectedStudent 
    ? studentResults.find(s => s.studentId === selectedStudent)
    : null;

  if (isLoading) return <LoadingSpinner />;
  if (error) return <EmptyState message="Erro ao carregar dados do aluno" />;

  if (isLoading) return <div>Loading questions...</div>;
  if (error) return <EmptyState 
    message="Error loading questions" 
    illustration={<FaQuestionCircle size={64} />} />;

  return (
    <div className="student-view">
      <div className="student-controls">
        <StudentSelector
          students={studentResults}
          selectedStudent={selectedStudent}
          onSelect={onStudentSelect}
        />
      </div>

      {currentStudent ? (
        <div className="student-dashboard">
          <div>Total Questions: {questions.length}</div>
      <div>Results Available: {examResults.length}</div>
      <div>Rubrics: {rubrics.length}</div>
          <div className="student-summary">
            <StudentDetails student={currentStudent} />
          </div>

          <div className="chart-row">
            <DashboardCard
              title="Progresso Acadêmico"
              description="Evolução do desempenho nas avaliações"
            >
              <StudentProgressChart
                studentResult={currentStudent} 
                examResults={examResults}
              />
            </DashboardCard>
            
            <DashboardCard
              title="Análise por Competência"
              description="Desempenho por área de conhecimento"
            >
              <ScoreBreakdownChart 
                studentResult={currentStudent}
                questions={questions}
              />
            </DashboardCard>
          </div>
        </div>
      ) : (
        <EmptyState 
          message={studentResults.length > 0 ? "Selecione um aluno" : "Nenhum aluno disponível"}
          illustration={<FaUserGraduate size={64} className="text-gray-400" />}
        />
      )}
    </div>
  );
};

export default StudentView;