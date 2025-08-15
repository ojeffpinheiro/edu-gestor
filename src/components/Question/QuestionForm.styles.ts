import styled, { css } from 'styled-components';
import { constants } from '../../utils/consts';
import { CardContainer } from '../shared/Card.styles';
import { Input } from '../../styles/inputs';
import { FieldError } from 'react-hook-form';

export const FormStepContainer = styled(CardContainer)`
  padding: ${constants.spacing.xl};
  margin-bottom: ${constants.spacing.lg};
  background: var(--color-background-secondary);
  border: 1px solid var(--color-border);
`;

export const FormTitle = styled.h2`
  font-size: ${constants.fontSize.xl};
  margin-bottom: ${constants.spacing.lg};
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: ${constants.spacing.sm};
`;

export const FormGroup = styled.div`
  margin-bottom: ${constants.spacing.md};
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: ${constants.spacing.xs};
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
`;

export const FormInput = styled.input`
  width: 100%;
  padding: ${constants.spacing.sm};
  border: 1px solid var(--color-border);
  border-radius: ${constants.borderRadius.md};
  background: var(--color-input);
  color: var(--color-text);
  transition: var(--transition-all);

  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${constants.spacing.sm};
  border: 1px solid var(--color-border);
  border-radius: ${constants.borderRadius.md};
  background: var(--color-input);
  color: var(--color-text);
  transition: var(--transition-all);
  resize: vertical;

  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: ${constants.spacing.sm};
  border: 1px solid var(--color-border);
  border-radius: ${constants.borderRadius.md};
  background: var(--color-input);
  color: var(--color-text);
  transition: var(--transition-all);

  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${constants.spacing.lg};
  gap: ${constants.spacing.md};
`;


interface FormButtonProps {
  $variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  $size?: 'sm' | 'md' | 'lg';
  $isLoading?: boolean;
}

export const FormButton = styled.button<FormButtonProps>`
  min-width: 120px;
  flex: 1;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${constants.spacing.sm};
  opacity: ${props => props.$isLoading ? 0.7 : 1};
  cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};

  ${({ $isLoading }) => $isLoading && css`
    &::after {
      content: '';
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `}
`;

export const AlternativeItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${constants.spacing.sm};
  padding: ${constants.spacing.sm};
  background: var(--color-background-third);
  border-radius: ${constants.borderRadius.md};
  margin-bottom: ${constants.spacing.sm};
`;

export const ResourceItem = styled(AlternativeItem)`
  flex-direction: column;
  align-items: flex-start;
`;

export const CriteriaItem = styled(AlternativeItem)`
  flex-direction: column;
`;

export const FormErrorContainer = styled.div<{ error?: string | FieldError }>`
  display: flex;
  align-items: center;
  gap: ${constants.spacing.xs};
  color: var(--color-error);
  font-size: ${constants.fontSize.sm};
  margin-top: ${constants.spacing.xs};

  & > * {
    display: inline;
  }
`;

export const FormSection = styled.div`
  margin-bottom: ${constants.spacing.xl};
  padding-bottom: ${constants.spacing.md};
  border-bottom: 1px solid var(--color-border-light);
`;

export const FormSectionTitle = styled.h3`
  font-size: ${constants.fontSize.lg};
  margin-bottom: ${constants.spacing.md};
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: ${constants.spacing.sm};
`;

export const ConditionalField = styled.div<{ isVisible: boolean }>`
  display: ${props => props.isVisible ? 'block' : 'none'};
  transition: all 0.3s ease;
  overflow: hidden;
  max-height: ${props => props.isVisible ? '1000px' : '0'};
  opacity: ${props => props.isVisible ? '1' : '0'};
`;

// Add input mask support
export const MaskedInput = styled(Input)`
  &[data-mask]::placeholder {
    color: transparent;
  }
  
  &[data-mask]:focus::placeholder {
    color: var(--color-text-third);
  }
`;