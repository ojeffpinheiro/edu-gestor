import styled from 'styled-components';

import { slideIn } from '../../styles/animations';

import { flexColumn, flexRow, gap } from '../../styles/layoutUtils';
import { cardHoverTransition } from '../../styles/animations';

export const ExamCard = styled.article`
  ${flexColumn}
  padding: var(--space-lg);
  height: 100%;
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  transition: ${cardHoverTransition};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
`;

export const ExamTitle = styled.h3`
  font-size: var(--font-size-lg);
  margin-bottom: var(--space-sm);
  color: var(--color-title-card);
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 80%;
`;

export const ExamMeta = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-md);
`;

export const ExamStatistics = styled.div`
  ${flexRow}
  ${gap('md')}
  margin-bottom: var(--space-md);
  padding: var(--space-sm) 0;
  border-top: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);
`;

export const StatItem = styled.div`
  text-align: center;
  flex: 1;
`;

export const StatValue = styled.div`
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-primary);
`;

export const StatLabel = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-transform: uppercase;
`;

export const ExamActions = styled.div`
  ${flexRow}
  ${gap('sm')}
  margin-top: auto;
  padding-top: var(--space-md);
`;


export const EmptyState = styled.div`
  ${flexColumn}
  align-items: center;
  justify-content: center;
  padding: var(--space-2xl);
  text-align: center;
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  margin: var(--space-xl) 0;
  animation: ${slideIn} 0.4s ease-out;
`;

export const EmptyStateTitle = styled.h2`
  margin-bottom: var(--space-md);
  color: var(--color-text-secondary);
  font-weight: 500;
`;

export const EmptyStateText = styled.p`
  margin-bottom: var(--space-lg);
  color: var(--color-text-third);
  max-width: 500px;
  line-height: 1.6;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: var(--space-xs);
  
  .danger {
    color: var(--color-error);
    
    &:hover {
      background-color: var(--color-error-light);
    }
  }
`;

export const ExamDetails = styled.div`
  margin-top: var(--space-md);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
  font-size: var(--font-size-sm);
  
  h4 {
    margin: var(--space-sm) 0 var(--space-xs);
    font-size: var(--font-size-md);
  }
  
  ul {
    margin: 0;
    padding-left: var(--space-md);
  }
`;

export const ExamInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
`;

export const InfoLabel = styled.span`
  font-weight: 500;
  color: var(--color-text-secondary);
`;

export const InfoValue = styled.span`
  font-weight: 400;
`;

export const SecurityIndicators = styled.div`
  display: flex;
  gap: var(--space-xs);
`;

export const SecurityIndicator = styled.span`
  color: var(--color-primary);
  font-size: var(--font-size-sm);
`;

export const EmptyStateIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--color-background-third);
  margin-bottom: var(--space-md);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${slideIn} 0.5s ease-out;
  
  svg {
    width: 40px;
    height: 40px;
    color: var(--color-text-secondary);
  }
`;