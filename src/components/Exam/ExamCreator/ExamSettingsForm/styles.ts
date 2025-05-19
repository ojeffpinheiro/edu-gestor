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

export const InputGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: ${colors.gray[700]};
    font-weight: 500;
  }

  input, select, textarea {
    width: 100%;
    padding: 0.625rem 0.75rem;
    border: 1px solid ${colors.gray[300]};
    border-radius: 0.375rem;
    font-size: 1rem;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: ${colors.primary};
      box-shadow: 0 0 0 3px ${colors.primaryLight};
    }
    
    &:disabled {
      background-color: ${colors.gray[100]};
      cursor: not-allowed;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 80px;
  }

  button {

  }

  .instructions-list{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .instruction-item {
    display: flex;
    flex-direction: row;
    gap: 2rem;

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

export const SchoolInfoFields = styled.div`
  gap: '1rem'
`;

export const SchoolInfoItem = styled.div`
display: flex;
flex-direction: row;
gap: 2rem;
`

export const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const FormSection = styled.section`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eaeaea;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    margin-bottom: 1rem;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  font-size: 1rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

export const RadioOption = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 0.5rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  input[type="radio"] {
    margin-top: 0.3rem;
    width: 18px;
    height: 18px;
    cursor: pointer;
    
    &:checked + label {
      color: #4a90e2;
    }
  }
  
  label {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    cursor: pointer;
    width: 100%;
    
    strong {
      font-weight: 500;
    }
    
    span {
      font-size: 0.9rem;
      color: #666;
    }
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

export const NextButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.5rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 0.3rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #3a7bc8;
  }
  
  &:disabled {
    background-color: #c5c5c5;
    cursor: not-allowed;
  }
`;
