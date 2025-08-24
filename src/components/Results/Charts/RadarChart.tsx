import React from 'react';
import { ClassPerformance, EvaluationRubric } from '../../../types/academic/Assessment';
import { Radar } from 'react-chartjs-2';

interface RadarChartProps {
  classPerformance: ClassPerformance;
  rubrics?: EvaluationRubric[];
}

const RadarChart: React.FC<RadarChartProps> = ({ classPerformance, rubrics }) => {
  // Se houver rubricas, usamos os critérios delas
  const labels = rubrics?.length 
    ? rubrics.flatMap(r => r.criteria.map(c => c.description))
    : ['Conhecimento', 'Aplicação', 'Raciocínio', 'Comunicação']; // Padrão

  const data = {
    labels,
    datasets: [
      {
        label: classPerformance.className,
        data: labels.map(() => Math.random() * 100), // Substituir por dados reais
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
      },
      {
        label: 'Média Geral',
        data: labels.map(() => 50), // Substituir por dados reais
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="radar-chart">
      <Radar data={data} />
    </div>
  );
};

export default RadarChart;