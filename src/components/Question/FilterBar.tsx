import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch, FiChevronDown, FiX, FiFilter } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import RangeSlider from '../../styles/RangeSlider';
import { MultiSelect } from '../shared/MultiSelect';
import { QuestionStatus, QuestionType } from '../../types/evaluation/Question';
import { CategoryWithId } from './QuestionForm/type';
import { constants } from '../../utils/consts';

interface FilterBarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSearchSubmit: () => void;
    categoryOptions: Array<{ value: string; label: string }>;
    difficultyOptions: Array<{ value: string; label: string }>;
    selectedCategory: string;
    selectedDifficulty: string;
    currentType: QuestionType | 'all';
    categories: CategoryWithId[];
    filters: any;
    onFiltersChange: (updates: any) => void;
    onQuestionTypeFilter: (type: QuestionType | 'all') => void;
    onCategoryChange: (value: string) => void;
    onDifficultyChange: (value: string) => void;
    onApplyFilters: () => void;
    onResetFilters: () => void;
    sortOptions: Array<{ value: string; label: string }>;
    sortField: string;
    sortDirection: 'asc' | 'desc';
    onSortChange: (field: string, direction: 'asc' | 'desc') => void;
    totalQuestions: number;
    itemsPerPage: number;
    onItemsPerPageChange: (value: number) => void;
    questionStatus: QuestionStatus;
    onStatusChange: (status: QuestionStatus) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background: ${constants.colors.background.main};
  border-radius: ${constants.borderRadius.md};
  padding: ${constants.spacing.md};
  box-shadow: ${constants.shadows.sm};
`;

const SearchRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SearchContainer = styled.div`
  flex: 1;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid ${constants.colors.border.main};
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const SearchButton = styled.button`
  padding: ${constants.spacing.sm} ${constants.spacing.md};
  background: ${constants.colors.primary};
  color: ${constants.colors.text.onPrimary};
  border: none;
  border-radius: ${constants.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all ${constants.transitions.fast};

  &:hover {
    background: ${constants.colors.primaryHover};
  }
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const ToggleFiltersButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${constants.colors.background.third};
  border: 1px solid ${constants.colors.border.main};
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:hover {
    background: var(--color-secondary-active);
  }
`;

const SelectContainer = styled.div<{ $visible: boolean }>`
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
  min-width: 200px;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid ${constants.colors.border.main};
  border-radius: 4px;
  font-size: 0.875rem;
`;

const Divider = styled.div`
  height: 1px;
  background: ${constants.colors.border.light};
  margin: 0.5rem 0;
`;

const AppliedFiltersRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const AppliedFilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: var(--color-secondary);
  border-radius: 16px;
  font-size: 0.875rem;
`;

const RemoveFilterButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

const FilterActionButton = styled.button`
  padding: 0.25rem 0.75rem;
  background: none;
  border: 1px solid ${constants.colors.border.main};
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${constants.colors.background.third};
  }
`;

const ResultsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ResultsCount = styled.div`
  font-size: 0.875rem;
  color: #666;
`;

const PaginationControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

const AdvancedFiltersContainer = styled.div`
  background: ${constants.colors.background.secondary};
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  font-size: 0.875rem;
  color: #666;
`;

const FilterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  padding: 0.5rem 1rem;
  background: ${({ $primary }) => ($primary 
    ? `${constants.colors.primary}` 
    : `${constants.colors.background.third}`)};
  color: ${({ $primary }) => ($primary 
    ? '' 
    : `${constants.colors.text.main}`)};
  border: 1px solid ${({ $primary }) => ($primary 
    ? `${constants.colors.primary}` 
    : `${constants.colors.border.main};` )};
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ $primary }) => ($primary 
        ? `${constants.colors.primaryHover}` 
        : `${constants.colors.primary}`)};
  }
`;

