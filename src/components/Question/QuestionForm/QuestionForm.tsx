import React, { useState } from 'react';
import { QuestionFormProps } from './type';
import { FormGrid, QuestionFormContainer, QuestionFormContent, QuestionFormDescription, QuestionFormHeader, QuestionFormTitle } from './styles';
import { FormGroup } from './FormGroup';
import { FormActions } from './FormActions';

export const QuestionForm = ({
  title,
  description,
  fields,
  initialValues = {},
  onSubmit,
  onCancel,
  submitText = 'Salvar Questão',
  cancelText = 'Cancelar',
  className
}: QuestionFormProps) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: any) => {
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      if (field.required && !formValues[field.name]) {
        newErrors[field.name] = 'Este campo é obrigatório';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formValues);
  };

  return (
    <QuestionFormContainer className={className}>
      <QuestionFormHeader>
        <QuestionFormTitle>{title}</QuestionFormTitle>
        {description && (
          <QuestionFormDescription>{description}</QuestionFormDescription>
        )}
      </QuestionFormHeader>

      <QuestionFormContent>
        <form onSubmit={handleSubmit}>
          <FormGrid>
            {fields.map((field) => (
              <FormGroup
                key={field.name}
                field={field}
                value={formValues[field.name]}
                onChange={handleChange}
                error={errors[field.name]}
              />
            ))}
          </FormGrid>

          <FormActions
            onCancel={onCancel}
            onSubmit={handleSubmit}
            submitText={submitText}
            cancelText={cancelText}
          />
        </form>
      </QuestionFormContent>
    </QuestionFormContainer>
  );
};