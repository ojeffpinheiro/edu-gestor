import React from 'react';
import styled from 'styled-components';
import { Question, QUESTION_TYPE_LABELS } from '../../utils/types/Question';
import { FaPencilAlt, FaRegEye } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
`;

const TableHeader = styled.thead`
  background-color: var(--color-background-secondary);
`;

const TableRow = styled.tr<{ selected?: boolean }>`
  border-bottom: 1px solid var(--color-border);
  background-color: ${({ selected }) =>
    selected ? 'var(--color-primary-light)' : 'transparent'};
  
  &:hover {
    background-color: var(--color-background-secondary);
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  text-align: left;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
`;

const SelectCell = styled(TableCell)`
  width: 40px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  margin-right: 0.5rem;
  
  &:hover {
    color: var(--color-primary);
  }
`;

interface QuestionsTableProps {
  questions: Question[];
  selectedQuestions: Set<string | number>;
  isSelectAll: boolean;
  onView: (question: Question) => void;
  onEdit: (question: Question) => void;
  onDelete: (question: Question) => void;
  onSelect: (id: string | number) => void;
  onSelectAll: () => void;
}

const QuestionsTable: React.FC<QuestionsTableProps> = ({
  questions,
  selectedQuestions,
  isSelectAll,
  onView,
  onEdit,
  onDelete,
  onSelect,
  onSelectAll,
}) => {
  return (
    <Table>
      <TableHeader>
        <tr>
          <TableHeaderCell>
            <input
              type="checkbox"
              checked={isSelectAll}
              onChange={onSelectAll}
            />
          </TableHeaderCell>
          <TableHeaderCell>Título</TableHeaderCell>
          <TableHeaderCell>Categoria</TableHeaderCell>
          <TableHeaderCell>Dificuldade</TableHeaderCell>
          <TableHeaderCell>Tipo</TableHeaderCell>
          <TableHeaderCell>Ações</TableHeaderCell>
        </tr>
      </TableHeader>
      <tbody>
        {questions.map(question => (
          <TableRow key={question.id} selected={selectedQuestions.has(question.id)}>
            <SelectCell>
              <input
                type="checkbox"
                checked={selectedQuestions.has(question.id)}
                onChange={() => onSelect(question.id)}
              />
            </SelectCell>
            <TableCell>{question.statement}</TableCell>
            <TableCell>{question.discipline}</TableCell>
            <TableCell>
              <span style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                ...(question.difficultyLevel === 'easy' && {
                  backgroundColor: '#e6f7e6',
                  color: '#52c41a'
                }),
                ...(question.difficultyLevel === 'medium' && {
                  backgroundColor: '#fff7e6',
                  color: '#fa8c16'
                }),
                ...(question.difficultyLevel === 'hard' && {
                  backgroundColor: '#fff1f0',
                  color: '#f5222d'
                })
              }}>
                {question.difficultyLevel === 'easy' && 'Fácil'}
                {question.difficultyLevel === 'medium' && 'Médio'}
                {question.difficultyLevel === 'hard' && 'Difícil'}
              </span>
            </TableCell>
            <TableCell>
              {QUESTION_TYPE_LABELS[question.questionType]}
            </TableCell>
            <TableCell>
              <ActionButton onClick={() => onView(question)} title="Visualizar">
                <FaRegEye />
              </ActionButton>
              <ActionButton onClick={() => onEdit(question)} title="Editar">
                <FaPencilAlt />
              </ActionButton>
              <ActionButton onClick={() => onDelete(question)} title="Excluir">
                <FiTrash2 />
              </ActionButton>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default QuestionsTable;