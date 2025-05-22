import styled, { createGlobalStyle } from "styled-components";

const colors = {
  primary: '#4a90e2',
  primaryHover: '#3a7bc8',
  secondary: '#f8f9fa',
  text: '#333',
  textLight: '#666',
  border: '#e0e0e0',
  background: '#ffffff',
  error: '#e74c3c',
  success: '#2ecc71',
  warning: '#f39c12',
  examBlue: '#004a80',
  examGray: '#f5f5f5',
  examText: '#333333',
  examBorder: '#cccccc',
};

const examColors = {
  primary: '#004A80', // Azul ENEM
  text: '#333333',
  lightGray: '#F5F5F5',
  border: '#E0E0E0',
  optionCircle: '#000000',
};

// Componentes estilizados
export const Container = styled.div`
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

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
  `;

export const Title = styled.h2`
    font-size: 24px;
    color: ${colors.text};
    margin: 0;
  `;

export const Controls = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  `;

export const ExamContent = styled.div<{ 
  questionLayout: 'grid' | 'list';
  compact: boolean;
}>`
  font-size: 16px;
  line-height: 1.6;
  display: grid;
  grid-template-columns: ${props => props.questionLayout === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr'};
  gap: ${props => props.compact ? '12px' : '24px'};
  margin-top: 20px;
  padding-left: 20px;
  
  @media print {
    gap: ${props => props.compact ? '8px' : '16px'};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  font-weight: bold;
  color: ${colors.examBlue}; // Usando a cor azul do ENEM
  font-size: 1.1rem;

  &::after {
    content: "";
    flex: 1;
    height: .35rem;
    background: ${colors.examBlue};
    margin-left: .2rem;
    border-radius: 2rem;
  }
`;

// Item de questão
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

export const QuestionText = styled.div`
    margin-bottom: 15px;
    color: ${colors.text};
  `;

export const Options = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `;

export const Option = styled.div`
    display: flex;
    gap: 10px;
    align-items: baseline;
  `;

export const OptionLetter = styled.span`
  font-weight: bold;
  min-width: 20px;
  color: ${colors.text};
`;

export const Answer = styled.div`
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px dashed ${colors.border};
    color: ${colors.success};
    font-style: italic;
  `;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
    flex-wrap: wrap;
    gap: 15px;
  `;

export const LeftButtons = styled.div`
    display: flex;
    gap: 12px;
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

export const ExamQuestionNumber = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  color: ${colors.text};
  display: inline-block;
  margin-right: 8px;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 30px;
  color: ${colors.textLight};
  font-style: italic;
`;

export const QuestionsList = styled.div`
  display: contents;
  flex-direction: column;
  gap: 20px;
`;

export const QuestionContent = styled.div`
  padding-right: 40px; // Espaço para ações
`;

// Layout da prova
export const ExamContainer = styled.div`
  width: 210mm; // Tamanho A4
  min-height: 297mm;
  margin: 0 auto;
  padding: 10mm;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  
  @media print {
    box-shadow: none;
    padding: 25mm;
    width: auto;
  }
`;

// Cabeçalho da prova (estilo ENEM)
export const ExamHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  
  h1 {
    color: ${colors.examBlue};
    font-size: 1.5rem;
    margin-bottom: 5px;
  }
  
  h2 {
    font-size: 1.2rem;
    font-weight: normal;
    margin-top: 0;
  }
`;

// Rodapé da prova
export const ExamFooter = styled.footer`
  text-align: center;
  margin-top: 40px;
  padding-top: 15px;
  border-top: 1px solid ${colors.examBorder};
  font-size: 0.9rem;
  color: ${colors.textLight};
  
  .page-info {
    float: left;
  }
  
  .school-info {
    float: right;
  }

  @media print {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
`;

// Opções de múltipla escolha (estilo ENEM)
export const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  margin-top: 15px;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  
  .enem-style & {
    grid-template-columns: 1fr;
  }
`;

export const OptionItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  page-break-inside: avoid;
`;

// Indicador de tipo de questão
export const QuestionTypeIndicator = styled.div<{ type: string }>`
  display: inline-block;
  font-size: 0.7rem;
  padding: 2px 6px;
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 8px;
  color: ${colors.textLight};
  
  &:before {
    content: "${props => {
    switch (props.type) {
      case 'multiple_choice': return 'MÚLTIPLA ESCOLHA';
      case 'true_false': return 'VERDADEIRO/FALSO';
      default: return 'QUESTÃO';
    }
  }}";
  }
`;

// Gabarito
export const CorrectAnswer = styled.div`
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px dashed ${colors.border};
  color: ${colors.success};
  font-weight: bold;
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

export const QuestionBody = styled.div`
  padding: 8px 0;
  position: relative;
  page-break-inside: avoid;
  break-inside: avoid;
  font-size: 1.05rem;
  line-height: 1.6;

  /* Estilo para imagens dentro do enunciado */
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 12px auto;
    border: 1px solid ${colors.border};
    border-radius: 4px;
  }

  /* Estilo para tabelas */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
    font-size: 0.95rem;

    th, td {
      border: 1px solid ${colors.border};
      padding: 8px 12px;
      text-align: left;
    }

    th {
      background-color: ${colors.examGray};
      font-weight: bold;
    }
  }

  /* Estilo para listas */
  ul, ol {
    margin: 8px 0 8px 20px;
    padding-left: 15px;

    li {
      margin-bottom: 6px;
    }
  }

  /* Estilo para blocos de código ou fórmulas */
  pre, code {
    font-family: 'Courier New', monospace;
    background-color: ${colors.examGray};
    padding: 8px 12px;
    border-radius: 4px;
    overflow-x: auto;
  }

  /* Estilo para citações */
  blockquote {
    border-left: 3px solid ${colors.primary};
    padding-left: 15px;
    margin: 12px 0;
    color: ${colors.textLight};
    font-style: italic;
  }
