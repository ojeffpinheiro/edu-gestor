// Card.styles.ts
import styled, { css } from 'styled-components';
import { cardVariants } from '../../styles/variants';

export interface CardProps {
  $variant?: keyof typeof cardVariants;
  $selected?: boolean;
}

export const CardContainer = styled.div<CardProps>`
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  transition: var(--transition-all);
  
  ${({ $variant = 'default' }) => cardVariants[$variant]}
  ${({ $selected }) => $selected && cardVariants.selected}
`;

export const QuestionCardContainer = styled.div<{
  $selected?: boolean;
  $isFavorite?: boolean;
  $usageCount?: number;
}>`
  ${cardVariants.default}
  position: relative;
  transition: var(--transition-all);
  
  ${({ $selected }) => 
    $selected && css`
      border: 2px solid var(--color-primary);
    `}
  
  ${({ $isFavorite }) => 
    $isFavorite && css`
      border-left: 4px solid var(--color-error);
    `}
  
  ${({ $usageCount }) => 
    $usageCount && $usageCount > 10 && css`
      box-shadow: var(--shadow-md);
    `}
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: ${({ $usageCount }) =>
      $usageCount && $usageCount > 10 ? 'translateY(-2px)' : 'none'};
  }
`;

export const Card = styled.div<{ $clickable?: boolean }>`
  background: var(--color-card);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border-light);
  overflow: hidden;
  transition: all var(--transition-normal);
  color: var(--color-card-foreground);
  box-shadow: var(--shadow-sm);
  
  ${({ $clickable }) => $clickable && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
      border-color: var(--color-primary-light);
    }
  `}
`;

export const CardHeader = styled.div<{ $flex?: boolean; $alignCenter?: boolean; $justifyBetween?: boolean }>`
  padding: var(--space-lg);
  border-bottom: 1px solid var(--color-border-light);
  display: ${({ $flex }) => $flex ? 'flex' : 'block'};
  align-items: ${({ $alignCenter }) => $alignCenter ? 'center' : 'flex-start'};
  justify-content: ${({ $justifyBetween }) => $justifyBetween ? 'space-between' : 'flex-start'};
  background: var(--color-background-secondary);
  flex-direction: column;
  gap: 0.5rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

export const CardTitle = styled.h3<{ $small?: boolean }>`
  font-size: ${({ $small }) => $small ? '0.875rem' : '1.5rem'};
  font-weight: var(--font-weight-semibold);
  color: var(--color-title-card);
  margin: 0;
  line-height: 1;
`;

export const CardContent = styled.div`
  padding: 0 1.5rem 1.5rem;
`;

export const CardDescription = styled.p`
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin: var(--space-xs) 0 0;
`;

export const MetricCardContainer = styled.div`
  background: var(--color-card);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border-light);
  padding: var(--space-lg);
  transition: all var(--transition-fast);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

export const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-md);
`;

export const MetricTitle = styled.h4`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  margin: 0;
`;

export const MetricValue = styled.div`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin-bottom: var(--space-xs);
`;

export const MetricChange = styled.div<{ $trend: 'up' | 'down' }>`
  font-size: var(--font-size-sm);
  color: ${({ $trend }) => 
    $trend === 'up' ? 'var(--color-success)' : 'var(--color-error)'};
  display: flex;
  align-items: center;
  gap: var(--space-xs);
`;