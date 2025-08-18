import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Input } from '../../styles/inputs';
import { 
  SearchWrapper, Button, SearchIcon,
  ButtonGroup, Dropdown, DropdownButton,
  DropdownContent, DropdownHeader, FilterGroup,
  FilterLabel, Select
} from './SearchInputStyles';

interface SearchFilter {
  disciplina: string;
  dificuldade: string;
  tipo: string;
}

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: (searchTerm: string, filters: SearchFilter) => void;
  debounceDelay?: number;
}
const SearchInput: React.FC<SearchInputProps> = ({ 
  placeholder = 'Buscar...', 
  value,
  onChange,
  onSearch,
  debounceDelay = 300
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilter>({
    disciplina: '',
    dificuldade: '',
    tipo: ''
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  
  // Debounce melhorado
  useEffect(() => {
    if (!onSearch) return;
    
    const handler = setTimeout(() => {
      onSearch(value, filters);
    }, debounceDelay);

    return () => clearTimeout(handler);
  }, [value, filters, debounceDelay, onSearch]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      disciplina: '',
      dificuldade: '',
      tipo: ''
    });
  };

  return (
    <SearchWrapper ref={dropdownRef}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
      <SearchIcon>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </SearchIcon>
      <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </DropdownButton>

      <Dropdown isOpen={isDropdownOpen}>
        <DropdownHeader>Filtros Avançados</DropdownHeader>
        <DropdownContent>
          <FilterGroup>
            <FilterLabel>Disciplina</FilterLabel>
            <Select name="disciplina" value={filters.disciplina} onChange={handleFilterChange}>
              <option value="">Todas</option>
              <option value="matematica">Matemática</option>
              <option value="portugues">Português</option>
              <option value="ciencias">Ciências</option>
              <option value="historia">História</option>
              <option value="geografia">Geografia</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Nível de Dificuldade</FilterLabel>
            <Select name="dificuldade" value={filters.dificuldade} onChange={handleFilterChange}>
              <option value="">Todos</option>
              <option value="facil">Fácil</option>
              <option value="medio">Médio</option>
              <option value="dificil">Difícil</option>
            </Select>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Tipo de Questão</FilterLabel>
            <Select name="tipo" value={filters.tipo} onChange={handleFilterChange}>
              <option value="">Todos</option>
              <option value="multipla-escolha">Múltipla Escolha</option>
              <option value="verdadeiro-falso">Verdadeiro/Falso</option>
              <option value="dissertativa">Dissertativa</option>
            </Select>
          </FilterGroup>

          <ButtonGroup>
            <Button className="secondary" onClick={clearFilters}>Limpar</Button>
            <Button className="primary" onClick={() => setIsDropdownOpen(false)}>Aplicar</Button>
          </ButtonGroup>
        </DropdownContent>
      </Dropdown>
    </SearchWrapper>
  );
};

export default SearchInput;