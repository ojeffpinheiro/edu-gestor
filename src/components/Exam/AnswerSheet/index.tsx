import React from 'react';
import { 
  AnswerSheetContainer,
  Instructions,
  AnswerGrid,
  QuestionNumber,
  SectionDivider,
  Header,
  AnswerColumn,
  QuestionRow,
  AnswerCircles,
  Circle,
  ColumnHeader,
  CapturePoints,
  CapturePoint,
  IdentificationSection,
  QRCodeArea,
  BarcodeArea,
  CodeDigits,
  CodeDigit,
  IdentificationHeader,
  CapturePointsContainer
} from './styles';

import img from '../../../assets/exampleI-answer.png'

interface AnswerSheetProps {
  questionsCount: number;
  questionsPerColumn?: number;
  questionLayout: 'grid' | 'list';
  examId?: string;
}

const AnswerSheet: React.FC<AnswerSheetProps> = ({
  questionsCount = 90,
  questionsPerColumn = 15,
  questionLayout = 'list',
  examId = 'EXAM001'
}) => {
  // Define o número ideal de colunas baseado na quantidade de questões
  let columns = 6;
  
  if (questionsCount <= 8) columns = 3;
  else if (questionsCount <= 10) columns = 5;
  else if (questionsCount <= 120) columns = 6;
  else columns = Math.min(8, Math.ceil(questionsCount / 20));
  
  const adjustedQuestionsPerColumn = Math.ceil(questionsCount / columns);

  // Gera código manual de 8 dígitos baseado no examId
  const generateManualCode = (id: string): string => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash + id.charCodeAt(i)) & 0xffffffff;
    }
    return Math.abs(hash).toString().padStart(8, '0').slice(0, 8);
  };

  const manualCode = generateManualCode(examId);

  return (
    <AnswerSheetContainer>
      {/* Pontos de Captação nos Cantos */}
      <CapturePointsContainer>
        <CapturePoint position="top-left" />
        <CapturePoint position="top-right" />
        <CapturePoint position="bottom-left" />
        <CapturePoint position="bottom-right" />
      </CapturePointsContainer>

      <Header>QUADRO DE RESPOSTAS</Header>
      
      {/* Seção de Identificação da Prova */}
      <IdentificationSection>
        <IdentificationHeader>IDENTIFICAÇÃO DA PROVA</IdentificationHeader>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          {/* QR Code */}
          <QRCodeArea>
            <div className="qr-placeholder">
              <div className="qr-pattern">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className={`qr-cell ${Math.random() > 0.5 ? 'filled' : ''}`} />
                ))}
              </div>
            </div>
          </QRCodeArea>

          {/* Código de Barras */}
          <BarcodeArea>
            <div className="barcode-placeholder">
              {Array.from({ length: 30 }).map((_, i) => (
                <div 
                  key={i} 
                  className="bar" 
                  style={{ 
                    width: Math.random() > 0.5 ? '2px' : '1px',
                    height: '30px',
                    backgroundColor: '#000'
                  }} 
                />
              ))}
            </div>
            <CodeDigits>
              {manualCode.split('').map((digit, index) => (
                <CodeDigit key={index}>
                  <div className="digit-display">{digit}</div>
                </CodeDigit>
              ))}
            </CodeDigits>
          </BarcodeArea>
        </div>
      </IdentificationSection>

      <Instructions>
        Para todas as marcações neste <strong>CARTÃO-RESPOSTA</strong>, preencha os círculos completamente e com nitidez, 
        utilizando <strong>caneta esferográfica de tinta azul ou preta</strong>, conforme na ilustração.
        <img src={img} alt="Ilustração" />
      </Instructions>

      <SectionDivider />

      {/* Pontos de Captação da Grade de Respostas */}
      <CapturePoints>
        <CapturePoint position="grid-top-left" />
        <CapturePoint position="grid-top-right" />
        <CapturePoint position="grid-bottom-left" />
        <CapturePoint position="grid-bottom-right" />
      </CapturePoints>

      <AnswerGrid columns={columns} questionLayout={questionLayout}>
        {Array.from({ length: columns }).map((_, colIndex) => {
          const startQuestion = colIndex * adjustedQuestionsPerColumn + 1;
          const endQuestion = Math.min(
            (colIndex + 1) * adjustedQuestionsPerColumn,
            questionsCount
          );
          
          return (
            <AnswerColumn key={colIndex}>
              <ColumnHeader>QUESTÃO/RESPOSTA</ColumnHeader>
              
              {Array.from({ length: endQuestion - startQuestion + 1 }).map((_, rowIndex) => {
                const questionNumber = startQuestion + rowIndex;
                const isEven = questionNumber % 2 === 0;
                
                return (
                  <QuestionRow key={questionNumber} isEven={isEven}>
                    <QuestionNumber>
                      {questionNumber.toString().padStart(3, "0")}
                    </QuestionNumber>
                    <AnswerCircles>
                      {["A", "B", "C", "D", "E"].map((option) => (
                        <Circle key={option} letter={option} />
                      ))}
                    </AnswerCircles>
                  </QuestionRow>
                );
              })}
            </AnswerColumn>
          );
        })}
      </AnswerGrid>
    </AnswerSheetContainer>
  );
};

export default AnswerSheet;