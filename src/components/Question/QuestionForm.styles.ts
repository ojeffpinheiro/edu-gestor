import styled, { css } from 'styled-components';
import { constants } from '../../utils/consts';
import { CardContainer } from '../shared/Card.styles';
import { Input } from '../../styles/inputs';
import { FieldError } from 'react-hook-form';
import { ResourceType } from '../../utils/types/Question';

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
  justify-content: flex-end;
  margin-top: ${constants.spacing.xl};
  gap: ${constants.spacing.md};

  button {
    padding: ${constants.spacing.sm} ${constants.spacing.lg};
    border-radius: ${constants.borderRadius.md};
    cursor: pointer;
    transition: var(--transition-all);

    &.primary {
      background: var(--color-primary);
      color: white;
      border: 1px solid var(--color-primary);

      &:hover {
        background: var(--color-primary-dark);
      }
    }

    &.secondary {
      background: transparent;
      color: var(--color-text);
      border: 1px solid var(--color-border);

      &:hover {
        background: var(--color-background-secondary);
      }
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
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

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${constants.spacing.md};
`;

export const FormSection = styled.section`
  background: var(--color-background-secondary);
  border: 1px solid var(--color-border);
  border-radius: ${constants.borderRadius.lg};
  padding: ${constants.spacing.lg};

  h3 {
    font-size: ${constants.fontSize.lg};
    margin-bottom: ${constants.spacing.lg};
    color: var(--color-primary);
    display: flex;
    align-items: center;
    gap: ${constants.spacing.sm};
  }
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

export const MaskedInput = styled(Input)`
  &[data-mask]::placeholder {
    color: transparent;
  }
  
  &[data-mask]:focus::placeholder {
    color: var(--color-text-third);
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${constants.spacing.xl};
  gap: ${constants.spacing.md};

  button {
    display: flex;
    align-items: center;
    gap: ${constants.spacing.xs};
    padding: ${constants.spacing.sm} ${constants.spacing.md};
    background: var(--color-background-secondary);
    border: 1px solid var(--color-border);
    border-radius: ${constants.borderRadius.md};
    cursor: pointer;
    transition: var(--transition-all);

    &.active {
      background: var(--color-primary);
      color: white;
      border-color: var(--color-primary);
    }

    &:hover {
      background: var(--color-primary-light);
    }
  }
`;

export const TwoColumnForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${constants.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .form-column {
    display: flex;
    flex-direction: column;
    gap: ${constants.spacing.xl};
  }
`;

export const BasicInfoStep = styled.div`
  .basic-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${constants.spacing.md};

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .title-group {
      grid-column: span 2;
    }

    .content-group {
      grid-column: span 2;
    }
  }
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${constants.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormActionsRight = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${constants.spacing.md};
  margin-top: ${constants.spacing.xl};

  button {
    padding: ${constants.spacing.sm} ${constants.spacing.lg};
    border-radius: ${constants.borderRadius.md};
    cursor: pointer;
    transition: var(--transition-all);

    &.primary {
      background: var(--color-primary);
      color: white;
      border: 1px solid var(--color-primary);

      &:hover {
        background: var(--color-primary-dark);
      }
    }

    &.secondary {
      background: transparent;
      color: var(--color-text);
      border: 1px solid var(--color-border);

      &:hover {
        background: var(--color-background-secondary);
      }
    }
  }
`;

export const SingleViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${constants.spacing.xl};
`;

export const StepsViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${constants.spacing.xl};
`;

export const FormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${constants.spacing.xl};
`;

export const LevelsContainer = styled.div`
  margin-top: ${constants.spacing.md};
  padding: ${constants.spacing.md};
  background: var(--color-background-third);
  border-radius: ${constants.borderRadius.md};
`;

export const LevelItem = styled.div`
  margin-bottom: ${constants.spacing.md};
  padding-bottom: ${constants.spacing.md};
  border-bottom: 1px dashed var(--color-border);
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const CorrectAnswerIndicator = styled.span<{ isCorrect: boolean }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.isCorrect ? 'var(--color-success)' : 'var(--color-error)'};
  margin-right: ${constants.spacing.sm};
  cursor: pointer;
`;

export const AlternativeText = styled.div`
  flex: 1;
  padding: ${constants.spacing.sm};
  background: var(--color-background-third);
  border-radius: ${constants.borderRadius.md};
`;

export const AlternativeActions = styled.div`
  display: flex;
  gap: ${constants.spacing.sm};
`;

export const ResourceTypeBadge = styled.span<{ type: ResourceType }>`
  display: inline-block;
  padding: ${constants.spacing.xs} ${constants.spacing.sm};
  border-radius: ${constants.borderRadius.sm};
  font-size: ${constants.fontSize.sm};
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  color: white;
  max-height: 2rem;
  background-color: ${props => {
    switch(props.type) {
      case 'image': return 'var(--color-primary)';
      case 'video': return 'var(--color-danger)';
      case 'audio': return 'var(--color-warning)';
      case 'link': return 'var(--color-success)';
      default: return 'var(--color-text-secondary)';
    }
  }};
`;

export const ResourcePreview = styled.div`
  margin-top: ${constants.spacing.sm};
  padding: ${constants.spacing.sm};
  background: var(--color-background-third);
  border-radius: ${constants.borderRadius.md};
  border: 1px solid var(--color-border);
`;

export const ResourceActions = styled.div`
  display: flex;
  gap: ${constants.spacing.sm};
  margin-top: ${constants.spacing.md};
`;