import styled from "styled-components";
import { fadeIn, shake } from "../../../styles/animations";
import { FormSection } from "../../../styles/formControls";

// Estilos adicionais para complementar os que você já tem

export const StudentFormContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

// Estilo para os campos select que não estavam no código original
export const Select = styled.select`
  width: 100%;
  padding: var(--space-sm, 0.5rem) var(--space-md);
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: var(--border-radius-md, 0.375rem);
  background-color: var(--color-input, #ffffff);
  color: var(--color-text, #2d3748);
  font-size: var(--font-size-md, 1rem);
  transition: all 0.2s ease-in-out;
  line-height: 1.5;
  height: 40px; /* Altura consistente com os inputs */

  &:focus {
    outline: none;
    border-color: var(--color-primary, #4299e1);
    box-shadow: var(--shadow-focus, 0 0 0 3px rgba(66, 153, 225, 0.2));
  }
  
  &:disabled {
    background-color: var(--color-background-third);
    cursor: not-allowed;
    opacity: 0.8;
  }
  
  &.error {
    border-color: var(--color-error);
    animation: ${shake} 0.5s ease-in-out;
  }
`;

// Estilo para mensagem de erro inline (sob um campo específico)
export const InlineErrorMessage = styled.div`
  color: var(--color-error, #e53e3e);
  font-size: var(--font-size-sm, 0.75rem);
  margin-top: var(--space-xs, 0.25rem);
  animation: ${fadeIn} 0.3s ease-out;
`;

// Estilo para o botão de adição de novo aluno
export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  background-color: var(--color-success, #38a169);
  color: white;
  border: none;
  border-radius: var(--border-radius-md);
  padding: var(--space-sm) var(--space-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--color-success-dark, #2f855a);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    font-size: 1.2em;
  }
`;

// Estilo específico para a seção do formulário do aluno
export const StudentFormSection = styled(FormSection)`
  margin-top: var(--space-md);
  
  // Destacando campos obrigatórios
  .required {
    color: var(--color-error);
    font-weight: bold;
    margin-left: 4px;
  }
`;

// Container para campos que ficam lado a lado
export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Modal específico para o formulário de aluno
export const StudentModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-md);
`;

export const StudentModalContent = styled.div`
  background-color: var(--color-background);
  border-radius: var(--border-radius-lg);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
  animation: ${fadeIn} 0.3s ease-out;
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-md) var(--space-lg);
    border-bottom: 1px solid var(--color-border);
    
    h3 {
      margin: 0;
      font-size: var(--font-size-xl);
      color: var(--color-text);
    }
  }
  
  .modal-body {
    padding: var(--space-lg);
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: var(--space-md) var(--space-lg);
    border-top: 1px solid var(--color-border);
    gap: var(--space-md);
  }
`;

// Botões estilizados para ações no formulário
export const Button = styled.button`
  padding: var(--space-sm) var(--space-lg);
  border-radius: var(--border-radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  
  &.primary {
    background-color: var(--color-primary);
    color: white;
    
    &:hover {
      background-color: var(--color-primary-hover);
    }
    
    &:disabled {
      background-color: var(--color-primary-light);
      cursor: not-allowed;
    }
  }
  
  &.secondary {
    background-color: var(--color-background);
    border-color: var(--color-border);
    color: var(--color-text);
    
    &:hover {
      background-color: var(--color-background-secondary);
    }
  }
  
  &.danger {
    background-color: var(--color-error);
    color: white;
    
    &:hover {
      background-color: var(--color-error-dark);
    }
  }
`;