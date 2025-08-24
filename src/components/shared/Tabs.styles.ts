import styled from 'styled-components';

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
`;

export const TabsList = styled.div`
  display: flex;
  gap: var(--space-sm);
  padding: var(--space-sm);
  background: var(--color-background-secondary);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border-light);
`;

export const TabTrigger = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: var(--space-md) var(--space-lg);
  border: none;
  border-radius: var(--border-radius-md);
  background: ${({ $active }) => 
    $active ? 'var(--color-primary)' : 'transparent'};
  color: ${({ $active }) => 
    $active ? 'var(--color-text-on-primary)' : 'var(--color-text-secondary)'};
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  
  &:hover {
    background: ${({ $active }) => 
      $active ? 'var(--color-primary-hover)' : 'var(--color-background-tertiary)'};
  }
`;

export const TabContent = styled.div`
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;