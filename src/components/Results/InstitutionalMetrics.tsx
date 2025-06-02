import React from 'react';
import { FiUsers, FiAward, FiAlertTriangle, FiTarget, FiBarChart2 } from 'react-icons/fi';
import DashboardCard from './DashboardCard';
import ProgressBadge from './ProgressBadge';
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
}

const InstitutionalMetrics: React.FC<InstitutionalMetricsProps> = ({ metrics, onMetricClick }) => {
  // Calcula porcentagem de alunos em risco
  const riskPercentage = (metrics.riskStudents / metrics.totalStudents) * 100;
  
  // Calcula diferença em relação às metas
  const averageVsGoal = metrics.overallAverage - metrics.goals.averageScore;
  const passingVsGoal = metrics.passingRate - metrics.goals.passingRate;
  const attendanceVsGoal = metrics.attendanceRate - metrics.goals.attendanceRate;

  return (
    <div className="institutional-metrics-grid">
      {/* Cartão 1: Média Geral */}
      <DashboardCard 
        title="Média Geral" 
        icon={<FiBarChart2 />}
        onClick={() => onMetricClick?.('overallAverage')}
        className="highlight-card"
      >
        <div className="metric-main-value">
          {metrics.overallAverage.toFixed(1)}%
          <ProgressBadge 
            value={averageVsGoal}
            isPercentage={true}
            threshold={1}
          />
        </div>
        
        <div className="metric-comparisons">
          <MetricComparison
            label="Meta"
            value={metrics.goals.averageScore}
            difference={averageVsGoal}
            isPercentage={true}
          />
          <MetricComparison
            label="Regional"
            value={metrics.benchmarkComparison.regional}
            difference={metrics.overallAverage - metrics.benchmarkComparison.regional}
            isPercentage={true}
          />
          <MetricComparison
            label="Nacional"
            value={metrics.benchmarkComparison.national}
            difference={metrics.overallAverage - metrics.benchmarkComparison.national}
            isPercentage={true}
          />
        </div>
      </DashboardCard>

      {/* Cartão 2: Taxa de Aprovação */}
      <DashboardCard 
        title="Taxa de Aprovação" 
        icon={<FiAward />}
        onClick={() => onMetricClick?.('passingRate')}
      >
        <div className="metric-main-value">
          {metrics.passingRate.toFixed(1)}%
          <ProgressBadge 
            value={passingVsGoal}
            isPercentage={true}
            threshold={2}
          />
        </div>
        
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
              {/* Valor mockado - na prática viria dos dados */}
              {Math.round(metrics.riskStudents * 0.3)}
            </span>
          </div>
          <div className="risk-level high">
            <span className="level-label">Alto:</span>
            <span className="level-value">
              {Math.round(metrics.riskStudents * 0.5)}
            </span>
          </div>
          <div className="risk-level medium">
            <span className="level-label">Médio:</span>
            <span className="level-value">
              {Math.round(metrics.riskStudents * 0.2)}
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
            {/* Valor mockado - na prática viria da comparação histórica */}
            <span className="positive">+2.5%</span> vs último período
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
    </div>
  );
};

export default InstitutionalMetrics;