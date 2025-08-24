import React from 'react';
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';

import { ClassMetricsType, ClassPerformance } from '../../../types/academic/Assessment'

import ComparisonBarChart from '../Charts/ComparisonBarChart'
import BenchmarkCard from '../BenchmarkCard';

interface BenchmarkSectionProps {
  classes: ClassPerformance[];
  metrics: ClassMetricsType | null;
}

/**
 * Seção de benchmark que exibe o desempenho médio da turma com gráfico comparativo.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {ClassPerformance[]} props.classes - Dados de desempenho das turmas para comparação
 * @param {ClassMetricsType | null} props.metrics - Métricas da turma atual
 * @returns {JSX.Element} Seção de benchmark com cartão e gráfico comparativo
 * 
 * @example
 * <BenchmarkSection 
 *   classes={classPerformances} 
 *   metrics={currentClassMetrics} 
 * />
 */
const BenchmarkSection: React.FC<BenchmarkSectionProps> = ({ classes, metrics }) => {
  return (
    <div className="benchmark-section">
      <BenchmarkCard
        title="Desempenho Médio"
        value={metrics?.averageScore.toFixed(1) || 'N/A'}
        change={metrics?.failingStudentsChange || 0}
        icon={metrics?.failingStudentsChange && metrics.failingStudentsChange > 0 ?
          <FiTrendingUp color="green" /> :
          <FiTrendingDown color="red" />}
      >
        <ComparisonBarChart
          classes={classes}
          metric="averageScore"
        />
      </BenchmarkCard>
    </div>
  );
};

export default BenchmarkSection;