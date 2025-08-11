import React, { useState, useMemo, useEffect, useCallback } from 'react';

import { useQuestionFilters } from '../../../hooks/useQuestionFilters';
import { useQuestionSelection } from '../../../hooks/useQuestionSelection';
import { useSortPreferences } from '../../../hooks/useSortPreferences';
import { useQuestionSort } from '../../../hooks/useQuestionSort';
import { useBulkActions } from '../../../hooks/useBulkActions';
import { useQuestionCombination } from '../../../hooks/useQuestionCombination';
import { useSimilarQuestions } from '../../../hooks/useSimilarQuestions';

import { Question, QuestionStatus, QuestionType } from '../../../utils/types/Question';

import LoadingSpinner from '../../shared/LoadingSpinner';

import QuestionCard from '../QuestionCard';
import CombineQuestionsModal from '../CombineQuestionsModal';
import { CategoryWithId } from '../QuestionForm/type';
import { SimilarQuestionsModal } from '../SimilarQuestionsModal';
import { BulkMoveModal } from '../BulkMoveModal';

import QuestionDetailModal from '../QuestionView/QuestionDetailModal';

import { createQuestionVariant } from '../../../utils/questionUtils';
import FilterBar from '../FilterBar';
import ViewControls from '../ViewControls';
import ConfirmationModal from '../ConfirmationModal';
import LoadingModal from '../LoadingModal';
import QuestionsRenderer from '../QuestionsRenderer';
import CategorySelector from '../CategorySelector';

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
    const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());
    const [isCreatingVariant, setIsCreatingVariant] = useState(false);
    const [compositeQuestions, setCompositeQuestions] = useState<Question[]>([]);
    const [showCombineModal, setShowCombineModal] = useState(false);

    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showMoveModal, setShowMoveModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [questionTypeFilter, setQuestionTypeFilter] = useState<QuestionType | 'all'>('all');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const { clearSelection, toggleSelectAll, isAllSelected } = useQuestionSelection({
        availableQuestions: questions,
        selectedQuestions: Array.from(selectedQuestions)
            .map(id => questions.find(q => q.id === id))
            .filter(Boolean) as Question[],
        onQuestionsSelected: (selected) => {
            setSelectedQuestions(new Set(selected.map(q => q.id)));
        }
    });

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
        similarQuestions,
        currentQuestion: currentQuestionForSimilarity,
        isModalOpen: showSimilarModal,
        findSimilar,
        closeModal: closeSimilarModal
    } = useSimilarQuestions({ questions });

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

    const handleSortChange = useCallback((field: string, direction: 'asc' | 'desc') => {
        setSortField(field);
        setSortDirection(direction);
        onSortChange?.(field, direction);
    }, [onSortChange, setSortField, setSortDirection]);

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

    const handleQuestionTypeFilter = useCallback((type: QuestionType | 'all') => {
        setActiveFilters(prev => ({
            ...prev,
            types: type === 'all' ? [] : [type]
        }));
    }, [setActiveFilters]);

    const confirmCombineQuestions = useCallback(async () => {
        if (selectedQuestions.size < 2) return;

        try {
            await combine(Array.from(selectedQuestions));
            setShowCombineModal(false);
        } catch (error) {
            console.error(`QUESTIONVIEW: Erro ao combinar questões: ${error}`);
        }
    }, [combine, selectedQuestions]);

    const handleCreateVariant = useCallback(async (question: Question) => {
        setIsCreatingVariant(true);
        try {
            const variant = createQuestionVariant(question);
            // Adicione a nova variação ao estado ou banco de dados
            console.log('Nova variação criada:', variant);
            console.log('Variação criada com sucesso!');
        } catch (error) {
            console.error('Erro ao criar variação');
        } finally {
            setIsCreatingVariant(false);
        }
    }, []);


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

            {showCombineModal && isCombining ? (
                <LoadingSpinner message="Combinando questões..." />
            ) : (
                showCombineModal &&
                <CombineQuestionsModal
                    isOpen={showCombineModal}
                    count={selectedQuestions.size}
                    isCombining={isCombining}
                    onConfirm={confirmCombineQuestions}
                    onCancel={() => setShowCombineModal(false)}
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

            {isBulkEditing &&
                <LoadingModal
                    isOpen={isLoading}
                    message="Carregando questões..."
                    variant="spinner"
                />}

            {isCreatingVariant && (
                <LoadingModal
                    isOpen={isCreatingVariant}
                    message="Criando variação..."
                    variant="dots"
                    size="medium"
                />
            )}

            {/* Modais */}
            <ConfirmationModal
                isOpen={showStatusModal}
                title="Alterar status"
                message={`Deseja alterar o status de ${selectedQuestions.size} questão(ões)?`}
                onConfirm={() => {
                    handleBulkEdit({ status: newStatus });
                    setShowStatusModal(false);
                }}
                onCancel={() => setShowStatusModal(false)}
            />


            <ConfirmationModal
                isOpen={showMoveModal}
                title="Mover questões"
                message={`Deseja mover ${selectedQuestions.size} questão(ões) para outra categoria?`}
                onConfirm={() => {
                    handleBulkEdit({ discipline: selectedDiscipline });
                    setShowMoveModal(false);
                }}
                onCancel={() => setShowMoveModal(false)}
            >
                <CategorySelector
                    categories={categories}
                    onSelect={setSelectedDiscipline}
                />
            </ConfirmationModal>

            <ConfirmationModal
                isOpen={showCombineModal}
                title="Combinar questões"
                message={`Deseja combinar ${selectedQuestions.size} questão(ões) em uma nova?`}
                confirmText="Combinar"
                onConfirm={confirmCombineQuestions}
                onCancel={() => setShowCombineModal(false)}
                isLoading={isCombining}
            />

            <BulkMoveModal
                isOpen={showMoveModal}
                onClose={() => setShowMoveModal(false)}
                onConfirm={(discipline) => {
                    handleBulkEdit({ discipline });
                    setShowMoveModal(false);
                }}
                categories={categories}
                count={selectedQuestions.size}
            />
        </>
    );
};

export default QuestionsView;