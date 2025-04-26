import styled from "styled-components";

/* Reutilizando o estilo do modal de formação de grupos */
export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;
export const ModalContent = styled.div`
   background-color: var(--color-card);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-lg);
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    
    &.large {
        max-width: 800px;
    }
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-md) var(--space-lg);
    border-bottom: 1px solid var(--color-border-light);
    background: var(--color-background-third);

    h3 {
        margin: 0;
        color: var(--color-text);
    }
`;

/* Corpo do Modal */
export const ModalBody = styled.div`
    padding: var(--space-lg);
`;

/* Rodapé do Modal */
export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: var(--space-md) var(--space-lg);
    border-top: 1px solid var(--color-border-light);
`;

export const EventIndicator = styled.span`
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: var(--border-radius-full);
    
    &.atividade {
        background-color: var(--color-success);
    }
    
    &.avaliacao {
        background-color: var(--color-error);
    }
    
    &.evento {
        background-color: var(--color-info);
    }
`;

// Componentes para as abas
export const TabContainer = styled.div`
    display: flex;
    gap: var(--space-xs);
    margin-bottom: var(--space-md);
    border-bottom: 1px solid var(--color-border-light);
    overflow-x: auto;
    padding-bottom: var(--space-xs);
    
    &::-webkit-scrollbar {
        height: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background-color: var(--color-border-light);
        border-radius: var(--border-radius-full);
    }
`;