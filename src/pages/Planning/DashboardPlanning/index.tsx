import React, { useState } from 'react';
import { FaChartLine, FaUsers, FaBook, FaClipboardList, FaCalendarAlt, FaBell, FaSearch, FaCog, FaSignOutAlt } from 'react-icons/fa';

import { Spacing } from '../../../styles/tokens';
import {
    ActivityContent,
    ActivityIcon,
    ActivityItem,
    ActivityList,
    ActivityTime,
    ActivityTitle,
    Avatar,
    CardIcon,
    CardTitle,
    CardTrend,
    CardValue,
    ChartContainer,
    ChartPlaceholder,
    ChartTitle,
    ChartsRow,
    DashboardContainer,
    HeaderContainer,
    IconButton,
    Logo,
    MainContent,
    PageContent,
    PageTitle,
    SearchBar,
    Sidebar,
    SidebarMenu,
    SidebarMenuItem,
    StatsCard,
    StatsGrid,
    UserMenu
} from './styles'

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
};

const StatCard = ({ title, value, icon, trend }: StatCardProps) => (
  <StatsCard>
    <CardIcon>{icon}</CardIcon>
    <CardTitle>{title}</CardTitle>
    <CardValue>{value}</CardValue>
    {trend && (
      <CardTrend positive={trend.positive}>
        {trend.positive ? '↑' : '↓'} {trend.value}
      </CardTrend>
    )}
  </StatsCard>
);

const DashboardPlanning = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  
  return (
    <DashboardContainer>
      <HeaderContainer>
        <Logo>Planejamento Educacional</Logo>
        <SearchBar>
          <FaSearch />
          <input type="text" placeholder="Buscar..." />
        </SearchBar>
        <UserMenu>
          <IconButton>
            <FaBell />
          </IconButton>
          <IconButton>
            <FaCog />
          </IconButton>
          <Avatar>JD</Avatar>
        </UserMenu>
      </HeaderContainer>
      
      <MainContent>
        <Sidebar>
          <SidebarMenu>
            <SidebarMenuItem active={activeMenu === 'dashboard'}>
              <a href="#" onClick={() => setActiveMenu('dashboard')}>
                <FaChartLine />
                Dashboard
              </a>
            </SidebarMenuItem>
            <SidebarMenuItem active={activeMenu === 'courses'}>
              <a href="#" onClick={() => setActiveMenu('courses')}>
                <FaBook />
                Cursos
              </a>
            </SidebarMenuItem>
            <SidebarMenuItem active={activeMenu === 'students'}>
              <a href="#" onClick={() => setActiveMenu('students')}>
                <FaUsers />
                Estudantes
              </a>
            </SidebarMenuItem>
            <SidebarMenuItem active={activeMenu === 'planning'}>
              <a href="#" onClick={() => setActiveMenu('planning')}>
                <FaClipboardList />
                Planejamento
              </a>
            </SidebarMenuItem>
            <SidebarMenuItem active={activeMenu === 'calendar'}>
              <a href="#" onClick={() => setActiveMenu('calendar')}>
                <FaCalendarAlt />
                Calendário
              </a>
            </SidebarMenuItem>
          </SidebarMenu>
          
          <div style={{ marginTop: 'auto', paddingTop: Spacing.xl }}>
            <SidebarMenuItem>
              <a href="#">
                <FaSignOutAlt />
                Sair
              </a>
            </SidebarMenuItem>
          </div>
        </Sidebar>
        
        <PageContent>
          <PageTitle>Dashboard</PageTitle>
          
          <StatsGrid>
            <StatCard 
              title="Total de Alunos" 
              value="248" 
              icon={<FaUsers />} 
              trend={{ value: "12%", positive: true }}
            />
            <StatCard 
              title="Cursos Ativos" 
              value="8" 
              icon={<FaBook />} 
              trend={{ value: "5%", positive: true }}
            />
            <StatCard 
              title="Planos de Aula" 
              value="36" 
              icon={<FaClipboardList />} 
              trend={{ value: "8%", positive: true }}
            />
            <StatCard 
              title="Eventos" 
              value="12" 
              icon={<FaCalendarAlt />} 
              trend={{ value: "3%", positive: false }}
            />
          </StatsGrid>
          
          <ChartsRow>
            <ChartContainer>
              <ChartTitle>Desempenho dos Alunos</ChartTitle>
              <ChartPlaceholder>
                Gráfico de Desempenho
              </ChartPlaceholder>
            </ChartContainer>
            
            <ChartContainer>
              <ChartTitle>Distribuição por Série</ChartTitle>
              <ChartPlaceholder>
                Gráfico de Distribuição
              </ChartPlaceholder>
            </ChartContainer>
          </ChartsRow>
          
          <ChartContainer>
            <ChartTitle>Atividades Recentes</ChartTitle>
            <ActivityList>
              <ActivityItem>
                <ActivityIcon>
                  <FaBook />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>Novo plano de aula adicionado: "Matemática Aplicada"</ActivityTitle>
                  <ActivityTime>Há 2 horas</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityIcon>
                  <FaUsers />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>3 novos alunos registrados</ActivityTitle>
                  <ActivityTime>Há 5 horas</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityIcon>
                  <FaCalendarAlt />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>Evento agendado: "Reunião de Pais e Mestres"</ActivityTitle>
                  <ActivityTime>Há 1 dia</ActivityTime>
                </ActivityContent>
              </ActivityItem>
              <ActivityItem>
                <ActivityIcon>
                  <FaClipboardList />
                </ActivityIcon>
                <ActivityContent>
                  <ActivityTitle>Plano de aula atualizado: "Geografia - Capitais Mundiais"</ActivityTitle>
                  <ActivityTime>Há 2 dias</ActivityTime>
                </ActivityContent>
              </ActivityItem>
            </ActivityList>
          </ChartContainer>
        </PageContent>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardPlanning;