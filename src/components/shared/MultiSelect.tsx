import React from 'react';
import styled from 'styled-components';

interface MultiSelectProps {
  options: { value: string; label: string }[];
  onChange: (selected: string[]) => void;
  value?: string[];
}

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const MultiSelect: React.FC<MultiSelectProps> = ({ options, onChange, value = [] }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    onChange(selectedOptions);
  };

  return (
    <Select multiple onChange={handleChange} value={value}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default MultiSelect;