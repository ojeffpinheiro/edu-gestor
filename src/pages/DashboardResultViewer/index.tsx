import React, { useCallback, useState } from 'react';
import { TimeframeFilter, ViewMode } from '../../utils/types/Assessment';

// Componentes de visualização
import OverviewView from '../../components/Results/Features/OverviewView';
import ClassView from '../../components/Results/Features/ClassView';
import StudentView from '../../components/Results/Features/StudentView';
import QuestionView from '../../components/Results/Features/QuestionView';

import DashboardFilters from '../../components/Results/DashboardFilters';

import {
  mockExamSummaries,
  mockClassPerformances,
  mockEnhancedResults,
  mockQuestions,
  mockEvaluationRubrics,
  mockStudentResults
} from '../../mocks/data';

import { ContentArea, Header, Title, ViewSelector } from './styles';
import { FiHelpCircle, FiHome, FiUser, FiUsers } from 'react-icons/fi';

const DashboardResultViewer: React.FC = () => {
  const [timeframe, setTimeframe] = useState<TimeframeFilter>('month');
  const [selectedView, setSelectedView] = useState<ViewMode>('overview');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const handleTimeframeChange = useCallback((range: TimeframeFilter) => {
    setTimeframe(range);
  }, []);

  const handleViewChange = useCallback((view: ViewMode) => {
    setSelectedView(view);
    setSelectedClass(null);
    setSelectedStudent(null);
  }, []);

  return (
    <div className="dashboard">
      <Header>
        <Title>Análise de Desempenho</Title>
        <DashboardFilters
          timeRange={timeframe}
          onTimeRangeChange={handleTimeframeChange}
          viewMode={selectedView}
          onViewModeChange={handleViewChange}
        />
      </Header>

      <ViewSelector>
        <button
          className={selectedView === 'overview' ? 'active' : ''}
          onClick={() => handleViewChange('overview')}
        >
          <FiHome /> Visão Geral
        </button>

        <button
          className={selectedView === 'class' ? 'active' : ''}
          onClick={() => handleViewChange('class')}
        >
          <FiUsers /> Por Turma
        </button>

        <button
          className={selectedView === 'student' ? 'active' : ''}
          onClick={() => handleViewChange('student')}
        >
          <FiUser /> Por Aluno
        </button>

        <button
          className={selectedView === 'questions' ? 'active' : ''}
          onClick={() => handleViewChange('questions')}
        >
          <FiHelpCircle /> Por Questão
        </button>
      </ViewSelector>

      <ContentArea>
        {selectedView === 'overview' && (
          <OverviewView
            examSummaries={mockExamSummaries}
            classPerformances={mockClassPerformances}
            onClassSelect={setSelectedClass}
          />
        )}

        {selectedView === 'class' && (
          <ClassView
            classPerformances={mockClassPerformances}
            selectedClass={selectedClass}
            onClassSelect={setSelectedClass}
            onStudentSelect={setSelectedStudent}
          />
        )}

        {selectedView === 'student' && (
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