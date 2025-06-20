import React from 'react';
import { InclusionAndAccessibility } from '../../../utils/types/Planning';
import { Section } from '../../../styles/layoutUtils';
import { SectionTitle } from '../../../styles/baseComponents';
import { FormGroup } from '../../../styles/formControls';
import { TextArea } from '../../../styles/inputs';

interface InclusionProps {
  inclusion: InclusionAndAccessibility;
}

const InclusionSection: React.FC<InclusionProps> = ({ inclusion }) => {
  return (
    <Section>
      <SectionTitle>Inclusão e Acessibilidade</SectionTitle>
      
      <FormGroup>
        <label>Adaptações de Conteúdos:</label>
        <TextArea value={inclusion.adaptations.join('\n')} rows={5} readOnly />
      </FormGroup>
      
      <FormGroup>
        <label>Estratégias para Estudantes com Necessidades Específicas:</label>
        <TextArea value={inclusion.strategies.join('\n')} rows={5} readOnly />
      </FormGroup>
    </Section>
  );
};

export default InclusionSection;