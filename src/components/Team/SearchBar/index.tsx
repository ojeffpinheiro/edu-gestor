import React, { useState, useEffect, useMemo } from 'react';
import { FiSearch, FiX, FiFilter } from 'react-icons/fi';
import { StudentFormData } from '../../../utils/types/BasicUser';
import {
  SearchContainer,
  SearchInput,
  ClearButton,
  FiltersButton,
  FiltersPanel,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  FilterOption,
  FilterCheckbox
} from './styles';

interface SearchBarProps {
  students: StudentFormData[];
  onSearchResults: (results: StudentFormData[]) => void;
}

/**
 * Barra de busca e filtros para alunos
 * Permite buscar por nome e filtrar por turma, frequência e necessidades especiais
 * @param {StudentFormData[]} students - Lista completa de alunos
 * @param {function} onSearchResults - Callback com resultados filtrados
 */
const SearchBar: React.FC<SearchBarProps> = ({ students, onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    className: '',
    minAttendance: 0,
    maxAttendance: 100,
    specialNeeds: [] as string[]
  });

  // Todas as turmas disponíveis para filtro
  const availableClasses = useMemo(() => {
    const classes = new Set<string>();
    students.forEach(student => {
      if (student.className) classes.add(student.className);
    });
    return Array.from(classes);
  }, [students]);

  // Todas as necessidades especiais disponíveis
  const availableSpecialNeeds = useMemo(() => {
    const needs = new Set<string>();
    students.forEach(student => {
      if (student.specialNeeds) needs.add(student.specialNeeds);
    });
    return Array.from(needs);
  }, [students]);

  // Aplicar busca e filtros
  useEffect(() => {
    const results = students.filter(student => {
      // Filtro por texto
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtros adicionais
      const matchesClass = !filters.className || student.className === filters.className;
      const matchesAttendance = student.attendance !== undefined && 
        student.attendance >= filters.minAttendance && 
        student.attendance <= filters.maxAttendance;
      const matchesSpecialNeeds = filters.specialNeeds.length === 0 || 
        (student.specialNeeds && filters.specialNeeds.includes(student.specialNeeds));
      
      return matchesSearch && matchesClass && matchesAttendance && matchesSpecialNeeds;
    });

    onSearchResults(results);
  }, [searchTerm, filters, students, onSearchResults]);

  return (
    <SearchContainer>
      <div style={{ position: 'relative', flex: 1 }}>
        <SearchInput
          type="text"
          placeholder="Buscar aluno..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm ? (
          <ClearButton onClick={() => setSearchTerm('')}>
            <FiX size={16} />
          </ClearButton>
        ) : (
          <FiSearch size={18} style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#666'
          }} />
        )}
      </div>

      <FiltersButton 
        active={showFilters}
        onClick={() => setShowFilters(!showFilters)}
      >
        <FiFilter size={16} />
      </FiltersButton>

      {showFilters && (
        <FiltersPanel>
          <FilterGroup>
            <FilterLabel>Turma:</FilterLabel>
            <FilterSelect
              value={filters.className}
              onChange={(e) => setFilters({...filters, className: e.target.value})}
            >
              <FilterOption value="">Todas</FilterOption>
              {availableClasses.map(className => (
                <FilterOption key={className} value={className}>
                  {className}
                </FilterOption>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Frequência:</FilterLabel>
            <div style={{ display: 'flex', gap: '8px' }}>
              <FilterSelect
                value={filters.minAttendance}
                onChange={(e) => setFilters({...filters, minAttendance: Number(e.target.value)})}
              >
                {[0, 25, 50, 75].map(value => (
                  <FilterOption key={`min-${value}`} value={value}>
                    Mín: {value}%
                  </FilterOption>
                ))}
              </FilterSelect>
              <FilterSelect
                value={filters.maxAttendance}
                onChange={(e) => setFilters({...filters, maxAttendance: Number(e.target.value)})}
              >
                {[25, 50, 75, 100].map(value => (
                  <FilterOption key={`max-${value}`} value={value}>
                    Máx: {value}%
                  </FilterOption>
                ))}
              </FilterSelect>
            </div>
          </FilterGroup>

          <FilterGroup>
            <FilterLabel>Necessidades Especiais:</FilterLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {availableSpecialNeeds.map(need => (
                <div key={need}>
                  <FilterCheckbox
                    type="checkbox"
                    id={`need-${need}`}
                    checked={filters.specialNeeds.includes(need)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({...filters, specialNeeds: [...filters.specialNeeds, need]});
                      } else {
                        setFilters({...filters, specialNeeds: filters.specialNeeds.filter(n => n !== need)});
                      }
                    }}
                  />
                  <label htmlFor={`need-${need}`} style={{ marginLeft: '4px' }}>
                    {need}
                  </label>
                </div>
              ))}
            </div>
          </FilterGroup>
        </FiltersPanel>
      )}
    </SearchContainer>
  );
};

export default SearchBar;