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
  ExamHeader,
  ExamTitle,
  ExamContent,
  ExamSubtitle,
  Header,
  Option,
  OptionLetter,
  OptionText,
  Options,
  QuestionActions,
  QuestionItem,
  QuestionText,
  QuestionNumber,
  Title,
  ToggleButton,
  ExamHeaderInstitution,
  ExamHeaderInfo,
  ExamInstructions,
  ExamInstructionsItem,
  ExamQuestionNumber
} from './styles'
import { Button } from '../../../../styles/buttons';
import QRCodeGenerator from '../../QRCodeGenerator';
import { Exam } from '../../../../utils/types/Exam';

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
        <ExamHeader>
          <ExamHeaderInstitution>
            <strong>ESTADO DO RIO GRANDE DO SUL</strong><br />
            <strong>SECRETARIA DA EDUCAÇÃO - 2ª CRE</strong><br />
            <strong>E.E.E.M. 9 DE OUTUBRO - PORTÃO</strong>
          </ExamHeaderInstitution>
          
          <ExamTitle>NOTA:</ExamTitle>
          
          <ExamHeaderInfo>
            <div><strong>PROFESSOR:</strong> {examData.createdBy || "Jéferson Pinheiro"}</div>
            <div><strong>TURMA:</strong> _____</div>
            <div><strong>DATA:</strong> {examData.applicationDate?.toLocaleDateString() || "__/__/____"}</div>
          </ExamHeaderInfo>
          
          <ExamHeaderInfo>
            <div><strong>DISCIPLINA:</strong> {examData.discipline}</div>
            <div><strong>NOME:</strong> _____</div>
            <div>
              <strong>TRIMESTRE:</strong> 
              □ 1 TRI    □ 2 TRI    □ 3 TRI
            </div>
          </ExamHeaderInfo>
          
          <ExamInstructions>
            <strong>INSTRUÇÕES:</strong>
            <ExamInstructionsItem>1. A avaliação é individual;</ExamInstructionsItem>
            <ExamInstructionsItem>2. Faça com tranquilidade e empenho para ter um bom resultado;</ExamInstructionsItem>
            <ExamInstructionsItem>3. Leia os enunciados com atenção, a interpretação faz parte da avaliação;</ExamInstructionsItem>
            <ExamInstructionsItem>4. É permitido o uso de calculadora (não é válido em formato digital);</ExamInstructionsItem>
            <ExamInstructionsItem>5. Não é permitido nenhum outro tipo de consulta externa (cola), celulares ou qualquer aparelho eletrônico;</ExamInstructionsItem>
            <ExamInstructionsItem>6. Preencha o cabeçalho de forma correta. Letra ilegível ou informações faltantes impedem a correção.</ExamInstructionsItem>
            <ExamInstructionsItem>7. Marque apenas uma das opções que lhe são apresentadas em cada questão.</ExamInstructionsItem>
            <ExamInstructionsItem>8. Marque suas respostas na grade de respostas utilizando apenas <strong>caneta esferográfica azul ou preta</strong> conforme o exemplo.</ExamInstructionsItem>
            <ExamInstructionsItem>9. Somente será considerado como marcação válida na grade de respostas a questão que apresentar apenas uma <strong>marcação conforme o exemplo.</strong></ExamInstructionsItem>
            <ExamInstructionsItem>10. Se a questão não apresentar resolução completa e devidamente identificada, será considerada como errada, mesmo que a resposta assinalada corretamente no cartão resposta.</ExamInstructionsItem>
            <ExamInstructionsItem>11. Não é permitido rasurar ou alterar a marcação feita na grade de respostas.</ExamInstructionsItem>
            <ExamInstructionsItem>12. Para efeito de correção, serão consideradas <strong>10 questões</strong>, então, se preferir, escolha <strong>2 questões para não responder ou anular</strong></ExamInstructionsItem>
          </ExamInstructions>
        </ExamHeader>

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