import React from 'react';
import { Line } from 'react-chartjs-2';
import { EnhancedExamResult } from '../../../utils/types/Assessment';
import { groupByTimePeriod } from '../../../utils/statsUtils';

interface TemporalProgressProps {
  examResults: EnhancedExamResult[];
  className?: string;
}

const TemporalProgress: React.FC<TemporalProgressProps> = ({ examResults, className }) => {
  const { labels, averages, medians } = groupByTimePeriod(examResults);

  const data = {
    labels,
    datasets: [
      {
        label: 'Média da Turma',
        data: averages,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Mediana',
        data: medians,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderDash: [5, 5],
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Evolução do Desempenho'
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.raw.toFixed(1);
            return `${label}: ${value}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Nota Média (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Período'
        }
      }
    }
  };

  return (
    <div className={`temporal-progress ${className}`}>
      <Line data={data} options={options} />
    </div>
  );
};

export default TemporalProgress;