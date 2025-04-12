import styled from "styled-components";
import { BaseCard } from "../../styles/baseComponents";
import { slideUp } from "../../styles/animations";

export const PreviewContainer = styled(BaseCard)`
  animation: ${slideUp} 0.4s ease-out;
  margin-top: var(--space-xl);
  border: 1px solid var(--color-border-light);
  background-color: var(--color-background-secondary);
`;

export const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-border-light);
`;

export const PreviewTitle = styled.h3`
  font-size: var(--font-size-lg);
  color: var(--color-title-card);
  margin: 0;
`;

export const PreviewActions = styled.div`
  display: flex;
  gap: var(--space-sm);
`;

export const QuestionContent = styled.div`
  font-size: var(--font-size-md);
  line-height: 1.6;
  margin-bottom: var(--space-lg);
  
  p {
    margin-bottom: var(--space-md);
  }
  
  .math {
    background-color: var(--color-background-third);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--border-radius-sm);
    display: inline-block;
    font-family: monospace;
  }
`;

export const VariablesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--space-lg);
  font-size: var(--font-size-sm);
  
  th {
    background-color: var(--color-background-third);
    font-weight: 600;
    text-align: left;
    padding: var(--space-sm);
    border: 1px solid var(--color-border);
  }
  
  td {
    padding: var(--space-sm);
    border: 1px solid var(--color-border-light);
  }
  
  tr:nth-child(even) {
    background-color: var(--color-background-third);
  }
`;

export const RenderedEquation = styled.div`
  margin: var(--space-md) 0;
  padding: var(--space-md);
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-md);
  border-left: 3px solid var(--color-primary);
  font-family: monospace;
`;
