import styled from "styled-components";

// Adicione estas interfaces no início do arquivo
interface VariantTabProps {
  active?: boolean;
}

interface GenerateButtonProps {
  disabled?: boolean;
}

// Definindo a paleta de cores
const colors = {
  primary: "#4f46e5",
  primaryDark: "#4338ca",
  primaryLight: "rgba(79, 70, 229, 0.2)",
  secondary: "#64748b",
  white: "#ffffff",
  black: "#333333",
  gray: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  success: "#10b981",
  warning: "#f59e0b",
  info: "#3b82f6",
  danger: "#ef4444",
};

// Adicione estes estilos no arquivo styles.ts
export const VariantGeneratorContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1.5rem;
  background: ${colors.white};
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const VariantGeneratorHeader = styled.div`
  margin-bottom: 1.5rem;
  
  h2 {
    font-size: 1.5rem;
    color: ${colors.gray[800]};
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${colors.gray[600]};
    font-size: 0.95rem;
  }
`;

export const VariantToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${colors.gray[50]};
  border-radius: 0.375rem;
`;

export const VariantToggleLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  color: ${colors.gray[700]};
  cursor: pointer;
  
  input[type="checkbox"] {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const VariantSettingsSection = styled.div`
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: ${colors.white};
  border: 1px solid ${colors.gray[200]};
  border-radius: 0.5rem;
  
  h3 {
    font-size: 1.1rem;
    color: ${colors.gray[800]};
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${colors.gray[200]};
  }
`;

export const VariantCountInput = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    color: ${colors.gray[700]};
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 0.625rem 0.75rem;
    border: 1px solid ${colors.gray[300]};
    border-radius: 0.375rem;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: ${colors.primary};
      box-shadow: 0 0 0 2px ${colors.primaryLight};
    }
  }
`;

export const VariantMethodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const VariantMethodCard = styled.div<VariantTabProps>`
  padding: 1rem;
  border: 1px solid ${props => props.active ? colors.primary : colors.gray[300]};
  border-radius: 0.5rem;
  background: ${props => props.active ? colors.primaryLight : colors.white};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${props => props.active ? colors.primary : colors.gray[400]};
  }
  
  strong {
    display: block;
    font-size: 1rem;
    color: ${props => props.active ? colors.primaryDark : colors.gray[800]};
    margin-bottom: 0.25rem;
  }
  
  span {
    font-size: 0.85rem;
    color: ${props => props.active ? colors.gray[700] : colors.gray[600]};
  }
`;

export const VariantOption = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  background: ${colors.gray[50]};
  
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;
    color: ${colors.gray[700]};
    cursor: pointer;
    
    input[type="checkbox"] {
      width: 1.1rem;
      height: 1.1rem;
    }
  }
`;

export const GenerateVariantButton = styled.button<GenerateButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1.5rem;
  margin-top: 1.5rem;
  background: ${colors.primary};
  color: ${colors.white};
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  opacity: ${props => props.disabled ? 0.7 : 1};
  
  &:hover:not(:disabled) {
    background: ${colors.primaryDark};
  }
  
  svg {
    font-size: 1.1rem;
  }
`;

export const VariantPreviewSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: ${colors.gray[50]};
  border-radius: 0.5rem;
  border: 1px dashed ${colors.gray[300]};
  
  h3 {
    font-size: 1.1rem;
    color: ${colors.gray[800]};
    margin-bottom: 1rem;
  }
  
  p {
    color: ${colors.gray[600]};
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;