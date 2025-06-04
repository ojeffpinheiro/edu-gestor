import React, { useCallback, useState } from 'react';
import { ClassPerformance, TimeframeFilter, ViewMode } from '../../utils/types/Assessment';

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

/**
 * Componente principal para visualização e análise de desempenho acadêmico.
 * 
 * Este componente exibe diferentes visualizações de dados de desempenho (visão geral, por turma,
 * por aluno e por questão) com capacidade de filtragem por período de tempo.
 * 
 * <DashboardResultViewer />
 */
const DashboardResultViewer: React.FC = () => {
  // Estado que armazena o período de tempo selecionado para filtragem.
  const [timeframe, setTimeframe] = useState<TimeframeFilter>('month');
  // Estado que armazena o modo de visualização atual.
  const [selectedView, setSelectedView] = useState<ViewMode>('overview');
  // Estado que armazena a turma selecionada (quando aplicável).
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  // Estado que armazena o aluno selecionado (quando aplicável).
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  /**
   * Manipulador para alteração do período de tempo.
   * 
   * @callback
   * @param {TimeframeFilter} range - Novo período selecionado
   */
  const handleTimeframeChange = useCallback((range: TimeframeFilter) => {
    setTimeframe(range);
  }, []);

  /**
   * Manipulador para alteração do modo de visualização.
   * Reseta as seleções de turma e aluno ao mudar de visualização.
   * 
   * @callback
   * @param {ViewMode} view - Novo modo de visualização selecionado
   */
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
            studentResults={mockStudentResults}
            classPerformances={Array.isArray(mockClassPerformances) ? mockClassPerformances : [mockClassPerformances]}
            onClassSelect={setSelectedClass}
          />
        )}

        {selectedView === 'class' && (
          <ClassView
            classPerformances={
              selectedClass
                ? (Array.isArray(mockClassPerformances)
                  ? mockClassPerformances.filter((c: ClassPerformance) => c.classId === selectedClass)
                  : mockClassPerformances.classId === selectedClass ? [mockClassPerformances] : [])
                : (Array.isArray(mockClassPerformances) ? mockClassPerformances : [mockClassPerformances])
            }
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