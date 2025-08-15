import React from 'react'
import { FaExclamationCircle } from 'react-icons/fa';
import { FieldError } from 'react-hook-form';
import { FormErrorContainer } from './QuestionForm.styles';

interface FormErrorProps {
  error?: string | FieldError;
}

export const FormError: React.FC<FormErrorProps> = ({ error }) => {
  if (!error) return null;

  const message = typeof error === 'string'
    ? error
    : error.message || 'Erro inválido';

  return (
    <FormErrorContainer>
      <FaExclamationCircle size={14} />
      {message}
    </FormErrorContainer>
  )
};