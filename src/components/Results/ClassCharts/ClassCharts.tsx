import React, { useState } from 'react';
import { ClassPerformance, EvaluationRubric } from '../../../utils/types/Assessment';
import DashboardCard from '../DashboardCard';
import { ChartTabs, TabButton } from '../Features/styles/ClassViewStyles';

import RadarChartView from './RadarChartView';
import DistributionView from './DistributionView';
import ProgressView from './ProgressView';

interface ClassChartsProps {
  currentClass: ClassPerformance;
  rubrics?: EvaluationRubric[];
}


interface ClassChartsProps {
  currentClass: ClassPerformance;
  rubrics?: EvaluationRubric[];
}

const ClassCharts: React.FC<ClassChartsProps> = ({ currentClass, rubrics }) => {
  const [activeChartTab, setActiveChartTab] = useState<'radar' | 'distribution' | 'progress'>('radar');

  return (
    <DashboardCard
      title="Análise de Desempenho"
      description="Selecione o tipo de visualização"
    >
      <ChartTabs>
        <TabButton
          $active={activeChartTab === 'radar'}
          onClick={() => setActiveChartTab('radar')}
        >
          Desempenho por Habilidade
        </TabButton>
        <TabButton
          $active={activeChartTab === 'distribution'}
          onClick={() => setActiveChartTab('distribution')}
        >
          Distribuição de Notas
        </TabButton>
        <TabButton
          $active={activeChartTab === 'progress'}
          onClick={() => setActiveChartTab('progress')}
        >
          Progresso Temporal
        </TabButton>
      </ChartTabs>

      <div className="chart-container">
        {activeChartTab === 'radar' && (
          <RadarChartView
            currentClass={currentClass}
            rubrics={rubrics}
          />
        )}
        {activeChartTab === 'distribution' && (
          <DistributionView
            examSummaries={currentClass.examResults}
          />
        )}
        {activeChartTab === 'progress' && (
          <ProgressView
            currentClass={currentClass}
          />
        )}
      </div>
    </DashboardCard>
  );
};

export default ClassCharts;