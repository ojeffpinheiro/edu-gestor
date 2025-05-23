import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FiAlertCircle, FiArrowLeft, FiArrowRight, FiRefreshCw } from 'react-icons/fi';
import { Exam } from '../../../../../utils/types/Exam';
import { DifficultyLevelType, Question } from '../../../../../utils/types/Question';

import QuestionSelector from './QuestionSelector';
import DifficultyDistribution from './DifficultyDistribution';
import { DIFFICULTY_LABELS } from './QuestionSelector/types';

import { 
    Container,
    SelectionModeContainer,
    SectionHeader,
    SelectionModeToggle,
    ToggleButton,
    RefreshButton,
    RandomSelectionSummary,
    LoadingIndicator,
    InfoMessage,
    SummaryTable,
    TotalRow,
    QuestionCardGrid,
    QuestionCard,
    QuestionTitle,
    QuestionMeta,
    ButtonGroup
 } from './styles';

interface QuestionSelectionStepProps {
  examData: Exam;
  questions: Question[];
  availableQuestions: Question[];
  selectedQuestions: Question[];
  onQuestionsSelected: (questions: Question | Question[]) => void;
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
  availableQuestions,
  onQuestionsSelected,
  onDifficultyChange,
  onTotalQuestionsChange,
  onBack,
  onNext,
}) => {
  const [selectionMode, setSelectionMode] = useState<'manual' | 'random'>(examData.selectionMode || 'manual');
  const [isGeneratingRandom, setIsGeneratingRandom] = useState(false);
  const [shouldRegenerateQuestions, setShouldRegenerateQuestions] = useState(false);

  // Geração de questões aleatórias com base na distribuição de dificuldade
  const generateRandomQuestions = useCallback(() => {
    setIsGeneratingRandom(true);
    try {
      const newSelectedQuestions: Question[] = [];

      // Verificar se há questões suficientes para cada dificuldade
      const canGenerate = examData.questionDistribution.every(dist => {
        const difficulty = dist.difficulty as DifficultyLevelType;
        return availableQuestions.filter(q => q.difficultyLevel === difficulty).length >= dist.count;
      });

      if (!canGenerate) {
        throw new Error('Não há questões suficientes para a distribuição solicitada');
      }

      // Gerar questões para cada categoria de dificuldade
      examData.questionDistribution.forEach(dist => {
        const difficulty = dist.difficulty as DifficultyLevelType;
        const questionsOfDifficulty = availableQuestions
          .filter(q => q.difficultyLevel === difficulty)
          .sort(() => Math.random() - 0.5)
          .slice(0, dist.count);

        newSelectedQuestions.push(...questionsOfDifficulty);
      });

      onQuestionsSelected(newSelectedQuestions);
    } catch (error) {
      onQuestionsSelected([]); // Envia array vazio em caso de erro
    } finally {
      setIsGeneratingRandom(false);
      setShouldRegenerateQuestions(false);
    }
  }, [examData.questionDistribution, availableQuestions, onQuestionsSelected]);

  // Manipulação do modo de seleção
  const handleSelectionModeChange = useCallback((mode: 'manual' | 'random') => {
    setSelectionMode(mode);
    onQuestionsSelected([]);

    if (mode === 'random') {
      setShouldRegenerateQuestions(true);
    }
  }, [onQuestionsSelected]);

  // Efeito para gerar questões quando necessário
  useEffect(() => {
    if (shouldRegenerateQuestions && selectionMode === 'random') {
      generateRandomQuestions();
    }
  }, [shouldRegenerateQuestions, selectionMode, generateRandomQuestions]);

  // Agrupamento de questões por dificuldade para visualização
  const questionsByDifficulty = useMemo(() => {
    return selectedQuestions.reduce((acc, question) => {
      const difficulty = question.difficultyLevel;
      acc[difficulty] = (acc[difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [selectedQuestions]);

  // Verificação de questões insuficientes por dificuldade
  const insufficientQuestionsByDifficulty = useMemo(() => {
    return examData.questionDistribution.reduce((acc, dist) => {
      const difficulty = dist.difficulty as DifficultyLevelType;
      const available = availableQuestions.filter(q => q.difficultyLevel === difficulty).length;
      acc[difficulty] = available < dist.count;
      return acc;
    }, {} as Record<string, boolean>);
  }, [examData.questionDistribution, availableQuestions]);

  const handleClick = () =>{
    onNext();
    console.log(examData);
  }

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
            onClick={() => setShouldRegenerateQuestions(true)}
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

          {isGeneratingRandom ? (
            <LoadingIndicator aria-busy="true" />
          ) : (
            <>
              {Object.values(insufficientQuestionsByDifficulty).some(Boolean) && (
                <InfoMessage $warning>
                  <FiAlertCircle size={20} />
                  Aviso: Não há questões suficientes para algumas dificuldades.
                </InfoMessage>
              )}

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
                    const selectedCount = questionsByDifficulty[difficulty] || 0;
                    const availableCount = availableQuestions.filter(
                      q => q.difficultyLevel === difficulty
                    ).length;
                    const insufficient = insufficientQuestionsByDifficulty[difficulty];

                    return (
                      <tr key={difficulty} className={insufficient ? 'warning' : ''}>
                        <td>{DIFFICULTY_LABELS[difficulty]}</td>
                        <td>{selectedCount}</td>
                        <td>{dist.count}</td>
                        <td>
                          {availableCount}
                          {insufficient && <span title="Questões insuficientes">⚠️</span>}
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
                          {question.statement.substring(0, 100)}
                          {question.statement.length > 100 && '...'}
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
            </>
          )}
        </RandomSelectionSummary>
      )}

      <ButtonGroup>
        <button type="button" onClick={onBack} className="secondary">
          <FiArrowLeft /> Voltar
        </button>
        <button
          type="button"
          onClick={handleClick}
          disabled={!isReadyForPreview}
          title={!isReadyForPreview ? `Selecione ${examData.totalQuestions} questões` : ""}
        >
          Pré-visualizar <FiArrowRight />
        </button>
      </ButtonGroup>
    </Container>
  );
};

export default React.memo(QuestionSelectionStep);