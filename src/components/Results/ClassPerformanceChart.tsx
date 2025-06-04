import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  ChartEvent, 
  ActiveElement,
  TooltipItem
} from 'chart.js';
import { ClassPerformance } from '../../utils/types/Assessment';

interface ClassPerformanceChartProps {
  classPerformances: ClassPerformance[];
  onClassSelect: (classId: string | null) => void;
  goals?: {
    averageScore: number;
    passingRate: number;
  };
}

const ClassPerformanceChart: React.FC<ClassPerformanceChartProps> = ({ 
  classPerformances,
  onClassSelect,
  goals = { averageScore: 70, passingRate: 80 }
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
    onClick: (event: ChartEvent, elements: ActiveElement[]) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        onClassSelect(classPerformances[index].classId);
      }
    },
    scales: {
      y: { beginAtZero: true, max: 100 }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: ([context]: TooltipItem<'bar'>[]) => `Turma: ${context.label}`,
          label: (context: TooltipItem<'bar'>) => {
            const label = context.dataset.label || '';
            let value = context.raw as number;
            let suffix = context.datasetIndex === 1 ? '%' : ' pts';
            
            if (context.datasetIndex === 0) {
              const diff = value - goals.averageScore;
              suffix += ` (${diff > 0 ? '+' : ''}${diff.toFixed(1)} vs meta)`;
            }
            
            return `${label}: ${value}${suffix}`;
          },
          afterLabel: (context: TooltipItem<'bar'>) => {
            if (context.datasetIndex === 1) {
              return `Meta: ${goals.passingRate}%`;
            }
            return '';
          }
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default ClassPerformanceChart;