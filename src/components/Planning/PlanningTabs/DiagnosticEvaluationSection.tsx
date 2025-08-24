import React from 'react';
import { DiagnosticEvaluation } from '../../../types/academic/Planning';
import { Section } from '../../../styles/layoutUtils';
import { SectionTitle } from '../../../styles/baseComponents';
import { FormGroup } from '../../../styles/formControls';
import { TextArea } from '../../../styles/inputs';

interface DiagnosticEvaluationProps {
  evaluation: DiagnosticEvaluation;
}

const DiagnosticEvaluationSection: React.FC<DiagnosticEvaluationProps> = ({ evaluation }) => {
  return (
    <Section>
      <SectionTitle>Avaliação Diagnóstica e Formativa</SectionTitle>
      
      <FormGroup>
        <label>Avaliação Inicial (mapeamento prévio):</label>
        <TextArea
          value={evaluation.initialEvaluation} 
          rows={5}
          readOnly
        />
      </FormGroup>
      
      <FormGroup>
        <label>Autoavaliações e Coavaliações Periódicas:</label>
        <TextArea 
          value={evaluation.periodicEvaluations.join('\n')} 
          rows={5}
          readOnly
        />
      </FormGroup>
    </Section>
  );
};

export default DiagnosticEvaluationSection;