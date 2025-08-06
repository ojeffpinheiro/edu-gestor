import styled from 'styled-components';

export const PageHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: white;
  border-bottom: 1px solid var(--color-border);
`;

export const PageTitleContainer = styled.div`
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: var(--color-text);
  }
  p {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    margin: 0.25rem 0 0;
  }
`;

export const PageActions = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid var(--color-border);
  background-color: white;
  color: var(--color-text);
  
  &:hover {
    background-color: var(--color-primary);
  }
  
  &.primary {
    background-color: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
    
    &:hover {
      opacity: 0.9;
    }
  }
`;