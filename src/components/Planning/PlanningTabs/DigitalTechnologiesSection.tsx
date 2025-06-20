import React from 'react';
import { DigitalTechnologies } from '../../../utils/types/Planning';
import { Section } from '../../../styles/layoutUtils';
import { SectionTitle } from '../../../styles/baseComponents';
import { FormGroup } from '../../../styles/formControls';
import { TextArea } from '../../../styles/inputs';

interface DigitalTechnologiesProps {
  tech: DigitalTechnologies;
}

const DigitalTechnologiesSection: React.FC<DigitalTechnologiesProps> = ({ tech }) => {
  return (
    <Section>
      <SectionTitle>Tecnologias Digitais</SectionTitle>
      
      <FormGroup>
        <label>Plataformas Utilizadas:</label>
        <TextArea value={tech.platforms.join('\n')} rows={3} readOnly />
      </FormGroup>
      
      <div style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#334155', marginBottom: '1rem' }}>Atividades</h3>
        <FormGroup>
          <label>Síncronas:</label>
          <TextArea value={tech.activities.synchronous.join('\n')} rows={3} readOnly />
        </FormGroup>
        <FormGroup>
          <label>Assíncronas:</label>
          <TextArea value={tech.activities.asynchronous.join('\n')} rows={3} readOnly />
        </FormGroup>
      </div>
    </Section>
  );
};

export default DigitalTechnologiesSection;