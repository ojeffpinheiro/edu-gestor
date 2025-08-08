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
import { QuestionType } from '../../../utils/types/Question';

const Filters = ({
  searchValue,
  className,
  categoryOptions,
  difficultyOptions,
  selectedCategory,
  selectedDifficulty,
  showAdvanced = false,
  onCategoryChange,
  onDifficultyChange,
  onQuestionTypeFilter,
  onSearchChange,
  onAdvancedToggle,
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

          <FilterGroup label="Tipo de Questão">
            <FilterSelect onChange={(e) => onQuestionTypeFilter(e.target.value as QuestionType)}>
              <option value="all">Todos</option>
              <option value="multiple_choice">Múltipla Escolha</option>
              <option value="true_false">Verdadeiro/Falso</option>
              <option value="essay">Dissertativa</option>
              <option value="fill_in_the_blank">Preenchimento</option>
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