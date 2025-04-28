// index.tsx - Dashboard principal refatorado
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaClock,
  FaCheckSquare,
  FaLayerGroup,
  FaUsers,
  FaFileAlt,
  FaCalendar
} from 'react-icons/fa';

// Importações de dados mock (simulação de API)
import {
  notificacoes,
  planejamentoPorSerie,
  planejamentoPorTurma,
  proximasAtividades,
  resumoPorDisciplina,
  resumoPorTurma
} from '../../../mocks/planner';

// Importações de componentes
import { PlanningCard } from '../../../components/Planning/PlanningCard';
import { DataTable } from '../../../components/Planning/DataTable';
import { QuickAccessSection } from '../../../components/Planning/QuickAccessSection';
import { NotificationSection } from '../../../components/Planning/NotificationSection';
import { UpcomingActivitiesSection } from '../../../components/Planning/UpcomingActivitiesSection';

// Importações de estilos
import {
  DashboardContainer,
  GridSection,
  SectionCard,
  SectionHeader,
  TabButton,
  TabButtons
} from './styles';
import {  AccessCard, ActivityType, ClassSummaryType, NotificationType, PlanningItemType, SubjectSummaryType } from '../../../utils/types/planningDashboard';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import { ErrorAlert } from '../../../components/shared/ErrorAlert';
import { ErrorBoundary } from '../../../components/shared/ErrorBoundary';

// Definição das cores para os cards de acesso rápido
const COLORS = {
  BLUE: '#1e40af',    // Sequência Didática
  GREEN: '#15803d',   // Planejamento de Aulas
  PURPLE: '#7e22ce',  // Horário Semanal
  ORANGE: '#ea580c',  // Atividades e Avaliações
  RED: '#b91c1c',     // Gestão de Turmas
  TEAL: '#14b8a6'     // Calendário Acadêmico
};

/**
 * Dashboard de Planejamento para Professores
 * 
 * Exibe uma visão geral do planejamento escolar, incluindo:
 * - Acesso rápido a funcionalidades principais
 * - Progresso de planejamento por série ou turma
 * - Notificações e próximas atividades
 * - Resumos por disciplina e turma
 */
