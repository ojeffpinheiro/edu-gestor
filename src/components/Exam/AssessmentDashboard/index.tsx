import React, { useState } from 'react';
import { FiGrid, FiPlusCircle, FiBarChart2 } from 'react-icons/fi';

import { ClassData } from '../../../utils/types/ExamAssesments';

import PeriodSelector from '../PeriodSelector';
import ClassCards from '../ClassCards';
import RecoveryView from '../RecoveryView';
import FinalResults from '../FinalResults';

import { ViewToggle, Container, Header, DashboardTitle } from './styles';

interface DashboardState {
  selectedClass: string | null;
  selectedPeriod: string | null;
}

const AssessmentDashboard: React.FC = () => {
  const [periodType, setPeriodType] = useState<'bimester' | 'trimester' | 'semester'>('trimester');
  const [activeView, setActiveView] = useState<'classes' | 'recovery' | 'results'>('classes');
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    selectedClass: null,
    selectedPeriod: null
  });
  // Dados mockados
  const mockClasses: ClassData[] = [
    {
      id: '1',
      name: '9º Ano A',
      period: '1º Tri',
      assessments: [
        { id: 'a1', title: 'Prova de Matemática', type: 'Prova', date: '2023-03-15', maxScore: 10, average: 7.2 },
        { id: 'a2', title: 'Lista de Exercícios', type: 'Lista', date: '2023-03-22', maxScore: 5, average: 4.1 }
      ],
      students: [
        { id: 's1', name: 'Ana Silva', scores: { a1: 8, a2: 5 } },
        { id: 's2', name: 'Carlos Oliveira', scores: { a1: 6, a2: 3 } }
      ]
    },
    // ... mais turmas
  ];

  // Filtra turmas com base no período selecionado
  const filteredClasses = dashboardState.selectedPeriod 
    ? mockClasses.filter(c => c.period.includes(dashboardState.selectedPeriod!))
    : mockClasses;

  // Filtra turma específica quando selecionada
  const selectedClassData = dashboardState.selectedClass
    ? mockClasses.find(c => c.id === dashboardState.selectedClass)
    : null;

  return (
    <Container>
      <Header>
        <DashboardTitle>
          <h1>Avaliações Escolares</h1>
          <p>Gerencie as avaliações e resultados dos alunos</p>
        </DashboardTitle>
        
        <div className="controls">
          <PeriodSelector
            periodType={periodType}
            onChange={(type) => {
              setPeriodType(type);
              setDashboardState(prev => ({
                ...prev,
                selectedPeriod: type === 'trimester' ? '1º Trimestre' : 
                              type === 'bimester' ? '1º Bimestre' : '1º Semestre'
              }));
            }}
          />
          
          <ViewToggle>
            <button 
              className={activeView === 'classes' ? 'active' : ''}
              onClick={() => setActiveView('classes')}
            >
              <FiGrid /> Turmas
            </button>
            <button 
              className={activeView === 'recovery' ? 'active' : ''}
              onClick={() => setActiveView('recovery')}
              disabled={!selectedClassData}
            >
              <FiPlusCircle /> Recuperação
            </button>
            <button 
              className={activeView === 'results' ? 'active' : ''}
              onClick={() => setActiveView('results')}
            >
              <FiBarChart2 /> Resultados
            </button>
          </ViewToggle>
        </div>
      </Header>

      {activeView === 'classes' && (
        <ClassCards
          classes={filteredClasses} 
          periodType={periodType}
          onSelectClass={(classId) => setDashboardState(prev => ({
            ...prev,
            selectedClass: classId
          }))}
          selectedClass={dashboardState.selectedClass}
        />
      )}

      {activeView === 'recovery' && selectedClassData && (
        <RecoveryView 
          classData={selectedClassData} 
          onBack={() => setActiveView('classes')}
        />
      )}
      
      {activeView === 'results' && (
        <FinalResults 
          classes={filteredClasses} 
          periodType={periodType}
        />
      )}
    </Container>
  );
};

export default AssessmentDashboard;