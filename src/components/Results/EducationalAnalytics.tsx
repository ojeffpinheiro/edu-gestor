import React, { useState } from 'react';
import { FaAward, FaBookOpen, FaCheckCircle, FaDownload, FaEye, FaFilter, FaGraduationCap, FaSearch, FaUser, FaUsers } from 'react-icons/fa';
import { FiAlertTriangle, FiFileText } from 'react-icons/fi';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { ClassPerformance, ClassPerformanceWithSubjects, StudentResult } from '../../utils/types/Assessment';

import { 
  Grid, AnalyticsContainer, Flex,
   Header, HeaderContent, HeaderSubtitle,
   HeaderTitle, MainContent,
   SectionHeader,
   SectionTitle,
   SectionDescription,
   SectionActions,
   ClassGrid,
   StudentGrid,
   StudentItem,
   StudentRank,
   StudentInfo,
   CheckboxGrid,
   CheckboxLabel,
   QuestionGrid,
   TabsContent
  } from './styles/Analytics';

import { Card, CardContent, CardDescription, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';

import { MetricCard } from './Features/MetricCard';
import { distributionData, overviewData, progressData } from '../../mocks/results';
import { CardHeader } from '../shared/Card.styles';
import { Badge } from '../shared/Badge.v2.styles';

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
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={overviewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Bar dataKey="average" fill="var(--color-primary)" name="Escola" />
                <Bar dataKey="national" fill="var(--color-accent)" name="Nacional" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Notas</CardTitle>
            <CardDescription>Número de alunos por faixa de nota</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={distributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Area
                  type="monotone" 
                  dataKey="students" 
                  stroke="var(--color-primary)" 
                  fill="var(--color-primary)" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
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

  
  const ClassTab = () => (
    <div>
      <SectionHeader>
        <div>
          <SectionTitle>Análise por Turma</SectionTitle>
          <SectionDescription>Desempenho detalhado das turmas</SectionDescription>
        </div>
        <SectionActions>
          <Button $variant="outline" $size="sm">
            <FaFilter size={16} />
            Filtros
          </Button>
          <Button $variant="default" $size="sm">
            <FaSearch size={16} />
            Buscar Turma
          </Button>
        </SectionActions>
      </SectionHeader>

      <ClassGrid>
        {["8º A", "8º B", "8º C"].map((turma, index) => (
          <Card key={turma}>
            <CardHeader $flex $alignCenter $justifyBetween>
              <div>
                <CardTitle>{turma}</CardTitle>
                <CardDescription>32 alunos • Matemática</CardDescription>
              </div>
              <Badge $variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"}>
                {index === 0 ? "Destaque" : index === 1 ? "Médio" : "Atenção"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span>Média:</span>
                  <span style={{ fontWeight: '600' }}>{[8.2, 7.1, 6.4][index]}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span>Taxa de Aprovação:</span>
                  <span style={{ fontWeight: '600' }}>{[94, 87, 78][index]}%</span>
                </div>
                <div style={{ paddingTop: '0.75rem' }}>
                  <Button $variant="outline" $size="sm" style={{ width: '100%' }}>
                    <FaEye size={16} />
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </ClassGrid>

      <Card>
        <CardHeader>
          <CardTitle>Evolução das Turmas</CardTitle>
          <CardDescription>Progresso ao longo do semestre</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Line type="monotone" dataKey="score" stroke="var(--color-primary)" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const StudentTab = () => (
    <div>
      <SectionHeader>
        <div>
          <SectionTitle>Relatórios Individuais</SectionTitle>
          <SectionDescription>Análise personalizada por aluno</SectionDescription>
        </div>
      </SectionHeader>

      <StudentGrid>
        <Card>
          <CardHeader>
            <CardTitle>Alunos em Destaque</CardTitle>
            <CardDescription>Top 5 melhores desempenhos</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {["Ana Silva", "João Santos", "Maria Oliveira", "Pedro Costa", "Luiza Ferreira"].map((name, index) => (
                <StudentItem key={name}>
                  <StudentInfo>
                    <StudentRank $rank={index + 1}>
                      {index + 1}
                    </StudentRank>
                    <span style={{ fontWeight: '500' }}>{name}</span>
                  </StudentInfo>
                  <Badge $variant="default">{[9.2, 8.9, 8.7, 8.5, 8.3][index]}</Badge>
                </StudentItem>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alunos em Risco</CardTitle>
            <CardDescription>Necessitam atenção especial</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {["Carlos Lima", "Beatriz Rocha", "Rafael Mendes"].map((name, index) => (
                <StudentItem key={name} $isRisk={true}>
                  <StudentInfo>
                    <FiAlertTriangle size={20} color="var(--color-destructive)" />
                    <span style={{ fontWeight: '500' }}>{name}</span>
                  </StudentInfo>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Badge $variant="destructive">{[4.2, 4.8, 5.1][index]}</Badge>
                    <Button $variant="outline" $size="sm">
                      Ação
                    </Button>
                  </div>
                </StudentItem>
              ))}
            </div>
          </CardContent>
        </Card>
      </StudentGrid>

      <Card>
        <CardHeader>
          <CardTitle>Configurar Relatório Individual</CardTitle>
          <CardDescription>Personalize os dados que deseja incluir</CardDescription>
        </CardHeader>
        <CardContent>
          <CheckboxGrid>
            <CheckboxLabel>
              <input type="checkbox" id="notas" defaultChecked />
              Notas e Percentis
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" id="evolucao" defaultChecked />
              Evolução Temporal
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" id="recomendacoes" defaultChecked />
              Recomendações
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" id="comparacao" />
              Comparação Turma
            </CheckboxLabel>
          </CheckboxGrid>
          <Button $variant="hero">
            <FaDownload size={16} />
            Gerar Relatório Individual
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const QuestionTab = () => (
    <div>
      <SectionHeader>
        <div>
          <SectionTitle>Análise Psicométrica</SectionTitle>
          <SectionDescription>Análise técnica por questão</SectionDescription>
        </div>
      </SectionHeader>

      <QuestionGrid>
        {[1, 2, 3, 4, 5, 6].map((questionNum) => (
          <Card key={questionNum}>
            <CardHeader $flex $alignCenter $justifyBetween>
              <div>
                <CardTitle>Questão {questionNum}</CardTitle>
                <CardDescription>Matemática • Álgebra</CardDescription>
              </div>
              <Badge $variant={questionNum <= 2 ? "destructive" : questionNum <= 4 ? "secondary" : "default"}>
                {questionNum <= 2 ? "Difícil" : questionNum <= 4 ? "Médio" : "Fácil"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span>Acertos:</span>
                  <span style={{ fontWeight: '600' }}>{[32, 45, 67, 78, 89, 92][questionNum - 1]}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span>Discriminação:</span>
                  <span style={{ fontWeight: '600' }}>{[0.2, 0.35, 0.52, 0.61, 0.73, 0.81][questionNum - 1]}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span>Distrator Mais Escolhido:</span>
                  <span style={{ fontWeight: '600' }}>Opção {["C", "B", "A", "D", "C", "B"][questionNum - 1]}</span>
                </div>
                <div style={{ paddingTop: '0.75rem' }}>
                  <Button $variant="outline" $size="sm" style={{ width: '100%' }}>
                    <FaBookOpen size={16} />
                    Análise Completa
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </QuestionGrid>

      <Card>
        <CardHeader>
          <CardTitle>Relatório Psicométrico Completo</CardTitle>
          <CardDescription>Gere análise técnica detalhada das questões</CardDescription>
        </CardHeader>
        <CardContent>
          <CheckboxGrid>
            <CheckboxLabel>
              <input type="checkbox" id="dificuldade" defaultChecked />
              Índice de Dificuldade
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" id="discriminacao" defaultChecked />
              Discriminação
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" id="distratores" defaultChecked />
              Análise de Distratores
            </CheckboxLabel>
            <CheckboxLabel>
              <input type="checkbox" id="confiabilidade" />
              Alpha de Cronbach
            </CheckboxLabel>
          </CheckboxGrid>
          <Button $variant="gradient">
            <FiFileText size={16} />
            Gerar Relatório Psicométrico
          </Button>
        </CardContent>
      </Card>
    </div>
  );

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

          
          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="class">
            <ClassTab />
          </TabsContent>

          <TabsContent value="student">
            <StudentTab />
          </TabsContent>

          <TabsContent value="question">
            <QuestionTab />
          </TabsContent>
        </Tabs>
      </MainContent>
    </AnalyticsContainer>
  );
};