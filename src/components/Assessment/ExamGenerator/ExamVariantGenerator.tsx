import React, { useState } from 'react';
import { FaCopy, FaRandom, FaFileExport, FaCheck } from 'react-icons/fa';

import { Exam, Question } from '../../../utils/types/Assessment';
import QRCodeService from '../../../utils/qrCodeGenerator';
import ExamPdfGenerator from '../../../utils/examPdfGenerator';

import { Divider } from '../../../styles/layoutUtils';
import { Title } from '../../../styles/typography';
import { FormContainer } from '../../../styles/containers';
import { IconWrapper, Tag, TwoColumnGrid } from '../../../styles/baseComponents';
import { FormGroup, Label } from '../../../styles/formControls';
import { Button } from '../../../styles/buttons';
import { ErrorMessage, SuccessMessage } from '../../../styles/feedback';

import { 
  NumberInput, 
  StyledSwitch, 
  SwitchContainer, 
  TextInput, 
  VariantActions, 
  VariantCard,
  VariantDetails, 
  VariantHeader, 
  VariantTitle 
} from './ExamVariantGeneratorStyles';


interface ExamVariantGeneratorProps {
  baseExam: Exam;
  questions: Question[];
  onVariantsGenerated: (variants: Exam[]) => void;
}

/**
 * Componente para gerar variantes de uma prova com questões embaralhadas
 */
