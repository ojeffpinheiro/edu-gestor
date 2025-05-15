import React, { useState } from 'react';
import {
  FaEye,
  FaEyeSlash,
  FaArrowUp,
  FaArrowDown,
  FaTrash,
  FaEdit,
  FaQrcode,
  FaFileExport
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
  ExamQuestionNumber
} from './styles'
import { Button } from '../../../../styles/buttons';
import QRCodeGenerator from '../../QRCodeGenerator';
import { Exam } from '../../../../utils/types/Exam';
import HeaderPreview from '../HeaderSection/HeaderPreview';

interface ExamPreviewProps {
  examData: Exam;
  onBack: () => void;
  onComplete: (data: Exam) => void;
}

function ExamPreview({ examData, onBack, onComplete }: ExamPreviewProps) {
  const [showQRModal, setShowQRModal] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [questions, setQuestions] = useState(examData.questions);

  const moveQuestion = (id: number | undefined, direction: 'up' | 'down') => {
    if (!id) return;
    const updatedQuestions = [...questions];
    const index = updatedQuestions.findIndex(q => q.id === id);

    if ((direction === 'up' && index === 0) ||
      (direction === 'down' && index === updatedQuestions.length - 1)) {
      return;
    }

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [updatedQuestions[index], updatedQuestions[newIndex]] =
      [updatedQuestions[newIndex], updatedQuestions[index]];

    setQuestions(updatedQuestions);
  };

  const removeQuestion = (id: number) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

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
    <Container>
      <Header>
        <Title>Pré-visualização da Prova</Title>
        <Controls>
          <ToggleButton
            active={showAnswers}
            onClick={toggleAnswers}
            aria-label={showAnswers ? "Ocultar respostas" : "Mostrar respostas"}
          >
            {showAnswers ? (
              <>
                <FaEyeSlash />
                Ocultar Respostas
              </>
            ) : (
              <>
                <FaEye />
                Mostrar Respostas
              </>
            )}
          </ToggleButton>
        </Controls>
      </Header>

      <ExamContainer>
        <HeaderPreview examData={examData} />
        
        <ExamContent>
          {questions.map((question, index) => (
            <QuestionItem key={question.id}>
              <QuestionActions>
                <ActionButton
                  onClick={() => moveQuestion(question.id, 'up')}
                  disabled={index === 0}
                  aria-label="Mover questão para cima"
                >
                  <FaArrowUp />
                </ActionButton>
                <ActionButton
                  onClick={() => moveQuestion(question.id, 'down')}
                  disabled={index === questions.length - 1}
                  aria-label="Mover questão para baixo"
                >
                  <FaArrowDown />
                </ActionButton>
                <ActionButton
                  color="#f8d7da"
                  hoverColor="#dc3545"
                  onClick={() => question.id && removeQuestion(question.id)}
                  aria-label="Remover questão"
                >
                  <FaTrash />
                </ActionButton>
                <ActionButton
                  color="#e3f2fd"
                  hoverColor="#1976d2"
                  aria-label="Editar questão"
                >
                  <FaEdit />
                </ActionButton>
              </QuestionActions>

              <ExamQuestionNumber>{index + 1}.</ExamQuestionNumber>
              <QuestionText>{question.statement}</QuestionText>

              {question.questionType === 'multiple_choice' && question.alternatives && (
                <Options>
                  {question.alternatives.map((option, optIndex) => (
                    <Option key={optIndex}>
                      <OptionLetter>{String.fromCharCode(97 + optIndex)})</OptionLetter>
                      <OptionText>{String(option.text)}</OptionText>
                    </Option>
                  ))}
                </Options>
              )}

              {showAnswers && question.correctAnswer && (
                <Answer>
                  <strong>Resposta:</strong> {question.correctAnswer}
                </Answer>
              )}
            </QuestionItem>
          ))}

          {questions.length === 0 && (
            <div style={{ textAlign: 'center', padding: '30px', color: 'var(--color-text)' }}>
              Nenhuma questão adicionada à prova.
            </div>
          )}
        </ExamContent>

        <ButtonsContainer>
          <Button variant="info" onClick={() => setShowQRModal(true)}>
            <FaQrcode />
            Gerar QR Code
          </Button>
          <Button variant="primary" onClick={handleComplete}>
            <FaFileExport />
            Exportar Prova
          </Button>
        </ButtonsContainer>
      </ExamContainer>

      {showQRModal && (
        <QRCodeGenerator
          onClose={() => setShowQRModal(false)}
          examId={`EXAM-${Date.now()}`}
        />
      )}
    </Container>
  );
};

export default ExamPreview;