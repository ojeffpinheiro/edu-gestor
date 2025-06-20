import React from 'react';
import { Topic } from '../../../utils/types/Planning';
import { Section } from '../../../styles/layoutUtils';
import { SectionTitle } from '../../../styles/baseComponents';
import { Card, CardBody, CardHeader } from '../../../styles/card';
import { Badge } from '../../../styles/indicators';

interface TrimesterTopicsProps {
  topics: Topic[];
}

const TrimesterTopicsSection: React.FC<TrimesterTopicsProps> = ({ topics }) => {
  return (
   <Section>
      <SectionTitle>Tópicos do Trimestre</SectionTitle>
      
      {topics.map((topic) => (
        <Card key={topic.id} style={{ marginBottom: '1.5rem' }}>
          <CardHeader>
            <h3 style={{ margin: 0 }}>{topic.title}</h3>
          </CardHeader>
          
          <CardBody>
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#334155' }}>
                Competências e Habilidades (BNCC)
              </h4>
              <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                {topic.competencies.map((comp, idx) => (
                  <li key={idx} style={{ marginBottom: '0.25rem' }}>{comp}</li>
                ))}
              </ul>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#334155' }}>
                Objetos de Conhecimento
              </h4>
              <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                {topic.knowledgeObjects.map((obj, idx) => (
                  <li key={idx} style={{ marginBottom: '0.25rem' }}>{obj}</li>
                ))}
              </ul>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#334155' }}>
                Transversalidades
              </h4>
              <div style={{ marginBottom: '0.5rem' }}>
                <h5 style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>Tópicos:</h5>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {topic.transversalTopics.topics.map((t, idx) => (
                    <Badge key={idx} variant="info">{t}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h5 style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>Habilidades:</h5>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {topic.transversalTopics.skills.map((s, idx) => (
                    <Badge key={idx}>{s}</Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#334155' }}>
                Projetos e Produtos
              </h4>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {topic.projects.map((p, idx) => (
                  <Badge key={idx} variant="default">{p}</Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#334155' }}>
                Pesquisa
              </h4>
              <div style={{ marginBottom: '0.5rem' }}>
                <h5 style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>Tópicos:</h5>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {topic.research.topics.map((t, idx) => (
                    <Badge key={idx} variant="success">{t}</Badge>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <h5 style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>Critérios:</h5>
                <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                  {topic.research.criteria.map((c, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{c}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>Conteúdos:</h5>
                <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                  {topic.research.contents.map((c, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </Section>
  );
};

export default TrimesterTopicsSection;