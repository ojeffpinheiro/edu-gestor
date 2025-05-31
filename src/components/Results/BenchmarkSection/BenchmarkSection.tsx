import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';

import { ClassPerformance } from '../../../utils/types/Assessment'

import ComparisonBarChart from '../Charts/ComparisonBarChart'
import BenchmarkCard from '../BenchmarkCard';

interface BenchmarkSectionProps {
  classPerformances: ClassPerformance[];
  currentClass: ClassPerformance;
}

const BenchmarkSection: React.FC<BenchmarkSectionProps> = ({
  classPerformances,
  currentClass
}) => {
  return (
    <div className="benchmark-section">
      <BenchmarkCard
        title="Desempenho Médio"
        value={currentClass.averageScore.toFixed(1)}
        change={1.2}
        icon={<FiTrendingUp />}
      >
        <ComparisonBarChart
          classes={classPerformances}
          metric="averageScore"
        />
      </BenchmarkCard>
    </div>
  );
};

export default BenchmarkSection;