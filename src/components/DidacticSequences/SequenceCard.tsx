// src/components/DidacticSequences/SequenceCard.tsx

import React from 'react';

import { DidacticSequence } from '../../types/academic/DidacticSequence';
import { Card, CardHeader } from '../../styles/card';
import { Title } from '../../styles/typography';
import { CardActions, DeleteButton, Discipline, EditButton, EducationLevel, InfoItem, InfoLabel, Overview, Tag, TagsContainer } from './SequenceCardStyle';
import { StatusBadge } from '../../styles/indicators';

interface SequenceCardProps {
  sequence: DidacticSequence;
  onDelete: (id: string) => void;
}


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