import React, { useState } from 'react';
import { TimeframeFilter } from '../../utils/types/Assessment';

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
  mockRubrics,
  mockStudentResults
 } from '../../mocks/data';

const DashboardResultViewer: React.FC = () => {
  const [timeframe, setTimeframe] = useState<TimeframeFilter>('month');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState<'overview' | 'classes' | 'students' | 'questions'>('overview');

  // Função para lidar com mudança de período
  const handleTimeframeChange = (newTimeframe: TimeframeFilter) => {
    setTimeframe(newTimeframe);
    // Aqui você pode adicionar lógica para atualizar os dados conforme o período
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Análise de Desempenho</h1>
        <div className="timeframe-selector">
          <label>Período:</label>
          <select 
            value={timeframe} 
            onChange={(e) => handleTimeframeChange(e.target.value as TimeframeFilter)}
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
        />
      )}

      {selectedView === 'questions' && (
        <QuestionView
          questions={mockQuestions}
          enhancedResults={mockEnhancedResults}
          rubrics={mockRubrics}
        />
      )}
    </div>
  );
};

export default DashboardResultViewer;