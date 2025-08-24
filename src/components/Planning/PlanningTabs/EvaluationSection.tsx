import React from 'react';
import { Evaluation } from '../../../types/academic/Planning';
import { Section } from '../../../styles/layoutUtils';
import { SectionTitle } from '../../../styles/baseComponents';
import { FormGroup } from '../../../styles/formControls';
import { TextArea } from '../../../styles/inputs';

interface EvaluationProps {
  evaluation: Evaluation;
}

const EvaluationSection: React.FC<EvaluationProps> = ({ evaluation }) => {
  return (
    <Section>
      <SectionTitle>Avaliação</SectionTitle>
      
      <FormGroup>
        <label>Critérios:</label>
        <TextArea value={evaluation.criteria.join('\n')} rows={5} readOnly />
      </FormGroup>
      
      <FormGroup>
        <label>Instrumentos:</label>
        <TextArea value={evaluation.instruments.join('\n')} rows={5} readOnly />
      </FormGroup>
      
      {evaluation.selfEvaluation && (
        <FormGroup>
          <label>Autoavaliação/Avaliação Formativa:</label>
          <TextArea value={evaluation.selfEvaluation} rows={5} readOnly />
        </FormGroup>
      )}
    </Section>
  );
};

export default EvaluationSection;