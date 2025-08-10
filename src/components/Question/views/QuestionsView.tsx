import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useQuestionFilters } from '../../../hooks/useQuestionFilters';
import { useQuestionSelection } from '../../../hooks/useQuestionSelection';
import { useSortPreferences } from '../../../hooks/useSortPreferences';
import { useQuestionSort } from '../../../hooks/useQuestionSort';

import { DifficultyLevelType, Question, QuestionBack, QuestionType } from '../../../utils/types/Question';

import LoadingSpinner from '../../shared/LoadingSpinner';

import { SortControls } from '../../Sort/SortControls';

import Filters from '../Filter/Filters';
import QuestionCard from '../QuestionCard';
import QuestionsTable from '../QuestionsTable';
import CombineQuestionsModal from '../CombineQuestionsModal';
import { CategoryWithId } from '../QuestionForm/type';
import { SimilarQuestionsModal } from '../SimilarQuestionsModal';
import QuestionTypeIndicator from '../QuestionTypeIndicator'
import QuestionViewModeToggle from '../QuestionView/QuestionViewModeToggle';
import QuestionDetailModal from '../QuestionView/QuestionDetailModal';

import { QuestionsGrid } from '../../../styles/questionList';
import { shuffleAlternatives } from '../../../utils/questionUtils';
import LoadingIndicator from '../../shared/LoadingIndicator';

