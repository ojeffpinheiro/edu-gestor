import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { ExamSummary } from '../../types/academic/Assessment';

const TimeTrendsContainer = styled.div`
  background: var(--color-card);
  padding: var(--space-lg);
  border-radius: var(--border-radius-md);
`;

interface TimeTrendsPanelProps {
  examSummaries: ExamSummary[];
  timeRange: 'week' | 'month' | 'quarter' | 'year';
}

export const TimeTrendsPanel: React.FC<TimeTrendsPanelProps> = ({
  examSummaries,
  timeRange = 'month'
}) => {
  // Agrupar dados por período de tempo
  const groupedData = examSummaries.reduce((acc, exam) => {
    const date = new Date(exam.date);
    let periodKey;
    
    if (timeRange === 'week') {
      periodKey = `Semana ${Math.ceil(date.getDate() / 7)}`;
    } else if (timeRange === 'month') {
      periodKey = date.toLocaleString('default', { month: 'long' });
    } else if (timeRange === 'quarter') {
      const quarter = Math.floor(date.getMonth() / 3) + 1;
      periodKey = `T${quarter} ${date.getFullYear()}`;
    } else {
      periodKey = date.getFullYear().toString();
    }

    if (!acc[periodKey]) {
      acc[periodKey] = {
        totalScore: 0,
        count: 0
      };
    }

    acc[periodKey].totalScore += exam.averageScore;
    acc[periodKey].count += 1;
    
    return acc;
  }, {} as Record<string, { totalScore: number; count: number }>);

  const periods = Object.keys(groupedData);
  const averageScores = periods.map(period => 
    groupedData[period].totalScore / groupedData[period].count
  );

  const data = {
    labels: periods,
    datasets: [
      {
        label: 'Média de Desempenho',
        data: averageScores,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Tendência Temporal (por ${timeRange === 'week' ? 'semana' : timeRange === 'month' ? 'mês' : timeRange === 'quarter' ? 'trimestre' : 'ano'})`
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: Math.max(0, Math.min(...averageScores) - 10),
        max: Math.min(100, Math.max(...averageScores) + 10)
      }
    }
  };

  return (
    <TimeTrendsContainer>
      <Line data={data} options={options} />
    </TimeTrendsContainer>
  );
};