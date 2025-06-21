import styled from "styled-components";

export const QuestionTableContent = styled.div`
  background: var(--color-background-third);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 50px 3fr 1fr 1fr 1fr 1fr 1fr;
  padding: 1rem;
  background: var(--color-primary);
  font-weight: 600;
  border-bottom: 1px solid #ddd;

  div {
    display: flex;
    align-items: center;
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 50px 3fr 1fr 1fr 1fr 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  div {
    display: flex;
    align-items: center;
  }

  strong {
    display: block;
    margin-bottom: 0.25rem;
  }

  p {
    color: #666;
    font-size: 0.9rem;
    margin: 0;
  }
`;

export const ActionButton = styled.button<{ danger?: boolean }>`
  background: ${props => props.danger ? '#fef2f2' : '#f0f9ff'};
  color: ${props => props.danger ? '#dc2626' : '#0369a1'};
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.danger ? '#fee2e2' : '#e0f2fe'};
  }
`;