// Função para converter QuestionBack para Question
const convertQuestionBackToQuestion = (questionBack: QuestionBack): Question => {
    return {
        ...questionBack,
        id: typeof questionBack.id === 'number' ? questionBack.id.toString() : questionBack.id,
        contentId: typeof questionBack.id === 'number' ? questionBack.id.toString() : questionBack.id,
        correctAnswers: questionBack.correctAnswers
            ? questionBack.correctAnswers.map(String)
            : undefined,
        statement: questionBack.content,
        questionType: questionBack.type as QuestionType,
        difficultyLevel: questionBack.difficulty,
        discipline: questionBack.category || '',
        alternatives: [],
        explanation: questionBack.explanation || '',
        createdAt: questionBack.createdAt,
        updatedAt: questionBack.lastUsed || questionBack.createdAt,
        status: 'active',
        answers: questionBack.answers || [], // Garantir array vazio se não existir
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
    initialSortField?: string;
    initialSortDirection?: 'asc' | 'desc';
}

const QuestionsView: React.FC<QuestionsViewProps> = ({
    searchTerm,
    questions: questionBacks,
    sortOptions,
    categories,
    selectedCategory,
    selectedDifficulty,
    onSearchChange,
    onCategoryChange,
    onDifficultyChange,
    onSortChange,
    initialSortField = 'createdAt',
    initialSortDirection = 'desc',
}) => {
    const [isCreatingVariant, setIsCreatingVariant] = useState(false);
    const [compositeQuestions, setCompositeQuestions] = useState<Question[]>([]);
    const [isCombining, setIsCombining] = useState(false);
    const [combineError, setCombineError] = useState<string | null>(null);
    const [showCombineModal, setShowCombineModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [similarQuestions, setSimilarQuestions] = useState<QuestionBack[]>([]);
    const [currentQuestionType, setCurrentQuestionType] = useState<QuestionType | 'all'>('all');
    const [showSimilarModal, setShowSimilarModal] = useState(false);
    const [currentQuestionForSimilarity, setCurrentQuestionForSimilarity] = useState<QuestionBack | null>(null);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [selectedQuestions, setSelectedQuestions] = useState<Set<string>>(new Set());

    // Converter QuestionBack[] para Question[]
    const questions = useMemo(() =>
        questionBacks.map(convertQuestionBackToQuestion),
        [questionBacks]
    );

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

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
        handleSortChange: handleInternalSortChange,
        sortQuestions
    } = useQuestionSort({
        initialField: sortField,
        initialDirection: sortDirection,
        sortOptions,
        onSortChange: handleSortChange
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

    const handleSort = useCallback((field: string, direction: 'asc' | 'desc') => {
        handleInternalSortChange(field, direction);
    }, [handleInternalSortChange]);

    const SimilarQuestionsModalContent = useMemo(() => (
        currentQuestionForSimilarity && (
            <SimilarQuestionsModal
                question={currentQuestionForSimilarity}
                similarQuestions={similarQuestions}
                isOpen={showSimilarModal}
                onClose={() => setShowSimilarModal(false)}
            />
        )
    ), [currentQuestionForSimilarity, similarQuestions, showSimilarModal]);

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

    // Funções auxiliares para cálculo
    const calculateAverageDifficulty = (questions: Question[]): DifficultyLevelType => {
        const difficultyLevels = {
            easy: 1,
            medium: 2,
            hard: 3
        };

        const avgDifficulty = Math.round(
            questions.reduce((sum, q) => sum + difficultyLevels[q.difficultyLevel], 0) /
            questions.length
        );

        return (
            avgDifficulty === 1 ? 'easy' :
                avgDifficulty === 2 ? 'medium' : 'hard'
        );
    };

    const getMostCommonDiscipline = (questions: Question[]): string => {
        const disciplineCounts = questions.reduce((acc, q) => {
            acc[q.discipline] = (acc[q.discipline] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(disciplineCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
    };

    const getCombinedTags = (questions: Question[]): string[] => {
        const allTags = questions.flatMap(q => q.tags || []);
        return Array.from(new Set(allTags));
    };
    
    const combineQuestions = useCallback((questionIds: string[]): Question => {
        // Obter as questões selecionadas
        const selectedQuestionsData = questions.filter(q => q.id !== undefined && questionIds.includes(q.id.toString()));

        const difficultyLevels = {
            easy: 1,
            medium: 2,
            hard: 3
        };

        const avgDifficulty = Math.round(
            selectedQuestionsData.reduce((sum, q) => sum + difficultyLevels[q.difficultyLevel], 0) /
            selectedQuestionsData.length
        );

        const calculatedDifficulty = (
            avgDifficulty === 1 ? 'easy' :
                avgDifficulty === 2 ? 'medium' : 'hard'
        ) as DifficultyLevelType;

        // Criar enunciado composto
        const compositeStatement = selectedQuestionsData
            .map((q, i) => `${i + 1}. ${q.statement}`)
            .join('\n\n');

        const totalAttempts = selectedQuestionsData.reduce((sum, q) => sum + (q.answerStats?.totalAttempts || 0), 0);
        const correctAttempts = selectedQuestionsData.reduce((sum, q) => sum + (q.answerStats?.correctAttempts || 0), 0);
        const totalRating = selectedQuestionsData.reduce((sum, q) => sum + (q.rating || 0), 0);
        const avgRating = selectedQuestionsData.length > 0 ? totalRating / selectedQuestionsData.length : 0;

        const newCompositeQuestion: Question = {
            // Identificação
            id: `composite-${Date.now()}`,
            contentId: `composite-${Date.now()}`,

            // Conteúdo principal
            statement: `Questão composta (${questionIds.length} partes):\n\n${selectedQuestionsData.map((q, i) => `${i + 1}. ${q.statement}`).join('\n\n')
                }`,
            questionType: 'composite',
            explanation: 'Esta é uma questão composta criada a partir de outras questões.',

            // Dificuldade e classificação (calculada)
            difficultyLevel: calculateAverageDifficulty(selectedQuestionsData),
            rating: Math.round(avgRating * 2) / 2, // Arredonda para 0.5

            // Metadados
            discipline: getMostCommonDiscipline(selectedQuestionsData),
            tags: Array.from(new Set(selectedQuestionsData.flatMap(q => q.tags || []))),
            source: 'Sistema (Combinada)',
            accessDate: new Date().toISOString(),


            // Estatísticas
            answerStats: {
                totalAttempts,
                correctAttempts
            },
            correctRate: totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0,
            timesUsed: 0,
            usageCount: 0,

            // Alternativas e respostas
            alternatives: [],
            correctAnswer: undefined,
            correctAnswers: undefined,
            answers: [],

            // Layout e visual
            optionsLayout: 'one-column',
            imageUrl: selectedQuestionsData.find(q => q.imageUrl)?.imageUrl || undefined,

            // Datas
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),

            // Status e favoritos
            status: 'active',
            isFavorite: selectedQuestionsData.some(q => q.isFavorite),
            pinned: selectedQuestionsData.every(q => q.pinned),

            // Questão composta
            isComposite: true,
            componentQuestions: questionIds
        };

        return newCompositeQuestion;
    }, [questions]);

    const handleCombineQuestions = useCallback(async () => {
        if (selectedQuestions.size < 2) return;

        setIsCombining(true);
        try {
            const newQuestion = combineQuestions(Array.from(selectedQuestions));
            setCompositeQuestions(prev => [...prev, newQuestion]);
            clearSelection();
            setShowCombineModal(false);
            console.log('Questões combinadas com sucesso!');
        } catch (error) {
            console.log('Erro ao combinar questões');
        } finally {
            setIsCombining(false);
        }
    }, [selectedQuestions, combineQuestions, clearSelection]);

    const confirmCombineQuestions = useCallback(async () => {
        setIsCombining(true);
        setCombineError(null);

        try {
            const newQuestion = combineQuestions(Array.from(selectedQuestions));
            // Aqui você pode adicionar a nova questão ao estado
            // setQuestions(prev => [...prev, newQuestion]);

            // Ou usar um callback para o componente pai
            // onCreateCompositeQuestion?.(newQuestion);

            setShowCombineModal(false);
            clearSelection();
        } catch (error) {
            setCombineError('Falha ao combinar questões. Tente novamente.');
            console.error('Erro ao combinar questões:', error);
        } finally {
            setIsCombining(false);
        }
    }, [selectedQuestions, clearSelection, combineQuestions]);

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
        setCurrentQuestionType(type === 'all' ? 'multiple_choice' : type);
        setActiveFilters(prev => ({
            ...prev,
            types: type === 'all' ? [] : [type]
        }));
    }, [setActiveFilters]);

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

    const handleFindSimilar = useCallback(async (question: QuestionBack) => {
        setCurrentQuestionForSimilarity(question);
        try {
            console.log(`QuestionView: Buscando questões similares para ${question.title}`);
            setShowSimilarModal(true);
        } catch (error) {
            console.error('Erro ao buscar questões similares:', error);
        }
    }, []);

    const createQuestionVariant = useCallback((baseQuestion: Question): Question => {
        return {
            ...baseQuestion,
            id: `variant-${Date.now()}-${baseQuestion.id}`,
            contentId: `variant-${Date.now()}-${baseQuestion.contentId}`,
            statement: `${baseQuestion.statement} (Variação)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isVariant: true,
            sourceQuestionId: baseQuestion.id,
            // Modifique outros campos conforme necessário para a variação
            alternatives: shuffleAlternatives(baseQuestion.alternatives), // Exemplo: embaralhar alternativas
        };
    }, []);

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
    }, [createQuestionVariant]);

    if (isLoading) {
        return (
            <LoadingSpinner
                message="Carregando questões..."
            />
        );
    }

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
                    <QuestionTypeIndicator type={currentQuestionType} />
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
                            onFindSimilar={handleFindSimilar}
                            onTagClick={(tag) => console.log('Tag clicada:', tag)}
                            onCreateVariant={(questionBack) => handleCreateVariant(convertQuestionBackToQuestion(questionBack))}
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
            {isCreatingVariant && (
                <LoadingIndicator message="Criando variação..." />
            )}

            {currentQuestionForSimilarity && SimilarQuestionsModalContent}
        </>
    );
};

export default QuestionsView;