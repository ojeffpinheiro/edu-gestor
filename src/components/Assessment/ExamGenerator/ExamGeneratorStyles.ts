import styled from "styled-components";
import { fadeIn, slideIn, pulse } from "../../../styles/animations";
import { BaseCard } from "../../../styles/baseComponents";
import { flexColumn, flexRow, spaceBetween, gap } from "../../../styles/layoutUtils";
import { Button, PrimaryActionButton } from "../../../styles/buttons";

// Container principal
export const MainContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

// Container para cada passo do processo
export const StepContainer = styled(BaseCard)`
  width: 100%;
  padding: var(--space-lg);
  margin-bottom: var(--space-lg);
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

// Indicador circular de passo
export const StepIndicator = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-background-third)'};
  color: ${props => props.active ? 'var(--color-text-on-primary)' : 'var(--color-text-secondary)'};
  font-weight: bold;
  transition: all 0.3s ease;
`;

// Conteúdo do passo atual
export const StepContent = styled.div`
  padding: var(--space-md) 0;
`;

// Seção para formulários
export const FormSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  max-width: 66rem;
  margin: 0 auto;
`;

// Grupo de formulário com campos
export const FormGroup = styled.div`
  ${flexColumn}
  margin-bottom: var(--space-md);
  
  label {
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--color-text-secondary);
    margin-bottom: var(--space-xs);
  }
  
  input, select, textarea {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    border: 2px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    background-color: var(--color-input);
    font-size: var(--font-size-md);
    
    &:focus {
      outline: none;
      border-color: var(--color-input-focus);
      box-shadow: var(--shadow-focus);
    }
  }
  
  select[multiple] {
    height: auto;
    min-height: 120px;
  }
  
  small {
    margin-top: var(--space-xs);
    font-size: var(--font-size-xs);
    color: var(--color-text-third);
  }
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

// Estilização para os itens das questões
export const QuestionItem = styled.li`
  padding: var(--space-md);
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--space-sm);
  background-color: var(--color-background-secondary);
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--color-primary);
    transform: translateX(4px);
  }
  
  p {
    margin-bottom: var(--space-sm);
    color: var(--color-text);
    font-size: var(--font-size-md);
  }
  
  .question-meta {
    ${flexRow}
    ${spaceBetween}
    margin-bottom: var(--space-sm);
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    
    span {
      padding: var(--space-xs) var(--space-sm);
      background-color: var(--color-background-third);
      border-radius: var(--border-radius-sm);
    }
  }
  
  button {
    margin-left: auto;
    display: block;
  }
`;

// Lista de questões com scroll
export const QuestionList = styled.ul`
  list-style: none;
  max-height: 400px;
  overflow-y: auto;
  padding-right: var(--space-sm);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--color-background-secondary);
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 10px;
  }
`;

// Container para questões disponíveis e selecionadas
export const QuestionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  
  h3 {
    font-size: var(--font-size-md);
    margin-bottom: var(--space-md);
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

// Mensagem de sucesso
export const SuccessMessage = styled.div`
  text-align: center;
  padding: var(--space-xl);
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  animation: ${pulse} 0.5s ease-out;
  
  h2 {
    color: var(--color-success);
    margin-bottom: var(--space-md);
    font-size: var(--font-size-2xl);
  }
  
  p {
    margin-bottom: var(--space-lg);
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
  }
  
  button {
    padding: var(--space-md) var(--space-lg);
    font-size: var(--font-size-md);
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

export const AddQuestionButton = styled(Button).attrs({ variant: 'success' })`
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-sm);
`;

export const RemoveQuestionButton = styled(Button).attrs({ variant: 'error' })`
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--font-size-sm);
`;

export const NextStepButton = styled(PrimaryActionButton)`
  min-width: 240px;
`;

export const GenerateExamButton = styled(PrimaryActionButton)`
  min-width: 240px;
  background: linear-gradient(135deg, var(--color-success) 0%, var(--color-success-hover) 100%);
`;