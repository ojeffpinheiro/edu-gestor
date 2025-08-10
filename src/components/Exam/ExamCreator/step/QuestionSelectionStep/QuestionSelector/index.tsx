import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';

import { useQuestionSelection } from '../../../../../../hooks/useQuestionSelection';
import { useQuestionFilters } from '../../../../../../hooks/useQuestionFilters';

import { Exam } from '../../../../../../utils/types/Exam';
import { Question } from '../../../../../../utils/types/Question';

import SearchInput from '../../../../../shared/SearchInput';
import FilterBar from '../../../../../shared/FilterBar';
import SelectedQuestionsList from './SelectedQuestionsList';
import QuestionsTable from './QuestionsTable';
import TableFooter from './TableFooter';

import {
  Button,
  Container,
  Header,
  Title,
  SelectionControls,
  ResponsiveWrapper,
} from './styles';

interface QuestionSelectorProps {
  examData: Exam;
  questions: Question[];
  selectedQuestions: Question[];
  onQuestionsSelected: (questions: Question[]) => void;
}

const QuestionSelector: React.FC<QuestionSelectorProps> = ({
  examData,
  questions,
  selectedQuestions,
  onQuestionsSelected,
}) => {
  const [showSelectedList, setShowSelectedList] = useState(false);

  const {
    searchTerm,
    setSearchTerm,
    setFilters,
    filteredQuestions,
  } = useQuestionFilters({
    questions,
    initialDiscipline: examData.discipline
  });

  const {
    toggleQuestionSelection,
    toggleSelectAll,
    clearSelection,
    isAllSelected
  } = useQuestionSelection({
    availableQuestions: filteredQuestions,
    selectedQuestions,
    onQuestionsSelected
  });

  const hasSelection = selectedQuestions.length > 0;
  const selectedCount = selectedQuestions.length;

  const handleFilterChange = (newFilters: any) => {
    setFilters({
      ...newFilters,
    });
  };

  useEffect(() => {
    setFilters({
      discipline: examData.discipline
    });
  }, [examData.discipline, setFilters]);

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
        selectAll={isAllSelected}
        onSelectAll={(select) => {
          // Garantir que estamos usando as questões filtradas
          toggleSelectAll(select);
        }}
        onSelectQuestion={(question) => {
          // Verificar se a questão existe nas filtradas
          if (filteredQuestions.some(q => q.id === question.id)) {
            toggleQuestionSelection(question);
          }
        }}
      />

      <TableFooter count={filteredQuestions.length} />
    </Container>
  );
};

export default React.memo(QuestionSelector);