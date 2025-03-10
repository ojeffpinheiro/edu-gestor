import styled from "styled-components";
import { ModalContainer as BaseModalContainer, ModalContent as BaseModalContent, ModalHeader as BaseModalHeader } from "../GroupDrawModal/styles";

/* Reutilizando o estilo do modal de formação de grupos */
export const ModalContainer = styled(BaseModalContainer)``;

export const ModalContent = styled(BaseModalContent)`
    max-width: 600px;
`;

/* Cabeçalho do Modal */
export const ModalHeader = styled(BaseModalHeader)`
    h3 {
    margin: 0;
    font-size: 1.25rem;
    color: var(--color-text, #2d3748);
    font-weight: 600;
  }
`

/* Botão de Fechar */
export const CloseButton = styled.button`
    background: none;
  border: none;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  color: var(--color-text-third, #64748b);
  transition: all 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--color-text, #1e293b);
  }
  
  &:focus {
    outline: none;
    box-shadow: var(--shadow-focus, 0 0 0 2px rgba(66, 153, 225, 0.5));
  }
`;

/* Corpo do Modal */
export const ModalBody = styled.div`
    padding: var(--spacing-md);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  max-height: calc(85vh - 130px);
`;

/* Rodapé do Modal */
export const ModalFooter = styled.div`
    display: flex;
    justify-content: center;
    padding: var(--spacing-md);
    background: var(--color-background-light);
    border-bottom-left-radius: var(--border-radius-lg);
    border-bottom-right-radius: var(--border-radius-lg);
`;

/* Botões */
export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
    background: ${(props) => (props.variant === "secondary" ? "var(--color-secondary)" : "var(--color-primary)")};
    color: var(--color-text-on-primary);
    border: none;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-md);
    cursor: pointer;
    font-size: var(--font-size-md);
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    transition: 0.3s;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        background: var(--color-disabled);
        cursor: not-allowed;
    }
`;

/* Tabs para filtrar eventos */
export const TabContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-md);
`;

export const TabButton = styled.button<{ active?: boolean }>`
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-md);
    border: none;
    background: ${(props) => (props.active ? "var(--color-primary)" : "var(--color-background-light)")};
    color: ${(props) => (props.active ? "var(--color-text-on-primary)" : "var(--color-text)")};
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background: var(--color-primary-light);
        color: var(--color-text-on-primary);
    }
`;

/* Indicador de Eventos */
export const EventIndicator = styled.span`
    width: 16px;
    height: 16px;
    display: inline-block;
    border-radius: 50%;
    margin-right: var(--spacing-xs);

    &.atividade {
        background: var(--color-info);
    }

    &.avaliacao {
        background: var(--color-warning);
    }

    &.evento {
        background: var(--color-success);
    }
`;
