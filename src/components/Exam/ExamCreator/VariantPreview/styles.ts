import styled, { createGlobalStyle } from "styled-components";

const colors = {
  primary: "#4f46e5",
  primaryDark: "#4338ca",
  primaryHover: '#3a7bc8',
  primaryLight: "rgba(79, 70, 229, 0.2)",
  secondary: "#64748b",
  background: '#ffffff',
  border: '#e0e0e0',
  white: "#ffffff",
  text: '#333',
  examText: '#333333',
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

export const VariantTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${colors.gray[200]};
  padding-bottom: 0.5rem;
`;

export const VariantTab = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem 0.375rem 0 0;
  border: none;
  background: ${props => props.active ? colors.primaryLight : 'transparent'};
  color: ${props => props.active ? colors.primary : colors.gray[600]};
  font-weight: ${props => props.active ? 600 : 500};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.active ? colors.primaryLight : colors.gray[100]};
    color: ${props => props.active ? colors.primary : colors.gray[700]};
  }
`;

export const VariantContent = styled.div`
  margin-top: 1rem;
  border: 1px solid ${colors.gray[200]};
  border-radius: 0.5rem;
  padding: 1.5rem;
  background: ${colors.white};
`;

export const AnswerKeyContainer = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${colors.gray[200]};
  
  h3 {
    font-size: 1.2rem;
    color: ${colors.gray[800]};
    margin-bottom: 1rem;
  }
`;

export const AnswerKeyTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid ${colors.gray[200]};
  }
  
  th {
    background: ${colors.gray[50]};
    font-weight: 600;
    color: ${colors.gray[700]};
  }
  
  tr:nth-child(even) {
    background: ${colors.gray[50]};
  }
`;

export const PrintButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${colors.white};
  border: 1px solid ${colors.gray[300]};
  border-radius: 0.375rem;
  color: ${colors.gray[700]};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${colors.gray[100]};
    border-color: ${colors.gray[400]};
  }
`;

export const DownloadButton = styled(PrintButton)`
  background: ${colors.primary};
  border-color: ${colors.primary};
  color: ${colors.white};
  
  &:hover {
    background: ${colors.primaryDark};
  }
`;

export const ExamContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-color: ${colors.secondary};
    padding: 20px;
    box-sizing: border-box;
    color: ${colors.examText};
    line-height: 1.5;
  `;

export const ExamHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
  `;

export const ExamTitle = styled.h2`
    font-size: 24px;
    color: ${colors.text};
    margin: 0;
  `;

export const ExamControls = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  `;

export const ToggleButton = styled.button<{ active?: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: ${props => props.active ? colors.primary : colors.background};
    color: ${props => props.active ? 'white' : colors.text};
    border: 1px solid ${props => props.active ? colors.primary : colors.border};
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: ${props => props.active ? colors.primaryHover : '#f1f3f5'};
    }
  `;

export const QuestionItem = styled.div`
  position: relative;
  page-break-inside: avoid;
  break-inside: avoid;
  padding: 15px;
  background: white;
  border-radius: 4px;
  transition: all 0.2s ease;
  border: 1px solid ${colors.border};

  &[data-layout="grid"] {
    min-height: 200px; /* Altura mínima para alinhamento */
  }

  &[data-layout="list"] {
    width: 100%;
  }
`;

export const QuestionActions = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.2s ease;
    
    ${QuestionItem}:hover & {
      opacity: 1;
    }
  `;

export const Controls = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  `;

  export const PrintStyles = createGlobalStyle`
    @media print {
      body {
        background: white !important;
        color: black !important;
      }
      
      .exam-preview {
        padding: 0 !important;
        margin: 0 !important;
      }
      
      ${ExamContainer} {
        box-shadow: none !important;
        padding: 0 !important;
        width: auto !important;
      }
      
      ${QuestionActions} {
        display: none !important;
      }
      
      .no-print {
        display: none !important;
      }
    }
  `;