import React, { useState } from 'react';
import { CategoryWithId } from './QuestionForm/type';
import { QuestionType } from '../../utils/types/Question';
import Filters from './Filter/Filters';
import { AdvancedFilters } from './AdvancedFilters';
import styled from 'styled-components';

interface FilterBarProps {
    // Props para Filters
    searchValue: string;
    onSearchChange: (value: string) => void;
    categoryOptions: Array<{ value: string; label: string }>;
    difficultyOptions: Array<{ value: string; label: string }>;
    selectedCategory: string;
    selectedDifficulty: string;
    onCategoryChange: (value: string) => void;
    onDifficultyChange: (value: string) => void;

    // Props para AdvancedFilters
    categories: CategoryWithId[];
    filters: any; // Substituir pelo tipo específico dos filtros
    onFiltersChange: (updates: any) => void;
    onApplyAdvancedFilters: () => void;
    onResetAdvancedFilters: () => void;

    // Props para QuestionTypeFilter
    currentType: QuestionType | 'all';
    onQuestionTypeFilter: (type: QuestionType | 'all') => void;


}

const FilterBar: React.FC<FilterBarProps> = ({
    searchValue,
    categoryOptions,
    difficultyOptions,
    selectedCategory,
    selectedDifficulty,
    currentType,
    categories,
    filters,
    onSearchChange,
    onCategoryChange,
    onDifficultyChange,
    onFiltersChange,
    onApplyAdvancedFilters,
    onResetAdvancedFilters,
    onQuestionTypeFilter,
}) => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    return (
        <Container>
            <Main>
                <Filters
                    searchValue={searchValue}
                    onSearchChange={onSearchChange}
                    categoryOptions={categoryOptions}
                    difficultyOptions={difficultyOptions}
                    showAdvanced={showAdvanced}
                    onAdvancedToggle={() => setShowAdvanced(!showAdvanced)}
                    selectedCategory={selectedCategory}
                    selectedDifficulty={selectedDifficulty}
                    onCategoryChange={onCategoryChange}
                    onDifficultyChange={onDifficultyChange}
                    onQuestionTypeFilter={onQuestionTypeFilter}
                />
                {showAdvanced && (
                    <AdvancedSection>
                        <AdvancedFilters
                            categories={categories}
                            filters={filters}
                            onFiltersChange={onFiltersChange}
                            onApply={onApplyAdvancedFilters}
                            onReset={onResetAdvancedFilters}
                        />
                    </AdvancedSection>
                )}
            </Main>
        </Container>
    );
};

export default FilterBar;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
`;

const Main = styled.div`
    align-items: flex-end;
`;

const AdvancedSection = styled.div`
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
`