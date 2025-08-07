import styled from 'styled-components';

export const ViewModeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const ViewModeButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: ${({ $active }) => 
    $active ? 'var(--color-primary)' : 'transparent'};
  color: ${({ $active }) => 
    $active ? 'white' : 'var(--color-text)'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ $active }) => 
      $active ? 'var(--color-primary-dark)' : 'var(--color-background-secondary)'};
  }
`;

export const ModalContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const QuestionDetailSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const DetailLabel = styled.span`
  display: block;
  font-size: 0.875rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
`;

export const DetailValue = styled.div`
  font-size: 1rem;
  padding: 0.5rem;
  background-color: var(--color-background-secondary);
  border-radius: 4px;
`;