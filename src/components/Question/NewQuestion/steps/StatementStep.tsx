import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FaEdit, FaPlus } from "react-icons/fa";

import {
  FormGroup,
  Label,
  TextArea,
  FormError
} from '../../../../styles/formControls';
import { FormCard } from '../../../../styles/containers';
import { QuestionFormData } from '../../../../utils/types/Question';

interface StatementStepProps {
  data: QuestionFormData;
  updateData: (field: keyof QuestionFormData, value: any) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const StatementStep: React.FC<StatementStepProps> = ({ data, updateData, onNext, onPrev }) => {
  const { register, formState: { errors } } = useFormContext();
  const MAX_STATEMENT_LENGTH = 1000;

  return (
    <div className="step-content">
      <FormCard>
        <h2 className="section-title">
          <FaEdit style={{ marginRight: '8px' }} />
          Enunciado da Questão
        </h2>

        <FormGroup>
          <Label htmlFor="statement">Enunciado*</Label>
          <TextArea
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
          />
          {errors.statement && (
            <FormError error={errors.statement?.message?.toString()} />
          )}
        </FormGroup>

        <FormGroup>
          <FaPlus />
          <Label htmlFor="explanation">Feedback / Explicação</Label>
          <TextArea
            id="explanation"
            {...register('explanation')}
            rows={4}
            placeholder="Explicação que será mostrada após o aluno responder a questão"
          />
        </FormGroup>

        <div className="form-actions">
          <button type="button" onClick={onPrev}>Voltar</button>
          <button type="button" onClick={onNext}>Próximo</button>
        </div>
      </FormCard>
    </div>
  );
};