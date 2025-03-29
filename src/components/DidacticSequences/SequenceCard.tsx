// src/components/DidacticSequences/SequenceCard.tsx

import React from 'react';
import styled from 'styled-components';
import { DidacticSequence } from '../../utils/types/DidacticSequence';

interface SequenceCardProps {
  sequence: DidacticSequence;
  onDelete: (id: string) => void;
}

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  margin: 0;
  margin-bottom: 0.5rem;
`;

const Discipline = styled.span`
  display: inline-block;
  background-color: #e3f2fd;
  color: #1976d2;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
`;

const EducationLevel = styled.span`
  display: inline-block;
  background-color: #e8f5e9;
  color: #388e3c;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-left: auto;
  
  ${props => {
    switch (props.status) {
      case 'Em planejamento':
        return 'background-color: #fff8e1; color: #ffa000;';
      case 'Planejada':
        return 'background-color: #e8f5e9; color: #388e3c;';
      case 'Em aplicação':
        return 'background-color: #e3f2fd; color: #1976d2;';
      case 'Aplicada':
        return 'background-color: #f3e5f5; color: #7b1fa2;';
      case 'Finalizada':
        return 'background-color: #e0f2f1; color: #00897b;';
      default:
        return 'background-color: #f5f5f5; color: #616161;';
    }
  }}
`;

const Overview = styled.p`
  color: #666;
  font-size: 0.875rem;
  margin: 0.5rem 0 1rem 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #666;
`;

const InfoLabel = styled.span`
  font-weight: 500;
  margin-right: 0.5rem;
  color: #333;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.75rem 0;
`;

const Tag = styled.span`
  background-color: #f5f5f5;
  color: #616161;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const EditButton = styled(ActionButton)`
  color: #1976d2;
  
  &:hover {
    background-color: #e3f2fd;
  }
`;

const DeleteButton = styled(ActionButton)`
  color: #d32f2f;
  
  &:hover {
    background-color: #ffebee;
  }
`;

const SequenceCard: React.FC<SequenceCardProps> = ({ sequence, onDelete }) => {
  // Formatação de data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <Title>{sequence.title}</Title>
          <div>
            <Discipline>{sequence.discipline}</Discipline>
            <EducationLevel>{sequence.educationLevel}</EducationLevel>
            <StatusBadge status={sequence.status}>{sequence.status}</StatusBadge>
          </div>
        </div>
      </CardHeader>
      
      <Overview>{sequence.overview}</Overview>
      
      <InfoItem>
        <InfoLabel>Autor:</InfoLabel> {sequence.author}
      </InfoItem>
      
      <InfoItem>
        <InfoLabel>Eixo temático:</InfoLabel> {sequence.thematicAxis}
      </InfoItem>
      
      <InfoItem>
        <InfoLabel>Carga horária:</InfoLabel> {sequence.workload} horas
      </InfoItem>
      
      <InfoItem>
        <InfoLabel>Aulas:</InfoLabel> {sequence.lessonsCount}
      </InfoItem>
      
      {sequence.skills.length > 0 && (
        <>
          <InfoLabel>Habilidades:</InfoLabel>
          <TagsContainer>
            {sequence.skills.slice(0, 2).map((skill, index) => (
              <Tag key={index}>{skill}</Tag>
            ))}
            {sequence.skills.length > 2 && <Tag>+{sequence.skills.length - 2}</Tag>}
          </TagsContainer>
        </>
      )}
      
      {sequence.bnccCodes.length > 0 && (
        <>
          <InfoLabel>Códigos BNCC:</InfoLabel>
          <TagsContainer>
            {sequence.bnccCodes.map((code, index) => (
              <Tag key={index}>{code}</Tag>
            ))}
          </TagsContainer>
        </>
      )}
      
      <InfoItem>
        <InfoLabel>Criado em:</InfoLabel> {formatDate(sequence.createdAt)}
      </InfoItem>
      
      <CardActions>
        <EditButton>Editar</EditButton>
        <DeleteButton onClick={() => onDelete(sequence.id)}>Excluir</DeleteButton>
      </CardActions>
    </Card>
  );
};

export default SequenceCard;