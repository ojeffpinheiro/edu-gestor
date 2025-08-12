import React from 'react';
import { FaTag, FaChartLine, FaCalendarAlt } from 'react-icons/fa';
import { ModalContentGrid } from './styles';
import { QuestionDetailModalProps } from './types';
import { Modal } from '../../Modal';
import { AnswerRenderer } from '../AnswerRenderer';
import { CardContainer } from '../../shared/Card.styles';
import { TagList } from '../TagList';
import { DetailSection } from '../DetailSection';
import { ActionButtons } from '../ActionButtons';
import { DateDisplay } from '../DateDisplay';

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
      title={question.statement}
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      className={className}
      actions={
        <CardContainer $variant="default">
          <ActionButtons onEdit={onEdit} onDelete={onDelete} />
        </CardContainer>
      }
    >
      <ModalContentGrid>
        <div>
          <DetailSection label="Enunciado">
            {question.statement}
          </DetailSection>

          <DetailSection label="Tags" icon={<FaTag />}>
            <TagList tags={question.tags || []} />
          </DetailSection>

          <DetailSection label="Respostas">
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {question.answers?.map((answer, index) => (
                <AnswerRenderer
                  key={answer.id || index}
                  answer={answer}
                  questionType={question.questionType}
                />
              ))}
            </div>
          </DetailSection>
        </div>

        <div>
          <DetailSection label="Estatísticas" icon={<FaChartLine />}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <div>Dificuldade: {question.difficultyLevel}</div>
              {question.correctRate && (
                <div>Taxa de acerto: {question.correctRate}%</div>
              )}
              {question.usageCount && (
                <div>Número de usos: {question.usageCount}</div>
              )}
            </div>
          </DetailSection>

          <DetailSection label="Datas" icon={<FaCalendarAlt />}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <DateDisplay date={question.createdAt} prefix="Criada em:" />
              {question.updatedAt && (
                <DateDisplay date={question.updatedAt} prefix="Último uso:" />
              )}
            </div>
          </DetailSection>
        </div>
      </ModalContentGrid>
    </Modal>
  );
};

export default QuestionDetailModal;