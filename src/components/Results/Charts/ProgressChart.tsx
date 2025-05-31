import React from 'react';
import { Line } from 'react-chartjs-2';
import { ClassPerformance } from '../../../utils/types/Assessment';

interface ProgressChartProps {
  classPerformance: ClassPerformance;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ classPerformance }) => {
  // Lógica para processar os dados e criar o gráfico de progresso
  const data = {
    labels: ['Aval 1', 'Aval 2', 'Aval 3', 'Aval 4'],
    datasets: [
      {
        label: 'Média da Turma',
        data: [65, 72, 68, 75], // Substitua por dados reais
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      }
    ]
  };

  return <Line data={data} />;
};

export default ProgressChart;