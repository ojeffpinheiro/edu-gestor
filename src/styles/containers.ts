// containers.ts
import styled from "styled-components";
import { BaseCard } from "./baseComponents";
import { slideUp } from "./animations";

export const Card = styled(BaseCard)`
  margin-bottom: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const FormContainer = styled(BaseCard)`
  background-color: var(--color-background-secondary);
  border: 1px solid var(--color-border-light);
  margin-bottom: 1.5rem;
`;

export const FormCard = styled.section`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border-light);
  animation: ${slideUp} 0.3s ease;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;