import React, { useMemo, useState } from 'react';
import { FiBarChart2, FiPieChart, FiTrendingUp } from 'react-icons/fi';
import { ClassPerformance, ExamSummary, StudentResult } from '../../../utils/types/Assessment';

import { useStrategicData } from '../../../hooks/useStrategicData';

import ScoreDistributionChart from '../Charts/ScoreDistributionChart';
import TemporalProgressChart from '../Charts/TemporalProgressChart';
import ClassPerformanceChart from '../ClassPerformanceChart';
import PerformanceTrendSection from '../PerformanceTrendChart';

import DashboardCard from '../DashboardCard';
import EmptyState from '../EmptyState';

import LoadingSpinner from '../../shared/LoadingSpinner';
import InstitutionalMetrics from '../InstitutionalMetrics';

import { TabContent, TabsContainer } from './styles/OverviewViewStyles';
import { TabButton } from './styles/ClassViewStyles';

type OverviewTab = 'performance' | 'progress' | 'distribution';

interface OverviewViewProps {
  examSummaries: ExamSummary[];
  studentResults: StudentResult[],
  classPerformances: ClassPerformance[];
  isLoading?: boolean;
  error?: Error | null;
  onClassSelect: (classId: string | null) => void;
}

const OverviewView: React.FC<OverviewViewProps> = ({
  examSummaries,
  classPerformances,
  studentResults,
  onClassSelect,
  isLoading,
  error
}) => {
  const [activeTab, setActiveTab] = useState<OverviewTab>('performance');

  const { 
      metrics, 
      learningGaps, 
      classRankings, 
      predictions, 
      alerts 
    } = useStrategicData(
      examSummaries,
      classPerformances,
      studentResults
    );

  const distributionData = useMemo(() => {
    const allScores = examSummaries.flatMap(exam =>
      exam.results?.map(result => result.totalScore) || []
    );

    const scoreCounts = allScores.reduce((acc, score) => {
      acc[score] = (acc[score] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return Object.entries(scoreCounts).map(([score, count]) => ({
      score: Number(score),
      count
    }));
  }, [examSummaries]);

  const hasData = examSummaries.length > 0 && classPerformances.length > 0;

  if (isLoading) return <LoadingSpinner />;
  if (error) return <EmptyState message={`Erro ao carregar dados: ${error.message}`} />;

  return (
    <div className="overview-view">
      {hasData ? (
        <>
          <TabsContainer>
            <TabButton
              $active={activeTab === 'performance'}
              onClick={() => setActiveTab('performance')}
            >
              <FiBarChart2 /> Desempenho
            </TabButton>

            <TabButton
              $active={activeTab === 'progress'}
              onClick={() => setActiveTab('progress')}
            >
              <FiTrendingUp /> Progresso
            </TabButton>

            <TabButton
              $active={activeTab === 'distribution'}
              onClick={() => setActiveTab('distribution')}
            >
              <FiPieChart />Distribuição
            </TabButton>
          </TabsContainer>

          {/* Conteúdo das Abas */}
          <TabContent>
            <div className="overview-cards">
              <InstitutionalMetrics metrics={metrics} />
              <PerformanceTrendSection 
                examSummaries={examSummaries} 
                targetScore={metrics.goals.averageScore} />
            </div>
            {activeTab === 'performance' && (
              <div className="chart-row">
                <DashboardCard title="Desempenho por Turma" fullWidth>
                  <ClassPerformanceChart 
                    classPerformances={classPerformances} 
                    onClassSelect={onClassSelect} 
                  />
                </DashboardCard>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="chart-row">
                <DashboardCard title="Progresso Temporal">
                  <TemporalProgressChart examSummaries={examSummaries} />
                </DashboardCard>
              </div>
            )}

            {activeTab === 'distribution' && (
              <div className="chart-row">
                <DashboardCard title="Distribuição de Notas">
                  <ScoreDistributionChart data={distributionData} />
                </DashboardCard>
              </div>
            )}
          </TabContent>
        </>
      ) : (
        <EmptyState message="Nenhum dado disponível para exibição" />
      )}
    </div>
  );
};

export default OverviewView;