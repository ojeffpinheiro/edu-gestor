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

export const ProgressSteps = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 3rem;
  padding: 0 1rem;

  &::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 10%;
    right: 10%;
    height: 2px;
    background: ${colors.gray[200]};
    z-index: 1;
    
    @media (min-width: ${breakpoints.md}) {
      left: 0;
      right: 0;
    }
  }
`;

interface StepProps {
  active?: boolean;
  completed?: boolean;
}

export const Step = styled.div<StepProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  flex: 1;

  .step-icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${props => props.active || props.completed ? colors.primary : colors.gray[200]};
    color: ${props => props.active || props.completed ? colors.white : colors.gray[500]};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: ${props => props.active ? `0 0 0 4px ${colors.primaryLight}` : 'none'};
  }

  span {
    font-size: 0.85rem;
    color: ${props => props.active ? colors.primary : props.completed ? colors.gray[700] : colors.gray[500]};
    font-weight: ${props => props.active || props.completed ? '600' : 'normal'};
    text-align: center;
    
    @media (min-width: ${breakpoints.md}) {
      font-size: 0.9rem;
    }
  }
`;