import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: var(--space-lg);
  background: var(--color-background-secondary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: var(--space-md);
  width: 100%;
  
  button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xs);
    padding: var(--space-md);
    border-radius: var(--border-radius-md);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-size: var(--font-size-sm);
    
    &:focus-visible {
      outline: 2px solid var(--color-primary-light);
      outline-offset: 2px;
    }
    
    &.secondary {
      background-color: var(--color-background-third);
      color: var(--color-text-primary);
      border: 1px solid var(--color-border);
      
      &:hover {
        background-color: var(--color-border-light);
        border-color: var(--color-border-dark);
      }
      
      &:active {
        transform: translateY(1px);
      }
    }
    
    &:not(.secondary) {
      background-color: var(--color-primary);
      color: var(--color-text-on-primary);
      
      &:hover {
        background-color: var(--color-primary-hover);
        box-shadow: var(--shadow-sm);
      }
      
      &:disabled {
        background-color: var(--color-border);
        cursor: not-allowed;
        opacity: 0.7;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`;

export const SelectionModeContainer = styled.section`
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

export const SectionHeader = styled.h3`
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  font-weight: 600;
  margin: 0;
`;

export const SelectionModeToggle = styled.div`
  display: flex;
  gap: var(--space-sm);
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

interface ToggleButtonProps {
  $active: boolean;
}

export const ToggleButton = styled.button<ToggleButtonProps>`
  flex: 1;
  padding: var(--space-md);
  background-color: ${props => props.$active 
    ? 'var(--color-primary)' 
    : 'var(--color-background-primary)'};
  color: ${props => props.$active 
    ? 'var(--color-text-on-primary)' 
    : 'var(--color-text-primary)'};
  border: 1px solid ${props => props.$active 
    ? 'var(--color-primary)' 
    : 'var(--color-border)'};
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: ${props => props.$active 
      ? 'var(--color-primary-hover)' 
      : 'var(--color-background-third)'};
  }
  
  &:focus-visible {
    outline: 2px solid var(--color-primary-light);
    outline-offset: 2px;
  }
`;

export const RefreshButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-info);
  color: var(--color-text-on-primary);
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  align-self: flex-start;
  
  &:hover {
    background-color: var(--color-info-hover);
  }
  
  &:disabled {
    background-color: var(--color-border);
    cursor: not-allowed;
  }
  
  svg {
    transition: transform var(--transition-normal);
  }
  
  &:not(:disabled):hover svg {
    transform: rotate(360deg);
  }
`;

export const RandomSelectionSummary = styled.section`
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
`;

export const SummaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  
  th, td {
    padding: var(--space-md);
    text-align: left;
    border-bottom: 1px solid var(--color-border);
  }
  
  th {
    font-weight: 600;
    color: var(--color-text-primary);
    background-color: var(--color-background-third);
    position: sticky;
    top: 0;
  }
  
  tr.warning td {
    background-color: var(--color-warning-light);
  }
  
  .warning-icon {
    margin-left: var(--space-xs);
    color: var(--color-warning);
  }

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    
    th, td {
      padding: var(--space-sm);
    }
  }
`;

export const TotalRow = styled.tr`
  font-weight: 600;
  background-color: var(--color-background-third);
  
  td {
    border-top: 2px solid var(--color-border);
  }
`;

export const QuestionCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-md);
  margin: 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface QuestionCardProps {
  $difficulty: string;
}

export const QuestionCard = styled.article<QuestionCardProps>`
  background-color: var(--color-background-primary);
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
  border-left: 4px solid ${props => {
    switch (props.$difficulty) {
      case 'easy': return 'var(--color-success)';
      case 'medium': return 'var(--color-warning)';
      case 'hard': return 'var(--color-error)';
      default: return 'var(--color-border)';
    }
  }};
  transition: all var(--transition-fast);
  cursor: pointer;
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
`;

export const QuestionTitle = styled.h4`
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: var(--space-sm);
  line-height: 1.4;
  font-size: var(--font-size-md);
`;

export const QuestionMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  
  span {
    padding: var(--space-xs) var(--space-sm);
    border-radius: 9999px;
    font-size: var(--font-size-xs);
    font-weight: 500;
  }
  
  .difficulty {
    &.easy {
      background-color: var(--color-success-light);
      color: var(--color-success);
    }
    
    &.medium {
      background-color: var(--color-warning-light);
      color: var(--color-warning);
    }
    
    &.hard {
      background-color: var(--color-error-light);
      color: var(--color-error);
    }
  }
  
  .type {
    background-color: var(--color-background-third);
    color: var(--color-text-secondary);
  }
`;

interface InfoMessageProps {
  $warning?: boolean;
  $error?: boolean;
}

export const InfoMessage = styled.div<InfoMessageProps>`
  padding: var(--space-md);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  
  ${props => props.$warning && css`
    background-color: var(--color-warning-light);
    border: 1px solid var(--color-warning);
    color: var(--color-warning);
  `}
  
  ${props => props.$error && css`
    background-color: var(--color-error-light);
    border: 1px solid var(--color-error);
    color: var(--color-error);
  `}
`;

export const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  padding: var(--space-xl);
  
  &:after {
    content: "";
    width: 40px;
    height: 40px;
    border: 4px solid var(--color-primary-light);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;