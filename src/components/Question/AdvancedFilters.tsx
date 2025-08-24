import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { CategoryWithId } from './QuestionForm/type';
import { FilterOptions } from '../../types/evaluation/Question';

import RangeSlider from '../../styles/RangeSlider';
import { MultiSelect } from '../shared/MultiSelect';
import { Button } from '../shared/Button.styles';

interface AdvancedFiltersProps {
  categories: CategoryWithId[];
  filters: FilterOptions;
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
  onApply: () => void;
  onReset?: () => void;
}

const Container = styled.div`
  background: var(--color-background-secondary);
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  color: var(--color-text-secondary);
`;

const FilterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  categories,
  filters,
  onFiltersChange,
  onApply,
  onReset,
}) => {
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

  return (
    <Container>
      <FilterGrid>
        <FilterSection>
          <FilterLabel>Período de Criação</FilterLabel>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <DatePicker
              selected={filters.createdAtRange?.[0] ? new Date(filters.createdAtRange[0]) : undefined}
              onChange={(date: Date | null) => handleDateChange('start', date)}
              placeholderText="Data inicial"
              selectsStart
              startDate={filters.createdAtRange?.[0] ? new Date(filters.createdAtRange[0]) : undefined}
              endDate={filters.createdAtRange?.[1] ? new Date(filters.createdAtRange[1]) : undefined}
            />
            <DatePicker
              selected={filters.createdAtRange?.[1] ? new Date(filters.createdAtRange[1]) : undefined}
              onChange={(date: Date | null) => handleDateChange('end', date)}
              placeholderText="Data final"
              selectsEnd
              startDate={filters.createdAtRange?.[0] ? new Date(filters.createdAtRange[0]) : undefined}
              endDate={filters.createdAtRange?.[1] ? new Date(filters.createdAtRange[1]) : undefined}
              minDate={filters.createdAtRange?.[0] ? new Date(filters.createdAtRange[0]) : undefined}
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
            selectedValues={filters.disciplines || filters.discipline || []}
            onChange={(selected) => onFiltersChange({ disciplines: selected })}
            placeholder="Selecione disciplinas..."
          />
        </FilterSection>

        <FilterSection>
          <FilterLabel>Disciplinas</FilterLabel>
          <MultiSelect
            options={Array.from(new Set(categories.map(c => (c as any).discipline || c.name))).map(d => ({
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
        <Button $variant="primary" $size="md" $active={false}>Limpar Filtros</Button>	
        <Button $variant="primary" $size="md" $active={true}>Aplicar Filtros</Button>	
      </FilterActions>
    </Container>
  );
};