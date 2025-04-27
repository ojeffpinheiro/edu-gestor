import styled from "styled-components";
import { slideIn } from "../../../styles/animations";
import { flexRow, gap } from "../../../styles/layoutUtils";
import { Button, PrimaryActionButton } from "../../../styles/buttons";

// Container para cada passo do processo
export const StepContainer = styled.div`
  width: 100%;
  padding: var(--space-lg);
  animation: ${slideIn} 0.3s ease-out;
`;

// Título do passo atual com indicadores
export const StepTitle = styled.div`
  ${flexRow}
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-border-light);
  
  h2 {
    font-size: var(--font-size-xl);
    color: var(--color-text);
    margin: 0;
    
    &:hover {
      color: var(--color-primary);
    }
  }
`;

// Conteúdo do passo atual
export const StepContent = styled.div`
  padding: var(--space-md) 0;
`;

// Container para botões de ação
export const ActionContainer = styled.div`
  ${flexRow}
  ${gap('md')}
  justify-content: flex-end;
  margin-top: var(--space-lg);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

// Container para as ações de seleção de questões
export const QuestionSelectionActions = styled.div`
  ${flexRow}
  ${gap('md')}
  align-items: center;
  margin-bottom: var(--space-lg);
  padding: var(--space-md);
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-md);
  
  button {
    flex-shrink: 0;
  }
  
  span {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }
`;

// Botões com estilo personalizado
export const RandomSelectButton = styled(Button)`
  background-color: var(--color-info);
  color: var(--color-text-on-primary);
  
  &:hover:not(:disabled) {
    background-color: var(--color-info-hover);
  }
`;

export const NextStepButton = styled(PrimaryActionButton)`
  min-width: 240px;
`;

export const GenerateExamButton = styled(PrimaryActionButton)`
  min-width: 240px;
  background: linear-gradient(135deg, var(--color-success) 0%, var(--color-success-hover) 100%);
`;

export const ExamPreview = styled.div`
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ExamPreviewItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;

  strong {
    font-weight: 600;
    margin-right: 8px;
    min-width: 80px;
    display: inline-block;
  }

  span {
    display: flex;
    align-items: center;
    margin-right: 12px;

    svg {
      margin-right: 4px;
    }
  }
`;