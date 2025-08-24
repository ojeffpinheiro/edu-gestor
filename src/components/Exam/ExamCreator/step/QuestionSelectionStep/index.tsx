import React, { useEffect, useMemo, useState } from 'react';
import { FiAlertCircle, FiArrowLeft, FiArrowRight, FiRefreshCw } from 'react-icons/fi';
import { Exam } from '../../../../../types/evaluation/Exam';
import { DifficultyLevelType, Question } from '../../../../../types/evaluation/Question';

import QuestionSelector from './QuestionSelector';
import DifficultyDistribution from './DifficultyDistribution';
import { DIFFICULTY_LABELS } from './QuestionSelector/types';
import { ButtonGroup, Container, QuestionCard, QuestionCardGrid, QuestionMeta, QuestionTitle, RandomSelectionSummary, RefreshButton, SectionHeader, SelectionModeContainer, SelectionModeToggle, SummaryTable, ToggleButton, TotalRow } from './styles';

interface QuestionSelectionStepProps {
  examData: Exam;
  questions: Question[];
  selectedQuestions: Question[];
  onQuestionsSelected: (questions: Question[]) => void;
  onDifficultyChange: (difficulty: DifficultyLevelType, value: number) => void;
  onTotalQuestionsChange: (value: number) => void;
  onRandomSelection: () => void;
  onBack: () => void;
  onNext: () => void;
  isReadyForPreview: boolean;
}

