import styled from 'styled-components';

export const Container = styled.div`
  padding: var(--space-xl);
  max-width: var(--breakpoint-xxl);
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  background: var(--color-background);
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  margin-bottom: var(--space-2xl);
  width: 100%;

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-md);
    width: 100%;
  }
`;

export const DashboardTitle = styled.div`
  h1 {
    font-size: var(--font-size-2xl);
    color: var(--color-text-primary);
    margin-bottom: var(--space-xs);
  }

  p {
    font-size: var(--font-size-md);
    color: var(--color-text-secondary);
    margin: 0;
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  gap: var(--space-sm);
  background: var(--color-background-secondary);
  padding: var(--space-xs);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);

  button {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-sm) var(--space-md);
    background: transparent;
    border: none;
    border-radius: var(--border-radius-md);
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.active, &:hover:not(:disabled) {
      background: var(--color-primary);
      color: var(--color-text-on-primary);
      box-shadow: var(--shadow-sm);
    }

    &.active {
      font-weight: var(--font-weight-semibold);
    }
  }
`;