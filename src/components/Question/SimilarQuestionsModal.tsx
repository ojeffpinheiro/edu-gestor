import React from 'react';
import { Modal } from '../Modal';
import { Question } from '../../utils/types/Question';

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
        <div key={similar.id} style={{ marginBottom: '1rem', padding: '1rem', borderBottom: '1px solid #eee' }}>
          <h4>{similar.statement}</h4>
          <p>{similar.discipline}</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span>Disciplina: {similar.discipline}</span>
            <span>Tipo: {similar.questionType}</span>
          </div>
        </div>
      ))}
    </div>
  </Modal>
);