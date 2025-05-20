import React, { useState } from 'react';
import {
  FaEye,
  FaEyeSlash,
  FaArrowUp,
  FaArrowDown,
  FaTrash,
  FaQrcode,
  FaFileExport,
  FaCheckCircle,
  FaBalanceScale,
  FaEdit,
  FaQuestion
} from 'react-icons/fa';

import {
  ActionButton,
  Answer,
  ButtonsContainer,
  Container,
  Controls,
  ExamContainer,
  ExamContent,
  Header,
  Option,
  OptionLetter,
  OptionText,
  Options,
  QuestionActions,
  QuestionItem,
  QuestionText,
  Title,
  ToggleButton,
  ExamQuestionNumber,
  EmptyState,
  QuestionsList,
  QuestionContent,
  OptionsGrid,
  OptionItem,
  CorrectAnswer,
  ExamFooter,
  PrintStyles,
  QuestionBody,
  TypeIndicator,
  SourceText,
  OptionsContainer,
  OptionCircle
} from './styles'
import { Button } from '../../../../styles/buttons';
import QRCodeGenerator from '../../QRCodeGenerator';
import { Exam } from '../../../../utils/types/Exam';
import HeaderPreview from '../HeaderSection/HeaderPreview';
import { ButtonGroup } from '../QuestionSelectionStep/QuestionSelectionStep.styles';
import { FiArrowLeft } from 'react-icons/fi';

interface ExamPreviewProps {
  examData: Exam;
  onBack: () => void;
  onComplete: (data: Exam) => void;
  onReset: () => void;
}

function ExamPreview({ examData, onBack, onComplete }: ExamPreviewProps) {
  const [showQRModal, setShowQRModal] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  let mode = 'edit';


  const isGridLayout = true;

  const [questions, setQuestions] = useState(examData.questions);

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const handleComplete = () => {
    onComplete({
      ...examData,
      questions: questions
    });
  };

  return (
    <>
      <PrintStyles />
      <Container>
        <Header>
          <Title>{examData.title} - Pré-visualização</Title>
          {mode === 'edit' && (
            <Controls>
              <ToggleButton
                active={showAnswers}
                onClick={toggleAnswers}
                aria-label={showAnswers ? "Ocultar respostas" : "Mostrar respostas"}
              >
                {showAnswers ? <FaEyeSlash /> : <FaEye />}
                {showAnswers ? "Ocultar Respostas" : "Mostrar Respostas"}
              </ToggleButton>
            </Controls>
          )}
        </Header>

        <ExamContainer>
          <HeaderPreview examData={examData} />

          <ExamContent
            isGrid={isGridLayout}
            columns={2}
            compact={examData.compactMode}
            className="enem-style"
          >
            {questions.length === 0 ? (
              <EmptyState>Nenhuma questão adicionada à prova.</EmptyState>
            ) : (
              <QuestionsList>
                {questions.map((question, index) => (
                  <QuestionItem
                    key={question.id}
                    questionNumber={index + 1}
                    isGrid={isGridLayout}
                  >
                    <QuestionBody>
                      <QuestionText>{question.statement}</QuestionText>

                      {question.source && (
                        <SourceText>
                          {question.source}
                          {question.accessDate && ` (Acesso em: ${question.accessDate})`}
                        </SourceText>
                      )}

                      {question.questionType === 'multiple_choice' && (
                        <OptionsContainer columns={question.optionsLayout === 'two-columns' ? 2 : 1}>
                          {question.alternatives?.map((option, optIndex) => (
                            <OptionItem key={optIndex}>
                              <OptionCircle>
                                {String.fromCharCode(97 + optIndex).toUpperCase()}
                              </OptionCircle>
                              <OptionText>{option.text}</OptionText>
                            </OptionItem>
                          ))}
                        </OptionsContainer>
                      )}
                    </QuestionBody>
                  </QuestionItem>
                ))}
              </QuestionsList>
            )}
          </ExamContent>

          {/* Rodapé estilo ENEM */}
          <ExamFooter>
            <div className="page-info">Página 1 de 1</div>
            {examData.schoolName && (
              <div className="school-info">{examData.schoolName}</div>
            )}
          </ExamFooter>

          {mode === 'edit' && (
            <ButtonsContainer>
              <Button variant="info" onClick={() => setShowQRModal(true)}>
                <FaQrcode /> Gerar QR Code
              </Button>
              <Button variant="primary" onClick={handleComplete}>
                <FaFileExport /> Exportar Prova
              </Button>
            </ButtonsContainer>
          )}
        </ExamContainer>

        {mode === 'edit' && (
          <ButtonGroup>
            <button type="button" onClick={onBack} className="secondary">
              <FiArrowLeft /> Voltar
            </button>
          </ButtonGroup>
        )}

        {showQRModal && (
          <QRCodeGenerator
            onClose={() => setShowQRModal(false)}
            examId={examData.uuid || `EXAM-${Date.now()}`}
          />
        )}
      </Container>
    </>
  );
}

const QuestionTypeIndicator = ({ type }: { type: string }) => {
  const getIcon = () => {
    switch (type) {
      case 'multiple_choice': return <FaCheckCircle />;
      case 'true_false': return <FaBalanceScale />;
      case 'essay': return <FaEdit />;
      default: return <FaQuestion />;
    }
  };

  return (
    <TypeIndicator type={type}>
      {getIcon()}
      <span>{type.replace('_', ' ').toUpperCase()}</span>
    </TypeIndicator>
  );
};

export default ExamPreview;