import styled from "styled-components";

export const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: var(--color-background-secondary);
    border-radius: var(--border-radius-md);
    overflow: hidden;
`;

export const TableHead = styled.th`
    text-align: left;
    padding: 12px;
    border-bottom: 2px solid var(--color-border);
    font-weight: bold;
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background: var(--color-background-third);
    }
`;

export const TableCell = styled.td`
    padding: 12px;
    border-bottom: 1px solid var(--color-border);
`;

export const Th = styled.th`
    background: var(--color-primary);
    color: var(--color-text-on-primary);
    padding: 12px;
    text-align: left;
`;

export const Tr = styled.tr`
    &:nth-child(even) {
        background: var(--color-background-third);
    }
`;

export const Td = styled.td`
    padding: 12px;
    border-bottom: 1px solid var(--color-border);
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
