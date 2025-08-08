import React, { useState } from 'react';
import { SortControls } from '../../Sort/SortControls';
import { QuestionsGrid } from '../../../styles/questionList';
import QuestionCard from '../QuestionCard';
import Filters from '../Filter/Filters';
import { Category } from '../QuestionForm/type';
import { QuestionViewModeToggle } from '../QuestionView/QuestionViewModeToggle';
import { QuestionDetailModal } from '../QuestionView/QuestionDetailModal';
import Modal from '../../modals/Modal';
import { QuestionsTable } from '../QuestionsTable';

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