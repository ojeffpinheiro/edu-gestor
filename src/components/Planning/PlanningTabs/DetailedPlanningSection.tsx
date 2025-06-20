import React from 'react';
import { DetailedPlanning } from '../../../utils/types/Planning';
import { Section } from '../../../styles/layoutUtils';
import { SectionTitle } from '../../../styles/baseComponents';
import { FormGroup } from '../../../styles/formControls';
import { Input, Select, TextArea } from '../../../styles/inputs';

interface DetailedPlanningProps {
  planning: DetailedPlanning[];
}

const DetailedPlanningSection: React.FC<DetailedPlanningProps> = ({ planning }) => {
  return (
    <Section>
      <SectionTitle>Planejamento Detalhado</SectionTitle>
      
      {planning.map((item) => (
        <div key={item.id} style={{ 
          marginBottom: '1.5rem',
          padding: '1.5rem',
          border: '1px solid #e2e8f0',
          borderRadius: '0.5rem'
        }}>
          <FormGroup>
            <label>Tópico:</label>
            <Input type="text" value={item.topic} readOnly />
          </FormGroup>
          
          <FormGroup>
            <label>Eixo Temático:</label>
            <Input type="text" value={item.thematicAxis} readOnly />
          </FormGroup>
          
          <FormGroup>
            <label>Etapa:</label>
            <Select value={item.stage}>
              <option value="initial">Inicial</option>
              <option value="intermediate">Intermediária</option>
              <option value="final">Final</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <label>Habilidades:</label>
            <TextArea value={item.skills.join('\n')} rows={3} readOnly />
          </FormGroup>
          
          <FormGroup>
            <label>Objetivos:</label>
            <TextArea value={item.objectives.join('\n')} rows={3} readOnly />
          </FormGroup>
          
          <FormGroup>
            <label>Conteúdo:</label>
            <TextArea value={item.content} rows={5} readOnly />
          </FormGroup>
          
          <FormGroup>
            <label>Justificativa:</label>
            <TextArea value={item.justification} rows={5} readOnly />
          </FormGroup>
          
          <FormGroup>
            <label>Metodologia:</label>
            <Input type="text" value={item.methodology} readOnly />
          </FormGroup>
          
          <FormGroup>
            <label>Recursos:</label>
            <TextArea value={item.resources.join('\n')} rows={3} readOnly />
          </FormGroup>
          
          <FormGroup>
            <label>Duração:</label>
            <Input type="text" value={item.duration} readOnly />
          </FormGroup>
        </div>
      ))}
    </Section>
  );
};

export default DetailedPlanningSection;