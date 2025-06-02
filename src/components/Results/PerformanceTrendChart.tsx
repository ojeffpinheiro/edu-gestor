import React from 'react';
import DashboardCard from './DashboardCard';
import { ProgressTrendChart } from './Charts/ProgressTrendChart';
import { ExamSummary } from '../../utils/types/Assessment';

interface PerformanceTrendSectionProps {
  examSummaries: ExamSummary[];
  targetScore?: number;
}

const PerformanceTrendSection: React.FC<PerformanceTrendSectionProps> = ({ 
    examSummaries, targetScore 
}) => (
  <DashboardCard 
    title="Progresso ao Longo do Tempo" 
    fullWidth
>
    <ProgressTrendChart
      examSummaries={examSummaries}
      targetScore={targetScore}
    />
  </DashboardCard>
);

export default PerformanceTrendSection;