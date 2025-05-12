// components/Exam/ExamCreator/QuestionSelector/index.tsx
import React, { useCallback, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaEdit, FaEye, FaTimes } from 'react-icons/fa';
import { FiRefreshCw, FiTrash2 } from 'react-icons/fi';
import { DIFFICULTY_LABELS } from './types';

import { mockQuestions } from '../../../../../mocks/question';
import { useQuestionFilters } from '../../../../../hooks/useQuestionFilters';
import { Exam } from '../../../../../utils/types/Exam';
import { Question } from '../../../../../utils/types/Question';
import SearchInput from '../../../../shared/SearchInput';
import FilterBar from '../../../../shared/FilterBar';

import {
  Button,
  Container,
  Header,
  SelectedContainer,
  Title,
  SelectedHeader,
  SelectedTitle,
  ActionButton,
  SelectedGrid,
  SelectedItem,
  ItemContent,
  ItemTitle,
  ItemMeta,
  StyledTable,
  Badge,
  ButtonGroup,
  Footer,
  Pagination,
  TableHead,
  TableHeader,
  TableRow,
  Td,
  EmptyStateMessage,
  SelectionControls,
  ResponsiveWrapper,
} from './styles';

interface QuestionSelectorProps {
  examData: Exam;
  selectedQuestions: Question[];
  onQuestionsSelected: (questions: Question[]) => void;
}

const QuestionSelector: React.FC<QuestionSelectorProps> = ({
  examData,
  selectedQuestions,
  onQuestionsSelected,
}) => {
  const [showSelectedList, setShowSelectedList] = useState(false);
  const questions = mockQuestions;
  
  const {
    searchTerm,
    setSearchTerm,
    setFilters,
    filteredQuestions,
  } = useQuestionFilters(questions, { discipline: examData.discipline });
  
  const toggleQuestionSelection = useCallback((question: Question) => {
    onQuestionsSelected(
      selectedQuestions.some(q => q.id === question.id)
        ? selectedQuestions.filter(q => q.id !== question.id)
        : [...selectedQuestions, question]
    );
  }, [selectedQuestions, onQuestionsSelected]);

  const selectAll = useCallback(() => {
    // Se todas estão selecionadas, limpa a seleção. Caso contrário, seleciona todas
    if (selectedQuestions.length === filteredQuestions.length && filteredQuestions.length > 0) {
      onQuestionsSelected([]);
    } else {
      onQuestionsSelected([...filteredQuestions]);
    }
  }, [filteredQuestions, selectedQuestions, onQuestionsSelected]);

  const clearSelection = useCallback(() => {
    onQuestionsSelected([]);
  }, [onQuestionsSelected]);

  const hasSelection = selectedQuestions.length > 0;
  const selectedCount = selectedQuestions.length;
  const allSelected = selectedQuestions.length === filteredQuestions.length && filteredQuestions.length > 0;

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };

  return (
    <Container>
      <Header>
        <Title>Seleção de Questões</Title>
        {hasSelection && (
          <SelectionControls>
            <Button
              className="info"
              onClick={() => setShowSelectedList(!showSelectedList)}
              aria-expanded={showSelectedList}
              aria-label={`${showSelectedList ? 'Ocultar' : 'Mostrar'} questões selecionadas`}
            >
              {showSelectedList ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
              Ver selecionados ({selectedCount})
            </Button>
            <Button
              className="secondary"
              onClick={clearSelection}
              aria-label="Limpar seleção"
            >
              <FaTimes size={16} /> Limpar seleção
            </Button>
          </SelectionControls>
        )}
      </Header>

      <ResponsiveWrapper>
        <SearchInput
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          placeholder="Buscar questões..."
          aria-label="Buscar questões"
        />
        <FilterBar
          onFilterChange={handleFilterChange}
        />
      </ResponsiveWrapper>

      {hasSelection && showSelectedList && (
        <SelectedQuestionsList
          questions={selectedQuestions}
          onRemove={toggleQuestionSelection}
          onClose={() => setShowSelectedList(false)}
        />
      )}

      <QuestionsTable
        questions={filteredQuestions}
        selectedItems={selectedQuestions}
        selectAll={allSelected}
        onSelectAll={selectAll}
        onSelectQuestion={toggleQuestionSelection}
      />

      <TableFooter count={filteredQuestions.length} />
    </Container>
  );
};

const SelectedQuestionsList: React.FC<{
  questions: Question[];
  onRemove: (question: Question) => void;
  onClose: () => void;
}> = ({ questions, onRemove, onClose }) => (
  <SelectedContainer>
    <SelectedHeader>
      <SelectedTitle>Questões Selecionadas ({questions.length})</SelectedTitle>
      <ActionButton
        onClick={onClose}
        className="view"
        aria-label="Fechar lista de questões selecionadas"
      >
        <FaTimes size={16} />
      </ActionButton>
    </SelectedHeader>
    <SelectedGrid>
      {questions.map(question => (
        <SelectedItem key={`selected-${question.id}`}>
          <ItemContent>
            <ItemTitle>
              {question.statement.length > 100
                ? `${question.statement.substring(0, 100)}...`
                : question.statement}
            </ItemTitle>
            <ItemMeta>
              {question.discipline} • {DIFFICULTY_LABELS[question.difficultyLevel]}
            </ItemMeta>
          </ItemContent>
          <ActionButton
            onClick={() => onRemove(question)}
            className="delete"
            aria-label={`Remover questão ${question.id}`}
          >
            <FaTimes size={16} />
          </ActionButton>
        </SelectedItem>
      ))}
    </SelectedGrid>
  </SelectedContainer>
);

const QuestionsTable: React.FC<{
  questions: Question[];
  selectedItems: Question[];
  selectAll: boolean;
  onSelectAll: () => void;
  onSelectQuestion: (question: Question) => void;
}> = React.memo(({ questions, selectedItems, selectAll, onSelectAll, onSelectQuestion }) => (
  <StyledTable>
    <TableHead>
      <tr>
        <TableHeader style={{ width: '40px' }}>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={onSelectAll}
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

const TableFooter: React.FC<{ count: number }> = ({ count }) => (
  <Footer>
    <div>Mostrando {count} questões</div>
    <Pagination>
      <ActionButton className="view" aria-label="Recarregar questões">
        <FiRefreshCw size={16} />
      </ActionButton>
      <span>Página 1 de 1</span>
    </Pagination>
  </Footer>
);

export default React.memo(QuestionSelector);