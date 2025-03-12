import styled from "styled-components";

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: var(--color-background-secondary);
    border-radius: var(--border-radius-md);
    overflow: hidden;
`;

export const Th = styled.th`
    background: var(--color-primary);
    color: var(--color-text-on-primary);
    padding: var(--space-md);
    text-align: left;
`;

export const Td = styled.td`
    padding: var(--space-md);
    border-bottom: 1px solid var(--color-border);
`;