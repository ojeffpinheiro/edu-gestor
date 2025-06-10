import styled from "styled-components";

// Painel de navegação
export const PanelHeader = styled.div`
  padding: var(--space-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-title-card);
  border-bottom: 1px solid var(--color-border-light);
  background-color: var(--color-background-third);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ItemIcon = styled.span`
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  min-width: 24px;
`;

export const NavItem = styled.div<{ level: number; isSelected: boolean; isHigherLevel: boolean }>`
  padding: var(--space-sm) var(--space-md);
  padding-left: ${props => `calc(${props.level} * var(--space-lg) + var(--space-md))`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: var(--color-text);
  border-left: 3px solid transparent;
  transition: all var(--transition-fast);
  margin: var(--space-xs) 0;
  border-radius: var(--border-radius-md);
  
  ${props => props.isSelected && `
    background-color: var(--color-primary-hover);
    border-left-color: var(--color-primary);
    color: var(--color-text-on-primary);
    
    ${ItemType} {
      color: var(--color-text-on-primary);
      background-color: var(--color-button);
    }
  `}
  
  ${props => props.isHigherLevel && !props.isSelected && `
    font-weight: var(--font-weight-medium);
  `}
  
  &:hover {
    background-color: var(--color-button);
  }
`;

export const CollapseButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: var(--space-xs);
  border-radius: var(--border-radius-sm);
  
  &:hover {
    background-color: var(--color-button);
  }
`;

export const NavigationPanel = styled.div`
  flex: 0 0 300px;
  background-color: var(--color-background-secondary);
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border-light);
  transition: all var(--transition-normal);
`;

// Componentes principais
export const PageContainer = styled.div`
  font-family: var(--font-family);
  padding: var(--space-xl);
  max-width: 95vw;
  margin: 0 auto;
  background-color: var(--color-background);
  color: var(--color-text);
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-xl);
  gap: var(--space-md);
  
  @media (max-width: var(--breakpoint-md)) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: var(--font-size-3xl);
  color: var(--color-title-card);
  font-weight: var(--font-weight-semibold);
`;

export const MainLayout = styled.div`
  display: flex;
  gap: var(--space-lg);
  height: calc(100vh - 120px);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  background-color: var(--color-surface);
  transition: all var(--transition-normal);
  
  &.collapsed {
    ${NavigationPanel} {
      flex: 0 0 60px;
      overflow: hidden;
      
      ${PanelHeader}, ${NavItem} span:not(${ItemIcon}) {
        opacity: 0;
        width: 0;
        height: 0;
        overflow: hidden;
      }
      
      ${ItemIcon} {
        margin-left: var(--space-sm);
      }
    }
  }
`;

export const NavigationTree = styled.div`
  padding: var(--space-md) 0;
  overflow-y: auto;
  flex: 1;
`;

export const ItemLabel = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ExpandButton = styled.span`
  display: inline-flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  color: var(--color-text-secondary);
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
  
  &:hover {
    color: var(--color-primary);
    background-color: var(--color-button);
  }
`;

export const ItemType = styled.span`
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  background-color: var(--color-button);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-sm);
  white-space: nowrap;
`;

// Painel de conteúdo
export const ContentPanel = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: var(--color-surface);
  display: flex;
  flex-direction: column;
`;

export const DetailsContainer = styled.div`
  padding: var(--space-xl);
  flex: 1;
`;

export const BreadcrumbNav = styled.div`
  margin-bottom: var(--space-lg);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-xs);
`;

export const BreadcrumbItem = styled.span`
  cursor: pointer;
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--color-primary);
    text-decoration: underline;
  }
`;

export const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-xl);
  gap: var(--space-md);
`;

export const ItemTypeLabel = styled.div`
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-sm);
  letter-spacing: 0.05em;
`;

export const DetailTitle = styled.h2`
  margin: 0;
  font-size: var(--font-size-2xl);
  color: var(--color-title-card);
  font-weight: var(--font-weight-semibold);
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: var(--space-sm);
`;

