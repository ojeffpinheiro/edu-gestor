import React, { useState } from 'react'
import { Select } from "../../../styles/inputs";
import { Content, Filters } from '../../../utils/types/Question';
import { Button } from '../../../styles/buttons';

interface FiltersPanelProps {
  contents: Content[];
  onApply: (filters: Filters) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({ contents, onApply }) => {
  const [filters, setFilters] = useState<Filters>({
    contentId: '',
    difficulty: 'easy'
  });

  const handleApply = () => {
    onApply(filters);
  };

  return (
    <div className="filters-panel">
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
            difficulty: e.target.value as Filters['difficulty']
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