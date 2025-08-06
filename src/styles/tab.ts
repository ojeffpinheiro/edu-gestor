import styled from 'styled-components';

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`;

export const TabsList = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-border);
`;

export const TabTrigger = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  font-weight: 500;
  color: var(--color-text-secondary);
  
  &.active {
    color: var(--color-primary);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: var(--color-primary);
    }
  }
`;

export const TabContent = styled.div`
  padding: 1.5rem 0;
`;