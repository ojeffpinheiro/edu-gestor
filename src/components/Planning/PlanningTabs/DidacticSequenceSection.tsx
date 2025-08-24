import React from 'react';
import { DidacticSequence } from '../../../types/academic/Planning';

import { SectionTitle } from '../../../styles/baseComponents';
import { FormGroup } from '../../../styles/formControls';
import { TextArea } from '../../../styles/inputs';
import { Section } from '../../../styles/layoutUtils';

interface DidacticSequenceProps {
  sequence: DidacticSequence;
}

const DidacticSequenceSection: React.FC<DidacticSequenceProps> = ({ sequence }) => {
  return (
    <Section>
      <SectionTitle>Cronograma e Sequência Didática</SectionTitle>
      
      <FormGroup>
        <label>Introdução:</label>
        <TextArea value={sequence.introduction} rows={5} readOnly />
      </FormGroup>
      
      <FormGroup>
        <label>Desenvolvimento:</label>
        <TextArea value={sequence.development} rows={8} readOnly />
      </FormGroup>
      
      <FormGroup>
        <label>Aplicação/Prática:</label>
        <TextArea value={sequence.application} rows={5} readOnly />
      </FormGroup>
      
      <FormGroup>
        <label>Semana de Avaliação:</label>
        <TextArea value={sequence.evaluationWeek} rows={3} readOnly />
      </FormGroup>
    </Section>
  );
};

export default DidacticSequenceSection;