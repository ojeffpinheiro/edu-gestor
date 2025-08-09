import React, { useState } from 'react';
import { AdvancedFilters } from './AdvancedFilters';
import { Category } from './QuestionForm/type';
import { SavedFilter } from '../../utils/types/Question';

interface AdvancedSearchBarProps {
  categories: Category[];
  savedFilters: SavedFilter[];
  onApplyFilters: (filters: any) => void;
  onSaveFilter: (name: string) => void;
}

export const AdvancedSearchBar: React.FC<AdvancedSearchBarProps> = ({
  categories,
  savedFilters,
  onApplyFilters,
  onSaveFilter
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar questões..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setShowAdvanced(!showAdvanced)}>
          {showAdvanced ? 'Filtrar ▲' : 'Filtrar ▼'}
        </button>
      </div>
      
      {showAdvanced && (
        <AdvancedFilters
          categories={categories}
          onApply={onApplyFilters}
          savedFilters={savedFilters}
          onSaveFilter={onSaveFilter}
        />
      )}
    </div>
  );
};