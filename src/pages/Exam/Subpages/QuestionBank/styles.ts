// styles.ts
import styled from "styled-components";

export const QuestionBankContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
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
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

export const ImportButton = styled.label`
  background: #10b981;
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;
  position: relative;

  &:hover {
    background: #059669;
  }

  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

export const ExportButton = styled.button`
  background: #3b82f6;
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
    background: #2563eb;
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  overflow: hidden;
`;

export const ViewOption = styled.div<{ active: boolean }>`
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.active ? '#e0f2fe' : 'white'};
  color: ${props => props.active ? '#0369a1' : '#666'};
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#e0f2fe' : '#f5f5f5'};
  }
`;

export const QuestionTable = styled.div`
  background: var(--color-background-third);
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const QuestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;