import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ClassPerformance } from '../../utils/types/Assessment';

interface ClassPerformanceChartProps {
  classPerformances: ClassPerformance[];
  onClassSelect: (classId: string | null) => void;
}

const ClassPerformanceChart: React.FC<ClassPerformanceChartProps> = ({ 
  classPerformances,
  onClassSelect 
}) => {
  const data = {
    labels: classPerformances.map(c => c.className),
    datasets: [
      {
        label: 'Média de Pontuação',
        data: classPerformances.map(c => c.averageScore),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Taxa de Aprovação (%)',
        data: classPerformances.map(c => c.passingRate),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        onClassSelect(classPerformances[index].classId);
      }
    },
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  };

  return <Bar data={data} options={options} />;
};

export default ClassPerformanceChart;