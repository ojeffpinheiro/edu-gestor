import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
`;

export const Button = styled.button<{ variant: string }> `
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: none;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    background: ${({ variant }) => {
        switch (variant) {
            case "primary": return "var(--color-primary)";
            case "info": return "var(--color-info)";
            case "warning": return "var(--color-warning)";
            case "success": return "var(--color-success)";
            default: return "var(--color-secondary)";
        }
    }};
    color: var(--color-text-on-primary);

    &:hover {
        opacity: 0.8;
    }
`;

export const Icon = styled.span`
    display: flex;
    align-items: center;
`;
