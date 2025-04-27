import styled from "styled-components";

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-border);
`;

export const Tab = styled.button<{ active: boolean }>`
  padding: var(--space-md) var(--space-lg);
  border-bottom: 2px solid ${p => p.active ? 'var(--color-primary)' : 'transparent'};
  color: ${p => p.active ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
  font-weight: ${p => p.active ? '600' : '400'};
  transition: all 0.2s;
  
  &:hover {
    background-color: var(--color-background-third);
  }
`;