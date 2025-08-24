import React, { memo } from 'react';
import { Line } from 'react-chartjs-2';
import { StudentResult, EnhancedExamResult } from '../../../types/academic/Assessment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import styled from 'styled-components';

// Registrando os componentes necessários
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface StudentProgressChartProps {
  studentResult: StudentResult;
  examResults?: EnhancedExamResult[];
}

const ChartContainer = styled.div`
  position: relative;
  height: 100%;
  min-height: 300px;
`;

const StudentProgressChart: React.FC<StudentProgressChartProps> = ({ 
  studentResult,
  examResults = []
}) => {
  const resultsToUse = examResults.length > 0 ? examResults : studentResult.examResults;
  
  const data = {
    labels: resultsToUse.map((_, i) => `Avaliação ${i + 1}`),
    datasets: [
      {
        label: 'Desempenho (%)',
        data: resultsToUse.map(er => 
          (er.totalScore / er.answers.length) * 100
        ),
        borderColor: 'rgba(101, 116, 205, 1)',
        backgroundColor: 'rgba(101, 116, 205, 0.1)',
        tension: 0.3,
        fill: true,
        pointBackgroundColor: 'rgba(101, 116, 205, 1)',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointHoverBorderWidth: 2,
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.raw.toFixed(1)}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: any) => `${value}%`
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <ChartContainer>
      <Line data={data} options={options} />
    </ChartContainer>
  );
};

export default memo(StudentProgressChart);