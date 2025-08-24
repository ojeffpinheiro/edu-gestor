import React from 'react';
import { Radar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { ClassPerformance } from '../../../types/academic/Assessment';

// Registra os componentes necessários do Chart.js
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SkillsRadarProps {
  classPerformances: ClassPerformance[];
  selectedClass?: string | null;
  className?: string;
}

const SkillsRadar: React.FC<SkillsRadarProps> = ({ 
  classPerformances, 
  selectedClass,
  className 
}) => {
  // Define as habilidades como array mutável
  const skills = [
    'Conhecimento', 
    'Aplicação', 
    'Raciocínio',
    'Comunicação', 
    'Criatividade', 
    'Colaboração'
  ];

  // Calcula os dados para o gráfico
  const selectedClassData = selectedClass 
    ? classPerformances.find(cp => cp.classId === selectedClass)?.skillBreakdown
    : null;

  const averageData = skills.map(skill => {
    const sum = classPerformances.reduce((total, cp) => 
      total + (cp.skillBreakdown[skill] ?? 0), 0);
    return sum / classPerformances.length;
  });

  // Prepara os dados no formato correto para o Chart.js
  const chartData: ChartData<'radar'> = {
    labels: [...skills], // Cria uma cópia mutável do array
    datasets: [
      {
        label: selectedClass ? 'Turma Selecionada' : 'Média Geral',
        data: selectedClassData 
          ? skills.map(skill => selectedClassData[skill] ?? 0)
          : averageData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2
      },
      ...(selectedClass ? [{
        label: 'Média Geral',
        data: averageData,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2
      }] : [])
    ]
  };

  // Define as opções com tipos específicos
  const chartOptions: ChartOptions<'radar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Comparação de Habilidades'
      },
      legend: {
        position: 'top' as const, // Tipo específico para position
      }
    },
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  return (
    <div className={`skills-radar ${className}`}>
      <Radar data={chartData} options={chartOptions} />
    </div>
  );
};

export default SkillsRadar;