`;

interface TypeIndicatorProps {
  type: string;
  compact?: boolean;
}

export const TypeIndicator = styled.div<TypeIndicatorProps>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: ${props => props.compact ? '0.65rem' : '0.75rem'};
  padding: ${props => props.compact ? '2px 6px' : '4px 8px'};
  border-radius: 4px;
  margin-bottom: 8px;
  font-weight: bold;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  user-select: none;

  /* Cores baseadas no tipo de questão */
  background-color: ${props => {
    switch (props.type) {
      case 'multiple_choice': return '#e3f2fd';
      case 'true_false': return '#e8f5e9';
      case 'essay': return '#fff8e1';
      case 'fill_the_blanks': return '#f3e5f5';
      default: return colors.examGray;
    }
  }};
  
  color: ${props => {
    switch (props.type) {
      case 'multiple_choice': return '#0d47a1';
      case 'true_false': return '#1b5e20';
      case 'essay': return '#e65100';
      case 'fill_the_blanks': return '#4a148c';
      default: return colors.text;
    }
  }};

  /* Ícone */
  svg {
    font-size: ${props => props.compact ? '0.7rem' : '0.8rem'};
  }

  /* Efeito hover apenas no modo de edição */
  .edit-mode & {
    &:hover {
      opacity: 0.9;
      cursor: help;
    }
  }

  /* Tooltip para o tipo completo */
  position: relative;
  &:hover::after {
    content: "${props => {
    switch (props.type) {
      case 'multiple_choice': return 'Questão de múltipla escolha';
      case 'true_false': return 'Verdadeiro ou Falso';
      case 'essay': return 'Questão dissertativa';
      case 'fill_the_blanks': return 'Preenchimento de lacunas';
      default: return 'Tipo de questão';
    }
  }}";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${colors.text};
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.7rem;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    z-index: 10;
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
    margin-bottom: 5px;
  }
`;

export const OptionsContainer = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, 1fr)`};
  gap: 15px;
  margin: 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const OptionCircle = styled.div`
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  border-radius: 50%;
  background: ${examColors.optionCircle};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
`;

export const OptionText = styled.span`
    color: ${colors.text};
  flex: 1;
  padding-top: 2px;
  `;

export const SourceText = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin: 15px 0;
  font-style: italic;
`;