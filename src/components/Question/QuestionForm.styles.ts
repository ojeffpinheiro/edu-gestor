import styled, { css } from 'styled-components';
import { constants } from '../../utils/consts';
import { CardContainer } from '../shared/Card.styles';
import { Input } from '../../styles/inputs';
import { FieldError } from 'react-hook-form';
import { ImageWrapType, ResourceType } from '../../utils/types/Question';

export const FormStepContainer = styled(CardContainer)`
  padding: ${constants.spacing.xl};
  margin-bottom: ${constants.spacing.lg};
  background: var(--color-background-secondary);
  border: 1px solid var(--color-border);
`;

export const FormTitle = styled.h2`
  font-size: ${constants.fontSize.xl};
  margin-bottom: ${constants.spacing.lg};
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: ${constants.spacing.sm};
`;

export const FormGroup = styled.div`
  margin-bottom: ${constants.spacing.md};
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: ${constants.spacing.xs};
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
`;

export const FormInput = styled.input`
  width: 100%;
  padding: ${constants.spacing.sm};
  border: 1px solid var(--color-border);
  border-radius: ${constants.borderRadius.md};
  background: var(--color-input);
  color: var(--color-text);
  transition: var(--transition-all);

  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }
`;

export const FormTextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${constants.spacing.sm};
  border: 1px solid var(--color-border);
  border-radius: ${constants.borderRadius.md};
  background: var(--color-input);
  color: var(--color-text);
  transition: var(--transition-all);
  resize: vertical;

  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: ${constants.spacing.sm};
  border: 1px solid var(--color-border);
  border-radius: ${constants.borderRadius.md};
  background: var(--color-input);
  color: var(--color-text);
  transition: var(--transition-all);

  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${constants.spacing.xl};
  gap: ${constants.spacing.md};

  button {
    padding: ${constants.spacing.sm} ${constants.spacing.lg};
    border-radius: ${constants.borderRadius.md};
    cursor: pointer;
    transition: var(--transition-all);

    &.primary {
      background: var(--color-primary);
      color: white;
      border: 1px solid var(--color-primary);

      &:hover {
        background: var(--color-primary-dark);
      }
    }

    &.secondary {
      background: transparent;
      color: var(--color-text);
      border: 1px solid var(--color-border);

      &:hover {
        background: var(--color-background-secondary);
      }
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`;

interface FormButtonProps {
  $variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  $size?: 'sm' | 'md' | 'lg';
  $isLoading?: boolean;
}

export const FormButton = styled.button<FormButtonProps>`
  min-width: 120px;
  flex: 1;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${constants.spacing.sm};
  opacity: ${props => props.$isLoading ? 0.7 : 1};
  cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};

  ${({ $isLoading }) => $isLoading && css`
    &::after {
      content: '';
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `}
`;

export const AlternativeItem = styled.div<{ isCorrect?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${constants.spacing.sm};
  padding: ${constants.spacing.sm};
  background: var(--color-background-third);
  border-radius: ${constants.borderRadius.md};
  margin-bottom: ${constants.spacing.sm};
  border-left: 4px solid ${props => props.isCorrect ? 'var(--color-success)' : 'transparent'};
  transition: all 0.2s ease;
  box-shadow: ${constants.shadows.sm};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${constants.shadows.md};
  }
`;

export const ResourceItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${constants.spacing.sm};
  padding: ${constants.spacing.md};
  background: var(--color-background-third);
  border-radius: ${constants.borderRadius.md};
  margin-bottom: ${constants.spacing.md};
`;

export const CriteriaItem = styled(AlternativeItem)`
  flex-direction: column;
`;

export const FormErrorContainer = styled.div<{ error?: string | FieldError }>`
  display: flex;
  align-items: center;
  gap: ${constants.spacing.xs};
  color: var(--color-error);
  font-size: ${constants.fontSize.sm};
  margin-top: ${constants.spacing.xs};

  & > * {
    display: inline;
  }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${constants.spacing.md};
`;

export const FormSection = styled.section`
  background: var(--color-background-secondary);
  border: 1px solid var(--color-border);
  border-radius: ${constants.borderRadius.lg};
  padding: ${constants.spacing.lg};

  h3 {
    font-size: ${constants.fontSize.lg};
    margin-bottom: ${constants.spacing.lg};
    color: var(--color-primary);
    display: flex;
    align-items: center;
    gap: ${constants.spacing.sm};
  }
`;

export const FormSectionTitle = styled.h3`
  font-size: ${constants.fontSize.lg};
  margin-bottom: ${constants.spacing.md};
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: ${constants.spacing.sm};
`;

export const ConditionalField = styled.div<{ isVisible: boolean }>`
  display: ${props => props.isVisible ? 'block' : 'none'};
  transition: all 0.3s ease;
  overflow: hidden;
  max-height: ${props => props.isVisible ? '1000px' : '0'};
  opacity: ${props => props.isVisible ? '1' : '0'};
`;

export const MaskedInput = styled(Input)`
  &[data-mask]::placeholder {
    color: transparent;
  }
  
  &[data-mask]:focus::placeholder {
    color: var(--color-text-third);
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${constants.spacing.xl};
  gap: ${constants.spacing.md};

  button {
    display: flex;
    align-items: center;
    gap: ${constants.spacing.xs};
    padding: ${constants.spacing.sm} ${constants.spacing.md};
    background: var(--color-background-secondary);
    border: 1px solid var(--color-border);
    border-radius: ${constants.borderRadius.md};
    cursor: pointer;
    transition: var(--transition-all);

    &.active {
      background: var(--color-primary);
      color: white;
      border-color: var(--color-primary);
    }

    &:hover {
      background: var(--color-primary-light);
    }
  }
`;

export const TwoColumnForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${constants.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .form-column {
    display: flex;
    flex-direction: column;
    gap: ${constants.spacing.xl};
  }
`;

export const BasicInfoStep = styled.div`
  .basic-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${constants.spacing.md};

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .title-group {
      grid-column: span 2;
    }

    .content-group {
      grid-column: span 2;
    }
  }
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${constants.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormActionsRight = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${constants.spacing.md};
  margin-top: ${constants.spacing.xl};

  button {
    padding: ${constants.spacing.sm} ${constants.spacing.lg};
    border-radius: ${constants.borderRadius.md};
    cursor: pointer;
    transition: var(--transition-all);

    &.primary {
      background: var(--color-primary);
      color: white;
      border: 1px solid var(--color-primary);

      &:hover {
        background: var(--color-primary-dark);
      }
    }

    &.secondary {
      background: transparent;
      color: var(--color-text);
      border: 1px solid var(--color-border);

      &:hover {
        background: var(--color-background-secondary);
      }
    }
  }
`;

export const SingleViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${constants.spacing.xl};
`;

export const StepsViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${constants.spacing.xl};
`;

export const FormContainer = styled.div`
  max-width: 90%;
  margin: 0 auto;
  padding: ${constants.spacing.xl};
`;

export const LevelsContainer = styled.div`
  margin-top: ${constants.spacing.md};
  padding: ${constants.spacing.md};
  background: var(--color-background-third);
  border-radius: ${constants.borderRadius.md};
`;

export const LevelItem = styled.div`
  margin-bottom: ${constants.spacing.md};
  padding-bottom: ${constants.spacing.md};
  border-bottom: 1px dashed var(--color-border);
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

export const CorrectAnswerIndicator = styled.span<{ isCorrect: boolean }>`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.isCorrect ? 'var(--color-success)' : 'var(--color-error)'};
  margin-right: ${constants.spacing.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const AlternativeText = styled.div`
  flex: 1;
  padding: ${constants.spacing.sm};
  background: var(--color-background-third);
  border-radius: ${constants.borderRadius.md};
  font-size: ${constants.fontSize.md};
`;

export const AlternativeActions = styled.div`
  display: flex;
  gap: ${constants.spacing.sm};
  
  button {
    background: transparent;
    border: none;
    color: var(--color-error);
    cursor: pointer;
    padding: ${constants.spacing.xs};
    border-radius: ${constants.borderRadius.sm};
    transition: all 0.2s ease;
    
    &:hover {
      background: var(--color-error-light);
    }
  }
`;

export const ResourceTypeBadge = styled.span<{ type: ResourceType }>`
  display: inline-flex;
  align-items: center;
  gap: ${constants.spacing.xs};
  padding: ${constants.spacing.xs} ${constants.spacing.sm};
  border-radius: ${constants.borderRadius.sm};
  font-size: ${constants.fontSize.sm};
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  color: white;
  max-height: 2rem;
  background-color: ${props => {
    switch (props.type) {
      case 'image': return 'var(--color-primary)';
      case 'video': return 'var(--color-danger)';
      case 'link': return 'var(--color-success)';
      case 'audio': return 'var(--color-warning)';
      default: return 'var(--color-text-secondary)';
    }
  }};
`;

export const ResourcePreview = styled.div`
  flex: 1;
  padding: ${constants.spacing.sm};
  background: var(--color-background-secondary);
  border-radius: ${constants.borderRadius.md};
`;

export const ResourceActions = styled.div`
  display: flex;
  gap: ${constants.spacing.sm};
  margin-top: ${constants.spacing.md};
`;

export const StyledCorrectAnswerIndicator = styled(CorrectAnswerIndicator)`
  &:hover {
    transform: scale(1.1);
  }
`;

export const StyledRemoveButton = styled.button`
  background: transparent;
  border: none;
  color: var(--color-error);
  cursor: pointer;
  padding: ${constants.spacing.xs};
  border-radius: ${constants.borderRadius.sm};
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--color-error-light);
  }
`;

export const ResourceCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: ${constants.spacing.sm};
  padding: ${constants.spacing.md};
  background: var(--color-background-third);
  border-radius: ${constants.borderRadius.md};
  border-left: 4px solid var(--color-primary);
  transition: all 0.2s ease;
  margin-bottom: ${constants.spacing.md};
  box-shadow: ${constants.shadows.sm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${constants.shadows.md};
  }
`;

export const ResourceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${constants.spacing.sm};
`;

export const ResourceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${constants.spacing.xs};
`;

export const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: var(--color-error);
  cursor: pointer;
  padding: ${constants.spacing.xs};
  border-radius: ${constants.borderRadius.sm};
  transition: all 0.2s ease;
  align-self: flex-end;
  
  &:hover {
    background: var(--color-error-light);
  }
`;

export const ResourceLink = styled.a`
  word-break: break-all;
  color: ${constants.colors.text.main};
  text-decoration: none;
  
  &:hover {
    color: ${constants.colors.text.secondary};
  }
`;

export const PreviewContainer = styled.div`
  flex: 1;
  padding: ${constants.spacing.lg};
  background: var(--color-background-secondary);
  border: 1px solid var(--color-border);
  border-radius: ${constants.borderRadius.lg};
`;

export const PreviewContent = styled.div`
  padding: ${constants.spacing.xl};
  background: white;
  border-radius: 4px;
  min-height: 400px;
  position: relative;
  font-family: 'Times New Roman', serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;

  &.enem-style {
    p {
      margin-bottom: 16px;
      text-align: justify;
    }
  }
`;

export const PreviewToggleButton = styled.button`
  background: var(--color-primary);
  color: white;
  border: none;
  padding: ${constants.spacing.sm} ${constants.spacing.md};
  border-radius: ${constants.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${constants.spacing.sm};
  margin-bottom: ${constants.spacing.md};
  transition: all 0.2s ease;
  max-height: 3rem;

  &:hover {
    background: var(--color-primary-dark);
  }
`;

export const QuestionTextWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
  
  shape-outside: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  padding-bottom: 20px;
`;


export const QuestionText = styled.div<{ $hasImages?: boolean }>`
  p {
    text-align: justify;
    shape-outside: ${({ $hasImages }) => $hasImages ? 'content-box' : 'none'};
    transition: all 0.3s ease;
  }

  // Estilo específico para quando há imagens com wrap
  ${({ $hasImages }) => $hasImages && css`
    p {
      hyphens: auto;
      overflow-wrap: break-word;
    }
  `}
`;

export const getWrapStyle = (wrapType: ImageWrapType = 'square') => {
  switch (wrapType) {
    case 'square':
      return { shapeMargin: '8px', float: 'left' };
    case 'tight':
      return { shapeMargin: '4px', float: 'left' };
    case 'through':
      return { shapeMargin: '0', float: 'left' };
    case 'top-bottom':
      return { clear: 'both', display: 'block' };
    case 'behind-text':
      return { position: 'absolute', zIndex: 1 };
    case 'in-front-of-text':
      return { position: 'absolute', zIndex: 3 };
    default:
      return {};
  }
};

interface PreviewImageWrapperProps {
  $isDragging: boolean;
  $positionX: number;
  $positionY: number;
  $wrapType?: ImageWrapType;
}

export const PreviewImageWrapper = styled.div.attrs<PreviewImageWrapperProps>(
  ({ $wrapType }) => ({
    style: {
      // Aplica estilos específicos baseados no wrapType
      ...getWrapBehaviorStyles($wrapType)
    }
  })
)<PreviewImageWrapperProps>`
  position: relative;
  transition: all 0.3s ease;
  z-index: ${({ $isDragging }) => $isDragging ? 10 : 2};
  cursor: move;
  left: ${({ $positionX }) => `${$positionX}px`};
  top: ${({ $positionY }) => `${$positionY}px`};
  border: 2px solid ${({ $isDragging }) => $isDragging ? 'var(--color-primary)' : 'transparent'};
  border-radius: ${({ $wrapType }) => $wrapType === 'square' ? '0' : '4px'};
  background: ${({ $isDragging }) => $isDragging ? 'rgba(0, 119, 204, 0.1)' : 'transparent'};
  transform: ${({ $isDragging }) => $isDragging ? 'scale(1.02)' : 'scale(1)'};
  
  &:hover {
    z-index: 3;
    box-shadow: 0 0 0 2px var(--color-primary-light);
  }

  // Efeito de sombra para indicar profundidade quando atrás/na frente do texto
  ${({ $wrapType }) => $wrapType === 'behind-text' && css`
    opacity: 0.7;
    filter: brightness(1.1);
  `}

  ${({ $wrapType }) => $wrapType === 'in-front-of-text' && css`
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
  `}
`;

// Função auxiliar para os comportamentos específicos
const getWrapBehaviorStyles = (wrapType?: ImageWrapType): React.CSSProperties => {
  switch(wrapType) {
    case 'square':
      return {
        float: 'left',
        shapeMargin: '8px',
        margin: '0 16px 16px 0'
      };
    case 'tight':
      return {
        float: 'left',
        shapeMargin: '4px',
        margin: '0 16px 16px 0'
      };
    case 'through':
      return {
        float: 'left',
        shapeMargin: '0',
        margin: '0 16px 16px 0'
      };
    case 'top-bottom':
      return {
        clear: 'both',
        display: 'block',
        margin: '16px 0'
      };
    case 'behind-text':
      return {
        position: 'absolute',
        zIndex: 1
      };
    case 'in-front-of-text':
      return {
        position: 'absolute',
        zIndex: 3
      };
    default:
      return {};
  }
};

export const AlternativeList = styled.div`
  margin-top: ${constants.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${constants.spacing.sm};

  &.two-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${constants.spacing.md};
  }

  &.three-columns {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${constants.spacing.md};
  }
`;

export const CorrectIndicatorPreview = styled.span<{ isCorrect: boolean }>`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.isCorrect
    ? 'var(--color-success)'
    : 'var(--color-error)'};
`;

export const AlternativesGrid = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  clear: both;

  &.two-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  &.three-columns {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
  }
`;

export const CorrectIndicator = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #009688;
  margin-left: 8px;
`;

interface PreviewImageProps {
  src: string;
  $wrapType?: ImageWrapType;
  $isDragging: boolean;
}

export const PreviewImage = styled.div<PreviewImageProps>`
  width: 200px;
  height: 150px;
  background-image: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid #ddd;
  position: relative;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  /* Indicador visual do tipo de wrap */
  &::after {
    content: ${props => props.$wrapType ? `"${props.$wrapType.replace(/-/g, ' ')}"` : '""'};
    position: absolute;
    bottom: -25px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 0.7rem;
    color: var(--color-text-secondary);
    background: var(--color-background-secondary);
    padding: 2px 5px;
    border-radius: 3px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

interface PreviewAlternativeProps {
  $isCorrect?: boolean;
}

export const PreviewAlternative = styled.div<PreviewAlternativeProps>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 4px;
  background: ${({ $isCorrect }) => $isCorrect ? 'rgba(0, 200, 83, 0.1)' : 'transparent'};
  border-left: 3px solid ${({ $isCorrect }) => $isCorrect ? 'var(--color-success)' : 'transparent'};
  transition: all 0.2s ease;

  .alternative-letter {
    font-weight: bold;
    color: var(--color-text);
  }

  .alternative-text {
    flex: 1;
  }

  &:hover {
    background: var(--color-background-secondary);
  }
`;

export const ImageWrapControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  padding: 8px;
  background: var(--color-background-secondary);
  border-radius: 8px;
  gap: 8px;
`;

export const WrapControlButton = styled.button<{ $active: boolean }>`
  padding: 8px 12px;
  border-radius: 4px;
  background: ${({ $active }) => $active ? 'var(--color-primary)' : 'transparent'};
  color: ${({ $active }) => $active ? 'white' : 'var(--color-text)'};
  border: 1px solid ${({ $active }) => $active ? 'var(--color-primary)' : 'var(--color-border)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => $active ? 'var(--color-primary-dark)' : 'var(--color-background-secondary)'};
  }
`;

export const DragHandle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: var(--color-primary);
  color: white;
  padding: ${constants.spacing.xs};
  border-radius: ${constants.borderRadius.sm} 0 0 0;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${PreviewImageWrapper}:hover & {
    opacity: 1;
  }
`;

export const ContentForm = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${constants.spacing.xl};
`;

// Badge para mostrar o tipo atual
export const WrapTypeBadge = styled.div<{ $wrapType?: ImageWrapType }>`
  position: absolute;
  bottom: -24px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 0.7rem;
  padding: 2px 5px;
  border-radius: 3px;
  background: ${({ $wrapType }) => {
    switch($wrapType) {
      case 'square': return 'var(--color-blue-100)';
      case 'tight': return 'var(--color-green-100)';
      case 'through': return 'var(--color-orange-100)';
      case 'top-bottom': return 'var(--color-purple-100)';
      case 'behind-text': return 'var(--color-gray-100)';
      case 'in-front-of-text': return 'var(--color-red-100)';
      default: return 'var(--color-background-secondary)';
    }
  }};
  color: ${({ $wrapType }) => {
    switch($wrapType) {
      case 'behind-text': return 'var(--color-text)';
      default: return 'white';
    }
  }};
  opacity: 0;
  transition: opacity 0.2s ease;
  
  ${PreviewImageWrapper}:hover & {
    opacity: 1;
  }
`;

// Função auxiliar para rótulos
export const getWrapTypeLabel = (wrapType?: ImageWrapType): string => {
  switch(wrapType) {
    case 'square': return 'Quadrado';
    case 'tight': return 'Justa';
    case 'through': return 'Através';
    case 'top-bottom': return 'Sup/Inf';
    case 'behind-text': return 'Atrás';
    case 'in-front-of-text': return 'Frente';
    default: return 'Padrão';
  }
};