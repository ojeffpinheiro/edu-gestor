import React from 'react';
import { Topic } from '../../../utils/types/Planning';

interface TrimesterTopicsProps {
  topics: Topic[];
}

const TrimesterTopicsSection: React.FC<TrimesterTopicsProps> = ({ topics }) => {
  return (
    <div className="section">
      <h2>Tópicos do Trimestre</h2>
      
      {topics.map((topic) => (
        <div key={topic.id} className="topic-card">
          <h3>{topic.title}</h3>
          
          <div className="topic-section">
            <h4>Competências e Habilidades (BNCC)</h4>
            <ul>
              {topic.competencies.map((comp, idx) => (
                <li key={idx}>{comp}</li>
              ))}
            </ul>
          </div>
          
          <div className="topic-section">
            <h4>Objetos de Conhecimento</h4>
            <ul>
              {topic.knowledgeObjects.map((obj, idx) => (
                <li key={idx}>{obj}</li>
              ))}
            </ul>
          </div>
          
          <div className="topic-section">
            <h4>Transversalidades</h4>
            <h5>Tópicos:</h5>
            <ul>
              {topic.transversalTopics.topics.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
            <h5>Habilidades:</h5>
            <ul>
              {topic.transversalTopics.skills.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
          
          <div className="topic-section">
            <h4>Projetos e Produtos</h4>
            <ul>
              {topic.projects.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
          
          <div className="topic-section">
            <h4>Pesquisa</h4>
            <h5>Tópicos:</h5>
            <ul>
              {topic.research.topics.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
            <h5>Critérios:</h5>
            <ul>
              {topic.research.criteria.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
            <h5>Conteúdos:</h5>
            <ul>
              {topic.research.contents.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      
      <button>Adicionar Tópico</button>
    </div>
  );
};

export default TrimesterTopicsSection;