const QuestionSelectionStep: React.FC<QuestionSelectionStepProps> = ({
  examData,
  questions,
  selectedQuestions,
  isReadyForPreview,
  onQuestionsSelected,
  onDifficultyChange,
  onTotalQuestionsChange,
  onBack,
  onNext,
}) => {
  const [selectionMode, setSelectionMode] = useState<'manual' | 'random'>(
    examData.selectionMode || 'manual'
  );
  const [isGeneratingRandom, setIsGeneratingRandom] = useState(false);
  const [shouldRegenerateQuestions, setShouldRegenerateQuestions] = useState(false);

  // Filtramos as questões pela disciplina selecionada
  const availableQuestions = questions.filter(
    q => q.discipline === examData.discipline
  );

  // Função para selecionar questões aleatoriamente baseado na distribuição de dificuldade
  const generateRandomQuestions = () => {
    setIsGeneratingRandom(true);

    const newSelectedQuestions: Question[] = [];

    // Para cada nível de dificuldade na distribuição
    for (const distribution of examData.questionDistribution) {
      const difficulty = distribution.difficulty as DifficultyLevelType;
      const count = distribution.count;

      // Filtra questões disponíveis por dificuldade que não estão já selecionadas
      const questionsOfDifficulty = availableQuestions.filter(
        q => q.difficultyLevel === difficulty &&
          !newSelectedQuestions.some(selected => selected.id === q.id)
      );

      // Embaralha as questões filtradas
      const shuffled = [...questionsOfDifficulty].sort(() => 0.5 - Math.random());

      // Seleciona apenas a quantidade necessária
      const selected = shuffled.slice(0, count);

      // Adiciona ao array de questões selecionadas
      newSelectedQuestions.push(...selected);
    }

    // Atualiza as questões selecionadas
    onQuestionsSelected(newSelectedQuestions);
    setIsGeneratingRandom(false);
    setShouldRegenerateQuestions(false);
  };

  // Mudança de modo de seleção
  const handleSelectionModeChange = (mode: 'manual' | 'random') => {
    setSelectionMode(mode);

    // Se mudar para modo aleatório, já gera as questões
    if (mode === 'random') {
      generateRandomQuestions();
      setShouldRegenerateQuestions(true);
    } else {
      // Se mudar para manual, limpa as seleções
      onQuestionsSelected([]);
    }
  };

  // Se a distribuição de dificuldade mudar, regera questões aleatórias no modo aleatório
  useEffect(() => {
    if (shouldRegenerateQuestions && selectionMode === 'random') {
      generateRandomQuestions();
    }
  }, [shouldRegenerateQuestions, selectionMode]);

  // Verificação de questões insuficientes por dificuldade
  const insufficientQuestionsByDifficulty = useMemo(() => {
    return examData.questionDistribution.reduce((acc, dist) => {
      const difficulty = dist.difficulty as DifficultyLevelType;
      const available = availableQuestions.filter(q => q.difficultyLevel === difficulty).length;
      acc[difficulty] = available < dist.count;
      return acc;
    }, {} as Record<string, boolean>);
  }, [examData.questionDistribution, availableQuestions]);

  return (
    <Container>
      <SelectionModeContainer>
        <SectionHeader>Modo de Seleção de Questões</SectionHeader>
        <SelectionModeToggle>
          <ToggleButton
            onClick={() => handleSelectionModeChange('manual')}
            $active={selectionMode === 'manual'}
            aria-pressed={selectionMode === 'manual'}
          >
            Seleção Manual
          </ToggleButton>
          <ToggleButton
            onClick={() => handleSelectionModeChange('random')}
            $active={selectionMode === 'random'}
            aria-pressed={selectionMode === 'random'}
          >
            Seleção Aleatória
          </ToggleButton>
        </SelectionModeToggle>
        {selectionMode === 'random' && (
          <RefreshButton
            onClick={generateRandomQuestions}
            disabled={isGeneratingRandom}
          >
            <FiRefreshCw size={16} /> Gerar Novo Conjunto
          </RefreshButton>
        )}
      </SelectionModeContainer>

      <DifficultyDistribution
        examData={examData}
        selectedQuestions={selectedQuestions}
        onDifficultyChange={onDifficultyChange}
        onTotalQuestionsChange={onTotalQuestionsChange}
      />

      {selectionMode === 'manual' ? (
        <QuestionSelector
          questions={questions}
          examData={examData}
          selectedQuestions={selectedQuestions}
          onQuestionsSelected={onQuestionsSelected}
        />
      ) : (
        <RandomSelectionSummary>
          <SectionHeader>Questões Selecionadas Aleatoriamente</SectionHeader>

          <SummaryTable>
            <thead>
              <tr>
                <th>Dificuldade</th>
                <th>Selecionadas</th>
                <th>Alvo</th>
                <th>Disponíveis</th>
              </tr>
            </thead>
            <tbody>
              {examData.questionDistribution.map(dist => {
                const difficulty = dist.difficulty as DifficultyLevelType;
                const selectedCount = selectedQuestions.filter(
                  q => q.difficultyLevel === dist.difficulty
                ).length;
                const availableCount = availableQuestions.filter(
                  q => q.difficultyLevel === difficulty
                ).length;
                const insufficient = insufficientQuestionsByDifficulty[difficulty];

                return (
                  <tr key={difficulty} className={insufficient ? 'warning' : ''}>
                    <td>{DIFFICULTY_LABELS[dist.difficulty as DifficultyLevelType]}</td>
                    <td>{selectedCount}</td>
                    <td>{dist.count}</td>
                    <td>
                      {availableCount}
                      {insufficient && <span title="Questões insuficientes"><FiAlertCircle /></span>}
                    </td>
                  </tr>
                );
              })}
              <TotalRow>
                <td>Total</td>
                <td>{selectedQuestions.length}</td>
                <td>{examData.totalQuestions}</td>
                <td>{availableQuestions.length}</td>
              </TotalRow>
            </tbody>
          </SummaryTable>

          {selectedQuestions.length > 0 && (
            <div className="selected-questions-list">
              <h4>Lista de Questões ({selectedQuestions.length})</h4>
              <QuestionCardGrid>
                {selectedQuestions.map(question => (
                  <QuestionCard key={question.id} $difficulty={question.difficultyLevel}>
                    <QuestionTitle>
                      {question.statement.length > 100
                        ? `${question.statement.substring(0, 100)}...`
                        : question.statement}
                    </QuestionTitle>
                    <QuestionMeta>
                      <span className={`difficulty ${question.difficultyLevel}`}>
                        {DIFFICULTY_LABELS[question.difficultyLevel]}
                      </span>
                      <span className="type">{question.questionType}</span>
                    </QuestionMeta>
                  </QuestionCard>
                ))}
              </QuestionCardGrid>
            </div>
          )}
        </RandomSelectionSummary>
      )}

      <ButtonGroup>
        <button type="button" onClick={onBack} className="secondary">
          <FiArrowLeft /> Voltar
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!isReadyForPreview}
          title={!isReadyForPreview ? `Selecione ${examData.totalQuestions} questões para visualizar` : ""}
        >
          Pré-visualizar <FiArrowRight />
        </button>
      </ButtonGroup>
    </Container>
  );
};

export default QuestionSelectionStep;