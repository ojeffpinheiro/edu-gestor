import React from 'react'
import styled from 'styled-components';
import { FaExclamationCircle } from 'react-icons/fa';
import { constants } from '../../utils/consts';

interface FormErrorProps {
  error?: string;
}

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${constants.spacing.xs};
  color: var(--color-error);
  font-size: ${constants.fontSize.sm};
  margin-top: ${constants.spacing.xs};
`;

export const FormError = ({ error }: FormErrorProps) => {
  if (!error) return null;

  return (
    <ErrorContainer>
      <FaExclamationCircle size={14} />
      <span>{error}</span>
    </ErrorContainer>
  );
};