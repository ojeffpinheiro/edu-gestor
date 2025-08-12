import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Input } from '../../styles/inputs';

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
  
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const DropdownButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #7f8c8d;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const Dropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: var(--color-background-secondary);
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 250px;
  z-index: 10;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DropdownHeader = styled.div`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e1e4e8;
  font-weight: 500;
  font-size: 0.875rem;
`;

const DropdownContent = styled.div`
  padding: 1rem;
`;

const FilterGroup = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--color-text);
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: var(--color-background-secondary);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &.primary {
    background-color: #3498db;
    color: white;
    border: none;
    
    &:hover {
      background-color: #2980b9;
    }
  }
  
  &.secondary {
    background-color: var(--color-background-secondary);
    color: var(--color-text);
    border: 1px solid #e1e4e8;
    
    &:hover {
      background-color: var(--color-secondary-hover);
      }
    }
  }
`;

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (searchTerm: string,
    filters: { disciplina: string; dificuldade: string; tipo: string; }) => void;
}

const SearchInput = ({ placeholder = 'Buscar...', onSearch }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filters, setFilters] = useState({
    disciplina: '',
    dificuldade: '',
    tipo: ''
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Implement debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch && searchTerm) {
        onSearch(searchTerm, filters);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, filters, onSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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