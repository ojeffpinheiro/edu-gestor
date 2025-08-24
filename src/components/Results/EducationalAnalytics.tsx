import React, { useState } from 'react';
import styled from 'styled-components';
import { FaAward, FaCheckCircle, FaDownload, FaFilter, FaGraduationCap, FaUser, FaUsers } from 'react-icons/fa';
import { FiAlertTriangle, FiFileText } from 'react-icons/fi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { MetricCard } from './Features/MetricCard';
import { ClassPerformance, ClassPerformanceWithSubjects, StudentResult } from '../../utils/types/Assessment';

const AnalyticsContainer = styled.div`
  min-height: 100vh;
  background: var(--color-background);
`;

const Header = styled.header`
  border-bottom: 1px solid var(--color-border);
  background: var(--color-card);
  box-shadow: var(--shadow-card);
  padding: 1.5rem 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const HeaderSubtitle = styled.p`
  color: var(--color-muted-foreground);
  margin: 0.25rem 0 0 0;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Grid = styled.div<{ $columns?: number }>`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(${({ $columns = 1 }) => $columns}, 1fr);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Flex = styled.div<{ $justify?: string; $align?: string; $gap?: string }>`
  display: flex;
  justify-content: ${({ $justify = 'flex-start' }) => $justify};
  align-items: ${({ $align = 'center' }) => $align};
  gap: ${({ $gap = '0.5rem' }) => $gap};
`;

interface Props {
    classPerformances: ClassPerformance[];
    currentClass: ClassPerformanceWithSubjects | null;
    students: StudentResult[]
}

export const EducationalAnalytics: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const OverviewTab = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Grid $columns={4}>
        <MetricCard
          title="Média Geral" 
          value="7.5" 
          change="+0.3 vs mês anterior"
          icon={<FaGraduationCap size={16} />}
          trend="up"
        />
        <MetricCard 
          title="Taxa de Aprovação" 
          value="92%" 
          change="+5% vs nacional"
          icon={<FaCheckCircle size={16} />}
          trend="up"
        />
        <MetricCard 
          title="Total de Alunos" 
          value="1,247" 
          change="+12 novos alunos"
          icon={<FaUsers size={16} />}
          trend="up"
        />
        <MetricCard 
          title="Alunos em Risco" 
          value="43" 
          change="-8 vs mês anterior"
          icon={<FiAlertTriangle size={16} />}
          trend="down"
        />
      </Grid>

      <Grid $columns={2}>
        <Card>
          <CardHeader>
            <CardTitle>Comparação com Padrões Nacionais</CardTitle>
            <CardDescription>Média por disciplina vs. nacional</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Gráfico seria implementado aqui */}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Notas</CardTitle>
            <CardDescription>Número de alunos por faixa de nota</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Gráfico seria implementado aqui */}
          </CardContent>
        </Card>
      </Grid>

      <Card>
        <CardHeader>
          <CardTitle>Relatórios Disponíveis</CardTitle>
          <CardDescription>Gere relatórios personalizados com base nos dados</CardDescription>
        </CardHeader>
        <CardContent>
          <Flex $gap="0.75rem">
            <Button $variant="hero">
              <FaDownload size={16} />
              Relatório Executivo
            </Button>
            <Button $variant="gradient">
              <FiFileText size={16} />
              Análise Detalhada
            </Button>
            <Button $variant="success">
              <FaAward size={16} />
              Ranking de Desempenho
            </Button>
          </Flex>
        </CardContent>
      </Card>
    </div>
  );

  // Implementar outras tabs seguindo o mesmo padrão...

  return (
    <AnalyticsContainer>
      <Header>
        <HeaderContent>
          <div>
            <HeaderTitle>Sistema de Análise Educacional</HeaderTitle>
            <HeaderSubtitle>Relatórios avançados para gestão educacional</HeaderSubtitle>
          </div>
          <Flex $gap="0.75rem">
            <Button $variant="outline">
              <FaFilter size={16} />
              Filtros Avançados
            </Button>
            <Button $variant="hero">
              <FaDownload size={16} />
              Exportar Dados
            </Button>
          </Flex>
        </HeaderContent>
      </Header>

      <MainContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Trigger value="overview" icon={<FaGraduationCap size={16} />}>
              Visão Geral
            </Tabs.Trigger>
            <Tabs.Trigger value="class" icon={<FaUsers size={16} />}>
              Turma
            </Tabs.Trigger>
            <Tabs.Trigger value="student" icon={<FaUser size={16} />}>
              Aluno
            </Tabs.Trigger>
            <Tabs.Trigger value="question" icon={<FiFileText size={16} />}>
              Questão
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="overview">
            <OverviewTab />
          </Tabs.Content>

          {/* Adicionar outras tabs aqui */}
        </Tabs>
      </MainContent>
    </AnalyticsContainer>
  );
};