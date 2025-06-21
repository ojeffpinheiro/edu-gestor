import React, { useState } from 'react'
import { Content, DifficultyLevelType, Filter, QuestionStatus, QuestionType } from '../../../../utils/types/Question';
import { Select } from '../../../../styles/inputs';
import { Button } from '../../../../styles/buttons';
interface FiltersPanelProps {
  filters: Filter;
  onApply: (filters: Filter) => void;
  contents?: Content[];
  allTags: string[];
  allDifficulties: DifficultyLevelType[];
  allQuestionTypes: QuestionType[];
  allStatuses: QuestionStatus[];
  onFilterChange?: (filterName: keyof Filter, value: any) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filters: initialFilters,
  onApply,
  contents = [],
  allTags,
  allDifficulties,
  allQuestionTypes,
  allStatuses
}) => {
  const [filters, setFilters] = useState<Filter>(initialFilters);

  const handleFilterChange = (filterName: keyof Filter, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleApply = () => {
    onApply(filters);
  };

  return (
    <div className="filters-panel">
      {contents.length > 0 && (
        <div className="filter-group">
          <label>Conteúdo</label>
          <select
            value={filters.contentId || ''}
            onChange={(e) => handleFilterChange('contentId', e.target.value)}
          >
            <option value="">Todos</option>
            {contents.map((c: Content) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      )}
      
      <Select
        value={filters.contentId}
        onChange={(e) => 
          setFilters({...filters, contentId: e.target.value})
        }
      >
        <option value="">Todos conteúdos</option>
        {contents.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Select>

      <Select
        value={filters.difficulty}
        onChange={(e) => 
          setFilters({
            ...filters, 
            difficulty: e.target.value as Filter['difficulty']
          })
        }
      >
        <option value="">Todas dificuldades</option>
        <option value="easy">Fácil</option>
        <option value="medium">Médio</option>
        <option value="hard">Difícil</option>
      </Select>

      <Button onClick={handleApply}>Aplicar Filtros</Button>
    </div>
  );
};

export default FiltersPanel;