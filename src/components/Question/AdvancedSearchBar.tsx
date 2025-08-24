import React, { useState } from 'react';
import { AdvancedFilters } from './AdvancedFilters';
import { CategoryWithId } from './QuestionForm/type';
import { SavedFilter, FilterOptions } from '../../types/evaluation/Question';

// Definindo valores padrão para FilterOptions
const defaultFilters: FilterOptions = {
  searchTerm: '',
  categories: [],
  difficulties: [],
  types: [],
  disciplines: [],
  ratingRange: [0, 5],
  createdAtRange: ['', ''],
  tags: []
};

interface AdvancedSearchBarProps {
  categories: CategoryWithId[];
  savedFilters: SavedFilter[];
  onApplyFilters: (filters: FilterOptions) => void;
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
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>(defaultFilters);

  const handleApply = () => {
    // Combina o termo de busca com os filtros atuais
    const filtersToApply: FilterOptions = {
      ...currentFilters,
      searchTerm: searchTerm
    };
    onApplyFilters(filtersToApply);
  };

  const handleFiltersChange = (filters: Partial<FilterOptions>) => {
    setCurrentFilters(prev => ({
      ...prev,
      ...filters
    }));
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar questões..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleFiltersChange({ searchTerm: e.target.value });
          }}
        />
        <button onClick={() => setShowAdvanced(!showAdvanced)}>
          {showAdvanced ? 'Filtrar ▲' : 'Filtrar ▼'}
        </button>
      </div>
      
      {showAdvanced && (
        <AdvancedFilters
          categories={categories}
          filters={currentFilters}
          onFiltersChange={handleFiltersChange}
          onApply={handleApply}
        />
      )}
    </div>
  );
};