export const ActionButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: var(--space-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
  
  &:hover {
    background-color: var(--color-background-secondary);
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Seções de conteúdo
export const ContentSection = styled.div`
  margin-top: var(--space-xl);
`;

export const SectionTitle = styled.h3`
  font-size: var(--font-size-xl);
  margin-bottom: var(--space-md);
  color: var(--color-title-card);
  font-weight: var(--font-weight-semibold);
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-md);
`;

export const ContentCard = styled.div`
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-lg);
  padding: var(--space-md);
  cursor: pointer;
  display: flex;
  gap: var(--space-sm);
  align-items: flex-start;
  transition: all var(--transition-normal);
  background-color: var(--color-card);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
  }
`;

export const CardIcon = styled.div`
  color: var(--color-primary);
  display: flex;
  align-items: center;
  padding: var(--space-xs);
`;

export const CardContent = styled.div`
  flex: 1;
`;

export const CardTitle = styled.div`
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-xs);
  color: var(--color-title-card);
`;

export const CardType = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
`;

export const AddCard = styled.div`
  border: 1px dashed var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: var(--space-md);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  color: var(--color-text-secondary);
  height: 100%;
  min-height: 100px;
  transition: all var(--transition-normal);
  background-color: var(--color-background-secondary);
  
  &:hover {
    background-color: var(--color-background-third);
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
`;

// Estados vazios
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-2xl);
  flex: 1;
  color: var(--color-text-secondary);
  text-align: center;
  gap: var(--space-md);
  
  svg {
    color: var(--color-text-third);
  }
  
  p {
    font-size: var(--font-size-md);
    max-width: 400px;
  }
`;

export const EmptyContentMessage = styled.div`
  text-align: center;
  padding: var(--space-xl);
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  
  p {
    font-size: var(--font-size-md);
    max-width: 500px;
  }
`;

// Botões
export const AddButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border: none;
  border-radius: var(--border-radius-md);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-normal);
  
  &:hover {
    background-color: var(--color-primary-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Modal
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-index-modal);
  backdrop-filter: blur(4px);
  animation: fadeIn var(--transition-fast) forwards;
`;

export const ModalContent = styled.div`
  background-color: var(--color-surface);
  border-radius: var(--border-radius-lg);
  width: 500px;
  max-width: 90vw;
  box-shadow: var(--shadow-lg);
  animation: slideUp var(--transition-normal) forwards;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  padding: var(--space-md);
  border-bottom: 1px solid var(--color-border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h3 {
    margin: 0;
    font-size: var(--font-size-lg);
    color: var(--color-title-card);
  }
`;

export const ModalBody = styled.div`
  padding: var(--space-lg);
  overflow-y: auto;
  flex: 1;
`;

export const ModalFooter = styled.div`
  padding: var(--space-md);
  border-top: 1px solid var(--color-border-light);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
`;

export const FormGroup = styled.div`
  margin-bottom: var(--space-lg);
  
  label {
    display: block;
    margin-bottom: var(--space-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-title-card);
    font-size: var(--font-size-sm);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  background-color: var(--color-input);
  color: var(--color-text);
  transition: all var(--transition-fast);
  
  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: var(--shadow-focus);
  }
  
  &:disabled {
    background-color: var(--color-background-secondary);
    cursor: not-allowed;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-md);
  background-color: var(--color-input);
  color: var(--color-text);
  transition: all var(--transition-fast);
  
  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: var(--shadow-focus);
  }
`;

export const Button = styled.button`
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-normal);
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background-color: var(--color-button-disabled);
  }
`;

export const SaveButton = styled(Button)`
  background-color: var(--color-success);
  color: white;
  border: none;
  
  &:hover:not(:disabled) {
    background-color: var(--color-success-hover);
  }
`;

export const CancelButton = styled(Button)`
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  
  &:hover {
    background-color: var(--color-background-secondary);
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: var(--font-size-xl);
  cursor: pointer;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xs);
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-fast);
  
  &:hover {
    color: var(--color-text);
    background-color: var(--color-button);
  }
`;

// Componente de loading
export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl);
  flex: 1;
  
  &::after {
    content: "";
    width: 40px;
    height: 40px;
    border: 3px solid var(--color-border);
    border-top-color: var(--color-primary);
    border-radius: var(--border-radius-full);
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// Barra de busca
export const SearchBar = styled.div`
  display: flex;
  margin-bottom: var(--space-lg);
  position: relative;
  
  input {
    padding-left: var(--space-xl);
    width: 100%;
  }
  
  svg {
    position: absolute;
    left: var(--space-md);
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-text-third);
  }
`;

export const LoadingSpinner = styled.div<{ size: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
  border: 2px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: var(--border-radius-full);
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const ErrorText = styled.span`
  color: var(--color-error);
  font-size: var(--font-size-xs);
  margin-top: var(--space-xs);
  display: block;
`;