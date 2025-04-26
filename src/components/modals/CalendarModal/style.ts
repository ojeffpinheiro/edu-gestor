import styled from "styled-components";

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