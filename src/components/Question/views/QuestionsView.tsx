import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Question, QuestionStatus, QuestionType } from '../../../utils/types/Question';
import { CategoryWithId } from '../QuestionForm/type';

import { useQuestionManager } from '../../../hooks/Question/useQuestionManager';
import { useSimilarQuestions } from '../../../hooks/useSimilarQuestions';

import LoadingSpinner from '../../shared/LoadingSpinner';

import QuestionDetailModal from '../QuestionView/QuestionDetailModal';
import CombineQuestionsModal from '../CombineQuestionsModal';
import { SimilarQuestionsModal } from '../SimilarQuestionsModal';
import BulkActionModals from '../BulkActionModals';
import LoadingModal from '../LoadingModal';

import FilterBar from '../FilterBar';
import ViewControls from '../ViewControls';
import QuestionsRenderer from '../QuestionsRenderer';
import PaginationControls from '../PaginationControls';
import styled from 'styled-components';
import { FaCheckCircle, FaExclamationCircle, FaFileExport, FaObjectGroup, FaTimes, FaTrash, FaUpload } from 'react-icons/fa';
import { Button } from '../../shared/Button.styles';

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

    const openModal = (modal: keyof typeof modalStates) =>
        setModalStates(prev => ({ ...prev, [modal]: true }));

    const closeModal = (modal: keyof typeof modalStates) =>
        setModalStates(prev => ({ ...prev, [modal]: false }));

    if (isLoading) {
        return <LoadingSpinner message="Carregando questões..." />;
    }

    return (
        <>
            <FilterBar
                searchValue={searchTerm}
                onSearchChange={onSearchChange}
                onSearchSubmit={() => { }}
                categoryOptions={categoryOptions}
                difficultyOptions={difficultyOptions}
                selectedCategory={selectedCategory}
                selectedDifficulty={selectedDifficulty}
                currentType={questionTypeFilter}
                categories={categories}
                filters={filters}
                onFiltersChange={(updates) => setFilters(prev => ({ ...prev, ...updates }))}
                onQuestionTypeFilter={handleQuestionTypeFilter}
                onCategoryChange={onCategoryChange}
                onDifficultyChange={onDifficultyChange}
                onApplyFilters={() => { }}
                onResetFilters={handleResetAdvancedFilters}
                sortOptions={sortOptions}
                sortField={sortConfig.field}
                sortDirection={sortConfig.direction}
                onSortChange={handleSortChange}
                totalQuestions={processedQuestions.length}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                questionStatus={newStatus}
                onStatusChange={setNewStatus}
            />

            {selectedQuestionsCount > 0 && (
                <SelectionToolbar>
                    <SelectionInfo>
                        <FaCheckCircle color="var(--color-primary)" />
                        <span>{selectedQuestionsCount} questões selecionadas</span>
                        <Button
                            $variant="text"
                            $size="sm"
                            onClick={clearSelection}
                        >
                            Limpar
                        </Button>
                    </SelectionInfo>

                    <ActionButtonsContainer>
                        <Button
                            $variant="secondary"
                            $size="sm"
                            onClick={() => editQuestions({ status: 'active' })}
                        >
                            <FaUpload /> Publicar
                        </Button>
                        <Button
                            $variant="danger"
                            $size="sm"
                            onClick={deleteQuestions}
                        >
                            <FaTrash /> Excluir
                        </Button>
                        <Button
                            $variant="secondary"
                            $size="sm"
                            onClick={exportQuestions}
                        >
                            <FaFileExport /> Exportar
                        </Button>
                        <Button
                            $variant="primary"
                            $size="sm"
                            onClick={() => setModalStates(p => ({ ...p, combine: true }))}
                        >
                            <FaObjectGroup /> Combinar
                        </Button>
                    </ActionButtonsContainer>
                </SelectionToolbar>
            )}

            {error && (
                <ErrorMessage>
                    <div>
                        <FaExclamationCircle /> {error}
                    </div>
                    <Button
                        $variant="text"
                        $size="sm"
                        onClick={clearError}
                    >
                        <FaTimes />
                    </Button>
                </ErrorMessage>
            )}
            
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
                    totalItems={processedQuestions.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                />
            )}

            {selectedQuestion && (
                <QuestionDetailModal
                    question={selectedQuestion}
                    isOpen={modalStates.detail}
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

            {modalStates.combine && isProcessing ? (
                <LoadingSpinner message="Combinando questões..." />
            ) : (
                modalStates.combine &&
                <CombineQuestionsModal
                    isOpen={modalStates.combine}
                    count={selectedQuestions.size}
                    isCombining={isProcessing}
                    onConfirm={confirmCombineQuestions}
                    onCancel={() => closeModal('combine')}
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
                    closeModal('status');
                }}
                onStatusCancel={() => closeModal('status')}
                onMoveConfirm={(discipline) => {
                    handleBulkEdit({ discipline });
                    closeModal('move');
                }}
                onMoveCancel={() => closeModal('move')}
                onCombineConfirm={confirmCombineQuestions}
                onCombineCancel={() => closeModal('combine')}
            />
        </>
    );
};

export default QuestionsView;


const SelectionToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-sm) var(--space-md);
  background-color: var(--color-primary-light);
  border-radius: var(--border-radius-md);
  margin: var(--space-md) 0;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-all);
`;

const SelectionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-weight: var(--font-weight-medium);
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: var(--space-sm);
`;

const ErrorMessage = styled.div`
  padding: var(--space-md);
  background-color: var(--color-error-bg);
  color: var(--color-error);
  border-radius: var(--border-radius-md);
  margin: var(--space-md) 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-md);
`;