import styled from 'styled-components';

export const Card = styled.div`
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: var(--shadow-elegant);
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 0.5rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-card-foreground);
  margin: 0;
`;

export const CardDescription = styled.p`
  font-size: 0.875rem;
  color: var(--color-muted-foreground);
  margin: 0;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
  padding-top: 0;
`;