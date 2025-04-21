import React from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';

import { Label, Select } from '../../styles/inputs';
import { Flex } from '../../styles/layoutUtils';
import { TopicFilterStyles } from './styles'

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
  const { FilterContainer, SearchContainer, SearchInput } = TopicFilterStyles;

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