import React, { useState } from 'react';
import { SortControls } from '../../Sort/SortControls';
import { QuestionsGrid } from '../../../styles/questionList';
import QuestionCard from '../QuestionCard';
import Filters from '../Filter/Filters';
import { Category } from '../QuestionForm/type';
import QuestionViewModeToggle from '../QuestionView/QuestionViewModeToggle';
import QuestionDetailModal from '../QuestionView/QuestionDetailModal';
import Modal from '../../modals/Modal';
import QuestionsTable from '../QuestionsTable';
import { QuestionBack as Question, QuestionType } from '../../../utils/types/Question';

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
    onFindSimilar?: (questionId: string | number) => void;
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
    onSortChange,
    onFindSimilar
}) => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
    const [selectedQuestions, setSelectedQuestions] = useState<Set<string | number>>(new Set());
    const [showCombineModal, setShowCombineModal] = useState(false);

    const difficultyOptions = [
        { value: 'easy', label: 'Fácil' },
        { value: 'medium', label: 'Médio' },
        { value: 'hard', label: 'Difícil' }
    ];
    const categoryOptions = [
        { value: 'math', label: 'Matemática' },
        { value: 'science', label: 'Ciências' }
    ];

    const handleQuestionSelect = (id: string | number) => {
        const newSelected = new Set(selectedQuestions);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedQuestions(newSelected);
    };

    const handleViewQuestion = (question: any) => {
        setSelectedQuestion(question);
    };

    const handleEditQuestion = (question: any) => {
        console.log('Editar questão:', question);
        // Implement edit functionality
    };

    const handleDeleteQuestion = (question: any) => {
        console.log('Excluir questão:', question);
        // Implement delete functionality
    };

    const handleCombineQuestions = () => {
        if (selectedQuestions.size > 1) {
            setShowCombineModal(true);
        }
    };

    const confirmCombineQuestions = () => {
        console.log('Combining questions:', Array.from(selectedQuestions));
        // Implement combine functionality
        setShowCombineModal(false);
        setSelectedQuestions(new Set());
    };

    const handleFindSimilar = (question: Question) => {
        console.log('Buscando similares a:', question.id);
        // Lógica para buscar questões similares (por tags, conteúdo, etc.)
    };

    const handleCreateVariant = (question: Question) => {
        console.log('Criando variação de:', question);
        // Lógica para criar variação (copiar questão com modificações)
    };
    const handleRateQuestion = (id: string | number, rating: number) => {
        // Atualize o estado ou faça chamada API
        console.log(`Avaliando questão ${id} com ${rating} estrelas`);
    };

    const handleToggleFavorite = (id: string | number) => {
        // Atualize o estado ou faça chamada API
        console.log(`Alternando favorito para questão ${id}`);
    };

    const handleQuestionTypeFilter = (type: QuestionType | 'all') => {
        console.log('Filtrando por tipo:', type);
        // Implemente a filtragem por tipo
    };

    const renderAnswerPreview = (question: Question) => {
        switch (question.type) {
            case 'multiple_choice':
                return question.answers?.map(a => (
                    <div key={a.id}>
                        {a.content} {a.isCorrect && '✓'}
                    </div>
                ));
            case 'true_false':
                return <div>Resposta: {question.answers?.[0]?.content}</div>;
            case 'essay':
                return <div>Modelo de resposta: {question.explanation}</div>;
            default:
                return null;
        }
    };

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
                    value={sortField}
                    direction={sortDirection}
                    onChange={(value, dir) => onSortChange(value, dir || 'desc')} // Fornece um valor padrão
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
                    {questions.map(question => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            onView={() => handleViewQuestion(question)}
                            onEdit={() => handleEditQuestion(question)}
                            onDelete={() => handleDeleteQuestion(question)}
                            onTagClick={(tag) => console.log('Tag clicada:', tag)}
                            selected={selectedQuestions.has(question.id)}
                            onSelect={handleQuestionSelect}
                            onRate={handleRateQuestion}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    ))}
                </QuestionsGrid>
            ) : (
                <QuestionsTable
                    questions={questions}
                    onView={handleViewQuestion}
                    onEdit={handleEditQuestion}
                    onDelete={handleDeleteQuestion}
                    selectedQuestions={selectedQuestions}
                    onSelect={handleQuestionSelect}
                />
            )}

            {selectedQuestion && (
                <QuestionDetailModal
                    question={selectedQuestion}
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
                <Modal
                    title="Combinar Questões"
                    isOpen={true}
                    onClose={() => setShowCombineModal(false)}
                    size="md"
                >
                    <p>Você está prestes a combinar {selectedQuestions.size} questões em uma nova questão composta.</p>
                    <p>Esta ação criará uma nova questão que referencia as questões selecionadas.</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                        <button onClick={() => setShowCombineModal(false)}>Cancelar</button>
                        <button
                            onClick={confirmCombineQuestions}
                            style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                        >
                            Confirmar Combinação
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default QuestionsView;