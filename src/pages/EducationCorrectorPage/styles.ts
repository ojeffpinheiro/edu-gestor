import { FaGraduationCap, FaMagic } from "react-icons/fa";
import styled from "styled-components";

interface IconProps {
  size?: number;
  color?: string;
}

export interface ProgressIconProps {
  active?: boolean;
  step: number;
}

export const Icon = styled(FaGraduationCap).attrs<IconProps>(({ size = 24, color = 'var(--color-primary-foreground)' }) => ({
  size,
  color,
})) <IconProps>``;

// Componentes criados com styled-components
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'hero';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = styled.button<ButtonProps>`
  background: var(--color-primary);
  color: var(--color-text-on-primary);
  border: none;
  border-radius: var(--border-radius-md);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: var(--transition-colors);
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);

  &:hover {
    background: var(--color-primary-hover);
  }

  &:disabled {
    background: var(--color-button-disabled);
    cursor: not-allowed;
  }

  &[data-variant="outline"] {
    background: transparent;
    border: 1px solid var(--color-border);
    color: var(--color-text);

    &:hover {
      background: var(--color-background-secondary);
    }
  }

  &[data-variant="ghost"] {
    background: transparent;
    color: var(--color-text);

    &:hover {
      background: var(--color-background-secondary);
    }
  }
    &[data-variant="hero"] {
  background: linear-gradient(to right, var(--color-primary), var(--color-primary-light));
  color: var(--color-text-on-primary);
}

&[data-variant="secondary"] {
  background: var(--color-secondary);
  color: var(--color-text-on-secondary);
}
`;

export const Card = styled.div<{ hoverEffect?: boolean }>`
  background: var(--color-card);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  transition: var(--transition-shadow);

  ${({ hoverEffect }) => hoverEffect && `
    &:hover {
      box-shadow: var(--shadow-md);
    }
  `}
`

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: var(--space-md);
  border: 1px solid var(--color-input-border);
  border-radius: var(--border-radius-md);
  background: var(--color-input);
  color: var(--color-text);
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  transition: var(--transition-colors);

  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: var(--shadow-focus);
  }

  &::placeholder {
    color: var(--color-text-third);
    opacity: 0.7;
  }
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);

  &[data-variant="success"] {
    background: var(--color-success);
    color: var(--color-text-on-primary);
  }

  &[data-variant="warning"] {
    background: var(--color-warning);
    color: var(--color-text-on-primary);
  }

  &[data-variant="destructive"] {
    background: var(--color-error);
    color: var(--color-text-on-primary);
  }
`;

export const Header = styled.header`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border-bottom: 1px solid rgba(var(--color-border), 0.5);
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const IconContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GradientButton = styled(Button)`
  background: linear-gradient(to right, var(--color-primary), var(--color-primary-light));
`;

export const StyledImage = styled.img`
  width: 100%;
  max-height: 24rem;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: var(--shadow-soft);
`;

export const GridContainer = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Spinner = styled(FaMagic)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  background: var(--gradient-hero);
`;

export const Section = styled.section`
  padding: 4rem 1rem; // py-16 (4rem) px-4 (1rem)
  
  &[data-variant="narrow"] {
    padding: 2rem 1rem;
  }
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  gap: 3rem; // gap-12 (3rem)
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem; // gap-4 (1rem)

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const VerticalStack = styled.div<{ size?: 'sm' | 'md' | 'lg' }>`
  & > * + * {
    margin-top: ${({ size }) => {
    switch (size) {
      case 'sm': return '0.5rem;'; // space-y-2
      case 'md': return '1rem;'; // space-y-4
      case 'lg':
      default:
        return '2rem;'; // space-y-8 (2rem)
    }
  }}
  }
`;

export const RelativeBox = styled.div`
  position: relative;
`;

export const Container = styled.div<{ size?: 'sm' | 'md' | 'lg' | 'xl' }>`
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  
  ${({ size }) => {
    switch (size) {
      case 'sm': return `max-width: 640px;`;
      case 'md': return `max-width: 768px;`;
      case 'lg': return `max-width: 1024px;`;
      case 'xl':
      default:
        return `max-width: 72rem;`; // max-w-6xl (72rem)
    }
  }}
`;

// Container principal do header
export const HeaderContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
`;

// Container flex para os itens do header
export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem; // space-x-3 equivalente
`;

// Ícone circular com gradiente
export const IconCircle = styled.div`
  width: 2.5rem; // w-10
  height: 2.5rem; // h-10
  background: var(--gradient-primary);
  border-radius: 9999px; // rounded-full
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Título principal
export const HeaderTitle = styled.h1`
  font-size: 1.5rem; // text-2xl
  font-weight: 700; // font-bold
  color: var(--color-foreground);
`;

// Subtítulo
export const HeaderSubtitle = styled.p`
  font-size: 0.875rem; // text-sm
  color: var(--color-muted-foreground);
`;


export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

// Section container
export const HeroSection = styled.section`
  padding: 4rem 1rem; // py-16 px-4
`;

// Main container
export const HeroContainer = styled.div`
  width: 100%;
  max-width: 72rem; // max-w-6xl
  margin: 0 auto;
`;

// Two-column grid layout
export const HeroGrid = styled.div`
  display: grid;
  gap: 3rem; // gap-12
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

// Spacing components
export const SpaceY8 = styled.div`
  & > * + * {
    margin-top: 2rem; // space-y-8
  }
`;

export const SpaceY4 = styled.div`
  & > * + * {
    margin-top: 1rem; // space-y-4
  }
`;

