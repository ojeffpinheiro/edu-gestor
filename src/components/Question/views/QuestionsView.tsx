import React, { useState } from 'react';
import { SortControls } from '../../Sort/SortControls';
import { QuestionsGrid } from '../../../styles/questionList';
import QuestionCard from '../QuestionCard';
import Filters from '../Filter/Filters';
import { Category } from '../QuestionForm/type';

interface QuestionsViewProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (value: string) => void;
    selectedDifficulty: string;
    onDifficultyChange: (value: string) => void;
    questions: Array<any>;
    sortOptions: Array<any>;
    sortField: string;
    sortDirection: 'asc' | 'desc';
    onSortChange: (field: string, direction: 'asc' | 'desc') => void;
}

const QuestionsView: React.FC<QuestionsViewProps> = ({
    searchTerm,
    onSearchChange,
    categories,
    selectedCategory,
    onCategoryChange,
    selectedDifficulty,
    onDifficultyChange,
    questions,
    sortOptions,
    sortField,
    sortDirection,
    onSortChange
}) => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const difficultyOptions = [
        { value: 'easy', label: 'Fácil' },
        { value: 'medium', label: 'Médio' },
        { value: 'hard', label: 'Difícil' }
    ];
    const categoryOptions = [
        { value: 'math', label: 'Matemática' },
        { value: 'science', label: 'Ciências' }
    ];

    return (
        <>
            <Filters
                searchValue={searchTerm}
                onSearchChange={onSearchChange}
                categoryOptions={categoryOptions}
                difficultyOptions={difficultyOptions}
                selectedCategory={selectedCategory}
                selectedDifficulty={selectedDifficulty}
                onCategoryChange={onCategoryChange}
                onDifficultyChange={onDifficultyChange}
                showAdvanced={showAdvanced}
                onAdvancedToggle={() => setShowAdvanced(!showAdvanced)}
            />

            <QuestionsGrid>
                <SortControls
                    options={sortOptions}
                    value={sortField}
                    direction={sortDirection}
                    onChange={() => onSortChange(sortField, sortDirection)}
                    variant="dropdown"
                />

                {questions.map(question => (
                    <QuestionCard
                        key={question.id}
                        question={question}
                        onView={() => console.log('Visualizar')}
                        onEdit={() => console.log('Editar')}
                        onDelete={() => console.log('Excluir')}
                        onTagClick={(tag) => console.log('Tag clicada:', tag)}
                    />
                ))}
            </QuestionsGrid>
        </>
    );
};

export default QuestionsView;