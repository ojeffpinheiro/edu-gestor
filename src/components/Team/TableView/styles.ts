import styled from "styled-components";

export const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: var(--shadow-sm);
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  margin-top: 1rem;
`;

export const TableHeader = styled.thead`
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  
  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
  }
`;

export const TableRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:nth-child(even) {
    background-color: var(--color-background-secondary);
  }
  
  &:hover {
    background-color: var(--color-background-third);
  }
  
  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--color-border-light);
  }
`;

export const AttendanceBadge = styled.span<{ color: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  background-color: ${props => props.color};
  color: white;
`;

export const PriorityTag = styled.span<{ color?: string }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: var(--border-radius-sm);
  font-size: 0.75rem;
  background-color: ${props => props.color || '#e0e0e0'};
  color: ${props => props.color ? 'white' : '#333'};
`;