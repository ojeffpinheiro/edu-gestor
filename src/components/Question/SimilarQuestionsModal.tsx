import React from 'react';
import { Modal } from '../Modal';
import { Question } from '../../utils/types/Question';
import { QuestionCard } from '../shared/QuestionCard';

interface SimilarQuestionsModalProps {
  question: Question;
  similarQuestions: Question[];
  isOpen: boolean;
  onClose: () => void;
}

export const SimilarQuestionsModal: React.FC<SimilarQuestionsModalProps> = ({
  question,
  similarQuestions,
  isOpen,
  onClose
}) => (
  <Modal title={`Questões similares a: ${question.statement}`} isOpen={isOpen} onClose={onClose} size="lg">
    <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
      {similarQuestions.map(similar => (
        <QuestionCard
          key={similar.id}
          statement={similar.statement}
          discipline={similar.discipline}
          questionType={similar.questionType}
        />
      ))}
    </div>
  </Modal>
);