import React from 'react';
import { DiagnosticEvaluation } from '../../../utils/types/Planning';

interface DiagnosticEvaluationProps {
  evaluation: DiagnosticEvaluation;
}

const DiagnosticEvaluationSection: React.FC<DiagnosticEvaluationProps> = ({ evaluation }) => {
  return (
    <div className="section">
      <h2>Avaliação Diagnóstica e Formativa</h2>
      
      <div className="form-group">
        <label>Avaliação Inicial (mapeamento prévio):</label>
        <textarea value={evaluation.initialEvaluation} />
      </div>
      
      <div className="form-group">
        <label>Autoavaliações e Coavaliações Periódicas:</label>
        <textarea value={evaluation.periodicEvaluations.join('\n')} />
      </div>
    </div>
  );
};

export default DiagnosticEvaluationSection;