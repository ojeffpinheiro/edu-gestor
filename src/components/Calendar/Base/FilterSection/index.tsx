
import React from 'react';

import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { FilterSectionHeader } from '../../Views/AnnualView/styles';
import { FilterSectionContainer, FilterSectionTitle, FilterSectionToggle } from './styles';

interface FilterSectionProps {
  title: string;
  isCollapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  isCollapsed,
  onToggle,
  children
}) => {
  return (
    <FilterSectionContainer>
      <FilterSectionHeader onClick={onToggle}>
        <FilterSectionTitle>{title}</FilterSectionTitle>
        <FilterSectionToggle>
          {isCollapsed ? <FaAngleDown /> : <FaAngleUp />}
        </FilterSectionToggle>
      </FilterSectionHeader>
      {!isCollapsed && (
        <>
          {children}
        </>
      )}
    </FilterSectionContainer>
  );
};

export default FilterSection;