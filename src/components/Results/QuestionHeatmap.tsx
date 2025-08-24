import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import { EnhancedExamResult } from '../../types/academic/Assessment';
import { Question } from '../../types/evaluation/Question';

ChartJS.register(...registerables);

interface QuestionHeatmapProps {
  questions: Question[];
  enhancedResults: EnhancedExamResult[];
}

const QuestionHeatmap: React.FC<QuestionHeatmapProps> = ({ 
  questions, 
  enhancedResults 
}) => {
  // Extrair categorias únicas
  const categories = Array.from(new Set(
    questions.flatMap((q) => q.tags ? q.tags : [])
  ));

  const difficultyLevels = ['easy', 'medium', 'hard'] as const;

  // Preparar dados para o heatmap
  const heatmapData = {
    labels: categories,
    datasets: difficultyLevels.map((level) => ({
      label: level,
      data: categories.map((tags) => {
        // Filtrar questões por categoria e dificuldade
        const relevantQuestions = questions
          .filter((q) => (q.tags?.includes(tags) ?? false) && q.difficultyLevel === level)
          .map((q) => q.id);

        // Obter respostas correspondentes
        const relevantAnswers = enhancedResults
          .flatMap((er) => 
            er.answers.filter((a) => relevantQuestions.includes(a.questionId))
          )
          .map((a) => a.score);

        // Calcular média de acertos
        return relevantAnswers.length > 0 
          ? (relevantAnswers.reduce((sum, score) => sum + score, 0) / relevantAnswers.length)
          : 0;
      }),
      backgroundColor: level === 'easy' 
        ? 'rgba(75, 192, 192, 0.6)' 
        : level === 'medium' 
          ? 'rgba(255, 206, 86, 0.6)' 
          : 'rgba(255, 99, 132, 0.6)'
    }))
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Desempenho por Categoria e Dificuldade'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categorias'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Dificuldade'
        }
      }
    }
  };

  return (
    <div className="question-heatmap">
      <Chart 
        type="bar" 
        data={heatmapData} 
        options={options} 
      />
    </div>
  );
};

export default QuestionHeatmap;