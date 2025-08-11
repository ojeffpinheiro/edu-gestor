import React from 'react';
import styled from 'styled-components';

interface CategorySelectorProps {
  categories: Array<{ id: string; name: string }>;
  onSelect: (id: string) => void;
}

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
`;

const CategorySelector: React.FC<CategorySelectorProps> = ({ categories, onSelect }) => {
  return (
    <Select onChange={(e) => onSelect(e.target.value)}>
      {categories.map(category => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </Select>
  );
};

export default CategorySelector;