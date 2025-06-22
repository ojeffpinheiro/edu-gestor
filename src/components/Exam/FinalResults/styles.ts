import styled from 'styled-components';

export const ResultsHeader = styled.div`
  margin-bottom: var(--space-xl);
  
  h2 {
    font-size: var(--font-size-xl);
    color: var(--color-text-primary);
    margin: 0 0 var(--space-xs) 0;
  }
  
  p {
    font-size: var(--font-size-md);
    color: var(--color-text-secondary);
    margin: 0;
  }
`;

export const ResultsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--space-md);
  font-size: var(--font-size-md);
  color: var(--color-text);
  background-color: var(--color-background);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  transition: var(--transition-all);

  thead {
    background-color: var(--color-background-secondary);
  }

  th, td {
    padding: var(--space-md) var(--space-lg);
    text-align: left;
    border-bottom: 1px solid var(--color-border-light);
  }

  th {
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: var(--font-size-sm);
  }

  tr {
    transition: var(--transition-fast);
    
    &:hover {
      background-color: var(--color-background-third);
    }

    &:last-child td {
      border-bottom: none;
    }
  }

  td {
    font-weight: var(--font-weight-normal);
    
    &:nth-child(4) {
      font-weight: var(--font-weight-medium);
      color: var(--color-primary);
    }
  }

  @media (max-width: var(--breakpoint-md)) {
    th, td {
      padding: var(--space-sm) var(--space-md);
    }
  }

  @media (max-width: var(--breakpoint-sm)) {
    display: block;
    
    thead {
      display: none;
    }
    
    tr {
      display: block;
      margin-bottom: var(--space-md);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-md);
    }
    
    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-sm) var(--space-md);
      border-bottom: 1px solid var(--color-border-light);
      
      &::before {
        content: attr(data-label);
        font-weight: var(--font-weight-medium);
        color: var(--color-text-secondary);
        margin-right: var(--space-sm);
      }
      
      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

export const StatusBadge = styled.span<{ $approved: boolean }>`
  display: inline-block;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-xl);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  background-color: ${props => props.$approved ? 'var(--color-success)' : 'var(--color-warning)'};
  color: var(--color-text-on-primary);
`;