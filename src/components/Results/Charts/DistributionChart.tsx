import React from 'react';
import { Chart } from 'react-chartjs-2';
import { EnhancedExamResult } from '../../../utils/types/Assessment';
import { calculateDistribution } from '../../../utils/statsUtils';

interface DistributionChartProps {
  examResults: EnhancedExamResult[];
  className?: string;
}

const DistributionChart: React.FC<DistributionChartProps> = ({ examResults, className }) => {
  const { bins, frequencies, normalCurve } = calculateDistribution(examResults);

  const data = {
    labels: bins,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Distribuição de Notas',
        data: frequencies,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        type: 'line' as const,
        label: 'Curva Normal',
        data: normalCurve,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        pointRadius: 0,
        fill: false
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Distribuição de Notas'
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ${value}% dos alunos`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Intervalo de Notas'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Percentual de Alunos (%)'
        },
        max: Math.max(...frequencies) * 1.2
      }
    }
  };

  return (
    <div className={`distribution-chart ${className}`}>
      <Chart type='bar' data={data} options={options} />
    </div>
  );
};

export default DistributionChart;