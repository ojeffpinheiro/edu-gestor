import styled from "styled-components";

interface AnswerGridProps {
  columns: number;
  questionLayout: 'grid' | 'list';
}

export const AnswerSheetContainer = styled.div`
  min-height: 297mm;
  margin: 0 auto;
  padding: 15mm 20mm;
  background: white;
  font-family: "Arial", sans-serif;
  color: #000;
  line-height: 1.5;
  box-sizing: border-box;
  position: relative;

  @media print {
    padding: 15mm 20mm;
    width: auto;
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
  border: 2px solid #000;
  padding: 1rem;
  background: #f9f9f9;
`;

export const IdentificationHeader = styled.h2`
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 15px 0;
  text-transform: uppercase;
`;

// QR Code
export const QRCodeArea = styled.div`
  text-align: center;
  flex: 1;
  
  .qr-placeholder {
    width: 60px;
    height: 60px;
    border: 2px solid #000;
    margin: 0 auto 8px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
  }
  
  .qr-pattern {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    width: 50px;
    height: 50px;
    gap: 1px;
  }
  
  .qr-cell {
    background: white;
    
    &.filled {
      background: #000;
    }
  }
  
  .qr-label {
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

// Código de Barras
export const BarcodeArea = styled.div`
  text-align: center;
  flex: 2;
  
  .barcode-placeholder {
    display: flex;
    justify-content: center;
    align-items: end;
    gap: 1px;
    height: 40px;
    margin: 10px auto;
    border: 1px solid #000;
    padding: 5px;
    background: white;
  }
  
  .barcode-label {
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  
  .barcode-number {
    font-size: 0.9rem;
    font-weight: bold;
    letter-spacing: 2px;
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

export const Instructions = styled.div`
  text-align: justify;
  font-size: 0.9rem;
  margin-bottom: 20px;
  line-height: 1.4;

  strong {
    font-weight: bold;
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
  gap: 4px;
  margin-top: 3rem;
  position: relative;

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
  border: 1px solid #000;
`;

export const ColumnHeader = styled.div`
  font-weight: bold;
  text-align: center;
  padding: 4px 8px;
  background-color: #f0f0f0;
  border-bottom: 1px solid #000;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

export const QuestionRow = styled.div<{ isEven: boolean }>`
  display: flex;
  align-items: center;
  padding: 1px 3px;
  min-height: 20px;
  background-color: ${props => props.isEven ? '#f8f8f8' : 'white'};
  border-bottom: 1px solid #ddd;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const QuestionNumber = styled.div`
  width: 32px;
  font-size: 0.75rem;
  font-weight: bold;
  text-align: center;
  margin-right: 4px;
`;

export const AnswerCircles = styled.div`
  display: flex;
  gap: 2px;
  margin-left: auto;
`;

export const Circle = styled.div<{ letter: string }>`
  width: 18px;
  height: 18px;
  border: 1px solid #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  background-color: white;
  
  &::after {
    content: "${props => props.letter}";
    color: #DDD;
  }
`;