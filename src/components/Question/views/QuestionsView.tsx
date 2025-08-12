import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Question, QuestionStatus, QuestionType } from '../../../utils/types/Question';
import { CategoryWithId } from '../QuestionForm/type';

import LoadingSpinner from '../../shared/LoadingSpinner';
import QuestionDetailModal from '../QuestionView/QuestionDetailModal';
import QuestionCard from '../QuestionCard';
import CombineQuestionsModal from '../CombineQuestionsModal';
import { SimilarQuestionsModal } from '../SimilarQuestionsModal';
import FilterBar from '../FilterBar';
import ViewControls from '../ViewControls';
import LoadingModal from '../LoadingModal';
import QuestionsRenderer from '../QuestionsRenderer';
import BulkActionModals from '../BulkActionModals';
import PaginationControls from '../PaginationControls';
import { useQuestionManager } from '../../../hooks/Question/useQuestionManager';
import { useSimilarQuestions } from '../../../hooks/useSimilarQuestions';

interface QuestionsViewProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    categories: CategoryWithId[];
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

    // Hook principal de gerenciamento de questões
    const {
        questions: processedQuestions,
        isProcessing,
        error,

        // Filtros
        filters,
        setFilters,

        // Ordenação
        sortConfig,
        handleSortChange,

        // Seleção
        selectedQuestions,
        selectedQuestionsCount,
        isAllSelected,
        clearSelection,
        toggleSelectAll,
        toggleSelection,

        // Ações
        createVariant,
        editQuestion,
        deleteQuestion,
        deleteQuestions,
        editQuestions,
        exportQuestions,
        combineQuestions,

        // Utilitários
        clearError,
    } = useQuestionManager(questions, {
        initialFilters: {
            searchTerm,
            categories: selectedCategory !== 'all' ? [selectedCategory] : [],
            difficulties: selectedDifficulty !== 'all' ? [selectedDifficulty as 'easy' | 'medium' | 'hard'] : [],
        },
        initialSortField,
        initialSortDirection,
        sortOptions,
        onUpdateQuestions: (updatedQuestions) => {
            if (typeof onQuestionChange === 'function') {
                onQuestionChange(updatedQuestions);
            }
        },
        onCombineSuccess: (newQuestion) => {
            setCompositeQuestions(prev => [...prev, newQuestion]);
        }
    });

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const { similarQuestions, currentQuestion: currentQuestionForSimilarity, isModalOpen: showSimilarModal, findSimilar, closeModal: closeSimilarModal } = useSimilarQuestions({ questions });

    const difficultyOptions = [
        { value: 'easy', label: 'Fácil' },
        { value: 'medium', label: 'Médio' },
        { value: 'hard', label: 'Difícil' }
    ];

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    const handleEditQuestion = useCallback((question: Question) => {
        // Aqui você pode abrir um modal de edição ou fazer outra ação
        console.log('Editar questão:', question);
        // Exemplo: abrir modal de edição com os dados da questão
        setSelectedQuestion(question);
    }, []);

    const handleStatusChange = (status: QuestionStatus) => {
        setNewStatus(status);
        setModalStates(prev => ({ ...prev, status: true }));
    };

    const handleApplyAdvancedFilters = useCallback(() => {
        console.log(`QUESTIONVIEW: click filtros avançados`);
    }, []);

    const handleResetAdvancedFilters = useCallback(() => {
        setFilters(prev => ({
            ...prev,
            tags: [],
            disciplines: [],
            ratingRange: [0, 5],
            createdAtRange: ['', ''],
        }));
    }, [setFilters]);

    const handleBulkEdit = useCallback((updates: Partial<Question>) => {
        editQuestions(updates);
    }, [editQuestions]);

    // Paginação
    const paginatedQuestions = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return processedQuestions.slice(startIndex, startIndex + itemsPerPage);
    }, [processedQuestions, currentPage, itemsPerPage]);

    const handleViewQuestion = (question: Question) => {
        setSelectedQuestion(question);
    };

    const handleRateQuestion = useCallback((id: string | number, rating: number) => {
        console.log(`Avaliando questão ${id} com ${rating} estrelas`);
    }, []);

    const handleToggleFavorite = useCallback((id: string | number) => {
        console.log(`Alternando favorito para questão ${id}`);
    }, []);

    const handleQuestionTypeFilter = useCallback((type: QuestionType | 'all') => {
        setQuestionTypeFilter(type);
        setFilters(prev => ({
            ...prev,
            types: type === 'all' ? [] : [type]
        }));
    }, [setFilters]);

    const confirmCombineQuestions = useCallback(async () => {
        if (selectedQuestions.size < 2) return;

        try {
            await combineQuestions();
            setModalStates(prev => ({ ...prev, combine: false }));
        } catch (error) {
            console.error(`QUESTIONVIEW: Erro ao combinar questões: ${error}`);
        }
    }, [combineQuestions, selectedQuestions]);

    if (isLoading) {
        return <LoadingSpinner message="Carregando questões..." />;
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
                filters={filters}
                onFiltersChange={(updates) => setFilters(prev => ({ ...prev, ...updates }))}
                onApplyAdvancedFilters={handleApplyAdvancedFilters}
                onResetAdvancedFilters={handleResetAdvancedFilters}
            />

            {selectedQuestionsCount > 0 && (
                <div className="action-toolbar">
                    <div className="selection-info">
                        <span>{selectedQuestionsCount} selecionadas</span>
                        <button onClick={clearSelection}>Limpar</button>
                    </div>

                    <div className="action-buttons">
                        <button onClick={() => editQuestions({ status: 'draft' })}>
                            Publicar
                        </button>

                        <button onClick={deleteQuestions} className="danger">
                            Excluir
                        </button>

                        <button onClick={exportQuestions}>
                            Exportar
                        </button>

                        <button onClick={() => setModalStates(p => ({ ...p, combine: true }))}>
                            Combinar
                        </button>
                    </div>
                </div>
            )}

            {error && (
                <div className="error-message">
                    {error}
                    <button onClick={clearError}>Fechar</button>
                </div>
            )}

            {selectedDiscipline && (
                <div>Disciplina selecionada: {selectedDiscipline}</div>
            )}

            <select onChange={(e) => handleStatusChange(e.target.value as QuestionStatus)}>
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
            </select>

            <ViewControls
                sortOptions={sortOptions}
                sortValue={sortConfig.field}
                sortDirection={sortConfig.direction}
                onSortChange={handleSortChange}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                align="space-between"
                gap={1}
            />

            <QuestionsRenderer
                viewMode={viewMode}
                questions={paginatedQuestions}
                selectedQuestions={selectedQuestions}
                onView={handleViewQuestion}
                onEdit={handleEditQuestion}
                onDelete={(question) => deleteQuestion(question)}
                onSelect={toggleSelection}
                onSelectAll={toggleSelectAll}
                isAllSelected={isAllSelected}
                onRate={handleRateQuestion}
                onToggleFavorite={handleToggleFavorite}
                onFindSimilar={findSimilar}
                onCreateVariant={createVariant}
                cardProps={{
                    onTagClick: (tag: string) => console.log('Tag clicada:', tag)
                }}
            />

            {processedQuestions.length > itemsPerPage && (
                <PaginationControls
                    filteredQuestions={processedQuestions}
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
                        deleteQuestion(selectedQuestion);
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

            {modalStates.combine && isProcessing ? (
                <LoadingSpinner message="Combinando questões..." />
            ) : (
                modalStates.combine &&
                <CombineQuestionsModal
                    isOpen={modalStates.combine}
                    count={selectedQuestions.size}
                    isCombining={isProcessing}
                    onConfirm={confirmCombineQuestions}
                    onCancel={() => setModalStates(prev => ({ ...prev, combine: false }))}
                />
            )}

            {error && <div className="error-message">{error}</div>}

            {currentQuestionForSimilarity && (
                <SimilarQuestionsModal
                    question={currentQuestionForSimilarity}
                    similarQuestions={similarQuestions}
                    isOpen={showSimilarModal}
                    onClose={closeSimilarModal}
                />
            )}

            {isProcessing && (
                <LoadingModal
                    isOpen={isProcessing}
                    message="Processando..."
                    variant="spinner"
                />
            )}

            <BulkActionModals
                showStatusModal={modalStates.status}
                showMoveModal={modalStates.move}
                showCombineModal={modalStates.combine}
                selectedQuestionsCount={selectedQuestions.size}
                newStatus={newStatus}
                categories={categories}
                isCombining={isProcessing}
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