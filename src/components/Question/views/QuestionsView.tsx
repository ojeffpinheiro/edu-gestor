import React, { useState, useMemo, useEffect, useCallback } from 'react';

import { useQuestionFilters } from '../../../hooks/useQuestionFilters';
import { useSortPreferences } from '../../../hooks/useSortPreferences';
import { useQuestionSort } from '../../../hooks/useQuestionSort';
import { useBulkActions } from '../../../hooks/useBulkActions';
import { useQuestionCombination } from '../../../hooks/useQuestionCombination';
import { useSimilarQuestions } from '../../../hooks/useSimilarQuestions';
import { useQuestionSelectionManagement } from '../../../hooks/useQuestionSelectionManagement';
import { useQuestionActions } from '../../../hooks/useQuestionActions';

import { Question, QuestionStatus, QuestionType } from '../../../utils/types/Question';

import LoadingSpinner from '../../shared/LoadingSpinner';

import QuestionDetailModal from '../QuestionView/QuestionDetailModal';

import QuestionCard from '../QuestionCard';
import CombineQuestionsModal from '../CombineQuestionsModal';
import { CategoryWithId } from '../QuestionForm/type';
import { SimilarQuestionsModal } from '../SimilarQuestionsModal';
import FilterBar from '../FilterBar';
import ViewControls from '../ViewControls';
import LoadingModal from '../LoadingModal';
import QuestionsRenderer from '../QuestionsRenderer';
import BulkActionModals from '../BulkActionModals';
import PaginationControls from '../PaginationControls';

interface QuestionsViewProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    categories: CategoryWithId[]; // Usa a interface atualizada
    selectedCategory: string;
    onCategoryChange: (value: string) => void;
    selectedDifficulty: string;
    onDifficultyChange: (value: string) => void;
    questions: Question[];
    sortOptions: { value: string; label: string }[];
    sortField: string;
    sortDirection: 'asc' | 'desc';
    onSortChange: (field: string, direction: 'asc' | 'desc') => void;
    onFindSimilar?: (questionId: string | number) => void;
    initialSortField?: string;
    initialSortDirection?: 'asc' | 'desc';
    onQuestionChange: (questions: Question[] | ((prev: Question[]) => Question[])) => void;
}

