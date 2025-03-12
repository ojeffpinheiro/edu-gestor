// styles/utils.ts
export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

export const getButtonColor = (variant: ButtonVariant) => {
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