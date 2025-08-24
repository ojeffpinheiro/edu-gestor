import React from 'react';
import { ExamSummary } from '../../../types/academic/Assessment';
import { Line } from 'react-chartjs-2';

interface TemporalProgressChartProps {
  examSummaries: ExamSummary[];
}

const TemporalProgressChart: React.FC<TemporalProgressChartProps> = ({ examSummaries }) => {
  if (!examSummaries || !Array.isArray(examSummaries)) {
    return <div className="aviso">Dados inválidos</div>;
  }

  // Ordenar exames por data
  const sortedExams = [...examSummaries].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const data = {
    labels: sortedExams.map(exam => exam.title),
    datasets: [
      {
        label: 'Média da Turma',
        data: sortedExams.map(exam => exam.averageScore),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1
      },
      {
        label: 'Maior Nota',
        data: sortedExams.map(exam => exam.highestScore),
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 1)',
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1
      },
      {
        label: 'Menor Nota',
        data: sortedExams.map(exam => exam.lowestScore),
        fill: false,
        backgroundColor: 'rgba(255, 159, 64, 1)',
        borderColor: 'rgba(255, 159, 64, 1)',
        tension: 0.1
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  };

  return (
    <div className="temporal-progress-chart">
      <Line data={data} />
    </div>
  );
};

export default TemporalProgressChart;