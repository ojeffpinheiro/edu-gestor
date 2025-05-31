import React, { useCallback, useState } from 'react';
import { TimeframeFilter, ViewMode } from '../../utils/types/Assessment';

// Componentes de visualização
import OverviewView from '../../components/Results/Features/OverviewView';
import ClassView from '../../components/Results/Features/ClassView';
import StudentView from '../../components/Results/Features/StudentView';
import QuestionView from '../../components/Results/Features/QuestionView';

import {
  mockExamSummaries,
  mockClassPerformances,
  mockEnhancedResults,
  mockQuestions,
  mockEvaluationRubrics,
  mockStudentResults
} from '../../mocks/data';
import DashboardFilters from '../../components/Results/DashboardFilters';
import { ContentArea, Header, Title } from './styles';

const DashboardResultViewer: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeframeFilter>('semester');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('overview');

  const [timeframe, setTimeframe] = useState<TimeframeFilter>('month');
  const [selectedView, setSelectedView] = useState<'overview' | 'classes' | 'students' | 'questions'>('overview');

  // Função para lidar com mudança de período
  // Optimize callbacks to prevent unnecessary re-renders
  const handleTimeRangeChange = useCallback((range: TimeframeFilter) => {
    setTimeRange(range);
  }, []);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  return (
    <div className="dashboard">

      <Header>
        <Title>Análise de Desempenho</Title>
        <DashboardFilters
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </Header>

      <div className="dashboard-header">
        <h1>Análise de Desempenho</h1>
        <div className="timeframe-selector">
          <label>Período:</label>
          <select
            value={timeframe}
            onChange={(e) => handleTimeRangeChange(e.target.value as TimeframeFilter)}
          >
            <option value="week">Semana</option>
            <option value="month">Mês</option>
            <option value="semester">Semestre</option>
            <option value="custom">Personalizado</option>
          </select>
        </div>
      </div>

      <div className="view-selector">
        <button
          className={selectedView === 'overview' ? 'active' : ''}
          onClick={() => setSelectedView('overview')}
        >
          Visão Geral
        </button>
        <button
          className={selectedView === 'classes' ? 'active' : ''}
          onClick={() => setSelectedView('classes')}
        >
          Por Turma
        </button>
        <button
          className={selectedView === 'students' ? 'active' : ''}
          onClick={() => setSelectedView('students')}
        >
          Por Aluno
        </button>
        <button
          className={selectedView === 'questions' ? 'active' : ''}
          onClick={() => setSelectedView('questions')}
        >
          Por Questão
        </button>
      </div>

      <ContentArea>

        {selectedView === 'overview' && (
          <OverviewView
            examSummaries={mockExamSummaries}
            classPerformances={mockClassPerformances}
            onClassSelect={setSelectedClass}
          />
        )}

        {selectedView === 'classes' && (
          <ClassView
            classPerformances={mockClassPerformances}
            selectedClass={selectedClass}
            onClassSelect={setSelectedClass}
            onStudentSelect={setSelectedStudent}
          />
        )}

        {selectedView === 'students' && (
          <StudentView
            studentResults={mockStudentResults}
            selectedStudent={selectedStudent}
            onStudentSelect={setSelectedStudent}
            examResults={mockEnhancedResults}
            questions={mockQuestions}
          />
        )}

        {selectedView === 'questions' && (
          <QuestionView
            studentResults={mockStudentResults}
            selectedStudent={selectedStudent}
            onStudentSelect={setSelectedStudent}
            examResults={mockEnhancedResults}
            rubrics={mockEvaluationRubrics}
            questions={mockQuestions}
          />
        )}
      </ContentArea>
    </div>
  );
};

export default DashboardResultViewer;