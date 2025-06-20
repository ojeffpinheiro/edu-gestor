import React from 'react';
import { Section } from '../../../styles/layoutUtils';
import { SectionTitle } from '../../../styles/baseComponents';
import { FormGroup } from '../../../styles/formControls';
import { TextArea } from '../../../styles/inputs';

interface ReferencesProps {
  references: string[];
}

const ReferencesSection: React.FC<ReferencesProps> = ({ references }) => {
  return (
    <Section>
      <SectionTitle>Referências Bibliográficas</SectionTitle>
      <FormGroup>
        <TextArea 
          value={references.join('\n')} 
          rows={10} 
          readOnly
          style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
        />
      </FormGroup>
    </Section>
  );
};

export default ReferencesSection;