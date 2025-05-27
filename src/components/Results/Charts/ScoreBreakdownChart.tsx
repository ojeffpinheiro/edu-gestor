import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { StudentResult } from '../../../utils/types/Assessment';
import { Question } from '../../../utils/types/Question';

interface ScoreBreakdownChartProps {
  studentResult: StudentResult;
  questions?: Question[]; // Opcional para análise mais detalhada
}

const ScoreBreakdownChart: React.FC<ScoreBreakdownChartProps> = ({ 
  studentResult,
  questions 
}) => {
  // Exemplo simplificado - na prática, você cruzaria com os dados das questões
  const categories = questions 
    ? Array.from(new Set(questions.map(q => (q as any).category)))
    : ['Matemática', 'Português', 'Ciências', 'História']; // Fallback

  const data = {
    labels: categories,
    datasets: [
      {
        data: categories.map(category => {
          // Lógica para calcular pontuação por categoria
          return Math.random() * 100; // Substituir por cálculo real
        }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)'
        ]
      }
    ]
  };

  return <Doughnut data={data} />;
};

export default ScoreBreakdownChart;