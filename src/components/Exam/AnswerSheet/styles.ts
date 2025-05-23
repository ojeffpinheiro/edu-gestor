import styled from "styled-components";

interface AnswerGridProps {
  columns: number;
  questionLayout: 'grid' | 'list';
}

export const AnswerSheetContainer = styled.div`
  min-height: 220mm;
  margin: 0 auto;
  padding: 20px;
  background: white;
  font-family: "Arial", sans-serif;
  color: #000;
  line-height: 1.5;
  box-sizing: border-box;
  position: relative;

  @media print {
    padding: 15mm 20mm;
    width: auto;
    box-shadow: none;
  }
`;

// Container para os pontos de captação dos cantos da folha
export const CapturePointsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

// Pontos de captação específicos para a grade
export const CapturePoints = styled.div`
  position: relative;
  margin: 10px 0;
`;

export const CapturePoint = styled.div<{ position: string }>`
  position: absolute;
  width: 8mm;
  height: 8mm;
  background: #000;
  border-radius: 50%;
  
  ${props => {
    switch (props.position) {
      // Pontos dos cantos da folha
      case 'top-left':
        return `
          top: 5mm;
          left: 5mm;
        `;
      case 'top-right':
        return `
          top: 5mm;
          right: 5mm;
        `;
      case 'bottom-left':
        return `
          bottom: 5mm;
          left: 5mm;
        `;
      case 'bottom-right':
        return `
          bottom: 5mm;
          right: 5mm;
        `;
      // Pontos da grade de respostas
      case 'grid-top-left':
        return `
          top: -15px;
          left: -15px;
          width: 6mm;
          height: 6mm;
        `;
      case 'grid-top-right':
        return `
          top: -15px;
          right: -15px;
          width: 6mm;
          height: 6mm;
        `;
      case 'grid-bottom-left':
        return `
          bottom: -15px;
          left: -15px;
          width: 6mm;
          height: 6mm;
        `;
      case 'grid-bottom-right':
        return `
          bottom: -15px;
          right: -15px;
          width: 6mm;
          height: 6mm;
        `;
      default:
        return '';
    }
  }}
`;

export const Header = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
`;

// Seção de Identificação da Prova
export const IdentificationSection = styled.div`
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  padding: 1rem;
  background: #f9f9f9;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const IdentificationHeader = styled.h2`
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  color: #333;
  letter-spacing: 0.5px;
`;

// QR Code
export const QRCodeArea = styled.div`
  text-align: center;
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  
  .qr-placeholder {
    width: 80px;
    height: 80px;
    border: 1px solid #d0d0d0;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 4px;
  }
`;

// Código de Barras
export const BarcodeArea = styled.div`
  text-align: center;
  flex: 2;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  margin-left: 1rem;
  
  .barcode-placeholder {
    display: flex;
    justify-content: center;
    align-items: end;
    gap: 1px;
    height: 50px;
    margin: 0 auto;
    padding: 5px;
    background: white;
  }
`;

// Código Manual
export const ManualCodeArea = styled.div`
  flex: 2;
  
  .manual-label {
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 2px;
  }
  
  .manual-subtitle {
    font-size: 0.7rem;
    text-align: center;
    margin-bottom: 8px;
    color: #666;
  }
`;

export const CodeDigits = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
`;

export const CodeDigit = styled.div`
  text-align: center;
  
  .digit-display {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 4px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .digit-bubbles {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  
  .bubble {
    width: 12px;
    height: 12px;
    border: 1px solid #000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    background: white;
    
    &.filled {
      background: #000;
      color: white;
    }
  }
`;

export const InstructionsContent = styled.div`
  background: #e7e7e7;
  border-radius: 4px;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

export const Instructions = styled.div`
  text-align: justify;
  font-size: 0.9rem;
  line-height: 1.5;
  padding: 1rem;

  strong {
    font-weight: bold;
    color: #333;
  }
`;

export const ExampleItem = styled.span`
  font-size: 0.9rem;
  white-space: nowrap;
`;

export const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid #000;
  margin: 20px 0;
`;

export const AnswerGrid = styled.div<AnswerGridProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 1fr);
  gap: 8px;
  margin-top: 2rem;
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
  background: #f9f9f9;

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const AnswerColumn = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const ColumnHeader = styled.div`
  font-weight: bold;
  text-align: center;
  padding: 8px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #d0d0d0;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: #333;
  letter-spacing: 0.5px;
`;

export const QuestionRow = styled.div<{ isEven: boolean }>`
  display: flex;
  align-items: center;
  padding: 6px 8px;
  min-height: 28px;
  background-color: ${props => props.isEven ? '#f8fafc' : 'white'};
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f0f7ff;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

export const QuestionNumber = styled.div`
  width: 36px;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  margin-right: 8px;
  color: #444;
  flex-shrink: 0;
`;

export const AnswerCircles = styled.div`
  display: flex;
  gap: 2px;
  margin-left: auto;
`;

export const Circle = styled.div<{ letter: string }>`
  width: 22px;
  height: 22px;
  border: 1px solid #3a3a3a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
  background-color: white;
  position: relative;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #4a90e2;
    transform: scale(1.05);
  }
  
  &::after {
    content: "${props => props.letter}";
    color: #aaa;
    position: absolute;
  }
  
  &.filled {
    background-color: #000;
    border-color: #000;
    
    &::after {
      color: white;
    }
  }
`;

// Novo estilo para a imagem de exemplo
export const ExampleImage = styled.img`
  width: 100%;
  height: auto;
  margin: 1rem;
  border-radius: 4px;
  align-self: center;
`;