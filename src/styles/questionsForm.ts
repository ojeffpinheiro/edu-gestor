import styled from 'styled-components';

export const QuestionFormContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const QuestionFormHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
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
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FormLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
`;

export const FormInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 0.875rem;
`;

export const FormSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 0.875rem;
`;

export const FormTextarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 0.875rem;
  min-height: 150px;
  resize: vertical;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
`;

export const FormButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &.outline {
    border: 1px solid var(--color-border);
    background-color: white;
    color: var(--color-text);
    
    &:hover {
      oppacity: 0.8;
    }
  }
  
  &.primary {
    background-color: var(--color-primary);
    color: white;
    border: 1px solid var(--color-border);
    
    &:hover {
      oppacity: 0.9;
    }
  }
`;