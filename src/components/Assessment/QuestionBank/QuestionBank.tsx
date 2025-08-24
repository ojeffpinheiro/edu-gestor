import React, { useState } from 'react';
import { useQuestionBank } from '../../../hooks/assessment/useQuestionBank';
import { Question } from '../../../types/academic/Assessment';

interface QuestionFiltersProps {
    filters: {
        category: string;
        difficulty: string;
        searchTerm: string;
    };
    categories: string[];
    onFilterChange: (filters: any) => void;
}

interface QuestionFormProps {
    question?: Question;
    onSubmit: (question: any) => void;
    onCancel: () => void;
}

interface QuestionListProps {
    questions: Question[];
    onEdit: (question: Question) => void;
    onDelete: (id: string) => void;
}

const QuestionFilters: React.FC<QuestionFiltersProps> = ({
    filters,
    categories,
    onFilterChange
}) => {
    return (
        <div className="filters-container">
            <h3>Filtros</h3>
            <div className="filter-group">
                <label htmlFor="category">Categoria:</label>
                <select
                    id="category"
                    value={filters.category}
                    onChange={(e) => onFilterChange({ category: e.target.value })}
                >
                    <option value="">Todas as categorias</option>
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="difficulty">Dificuldade:</label>
                <select
                    id="difficulty"
                    value={filters.difficulty}
                    onChange={(e) => onFilterChange({ difficulty: e.target.value })}
                >
                    <option value="">Todas as dificuldades</option>
                    <option value="easy">Fácil</option>
                    <option value="medium">Médio</option>
                    <option value="hard">Difícil</option>
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="searchTerm">Buscar:</label>
                <input
                    id="searchTerm"
                    type="text"
                    value={filters.searchTerm}
                    onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
                    placeholder="Buscar por conteúdo..."
                />
            </div>
        </div>
    );
};

const QuestionList: React.FC<QuestionListProps> = ({
    questions,
    onEdit,
    onDelete
}) => {
    return (
        <div className="question-list">
            <h3>Questões ({questions.length})</h3>
            {questions.length === 0 ? (
                <p>Nenhuma questão encontrada com os filtros selecionados.</p>
            ) : (
                <ul>
                    {questions.map(question => (
                        <li key={question.id} className="question-item">
                            <div className="question-content">
                                <p>{question.content}</p>
                                <div className="question-meta">
                                    <span className="difficulty">
                                        Dificuldade: {question.difficulty}
                                    </span>
                                    <span className="categories">
                                        Categorias: {question.categories.join(', ')}
                                    </span>
                                </div>
                            </div>
                            <div className="question-actions">
                                <button onClick={() => onEdit(question)}>Editar</button>
                                <button onClick={() => onDelete(question.id)}>Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const QuestionForm: React.FC<QuestionFormProps> = ({
    question,
    onSubmit,
    onCancel
}) => {
    const isEditing = !!question;
    const [formData, setFormData] = useState({
        content: question?.content || '',
        difficulty: question?.difficulty || 'medium',
        categories: question?.categories?.join(', ') || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const categoriesArray = formData.categories
            .split(',')
            .map(category => category.trim())
            .filter(category => category);

        const questionData = {
            ...question,
            content: formData.content,
            difficulty: formData.difficulty as 'easy' | 'medium' | 'hard',
            categories: categoriesArray,
        };

        onSubmit(questionData);
    };

    return (
        <div className="question-form">
            <h3>{isEditing ? 'Editar Questão' : 'Nova Questão'}</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="content">Conteúdo da Questão:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows={5}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="difficulty">Dificuldade:</label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        required
                    >
                        <option value="easy">Fácil</option>
                        <option value="medium">Médio</option>
                        <option value="hard">Difícil</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="categories">Categorias (separadas por vírgula):</label>
                    <input
                        id="categories"
                        name="categories"
                        value={formData.categories}
                        onChange={handleChange}
                        placeholder="Matemática, Álgebra, Equações..."
                    />
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onCancel}>Cancelar</button>
                    <button type="submit">{isEditing ? 'Salvar Alterações' : 'Adicionar Questão'}</button>
                </div>
            </form>
        </div>
    );
};

const QuestionBank: React.FC = () => {
    const {
        questions,
        filters,
        updateFilters,
        categories,
        addQuestion,
        updateQuestion,
        deleteQuestion
    } = useQuestionBank();

    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleFilterChange = (newFilters: any) => {
        updateFilters(newFilters);
    };

    const handleEditQuestion = (question: Question) => {
        setEditingQuestion(question);
        setIsFormVisible(true);
    };

    const handleAddQuestion = () => {
        setEditingQuestion(null);
        setIsFormVisible(true);
    };

    const handleFormSubmit = async (questionData: any) => {
        try {
            if (editingQuestion) {
                await updateQuestion({
                    ...editingQuestion,
                    ...questionData
                });
            } else {
                await addQuestion(questionData);
            }
            setIsFormVisible(false);
            setEditingQuestion(null);
        } catch (error) {
            console.error('Error saving question:', error);
            // Show error message to user
        }
    };

    const handleFormCancel = () => {
        setIsFormVisible(false);
        setEditingQuestion(null);
    };

    const handleDeleteQuestion = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir esta questão?')) {
            try {
                await deleteQuestion(id);
            } catch (error) {
                console.error('Error deleting question:', error);
                // Show error message to user
            }
        }
    };

    return (
        <div className="question-bank-container">
            <div className="question-bank-header">
                <h1>Banco de Questões</h1>
                <button onClick={handleAddQuestion}>Nova Questão</button>
            </div>

            <div className="question-bank-content">
                <aside className="filters-sidebar">
                    <QuestionFilters
                        filters={filters as any}
                        categories={categories}
                        onFilterChange={handleFilterChange}
                    />
                </aside>

                <main className="questions-main">
                    <QuestionList
                        questions={questions}
                        onEdit={handleEditQuestion}
                        onDelete={handleDeleteQuestion}
                    />
                </main>
            </div>

            {isFormVisible && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <QuestionForm
                            question={editingQuestion || undefined}
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormCancel}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionBank;