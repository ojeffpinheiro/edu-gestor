import styled from 'styled-components';

export const CardContainer = styled.div<{ isSelected: boolean }>`
  border: 1px solid ${props => props.isSelected ? 'var(--color-primary)' : 'var(--color-border)'};
  border-radius: var(--border-radius-md);
  padding: 1.25rem;
  margin-bottom: 1rem;
  background-color: ${props => props.isSelected ? 'var(--color-primary-light)' : 'var(--color-background-secondary)'};
  transition: all 0.2s ease;
  box-shadow: ${props => props.isSelected ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'};
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
`;

export const QuestionNumber = styled.span`
  font-weight: 600;
  color: var(--color-text);
`;

export const MetaContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const StatementText = styled.p`
  font-size: 1rem;
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.5;
`;

export const ImageContainer = styled.div`
  margin: 1rem 0;
  img {
    max-width: 100%;
    max-height: 200px;
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--color-border);
  }
`;

export const AlternativesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`;

export const AlternativeItem = styled.li<{ isCorrect?: boolean; showCorrect?: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: var(--border-radius-sm);
  background-color: ${props => 
    props.showCorrect && props.isCorrect 
      ? 'var(--color-success-light)' 
      : 'transparent'};
  border: 1px solid ${props => 
    props.showCorrect && props.isCorrect 
      ? 'var(--color-success)' 
      : 'var(--color-border)'};
`;

export const AlternativeLetter = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.75rem;
  border-radius: 50%;
  background-color: var(--color-background-third);
  font-size: 0.75rem;
  font-weight: 600;
`;

export const AlternativeText = styled.span<{ isCorrect?: boolean; showCorrect?: boolean }>`
  color: ${props => 
    props.showCorrect && props.isCorrect 
      ? 'var(--color-success-dark)' 
      : 'var(--color-text)'};
`;

export const ExplanationText = styled.div`
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-sm);
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  border-left: 3px solid var(--color-primary);
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border-light);
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  color: var(--color-text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-background-third);
    color: var(--color-primary);
  }

  &.delete:hover {
    color: var(--color-error);
  }
`;

export const SelectionToggle = styled.input`
  margin-right: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;