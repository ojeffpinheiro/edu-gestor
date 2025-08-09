import React, { useState } from 'react';
import { Category } from './QuestionForm/type';
import { FilterOptions, SavedFilter } from '../../utils/types/Question';
import RangeSlider from '../../styles/RangeSlider';
import MultiSelect from '../shared/MultiSelect';
import styled from 'styled-components';

interface AdvancedFiltersProps {
  categories: Category[];
  onApply: (filters: Partial<FilterOptions>) => void;
  savedFilters?: SavedFilter[];
  onSaveFilter?: (name: string) => void;
}


const Container = styled.div`
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
`;

const FilterSection = styled.div`
  margin-bottom: 1rem;
`;

const FilterActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
`;

const SaveFilter = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SavedFilters = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background: #e0e0e0;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  categories,
  onApply,
  savedFilters = [],
  onSaveFilter
}) => {
  const [isApplying, setIsApplying] = useState(false);
  const [filterError, setFilterError] = useState('');
  const [filters, setFilters] = useState<Partial<FilterOptions>>({});
  const [filterName, setFilterName] = useState('');
  
  const handleApply = async () => {
    setIsApplying(true);
    try {
      await onApply(filters);
    } finally {
      setIsApplying(false);
    }
  };

  const handleSaveFilter = () => {
    if (!filterName.trim()) {
      setFilterError('Nome do filtro é obrigatório');
      return;
    }
    if (savedFilters.some(f => f.name === filterName)) {
      setFilterError('Já existe um filtro com este nome');
      return;
    }
    onSaveFilter?.(filterName);
    setFilterName('');
    setFilterError('');
  };

  return (
    <Container>
      <FilterSection>
        <h4>Categorias</h4>
        <MultiSelect
          options={categories.map(c => ({ value: c.i, label: c.name }))}
          onChange={(selected: string[]) => setFilters({ ...filters, categories: selected })}
        />
      </FilterSection>

      <FilterSection>
        <h4>Dificuldade</h4>
        <MultiSelect
          options={[
            { value: 'easy', label: 'Fácil' },
            { value: 'medium', label: 'Médio' },
            { value: 'hard', label: 'Difícil' }
          ]}
          onChange={(selected: string[]) => setFilters({ ...filters, difficulties: selected as ('easy' | 'medium' | 'hard')[] })}
        />
      </FilterSection>

      <FilterSection>
        <h4>Avaliação</h4>
        <RangeSlider
          min={0}
          max={5}
          value={filters.ratingRange || [0, 5]}
          onChange={(range: [number, number]) => setFilters({ ...filters, ratingRange: range })}
        />
      </FilterSection>

      <FilterActions>
        <Button onClick={handleApply}>Aplicar Filtros</Button>

        <SaveFilter>
          <Input
            type="text"
            placeholder="Nome do filtro"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
          <Button
            onClick={handleSaveFilter}
            disabled={!filterName}
          >
            Salvar
          </Button>
        </SaveFilter>

        {savedFilters.length > 0 && (
          <SavedFilters>
            <h4>Filtros Salvos</h4>
            {savedFilters.map(filter => (
              <Button
                key={filter.id}
                onClick={() => onApply(filter.filters)}
              >
                {filter.name}
              </Button>
            ))}
          </SavedFilters>
        )}
      </FilterActions>
    </Container>
  );
};