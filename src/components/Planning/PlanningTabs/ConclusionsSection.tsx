import React from 'react';
import { Section } from '../../../styles/layoutUtils';
import { SectionTitle } from '../../../styles/baseComponents';
import { FormGroup } from '../../../styles/formControls';
import { TextArea } from '../../../styles/inputs';

interface ConclusionsProps {
  conclusions: string;
}

const ConclusionsSection: React.FC<ConclusionsProps> = ({ conclusions }) => {
  return (
    <Section>
      <SectionTitle>Conclusões e Reflexões</SectionTitle>
      <FormGroup>
        <TextArea
          value={conclusions} 
          rows={10} 
          readOnly
          style={{ lineHeight: '1.6' }}
        />
      </FormGroup>
    </Section>
  );
};

export default ConclusionsSection;