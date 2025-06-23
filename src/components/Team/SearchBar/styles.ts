import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 4px;

  &:hover {
    color: #333;
  }
`;

export const FiltersButton = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? '#4a90e2' : '#f5f5f5'};
  color: ${props => props.$active ? 'white' : '#333'};
  border: none;
  border-radius: 8px;
  padding: 0 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$active ? '#3a7bc8' : '#e0e0e0'};
  }
`;

export const FiltersPanel = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
  margin-top: 8px;
  width: 300px;
  z-index: 100;
  display: grid;
  gap: 16px;
`;

export const FilterGroup = styled.div`
  display: grid;
  gap: 8px;
`;

export const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

export const FilterSelect = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 14px;
  width: 100%;
`;

export const FilterOption = styled.option`
  padding: 8px;
`;

export const FilterCheckbox = styled.input`
  margin-right: 6px;
`;

export const Highlight = styled.span`
  background-color: #fffacd;
  font-weight: bold;
  padding: 0 2px;
  border-radius: 2px;
`;