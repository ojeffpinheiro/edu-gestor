import styled from 'styled-components';

export const PageContainer = styled.div`
    padding: var(--space-xl);
    max-width: 1200px;
    margin: 0 auto;
    
    @media (max-width: var(--breakpoint-md)) {
        padding: var(--space-md);
    }
`;

export const Title = styled.h2`
    color: var(--color-text);
    margin-bottom: var(--space-lg);
    font-size: var(--font-size-2xl);
`;

export const TableContainer = styled.div`
    width: 100%;
    max-width: 80vw;
    margin: var(--space-lg) 0;
    border-radius: var(--border-radius-md);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    background-color: var(--color-card);
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
`;

export const Th = styled.th`
    padding: var(--space-md);
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    font-weight: 600;
    text-align: left;
    border: none;
`;

export const Tr = styled.tr`
    border-bottom: 1px solid var(--color-border-light);
    transition: background-color 0.2s;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: var(--color-background-third);
    }
`;

export const Td = styled.td`
    padding: var(--space-md);
    text-align: left;
`;

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

export const Button = styled.button<ButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-size-sm);
    color: var(--color-text-on-primary);
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 500;
    margin-right: var(--space-sm);
    box-shadow: var(--shadow-sm);

    ${({ variant = 'primary' }) => getButtonColor(variant)}

    &:disabled {
        background-color: var(--color-button-disabled);
        cursor: not-allowed;
    }
`;

export const IconButton = styled(Button)<ButtonProps>`
    width: 36px;
    height: 36px;
    padding: 0;
    font-size: var(--font-size-md);
    border-radius: var(--border-radius-full);
    margin-right: var(--space-sm);
`;

export const Icon = styled.span`
    display: inline-flex;
    align-items: center;
    margin-right: var(--space-xs);
    font-size: 1em;
`;

export const Input = styled.input`
    width: 100%;
    padding: var(--space-md);
    margin-bottom: var(--space-md);
    border: 1px solid var(--color-input-border);
    border-radius: var(--border-radius-sm);
    background-color: var(--color-input);
    color: var(--color-text);
    font-size: var(--font-size-md);
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: var(--color-input-focus);
        box-shadow: var(--shadow-focus);
    }

    &::placeholder {
        color: var(--color-text-third);
    }
`;

export const FormContainer = styled.div`
    background-color: var(--color-card);
    padding: var(--space-lg);
    border-radius: var(--border-radius-md);
    margin-top: var(--space-md);
    margin-bottom: var(--space-lg);
    box-shadow: var(--shadow-md);
`;

export const FormActions = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: var(--space-md);
`;

export const EmptyState = styled.div`
    text-align: center;
    padding: var(--space-xl);
    color: var(--color-text-secondary);
    font-style: italic;
`;

// Novos componentes de estilo para as novas funcionalidades
export const ButtonGroup = styled.div`
    display: flex;
    gap: var(--space-sm);
    flex-wrap: wrap;
    
    @media (max-width: var(--breakpoint-md)) {
        margin-top: var(--space-md);
        width: 100%;
        justify-content: space-between;
    }
`;

export const ActionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-lg);
    flex-wrap: wrap;
    
    @media (max-width: var(--breakpoint-md)) {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-md);
    }
`;

// Estilos para os modais
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
    
    h3 {
        margin: 0;
        color: var(--color-text);
    }
`;

export const ModalBody = styled.div`
    padding: var(--space-lg);
`;

export const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: var(--space-md) var(--space-lg);
    border-top: 1px solid var(--color-border-light);
`;

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

// Componentes para o calendário
export const CalendarContainer = styled.div`
    border: 1px solid var(--color-border-light);
    border-radius: var(--border-radius-md);
    overflow: hidden;
    background-color: var(--color-background-secondary);
    margin-top: var(--space-md);
    
    .weekdays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        background-color: var(--color-background-third);
        border-bottom: 1px solid var(--color-border-light);
        
        div {
            padding: var(--space-sm);
            text-align: center;
            font-weight: 600;
            font-size: var(--font-size-sm);
        }
    }
    
    .legend {
        display: flex;
        gap: var(--space-md);
        padding: var(--space-md);
        justify-content: center;
        border-top: 1px solid var(--color-border-light);
        
        div {
            display: flex;
            align-items: center;
            gap: var(--space-xs);
            font-size: var(--font-size-sm);
        }
    }
`;

export const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-md);
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    
    h4 {
        margin: 0;
        text-transform: capitalize;
    }
    
    button {
        background-color: transparent;
        color: var(--color-text-on-primary);
        border: 1px solid rgba(255, 255, 255, 0.3);
        
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
    }
`;

export const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    background-color: var(--color-background-secondary);
`;

export const CalendarDay = styled.div`
    min-height: 80px;
    border: 1px solid var(--color-border-light);
    padding: var(--space-xs);
    position: relative;
    
    &.empty {
        background-color: var(--color-background-third);
    }
    
    .day-number {
        font-size: var(--font-size-sm);
        font-weight: 600;
        margin-bottom: var(--space-xs);
    }
    
    &:hover {
        background-color: var(--color-background-third);
    }
`;

export const CalendarEvent = styled.div`
    margin-bottom: var(--space-xs);
    padding: var(--space-xs);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-xs);
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    
    &.atividade {
        background-color: rgba(82, 196, 26, 0.1);
        color: var(--color-success);
    }
    
    &.avaliacao {
        background-color: rgba(245, 34, 45, 0.1);
        color: var(--color-error);
    }
    
    &.evento {
        background-color: rgba(24, 144, 255, 0.1);
        color: var(--color-info);
    }
    
    &:hover {
        opacity: 0.8;
    }
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