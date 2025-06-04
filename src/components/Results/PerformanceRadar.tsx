import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface PerformanceRadarProps {
  skills: Record<string, number> | undefined;
  averageSkills: number[] | undefined;
  skillNames?: string[];
}

const PerformanceRadar: React.FC<PerformanceRadarProps> = ({ 
  skills, 
  averageSkills,
  skillNames = skills ? Object.keys(skills) : []
}) => {
  // Verificação mais robusta dos dados
  if (!skills || !averageSkills || averageSkills.length === 0 || skillNames.length === 0) {
    return <div>Dados não disponíveis</div>;
  }

  // Garantir que temos dados para todas as habilidades
  const validSkills = skillNames.filter(skill => skills[skill] !== undefined);
  if (validSkills.length === 0) return <div>Dados de habilidades não disponíveis</div>;

  const data = {
    labels: validSkills,
    datasets: [
      {
        label: 'Turma',
        data: validSkills.map(skill => skills[skill]),
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(102, 126, 234, 1)'
      },
      {
        label: 'Média Escolar',
        data: validSkills.map((_, index) => averageSkills[index] || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)'
      }
    ]
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)'
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12
          }
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      }
    }
  };

  return (
    <div className="radar-chart-container">
      <Radar data={data} options={options} />
    </div>
  );
};

export default PerformanceRadar;