import React from 'react';
import { Activity } from '../../../utils/types/Planning';

interface ActivitiesProps {
  activities: Activity[];
}

const ActivitiesSection: React.FC<ActivitiesProps> = ({ activities }) => {
  return (
    <div className="section">
      <h2>Atividades</h2>
      
      {activities.map((activity) => (
        <div key={activity.id} className="activity-card">
          <div className="form-group">
            <label>Tipo:</label>
            <select value={activity.type}>
              <option value="practice">Prática</option>
              <option value="exercise">Exercício</option>
              <option value="list">Lista</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Descrição:</label>
            <textarea value={activity.description} />
          </div>
          
          {activity.research && (
            <div className="activity-subsection">
              <h4>Pesquisa</h4>
              <div className="form-group">
                <label>Tópicos:</label>
                <textarea value={activity.research.topics.join('\n')} />
              </div>
              <div className="form-group">
                <label>Conteúdo:</label>
                <textarea value={activity.research.content.join('\n')} />
              </div>
              <div className="form-group">
                <label>Critérios de Avaliação:</label>
                <textarea value={activity.research.evaluationCriteria.join('\n')} />
              </div>
            </div>
          )}
          
          {activity.evaluative && (
            <div className="activity-subsection">
              <h4>Avaliativas</h4>
              <div className="form-group">
                <label>Critérios:</label>
                <textarea value={activity.evaluative.criteria.join('\n')} />
              </div>
            </div>
          )}
          
          {activity.leveling && (
            <div className="form-group">
              <label>Nivelamento (retomada):</label>
              <textarea value={activity.leveling} />
            </div>
          )}
          
          {activity.answerKey && (
            <div className="form-group">
              <label>Gabarito:</label>
              <textarea value={activity.answerKey} />
            </div>
          )}
          
          <button>Remover</button>
        </div>
      ))}
      
      <button>Adicionar Atividade</button>
    </div>
  );
};

export default ActivitiesSection;