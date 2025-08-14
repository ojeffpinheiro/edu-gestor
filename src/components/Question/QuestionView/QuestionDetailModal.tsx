import React from 'react';
import { FaTag, FaChartLine, FaCalendarAlt, FaInfoCircle, FaLightbulb, FaQuestionCircle } from 'react-icons/fa';
import { MdBarChart, MdTimer, MdTrendingUp, MdPeople } from 'react-icons/md';

import { ModalContentGrid } from './styles';
import { QuestionDetailModalProps } from './types';
import { Modal } from '../../Modal';
import { AnswerRenderer } from '../AnswerRenderer';
import { CardContainer } from '../../shared/Card.styles';
import { TagList } from '../TagList';
import { DetailSection } from '../DetailSection';
import { ActionButtons } from '../ActionButtons';
import { DateDisplay } from '../DateDisplay';
import { Badge } from '../../shared/Badge.styles';

const QuestionDetailModal = ({
  question,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  className
}: QuestionDetailModalProps) => {
  // Função para calcular a taxa de erro
  const getErrorRate = () => {
    if (!question.answerStats || !question.answerStats.totalAttempts) return 0;
    return ((question.answerStats.totalAttempts - question.answerStats.correctAttempts) / 
            question.answerStats.totalAttempts * 100).toFixed(1);
  };

  // Função para determinar a cor da dificuldade
  const getDifficultyColor = () => {
    switch(question.difficultyLevel) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'error';
      default: return 'default';
    }
  };

  // Função para determinar a cor do status
  const getStatusColor = () => {
    switch(question.status) {
      case 'active': return 'success';
      case 'draft': return 'warning';
      case 'inactive': return 'error';
      default: return 'default';
    }
  };

  return (
    <Modal
      title={`Detalhes da Questão: ${question.id}`}
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      className={className}
      actions={
        <CardContainer $variant="default">
          <ActionButtons 
            onEdit={onEdit} 
            onDelete={onDelete} 
            editLabel="Editar Questão"
            deleteLabel="Excluir Questão"
          />
        </CardContainer>
      }
    >
      <ModalContentGrid>
        <div>
          <DetailSection label="Informações Básicas">
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <div>
                <strong>Tipo:</strong> {question.questionType}
              </div>
              <div>
                <strong>Dificuldade:</strong> 
                <Badge $type={getDifficultyColor()} $size="sm" style={{ marginLeft: '0.5rem' }}>
                  {question.difficultyLevel}
                </Badge>
              </div>
              <div>
                <strong>Status:</strong> 
                <Badge $type={getStatusColor()} $size="sm" style={{ marginLeft: '0.5rem' }}>
                  {question.status}
                </Badge>
              </div>
              {question.discipline && (
                <div>
                  <strong>Disciplina:</strong> {question.discipline}
                </div>
              )}
            </div>
          </DetailSection>

          <DetailSection label="Enunciado" icon={<FaQuestionCircle />}>
            {question.statement}
            {question.imageUrl && (
              <div style={{ marginTop: '1rem' }}>
                <img 
                  src={question.imageUrl} 
                  alt="Imagem da questão" 
                  style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }} 
                />
              </div>
            )}
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

          {question.explanation && (
            <DetailSection label="Explicação" icon={<FaLightbulb />}>
              {question.explanation}
            </DetailSection>
          )}
        </div>

        <div>
          <DetailSection label="Estatísticas de Uso" icon={<MdBarChart />}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MdPeople size={18} />
                <span>Total de tentativas: {question.answerStats?.totalAttempts || 0}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MdTrendingUp size={18} />
                <span>Taxa de acerto: {question.correctRate ? `${question.correctRate}%` : 'N/A'}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaInfoCircle size={16} />
                <span>Taxa de erro: {getErrorRate()}%</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MdTimer size={18} />
                <span>Número de usos: {question.usageCount || 0}</span>
              </div>
              
              {question.rating !== undefined && (
                <div>
                  <strong>Avaliação:</strong> {'★'.repeat(Math.round(question.rating))}{'☆'.repeat(5 - Math.round(question.rating))} ({question.rating.toFixed(1)}/5)
                </div>
              )}
            </div>
          </DetailSection>

          <DetailSection label="Análise de Dificuldade" icon={<FaChartLine />}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <div>
                <strong>Nível calculado:</strong> {question.difficultyLevel}
              </div>
              <div>
                <progress 
                  value={question.difficultyLevel === 'easy' ? 30 : question.difficultyLevel === 'medium' ? 60 : 90} 
                  max="100" 
                  style={{ width: '100%', height: '8px' }}
                />
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                Baseado em {question.answerStats?.totalAttempts || 0} tentativas
              </div>
            </div>
          </DetailSection>

          <DetailSection label="Histórico" icon={<FaCalendarAlt />}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <DateDisplay date={question.createdAt} prefix="Criada em:" />
              {question.updatedAt && (
                <DateDisplay date={question.updatedAt} prefix="Última atualização:" />
              )}
              {question.lastUsed && (
                <DateDisplay date={question.lastUsed} prefix="Último uso:" />
              )}
              {question.accessDate && (
                <DateDisplay date={question.accessDate} prefix="Acessada em:" />
              )}
            </div>
          </DetailSection>

          {question.source && (
            <DetailSection label="Fonte">
              <div style={{ fontStyle: 'italic' }}>
                {question.source}
              </div>
            </DetailSection>
          )}

          {question.isComposite && question.componentQuestions && (
            <DetailSection label="Questões Componentes">
              <div style={{ display: 'grid', gap: '0.5rem' }}>
                {question.componentQuestions.map((id, index) => (
                  <Badge key={index} $type="info" $size="sm">
                    {id}
                  </Badge>
                ))}
              </div>
            </DetailSection>
          )}
        </div>
      </ModalContentGrid>
    </Modal>
  );
};

export default QuestionDetailModal;