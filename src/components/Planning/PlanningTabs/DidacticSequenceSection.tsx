import React from 'react';
import { DidacticSequence } from '../../../utils/types/Planning';

interface DidacticSequenceProps {
  sequence: DidacticSequence;
}

const DidacticSequenceSection: React.FC<DidacticSequenceProps> = ({ sequence }) => {
  return (
    <div className="section">
      <h2>Cronograma e Sequência Didática</h2>
      
      <div className="form-group">
        <label>Introdução:</label>
        <textarea value={sequence.introduction} />
      </div>
      
      <div className="form-group">
        <label>Desenvolvimento:</label>
        <textarea value={sequence.development} />
      </div>
      
      <div className="form-group">
        <label>Aplicação/Prática:</label>
        <textarea value={sequence.application} />
      </div>
      
      <div className="form-group">
        <label>Semana de Avaliação:</label>
        <textarea value={sequence.evaluationWeek} />
      </div>
    </div>
  );
};

export default DidacticSequenceSection;