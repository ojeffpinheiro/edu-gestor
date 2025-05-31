import React, { useCallback, useState } from 'react';
import { TimeframeFilter, ViewMode } from '../../utils/types/Assessment';
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
          onTimeRangeChange={handleTimeRangeChange}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />
      </Header>

      <ContentArea>
        {viewMode === 'overview' && (
          <OverviewView
            examSummaries={mockExamSummaries}
            classPerformances={mockClassPerformances}
            onClassSelect={setSelectedClass}
          />
        )}

        {viewMode === 'class' && (
          <ClassView
            classPerformances={mockClassPerformances}
            selectedClass={selectedClass}
            onClassSelect={setSelectedClass}
            onStudentSelect={setSelectedStudent}
          />
        )}

        {viewMode === 'student' && (
          <StudentView
            studentResults={mockStudentResults}
            selectedStudent={selectedStudent}
            onStudentSelect={setSelectedStudent}
            examResults={mockEnhancedResults}
            questions={mockQuestions}
          />
        )}

        {viewMode === 'questions' && (
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