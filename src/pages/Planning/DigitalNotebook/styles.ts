import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-lg);
  background-color: var(--color-background);
  min-height: 100vh;
`;

export const Title = styled.h1`
  font-size: var(--font-size-2xl);
  font-weight: bold;
  color: var(--color-text);
  margin-bottom: var(--space-md);
`;

export const ClassList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  justify-content: center;
`;

export const ClassCard = styled.div`
  background: var(--color-card);
  padding: var(--space-md);
  border-radius: var(--border-radius-md);
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

export const IconWrapper = styled.div`
  background: var(--color-secondary);
  padding: var(--space-sm);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--space-sm);
`;

export const ClassTitle = styled.h2`
  font-size: var(--font-size-lg);
  color: var(--color-primary);
  margin-bottom: var(--space-sm);
`;

export const ClassDescription = styled.p`
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
`;
