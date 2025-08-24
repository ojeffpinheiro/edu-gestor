import React, { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiDownload, FiPrinter } from 'react-icons/fi';

import { Exam } from '../../../../types/evaluation/Exam';
import { Container } from '../../../../styles/layoutUtils';
import { ButtonGroup } from '../step/CorrectionForm/styles';

import ExamPreview from '../step/ExamPreview';
import {
  VariantTabs,
  VariantTab,
  VariantContent,
  AnswerKeyContainer,
  AnswerKeyTable,
  PrintButton,
  DownloadButton,
  ExamContainer,
  PrintStyles,
  ExamHeader,
  ExamTitle,
  ToggleButton,
  Controls,
} from './styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface VariantPreviewProps {
  examData: Exam;
  onBack: () => void;
  onComplete: () => void;
  onPrint: (variantId: string) => void;
  onDownload: (variantId: string) => void;
}

const VariantPreview: React.FC<VariantPreviewProps> = ({
  examData,
  onBack,
  onComplete,
  onPrint,
  onDownload,
}) => {
  const [activeVariant, setActiveVariant] = React.useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  if (!examData.variantsEnabled || !examData.variants?.length) {
    return (
      <Container>
        <h2>Nenhuma variante gerada</h2>
        <p>Volte ao passo anterior para gerar as variantes da prova</p>
        <ButtonGroup>
          <button type="button" onClick={onBack} className="secondary">
            <FiArrowLeft /> Voltar
          </button>
        </ButtonGroup>
      </Container>
    );
  }

  return (
    <Container>
      <h2>Pré-visualização das Variantes</h2>
      <p>Revise as diferentes versões da prova antes de finalizar</p>

      <VariantTabs>
        {examData.variants.map((variant, index) => (
          <VariantTab
            key={variant.id}
            active={index === activeVariant}
            onClick={() => setActiveVariant(index)}
          >
            {variant.name}
          </VariantTab>
        ))}
      </VariantTabs>

      <VariantContent>
        <Controls>
          <PrintButton onClick={() => onPrint(examData.variants[activeVariant].id)}>
            <FiPrinter /> Imprimir {examData.variants[activeVariant].name}
          </PrintButton>
          <DownloadButton onClick={() => onDownload(examData.variants[activeVariant].id)}>
            <FiDownload /> Baixar {examData.variants[activeVariant].name}
          </DownloadButton>
        </Controls>

        <>
          <PrintStyles />
          <ExamContainer>
            <ExamHeader>
              <ExamTitle>{examData.title} - Pré-visualização</ExamTitle>
              <Controls>
                <ToggleButton
                  active={showAnswers}
                  onClick={toggleAnswers}
                  aria-label={showAnswers ? "Ocultar respostas" : "Mostrar respostas"}
                >
                  {showAnswers ? <FaEyeSlash /> : <FaEye />}
                  {showAnswers ? "Ocultar Respostas" : "Mostrar Respostas"}
                </ToggleButton>
              </Controls>
            </ExamHeader>

            <ExamPreview examData={examData} />

            <ButtonGroup>
              <button type="button" onClick={onBack} className="secondary">
                <FiArrowLeft /> Voltar
              </button>
            </ButtonGroup>
          </ExamContainer>
        </>

        <AnswerKeyContainer>
          <h3>Gabarito - {examData.variants[activeVariant].name}</h3>
          <AnswerKeyTable>
            <thead>
              <tr>
                <th>Questão</th>
                <th>Resposta Correta</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(examData.variants[activeVariant].answerKey).map(([number, answer]) => (
                <tr key={number}>
                  <td>{number}</td>
                  <td>{answer}</td>
                </tr>
              ))}
            </tbody>
          </AnswerKeyTable>
        </AnswerKeyContainer>
      </VariantContent>

      <ButtonGroup>
        <button type="button" onClick={onBack} className="secondary">
          <FiArrowLeft /> Voltar
        </button>
        <button type="button" onClick={onComplete} className="primary">
          Finalizar Prova <FiArrowRight />
        </button>
      </ButtonGroup>
    </Container>
  );
};

export default VariantPreview;