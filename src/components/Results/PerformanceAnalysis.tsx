import React from 'react';
import { ClassPerformance } from '../../types/academic/Assessment';
import TimeRangeSelector from './TimeRangeSelector';
import PerformanceRadar from './PerformanceRadar';
import ComparativeBarChart from './ComparativeBarChart';

interface PerformanceAnalysisProps {
  classData: ClassPerformance;
  ranking: {
    position: number;
    total: number;
    percentile: number;
  };
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

const PerformanceAnalysis: React.FC<PerformanceAnalysisProps> = ({
  classData,
  ranking,
  timeRange,
  onTimeRangeChange
}) => {
  return (
    <div className="performance-analysis">
      <div className="analysis-header">
        <h3>Análise de Desempenho</h3>
        <TimeRangeSelector
          value={timeRange}
          onChange={onTimeRangeChange}
        />
      </div>

      <div className="metrics-row">
        <div className="metric-card">
          <h4>Posição no Ranking</h4>
          <p>{ranking.position}º lugar (Percentil {ranking.percentile}%)</p>
        </div>
        <div className="metric-card">
          <h4>Comparativo Escolar</h4>
          <p>
            {classData.averageScore.toFixed(1)} vs{' '}
            {classData.schoolAverage?.toFixed(1) ?? 'N/A'}
          </p>
        </div>
      </div>

      <div className="charts-grid">
        <PerformanceRadar
          skills={classData.skillBreakdown}
          averageSkills={classData.schoolSkillAverages || []}
          skillNames={Object.keys(classData.skillBreakdown || {})}
        />

        <ComparativeBarChart
          comparisonData={classData.subjects?.map(subject => ({
            subject: subject.name,
            classScore: subject.averageScore,
            schoolScore: subject.schoolAverage ?? 0
          }))}
        />
      </div>
    </div>
  );
};

export default PerformanceAnalysis;