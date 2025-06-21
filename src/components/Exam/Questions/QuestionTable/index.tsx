import React from 'react'
import { ActionButton, QuestionTableContent, TableHeader, TableRow } from './styles';
import { Question } from '../../../../utils/types/Question';
import { FiBookmark, FiCopy, FiEdit2, FiZoomIn } from 'react-icons/fi';

interface QuestionTableProps {
    selectedQuestions: string[];
    filteredQuestions: Question[];
    sortedQuestions: Question[];
    createVariation: (question: Question) => void;
    findSimilarQuestions: (question: Question) => Question[];
    toggleQuestionSelection: (questionId: string) => void;
    onQuestionSelectAll : () => void;
    onSort: (key: keyof Question) => void;
    togglePin: (questionId: string) => void;
}

const QuestionTable: React.FC<QuestionTableProps> = ({
    selectedQuestions,
    filteredQuestions,
    sortedQuestions,
    createVariation,
    findSimilarQuestions,
    toggleQuestionSelection,
    onQuestionSelectAll,
    onSort,
    togglePin
}) => {
    return (
        <QuestionTableContent>
            <TableHeader>
                <div>
                    <input
                        type="checkbox"
                        checked={selectedQuestions.length === filteredQuestions.length && filteredQuestions.length > 0}
                        onChange={onQuestionSelectAll}
                    />
                </div>
                <div onClick={() => onSort('discipline')}>DISCIPLINA</div>
                <div onClick={() => onSort('difficultyLevel')}>DIFICULDADE</div>
                <div>ENUNCIADO</div>
                <div>TIPO</div>
                <div>STATUS</div>
                <div>AÇÕES</div>
            </TableHeader>

            {sortedQuestions.map(question => (
                <TableRow key={question.id}>
                    <div>
                        <input
                            type="checkbox"
                            checked={selectedQuestions.includes(question.id!)}
                            onChange={() => toggleQuestionSelection(question.id!)}
                        />
                    </div>
                    <div>
                        <strong>{question.statement.substring(0, 100)}{question.statement.length > 100 ? '...' : ''}</strong>
                        {question.tags && question.tags.length > 0 && (
                            <p>{question.tags.join(', ')}</p>
                        )}
                    </div>
                    <div>{question.discipline}</div>
                    <div>
                        {question.difficultyLevel === 'easy' ? 'Fácil' :
                            question.difficultyLevel === 'medium' ? 'Médio' : 'Difícil'}
                    </div>
                    <div>
                        {question.questionType === 'multiple_choice' ? 'Múltipla escolha' :
                            question.questionType === 'true_false' ? 'V/F' :
                                question.questionType === 'essay' ? 'Dissertativa' : 'Lacunas'}
                    </div>
                    <div>
                        {question.status === 'active' ? 'Ativo' :
                            question.status === 'inactive' ? 'Inativo' : 'Rascunho'}
                    </div>
                    <div>
                        <ActionButton onClick={() => createVariation(question)}>
                            <FiCopy /> Criar Variação
                        </ActionButton>

                        <ActionButton onClick={() => {
                            const similar = findSimilarQuestions(question);
                            alert(`${similar.length} questões similares encontradas`);
                        }}>
                            <FiZoomIn /> Encontrar Similares
                        </ActionButton>

                        <ActionButton><FiEdit2 /> Editar</ActionButton>
                        <ActionButton onClick={() => togglePin(question.id!)}>
                            {question.pinned ? <FiBookmark /> : <FiBookmark />}
                        </ActionButton>
                    </div>
                </TableRow>
            ))}
        </QuestionTableContent>
    )
}

export default QuestionTable;