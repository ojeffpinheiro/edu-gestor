import React from 'react'
import { FiTrash2 } from 'react-icons/fi';
import { DIFFICULTY_LABELS } from './types';
import { FaEdit, FaEye } from 'react-icons/fa';
import { Question } from '../../../../../../utils/types/Question';

import {
    ActionButton,
    Badge,
    ButtonGroup,
    EmptyStateMessage,
    StyledTable,
    TableHead,
    TableHeader,
    TableRow,
    Td
} from './styles';

const QuestionsTable: React.FC<{
    questions: Question[];
    selectedItems: Question[];
    selectAll: boolean;
    onSelectAll: (select: boolean) => void;
    onSelectQuestion: (question: Question) => void;
}> = React.memo(({ questions, selectedItems, selectAll, onSelectAll, onSelectQuestion }) => (
    <StyledTable>
        <TableHead>
            <tr>
                <TableHeader style={{ width: '40px' }}>
                    <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={(e) => onSelectAll(e.target.checked)}
                        aria-label={selectAll ? 'Desmarcar todas as questões' : 'Marcar todas as questões'}
                    />
                </TableHeader>
                <TableHeader>Questão</TableHeader>
                <TableHeader>Tipo</TableHeader>
                <TableHeader>Dificuldade</TableHeader>
                <TableHeader style={{ textAlign: 'right' }}>Ações</TableHeader>
            </tr>
        </TableHead>
        <tbody>
            {questions.length > 0 ? (
                questions.map((question) => {
                    const isSelected = selectedItems.some(q => q.id === question.id);
                    return (
                        <TableRow key={question.id} className={isSelected ? 'selected' : ''}>
                            <Td style={{ width: '40px' }}>
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => onSelectQuestion(question)}
                                    aria-label={`${isSelected ? 'Desmarcar' : 'Marcar'} questão ${question.id}`}
                                />
                            </Td>
                            <Td>
                                {question.statement.length > 100
                                    ? `${question.statement.substring(0, 100)}...`
                                    : question.statement}
                            </Td>
                            <Td>{question.questionType}</Td>
                            <Td>
                                <Badge className={question.difficultyLevel}>
                                    {DIFFICULTY_LABELS[question.difficultyLevel]}
                                </Badge>
                            </Td>
                            <Td style={{ textAlign: 'right' }}>
                                <ButtonGroup>
                                    <ActionButton className="view" aria-label={`Visualizar questão ${question.id}`}>
                                        <FaEye size={18} />
                                    </ActionButton>
                                    <ActionButton className="edit" aria-label={`Editar questão ${question.id}`}>
                                        <FaEdit size={18} />
                                    </ActionButton>
                                    <ActionButton className="delete" aria-label={`Excluir questão ${question.id}`}>
                                        <FiTrash2 size={18} />
                                    </ActionButton>
                                </ButtonGroup>
                            </Td>
                        </TableRow>
                    );
                })
            ) : (
                <tr>
                    <td colSpan={6}>
                        <EmptyStateMessage>Nenhuma questão encontrada com os filtros atuais</EmptyStateMessage>
                    </td>
                </tr>
            )}
        </tbody>
    </StyledTable>
));

export default QuestionsTable;