import React, { useState } from 'react';
import styled from 'styled-components';

interface MultiSelectProps {
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

const MultiSelectContainer = styled.div`
  position: relative;
`;

const SelectInput = styled.div`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-background-secondary);
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

const Option = styled.div<{ selected: boolean }>`
  padding: 0.5rem;
  background: ${props => props.selected ? '#e3f2fd' : 'white'};
  cursor: pointer;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const SelectedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background: #e3f2fd;
  border-radius: 12px;
  padding: 2px 8px;
  margin-right: 4px;
  font-size: 0.75rem;
`;

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = 'Selecione...',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (value: string) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newSelected);
  };

  return (
    <MultiSelectContainer>
      <SelectInput onClick={() => setIsOpen(!isOpen)}>
        {selectedValues.length > 0 ? (
          <div>
            {selectedValues.slice(0, 3).map(value => (
              <SelectedBadge key={value}>
                {options.find(o => o.value === value)?.label || value}
              </SelectedBadge>
            ))}
            {selectedValues.length > 3 && <SelectedBadge>+{selectedValues.length - 3}</SelectedBadge>}
          </div>
        ) : (
          <span style={{ color: '#999' }}>{placeholder}</span>
        )}
        <span>{isOpen ? '▲' : '▼'}</span>
      </SelectInput>

      {isOpen && (
        <Dropdown>
          {options.map(option => (
            <Option
              key={option.value}
              selected={selectedValues.includes(option.value)}
              onClick={() => toggleOption(option.value)}
            >
              {option.label}
            </Option>
          ))}
        </Dropdown>
      )}
    </MultiSelectContainer>
  );
};