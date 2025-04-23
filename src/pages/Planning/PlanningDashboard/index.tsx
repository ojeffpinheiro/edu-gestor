import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaClock,
  FaCheckSquare,
  FaLayerGroup,
  FaUsers,
  FaFileAlt,
  FaCalendar
} from 'react-icons/fa';

import {
  notificacoes,
  planejamentoPorSerie,
  planejamentoPorTurma,
  proximasAtividades,
  resumoPorDisciplina,
  resumoPorTurma
} from '../../../mocks/planner';

import {
  DashboardContainer,
  GridSection,
  SectionCard,
  SectionHeader,
  TabButton,
  TabButtons
} from './styles'
import { PlanningCard } from '../../../components/Planning/PlanningCard';
import { DataTable } from '../../../components/Planning/DataTable';
import { QuickAccessSection } from '../../../components/Planning/QuickAccessSection';
import { NotificationSection } from '../../../components/Planning/NotificationSection';
import { UpcomingActivitiesSection } from '../../../components/Planning/UpcomingActivitiesSection';

// Types definitions for better type safety
interface PlanningItem {
  completo: number;
  pendente: number;
  parcial?: number;
  serie?: string;
  turma?: string;
}

// Main Dashboard Component
const PlanningDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'series' | 'turma'>('series');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /// Define color constants for quick access cards
  const COLORS = {
    BLUE: '#1e40af',       // Sequência Didática
    GREEN: '#15803d',      // Planejamento de Aulas
    PURPLE: '#7e22ce',     // Horário Semanal
    ORANGE: '#ea580c',     // Atividades e Avaliações
    RED: '#b91c1c',        // Gestão de Turmas
    TEAL: '#14b8a6'        // Calendário Acadêmico
  };

  // Centralized Data Management with updated colors
  const dashboardData = {
    accessCards: [
      {
        id: 1,
        titulo: 'Sequência Didática',
        icon: <FaLayerGroup size={24} />,
        color: COLORS.BLUE,
        link: '/didactic-sequences'
      },
      {
        id: 2,
        titulo: 'Planejamento de Aulas',
        icon: <FaFileAlt size={24} />,
        color: COLORS.GREEN,
        link: '/planejamento'
      },
      {
        id: 3,
        titulo: 'Horário Semanal',
        icon: <FaClock size={24} />,
        color: COLORS.PURPLE,
        link: '/horario'
      },
      {
        id: 4,
        titulo: 'Atividades e Avaliações',
        icon: <FaCheckSquare size={24} />,
        color: COLORS.ORANGE,
        link: '/evaluations'
      },
      {
        id: 5,
        titulo: 'Gestão de Turmas',
        icon: <FaUsers size={24} />,
        color: COLORS.RED,
        link: '/digital-notebook'
      },
      {
        id: 6,
        titulo: 'Calendário Acadêmico',
        icon: <FaCalendar size={24} />,
        color: COLORS.TEAL,
        link: '/calendario'
      }
    ]
  };

  // Simulate data fetching
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, you would fetch data from an API here
        // Simulating API call with setTimeout
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError("Não foi possível carregar os dados do dashboard. Por favor, tente novamente.");
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Memoized Data for Performance - only re-calculates when activeTab changes
  const currentPlanningData = useMemo<PlanningItem[]>(() =>
    activeTab === 'series'
      ? planejamentoPorSerie
      : planejamentoPorTurma,
    [activeTab]
  );

  // Navigation handler for quick access cards
  const handleQuickAccessClick = (link: string) => {
    try {
      navigate(link);
    } catch (error) {
      console.error("Erro ao navegar para a página:", error);
      // In a real application, you might want to show a toast notification here
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <DashboardContainer>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4">Carregando dashboard...</p>
          </div>
        </div>
      </DashboardContainer>
    );
  }

   // Error state
   if (error) {
    return (
      <DashboardContainer>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Erro</p>
          <p>{error}</p>
          <button 
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard do Professor</h1>
        <p className="text-gray-600">
          Bem-vindo(a) de volta! Aqui está seu panorama acadêmico.
        </p>
      </header>

      {/* Quick Access Section */}
      <QuickAccessSection 
        accessCards={dashboardData.accessCards} 
        onCardClick={handleQuickAccessClick} 
      />

      {/* Planning Overview Section */}
      <section className="mb-8">
        <SectionHeader>
          <h2 className="text-xl font-semibold">Visão Geral do Planejamento</h2>
          <TabButtons>
            <TabButton
              $active={activeTab === 'series'}
              onClick={() => setActiveTab('series')}
            >
              Por Série
            </TabButton>
            <TabButton
              $active={activeTab === 'turma'}
              onClick={() => setActiveTab('turma')}
            >
              Por Turma
            </TabButton>
          </TabButtons>
        </SectionHeader>

        <GridSection>
          {currentPlanningData.map((item, index) => (
            <PlanningCard
              key={index}
              title={'serie' in item ? item.serie! : item.turma!}
              completo={item.completo}
              pendente={item.pendente}
              parcial={'parcial' in item ? item.parcial : undefined}
            />
          ))}
        </GridSection>
      </section>

      {/* Notifications and Upcoming Activities Section */}
      <section className="mb-8">
        <GridSection>
          <NotificationSection notifications={notificacoes} />
          <UpcomingActivitiesSection activities={proximasAtividades} />
        </GridSection>
      </section>

      {/* Summary by Subject and Class */}
      <section className="mb-8">
        <GridSection>
          <SectionCard>
            <SectionHeader>
              <h2 className="text-xl font-semibold">Resumo por Disciplina</h2>
            </SectionHeader>
            <DataTable
              data={resumoPorDisciplina}
              emptyMessage="Nenhuma disciplina cadastrada"
            />
          </SectionCard>

          <SectionCard>
            <SectionHeader>
              <h2 className="text-xl font-semibold">Resumo por Turma</h2>
            </SectionHeader>
            <DataTable
              data={resumoPorTurma}
              emptyMessage="Nenhuma turma cadastrada"
            />
          </SectionCard>
        </GridSection>
      </section>
    </DashboardContainer>
  );
};

export default PlanningDashboard;