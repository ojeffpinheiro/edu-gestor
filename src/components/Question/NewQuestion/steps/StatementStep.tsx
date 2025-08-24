import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FaEdit, FaPlus } from "react-icons/fa";

import {
  FormGroup
} from '../../../../styles/formControls';
import { QuestionFormData } from '../../../../types/evaluation/Question';
import { FormErrorContainer, FormLabel, FormSection, FormSectionTitle, FormTextArea } from '../../QuestionForm.styles';

interface StatementStepProps {
  data: QuestionFormData;
  updateData: (field: keyof QuestionFormData, value: any) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const StatementStep: React.FC<StatementStepProps> = ({ data, updateData, onNext, onPrev }) => {
  const { register, formState: { errors } } = useFormContext();
  const MAX_STATEMENT_LENGTH = 1000;
  const MAX_EXPLANATION_LENGTH = 500;

  return (
    <FormSection>
      <FormSectionTitle>
        <FaEdit style={{ marginRight: '8px' }} />
        Enunciado da Questão
      </FormSectionTitle>

      <FormGroup>
        <FormLabel htmlFor="statement">Enunciado*</FormLabel>
        <FormTextArea
          id="statement"
          {...register('statement', {
            required: 'O enunciado é obrigatório',
            maxLength: {
              value: MAX_STATEMENT_LENGTH,
              message: `Máximo de ${MAX_STATEMENT_LENGTH} caracteres`
            }
          })}
          rows={7}
          placeholder="Digite o enunciado da questão aqui..."
          aria-invalid={errors.statement ? "true" : "false"}
        />
        {errors.statement && (
          <FormErrorContainer>
            {errors.statement.message?.toString()}
          </FormErrorContainer>
        )}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="explanation">
          <FaPlus style={{ marginRight: '8px' }} />
          Feedback / Explicação
        </FormLabel>
        <FormTextArea
          id="explanation"
          {...register('explanation', {
            maxLength: {
              value: MAX_EXPLANATION_LENGTH,
              message: `Máximo de ${MAX_EXPLANATION_LENGTH} caracteres`
            }
          })}
          rows={4}
          placeholder="Explicação que será mostrada após o aluno responder a questão"
        />
        {errors.explanation && (
          <FormErrorContainer>
            {errors.explanation.message?.toString()}
          </FormErrorContainer>
        )}
      </FormGroup>
    </FormSection>
  );
};