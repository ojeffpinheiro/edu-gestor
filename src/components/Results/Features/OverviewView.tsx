import React from 'react';
import { ClassPerformance, ExamSummary } from '../../../utils/types/Assessment';
import ScoreDistributionChart from '../Charts/ScoreDistributionChart';
import TemporalProgressChart from '../Charts/TemporalProgressChart';
import ClassPerformanceChart from '../ClassPerformanceChart';

interface OverviewViewProps {
  examSummaries: ExamSummary[];
  classPerformances: ClassPerformance[];
  onClassSelect: (classId: string | null) => void;
}

const OverviewView: React.FC<OverviewViewProps> = ({ 
  examSummaries, 
  classPerformances,
  onClassSelect 
}) => {
  return (
    <div className="overview-view">
      <div className="chart-row">
        <div className="chart-container">
          <h2>Distribuição de Notas</h2>
          <ScoreDistributionChart examSummaries={examSummaries} />
        </div>
        <div className="chart-container">
          <h2>Progresso Temporal</h2>
          <TemporalProgressChart examSummaries={examSummaries} />
        </div>
      </div>

      <div className="chart-row">
        <div className="chart-container">
          <h2>Desempenho por Turma</h2>
          <ClassPerformanceChart
            classPerformances={classPerformances}
            onClassSelect={onClassSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewView;