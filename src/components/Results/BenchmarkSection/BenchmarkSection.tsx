import React from 'react';
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';

import { ClassMetricsType, ClassPerformance } from '../../../utils/types/Assessment'

import ComparisonBarChart from '../Charts/ComparisonBarChart'
import BenchmarkCard from '../BenchmarkCard';

interface BenchmarkSectionProps {
  classes: ClassPerformance[];
  metrics: ClassMetricsType | null;
}

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