import React from 'react';
import 'chartjs-chart-box-and-violin-plot';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

interface ScoreDistributionProps {
  scores: number[];
  average: number;
}

const ScoreDistribution: React.FC<ScoreDistributionProps> = ({ scores, average }) => {
  // Calcula os valores para o boxplot
  const sortedScores = [...scores].sort((a, b) => a - b);
  const q1 = sortedScores[Math.floor(sortedScores.length * 0.25)];
  const median = sortedScores[Math.floor(sortedScores.length * 0.5)];
  const q3 = sortedScores[Math.floor(sortedScores.length * 0.75)];
  const iqr = q3 - q1;
  const min = Math.max(sortedScores[0], q1 - 1.5 * iqr);
  const max = Math.min(sortedScores[sortedScores.length - 1], q3 + 1.5 * iqr);
  const outliers = sortedScores.filter(score => score < min || score > max);

  const data = {
    labels: ['Distribuição de Notas'],
    datasets: [
      {
        label: 'Notas da Turma',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        outlierBackgroundColor: '#ff6384',
        padding: 20,
        itemRadius: 0,
        data: [
          {
            min,
            q1,
            median,
            q3,
            max,
            outliers
          }
        ]
      },
      {
        label: 'Média da Turma',
        type: 'line' as const,
        data: [{ x: -0.5, y: average }, { x: 0.5, y: average }],
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      },
      tooltip: {
        callbacks: {
          title: () => 'Distribuição de Notas',
          label: (context: any) => {
            if (context.datasetIndex === 0) {
              const data = context.raw;
              return [
                `Mínimo: ${data.min.toFixed(1)}`,
                `Q1: ${data.q1.toFixed(1)}`,
                `Mediana: ${data.median.toFixed(1)}`,
                `Q3: ${data.q3.toFixed(1)}`,
                `Máximo: ${data.max.toFixed(1)}`,
                `Outliers: ${data.outliers.length}`
              ];
            }
            return `Média: ${average.toFixed(1)}`;
          }
        }
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)'
        },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="distribution-chart">
      
    </div>
  );
};

export default ScoreDistribution;