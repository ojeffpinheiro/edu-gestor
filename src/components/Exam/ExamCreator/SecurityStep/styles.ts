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

export const ExamForm = styled.form`
  background: ${colors.white};
  border-radius: 0.5rem;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  
  @media (min-width: ${breakpoints.md}) {
    padding: 1.5rem;
  }
`;

export const FormSection = styled.div`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${colors.gray[200]};

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${colors.gray[800]};
  }
  
  svg {
    color: ${colors.primary};
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  
  @media (min-width: ${breakpoints.md}) {
    flex-direction: row;
    
    & > * {
      flex: 1;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  
  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
    button {
      width: 100%;
    }
  }

  button {
    padding: 0.625rem 1.25rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.2s;
    min-width: 120px;

    &.secondary, &:first-child:not(:last-child) {
      background: ${colors.white};
      border: 1px solid ${colors.gray[300]};
      color: ${colors.gray[700]};

      &:hover:not(:disabled) {
        background: ${colors.gray[100]};
        border-color: ${colors.gray[400]};
      }
    }

    &.primary, &:last-child {
      background: ${colors.primary};
      border: 1px solid ${colors.primary};
      color: ${colors.white};

      &:hover:not(:disabled) {
        background: ${colors.primaryDark};
      }
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;