import React, { useState } from 'react';
import { ClassPerformance, EvaluationRubric, ClassMetrics } from '../../../utils/types/Assessment';
import DashboardCard from '../DashboardCard';
import RadarChart from '../Charts/RadarChart';
import EmptyState from '../EmptyState';
import ClassSelector from '../ClassSelector';
import SubjectSelector from '../SubjectSelector';
import { ClassViewContainer } from '../../../pages/DashboardResultViewer/styles';
import { ChartTabs, TabButton } from './styles/ClassViewStyles';
import ScoreDistributionChart from '../Charts/ScoreDistributionChart';
import ProgressChart from '../Charts/ProgressChart';

interface ClassViewProps {
  classPerformances: ClassPerformance[];
  selectedClass: string | null;
  onClassSelect: (classId: string | null) => void;
  onStudentSelect: (studentId: string | null) => void;
  rubrics?: EvaluationRubric[];
  isLoading?: boolean;
}

const ClassView: React.FC<ClassViewProps> = ({
  classPerformances,
  selectedClass,
  onClassSelect,
  onStudentSelect,
  rubrics,
  isLoading
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activeChartTab, setActiveChartTab] = useState<'radar' | 'distribution' | 'progress'>('radar');
  const currentClass = selectedClass
    ? classPerformances.find(c => c.classId === selectedClass)
    : null;

  // Filtra resultados por disciplina se selecionada
  const filteredClassData = currentClass ? {
    ...currentClass,
    examResults: selectedSubject
      ? currentClass.examResults.filter(exam => exam.subject === selectedSubject)
      : currentClass.examResults
  } : null;

  // Calcula métricas da turma
  const calculateClassMetrics = (): ClassMetrics | null => {
    if (!filteredClassData) return null;

    const totalStudents = filteredClassData.students.length;
    const examCount = filteredClassData.examResults.length;

    // Cálculo de médias
    const averageScore = examCount > 0
      ? filteredClassData.examResults.reduce((sum, exam) => sum + exam.averageScore, 0) / examCount
      : 0;

    // Taxas de aprovação/reprovação
    const passingStudents = filteredClassData.students.filter(student => {
      const studentResults = filteredClassData.examResults.flatMap(exam => exam.results || [])
        .filter(result => result.studentId === student.id);
      return studentResults.length > 0 &&
        studentResults.every(result => result.totalScore >= 70);
    }).length;

    const failingStudents = totalStudents - passingStudents;
    const failingStudentsChange = 0; // Você precisará implementar a lógica real aqui

    // Frequência
    const frequentStudents = filteredClassData.students.filter(s =>
      s.attendanceRate !== undefined && s.attendanceRate >= 75
    ).length;

    return {
      totalStudents,
      averageScore,
      passingRate: (passingStudents / totalStudents) * 100,
      failingRate: (failingStudents / totalStudents) * 100,
      frequentStudents,
      infrequentStudents: totalStudents - frequentStudents,
      attendanceRate: frequentStudents / totalStudents * 100,
      failingStudents,
      failingStudentsChange
    };
  };

  const classMetrics = calculateClassMetrics();

  if (isLoading) return <EmptyState message="Carregando dados da turma..." />;

  return (
    <ClassViewContainer>
      <div className="class-controls">
        <ClassSelector
          classes={classPerformances}
          selectedClass={selectedClass}
          onSelect={onClassSelect}
        />

        {currentClass?.subjects && currentClass.subjects.length > 0 && (
          <SubjectSelector
            subjects={currentClass.subjects}
            selectedSubject={selectedSubject}
            onSelect={setSelectedSubject}
          />
        )}
      </div>

      {filteredClassData ? (
        <>
          {/* Cards de Métricas */}
          <div className="metrics-row">
            <DashboardCard title="Total de Alunos" className="metric-card">
              <div className="metric-value">
                {classMetrics?.totalStudents || 0}
              </div>
            </DashboardCard>

            <DashboardCard title="Média da Turma" className="metric-card">
              <div className="metric-value">
                {classMetrics?.averageScore.toFixed(1) || '0.0'}
                <span className="metric-unit">pts</span>
              </div>
            </DashboardCard>

            <DashboardCard title="Taxa de Aprovação" className="metric-card">
              <div className="metric-value">
                {classMetrics?.passingRate.toFixed(1) || '0.0'}
                <span className="metric-unit">%</span>
              </div>
            </DashboardCard>
          </div>

          <DashboardCard
            title="Análise de Desempenho"
            description="Selecione o tipo de visualização"
          >
            <ChartTabs>
              <TabButton
                $active={activeChartTab === 'radar'}
                onClick={() => setActiveChartTab('radar')}
              >
                Desempenho por Habilidade
              </TabButton>
              <TabButton
                $active={activeChartTab === 'distribution'}
                onClick={() => setActiveChartTab('distribution')}
              >
                Distribuição de Notas
              </TabButton>
              <TabButton
                $active={activeChartTab === 'progress'}
                onClick={() => setActiveChartTab('progress')}
              >
                Progresso Temporal
              </TabButton>
            </ChartTabs>

            <div className="chart-container">
              {activeChartTab === 'radar' && (
                <RadarChart
                  classPerformance={filteredClassData}
                  rubrics={rubrics}
                />
              )}
              {activeChartTab === 'distribution' && (
                <ScoreDistributionChart
                  examSummaries={filteredClassData.examResults}
                />
              )}
              {activeChartTab === 'progress' && (
                <ProgressChart
                  classPerformance={filteredClassData}
                />
              )}
            </div>
          </DashboardCard>

          <DashboardCard title="Alunos em Recuperação" className="metric-card warning">
            <div className="metric-value">
              {classMetrics?.failingStudents || 0}
              <span className="metric-change">
                {classMetrics?.failingStudentsChange ? `${classMetrics.failingStudentsChange}%` : ''}
              </span>
            </div>
          </DashboardCard>

          <DashboardCard title="Frequência" className="metric-card">
            <div className="metric-value">
              {classMetrics?.frequentStudents ?? 0}
              <span className="metric-unit">/{classMetrics?.totalStudents ?? 0}</span>
            </div>
            <div className="metric-subtext">
              {classMetrics && (
                `(${((classMetrics.frequentStudents / classMetrics.totalStudents) * 100).toFixed(1)}% de frequência)`
              )}
            </div>
          </DashboardCard>
        </>
      ) : (
        <EmptyState message="Nenhuma turma selecionada" />
      )}
    </ClassViewContainer>
  );
};

export default ClassView;