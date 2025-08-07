import React from 'react';
import { FiFilter } from 'react-icons/fi';
import {
  FiltersContainer,
  FiltersHeader,
  FiltersTitle,
  FiltersContent,
  FiltersGrid,
  FilterSelect,
  AdvancedFiltersButton
} from './styles';
import { FiltersProps } from './types';
import { SearchBar } from '../../shared/SearchBar';
import FilterGroup from './FilterGroup';

const Filters = ({
  searchValue,
  onSearchChange,
  categoryOptions,
  difficultyOptions,
  selectedCategory,
  selectedDifficulty,
  onCategoryChange,
  onDifficultyChange,
  showAdvanced = false,
  onAdvancedToggle,
  className
}: FiltersProps) => {
  return (
    <FiltersContainer className={className}>
      <FiltersHeader>
        <FiltersTitle>
          <FiFilter /> Filtros e Busca
        </FiltersTitle>
      </FiltersHeader>

      <FiltersContent>
        <FiltersGrid>
          <FilterGroup label="Buscar">
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              placeholder="Buscar questões..."
            />
          </FilterGroup>

          <FilterGroup label="Categoria">
            <FilterSelect
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup label="Dificuldade">
            <FilterSelect
              value={selectedDifficulty}
              onChange={(e) => onDifficultyChange(e.target.value)}
            >
              <option value="">Todas as dificuldades</option>
              {difficultyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup label=" ">
            <AdvancedFiltersButton onClick={onAdvancedToggle}>
              <FiFilter /> Filtros Avançados
            </AdvancedFiltersButton>
          </FilterGroup>
        </FiltersGrid>
      </FiltersContent>
    </FiltersContainer>
  );
};

export default Filters;