import React from 'react';
import { InclusionAndAccessibility } from '../../../utils/types/Planning';

interface InclusionProps {
  inclusion: InclusionAndAccessibility;
}

const InclusionSection: React.FC<InclusionProps> = ({ inclusion }) => {
  return (
    <div className="section">
      <h2>Inclusão e Acessibilidade</h2>
      
      <div className="form-group">
        <label>Adaptações de Conteúdos:</label>
        <textarea value={inclusion.adaptations.join('\n')} />
      </div>
      
      <div className="form-group">
        <label>Estratégias para Estudantes com Necessidades Específicas:</label>
        <textarea value={inclusion.strategies.join('\n')} />
      </div>
    </div>
  );
};

export default InclusionSection;