import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ClassPerformance } from '../../../utils/types/Assessment';

// Tipo seguro para as métricas disponíveis
type SafeMetricKey = 'averageScore' | 'passingRate';

// Tipo extendido para incluir métricas calculadas
type ExtendedMetricKey = SafeMetricKey | 'attendanceRate';

interface ComparisonBarChartProps {
  classes: ClassPerformance[];
  metric: ExtendedMetricKey;
}

// Função para calcular a taxa de frequência baseada nos alunos
const calculateAttendanceRate = (classData: ClassPerformance): number => {
  if (!classData.students || classData.students.length === 0) return 0;
  
  const frequentStudents = classData.students.filter(
    student => student.attendanceRate !== undefined && student.attendanceRate >= 75
  ).length;
  
  return (frequentStudents / classData.students.length) * 100;
};

// Função segura para obter métricas
const getClassMetric = (classData: ClassPerformance, metric: ExtendedMetricKey): number => {
  switch (metric) {
    case 'averageScore':
      return classData.averageScore;
    case 'passingRate':
      return classData.passingRate;
    case 'attendanceRate':
      // Usa o valor direto se existir, senão calcula
      return classData.attendanceRate ?? calculateAttendanceRate(classData);
    default:
      // TypeScript garantirá que nunca chegaremos aqui devido ao tipo ExtendedMetricKey
      return 0;
  }
};

const ComparisonBarChart: React.FC<ComparisonBarChartProps> = ({ classes, metric }) => {
  // Mapeamento de labels
  const metricLabels: Record<ExtendedMetricKey, string> = {
    averageScore: 'Média de Notas',
    passingRate: 'Taxa de Aprovação',
    attendanceRate: 'Taxa de Frequência'
  };

  const data = {
    labels: classes.map(c => c.className),
    datasets: [{
      label: metricLabels[metric],
      data: classes.map(c => getClassMetric(c, metric)),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: metric === 'averageScore' ? undefined : 100,
        title: {
          display: true,
          text: metric === 'averageScore' ? 'Pontuação' : 'Percentual (%)'
        }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default ComparisonBarChart;