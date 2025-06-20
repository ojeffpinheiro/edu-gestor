import React from 'react';
import { DigitalTechnologies } from '../../../utils/types/Planning';

interface DigitalTechnologiesProps {
  tech: DigitalTechnologies;
}

const DigitalTechnologiesSection: React.FC<DigitalTechnologiesProps> = ({ tech }) => {
  return (
    <div className="section">
      <h2>Tecnologias Digitais</h2>
      
      <div className="form-group">
        <label>Plataformas Utilizadas:</label>
        <textarea value={tech.platforms.join('\n')} />
      </div>
      
      <div className="tech-subsection">
        <h3>Atividades</h3>
        <div className="form-group">
          <label>Síncronas:</label>
          <textarea value={tech.activities.synchronous.join('\n')} />
        </div>
        <div className="form-group">
          <label>Assíncronas:</label>
          <textarea value={tech.activities.asynchronous.join('\n')} />
        </div>
      </div>
    </div>
  );
};

export default DigitalTechnologiesSection;