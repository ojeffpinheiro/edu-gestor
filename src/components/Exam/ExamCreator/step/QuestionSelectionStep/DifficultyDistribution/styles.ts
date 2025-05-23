import styled from "styled-components";

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

// Breakpoints para responsividade
const breakpoints = {
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
};

export const DifficultyDistributionContainer = styled.div`
  background: ${colors.gray[50]};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

export const DistributionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 1rem;

  h4 {
    font-size: 1.1rem;
    color: ${colors.gray[800]};
    font-weight: 600;
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input {
      width: 70px;
      padding: 0.375rem 0.5rem;
      border: 1px solid ${colors.gray[300]};
      border-radius: 4px;
      text-align: center;
      
      &:focus {
        outline: none;
        border-color: ${colors.primary};
        box-shadow: 0 0 0 2px ${colors.primaryLight};
      }
    }
  }
`;

export const DistributionRow = styled.div`
  display: grid;
  grid-template-columns: 80px 70px 1fr;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  
  label {
    font-size: 0.9rem;
    color: ${colors.gray[700]};
    font-weight: 500;
  }
  
  @media (max-width: ${breakpoints.sm}) {
    grid-template-columns: 60px 60px 1fr;
    gap: 0.5rem;
  }
`;

export const DistributionInput = styled.input`
  width: 100%;
  padding: 0.375rem 0.5rem;
  border: 1px solid ${colors.gray[300]};
  border-radius: 4px;
  text-align: center;
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px ${colors.primaryLight};
  }
`;

export const DistributionProgress = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;


interface ProgressBarProps {
    progress: number;
    color?: string;
  }
  
  export const ProgressBar = styled.div<ProgressBarProps>`
    height: 8px;
    background: ${colors.gray[200]};
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  
    &::after {
      content: '';
      display: block;
      height: 100%;
      width: ${props => props.progress}%;
      background: ${props => props.color || colors.info};
      transition: width 0.3s ease, background-color 0.3s ease;
    }
  `;
  
  export const ProgressLabel = styled.span`
    font-size: 0.875rem;
    color: ${colors.gray[600]};
  `;
  
  interface SelectionSummaryProps {
    isValid?: boolean;
  }
  
  export const SelectionSummary = styled.div<SelectionSummaryProps>`
    display: flex;
    justify-content: space-between;
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid ${colors.gray[200]};
    font-size: 0.9rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  
    div {
      strong {
        color: ${colors.gray[800]};
      }
      
      .error-message {
        color: ${colors.danger};
        font-size: 0.85rem;
        margin-left: 0.25rem;
      }
    }
  `;