import React from 'react';
import { Evaluation } from '../../../utils/types/Planning';

interface EvaluationProps {
  evaluation: Evaluation;
}

const EvaluationSection: React.FC<EvaluationProps> = ({ evaluation }) => {
  return (
    <div className="section">
      <h2>Avaliação</h2>
      
      <div className="form-group">
        <label>Critérios:</label>
        <textarea value={evaluation.criteria.join('\n')} />
      </div>
      
      <div className="form-group">
        <label>Instrumentos:</label>
        <textarea value={evaluation.instruments.join('\n')} />
      </div>
      
      {evaluation.selfEvaluation && (
        <div className="form-group">
          <label>Autoavaliação/Avaliação Formativa:</label>
          <textarea value={evaluation.selfEvaluation} />
        </div>
      )}
    </div>
  );
};

export default EvaluationSection;