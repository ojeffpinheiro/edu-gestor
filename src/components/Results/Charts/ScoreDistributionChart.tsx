import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { ExamSummary } from '../../../utils/types/Assessment';

ChartJS.register(...registerables);

interface ScoreDistributionChartProps {
  examSummaries: ExamSummary[];
}

const ScoreDistributionChart: React.FC<ScoreDistributionChartProps> = ({ examSummaries }) => {
  const data = {
    labels: examSummaries.map(exam => exam.title),
    datasets: [
      {
        type: 'bar' as const,
        label: 'Distribuição de Notas',
        data: examSummaries.map(exam => exam.averageScore),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        type: 'line' as const,
        label: 'Curva Normal',
        data: examSummaries.map(exam => exam.averageScore),
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        tension: 0.1
      }
    ]
  };

  return <Chart type="bar" data={data} />;
};

export default ScoreDistributionChart;