import React, { useState, useMemo } from 'react';
import {
  FaBell,
  FaCalendarAlt,
  FaClock,
  FaCheckSquare,
  FaLayerGroup,
  FaUsers,
  FaFileAlt,
  FaCalendar
} from 'react-icons/fa';

import { 
  DashboardContainer, 
  GridSection, 
  NotificationItem, 
  NotificationList, 
  PlanningCardWrapper, 
  ProgressBar, 
  QuickAccessCard, 
  SectionCard, 
  SectionHeader, 
  TabButton, 
  TabButtons } 
from './styles'
import { Table, TableHeader, TableRow, Td } from '../../styles/table';

// Utility Functions
const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('pt-BR');

const calculatePercentages = (total: number, completed: number, partial?: number) => {
  const completePercent = Math.round((completed / total) * 100);
  const pendingPercent = 100 - completePercent;
  const partialPercent = partial ? Math.round((partial / total) * 100) : 0;

  return { completePercent, pendingPercent, partialPercent };
};

// Components
const PlanningCard: React.FC<{
  title: string,
  completo: number,
  pendente: number,
  parcial?: number
}> = ({ title, completo, pendente, parcial }) => {
  const { completePercent, pendingPercent, partialPercent } = calculatePercentages(
    100, completo, parcial
  );

  return (
    <PlanningCardWrapper>
      <h3>{title}</h3>
      <ProgressBar $progress={completePercent}>
        <div></div>
      </ProgressBar>
      <div className="mt-2 flex justify-between text-sm">
        <span className="text-green-600">{completePercent}% concluído</span>
        {parcial !== undefined && (
          <span className="text-yellow-600">{partialPercent}% parcial</span>
        )}
        <span className="text-red-600">{pendingPercent}% pendente</span>
      </div>
    </PlanningCardWrapper>
  );
};

