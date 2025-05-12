// src/components/AssessmentHeader/AssessmentHeader.js
import React, { useState } from 'react';
import {
  HeaderContainer,
  LogoContainer,
  HeaderContent,
  TitleRow,
  AssessmentTitle,
  EditButton,
  MetaInfoGrid,
  MetaInfoItem,
  MetaLabel,
  MetaValue,
  HeaderControls,
  ControlButton
} from './styles';

interface AssessmentHeaderProps {
  assessment?: Record<string, any>;
  onEdit?: () => void;
  onSave?: () => void;
  onPreview?: () => void;
  logoUrl?: string;
}

const AssessmentHeader = ({ 
  assessment = {}, 
  onEdit, 
  onSave,
  onPreview,
  logoUrl
}: AssessmentHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleEdit = () => {
    setIsEditing(true);
    if (onEdit) {
      onEdit();
    }
  };
  
  const handleSave = () => {
    setIsEditing(false);
    if (onSave) {
      onSave();
    }
  };
  
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };
  
  return (
    <HeaderContainer>
      <LogoContainer>
        {logoUrl ? (
          <img src={logoUrl} alt="Logo da instituição" />
        ) : (
          <span>Logo</span>
        )}
      </LogoContainer>
      
      <HeaderContent>
        <TitleRow>
          <AssessmentTitle>
            {assessment.title || 'Nova Avaliação'}
          </AssessmentTitle>
          
          <EditButton onClick={handleEdit}>
            <span>✏️</span> Editar
          </EditButton>
        </TitleRow>
        
        <MetaInfoGrid>
          <MetaInfoItem>
            <MetaLabel>Disciplina</MetaLabel>
            <MetaValue>{assessment.subject || 'Não definido'}</MetaValue>
          </MetaInfoItem>
          
          <MetaInfoItem>
            <MetaLabel>Data de Aplicação</MetaLabel>
            <MetaValue>{formatDate(assessment.examDate) || 'Não definido'}</MetaValue>
          </MetaInfoItem>
          
          <MetaInfoItem>
            <MetaLabel>Tempo Limite</MetaLabel>
            <MetaValue>
              {assessment.timeLimit ? `${assessment.timeLimit} minutos` : 'Não definido'}
            </MetaValue>
          </MetaInfoItem>
          
          <MetaInfoItem>
            <MetaLabel>Total de Questões</MetaLabel>
            <MetaValue>
              {assessment.questions ? assessment.questions.length : 0}
            </MetaValue>
          </MetaInfoItem>
        </MetaInfoGrid>
        
        <HeaderControls>
          {isEditing ? (
            <ControlButton primary onClick={handleSave}>
              Salvar Alterações
            </ControlButton>
          ) : (
            <ControlButton onClick={onPreview}>
              Pré-visualizar
            </ControlButton>
          )}
        </HeaderControls>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default AssessmentHeader;