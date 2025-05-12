
import styled from 'styled-components';

export const TableContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  width: 100%;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f8f9fa;
  border-bottom: 1px solid #e1e4e8;
`;

export const TableBody = styled.tbody`
  tr:not(:last-child) {
    border-bottom: 1px solid #e1e4e8;
  }
  
  tr:hover {
    background-color: #f5f7fa;
  }
`;

interface TableHeaderProps {
  sortable?: boolean;
  width?: string;
}

export const TableHeader = styled.th<TableHeaderProps>`
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 500;
  font-size: 0.875rem;
  color: #4b5563;
  position: relative;
  cursor: ${props => props.sortable ? 'pointer' : 'default'};
  width: ${props => props.width || 'auto'};
  
  &:hover {
    background-color: ${props => props.sortable ? '#edf2f7' : 'transparent'};
  }
  
  .sort-icon {
    margin-left: 0.25rem;
    display: inline-flex;
    vertical-align: middle;

    svg {
      width: 0.875rem;
      height: 0.875rem;
    }
`;

export const TableCell = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  vertical-align: middle;
`;

export const Checkbox = styled.input`
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  border-radius: 3px;
  border: 1px solid #d1d5db;
  transition: all 0.2s ease;
  
  &:checked {
    background-color: #3b82f6;
    border-color: #3b82f6;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-top: 1px solid #e1e4e8;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const PageInfo = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const PageControls = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  
  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
  }
`;

interface PageButtonProps {
  active?: boolean;
  disabled?: boolean;
}

export const PageButton = styled.button<PageButtonProps>`
  background-color: ${props => props.active ? '#3b82f6' : 'white'};
  color: ${props => props.active ? 'white' : '#4b5563'};
  border: 1px solid ${props => props.active ? '#3b82f6' : '#d1d5db'};
  border-radius: 4px;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.active ? '#2563eb' : '#f3f4f6'};
  }
  
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const RowsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
  
  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
  }
  
  select {
    padding: 0.25rem 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 0.875rem;
    background-color: white;
    cursor: pointer;
    
    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.5);
    }
  }
`;

interface TableRowProps {
  selected?: boolean;
}

export const TableRow = styled.tr<TableRowProps>`
  cursor: pointer;
  background-color: ${props => props.selected ? 'rgba(59, 130, 246, 0.1)' : 'transparent'};
  transition: background-color 0.2s ease;

  &:not(:last-child) {
    border-bottom: 1px solid #e1e4e8;
  }
  
  &:hover {
    background-color: ${props => props.selected ? 'rgba(59, 130, 246, 0.15)' : '#f5f7fa'};
  }
`;