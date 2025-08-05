import React, { useState } from 'react'
import { FaBookOpen, FaCheckCircle, FaExclamationTriangle, FaGraduationCap, FaImage, FaMagic, FaStar, FaTimes, FaUpload } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

import { Badge, Button, Textarea } from '../pages/EducationCorrectorPage/styles'
import { CorrectionResult, CustomCard } from '../pages/EducationCorrectorPage';

interface DropzoneProps {
  $isDragging: boolean;
}

interface TextContainerProps {
  variant?: 'default' | 'spaced'; // Defina as variantes que quiser
}

export const DropzoneContainer = styled.div<DropzoneProps>`
  border: 2px dashed;
  border-radius: 0.5rem; // rounded-lg
  padding: 2rem; // p-8
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  border-color: ${({ $isDragging }) =>
    $isDragging ? 'var(--color-primary)' : 'var(--color-border)'};
  background: ${({ $isDragging }) =>
    $isDragging ? 'rgba(var(--color-primary-rgb), 0.05)' : 'transparent'};
  transform: ${({ $isDragging }) =>
    $isDragging ? 'scale(1.05)' : 'scale(1)'};

  &:hover {
    border-color: ${({ $isDragging }) =>
    !$isDragging && 'var(--color-primary)'};
    background: ${({ $isDragging }) =>
    !$isDragging && 'rgba(var(--color-accent-rgb), 0.5)'};
  }
`;

export const DropzoneContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; // space-y-4
`;

export const IconContainer = styled.div`
  width: 4rem; // w-16
  height: 4rem; // h-16
  margin: 0 auto;
  background: var(--gradient-primary);
  border-radius: 9999px; // rounded-full
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DropzoneIcon = styled(FaImage)`
  width: 2rem; // h-8
  height: 2rem; // w-8
  color: var(--color-primary-foreground);
`;


export const TextContainer = styled.div<TextContainerProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ variant }) => (variant === 'spaced' ? '1rem' : '0.5rem')}; // espaço condicional
`;

export const DropzoneTitle = styled.h3`
  font-size: 1.25rem; // text-xl
  font-weight: 600; // font-semibold
  color: var(--color-foreground);
`;

export const DropzoneDescription = styled.p`
  color: var(--color-muted-foreground);
`;

export const DropzoneHint = styled.p`
  font-size: 0.875rem; // text-sm
  color: var(--color-muted-foreground);
`;

export const HiddenInput = styled.input`
  display: none;
`;

// Header do card
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Container do ícone e texto
export const IconTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem; // space-x-3
`;

// Ícone circular
export const IconCircle = styled.div`
  width: 2.5rem; // w-10
  height: 2.5rem; // h-10
  background: var(--gradient-primary);
  border-radius: 9999px; // rounded-full
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Título
interface CardTitleProps {
  $color?: 'success' | 'warning' | 'destructive' | 'foreground';
}

export const CardTitle = styled.h4<CardTitleProps>`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ $color = 'foreground' }) => `var(--color-${$color})`};
`;

// Descrição
export const CardDescription = styled.p`
  font-size: 0.875rem; // text-sm
  color: var(--color-muted-foreground);
`;

// Área de texto extraído
export const ExtractedTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; // space-y-4
`;

// Label da textarea
export const TextareaLabel = styled.label`
  font-size: 0.875rem; // text-sm
  font-weight: 500; // font-medium
  color: var(--color-foreground);
`;

// Footer da textarea
export const TextareaFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem; // text-sm
  color: var(--color-muted-foreground);
`;

// Ícone animado
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const SpinningIcon = styled(FaMagic)`
  animation: ${rotate} 1s linear infinite;
