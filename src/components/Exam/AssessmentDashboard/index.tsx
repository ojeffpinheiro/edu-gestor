import React, { useState } from 'react';
import { FiGrid, FiPlusCircle, FiBarChart2 } from 'react-icons/fi';

import { ClassData } from '../../../utils/types/ExamAssesments';

import PeriodSelector from '../PeriodSelector';
import ClassCards from '../ClassCards';
import RecoveryView from '../RecoveryView';
import FinalResults from '../FinalResults';

import { ViewToggle, Container, Header } from './styles';

const AssessmentDashboard: React.FC = () => {
  const [periodType, setPeriodType] = useState<'bimester' | 'trimester' | 'semester'>('trimester');
  const [activeView, setActiveView] = useState<'classes' | 'recovery' | 'results'>('classes');

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

  return (
    <Container>
      <Header>
        <PeriodSelector
          periodType={periodType}
          onChange={setPeriodType}
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
      </Header>

      {activeView === 'classes' && (
        <ClassCards
          classes={mockClasses} 
          periodType={periodType}
        />
      )}

      {activeView === 'recovery' && <RecoveryView classes={mockClasses} />}
      
      {activeView === 'results' && <FinalResults classes={mockClasses} />}
    </Container>
  );
};

export default AssessmentDashboard;