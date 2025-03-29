// containers.ts
import styled from "styled-components";
import { BaseCard } from "./baseComponents";

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