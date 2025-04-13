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

import { formatDate } from '../../utils/dateFormatter';
import { 
  notificacoes, 
  planejamentoPorSerie, 
  planejamentoPorTurma, 
  proximasAtividades, 
  resumoPorDisciplina, 
  resumoPorTurma
 } from '../../mocks/planner';

import { Table, TableHeader, TableRow, Td } from '../../styles/table';

import { 
  DashboardContainer, 
  GridSection, 
  NotificationItem, 
  NotificationList, 
  PlanningCardWrapper, 
  ProgressBar, 
  QuickAccessCard, 
  QuickHeader, 
  SectionCard, 
  SectionHeader, 
  TabButton, 
  TabButtons } 
from './styles'
import { useNavigate } from 'react-router-dom';


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
  const navigate = useNavigate();

  // Centralized Data Management
  const dashboardData = {
    accessCards: [
      {
        id: 1,
        titulo: 'Sequência Didática',
        icon: <FaLayerGroup size={24} />,
        color: 'var(--color-primary)',
        link: '/didactic-sequences'
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
        link: '/evaluations'
      },
      {
        id: 5,
        titulo: 'Gestão de Turmas',
        icon: <FaUsers size={24} />,
        color: 'var(--color-feedback-error)',
        link: '/digital-notebook'
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
      ? planejamentoPorSerie
      : planejamentoPorTurma,
    [activeTab]
  );

  const handleClickQuick = (link: string) => {
    navigate(link);
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
       <section>
        <SectionHeader>
          <h2 className="text-xl font-semibold">Acesso Rápido</h2>
        </SectionHeader>
        <GridSection>
          {dashboardData.accessCards.map(card => (
            <QuickAccessCard
              key={card.id}
              $color={card.color}
              onClick={() => handleClickQuick(card.link)}
            >
              <QuickHeader>
                {card.icon}
                <h3 className="ml-2 text-lg font-semibold">{card.titulo}</h3>
              </QuickHeader>
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
              {notificacoes.map(notificacao => (
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
              {proximasAtividades.map(atividade => (
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
              data={resumoPorDisciplina}
            />
          </SectionCard>

          <SectionCard>
            <SectionHeader>
              <h2 className="text-xl font-semibold">Resumo por Turma</h2>
            </SectionHeader>
            <DataTable
              data={resumoPorTurma}
            />
          </SectionCard>
        </GridSection>
      </section>
    </DashboardContainer>
  );
};

export default PlanningDashboard;