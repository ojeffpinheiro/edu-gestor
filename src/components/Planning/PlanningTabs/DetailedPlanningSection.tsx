import React from 'react';
import { DetailedPlanning } from '../../../utils/types/Planning';

interface DetailedPlanningProps {
  planning: DetailedPlanning[];
}

const DetailedPlanningSection: React.FC<DetailedPlanningProps> = ({ planning }) => {
  return (
    <div className="section">
      <h2>Planejamento Detalhado</h2>
      
      {planning.map((item) => (
        <div key={item.id} className="planning-card">
          <div className="form-group">
            <label>Tópico:</label>
            <input type="text" value={item.topic} />
          </div>
          
          <div className="form-group">
            <label>Eixo Temático:</label>
            <input type="text" value={item.thematicAxis} />
          </div>
          
          <div className="form-group">
            <label>Etapa:</label>
            <select value={item.stage}>
              <option value="initial">Inicial</option>
              <option value="intermediate">Intermediária</option>
              <option value="final">Final</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Habilidades:</label>
            <textarea value={item.skills.join('\n')} />
          </div>
          
          <div className="form-group">
            <label>Objetivos:</label>
            <textarea value={item.objectives.join('\n')} />
          </div>
          
          <div className="form-group">
            <label>Conteúdo:</label>
            <textarea value={item.content} />
          </div>
          
          <div className="form-group">
            <label>Justificativa:</label>
            <textarea value={item.justification} />
          </div>
          
          <div className="form-group">
            <label>Metodologia:</label>
            <input type="text" value={item.methodology} />
          </div>
          
          <div className="form-group">
            <label>Recursos:</label>
            <textarea value={item.resources.join('\n')} />
          </div>
          
          <div className="form-group">
            <label>Duração:</label>
            <input type="text" value={item.duration} />
          </div>
          
          <button>Remover</button>
        </div>
      ))}
      
      <button>Adicionar Planejamento</button>
    </div>
  );
};

export default DetailedPlanningSection;