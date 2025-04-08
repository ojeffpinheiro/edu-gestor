import React from 'react';
import styled from 'styled-components';
import { FaFilter, FaSearch } from 'react-icons/fa';

import { Input, Label, Select } from '../../styles/inputs';
import { Flex } from '../../styles/layoutUtils';

const FilterContainer = styled.div`
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  
  svg {
    position: absolute;
    left: var(--space-md);
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-third);
  }
`;

const SearchInput = styled(Input)`
  padding-left: 2.5rem;
  width: 100%;
`;

interface TopicFilterProps {
  searchTerm: string;
  selectedDiscipline: string;
  selectedArea: string;
  areas: string[];
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDisciplineChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onAreaChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TopicFilter: React.FC<TopicFilterProps> = ({
  searchTerm,
  selectedDiscipline,
  selectedArea,
  areas,
  onSearchChange,
  onDisciplineChange,
  onAreaChange
}) => {
  return (
    <FilterContainer>
      <SearchContainer>
        <FaSearch size={16} />
        <SearchInput 
          placeholder="Pesquisar tópicos..." 
          value={searchTerm}
          onChange={onSearchChange}
        />
      </SearchContainer>
      
      <Flex gap="md" align="center">
        <FaFilter size={16} />
        <Label>Filtros:</Label>
        
        <Select
          value={selectedDiscipline}
          onChange={onDisciplineChange}
        >
          <option value="all">Todas Disciplinas</option>
          <option value="physics">Física</option>
          <option value="math">Matemática</option>
        </Select>
        
        <Select
          value={selectedArea}
          onChange={onAreaChange}
        >
          <option value="all">Todas Áreas</option>
          {areas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </Select>
      </Flex>
    </FilterContainer>
  );
};

export default TopicFilter;