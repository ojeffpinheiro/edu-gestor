import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ClassPerformance } from '../../utils/types/Assessment';

interface ValueAddedChartProps {
  classes: ClassPerformance[];
  onSelectClass?: (classId: string) => void;
}

export const ValueAddedChart: React.FC<ValueAddedChartProps> = ({ classes, onSelectClass }) => {
  // Calcular valor agregado (diferença entre desempenho atual e histórico)
  const data = {
    labels: classes.map(c => c.className),
    datasets: [{
      label: 'Valor Agregado',
      data: classes.map(c => {
        if (!c.examResults || c.examResults.length < 2) return 0;
        const firstScore = c.examResults[0].averageScore;
        const lastScore = c.examResults[c.examResults.length - 1].averageScore;
        return lastScore - firstScore;
      }),
      backgroundColor: classes.map(c => {
        if (!c.examResults || c.examResults.length < 2) return 'rgba(200, 200, 200, 0.5)';
        const firstScore = c.examResults[0].averageScore;
        const lastScore = c.examResults[c.examResults.length - 1].averageScore;
        return lastScore > firstScore 
          ? 'rgba(75, 192, 192, 0.5)'
          : 'rgba(255, 99, 132, 0.5)';
      }),
      borderColor: classes.map(c => {
        if (!c.examResults || c.examResults.length < 2) return 'rgba(200, 200, 200, 1)';
        const firstScore = c.examResults[0].averageScore;
        const lastScore = c.examResults[c.examResults.length - 1].averageScore;
        return lastScore > firstScore 
          ? 'rgba(75, 192, 192, 1)'
          : 'rgba(255, 99, 132, 1)';
      }),
      borderWidth: 1
    }]
  };

  const options = {
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0 && onSelectClass) {
        onSelectClass(classes[elements[0].index].classId);
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Valor Agregado (pontos)'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const classPerf = classes[context.dataIndex];
            if (!classPerf.examResults || classPerf.examResults.length < 2) {
              return 'Dados insuficientes para cálculo';
            }
            return `Valor Agregado: ${context.raw > 0 ? '+' : ''}${context.raw.toFixed(1)} pontos`;
          }
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};