import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useQuestionFilters } from '../../../hooks/useQuestionFilters';
import { useQuestionSelection } from '../../../hooks/useQuestionSelection';

import { Question, QuestionBack, QuestionType } from '../../../utils/types/Question';

import { SortControls } from '../../Sort/SortControls';

import Filters from '../Filter/Filters';

import QuestionCard from '../QuestionCard';
import QuestionsTable from '../QuestionsTable';
import CombineQuestionsModal from '../CombineQuestionsModal';
import QuestionViewModeToggle from '../QuestionView/QuestionViewModeToggle';
import QuestionDetailModal from '../QuestionView/QuestionDetailModal';
import { QuestionsGrid } from '../../../styles/questionList';
import { useQuestionSort } from '../../../hooks/useQuestionSort';
import { CategoryWithId } from '../QuestionForm/type';

// Função para converter QuestionBack para Question
const convertQuestionBackToQuestion = (questionBack: QuestionBack): Question => {
    const id = typeof questionBack.id === 'number' ? questionBack.id.toString() : questionBack.id;

    return {
        ...questionBack,
        id,
        contentId: id,
        statement: questionBack.content,
        questionType: questionBack.type as QuestionType,
        difficultyLevel: questionBack.difficulty,
        discipline: questionBack.category || '',
        alternatives: [],
        explanation: questionBack.explanation || '',
        createdAt: questionBack.createdAt,
        updatedAt: questionBack.lastUsed || questionBack.createdAt,
        status: 'active',
        correctAnswers: questionBack.correctAnswers?.[0],
    };
};

interface QuestionsViewProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    categories: CategoryWithId[]; // Usa a interface atualizada
    selectedCategory: string;
    onCategoryChange: (value: string) => void;
    selectedDifficulty: string;
    onDifficultyChange: (value: string) => void;
    questions: QuestionBack[];
    sortOptions: { value: string; label: string }[];
    sortField: string;
    sortDirection: 'asc' | 'desc';
    onSortChange: (field: string, direction: 'asc' | 'desc') => void;
    onFindSimilar?: (questionId: string | number) => void;
}