`;

interface ImageDropzoneProps {
  onFileSelect: (file: File) => void;
}

export const ImageDropzone = ({ onFileSelect }: ImageDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <DropzoneContainer
      $isDragging={isDragging}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <DropzoneContent>
        <IconContainer>
          <DropzoneIcon />
        </IconContainer>

        <TextContainer>
          <DropzoneTitle>Selecione a imagem da atividade</DropzoneTitle>
          <DropzoneDescription>
            Arraste e solte uma imagem aqui ou clique para selecionar
          </DropzoneDescription>
          <DropzoneHint>
            Formatos suportados: JPG, PNG, GIF • Máximo 10MB
          </DropzoneHint>
        </TextContainer>

        <Button
          variant="hero"
          size="lg"
          style={{ marginTop: '1rem' }}
        >
          <FaUpload style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
          Escolher Imagem
        </Button>
      </DropzoneContent>

      <HiddenInput
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </DropzoneContainer>
  );
};

interface TextExtractionCardProps {
  extractedText: string;
  isExtracting: boolean;
  onExtractText: () => void;
  onTextChange: (text: string) => void;
}

export const TextExtractionCard = ({
  extractedText,
  isExtracting,
  onExtractText,
  onTextChange
}: TextExtractionCardProps) => (
  <CustomCard $padding="md" $hoverEffect>
    <CardHeader>
      <IconTextContainer>
        <IconCircle>
          <FaBookOpen size={20} color="var(--color-primary-foreground)" />
        </IconCircle>
        <TextContainer>
          <CardTitle>Extração de Texto</CardTitle>
          <CardDescription>Extraia automaticamente o texto da atividade</CardDescription>
        </TextContainer>
      </IconTextContainer>

      {!extractedText && (
        <Button
          onClick={onExtractText}
          disabled={isExtracting}
          variant="hero"
        >
          {isExtracting ? (
            <>
              <SpinningIcon size={16} />
              <span>Extraindo...</span>
            </>
          ) : (
            <>
              <FaMagic size={16} />
              <span>Extrair Texto</span>
            </>
          )}
        </Button>
      )}
    </CardHeader>

    {extractedText && (
      <ExtractedTextContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <TextareaLabel>Texto Extraído (editável)</TextareaLabel>
          <Textarea
            value={extractedText}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="O texto extraído aparecerá aqui..."
            style={{ minHeight: '12rem', resize: 'none' }}
          />
        </div>

        <TextareaFooter>
          <span>{extractedText.length} caracteres</span>
          <Button
            variant="outline"
            size="sm"
            onClick={onExtractText}
            disabled={isExtracting}
          >
            {isExtracting ? (
              <SpinningIcon size={16} />
            ) : (
              <FaMagic size={16} />
            )}
            <span>Extrair Novamente</span>
          </Button>
        </TextareaFooter>
      </ExtractedTextContainer>
    )}
  </CustomCard>
);

interface CorrectionHeaderProps{
  $hasResult: boolean;
}

// Header do card
export const CorrectionHeader = styled.div<CorrectionHeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ $hasResult }) => $hasResult ? '1.5rem' : '0'};
`;

// Container do ícone e texto
export const CorrectionIconText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

// Ícone circular de sucesso
export const SuccessIconCircle = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: var(--gradient-success);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Container dos resultados
export const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// Container de pontuação
export const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--gradient-hero);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-soft);
`;

// Item de pontuação
export const ScoreItem = styled.div`
  text-align: center;
`;

// Valor da pontuação
export const ScoreValue = styled.div`
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
`;

// Label da pontuação
export const ScoreLabel = styled.div`
  font-size: 0.875rem;
  color: var(--color-muted-foreground);
`;

// Grade Badge
export const GradeBadge = styled(Badge)`
  font-size: 1.5rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
`;

// Grid de feedback
export const FeedbackGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

// Item de feedback
export const FeedbackItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

interface FeedbackListProps {
  $bullets?: boolean;
}

// Feedback list
export const FeedbackList = styled.ul<FeedbackListProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-left: ${({ $bullets }) => $bullets ? '1.25rem' : '0'};
  
  li {
    list-style-type: ${({ $bullets }) => $bullets ? 'disc' : 'none'};
  }
`;

// Feedback card header
export const FeedbackCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

