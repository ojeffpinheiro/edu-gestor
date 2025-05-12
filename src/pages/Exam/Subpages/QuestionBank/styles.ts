import styled from "styled-components";

export const QuestionBankContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    color: #666;
  }
`;

export const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const SearchInput = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  width: 300px;

  input {
    border: none;
    outline: none;
    margin-left: 0.5rem;
    width: 100%;
  }
`;

export const FilterButton = styled.button`
  background: white;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 0.5rem;
  transition: background 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

export const AddButton = styled.button`
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;

  &:hover {
    background: #4338ca;
  }
`;

export const QuestionTable = styled.div`
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 2fr;
  padding: 1rem;
  background: #f5f5f5;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr 2fr;
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
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
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