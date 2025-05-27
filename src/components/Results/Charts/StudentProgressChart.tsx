import React from 'react';
import { Line } from 'react-chartjs-2';
import { StudentResult } from '../../../utils/types/Assessment';

interface StudentProgressChartProps {
  studentResult: StudentResult;
}

const StudentProgressChart: React.FC<StudentProgressChartProps> = ({ 
  studentResult 
}) => {
  const data = {
    labels: studentResult.examResults.map((_, i) => `Avaliação ${i + 1}`),
    datasets: [
      {
        label: 'Pontuação',
        data: studentResult.examResults.map(er => 
          (er.totalScore / er.answers.length) * 100 // Normaliza para porcentagem
        ),
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
        fill: false
      }
    ]
  };

  const options = {
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  };

  return <Line data={data} options={options} />;
};

export default StudentProgressChart;