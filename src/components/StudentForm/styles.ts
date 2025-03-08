import styled from "styled-components";

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    background: var(--color-background-secondary);
    border-radius: var(--border-radius-md);
`;

export const Input = styled.input`
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    font-size: 16px;
`;

export const FormActions = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
`;

export const Button = styled.button<{ variant: string }> `
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    background: ${({ variant }) => 
        variant === "primary" ? "var(--color-primary)" : "var(--color-secondary)"};
    color: var(--color-text-on-primary);

    &:hover {
        opacity: 0.8;
    }
`;

export const Icon = styled.span`
    display: flex;
    align-items: center;
`;
