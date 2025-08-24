import { ButtonVariant } from "../types/ui/UIComponent";

export const getButtonColor = (variant: ButtonVariant) => {
    switch (variant) {
        case 'primary':
            return `
                background-color: var(--color-primary);
            `;
        case 'secondary':
            return `
                background-color: var(--color-secondary);
                color: var(--color-text);
            `;
        case 'success':
            return `
                background-color: var(--color-success);
            `;
        case 'error':
            return `
                background-color: var(--color-error);
            `;
        case 'warning':
            return `
                background-color: var(--color-warning);
            `;
        case 'info':
            return `
                background-color: var(--color-info);
            `;
        default:
            return `
                background-color: var(--color-primary);
            `;
    }
};