// Text components
export const HeroTitle = styled.h2`
  font-size: 3rem; // text-5xl
  font-weight: 700; // font-bold
  color: var(--color-foreground);
  line-height: 1.25; // leading-tight
`;

export const GradientText = styled.span`
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`;

export const HeroDescription = styled.p`
  font-size: 1.25rem; // text-xl
  color: var(--color-muted-foreground);
  line-height: 1.75; // leading-relaxed
`;

// Cards grid
export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem; // gap-4

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// Feature Card
export const FeatureCard = styled(Card)`
  padding: 1rem; // p-4
  text-align: center;
  background: rgba(255, 255, 255, 0.5); // bg-white/50
  backdrop-filter: blur(4px); // backdrop-blur-sm
  transition: all 0.3s ease; // transition-all duration-300

  &:hover {
    box-shadow: var(--shadow-soft);
  }
`;

// Card icon
export const CardIcon = styled.div`
  margin: 0 auto 0.5rem; // mx-auto mb-2
  width: 2rem; // h-8
  height: 2rem; // w-8
  color: var(--color-primary);
`;

// Card description
export const CardDescription = styled.p`
  font-size: 0.875rem; // text-sm
  color: var(--color-muted-foreground);
`;

// Image container
export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
`;

// Styled image
export const HeroImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1rem; // rounded-2xl
  box-shadow: var(--shadow-medium);
`;

// Gradient overlay
export const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(var(--color-primary-rgb), 0.1),
    transparent
  );
  border-radius: 1rem; // rounded-2xl
`;

// Container principal
export const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem; // space-x-8
  margin-bottom: 3rem; // mb-12
`;

// Item do progresso
export const ProgressItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem; // space-x-2
  color: ${({ $active }) =>
    $active ? 'var(--color-success)' : 'var(--color-muted-foreground)'};
`;

// Círculo do indicador
export const ProgressCircle = styled.div<{ $active?: boolean }>`
  width: 2rem; // w-8
  height: 2rem; // h-8
  border-radius: 9999px; // rounded-full
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $active }) =>
    $active ? 'var(--color-success)' : 'var(--color-muted)'};
  color: ${({ $active }) =>
    $active ? 'var(--color-success-foreground)' : 'var(--color-muted-foreground)'};
`;

// Conector entre os itens
export const ProgressConnector = styled.div<{ $active?: boolean }>`
  width: 4rem; // w-16
  height: 0.125rem; // h-0.5
  background: ${({ $active }) =>
    $active ? 'var(--color-success)' : 'var(--color-muted)'};
`;

// Texto do item
export const ProgressText = styled.span`
  font-weight: 500; // font-medium
`;

export interface CardProps {
  $variant?: 'default' | 'success' | 'warning' | 'destructive';
  $padding?: 'sm' | 'md' | 'lg';
  $hoverEffect?: boolean;
}

export const StyledCard = styled(Card)<CardProps>`
  transition: all 0.3s ease;
  ${({ $padding = 'md' }) => {
    switch ($padding) {
      case 'sm': return `padding: 1rem;`; // p-4
      case 'md': return `padding: 1.5rem;`; // p-6
      default: return `padding: 1.5rem;`;
    }
  }}

  ${({ $variant = 'default' }) => {
    switch ($variant) {
      case 'success':
        return `
          border: 1px solid rgba(var(--color-success-rgb), 0.2);
          background: rgba(var(--color-success-rgb), 0.05);
        `;
      case 'warning':
        return `
          border: 1px solid rgba(var(--color-warning-rgb), 0.2);
          background: rgba(var(--color-warning-rgb), 0.05);
        `;
      case 'destructive':
        return `
          border: 1px solid rgba(var(--color-destructive-rgb), 0.2);
          background: rgba(var(--color-destructive-rgb), 0.05);
        `;
      default:
        return `
          border: none;
          background: var(--color-card);
        `;
    }
  }}

  ${({ $hoverEffect = true }) => $hoverEffect && `
    &:hover {
      box-shadow: var(--shadow-medium);
    }
  `}

  ${({ $padding, $variant }) =>
    $padding === 'md' && $variant === 'default' && `
      & > * + * {
        margin-top: 1.5rem; // space-y-6
      }
    `}
`;

// Container principal com espaçamento
export const ImagePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; // space-y-4
`;

// Cabeçalho da pré-visualização
export const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Título da seção
export const SectionTitle = styled.h3`
  font-size: 1.125rem; // text-lg
  font-weight: 600; // font-semibold
  color: var(--color-foreground);
`;

// Botão de remoção estilizado
export const RemoveButton = styled(Button).attrs({
  variant: 'ghost',
  size: 'sm'
})`
  color: var(--color-destructive);
  
  &:hover {
    color: var(--color-destructive-light);
  }
`;

// Imagem estilizada
export const PreviewImage = styled.img`
  width: 100%;
  max-height: 24rem; // max-h-96
  object-fit: contain;
  border-radius: 0.5rem; // rounded-lg
  box-shadow: var(--shadow-soft);
`;

// Informações do arquivo
export const FileInfo = styled.div`
  font-size: 0.875rem; // text-sm
  color: var(--color-muted-foreground);
  
  strong {
    font-weight: 600;
  }
`;

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
};

interface CardTitleProps {
  $color?: 'success' | 'warning' | 'destructive' | 'foreground';
  as?: 'h3' | 'h4' | 'h5' | 'div';
}

export const CardTitle = styled.h3<CardTitleProps>`
  font-weight: 600;
  font-size: ${({ as }) => (as === 'h4' ? '1rem' : '1.25rem')};
  color: ${({ $color = 'foreground' }) => `var(--color-${$color})`};
`;