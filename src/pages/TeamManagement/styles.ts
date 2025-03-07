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