const ExamVariantGenerator: React.FC<ExamVariantGeneratorProps> = ({
  baseExam,
  questions,
  onVariantsGenerated
}) => {
  const [numVariants, setNumVariants] = useState<number>(2);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(true);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(true);
  const [useSequentialIds, setUseSequentialIds] = useState<boolean>(true);
  const [variantPrefix, setVariantPrefix] = useState<string>('Variante');
  const [generatedVariants, setGeneratedVariants] = useState<Exam[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const generatePassword = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const createVariant = async (variantIndex: number): Promise<Exam> => {
    if (!baseExam.questions || baseExam.questions.length === 0) {
      throw new Error('A prova base não contém questões');
    }

    let questionIds = [...baseExam.questions];
    if (shuffleQuestions) {
      questionIds = shuffleArray(questionIds);
    }

    const variantId = useSequentialIds
      ? `${baseExam.id}-${variantIndex + 1}`
      : `${baseExam.id}-${Date.now()}-${variantIndex}`;

    const qrCode = await QRCodeService.generateSVG(variantId);
    const barCode = `${variantId}-barcode`;

    return {
      ...baseExam,
      id: variantId,
      title: `${baseExam.title} - ${variantPrefix} ${variantIndex + 1}`,
      questions: questionIds,
      qrCode,
      barCode,
      password: generatePassword(),
      createdAt: new Date()
    };
  };

  const generateVariants = async () => {
    setIsGenerating(true);
    setError(null);
    setSuccess(null);

    try {
      if (numVariants < 1 || numVariants > 10) {
        throw new Error('O número de variantes deve estar entre 1 e 10');
      }

      const variants: Exam[] = [];
      for (let i = 0; i < numVariants; i++) {
        const variant = await createVariant(i);
        variants.push(variant);
      }

      setGeneratedVariants(variants);
      onVariantsGenerated(variants);
      setSuccess(`${variants.length} variantes geradas com sucesso!`);
    } catch (err) {
      console.error("Error generating exam variants:", err);
      setError(err instanceof Error ? err.message : 'Erro ao gerar variantes');
    } finally {
      setIsGenerating(false);
    }
  };

  const exportVariantAsPdf = (variant: Exam) => {
    try {
      const variantQuestions = variant.questions
        .map(qId => questions.find(q => q.id === qId))
        .filter(Boolean) as Question[];

      if (variantQuestions.length === 0) {
        throw new Error('Nenhuma questão encontrada para exportação');
      }

      const pdfOptions = ExamPdfGenerator.getDefaultExamPdfOptions();
      pdfOptions.headerOptions.title = variant.title;

      ExamPdfGenerator.generateExamPdf(variant, variantQuestions, pdfOptions)
        .then(pdfBuffer => {
          // Implementar download do PDF
          console.log("PDF generated successfully");
        })
        .catch(error => {
          console.error("Error generating PDF:", error);
          setError('Erro ao gerar PDF');
        });
    } catch (err) {
      console.error("Error preparing PDF export:", err);
      setError(err instanceof Error ? err.message : 'Erro ao preparar exportação');
    }
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setNumVariants(value);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        // Feedback visual opcional
      })
      .catch(err => {
        console.error("Failed to copy:", err);
        setError('Falha ao copiar para a área de transferência');
      });
  };

  return (
    <div className="variant-generator-container">
      <Title>Gerador de Variantes de Prova</Title>

      <FormContainer>
        <TwoColumnGrid>
          <FormGroup>
            <Label>Número de variantes</Label>
            <NumberInput
              min={1}
              max={10}
              value={numVariants}
              onChange={handleNumberInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>Prefixo</Label>
            <TextInput
              value={variantPrefix}
              onChange={(e) => setVariantPrefix(e.target.value)}
              placeholder="Variante"
            />
          </FormGroup>
        </TwoColumnGrid>

        <TwoColumnGrid>
          <FormGroup>
            <Label>Embaralhar questões</Label>
            <SwitchContainer>
              <StyledSwitch>
                <input
                  type="checkbox"
                  checked={shuffleQuestions}
                  onChange={() => setShuffleQuestions(!shuffleQuestions)}
                />
                <span></span>
              </StyledSwitch>
              <label>{shuffleQuestions ? 'Sim' : 'Não'}</label>
            </SwitchContainer>
          </FormGroup>

          <FormGroup>
            <Label>Embaralhar alternativas</Label>
            <SwitchContainer>
              <StyledSwitch>
                <input
                  type="checkbox"
                  checked={shuffleOptions}
                  onChange={() => setShuffleOptions(!shuffleOptions)}
                />
                <span></span>
              </StyledSwitch>
              <label>{shuffleOptions ? 'Sim' : 'Não'}</label>
            </SwitchContainer>
          </FormGroup>

          <FormGroup>
            <Label>Usar sequência de IDs</Label>
            <SwitchContainer>
              <StyledSwitch>
                <input
                  type="checkbox"
                  checked={useSequentialIds}
                  onChange={() => setUseSequentialIds(!useSequentialIds)}
                />
                <span></span>
              </StyledSwitch>
              <label>{useSequentialIds ? 'Sim' : 'Não'}</label>
            </SwitchContainer>
          </FormGroup>
        </TwoColumnGrid>

        <Button
          variant="primary"
          onClick={generateVariants}
          disabled={isGenerating || !baseExam.questions || baseExam.questions.length === 0}
        >
          <IconWrapper>
            <FaRandom />
          </IconWrapper>
          {isGenerating ? 'Gerando...' : 'Gerar variantes'}
        </Button>

        {error && (
          <ErrorMessage>
            {error}
          </ErrorMessage>
        )}

        {success && (
          <SuccessMessage>
            <FaCheck /> {success}
          </SuccessMessage>
        )}
      </FormContainer>

      {generatedVariants.length > 0 && (
        <>
          <Divider />
          <Title>Variantes Geradas</Title>

          {generatedVariants.map((variant) => (
            <VariantCard key={variant.id}>
              <VariantHeader>
                <VariantTitle>{variant.title}</VariantTitle>
                <VariantActions>
                  <Button onClick={() => copyToClipboard(variant.id || '')}>
                    <IconWrapper>
                      <FaCopy />
                    </IconWrapper>
                    Copiar ID
                  </Button>
                  <Button onClick={() => exportVariantAsPdf(variant)}>
                    <IconWrapper>
                      <FaFileExport />
                    </IconWrapper>
                    Exportar PDF
                  </Button>
                </VariantActions>
              </VariantHeader>

              <VariantDetails>
                <p><strong>ID:</strong> {variant.id}</p>
                <p><strong>Senha:</strong> {variant.password}</p>
                <p>
                  <strong>Questões:</strong> {variant.questions.length} questões
                  {shuffleQuestions && <Tag color="blue">Ordem aleatória</Tag>}
                  {shuffleOptions && <Tag color="green">Alternativas aleatórias</Tag>}
                </p>
              </VariantDetails>
            </VariantCard>
          ))}
        </>
      )}
    </div>
  );
};

export default ExamVariantGenerator;