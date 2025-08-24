import React, { useMemo } from 'react';
import { FaQuestionCircle, FaUserGraduate, FaChartLine, FaChartPie } from 'react-icons/fa';

import { EnhancedExamResult, EvaluationRubric, StudentResult } from '../../../types/academic/Assessment';
import { Question } from '../../../types/evaluation/Question';

import StudentProgressChart from '../Charts/StudentProgressChart';
import ScoreBreakdownChart from '../Charts/ScoreBreakdownChart';

import DashboardCard from '../DashboardCard';
import EmptyState from '../EmptyState';
import StudentSelector from '../StudentSelector';
import LoadingSpinner from '../../shared/LoadingSpinner';
import StudentDetails from '../StudentDetails';
import MetricsDisplay from '../MetricsDisplay';
import { ChartsGrid, ControlsContainer, QuestionViewContainer, StudentDetailsContainer } from './styles/QuestionViewStyles';
import { Button } from '../../shared/Button.styles';

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
  const currentStudent = useMemo(() =>
    selectedStudent ? studentResults.find(s => s.studentId === selectedStudent) : null,
    [selectedStudent, studentResults]
  );

  const metrics = useMemo(() => ({
    questions: questions.length,
    evaluations: examResults.length,
    rubrics: rubrics.length
  }), [questions, examResults, rubrics]);


  if (isLoading) return <LoadingSpinner message="Carregando dados das questões..." />;

  if (error) return (
    <EmptyState
      message="Erro ao carregar dados das questões"
      illustration={<FaQuestionCircle size={64} />}
      action={<Button onClick={() => window.location.reload()}>Tentar novamente</Button>}
    />
  );

  return (
    <QuestionViewContainer className="question-view"
      role="main"
      aria-labelledby="question-view-title">
      <ControlsContainer className="question-controls">
        <StudentSelector
          aria-label="Selecionar aluno"
          students={studentResults}
          selectedStudent={selectedStudent}
          onSelect={onStudentSelect}
        />
        <MetricsDisplay
          metrics={[
            { label: 'Questões', value: metrics.questions },
            { label: 'Avaliações', value: metrics.evaluations },
            { label: 'Rúbricas', value: metrics.rubrics }
          ]}
        />

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
          message={studentResults.length > 0 ? "Selecione um aluno para visualizar detalhes" : "Nenhum aluno disponível"}
          illustration={<FaUserGraduate size={64} />}
          type={studentResults.length > 0 ? 'search' : 'users'}
        />
      )}
    </QuestionViewContainer>
  );
};

export default QuestionView;