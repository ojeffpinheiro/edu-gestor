import styled from 'styled-components';

export const ResultsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--space-lg);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  background-color: var(--color-background);
  transition: var(--transition-all);

  th, td {
    padding: var(--space-md) var(--space-lg);
    text-align: left;
    border-bottom: 1px solid var(--color-border-light);
    vertical-align: middle;
  }

  th {
    background-color: var(--color-background-secondary);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: var(--font-size-xs);
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
    
    &:last-child {
      font-weight: var(--font-weight-medium);
      color: var(--color-primary);
    }
  }

  @media (max-width: var(--breakpoint-md)) {
    th, td {
      padding: var(--space-sm) var(--space-md);
    }
    
    th {
      font-size: var(--font-size-xs);
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