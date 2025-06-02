import styled from "styled-components";

export const Header = styled.header`
  background: var(--color-card);
  padding: var(--space-xl) var(--space-2xl);
  margin-bottom: var(--space-xl);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  
  @media (max-width: 768px) {
    padding: var(--space-md);
    margin-bottom: var(--space-lg);
  }
`;

export const Title = styled.h1`
  margin: 0 0 var(--space-xl) 0;
  color: var(--color-text);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--space-lg);
  }
`;

export const ContentArea = styled.main`
  padding: 0 var(--space-2xl) var(--space-2xl);
  
  @media (max-width: 768px) {
    padding: 0 var(--space-md) var(--space-lg);
  }
`;

export const ClassViewContainer = styled.div`
  .class-controls {
    display: flex;
    gap: var(--space-lg);
    margin-bottom: var(--space-xl);
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: var(--space-md);
      margin-bottom: var(--space-lg);
    }
  }

  .metrics-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-lg);
    margin-bottom: var(--space-xl);
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: var(--space-md);
      margin-bottom: var(--space-lg);
    }
  }

  .chart-row {
    margin-bottom: var(--space-xl);
    
    @media (max-width: 768px) {
      margin-bottom: var(--space-lg);
    }
  }
`;

export const ClassResultsTableStyles = styled.div`
  .class-results-table {
    overflow-x: auto;
    
    table {
      width: 100%;
      border-collapse: collapse;
      
      th, td {
        padding: var(--space-sm) var(--space-md);
        text-align: left;
        border-bottom: 1px solid var(--color-border-light);
      }
      
      th {
        font-weight: var(--font-weight-semibold);
        background-color: var(--color-background-secondary);
      }
      
      .clickable-row {
        cursor: pointer;
        transition: background-color var(--transition-fast);
        
        &:hover {
          background-color: var(--color-background-secondary);
        }
      }
      
      .trend-cell {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        
        &.up {
          color: var(--color-success);
        }
        
        &.down {
          color: var(--color-error);
        }
        
        &.neutral {
          color: var(--color-text-secondary);
        }
      }
    }
  }
`;

export const SelectorStyles = styled.div`
  .subject-selector, .student-selector {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    
    label {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      font-weight: var(--font-weight-medium);
    }
    
    select {
      padding: var(--space-sm) var(--space-md);
      border-radius: var(--border-radius-md);
      border: 1px solid var(--color-border);
      background-color: var(--color-input);
      color: var(--color-text);
      font-family: var(--font-family);
      transition: all var(--transition-fast);
      
      &:focus {
        border-color: var(--color-primary);
        box-shadow: var(--shadow-focus);
        outline: none;
      }
    }
  }
`;

export const ViewSelector = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 4px;
  margin-bottom: 24px;
  background: var(--color-background-secondary);
  padding: 4px;
  border-radius: 12px;
  width: 100%;
  box-shadow: var(--shadow-lg);

  button {
    padding: 8px 16px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-weight: 500;
    color: var(--color-text-secondary);
    border-radius: 8px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;

    &[aria-selected="true"] {
      background: var(--color-card);
      color: var(--color-primary);
      box-shadow: var(--shadow-sm);
      font-weight: 600;
    }

    &:hover {
      background: rgba(var(--color-primary-rgb), 0.1);
      color: var(--color-primary);
    }

    &:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
  }
`;

export const TimeframeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
  
  label {
    font-weight: var(--font-weight-medium);
  }
  
  select {
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--border-radius-sm);
  }
`;