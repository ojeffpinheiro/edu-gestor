import React from 'react'
import { ActionButton, QuestionCard, QuestionGridContent } from './styles'
import { Question } from '../../../../types/evaluation/Question'
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import QuestionStats from '../QuestionStats';

interface QuestionGridProps {
    filteredQuestions: Question[];
    selectedQuestions: string[];
    toggleQuestionSelection: (questionId: string) => void;
}

const QuestionGrid: React.FC<QuestionGridProps> = ({
    filteredQuestions,
    selectedQuestions,
    toggleQuestionSelection
}) => {
    return (
        <QuestionGridContent>
            {filteredQuestions.map(question => (
                <QuestionCard key={question.id}>
                    <div className="card-header">
                        <input
                            type="checkbox"
                            checked={selectedQuestions.includes(question.id!)}
                            onChange={() => toggleQuestionSelection(question.id!)}
                        />
                        <span className={`status-badge ${question.status}`}>
                            {question.status === 'active' ? 'Ativo' :
                                question.status === 'inactive' ? 'Inativo' : 'Rascunho'}
                        </span>
                    </div>
                    <div className="card-body">
                        <h3>{question.statement.substring(0, 100)}{question.statement.length > 100 ? '...' : ''}</h3>
                        <div className="meta">
                            <span className="discipline">{question.discipline}</span>
                            <span className={`difficulty ${question.difficultyLevel}`}>
                                {question.difficultyLevel === 'easy' ? 'Fácil' :
                                    question.difficultyLevel === 'medium' ? 'Médio' : 'Difícil'}
                            </span>
                            <span className="type">
                                {question.questionType === 'multiple_choice' ? 'Múltipla escolha' :
                                    question.questionType === 'true_false' ? 'V/F' :
                                        question.questionType === 'essay' ? 'Dissertativa' : 'Lacunas'}
                            </span>
                        </div>
                        <QuestionStats question={question} />
                        {question.tags && question.tags.length > 0 && (
                            <div className="tags">
                                {question.tags.map(tag => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="card-actions">
                        <ActionButton><FiEdit2 /></ActionButton>
                        <ActionButton danger><FiTrash2 /></ActionButton>
                    </div>
                </QuestionCard>
            ))}
        </QuestionGridContent>
    )
}

export default QuestionGrid;