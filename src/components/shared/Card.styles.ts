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

export const CardHeader = styled.div<{
  $align?: 'start' | 'center' | 'end' | 'space-between';
}>`
  display: flex;
  align-items: center;
  margin-bottom: var(--space-md);
  justify-content: ${({ $align }) => $align || 'flex-start'};
  gap: var(--space-sm);
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