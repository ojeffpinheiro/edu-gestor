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

export const FilterPanel = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FilterTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 0.5rem;
`;

export const FilterCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #555;
  cursor: pointer;
`;

export const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-size: 0.9rem;
  min-height: 100px;

  &[multiple] {
    option {
      padding: 0.25rem 0.5rem;
    }
  }
`;

export const DateRangeInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;

  input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    font-size: 0.9rem;
  }

  span {
    color: #666;
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
  grid-template-columns: 50px 3fr 1fr 1fr 1fr 1fr 1fr;
  padding: 1rem;
  background: #f5f5f5;
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

export const QuestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const QuestionCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
    background: #f9fafb;
  }

  .status-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    font-weight: 500;

    &.active {
      background: #dcfce7;
      color: #166534;
    }

    &.inactive {
      background: #fee2e2;
      color: #991b1b;
    }

    &.draft {
      background: #fef9c3;
      color: #854d0e;
    }
  }

  .card-body {
    padding: 1rem;
    flex-grow: 1;

    h3 {
      margin: 0 0 1rem 0;
      font-size: 1rem;
      line-height: 1.4;
    }

    .meta {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-bottom: 1rem;
      font-size: 0.8rem;

      span {
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        background: #f3f4f6;
      }

      .difficulty {
        &.easy {
          background: #dcfce7;
          color: #166534;
        }
        &.medium {
          background: #fef9c3;
          color: #854d0e;
        }
        &.hard {
          background: #fee2e2;
          color: #991b1b;
        }
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .tag {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        background: #e0f2fe;
        color: #0369a1;
        border-radius: 1rem;
      }
    }
  }

  .card-actions {
    display: flex;
    justify-content: flex-end;
    padding: 0.75rem 1rem;
    border-top: 1px solid #eee;
    gap: 0.5rem;
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