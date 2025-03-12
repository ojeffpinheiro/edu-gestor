import styled from "styled-components";

export const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const IconButton = styled.button<{ variant?: "error" | "primary" | 'info' }>`
    background: ${(props) => (props.variant === 'error' ? 'var(--color-info)' : 'var(--color-error)')};
    color: var(--color-text-on-primary);
    border: none;
    padding: 8px;
    margin: 0 4px;
    border-radius: var(--border-radius-sm);
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

export const EmptyState = styled.div`
    text-align: center;
    padding: 1rem;
    color: var(--color-text-secondary);
`;