// Footer de ações
export const ActionsFooter = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
`;

interface CorrectionCardProps {
  correctionResult: CorrectionResult | null;
  isCorrecting: boolean;
  hasText: boolean;
  onCorrect: () => void;
}

export const CorrectionCard = ({
  correctionResult,
  isCorrecting,
  hasText,
  onCorrect
}: CorrectionCardProps) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'success';
      case 'B': return 'primary';
      case 'C': return 'warning';
      case 'D': return 'warning';
      case 'F': return 'destructive';
      default: return 'primary';
    }
  };

  return (
    <CustomCard $padding="md" $hoverEffect>
      <CorrectionHeader $hasResult={!!correctionResult}>
        <CorrectionIconText>
          <SuccessIconCircle>
            <FaGraduationCap size={20} color="var(--color-secondary-foreground)" />
          </SuccessIconCircle>
          <div>
            <CardTitle>Correção Automática</CardTitle>
            <CardDescription>
              Análise inteligente da atividade com feedback detalhado
            </CardDescription>
          </div>
        </CorrectionIconText>

        {!correctionResult && (
          <Button
            onClick={onCorrect}
            disabled={isCorrecting || !hasText}
            variant="secondary"
            size="lg"
          >
            {isCorrecting ? (
              <>
                <SpinningIcon as={FaGraduationCap} size={16} />
                <span>Corrigindo...</span>
              </>
            ) : (
              <>
                <FaGraduationCap size={16} />
                <span>Corrigir Atividade</span>
              </>
            )}
          </Button>
        )}
      </CorrectionHeader>

      {correctionResult && (
        <ResultsContainer>
          {/* Score and Grade */}
          <ScoreContainer>
            <ScoreItem>
              <ScoreValue>{correctionResult.score}</ScoreValue>
              <ScoreLabel>Pontuação</ScoreLabel>
            </ScoreItem>
            <ScoreItem>
              <GradeBadge data-variant={getGradeColor(correctionResult.grade)}>
                {correctionResult.grade}
              </GradeBadge>
              <ScoreLabel>Conceito</ScoreLabel>
            </ScoreItem>
          </ScoreContainer>

          {/* Feedback Sections */}
          <FeedbackGrid>
            {/* Strengths */}
            <CustomCard $variant="success" $padding="sm">
              <FeedbackCardHeader>
                <FaCheckCircle size={20} color="var(--color-success)" />
                <CardTitle $color="success">Pontos Fortes</CardTitle>
              </FeedbackCardHeader>
              <FeedbackList>
                {correctionResult.strengths.map((strength, index) => (
                  <FeedbackItem key={index}>
                    <FaStar size={12} color="var(--color-success)" />
                    <span>{strength}</span>
                  </FeedbackItem>
                ))}
              </FeedbackList>
            </CustomCard>

            {/* Improvements */}
            <CustomCard $variant="warning" $padding="sm">
              <FeedbackCardHeader>
                <FaExclamationTriangle size={20} color="var(--color-warning)" />
                <CardTitle $color="warning">Pontos a Melhorar</CardTitle>
              </FeedbackCardHeader>
              <FeedbackList>
                {correctionResult.improvements.map((improvement, index) => (
                  <FeedbackItem key={index}>
                    <FaExclamationTriangle size={12} color="var(--color-warning)" />
                    <span>{improvement}</span>
                  </FeedbackItem>
                ))}
              </FeedbackList>
            </CustomCard>
          </FeedbackGrid>

          {/* Grammar Errors */}
          {correctionResult.grammarErrors.length > 0 && (
            <CustomCard $variant="destructive" $padding="sm">
              <FeedbackCardHeader>
                <FaTimes size={20} color="var(--color-destructive)" />
                <CardTitle $color="destructive">Correções Gramaticais</CardTitle>
              </FeedbackCardHeader>
              <FeedbackList>
                {correctionResult.grammarErrors.map((error, index) => (
                  <FeedbackItem key={index}>
                    <FaTimes size={12} color="var(--color-destructive)" />
                    <span>{error}</span>
                  </FeedbackItem>
                ))}
              </FeedbackList>
            </CustomCard>
          )}

          {/* General Feedback */}
          <CustomCard $padding="sm" $hoverEffect={false}>
            <CardTitle>Feedback Geral</CardTitle>
            <FeedbackList $bullets>
              {correctionResult.feedback.map((feedback, index) => (
                <li key={index}>{feedback}</li>
              ))}
            </FeedbackList>
          </CustomCard>

          {/* Suggestions */}
          <CustomCard $padding="sm" $hoverEffect={false}>
            <CardTitle>Sugestões de Estudo</CardTitle>
            <FeedbackList $bullets>
              {correctionResult.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </FeedbackList>
          </CustomCard>

          <ActionsFooter>
            <Button
              variant="outline"
              onClick={onCorrect}
              disabled={isCorrecting}
            >
              Corrigir Novamente
            </Button>
          </ActionsFooter>
        </ResultsContainer>
      )}
    </CustomCard>
  );
};