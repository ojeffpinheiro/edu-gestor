import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ComparativeBarChartProps {
  comparisonData?: {
    subject: string;
    classScore: number;
    schoolScore: number;
  }[];
  loading?: boolean;
}

const ComparativeBarChart: React.FC<ComparativeBarChartProps> = ({ 
  comparisonData,
  loading = false
}) => {
  // Dados padrão quando comparisonData é undefined
  const defaultData = {
    labels: ['Dados não disponíveis'],
    datasets: [
      {
        label: 'Turma',
        data: [0],
        backgroundColor: 'rgba(200, 200, 200, 0.5)'
      },
      {
        label: 'Média Escolar',
        data: [0],
        backgroundColor: 'rgba(200, 200, 200, 0.5)'
      }
    ]
  };

  // Processa os dados ou retorna os padrões
  const processedData = comparisonData ? {
    labels: comparisonData.map(item => item.subject),
    datasets: [
      {
        label: 'Turma',
        data: comparisonData.map(item => item.classScore),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Média Escolar',
        data: comparisonData.map(item => item.schoolScore),
        backgroundColor: 'rgba(255, 99, 132, 0.7)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  } : defaultData;

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
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ${value.toFixed(1)}%`;
          }
        }
      },
      ...(loading && {
        title: {
          display: true,
          text: 'Carregando dados...',
          color: 'rgba(255, 255, 255, 0.8)'
        }
      })
    },
    scales: {
      y: {
        beginAtZero: true,
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

  if (loading) {
    return <div className="comparison-chart loading">Carregando comparação...</div>;
  }

  return (
    <div className="comparison-chart">
      <Bar data={processedData} options={options} />
    </div>
  );
};

export default ComparativeBarChart;