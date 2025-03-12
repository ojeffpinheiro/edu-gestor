import styled from "styled-components";

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: var(--color-background-secondary);
    border-radius: var(--border-radius-md);
    overflow: hidden;
`;

export const Td = styled.td`
    padding: var(--space-md);
    border-bottom: 1px solid var(--color-border);
`;

export const TableHeader = styled.th`
    padding: var(--space-md);
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    text-align: left;
    font-weight: 600;
`;

export const TableCell = styled.td`
    padding: var(--space-md);
    border: 1px solid var(--color-border);
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: var(--color-background-third);
    }

    &:hover {
        background-color: var(--color-background-secondary);
    }
`;

export const EmptyStateMessage = styled.p`
    color: var(--color-text-secondary);
    font-style: italic;
    padding: var(--space-md);
    text-align: center;
`;