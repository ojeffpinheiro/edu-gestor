import React from 'react'
import { FaTag, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import {
  ModalContentGrid,
  QuestionDetailSection,
  DetailLabel,
  DetailValue
} from './styles';
import { QuestionDetailModalProps } from './types';
import { Modal } from '../../Modal';
import { AnswerRenderer } from '../AnswerRenderer';

const QuestionDetailModal = ({
  question,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  className
}: QuestionDetailModalProps) => {
  return (
    <Modal
      title={question.title}
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      className={className}
      actions={
        <>
          <button onClick={onClose}>Fechar</button>
          {onEdit && <button onClick={onEdit}>Editar</button>}
          {onDelete && <button onClick={onDelete}>Excluir</button>}
        </>
      }
    >
      <ModalContentGrid>
        <div>
          <QuestionDetailSection>
            <DetailLabel>Enunciado</DetailLabel>
            <DetailValue>{question.content}</DetailValue>
          </QuestionDetailSection>

          <QuestionDetailSection>
            <DetailLabel>
              <FaTag /> Tags
            </DetailLabel>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {question.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: 'var(--color-background-tertiary)',
                    borderRadius: '4px',
                    fontSize: '0.75rem'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </QuestionDetailSection>
          <QuestionDetailSection>
            <DetailLabel>Respostas</DetailLabel>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {question.answers?.map((answer, index) => (
                <AnswerRenderer
                  key={answer.id || index}
                  answer={answer}
                  questionType={question.type}
                />
              ))}
            </div>
          </QuestionDetailSection>
        </div>

        <div>
          <QuestionDetailSection>
            <DetailLabel>
              <FaChartLine /> Estatísticas
            </DetailLabel>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <DetailValue>
                Dificuldade: {question.difficulty}
              </DetailValue>
              {question.accuracy && (
                <DetailValue>
                  Taxa de acerto: {question.accuracy}%
                </DetailValue>
              )}
              {question.usageCount && (
                <DetailValue>
                  Número de usos: {question.usageCount}
                </DetailValue>
              )}
            </div>
          </QuestionDetailSection>

          <QuestionDetailSection>
            <DetailLabel>
              <FaCalendarAlt /> Datas
            </DetailLabel>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <DetailValue>
                Criada em: {new Date(question.createdAt).toLocaleDateString()}
              </DetailValue>
              {question.lastUsed && (
                <DetailValue>
                  Último uso: {new Date(question.lastUsed).toLocaleDateString()}
                </DetailValue>
              )}
            </div>
          </QuestionDetailSection>
        </div>
      </ModalContentGrid>
    </Modal>
  );
};

export default QuestionDetailModal;