import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Question } from '../../../utils/types/Question';
import { EnhancedExamResult } from '../../../utils/types/Assessment';

interface DifficultyAnalysisProps {
  questions: Question[];
  enhancedResults: EnhancedExamResult[];
}

const DifficultyAnalysis: React.FC<DifficultyAnalysisProps> = ({ 
  questions, 
  enhancedResults 
}) => {
  const difficultyLevels = ['easy', 'medium', 'hard'];
  
  const data = {
    labels: difficultyLevels,
    datasets: [
      {
        label: 'Taxa de Acerto (%)',
        data: difficultyLevels.map(level => {
          const qIds = questions.filter(q => q.difficultyLevel === level).map(q => q.id);
          const answers = enhancedResults
            .flatMap(er => er.answers.filter(a => qIds.includes(a.questionId)));
          return answers.length 
            ? (answers.reduce((sum, a) => sum + (a.score / 100), 0) / answers.length) * 100 
            : 0;
        }),
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(255, 99, 132, 0.5)'
        ]
      }
    ]
  };

  return <Bar data={data} />;
};

export default DifficultyAnalysis;