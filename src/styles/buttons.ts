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
    max-width: 13rem;
    justify-content: center;

    ${({ variant = 'primary' }) => getButtonColor(variant)}

    &:disabled {
        background-color: var(--color-button-disabled);
        cursor: not-allowed;
    }
`;

export const CloseButton = styled.button`
    top: var(--space-md);
    right: var(--space-md);
    background-color: transparent;
    border: none;
    font-size: var(--font-size-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--border-radius-full);
    cursor: pointer;
    color: var(--color-text);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-button);
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--shadow-focus);
    }
`;