const PlanningDashboard: React.FC = () => {
  // Estados do componente
  const [activeTab, setActiveTab] = useState<'series' | 'turma'>('series');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Cartões de acesso rápido pré-configurados
  const accessCards: AccessCard[] = useMemo(() => [
    {
      id: '1',
      title: 'Sequência Didática',
      icon: <FaLayerGroup size={24} />,
      color: COLORS.BLUE,
      link: '/didactic-sequences'
    },
    {
      id: '2',
      title: 'Planejamento de Aulas',
      icon: <FaFileAlt size={24} />,
      color: COLORS.GREEN,
      link: '/plannig-page'
    },
    {
      id: '3',
      title: 'Horário Semanal',
      icon: <FaClock size={24} />,
      color: COLORS.PURPLE,
      link: '/horario'
    },
    {
      id: '4',
      title: 'Atividades e Avaliações',
      icon: <FaCheckSquare size={24} />,
      color: COLORS.ORANGE,
      link: '/evaluations'
    },
    {
      id: '5',
      title: 'Gestão de Turmas',
      icon: <FaUsers size={24} />,
      color: COLORS.RED,
      link: '/digital-notebook'
    },
    {
      id: '6',
      title: 'Calendário Acadêmico',
      icon: <FaCalendar size={24} />,
      color: COLORS.TEAL,
      link: '/calendario'
    }
  ], []);

  /**
   * Simula a obtenção de dados da API
   * Em um ambiente real, isso seria substituído por chamadas de API reais
   */
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulando tempo de carregamento da API
        const timeout = setTimeout(() => {
          setIsLoading(false);
        }, 500);

        // Limpeza do timeout em caso de desmontagem do componente
        return () => clearTimeout(timeout);
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : "Não foi possível carregar os dados do dashboard. Por favor, tente novamente.";
        
        setError(errorMessage);
        setIsLoading(false);
        
        // Log para fins de depuração (em ambiente de produção, use um serviço de logging adequado)
        console.error("Erro ao carregar dados do dashboard:", err);
      }
    };

    fetchDashboardData();
  }, []);

  // Alternância entre os dados de planejamento por série ou turma
  const currentPlanningData = useMemo<PlanningItemType[]>(() =>
    activeTab === 'series'
      ? planejamentoPorSerie
      : planejamentoPorTurma,
    [activeTab]
  );

  /**
   * Manipulador de navegação para os cards de acesso rápido
   * Navega para a rota especificada ou exibe erro em caso de falha
   * 
   * @param link - URL para navegação
   */
  const handleQuickAccessClick = useCallback((link: string) => {
    try {
      navigate(link);
    } catch (error) {
      console.error("Erro ao navegar para a página:", error);
      setError("Ocorreu um erro ao tentar navegar. Por favor, tente novamente.");
      // Em uma aplicação real, você poderia usar um sistema de notificações como toast
    }
  }, [navigate]);

  /**
   * Manipulador para tentar novamente após erro
   */
  const handleRetry = useCallback(() => {
    setError(null);
    setIsLoading(true);
    
    // Simula nova tentativa de buscar dados
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  // Renderização condicional para estado de carregamento
  if (isLoading) {
    return <LoadingSpinner message="Carregando dashboard..." />;
  }

  // Renderização condicional para estado de erro
  if (error) {
    return <ErrorAlert message={error} onRetry={handleRetry} />;
  }

  return (
    <ErrorBoundary fallback={<ErrorAlert message="Ocorreu um erro inesperado" onRetry={handleRetry} />}>
      <DashboardContainer>
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard do Professor</h1>
          <p className="text-gray-600">
            Bem-vindo(a) de volta! Aqui está seu panorama acadêmico.
          </p>
        </header>

        {/* Seção de Acesso Rápido */}
        <QuickAccessSection 
          accessCards={accessCards} 
          onCardClick={handleQuickAccessClick} 
        />

        {/* Seção de Visão Geral do Planejamento */}
        <section className="mb-8" aria-labelledby="planning-overview">
          <SectionHeader>
            <h2 id="planning-overview" className="text-xl font-semibold">Visão Geral do Planejamento</h2>
            <TabButtons role="tablist">
              <TabButton
                role="tab"
                aria-selected={activeTab === 'series'}
                $active={activeTab === 'series'}
                onClick={() => setActiveTab('series')}
              >
                Por Série
              </TabButton>
              <TabButton
                role="tab"
                aria-selected={activeTab === 'turma'}
                $active={activeTab === 'turma'}
                onClick={() => setActiveTab('turma')}
              >
                Por Turma
              </TabButton>
            </TabButtons>
          </SectionHeader>

          <GridSection role="tabpanel">
            {currentPlanningData.length > 0 ? (
              currentPlanningData.map((item, index) => (
                <PlanningCard
                  key={index}
                  title={'serie' in item ? item.serie! : item.turma!}
                  completo={item.completo}
                  pendente={item.pendente}
                  parcial={'parcial' in item ? item.parcial : undefined}
                />
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                Nenhum dado de planejamento disponível
              </div>
            )}
          </GridSection>
        </section>

        {/* Seção de Notificações e Próximas Atividades */}
        <section className="mb-8" aria-label="Notificações e Atividades">
          <GridSection>
            <NotificationSection notifications={notificacoes as NotificationType[]} />
            <UpcomingActivitiesSection activities={proximasAtividades as ActivityType[]} />
          </GridSection>
        </section>

        {/* Seção de Resumos */}
        <section className="mb-8" aria-label="Resumos">
          <GridSection>
            <SectionCard>
              <SectionHeader>
                <h2 className="text-xl font-semibold">Resumo por Disciplina</h2>
              </SectionHeader>
              <DataTable
                data={resumoPorDisciplina as SubjectSummaryType[]}
                emptyMessage="Nenhuma disciplina cadastrada"
              />
            </SectionCard>

            <SectionCard>
              <SectionHeader>
                <h2 className="text-xl font-semibold">Resumo por Turma</h2>
              </SectionHeader>
              <DataTable
                data={resumoPorTurma as ClassSummaryType[]}
                emptyMessage="Nenhuma turma cadastrada"
              />
            </SectionCard>
          </GridSection>
        </section>
      </DashboardContainer>
    </ErrorBoundary>
  );
};

export default PlanningDashboard;