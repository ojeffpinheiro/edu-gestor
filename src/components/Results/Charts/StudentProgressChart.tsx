import React from 'react';
import { Line } from 'react-chartjs-2';
import { StudentResult, EnhancedExamResult } from '../../../utils/types/Assessment';

interface StudentProgressChartProps {
  studentResult: StudentResult;
  examResults?: EnhancedExamResult[];
}

const StudentProgressChart: React.FC<StudentProgressChartProps> = ({ 
  studentResult,
  examResults = []
}) => {
  // Use examResults if provided, otherwise fall back to studentResult.examResults
  const resultsToUse = examResults.length > 0 ? examResults : studentResult.examResults;
  
  const data = {
    labels: resultsToUse.map((_, i) => `Avaliação ${i + 1}`),
    datasets: [
      {
        label: 'Pontuação',
        data: resultsToUse.map(er => 
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