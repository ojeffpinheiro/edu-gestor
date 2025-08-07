import styled from 'styled-components';

export const QuestionFormContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const QuestionFormHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-background-secondary);
`;

export const QuestionFormTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
`;

export const QuestionFormDescription = styled.p`
  margin: 0.5rem 0 0;
  color: var(--color-text-secondary);
  font-size: 0.875rem;
`;

export const QuestionFormContent = styled.div`
  padding: 1.5rem;
  background-color: var(--color-background);
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 0.875rem;
  width: 100%;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

export const FormSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 0.875rem;
  width: 100%;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

export const FormTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 0.875rem;
  min-height: 150px;
  resize: vertical;
  width: 100%;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }
`;

export const ErrorMessage = styled.span`
  color: var(--color-error);
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
`;