import styled from 'styled-components';

export const ChartTabs = styled.div`
  display: flex;
  margin-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-border);
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: var(--space-sm) var(--space-md);
  border: none;
  background: none;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)')};
  color: ${({ $active }) => 
    $active ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
  border-bottom: 2px solid ${({ $active }) => 
    $active ? 'var(--color-primary)' : 'transparent'};
  transition: all var(--transition-fast);
  font-family: var(--font-family);
  font-size: var(--font-size-sm);

  &:hover {
    color: var(--color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

export const ClassViewContainer = styled.div`
  width: 100%;
  padding: var(--space-lg);

  .chart-container {
    height: 400px;
    margin-top: var(--space-md);
    background-color: var(--color-card);
    border-radius: var(--border-radius-md);
    padding: var(--space-md);
    box-shadow: var(--shadow-sm);
  }

  .metrics-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
  }

  .class-controls {
    display: flex;
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    padding: var(--space-md);

    .metrics-row {
      grid-template-columns: 1fr;
    }

    .class-controls {
      flex-direction: column;
      gap: var(--space-sm);
    }
  }
`;