const QuestionsView: React.FC<QuestionsViewProps> = ({
    searchTerm,
    questions,
    initialSortField = 'createdAt',
    initialSortDirection = 'desc',
    sortOptions,
    categories,
    selectedCategory,
    selectedDifficulty,
    onQuestionChange,
    onSearchChange,
    onCategoryChange,
    onDifficultyChange,
    onSortChange,
}) => {
    const [newStatus, setNewStatus] = useState<QuestionStatus>('draft');
    const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
    const [compositeQuestions, setCompositeQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [questionTypeFilter, setQuestionTypeFilter] = useState<QuestionType | 'all'>('all');
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [modalStates, setModalStates] = useState({
        status: false,
        move: false,
        combine: false,
        similar: false,
        detail: false
    });

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);
    const {
        isCreatingVariant,
        handleCreateVariant,
        handleEditQuestion,
        handleDeleteQuestion
    } = useQuestionActions();
    const {
        selectedQuestions,
        handleQuestionSelect,
        clearSelection,
        toggleSelectAll,
        isAllSelected
    } = useQuestionSelectionManagement(questions);
    const {
        similarQuestions,
        currentQuestion: currentQuestionForSimilarity,
        isModalOpen: showSimilarModal,
        findSimilar,
        closeModal: closeSimilarModal
    } = useSimilarQuestions({ questions });

    const {
        combine,
        isCombining,
        error: combineError
    } = useQuestionCombination({
        questions,
        onCombineSuccess: (newQuestion) => {
            setCompositeQuestions(prev => [...prev, newQuestion]);
        },
        onClearSelection: clearSelection
    });

    const {
        editQuestions,
        isEditing: isBulkEditing
    } = useBulkActions({
        questions,
        selectedQuestionIds: selectedQuestions,
        onUpdateQuestions: onQuestionChange,
        onClearSelection: clearSelection
    });

    const {
        sortField,
        sortDirection,
        setSortField,
        setSortDirection
    } = useSortPreferences(
        'questionSortPreferences',
        initialSortField,
        initialSortDirection
    );

    const {
        activeFilters, setActiveFilters, filteredQuestions
    } = useQuestionFilters({
        questions,
        initialFilters: {
            searchTerm: searchTerm,
            categories: selectedCategory !== 'all' ? [selectedCategory] : [],
            difficulties: selectedDifficulty !== 'all' ? [selectedDifficulty as 'easy' | 'medium' | 'hard'] : [],
        }
    });

    const handleSortChange = useCallback((field: string, direction: 'asc' | 'desc') => {
        setSortField(field);
        setSortDirection(direction);
        onSortChange?.(field, direction);
    }, [onSortChange, setSortField, setSortDirection]);

    const {
        sortField: currentSortField,
        sortDirection: currentSortDirection,
        sortQuestions
    } = useQuestionSort({
        initialField: sortField,
        initialDirection: sortDirection,
        sortOptions,
        onSortChange: handleSortChange
    });

    useEffect(() => {
        setActiveFilters(prev => ({
            ...prev,
            searchTerm: searchTerm,
            categories: selectedCategory !== 'all' ? [selectedCategory] : [],
            difficulties: selectedDifficulty !== 'all' ? [selectedDifficulty as 'easy' | 'medium' | 'hard'] : [],
        }));
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

    const handleStatusChange = (status: QuestionStatus) => {
        setNewStatus(status);
        setModalStates(prev => ({ ...prev, status: true }));
    };

    const handleApplyAdvancedFilters = useCallback(() => {
        // Atualiza a lista de questões filtradas
        // O estado filteredQuestions já será atualizado automaticamente
        console.log(`QUESTIONVIEW: click filtros avançados`);
    }, []);

    const handleResetAdvancedFilters = useCallback(() => {
        setActiveFilters(prev => ({
            ...prev,
            tags: [],
            disciplines: [],
            ratingRange: [0, 5],
            createdAtRange: ['', ''],
        }));
    }, [setActiveFilters]);

    const handleBulkEdit = useCallback((updates: Partial<Question>) => {
        editQuestions(updates);
    }, [editQuestions]);

    // Processar questões após filtros e ordenação
    const processedQuestions = useMemo(() => {
        const sorted = sortQuestions(filteredQuestions);
        // Adicione a lógica de paginação
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sorted.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredQuestions, sortQuestions, currentPage, itemsPerPage]);

    const handleViewQuestion = (question: Question) => {
        setSelectedQuestion(question);
    };

    const handleRateQuestion = useCallback((id: string | number, rating: number) => {
        console.log(`Avaliando questão ${id} com ${rating} estrelas`);
        // Lógica para atualizar a avaliação no backend/estado
    }, []);

    const handleToggleFavorite = useCallback((id: string | number) => {
        console.log(`Alternando favorito para questão ${id}`);
        // Lógica para atualizar o favorito no backend/estado
    }, []);

    const handleQuestionTypeFilter = useCallback((type: QuestionType | 'all') => {
        setQuestionTypeFilter(type);
        setActiveFilters(prev => ({
            ...prev,
            types: type === 'all' ? [] : [type]
        }));
    }, [setActiveFilters]);

    const confirmCombineQuestions = useCallback(async () => {
        if (selectedQuestions.size < 2) return;

        try {
            await combine(Array.from(selectedQuestions));
            setModalStates(prev => ({ ...prev, combine: false }))
        } catch (error) {
            console.error(`QUESTIONVIEW: Erro ao combinar questões: ${error}`);
        }
    }, [combine, selectedQuestions]);

    if (isLoading) {
        return (
            <LoadingSpinner
                message="Carregando questões..."
            />
        );
    }

    return (
        <>
            <FilterBar
                searchValue={searchTerm}
                onSearchChange={onSearchChange}
                categoryOptions={categoryOptions}
                difficultyOptions={difficultyOptions}
                selectedCategory={selectedCategory}
                selectedDifficulty={selectedDifficulty}
                onCategoryChange={onCategoryChange}
                onDifficultyChange={onDifficultyChange}
                onQuestionTypeFilter={handleQuestionTypeFilter}
                currentType={questionTypeFilter}
                categories={categories}
                filters={activeFilters}
                onFiltersChange={(updates) => setActiveFilters(prev => ({ ...prev, ...updates }))}
                onApplyAdvancedFilters={handleApplyAdvancedFilters}
                onResetAdvancedFilters={handleResetAdvancedFilters}
            />
            {selectedDiscipline && (
                <div>Disciplina selecionada: {selectedDiscipline}</div>
            )}

            <select onChange={(e) => handleStatusChange(e.target.value as QuestionStatus)}>
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
            </select>
            <ViewControls
                sortOptions={sortOptions}
                sortValue={currentSortField}
                sortDirection={currentSortDirection}
                onSortChange={handleSortChange}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                align="space-between"
                gap={1}
            />

            <QuestionsRenderer
                viewMode={viewMode}
                questions={processedQuestions}
                selectedQuestions={selectedQuestions}
                onView={handleViewQuestion}
                onEdit={handleEditQuestion}
                onDelete={handleDeleteQuestion}
                onSelect={handleQuestionSelect}
                onSelectAll={toggleSelectAll}
                isAllSelected={isAllSelected}
                onRate={handleRateQuestion}
                onToggleFavorite={handleToggleFavorite}
                onFindSimilar={(question) => findSimilar(question)}
                onCreateVariant={handleCreateVariant}
                cardProps={{
                    onTagClick: (tag: string) => console.log('Tag clicada:', tag)
                }}
            />

            {filteredQuestions.length > itemsPerPage && (
                <PaginationControls
                    filteredQuestions={filteredQuestions}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setItemsPerPage={setItemsPerPage}
                />
            )}

            {selectedQuestion && (
                <QuestionDetailModal
                    question={selectedQuestion}
                    isOpen={!!selectedQuestion}
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

            {compositeQuestions.length > 0 && (
                <div>
                    <h3>Questões Compostas</h3>
                    {compositeQuestions.map(q => (
                        <QuestionCard
                            key={q.id}
                            question={q}
                            onFindSimilar={findSimilar}
                            showActionsOnClick />
                    ))}
                </div>
            )}

            {modalStates.combine && isCombining ? (
                <LoadingSpinner message="Combinando questões..." />
            ) : (
                modalStates.combine &&
                <CombineQuestionsModal
                    isOpen={modalStates.combine}
                    count={selectedQuestions.size}
                    isCombining={isCombining}
                    onConfirm={confirmCombineQuestions}
                    onCancel={() => setModalStates(prev => ({ ...prev, combine: false }))}
                />
            )}

            {combineError && <div className="error-message">{combineError}</div>}

            {currentQuestionForSimilarity && (
                <SimilarQuestionsModal
                    question={currentQuestionForSimilarity}
                    similarQuestions={similarQuestions}
                    isOpen={showSimilarModal}
                    onClose={closeSimilarModal}
                />
            )}
            {
                [
                    isBulkEditing
                        ? {
                            isOpen: isLoading,
                            message: "Carregando questões...",
                            variant: "spinner" as const,
                            key: 'bulk-edit'
                        }
                        : null,
                    isCreatingVariant
                        ? {
                            isOpen: isCreatingVariant,
                            message: "Criando variação...",
                            variant: "dots" as const,
                            size: "medium" as const,
                            key: 'create-variant'
                        }
                        : null
                ]
                    .filter((modal): modal is NonNullable<typeof modal> => modal !== null)
                    .map((modalProps) => (
                        <LoadingModal {...modalProps} />
                    ))
            }

            <BulkActionModals
                showStatusModal={modalStates.status}
                showMoveModal={modalStates.move}
                showCombineModal={modalStates.combine}
                selectedQuestionsCount={selectedQuestions.size}
                newStatus={newStatus}
                categories={categories}
                isCombining={isCombining}
                onStatusConfirm={() => {
                    handleBulkEdit({ status: newStatus });
                    setModalStates(prev => ({ ...prev, status: false }))
                }}
                onStatusCancel={() => setModalStates(prev => ({ ...prev, status: false }))}
                onMoveConfirm={(discipline) => {
                    handleBulkEdit({ discipline });
                    setModalStates(prev => ({ ...prev, move: false }))
                }}
                onMoveCancel={() => setModalStates(prev => ({ ...prev, move: false }))}
                onCombineConfirm={confirmCombineQuestions}
                onCombineCancel={() => setModalStates(prev => ({ ...prev, combine: false }))}
                setSelectedDiscipline={setSelectedDiscipline}
            />
        </>
    );
};

export default QuestionsView;