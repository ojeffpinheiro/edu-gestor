import React, { useState, useRef } from 'react';
import { FaEye, FaEyeSlash, FaGripLines } from 'react-icons/fa';
import { ImageWrapType, QuestionFormData } from '../../../utils/types/Question';
import {
  PreviewContainer,
  PreviewContent,
  PreviewImageWrapper,
  PreviewImage,
  DragHandle,
  PreviewToggleButton,
  AlternativesGrid,
  PreviewAlternative,
  CorrectIndicator,
  QuestionTextWrapper,
  QuestionText,
  ImageWrapControlsContainer,
  WrapTypeBadge,
  getWrapTypeLabel
} from '../QuestionForm.styles';
import { ImageWrapControls } from './ImageWrapControls';

interface QuestionPreviewProps {
  data: QuestionFormData;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
  onWrapTypeChange: (id: string, wrapType: ImageWrapType) => void;
}

export const QuestionPreview: React.FC<QuestionPreviewProps> = ({
  data,
  onPositionChange,
  onWrapTypeChange
}) => {
  const [dragging, setDragging] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showPreview, setShowPreview] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (!containerRect) return;

    setDragging(id);
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    // Adiciona classe de arrasto
    target.classList.add('dragging-active');
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const maxX = containerRect.width - 200; // Largura da imagem
    const maxY = containerRect.height - 150; // Altura da imagem

    let x = e.clientX - containerRect.left - offset.x;
    let y = e.clientY - containerRect.top - offset.y;

    // Limita o movimento dentro dos limites do container
    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    onPositionChange(dragging, { x, y });
  };

  const handleMouseUp = () => {
    if (dragging) {
      // Remove classe de arrasto
      document.querySelectorAll('.dragging-active').forEach(el => {
        el.classList.remove('dragging-active');
      });
      setDragging(null);
    }
  };

  const getLayoutClass = () => {
    switch (data.optionsLayout) {
      case 'two-columns': return 'two-columns';
      case 'three-columns': return 'three-columns';
      default: return 'one-column';
    }
  };

  if (!showPreview) {
    return (
      <PreviewToggleButton onClick={() => setShowPreview(true)}>
        <FaEye /> Mostrar Pré-visualização
      </PreviewToggleButton>
    );
  }

  return (
    <PreviewContainer
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <PreviewToggleButton onClick={() => setShowPreview(false)}>
        <FaEyeSlash /> Ocultar Pré-visualização
      </PreviewToggleButton>

      <PreviewContent className="enem-style">
        <QuestionTextWrapper>
          {data.resources?.map(resource => (
            resource.type === 'image' && (
              <React.Fragment key={resource.id}>
                <ImageWrapControlsContainer>
                  <ImageWrapControls
                    wrapType={resource.wrapType || 'square'}
                    onChange={(type) => onWrapTypeChange(resource.id, type)}
                  />
                </ImageWrapControlsContainer>
                <QuestionText $hasImages={data.resources?.some(r => r.type === 'image')}>
                  {data.statement.split('\n').map((paragraph, i) => (
                    <p key={i}>
                      {paragraph || '\u00A0'} {/* Espaço insensível para manter o fluxo */}
                    </p>
                  ))}
                </QuestionText>
                <PreviewImageWrapper
                  $isDragging={dragging === resource.id}
                  $positionX={resource.position?.x || 0}
                  $positionY={resource.position?.y || 0}
                  $wrapType={resource.wrapType}
                  onMouseDown={(e) => handleMouseDown(e, resource.id)}
                >
                  <PreviewImage
                    src={resource.url}
                    $wrapType={resource.wrapType}
                    $isDragging={dragging === resource.id}
                  >
                    <DragHandle>
                      <FaGripLines />
                    </DragHandle>
                    <WrapTypeBadge $wrapType={resource.wrapType}>
                      {getWrapTypeLabel(resource.wrapType)}
                    </WrapTypeBadge>
                  </PreviewImage>
                </PreviewImageWrapper>
              </React.Fragment>
            )
          ))}
          {data.alternatives?.length > 0 && (
            <AlternativesGrid className={getLayoutClass()}>
              {data.alternatives.map((alt, index) => (
                <PreviewAlternative key={alt.id} $isCorrect={alt.isCorrect}>
                  <span className="alternative-letter">
                    {String.fromCharCode(97 + index).toUpperCase()})
                  </span>
                  <span className="alternative-text">{alt.text}</span>
                  {alt.isCorrect && <CorrectIndicator />}
                </PreviewAlternative>
              ))}
            </AlternativesGrid>
          )}
        </QuestionTextWrapper>
      </PreviewContent>
    </PreviewContainer>
  );
};