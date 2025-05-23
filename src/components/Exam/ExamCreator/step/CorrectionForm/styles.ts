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

// Estilos
export const SecurityContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const Section = styled.section`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eaeaea;

  &:last-child {
    border-bottom: none;
  }

  h3 {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 1rem;
  }
`;

export const FormControl = styled.div`
  margin-bottom: 1rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

export const HelpText = styled.p`
  margin-top: 0.5rem;
  margin-left: 1.8rem;
  font-size: 0.9rem;
  color: #666;
`;

export const PasswordContainer = styled.div`
  margin-top: 1rem;
  margin-left: 1.8rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;

export const PasswordInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  input {
    flex: 1;
    padding: 0.7rem 2.5rem 0.7rem 1rem;
    border: 1px solid #ddd;
    border-radius: 0.3rem;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #4a90e2;
      box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
    }
  }
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #777;
  padding: 0.5rem;
  
  &:hover {
    color: #333;
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RadioOption = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  
  input[type="radio"] {
    margin-top: 0.3rem;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  label {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    cursor: pointer;
    
    strong {
      font-weight: 500;
    }
    
    span {
      font-size: 0.9rem;
      color: #666;
    }
  }
`;

export const SecurityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

export const SecurityOption = styled.div`
  label {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    cursor: pointer;
    
    input[type="checkbox"] {
      margin-top: 0.3rem;
      width: 18px;
      height: 18px;
    }
    
    div {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      
      strong {
        font-weight: 500;
      }
      
      span {
        font-size: 0.9rem;
        color: #666;
      }
    }
  }
`;