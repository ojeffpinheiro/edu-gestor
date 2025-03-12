import styled from "styled-components";

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

const getButtonColor = (variant: ButtonVariant) => {
    switch (variant) {
        case 'primary':
            return `
                background-color: var(--color-primary);
                &:hover {
                    background-color: var(--color-primary-hover);
                }
            `;
        case 'secondary':
            return `
                background-color: var(--color-secondary);
                color: var(--color-text);
                &:hover {
                    background-color: var(--color-secondary-hover);
                }
            `;
        case 'success':
            return `
                background-color: var(--color-success);
                &:hover {
                    background-color: var(--color-success-hover);
                }
            `;
        case 'error':
            return `
                background-color: var(--color-error);
                &:hover {
                    background-color: var(--color-error-hover);
                }
            `;
        case 'warning':
            return `
                background-color: var(--color-warning);
                &:hover {
                    background-color: var(--color-warning-hover);
                }
            `;
        case 'info':
            return `
                background-color: var(--color-info);
                &:hover {
                    background-color: var(--color-info-hover);
                }
            `;
        default:
            return `
                background-color: var(--color-primary);
                &:hover {
                    background-color: var(--color-primary-hover);
                }
            `;
    }
};

interface ButtonProps {
    variant?: ButtonVariant;
    active?: boolean;
}

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

/* Botão de Fechar */
export const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: var(--font-size-xl);
    cursor: pointer;
    color: var(--color-text-secondary);
    
    &:hover {
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

interface TabButtonProps {
    active?: boolean;
}

export const TabButton = styled.button<TabButtonProps>`
    padding: var(--space-sm) var(--space-md);
    border: none;
    background-color: ${props => props.active ? 'var(--color-primary)' : 'transparent'};
    color: ${props => props.active ? 'var(--color-text-on-primary)' : 'var(--color-text)'};
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
    white-space: nowrap;
    
    &:hover {
        background-color: ${props => props.active ? 'var(--color-primary-hover)' : 'var(--color-background-third)'};
    }
    
    &.atividade {
        &:hover {
            color: var(--color-success);
        }
        ${props => props.active && `
            background-color: var(--color-success);
            &:hover {
                background-color: var(--color-success-hover);
                color: var(--color-text-on-primary);
            }
        `}
    }
    
    &.avaliacao {
        &:hover {
            color: var(--color-error);
        }
        ${props => props.active && `
            background-color: var(--color-error);
            &:hover {
                background-color: var(--color-error-hover);
                color: var(--color-text-on-primary);
            }
        `}
    }
    
    &.evento {
        &:hover {
            color: var(--color-info);
        }
        ${props => props.active && `
            background-color: var(--color-info);
            &:hover {
                background-color: var(--color-info-hover);
                color: var(--color-text-on-primary);
            }
        `}
    }
`;