import styled from "styled-components";
import { getButtonColor } from "../utils/styles";

export const Button = styled.button<{ variant?: "primary" | "secondary" | "success" | "error" | "warning" | "info" }>`
    padding: var(--space-sm) var(--space-md);
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    font-weight: 500;
    font-size: var(--font-size-sm);
    color: var(--color-text-on-primary);
    transition: all 0.2s ease;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .75rem;

    ${({ variant = 'primary' }) => getButtonColor(variant)}

    &:disabled {
        background-color: var(--color-button-disabled);
        cursor: not-allowed;
    }
`;