const FilterBar: React.FC<FilterBarProps> = ({
    searchValue,
    onSearchChange,
    onSearchSubmit,
    categoryOptions,
    difficultyOptions,
    selectedCategory,
    selectedDifficulty,
    currentType,
    categories,
    filters,
    onFiltersChange,
    onQuestionTypeFilter,
    onCategoryChange,
    onDifficultyChange,
    onApplyFilters,
    onResetFilters,
    sortOptions,
    sortField,
    sortDirection,
    onSortChange,
    totalQuestions,
    itemsPerPage,
    onItemsPerPageChange,
    questionStatus,
    onStatusChange,
}) => {
    const [showBasicFilters, setShowBasicFilters] = useState(false);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

    const handleDateChange = (type: 'start' | 'end', date: Date | null) => {
        const newDateRange = [...(filters.createdAtRange || ['', ''])] as [string, string];
        if (type === 'start') {
            newDateRange[0] = date ? date.toISOString() : '';
        } else {
            newDateRange[1] = date ? date.toISOString() : '';
        }
        onFiltersChange({ createdAtRange: newDateRange });
    };

    const handleRatingChange = (range: [number, number]) => {
        onFiltersChange({ ratingRange: range });
    };

    const appliedFilters = [
        selectedCategory !== 'all' && `Categoria: ${categoryOptions.find(c => c.value === selectedCategory)?.label}`,
        selectedDifficulty !== 'all' && `Dificuldade: ${difficultyOptions.find(d => d.value === selectedDifficulty)?.label}`,
        currentType !== 'all' && `Tipo: ${currentType}`,
        questionStatus && `Status: ${questionStatus}`,
        filters.createdAtRange?.[0] && `Data inicial: ${new Date(filters.createdAtRange[0]).toLocaleDateString()}`,
        filters.createdAtRange?.[1] && `Data final: ${new Date(filters.createdAtRange[1]).toLocaleDateString()}`,
        filters.ratingRange && `Avaliação: ${filters.ratingRange[0]} - ${filters.ratingRange[1]}`,
    ].filter(Boolean);

    return (
        <Container>
            <SearchRow>
                <SearchContainer>
                    <SearchIcon />
                    <SearchInput
                        type="text"
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar questões..."
                        onKeyPress={(e) => e.key === 'Enter' && onSearchSubmit()}
                    />
                </SearchContainer>
                <SearchButton onClick={onSearchSubmit}>
                    <FiSearch size={16} /> Buscar
                </SearchButton>
            </SearchRow>

            <FiltersRow>
                <ToggleFiltersButton onClick={() => setShowBasicFilters(!showBasicFilters)}>
                    <FiFilter size={14} />
                    {showBasicFilters ? 'Ocultar filtros' : 'Mostrar filtros'}
                    <FiChevronDown size={14} />
                </ToggleFiltersButton>

                <SelectContainer $visible={showBasicFilters}>
                    <Select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
                        <option value="all">Todas categorias</option>
                        {categoryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                </SelectContainer>

                <SelectContainer $visible={showBasicFilters}>
                    <Select value={selectedDifficulty} onChange={(e) => onDifficultyChange(e.target.value)}>
                        <option value="all">Todas dificuldades</option>
                        {difficultyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                </SelectContainer>

                <SelectContainer $visible={showBasicFilters}>
                    <Select value={currentType} onChange={(e) => onQuestionTypeFilter(e.target.value as QuestionType | 'all')}>
                        <option value="all">Todos tipos</option>
                        <option value="multiple_choice">Múltipla escolha</option>
                        <option value="true_false">Verdadeiro/Falso</option>
                        <option value="essay">Dissertativa</option>
                        <option value="fill_in_the_blank">Preenchimento</option>
                    </Select>
                </SelectContainer>

                <SelectContainer $visible={showBasicFilters}>
                    <Select value={questionStatus} onChange={(e) => onStatusChange(e.target.value as QuestionStatus)}>
                        <option value="draft">Rascunho</option>
                        <option value="published">Publicado</option>
                        <option value="inactive">Inativo</option>
                    </Select>
                </SelectContainer>

                <ToggleFiltersButton onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
                    <FiFilter size={14} />
                    {showAdvancedFilters ? 'Ocultar avançados' : 'Filtros avançados'}
                    <FiChevronDown size={14} />
                </ToggleFiltersButton>
            </FiltersRow>

            {showAdvancedFilters && (
                <AdvancedFiltersContainer>
                    <FilterGrid>
                        <FilterSection>
                            <FilterLabel>Período de Criação</FilterLabel>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <DatePicker
                                    selected={filters.createdAtRange?.[0] ? new Date(filters.createdAtRange[0]) : null}
                                    onChange={(date: Date | null) => handleDateChange('start', date)}
                                    placeholderText="Data inicial"
                                    selectsStart
                                    startDate={filters.createdAtRange?.[0] ? new Date(filters.createdAtRange[0]) : null}
                                    endDate={filters.createdAtRange?.[1] ? new Date(filters.createdAtRange[1]) : null}
                                />

                                <DatePicker
                                    selected={filters.createdAtRange?.[0] ? new Date(filters.createdAtRange[0]) : null}
                                    onChange={(date: Date | null) => handleDateChange('start', date)}
                                    placeholderText="Data inicial"
                                    selectsStart
                                    startDate={filters.createdAtRange?.[0] ? new Date(filters.createdAtRange[0]) : null}
                                    endDate={filters.createdAtRange?.[1] ? new Date(filters.createdAtRange[1]) : null}
                                />
                            </div>
                        </FilterSection>

                        <FilterSection>
                            <FilterLabel>Avaliação (0-5)</FilterLabel>
                            <RangeSlider
                                min={0}
                                max={5}
                                value={filters.ratingRange || [0, 5]}
                                onChange={handleRatingChange}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{filters.ratingRange?.[0]?.toFixed(1) || 0}</span>
                                <span>{filters.ratingRange?.[1]?.toFixed(1) || 5}</span>
                            </div>
                        </FilterSection>

                        <FilterSection>
                            <FilterLabel>Tags</FilterLabel>
                            <MultiSelect
                                options={categories.map(c => ({
                                    value: c.id,
                                    label: c.name,
                                }))}
                                selectedValues={filters.tags || []}
                                onChange={(selected) => onFiltersChange({ tags: selected })}
                                placeholder="Selecione tags..."
                            />
                        </FilterSection>

                        <FilterSection>
                            <FilterLabel>Disciplinas</FilterLabel>
                            <MultiSelect
                                options={Array.from(
                                    new Set(
                                        categories.map((c) => (c as any).discipline || c.name)
                                    )
                                ).map((d) => ({
                                    value: d,
                                    label: d,
                                }))}
                                selectedValues={filters.disciplines || []}
                                onChange={(selected) => onFiltersChange({ disciplines: selected })}
                                placeholder="Selecione disciplinas..."
                            />
                        </FilterSection>
                    </FilterGrid>

                    <FilterActions>
                        <ActionButton onClick={onResetFilters}>Limpar Filtros</ActionButton>
                        <ActionButton $primary onClick={onApplyFilters}>Aplicar Filtros</ActionButton>
                    </FilterActions>
                </AdvancedFiltersContainer>
            )}

            {appliedFilters.length > 0 && (
                <>
                    <Divider />
                    <AppliedFiltersRow>
                        <span>Filtros aplicados:</span>
                        {appliedFilters.map((filter, index) => (
                            <AppliedFilterTag key={index}>
                                {filter}
                                <RemoveFilterButton onClick={() => { }}>
                                    <FiX size={14} />
                                </RemoveFilterButton>
                            </AppliedFilterTag>
                        ))}
                        <FilterActionButton onClick={onResetFilters}>Limpar todos</FilterActionButton>
                        <FilterActionButton onClick={onApplyFilters}>Filtrar</FilterActionButton>
                    </AppliedFiltersRow>
                </>
            )}

            <Divider />
            <ResultsRow>
                <ResultsCount>{totalQuestions} questões encontradas</ResultsCount>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <PaginationControl>
                        <span>Questões por página:</span>
                        <Select
                            value={itemsPerPage}
                            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                            style={{ width: '80px' }}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </Select>
                    </PaginationControl>

                    <PaginationControl>
                        <span>Ordenar por:</span>
                        <Select
                            value={sortField}
                            onChange={(e) => onSortChange(e.target.value, sortDirection)}
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                        <Select
                            value={sortDirection}
                            onChange={(e) => onSortChange(sortField, e.target.value as 'asc' | 'desc')}
                        >
                            <option value="asc">Crescente</option>
                            <option value="desc">Decrescente</option>
                        </Select>
                    </PaginationControl>
                </div>
            </ResultsRow>
        </Container>
    );
};

export default FilterBar;