import styled from 'styled-components';
import { Button } from '../../../styles/buttons';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-lg);
  background: var(--color-background);
  min-height: 100vh;
  font-family: var(--font-family);
`;

export const Header = styled.div`
display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const AddButton = styled(Button)`
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: var(--color-primary-hover);
  }
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
