import styled from 'styled-components';

import { Card } from '../../styles/containers';

export const PageContainer = styled.div`
  padding: var(--space-lg);
  max-width: 1200px;
  margin: 0 auto;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-lg);
`;

export const TopicCard = styled(Card)`
  margin-bottom: var(--space-lg);
`;

export const TopicHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const TopicTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin: 0;
  
  svg {
    min-width: 16px;
    color: var(--color-primary);
  }
`;

export const TopicActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  
  svg {
    min-width: 16px;
  }
`;

export const ContentList = styled.div`
  margin-top: var(--space-md);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border-light);
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-md);
  margin-top: var(--space-md);
`;

export const Badge = styled.span<{ status: 'ativo' | 'inativo' }>`
  background-color: ${props => props.status === 'ativo' ? 'var(--color-success)' : 'var(--color-error)'};
  color: white;
  padding: 2px var(--space-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-xs);
  margin-left: var(--space-sm);
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: var(--space-lg);
  margin-top: var(--space-md);
`;

export const StatCard = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: var(--shadow-sm);
`;

export const StatValue = styled.div`
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-primary);
`;

export const StatLabel = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentItem = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-md);
  background-color: var(--color-background-secondary);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-border-light);
`;

export const ContentInfo = styled.div`
  padding: var(--space-md);
  flex-grow: 1;
`;

export const ContentTitle = styled.h4`
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  
  svg {
    min-width: 16px;
    color: var(--color-primary);
  }
`;

export const ContentDescription = styled.p`
  margin: var(--space-sm) 0 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
`;

export const ContentFooter = styled.div`
  padding: var(--space-sm) var(--space-md);
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid var(--color-border-light);
  background-color: var(--color-background-third);
  border-radius: 0 0 var(--border-radius-md) var(--border-radius-md);
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
`;