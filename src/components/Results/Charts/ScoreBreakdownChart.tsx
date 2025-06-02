import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { StudentResult } from '../../../utils/types/Assessment';
import { Question } from '../../../utils/types/Question';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors
} from 'chart.js';
import styled from 'styled-components';

// Registrando os componentes necessários
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Colors
);

interface ScoreBreakdownChartProps {
  studentResult: StudentResult;
  questions?: Question[];
}

const ChartContainer = styled.div`
  position: relative;
  height: 100%;
  min-height: 300px;
`;

const ScoreBreakdownChart: React.FC<ScoreBreakdownChartProps> = ({ 
  studentResult,
  questions 
}) => {
  // Implementação real da análise por categoria/tag
  const calculateCategoryScores = () => {
    if (!questions || !studentResult) return [];
    
    const categoryMap: Record<string, {correct: number, total: number}> = {};
    
    studentResult.examResults.forEach(exam => {
      exam.answers.forEach(answer => {
        const question = questions.find(q => q.id === answer.questionId);
        if (question) {
          // Usando tags como categorias (fallback para disciplina se não houver tags)
          const categories = question.tags?.length ? question.tags : [question.discipline];
          
          categories.forEach(category => {
            if (!categoryMap[category]) {
              categoryMap[category] = {correct: 0, total: 0};
            }
            categoryMap[category].total += 1;
            categoryMap[category].correct += answer.score;
          });
        }
      });
    });
    
    return Object.entries(categoryMap).map(([category, {correct, total}]) => ({
      category,
      percentage: total > 0 ? (correct / total) * 100 : 0
    }));
  };

  const categoryData = calculateCategoryScores();
  const labels = categoryData.length > 0 
    ? categoryData.map(item => item.category)
    : ['Matemática', 'Português', 'Ciências', 'História'];

  const percentages = categoryData.length > 0
    ? categoryData.map(item => item.percentage)
    : [30, 25, 20, 25]; // Dummy data fallback

  const data = {
    labels,
    datasets: [{
      label: 'Desempenho por Categoria (%)',
      data: percentages,
      borderWidth: 1,
      cutout: '70%',
      borderRadius: 4,
      spacing: 4
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.label}: ${context.raw.toFixed(1)}%`;
          }
        }
      },
      colors: {
        forceOverride: true
      }
    }
  };

  return (
    <ChartContainer>
      <Doughnut data={data} options={options} />
    </ChartContainer>
  );
};

export default ScoreBreakdownChart;