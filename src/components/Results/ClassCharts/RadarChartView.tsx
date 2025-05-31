import React from 'react';
import { ClassPerformance, EvaluationRubric } from '../../../utils/types/Assessment';
import { RadarChart } from 'recharts';

interface RadarChartViewProps {
  currentClass: ClassPerformance;
  rubrics?: EvaluationRubric[];
}

const RadarChartView: React.FC<RadarChartViewProps> = ({ currentClass, rubrics }) => {
  // Transformar os dados para o formato esperado pelo RadarChart
  const radarData = rubrics?.map(rubric => ({
    skill: rubric.title,
    value: currentClass.skillBreakdown[rubric.id] || 0,
    maxValue: 100 // Ou o valor máximo possível
  })) || [];

  return (
    <div className="radar-chart-container">
      <RadarChart
        data={radarData}
        width={500}
        height={400}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
      />
    </div>
  );
};

export default RadarChartView;