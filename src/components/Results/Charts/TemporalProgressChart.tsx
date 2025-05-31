import React from 'react';
import { ExamSummary } from '../../../utils/types/Assessment';
import { Line } from 'react-chartjs-2';

interface TemporalProgressChartProps {
  examSummaries: ExamSummary[];
}

const TemporalProgressChart: React.FC<TemporalProgressChartProps> = ({ examSummaries }) => {
  if (!examSummaries || examSummaries.length === 0) {
    return <div className="aviso">Nenhum dado de exame disponível</div>;
  }

  // Ordenar exames por data
  const sortedExams = [...examSummaries].sort((a, b) =>
    new Date(a.examId).getTime() - new Date(b.examId).getTime()
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
    ]
  };

  return (
    <div className="temporal-progress-chart">
      <Line data={data} />
    </div>
  );
};

export default TemporalProgressChart;