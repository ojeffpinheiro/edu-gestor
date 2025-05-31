import React from 'react';
import { ClassPerformance, ExamSummary } from '../../../utils/types/Assessment';
import ScoreDistributionChart from '../Charts/ScoreDistributionChart';
import TemporalProgressChart from '../Charts/TemporalProgressChart';
import ClassPerformanceChart from '../ClassPerformanceChart';
import DashboardCard from '../DashboardCard';
import EmptyState from '../EmptyState';
import LoadingSpinner from '../../shared/LoadingSpinner';

interface OverviewViewProps {
  examSummaries: ExamSummary[];
  classPerformances: ClassPerformance[];
  onClassSelect: (classId: string | null) => void;
  isLoading?: boolean;
  error?: Error | null;
}

const OverviewView: React.FC<OverviewViewProps> = ({ 
  examSummaries, 
  classPerformances,
  onClassSelect,
  isLoading,
  error
}) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <EmptyState message="Erro ao carregar dados" />;
  
  const hasData = examSummaries.length > 0 && classPerformances.length > 0;

  return (
    <div className="overview-view">
      {hasData ? (
        <>
          <div className="chart-row">
            <DashboardCard 
              title="Distribuição de Notas"
              description="Distribuição das notas dos alunos com curva normal"
            >
              <ScoreDistributionChart examSummaries={examSummaries} />
            </DashboardCard>
            
            <DashboardCard
              title="Progresso Temporal"
              description="Evolução do desempenho ao longo do tempo"
            >
              <TemporalProgressChart examSummaries={examSummaries} />
            </DashboardCard>
          </div>

          <div className="chart-row">
            <DashboardCard
              title="Desempenho por Turma"
              description="Comparação entre turmas"
              fullWidth
            >
              <ClassPerformanceChart
                classPerformances={classPerformances}
                onClassSelect={onClassSelect}
              />
            </DashboardCard>
          </div>
        </>
      ) : (
        <EmptyState message="Nenhum dado disponível para exibição" />
      )}
    </div>
  );
};

export default OverviewView;