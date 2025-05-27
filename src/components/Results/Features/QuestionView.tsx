import React from 'react';
import { EnhancedExamResult, EvaluationRubric } from '../../../utils/types/Assessment';

import QuestionHeatmap from '../QuestionHeatmap';
import DifficultyAnalysis from '../Charts/DifficultyAnalysis';
import CategoryAnalysis from '../Charts/CategoryAnalysis';
import { Question } from '../../../utils/types/Question';

interface QuestionViewProps {
  questions: Question[];
  enhancedResults: EnhancedExamResult[];
  rubrics: EvaluationRubric[];
}

const QuestionView: React.FC<QuestionViewProps> = ({ 
  questions, 
  enhancedResults,
  rubrics
}) => {
  return (
    <div className="question-view">
      <div className="chart-row">
        <div className="chart-container">
          <h2>Desempenho por Questão</h2>
          <QuestionHeatmap
            questions={questions} 
            enhancedResults={enhancedResults} 
          />
        </div>
      </div>

      <div className="chart-row">
        <div className="chart-container">
          <h2>Análise por Dificuldade</h2>
          <DifficultyAnalysis
            questions={questions} 
            enhancedResults={enhancedResults} 
          />
        </div>
        <div className="chart-container">
          <h2>Análise por Categoria</h2>
          <CategoryAnalysis
            questions={questions} 
            enhancedResults={enhancedResults} 
            rubrics={rubrics}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionView;