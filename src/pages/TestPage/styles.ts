import styled from "styled-components";

// Estilos baseados nos componentes base
export const Container = styled.div`
  padding: var(--space-lg);
  max-width: 1200px;
  margin: 0 auto;
  
  :root {
    --color-primary: #1890ff;
    --color-success: #52c41a;
    --color-warning: #faad14;
    --color-error: #f5222d;
    --color-info: #1890ff;
    --color-text: #262626;
    --color-text-secondary: #595959;
    --color-background: #ffffff;
    --color-background-secondary: #fafafa;
    --color-background-third: #f5f5f5;
    --color-card: #ffffff;
    --color-border: #d9d9d9;
    --color-border-light: #f0f0f0;
    --color-input: #ffffff;
    --color-input-focus: #40a9ff;
    --color-button-disabled: #f5f5f5;
    
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    
    --font-size-xs: 12px;
    --font-size-sm: 14px;
    --font-size-md: 16px;
    --font-size-lg: 18px;
    --font-size-xl: 24px;
    
    --border-radius-sm: 4px;
    --border-radius-md: 6px;
    --border-radius-lg: 8px;
    --border-radius-full: 50px;
    
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-focus: 0 0 0 2px rgba(24, 144, 255, 0.2);
    --transition-fast: 0.2s ease;
    
    --z-index-modal: 1000;
  }
`;

export const Header = styled.div`
  margin-bottom: var(--space-xl);
`;

export const Title = styled.h1`
  font-size: var(--font-size-xl);
  color: var(--color-text);
  margin-bottom: var(--space-sm);
  font-weight: 600;
`;

export const Subtitle = styled.p`
  color: var(--color-text-secondary);
  font-size: var(--font-size-md);
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
`;

export const Card = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  padding: var(--space-lg);
  border: 1px solid var(--color-border-light);
  transition: var(--transition-fast);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-md);
  background: linear-gradient(135deg, var(--color-primary), #40a9ff);
  color: white;
`;

export const CardTitle = styled.h3`
  font-size: var(--font-size-lg);
  color: var(--color-text);
  margin: 0;
  font-weight: 600;
`;

export const CardDescription = styled.p`
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin: 0;
`;

export const FormGroup = styled.div`
  margin-bottom: var(--space-md);
`;

export const Label = styled.label`
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: var(--space-xs);
`;

export const Select = styled.select`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-input);
  color: var(--color-text);
  font-size: var(--font-size-md);
  
  &:focus {
    outline: none;
    border-color: var(--color-input-focus);
    box-shadow: var(--shadow-focus);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-input);
  color: var(--color-text);
  font-size: var(--font-size-md);
  
  &:focus {
    outline: none;
    border-color: var(--color-input-focus);
    box-shadow: var(--shadow-focus);
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-top: var(--space-sm);
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text);
  cursor: pointer;
`;

export const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;

export const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: var(--font-size-md);
  padding: var(--space-sm) var(--space-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  width: 100%;
  background: linear-gradient(135deg, var(--color-primary), #40a9ff);
  color: white;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:focus-visible {
    outline: none;
    box-shadow: var(--shadow-focus);
  }
  
  &:disabled {
    background-color: var(--color-button-disabled);
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const StatusBadge = styled.span`
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  font-weight: 500;
  background: var(--color-success);
  color: white;
`;

export const PreviewSection = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  margin-top: var(--space-xl);
`;

export const PreviewTitle = styled.h2`
  font-size: var(--font-size-lg);
  color: var(--color-text);
  margin-bottom: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-md);
`;

export const PreviewCard = styled.div`
  background: white;
  border-radius: var(--border-radius-sm);
  padding: var(--space-md);
  border: 1px solid var(--color-border-light);
`;

export const PreviewCardTitle = styled.h4`
  font-size: var(--font-size-md);
  color: var(--color-text);
  margin-bottom: var(--space-sm);
  font-weight: 500;
`;

export const PreviewCardContent = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
`;