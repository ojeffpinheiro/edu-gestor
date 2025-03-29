// src/components/DidacticSequences/SequenceCard.tsx
import React from 'react';
import styled from 'styled-components';
import { DidacticSequence } from '../../utils/types/DidacticSequence';

interface SequenceCardProps {
  sequence: DidacticSequence;
  onEdit: (sequence: DidacticSequence) => void;
  onDelete: (id: string) => void;
}

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const DisciplineTag = styled.span`
  background-color: #e0f7fa;
  color: #00838f;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
`;

const AudienceTag = styled.span`
  background-color: #e8f5e9;
  color: #2e7d32;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  margin-left: 0.5rem;
`;

const Overview = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.75rem;
  color: #777;
`;

const Duration = styled.span`
  display: flex;
  align-items: center;
  
  &:before {
    content: '⏱️';
    margin-right: 0.25rem;
  }
`;

const StageCount = styled.span`
  display: flex;
  align-items: center;
  
  &:before {
    content: '📋';
    margin-right: 0.25rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const EditButton = styled(Button)`
  background-color: #e3f2fd;
  color: #1976d2;
  border: none;
  
  &:hover {
    background-color: #bbdefb;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ffebee;
  color: #d32f2f;
  border: none;
  
  &:hover {
    background-color: #ffcdd2;
  }
`;

const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
};

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const SequenceCard: React.FC<SequenceCardProps> = ({ sequence, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(sequence);
  };
  
  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta sequência didática?')) {
      onDelete(sequence.id);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <Title>{sequence.title}</Title>
        <div>
          <DisciplineTag>{sequence.discipline}</DisciplineTag>
          <AudienceTag>{sequence.targetAudience}</AudienceTag>
        </div>
      </CardHeader>
      
      <Overview>{sequence.overview}</Overview>
      
      <div>
        <strong>Objetivos:</strong>
        <ul>
          {sequence.objectives.slice(0, 2).map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
          {sequence.objectives.length > 2 && <li>...</li>}
        </ul>
      </div>
      
      <MetaInfo>
        <div>
          <Duration>{formatDuration(sequence.totalDuration)}</Duration>
          <StageCount style={{ marginLeft: '1rem' }}>{sequence.stages.length} etapas</StageCount>
        </div>
        <div>Atualizado em: {formatDate(sequence.updatedAt)}</div>
      </MetaInfo>
      
      <ButtonGroup>
        <EditButton onClick={handleEdit}>Editar</EditButton>
        <DeleteButton onClick={handleDelete}>Excluir</DeleteButton>
      </ButtonGroup>
    </Card>
  );
};

export default SequenceCard;