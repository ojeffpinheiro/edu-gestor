import React, { useState } from 'react';
import { ClassPerformance, EvaluationRubric } from '../../../utils/types/Assessment'; // Removido StudentResult não utilizado
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
  const calculateClassMetrics = () => {
    if (!filteredClassData) return null;

    const totalStudents = filteredClassData.students.length;
    const averageScore = filteredClassData.examResults.length > 0
      ? filteredClassData.examResults.reduce((sum, exam) => sum + exam.averageScore, 0) / filteredClassData.examResults.length
      : 0;

    const passingRate = filteredClassData.examResults.length > 0
      ? (filteredClassData.examResults.filter(exam => exam.averageScore >= 70).length / filteredClassData.examResults.length) * 100
      : 0;

    return { totalStudents, averageScore, passingRate };
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
        </>
      ) : (
        <EmptyState message="Nenhuma turma selecionada" />
      )}
    </ClassViewContainer>
  );
};

export default ClassView;