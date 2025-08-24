import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Colors
} from 'chart.js';
import { ExamSummary } from '../../../types/academic/Assessment';
import { calculateTrendLine } from '../../../utils/attendanceUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

interface ProgressTrendChartProps {
  examSummaries: ExamSummary[];
  targetScore?: number;
}

export const ProgressTrendChart: React.FC<ProgressTrendChartProps> = ({ 
  examSummaries, 
  targetScore 
}) => {
  const sortedExams = [...examSummaries].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const data = {
    labels: sortedExams.map(exam => 
      new Date(exam.date).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })
    ),
    datasets: [
      {
        label: 'Média Institucional',
        data: sortedExams.map(exam => exam.averageScore),
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Tendência Linear',
        data: calculateTrendLine(sortedExams.map(exam => exam.averageScore)),
        borderColor: 'rgba(251, 146, 60, 1)',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        tension: 0,
      }
    ]
  };

  if (targetScore) {
    data.datasets.push({
      label: `Meta (${targetScore}%)`,
      data: sortedExams.map(() => targetScore),
      borderColor: 'rgba(34, 197, 94, 1)',
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderDash: [10, 5],
      pointRadius: 0,
      tension: 0,
    });
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw.toFixed(1)}%`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Desempenho (%)'
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

  return <Line data={data} options={options} />;
};