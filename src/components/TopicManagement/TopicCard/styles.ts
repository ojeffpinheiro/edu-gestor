import styled from "styled-components";

export const ContentCard = styled.div`
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-lg);
  padding: var(--space-md);
  cursor: pointer;
  display: flex;
  gap: var(--space-sm);
  align-items: flex-start;
  transition: all var(--transition-normal);
  background-color: var(--color-card);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
  }
`;


export const CardIcon = styled.div`
  color: var(--color-primary);
  display: flex;
  align-items: center;
  padding: var(--space-xs);
`;

export const CardContent = styled.div`
  flex: 1;
`;


export const CardTitle = styled.div`
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-xs);
  color: var(--color-title-card);
`;

export const CardType = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
`;