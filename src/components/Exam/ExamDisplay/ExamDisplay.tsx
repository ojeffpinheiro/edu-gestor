// src/components/Exam/ExamDisplay.tsx
import React from 'react';
import { Exam } from '../../../services/examsService';
import Modal from '../../modals/Modal';
import { Button } from '../../../styles/buttons';
import { FaDownload, FaKey, FaTimes } from 'react-icons/fa';
import { 
  ExamContent, 
  ExamInfo, 
  ModalFooter, 
  QuestionsContainer,
  DifficultyBadge,
  OptionItem,
  OptionLetter,
  OptionText,
  OptionsList,
  QuestionCard,
  QuestionHeader,
  QuestionMeta,
  QuestionNumber,
  QuestionText,
  TopicBadge
 } from './styles';

interface ExamDisplayProps {
  exam: Exam;
  onClose: () => void;
  onSaveAsPDF: (examId: string) => Promise<void>;
  onExportAnswerKey: (examId: string) => Promise<void>;
}

const ExamDisplay: React.FC<ExamDisplayProps> = ({
  exam,
  onClose,
  onSaveAsPDF,
  onExportAnswerKey
}) => {
  return (
    <Modal
      isOpen={!!exam}
      onClose={onClose}
      title={exam.title}
      size="lg"
      footer={
        <ModalFooter>
          <Button onClick={onClose}>
            <FaTimes /> Fechar
          </Button>
          <Button onClick={() => onSaveAsPDF(exam.id)}>
            <FaDownload /> Baixar PDF
          </Button>
          <Button onClick={() => onExportAnswerKey(exam.id)}>
            <FaKey /> Gabarito
          </Button>
        </ModalFooter>
      }
    >
      <ExamContent>
        <ExamInfo>
          <p><strong>ID:</strong> {exam.id}</p>
          <p><strong>Data de Criação:</strong> {new Date(exam.createdAt).toLocaleString()}</p>
          <p><strong>Total de Questões:</strong> {exam.questions.length}</p>
          {exam.password && <p><strong>Protegida por Senha:</strong> Sim</p>}
        </ExamInfo>

        <QuestionsContainer>
          <h3>Questões</h3>
          {exam.questions.map((question, index) => (
            <QuestionCard key={question.id}>
              <QuestionHeader>
                <QuestionNumber>{index + 1}</QuestionNumber>
                <QuestionMeta>
                  <TopicBadge>{question.topic}</TopicBadge>
                  <DifficultyBadge difficulty={question.difficulty}>
                    {question.difficulty === 'easy' ? 'Fácil' : 
                     question.difficulty === 'medium' ? 'Média' : 'Difícil'}
                  </DifficultyBadge>
                </QuestionMeta>
              </QuestionHeader>
              <QuestionText>{question.text}</QuestionText>
              <OptionsList>
                {question.options.map((option, optIndex) => (
                  <OptionItem key={optIndex} isCorrect={question.correctAnswer === optIndex}>
                    <OptionLetter>{String.fromCharCode(65 + optIndex)}</OptionLetter>
                    <OptionText>{option}</OptionText>
                  </OptionItem>
                ))}
              </OptionsList>
            </QuestionCard>
          ))}
        </QuestionsContainer>
      </ExamContent>
    </Modal>
  );
};

export default ExamDisplay;