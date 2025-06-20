import React from 'react';
import { Activity } from '../../../utils/types/Planning';
import { Section } from '../../../styles/layoutUtils';
import { SectionTitle } from '../../../styles/baseComponents';
import { Card, CardBody, CardHeader } from '../../../styles/card';
import { Badge } from '../../../styles/indicators';
import { FormGroup } from '../../../styles/formControls';
import { TextArea } from '../../../styles/inputs';

interface ActivitiesProps {
  activities: Activity[];
}

const ActivitiesSection: React.FC<ActivitiesProps> = ({ activities }) => {
  return (
    <Section>
      <SectionTitle>Atividades</SectionTitle>
      
      {activities.map((activity) => (
        <Card key={activity.id} style={{ marginBottom: '1.5rem' }}>
          <CardHeader>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, textTransform: 'capitalize' }}>
                {activity.type}
              </h3>
              <Badge variant={
                activity.type === 'practice' ? 'default' : 
                activity.type === 'exercise' ? 'success' : 'success'
              }>
                {activity.type}
              </Badge>
            </div>
          </CardHeader>
          
          <CardBody>
            <FormGroup>
              <label>Descrição:</label>
              <TextArea value={activity.description} rows={3} readOnly />
            </FormGroup>
            
            {activity.research && (
              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#334155' }}>Pesquisa</h4>
                <FormGroup>
                  <label>Tópicos:</label>
                  <TextArea value={activity.research.topics.join('\n')} rows={2} readOnly />
                </FormGroup>
                <FormGroup>
                  <label>Conteúdo:</label>
                  <TextArea value={activity.research.content.join('\n')} rows={2} readOnly />
                </FormGroup>
                <FormGroup>
                  <label>Critérios de Avaliação:</label>
                  <TextArea value={activity.research.evaluationCriteria.join('\n')} rows={2} readOnly />
                </FormGroup>
              </div>
            )}
            
            {activity.evaluative && (
              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem', color: '#334155' }}>Avaliativas</h4>
                <FormGroup>
                  <label>Critérios:</label>
                  <TextArea value={activity.evaluative.criteria.join('\n')} rows={2} readOnly />
                </FormGroup>
              </div>
            )}
            
            {activity.leveling && (
              <FormGroup>
                <label>Nivelamento (retomada):</label>
                <TextArea value={activity.leveling} rows={3} readOnly />
              </FormGroup>
            )}
            
            {activity.answerKey && (
              <FormGroup>
                <label>Gabarito:</label>
                <TextArea value={activity.answerKey} rows={3} readOnly />
              </FormGroup>
            )}
          </CardBody>
        </Card>
      ))}
    </Section>
  );
};

export default ActivitiesSection;