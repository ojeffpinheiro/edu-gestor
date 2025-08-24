import React, { useState } from 'react';
import styled from 'styled-components';
import { DifficultyLevelType, QuestionStatus } from '../../types/evaluation/Question';

// Interface para os filtros - deve ser idêntica à usada no QuestionSelector
export interface FilterValues {
  discipline: string;
  difficulty: DifficultyLevelType | '';
  type: string;
  status: QuestionStatus | '';
  dateStart: string;
  dateEnd: string;
}

interface FilterBarProps {
  onFilterChange: (filters: FilterValues) => void;
}

// Estilos (mantidos iguais)
const FilterBarContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const FilterControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 180px;
  flex: 1;
`;

const FilterLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--color-text);
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: var(--color-background-secondary);
  height: 38px;
`;

const DateInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  font-size: 0.875rem;
  height: 38px;
`;

const ActiveFiltersBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f2f5;
`;

const FilterChip = styled.div`
  display: flex;
  align-items: center;
  background-color: #e1f5fe;
  color: #0277bd;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.75rem;
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.5rem;
    padding: 0;
    color: #0277bd;
    
    svg {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
`;

const ClearAllButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  color: #e74c3c;
  display: flex;
  align-items: center;
  padding: 0.25rem 0;
  margin-left: auto;
  
  svg {
    width: 0.875rem;
    height: 0.875rem;
    margin-right: 0.25rem;
  }
`;

// Mapeamento de rótulos para exibição
const FILTER_LABELS = {
  discipline: {
    '': 'Todas',
    'matematica': 'Matemática',
    'portugues': 'Português',
    'ciencias': 'Ciências',
    'historia': 'História',
    'geografia': 'Geografia'
  },
  difficulty: {
    '': 'Todos',
    'easy': 'Fácil',
    'medium': 'Médio',
    'hard': 'Difícil'
  },
  type: {
    '': 'Todos',
    'multipla-escolha': 'Múltipla Escolha',
    'verdadeiro-falso': 'Verdadeiro/Falso',
    'dissertativa': 'Dissertativa'
  },
  status: {
    '': 'Todos',
    'RASCUNHO': 'Rascunho',
    'ATIVO': 'Publicado',
    'INATIVO': 'Arquivado'
  }
};

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  // Estado inicial dos filtros
  const [filters, setFilters] = useState<FilterValues>({
    discipline: '',
    difficulty: 'easy',
    type: '',
    status: '',
    dateStart: '',
    dateEnd: ''
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Atualiza o estado local
    const updatedFilters = {
      ...filters,
      [name]: value
    };
    setFilters(updatedFilters);
    
    // Notifica o componente pai
    onFilterChange(updatedFilters);
  };

  const removeFilter = (filterName: keyof FilterValues) => {
    // Reset do filtro específico
    const updatedFilters = { 
      ...filters, 
      [filterName]: '' 
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearAllFilters = () => {
    // Reset de todos os filtros
    const clearedFilters: FilterValues = {
      discipline: '',
      difficulty: '',
      type: '',
      status: '',
      dateStart: '',
      dateEnd: '',
    };
    
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  // Filtros ativos para exibição nos chips
  const activeFilters = Object.entries(filters).filter(
    ([key, value]) => value !== '' && key !== 'dateStart' && key !== 'dateEnd'
  );

  // Verifica se o intervalo de datas está ativo
  const hasDateRange = filters.dateStart && filters.dateEnd;

  // Função para obter o rótulo correto de um filtro
  const getFilterLabel = (key: string, value: string): string => {
    if (key === 'discipline' && value in FILTER_LABELS.discipline) {
      return FILTER_LABELS.discipline[value as keyof typeof FILTER_LABELS.discipline];
    }
    if (key === 'difficulty' && value in FILTER_LABELS.difficulty) {
      return FILTER_LABELS.difficulty[value as keyof typeof FILTER_LABELS.difficulty];
    }
    if (key === 'type' && value in FILTER_LABELS.type) {
      return FILTER_LABELS.type[value as keyof typeof FILTER_LABELS.type];
    }
    if (key === 'status' && value in FILTER_LABELS.status) {
      return FILTER_LABELS.status[value as keyof typeof FILTER_LABELS.status];
    }
    return value;
  };

  return (
    <FilterBarContainer>
      <FilterControls>
        <FilterGroup>
          <FilterLabel>Disciplina</FilterLabel>
          <Select
            name="discipline"
            value={filters.discipline}
            onChange={handleFilterChange}
          >
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
          <Select
            name="difficulty"
            value={filters.difficulty}
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Difícil</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Tipo de Questão</FilterLabel>
          <Select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="multipla-escolha">Múltipla Escolha</option>
            <option value="verdadeiro-falso">Verdadeiro/Falso</option>
            <option value="dissertativa">Dissertativa</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Status</FilterLabel>
          <Select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="RASCUNHO">Rascunho</option>
            <option value="ATIVO">Publicado</option>
            <option value="INATIVO">Arquivado</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Data Inicial</FilterLabel>
          <DateInput
            type="date"
            name="dateStart"
            value={filters.dateStart}
            onChange={handleFilterChange}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Data Final</FilterLabel>
          <DateInput
            type="date"
            name="dateEnd"
            value={filters.dateEnd}
            onChange={handleFilterChange}
          />
        </FilterGroup>
      </FilterControls>

      {/* Exibe filtros ativos */}
      {(activeFilters.length > 0 || hasDateRange) && (
        <ActiveFiltersBar>
          {activeFilters.map(([key, value]) => (
            <FilterChip key={key}>
              {getFilterLabel(key, value)}
              <button onClick={() => removeFilter(key as keyof FilterValues)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </FilterChip>
          ))}

          {hasDateRange && (
            <FilterChip>
              De {filters.dateStart} até {filters.dateEnd}
              <button onClick={() => {
                removeFilter('dateStart');
                removeFilter('dateEnd');
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </FilterChip>
          )}

          <ClearAllButton onClick={clearAllFilters}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Limpar Filtros
          </ClearAllButton>
        </ActiveFiltersBar>
      )}
    </FilterBarContainer>
  );
};

export default FilterBar;