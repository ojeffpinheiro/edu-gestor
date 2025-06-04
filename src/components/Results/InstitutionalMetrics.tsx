import React from 'react';
import { FiUsers, FiAward, FiAlertTriangle, FiTarget, FiBarChart2 } from 'react-icons/fi';
import DashboardCard from './DashboardCard';
import ProgressBadge from './ProgressBadge';
import styled from 'styled-components';
import { ComparisonContainer, MetricHighlight } from './Features/styles/OverviewViewStyles';
import MetricComparison from './MetricComparison';

interface InstitutionalMetricsProps {
  metrics: {
    totalStudents: number;
    totalClasses: number;
    overallAverage: number;
    passingRate: number;
    attendanceRate: number;
    riskStudents: number;
    improvingStudents: number;
    decliningStudents: number;
    benchmarkComparison: {
      regional: number;
      national: number;
    };
    goals: {
      averageScore: number;
      passingRate: number;
      attendanceRate: number;
    };
  };
  onMetricClick?: (metricKey: string) => void;
  riskDistribution?: {
    critical: number;
    high: number;
    medium: number;
  };
  attendanceTrend?: number;
}

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InstitutionalMetrics: React.FC<InstitutionalMetricsProps> = ({ 
  metrics, 
  onMetricClick,
  riskDistribution = { critical: 0.3, high: 0.5, medium: 0.2 },
  attendanceTrend = 2.5
}) => {
  const riskPercentage = (metrics.riskStudents / metrics.totalStudents) * 100;
  const averageVsGoal = metrics.overallAverage - metrics.goals.averageScore;
  const passingVsGoal = metrics.passingRate - metrics.goals.passingRate;
  const attendanceVsGoal = metrics.attendanceRate - metrics.goals.attendanceRate;

  return (
    <MetricGrid>
      {/* Cartão 1: Média Geral */}
      <DashboardCard 
        title="Média Geral" 
        icon={<FiBarChart2 />}
        onClick={() => onMetricClick?.('overallAverage')}
        className="highlight-card"
      >
        <MetricHighlight>
          {metrics.overallAverage.toFixed(1)}%
          <ProgressBadge 
            value={averageVsGoal}
            isPercentage={true}
            threshold={1}
          />
        </MetricHighlight>
        
        <ComparisonContainer>
          <MetricComparison
            label="Meta"
            currentValue={metrics.goals.averageScore}
            targetValue={metrics.overallAverage}
            isPercentage={true}
          />
          <MetricComparison
            label="Regional"
            currentValue={metrics.benchmarkComparison.regional}
            targetValue={metrics.overallAverage}
            isPercentage={true}
          />
          <MetricComparison
            label="Nacional"
            currentValue={metrics.benchmarkComparison.national}
            targetValue={metrics.overallAverage}
            isPercentage={true}
          />
        </ComparisonContainer>
      </DashboardCard>

      {/* Cartão 2: Taxa de Aprovação */}
      <DashboardCard 
        title="Taxa de Aprovação" 
        icon={<FiAward />}
        onClick={() => onMetricClick?.('passingRate')}
      >
        <MetricHighlight>
          {metrics.passingRate.toFixed(1)}%
          <ProgressBadge 
            value={passingVsGoal}
            isPercentage={true}
            threshold={2}
          />
        </MetricHighlight>
        
        <div className="metric-details">
          <div className="metric-detail-item">
            <span className="detail-label">Em melhoria:</span>
            <span className="detail-value positive">
              {metrics.improvingStudents} ({((metrics.improvingStudents / metrics.totalStudents) * 100).toFixed(1)}%)
            </span>
          </div>
          <div className="metric-detail-item">
            <span className="detail-label">Em declínio:</span>
            <span className="detail-value negative">
              {metrics.decliningStudents} ({((metrics.decliningStudents / metrics.totalStudents) * 100).toFixed(1)}%)
            </span>
          </div>
        </div>
      </DashboardCard>

      {/* Cartão 3: Alunos em Risco */}
      <DashboardCard 
        title="Alunos em Risco" 
        icon={<FiAlertTriangle />}
        onClick={() => onMetricClick?.('riskStudents')}
        className="risk-card"
      >
        <div className="metric-main-value">
          {metrics.riskStudents}
          <span className="risk-percentage">
            ({riskPercentage.toFixed(1)}%)
          </span>
        </div>
        
        <div className="risk-distribution">
          <div className="risk-level critical">
            <span className="level-label">Crítico:</span>
            <span className="level-value">
              {Math.round(metrics.riskStudents * riskDistribution.critical)}
            </span>
          </div>
          <div className="risk-level high">
            <span className="level-label">Alto:</span>
            <span className="level-value">
              {Math.round(metrics.riskStudents * riskDistribution.high)}
            </span>
          </div>
          <div className="risk-level medium">
            <span className="level-label">Médio:</span>
            <span className="level-value">
              {Math.round(metrics.riskStudents * riskDistribution.medium)}
            </span>
          </div>
        </div>
      </DashboardCard>

      {/* Cartão 4: Frequência */}
      <DashboardCard 
        title="Frequência Escolar" 
        icon={<FiUsers />}
        onClick={() => onMetricClick?.('attendanceRate')}
      >
        <div className="metric-main-value">
          {metrics.attendanceRate.toFixed(1)}%
          <ProgressBadge 
            value={attendanceVsGoal}
            isPercentage={true}
            threshold={1}
          />
        </div>
        
        <div className="attendance-trend">
          <div className="trend-label">Tendência:</div>
          <div className="trend-value">
            <span className={attendanceTrend >= 0 ? "positive" : "negative"}>
              {attendanceTrend >= 0 ? '+' : ''}{attendanceTrend}%
            </span> vs último período
          </div>
        </div>
      </DashboardCard>

      {/* Cartão 5: Visão Geral */}
      <DashboardCard 
        title="Visão Geral" 
        icon={<FiTarget />}
        className="summary-card"
      >
        <div className="summary-metrics">
          <div className="summary-item">
            <span className="summary-label">Total Alunos:</span>
            <span className="summary-value">{metrics.totalStudents}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Turmas:</span>
            <span className="summary-value">{metrics.totalClasses}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Média por Turma:</span>
            <span className="summary-value">
              {(metrics.totalStudents / metrics.totalClasses).toFixed(1)}
            </span>
          </div>
        </div>
      </DashboardCard>
    </MetricGrid>
  );
};

export default InstitutionalMetrics;