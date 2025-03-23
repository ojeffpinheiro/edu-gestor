import styled from "styled-components";

export const Input = styled.input`
    padding: var(--space-sm);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    background-color: var(--color-input);
    color: var(--color-text);
    font-size: var(--font-size-md);
    transition: all 0.2s ease-in-out;

    &:focus {
        outline: none;
        border-color: var(--color-input-focus);
        box-shadow: var(--shadow-focus, 0 0 0 3px rgba(66, 153, 225, 0.2));
    }
    
    &::placeholder {
        color: var(--color-text-third, #a0aec0);
    }
`;

export const Label = styled.label`
    display: block;
    font-size: var(--font-size-sm, 0.875rem);
    font-weight: 500;
    color: var(--color-text-secondary, #4a5568);
    margin-bottom: var(--space-xs, 0.25rem);
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: var(--space-sm, 0.5rem);
    border: 1px solid var(--color-border, #e2e8f0);
    border-radius: var(--border-radius-sm, 0.25rem);
    background-color: var(--color-input, #ffffff);
    color: var(--color-text, #2d3748);
    font-size: var(--font-size-md, 1rem);
    resize: vertical;
    min-height: 100px;
    transition: all 0.2s ease-in-out;

    &:focus {
        outline: none;
        border-color: var(--color-input-focus, #4299e1);
        box-shadow: var(--shadow-focus, 0 0 0 3px rgba(66, 153, 225, 0.2));
    }
    
    &::placeholder {
        color: var(--color-text-third, #a0aec0);
    }
`;

export const Select = styled.select`
    width: 100%;
    padding: var(--space-sm, 0.5rem);
    border: 1px solid var(--color-border, #e2e8f0);
    border-radius: var(--border-radius-sm, 0.25rem);
    background-color: var(--color-input, #ffffff);
    color: var(--color-text, #2d3748);
    font-size: var(--font-size-md, 1rem);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
    transition: all 0.2s ease-in-out;

    &:focus {
        outline: none;
        border-color: var(--color-input-focus, #4299e1);
        box-shadow: var(--shadow-focus, 0 0 0 3px rgba(66, 153, 225, 0.2));
    }
`;

export const InputRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md, 1rem);
`;

export const InputGroup = styled.div`
    margin-bottom: var(--space-md, 1rem);
    
    &:last-child {
        margin-bottom: 0;
    }
    
    &.mt-6 {
        margin-top: var(--space-2xl, 3rem);
    }
    
    .space-y-2 {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm, 0.5rem);
    }
    
    .flex.items-center {
        display: flex;
        align-items: center;
        gap: var(--space-sm, 0.5rem);
    }
    
    .ml-2 {
        margin-left: var(--space-sm, 0.5rem);
    }
`;