const DataTable = <T extends Record<string, any>>({ data, columns }: {
  data: T[],
  columns?: (keyof T)[]
}) => {
  const tableColumns = columns || Object.keys(data[0]) as (keyof T)[];

  return (
    <Table className="w-full">
      <thead>
        <tr>
          {tableColumns.map(key => (
            <TableHeader
              key={String(key)}
              className="text-left py-2 border-b capitalize"
            >
              {String(key).replace(/([A-Z])/g, ' $1').trim()}
            </TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableRow key={index}>
            {tableColumns.map(key => (
              <Td key={String(key)} className="py-2 border-b">
                {String(item[key])}
              </Td>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

// Main Dashboard Component
const PlanningDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'series' | 'turma'>('series');

  // Centralized Data Management
  const dashboardData = {
    planejamentoPorSerie: [
      { serie: '6º ano', completo: 85, parcial: 10, pendente: 5 },
      { serie: '7º ano', completo: 90, parcial: 5, pendente: 5 },
      { serie: '8º ano', completo: 80, parcial: 15, pendente: 5 },
      { serie: '9º ano', completo: 95, parcial: 5, pendente: 0 }
    ],
    planejamentoPorTurma: [
      { turma: '101', completo: 100, pendente: 0 },
      { turma: '301', completo: 100, pendente: 0 },
      { turma: '202', completo: 85, pendente: 15 },
      { turma: '203', completo: 50, pendente: 50 },
      { turma: '204', completo: 10, pendente: 90 }
    ],
    notificacoes: [
      {
        id: 1,
        tipo: 'prazo',
        mensagem: 'Entrega de notas do 1º bimestre até 15/04',
        data: '2025-04-15'
      },
      {
        id: 2,
        tipo: 'lembrete',
        mensagem: 'Reunião pedagógica amanhã às 14h',
        data: '2025-03-25'
      },
      {
        id: 3,
        tipo: 'evento',
        mensagem: 'Feira de ciências em 10 dias',
        data: '2025-04-03'
      }
    ],
    proximasAtividades: [
      {
        id: 1,
        titulo: 'Avaliação de Matemática - 9º ano A',
        data: '2025-03-26',
        horario: '10:00'
      },
      {
        id: 2,
        titulo: 'Entrega de trabalho - 8º ano B',
        data: '2025-03-28',
        horario: '08:00'
      },
      {
        id: 3,
        titulo: 'Aula prática de Ciências - 7º ano C',
        data: '2025-03-31',
        horario: '13:30'
      }
    ],
    resumoPorDisciplina: [
      { Disciplina: 'Matemática', Turmas: 5, Aulas: 20, Planejadas: 18, Pendentes: 2 },
      { Disciplina: 'Português', Turmas: 4, Aulas: 16, Planejadas: 16, Pendentes: 0 },
      { Disciplina: 'Ciências', Turmas: 3, Aulas: 12, Planejadas: 10, Pendentes: 2 }
    ],
    resumoPorTurma: [
      { turma: '9º ano A', disciplinas: 8, aulas: 32, planejadas: 30, pendentes: 2 },
      { turma: '8º ano B', disciplinas: 8, aulas: 32, planejadas: 29, pendentes: 3 },
      { turma: '7º ano C', disciplinas: 8, aulas: 32, planejadas: 28, pendentes: 4 }
    ],
    accessCards: [
      {
        id: 1,
        titulo: 'Sequência Didática',
        icon: <FaLayerGroup size={24} />,
        color: 'var(--color-primary)',
        link: '/sequencias'
      },
      {
        id: 2,
        titulo: 'Planejamento de Aulas',
        icon: <FaFileAlt size={24} />,
        color: 'var(--color-secondary)',
        link: '/planejamento'
      },
      {
        id: 3,
        titulo: 'Horário Semanal',
        icon: <FaClock size={24} />,
        color: 'var(--color-feedback-warning)',
        link: '/horario'
      },
      {
        id: 4,
        titulo: 'Atividades e Avaliações',
        icon: <FaCheckSquare size={24} />,
        color: 'var(--color-feedback-success)',
        link: '/atividades'
      },
      {
        id: 5,
        titulo: 'Gestão de Turmas',
        icon: <FaUsers size={24} />,
        color: 'var(--color-feedback-error)',
        link: '/turmas'
      },
      {
        id: 6,
        titulo: 'Calendário Acadêmico',
        icon: <FaCalendar size={24} />,
        color: 'var(--color-info)',
        link: '/calendario'
      }
    ]
  };

  // Memoized Data for Performance
  const currentPlanningData = useMemo(() =>
    activeTab === 'series'
      ? dashboardData.planejamentoPorSerie
      : dashboardData.planejamentoPorTurma,
    [activeTab]
  );

  return (
    <DashboardContainer>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard do Professor</h1>
        <p className="text-gray-600">
          Bem-vindo(a) de volta! Aqui está seu panorama acadêmico.
        </p>
      </header>

       {/* Quick Access Section */}
       <section>
        <SectionHeader>
          <h2 className="text-xl font-semibold">Acesso Rápido</h2>
        </SectionHeader>
        <GridSection>
          {dashboardData.accessCards.map(card => (
            <QuickAccessCard
              key={card.id}
              $color={card.color}
            >
              <div className="flex items-center gap-1rem mb-4">
                {card.icon}
                <h3 className="ml-2 text-lg font-semibold">{card.titulo}</h3>
              </div>
              <p className="text-sm opacity-80">
                Acesse e gerencie {card.titulo.toLowerCase()}
              </p>
            </QuickAccessCard>
          ))}
        </GridSection>
      </section>

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
          <SectionCard>
            <SectionHeader>
              <h2 className="text-xl font-semibold flex items-center">
                <FaBell className="mr-2" /> Notificações
              </h2>
            </SectionHeader>
            <NotificationList>
              {dashboardData.notificacoes.map(notificacao => (
                <NotificationItem key={notificacao.id}>
                  <div>
                    <span className="text-sm font-medium">
                      {notificacao.mensagem}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatDate(notificacao.data)}
                    </span>
                  </div>
                </NotificationItem>
              ))}
            </NotificationList>
          </SectionCard>

          <SectionCard>
            <SectionHeader>
              <h2 className="text-xl font-semibold flex items-center">
                <FaCalendarAlt className="mr-2" /> Próximas Atividades
              </h2>
            </SectionHeader>
            <NotificationList>
              {dashboardData.proximasAtividades.map(atividade => (
                <NotificationItem key={atividade.id}>
                  <div>
                    <span className="text-sm font-medium">
                      {atividade.titulo}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatDate(atividade.data)} - {atividade.horario}
                    </span>
                  </div>
                </NotificationItem>
              ))}
            </NotificationList>
          </SectionCard>
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
              data={dashboardData.resumoPorDisciplina}
            />
          </SectionCard>

          <SectionCard>
            <SectionHeader>
              <h2 className="text-xl font-semibold">Resumo por Turma</h2>
            </SectionHeader>
            <DataTable
              data={dashboardData.resumoPorTurma}
            />
          </SectionCard>
        </GridSection>
      </section>
    </DashboardContainer>
  );
};

export default PlanningDashboard;