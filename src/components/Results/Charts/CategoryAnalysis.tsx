import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Question } from '../../../utils/types/Question';
import { EnhancedExamResult, EvaluationRubric } from '../../../utils/types/Assessment';

interface CategoryAnalysisProps {
  questions: Question[];
  enhancedResults: EnhancedExamResult[];
  rubrics: EvaluationRubric[];
}

const CategoryAnalysis: React.FC<CategoryAnalysisProps> = ({ 
  questions, 
  enhancedResults,
  rubrics 
}) => {
  // Extrai categorias únicas das rubricas ou questões
  const categories = Array.from(new Set(
    rubrics.flatMap(r => r.criteria.flatMap(c => c.description)) || 
    questions.flatMap(q => q.tags ? q.tags : [])
  ));

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Desempenho Médio (%)',
        data: categories.map(category => {
          const qIds = questions.filter(q => q.tags && q.tags.includes(category)).map(q => q.id);
          const answers = enhancedResults
            .flatMap(er => er.answers.filter(a => qIds.includes(a.questionId)));
          return answers.length 
            ? (answers.reduce((sum, a) => sum + a.score, 0) / answers.length) 
            : 0;
        }),
        backgroundColor: 'rgba(153, 102, 255, 0.5)'
      }
    ]
  };

  return <Bar data={data} />;
};

export default CategoryAnalysis;