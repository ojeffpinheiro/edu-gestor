import React from 'react';
import { Modal } from '../Modal';
import { QuestionBack } from '../../utils/types/Question';

interface SimilarQuestionsModalProps {
  question: QuestionBack;
  similarQuestions: QuestionBack[];
  isOpen: boolean;
  onClose: () => void;
}

export const SimilarQuestionsModal: React.FC<SimilarQuestionsModalProps> = ({
  question,
  similarQuestions,
  isOpen,
  onClose
}) => (
  <Modal title={`Questões similares a: ${question.title}`} isOpen={isOpen} onClose={onClose} size="lg">
    <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
      {similarQuestions.map(similar => (
        <div key={similar.id} style={{ marginBottom: '1rem', padding: '1rem', borderBottom: '1px solid #eee' }}>
          <h4>{similar.title}</h4>
          <p>{similar.content}</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span>Categoria: {similar.category}</span>
            <span>Tipo: {similar.type}</span>
          </div>
        </div>
      ))}
    </div>
  </Modal>
);