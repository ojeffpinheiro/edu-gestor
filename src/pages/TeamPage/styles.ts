import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-lg);
  background: var(--color-background);
  min-height: 100vh;
`;

export const Title = styled.h1`
  font-size: var(--font-size-2xl);
  color: var(--color-text);
  margin-bottom: var(--space-lg);
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-md);
  width: 100%;
  max-width: 800px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--color-card);
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  &:hover {
    background: var(--color-primary-hover);
    color: var(--color-text-third);
  }

  svg {
    margin-bottom: var(--space-sm);
  }

  span {
    font-size: var(--font-size-md);
    font-weight: bold;
  }
`;
