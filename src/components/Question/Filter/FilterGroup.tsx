import React from 'react'
import styled from 'styled-components';

interface FilterGroupProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const FilterGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  color: var(--color-text-secondary);
`;

const FilterGroup = ({ 
  label, 
  children, 
  className 
}: FilterGroupProps) => (
  <FilterGroupContainer className={className}>
    <FilterLabel>{label}</FilterLabel>
    {children}
  </FilterGroupContainer>
);

export default FilterGroup;