const QuestionsView: React.FC<QuestionsViewProps> = ({
    searchTerm,
    questions: questionBacks,
    sortOptions,
    sortField,
    sortDirection,
    categories,
    selectedCategory,
    selectedDifficulty,
    onSearchChange,
    onCategoryChange,
    onDifficultyChange,
    onSortChange,
}) => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [showCombineModal, setShowCombineModal] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());
    // Converter QuestionBack[] para Question[]
    const questions = useMemo(() =>
        questionBacks.map(convertQuestionBackToQuestion),
        [questionBacks]
    );

    const {
        setActiveFilters,
        filteredQuestions
    } = useQuestionFilters({
        questions,
        initialFilters: {
            searchTerm: searchTerm,
            categories: selectedCategory !== 'all' ? [selectedCategory] : [],
            difficulties: selectedDifficulty !== 'all' ? [selectedDifficulty as 'easy' | 'medium' | 'hard'] : []
        }
    });

    const {
        sortField: currentSortField,
        sortDirection: currentSortDirection,
        handleSortChange,
        sortQuestions
    } = useQuestionSort({
        initialField: sortField,
        initialDirection: sortDirection,
        sortOptions
    });

    const {
        clearSelection,
    } = useQuestionSelection({
        availableQuestions: questions,
        selectedQuestions: Array.from(selectedQuestions)
            .map(id => questions.find(q => q.id === id))
            .filter(Boolean) as Question[],

        onQuestionsSelected: (selected) => {
            setSelectedQuestions(new Set(selected.filter(q => q && q.id !== undefined).map(q => q.id ? q.id.toString() : '')));
        }
    });

    useEffect(() => {
        setActiveFilters({
            searchTerm: searchTerm,
            categories: selectedCategory !== 'all' ? [selectedCategory] : [],
            difficulties: selectedDifficulty !== 'all' ? [selectedDifficulty as 'easy' | 'medium' | 'hard'] : []
        });
    }, [searchTerm, selectedCategory, selectedDifficulty, setActiveFilters]);

    const difficultyOptions = [
        { value: 'easy', label: 'Fácil' },
        { value: 'medium', label: 'Médio' },
        { value: 'hard', label: 'Difícil' }
    ];

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    // Processar questões após filtros e ordenação
    const processedQuestions = useMemo(() => {
        return sortQuestions(filteredQuestions);
    }, [filteredQuestions, sortQuestions]);

    const handleViewQuestion = (question: Question) => {
        setSelectedQuestion(question);
    };

    const handleEditQuestion = (question: Question) => {
        console.log('Editar questão:', question);
    };

    const handleDeleteQuestion = (question: Question) => {
        console.log('Excluir questão:', question);
    };

    const handleCombineQuestions = () => {
        if (selectedQuestions.size > 1) {
            setShowCombineModal(true);
        }
    };

    const confirmCombineQuestions = () => {
        console.log('Combining questions:', Array.from(selectedQuestions));
        setShowCombineModal(false);
        clearSelection();
    };

    const handleQuestionSelect = (id: string | number) => {
        const idStr = id.toString();
        setSelectedQuestions(prev => {
            const newSet = new Set(prev);
            newSet.has(idStr) ? newSet.delete(idStr) : newSet.add(idStr);
            return newSet;
        });
    };

    const handleRateQuestion = useCallback((id: string | number, rating: number) => {
        console.log(`Avaliando questão ${id} com ${rating} estrelas`);
        // Lógica para atualizar a avaliação no backend/estado
    }, []);

    const handleToggleFavorite = useCallback((id: string | number) => {
        console.log(`Alternando favorito para questão ${id}`);
        // Lógica para atualizar o favorito no backend/estado
    }, []);

    const handleQuestionTypeFilter = (type: QuestionType | 'all') => {
        setActiveFilters(prev => ({
            ...prev,
            types: type === 'all' ? [] : [type]
        }));
    };

    // Função de adaptador para converter Question para QuestionBack
    const adaptToQuestionBack = (question: Question): QuestionBack => ({
        id: question.contentId,
        title: question.statement,
        content: question.statement,
        category: question.discipline,
        difficulty: question.difficultyLevel,
        type: question.questionType,
        tags: question.tags || [],
        createdAt: question.createdAt,
        lastUsed: question.updatedAt,
        accuracy: question.correctRate,
        usageCount: question.timesUsed,
        answers: [],
        explanation: question.explanation,
        isFavorite: question.pinned,
    });

    return (
        <>
            <Filters
                searchValue={searchTerm}
                onSearchChange={onSearchChange}
                categoryOptions={categoryOptions}
                difficultyOptions={difficultyOptions}
                showAdvanced={showAdvanced}
                onAdvancedToggle={() => setShowAdvanced(!showAdvanced)}
                selectedCategory={selectedCategory}
                selectedDifficulty={selectedDifficulty}
                onCategoryChange={onCategoryChange}
                onDifficultyChange={onDifficultyChange}
                onQuestionTypeFilter={handleQuestionTypeFilter}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <SortControls
                    options={sortOptions}
                    value={currentSortField}
                    direction={currentSortDirection}
                    onChange={handleSortChange}
                    variant="dropdown"
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {selectedQuestions.size > 0 && (
                        <button
                            onClick={handleCombineQuestions}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Combinar ({selectedQuestions.size})
                        </button>
                    )}
                    <QuestionViewModeToggle
                        mode={viewMode}
                        onChange={setViewMode}
                    />
                </div>
            </div>

            {viewMode === 'cards' ? (
                <QuestionsGrid>
                    {processedQuestions.map(question => (
                        <QuestionCard
                            key={question.id}
                            question={adaptToQuestionBack(question)}
                            onView={() => handleViewQuestion(question)}
                            onEdit={() => handleEditQuestion(question)}
                            onDelete={() => handleDeleteQuestion(question)}
                            selected={selectedQuestions.has(question.id)}
                            onSelect={handleQuestionSelect}
                            onRate={handleRateQuestion}
                            onToggleFavorite={handleToggleFavorite}
                            onTagClick={(tag) => console.log('Tag clicada:', tag)}
                        />
                    ))}
                </QuestionsGrid>
            ) : (
                <QuestionsTable
                    questions={processedQuestions.map(adaptToQuestionBack)} // Converter para QuestionBack
                    onView={(question) => handleViewQuestion(convertQuestionBackToQuestion(question))}
                    onEdit={(question) => handleEditQuestion(convertQuestionBackToQuestion(question))}
                    onDelete={(question) => handleDeleteQuestion(convertQuestionBackToQuestion(question))}
                    selectedQuestions={selectedQuestions}
                    onSelect={handleQuestionSelect}
                />
            )}

            {selectedQuestion && (
                <QuestionDetailModal
                    question={adaptToQuestionBack(selectedQuestion)} // Converter para QuestionBack
                    isOpen={true}
                    onClose={() => setSelectedQuestion(null)}
                    onEdit={() => {
                        handleEditQuestion(selectedQuestion);
                        setSelectedQuestion(null);
                    }}
                    onDelete={() => {
                        handleDeleteQuestion(selectedQuestion);
                        setSelectedQuestion(null);
                    }}
                />
            )}

            {showCombineModal && (
                <CombineQuestionsModal
                    count={selectedQuestions.size}
                    onConfirm={confirmCombineQuestions}
                    onCancel={() => setShowCombineModal(false)}
                />
            )}
        </>
    );
};

export default QuestionsView;