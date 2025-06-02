import React from 'react';
import { FaQuestionCircle, FaUserGraduate, FaChartLine, FaChartPie } from 'react-icons/fa';
import styled from 'styled-components';
import { EnhancedExamResult, EvaluationRubric, StudentResult } from '../../../utils/types/Assessment';
import { Question } from '../../../utils/types/Question';
import DashboardCard from '../DashboardCard';
import EmptyState from '../EmptyState';
import StudentSelector from '../StudentSelector';
import LoadingSpinner from '../../shared/LoadingSpinner';
import StudentDetails from '../StudentDetails';
import StudentProgressChart from '../Charts/StudentProgressChart';
import ScoreBreakdownChart from '../Charts/ScoreBreakdownChart';

interface QuestionViewProps {
  studentResults: StudentResult[];
  selectedStudent: string | null;
  rubrics: EvaluationRubric[];
  questions?: Question[];
  examResults?: EnhancedExamResult[];
  isLoading?: boolean;
  error?: Error | null;
  onStudentSelect: (studentId: string | null) => void;
}

const QuestionViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const MetricsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const MetricCard = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span:first-child {
    font-weight: 500;
    color: #64748b;
  }

  span:last-child {
    font-weight: 600;
    color: #1e293b;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StudentDetailsContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const QuestionView: React.FC<QuestionViewProps> = ({ 
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
  if (error) return (
    <EmptyState 
      message="Erro ao carregar dados das questões" 
      illustration={<FaQuestionCircle size={64} />} 
    />
  );

  return (
    <QuestionViewContainer className="question-view">
      <ControlsContainer className="question-controls">
        <StudentSelector
          students={studentResults}
          selectedStudent={selectedStudent}
          onSelect={onStudentSelect}
        />
        
        <MetricsContainer>
          <MetricCard>
            <span>Questões:</span>
            <span>{questions.length}</span>
          </MetricCard>
          <MetricCard>
            <span>Avaliações:</span>
            <span>{examResults.length}</span>
          </MetricCard>
          <MetricCard>
            <span>Rúbricas:</span>
            <span>{rubrics.length}</span>
          </MetricCard>
        </MetricsContainer>
      </ControlsContainer>

      {currentStudent ? (
        <div className="question-dashboard">
          <StudentDetailsContainer>
            <StudentDetails student={currentStudent} />
          </StudentDetailsContainer>

          <ChartsGrid>
            <DashboardCard
              title="Progresso Acadêmico"
              description="Evolução do desempenho nas avaliações"
              icon={<FaChartLine />}
            >
              <StudentProgressChart
                studentResult={currentStudent} 
                examResults={examResults}
              />
            </DashboardCard>
            
            <DashboardCard
              title="Análise por Competência"
              description="Desempenho por área de conhecimento"
              icon={<FaChartPie />}
            >
              <ScoreBreakdownChart 
                studentResult={currentStudent}
                questions={questions}
              />
            </DashboardCard>
          </ChartsGrid>
        </div>
      ) : (
        <EmptyState 
          message={studentResults.length > 0 ? "Selecione um aluno" : "Nenhum aluno disponível"}
          illustration={<FaUserGraduate size={64} className="text-gray-400" />}
        />
      )}
    </QuestionViewContainer>
  );
};

export default QuestionView;