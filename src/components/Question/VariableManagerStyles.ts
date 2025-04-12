import styled from "styled-components";
import { slideUp } from "../../styles/animations";
import { Table } from "../../styles/table";

// Estilos
export const VariableContainer = styled.div`
  animation: ${slideUp} 0.3s ease-out;
`;

export const VariableForm = styled.div`
  background-color: var(--color-background-secondary);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-md);
  padding: var(--space-md);
  margin-bottom: var(--space-lg);
`;

export const VariableTable = styled(Table)`
  margin-top: var(--space-md);
`;

export const RequiredVariableIndicator = styled.span`
  color: var(--color-error);
  font-weight: bold;
  margin-left: var(--space-xs);
`;