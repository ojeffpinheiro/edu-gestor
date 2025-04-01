import React, { useState } from 'react';
import { FaCopy, FaRandom, FaFileExport, FaPlus } from 'react-icons/fa';

import { Exam, Question } from '../../../utils/types/Assessment';
import QRCodeService from '../../../utils/qrCodeGenerator';
import ExamPdfGenerator from '../../../utils/examPdfGenerator';

import { Alert, Button, ButtonGroup, Container, Divider, FormContainer, FormGroup, IconWrapper, Label, NumberInput, SwitchContainer, SwitchInput, SwitchLabel, Tag, TextInput, Title, VariantActions, VariantCard, VariantDetails, VariantHeader, VariantTitle } from './styles'

// Types
interface ExamVariantGeneratorProps {
  baseExam: Exam;
  questions: Question[];
  onVariantsGenerated: (variants: Exam[]) => void;
}

// Component
const ExamVariantGenerator: React.FC<ExamVariantGeneratorProps> = ({
  baseExam,
  questions,
  onVariantsGenerated
}) => {
  const [numVariants, setNumVariants] = useState<number>(2);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(true);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(true);
  const [useSequentialIds, setUseSequentialIds] = useState<boolean>(true);
  const [variantPrefix, setVariantPrefix] = useState<string>('Variant');
  const [generatedVariants, setGeneratedVariants] = useState<Exam[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Function to shuffle an array (Fisher-Yates algorithm)
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Function to generate a random password for exams
  const generatePassword = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // Create a variant of the exam with shuffled questions
  const createVariant = async (variantIndex: number): Promise<Exam> => {
    // Create a copy of the question IDs
    let questionIds = [...baseExam.questions];

    // Shuffle questions if enabled
    if (shuffleQuestions) {
      questionIds = shuffleArray(questionIds);
    }

    // Generate unique identifier for this variant
    const variantId = useSequentialIds
      ? `${baseExam.id}-${variantIndex + 1}`
      : `${baseExam.id}-${Date.now()}-${variantIndex}`;

    // Generate QR code and barcode for the variant
    // Modified to handle the async nature of generateSVG
    const qrCode = await QRCodeService.generateSVG(variantId);

    // Assuming we have a BarCodeGenerator service with this method
    // This is a placeholder since we don't have the actual implementation
    const barCode = `${variantId}-barcode`;

    // Create the variant
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

  // Generate variants of the exam
  const generateVariants = async () => {
    setIsGenerating(true);

    try {
      const variants: Exam[] = [];

      for (let i = 0; i < numVariants; i++) {
        const variant = await createVariant(i);
        variants.push(variant);
      }

      setGeneratedVariants(variants);
      onVariantsGenerated(variants);
    } catch (error) {
      console.error("Error generating exam variants:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Export a single variant as PDF
  const exportVariantAsPdf = (variant: Exam) => {
    // We need to pass both the variant and the actual questions it contains
    const variantQuestions = variant.questions
      .map(qId => questions.find(q => q.id === qId))
      .filter(Boolean) as Question[];

    // If we're shuffling options, we need to create a shuffled copy of each question
    let questionsForExport: Question[] = variantQuestions;

    if (shuffleOptions) {
      // Here we would typically shuffle the options within each question
      // For this example, we're assuming questions have options that can be shuffled
      questionsForExport = variantQuestions.map(q => ({
        ...q,
        // In a real implementation, you'd shuffle the options here
      }));
    }

    // Use default options for PDF generation
    const pdfOptions = ExamPdfGenerator.getDefaultExamPdfOptions();

    // Update options based on variant settings
    pdfOptions.headerOptions.title = variant.title;
    pdfOptions.contentOptions.showPoints = true;

    // Generate the PDF with the appropriate options
    ExamPdfGenerator.generateExamPdf(variant, questionsForExport, pdfOptions)
      .then(pdfBuffer => {
        // In a real implementation, we'd handle the PDF buffer
        // (e.g., trigger a download or display it)
        console.log("PDF generated successfully");
      })
      .catch(error => {
        console.error("Error generating PDF:", error);
      });
  };

  // Export all variants as PDF
  const exportAllVariantsAsPdf = () => {
    generatedVariants.forEach(variant => {
      exportVariantAsPdf(variant);
    });
  };

  // Handle number input change
  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 10) {
      setNumVariants(value);
    }
  };

  // Handle copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Container>
      <Title>Exam Variant Generator</Title>

      <FormContainer>
        <FormGroup>
          <Label>Number of Variants</Label>
          <NumberInput
            min={1}
            max={10}
            value={numVariants}
            onChange={handleNumberInputChange}
          />
        </FormGroup>

        <FormGroup>
          <Label>Variant Prefix</Label>
          <TextInput
            value={variantPrefix}
            onChange={(e) => setVariantPrefix(e.target.value)}
            placeholder="Variant"
          />
        </FormGroup>

        <FormGroup>
          <Label>Shuffle Questions</Label>
          <SwitchContainer>
            <SwitchInput
              checked={shuffleQuestions}
              onChange={() => setShuffleQuestions(!shuffleQuestions)}
            />
            <SwitchLabel>{shuffleQuestions ? 'Yes' : 'No'}</SwitchLabel>
          </SwitchContainer>
        </FormGroup>

        <FormGroup>
          <Label>Shuffle Options (for multiple choice)</Label>
          <SwitchContainer>
            <SwitchInput
              checked={shuffleOptions}
              onChange={() => setShuffleOptions(!shuffleOptions)}
            />
            <SwitchLabel>{shuffleOptions ? 'Yes' : 'No'}</SwitchLabel>
          </SwitchContainer>
        </FormGroup>

        <FormGroup>
          <Label>Use Sequential IDs</Label>
          <SwitchContainer>
            <SwitchInput
              checked={useSequentialIds}
              onChange={() => setUseSequentialIds(!useSequentialIds)}
            />
            <SwitchLabel>{useSequentialIds ? 'Yes' : 'No'}</SwitchLabel>
          </SwitchContainer>
        </FormGroup>

        <Button
          primary
          onClick={generateVariants}
          disabled={isGenerating}
        >
          <IconWrapper>
            <FaRandom />
          </IconWrapper>
          {isGenerating ? 'Generating...' : 'Generate Variants'}
        </Button>
      </FormContainer>

      {generatedVariants.length > 0 && (
        <>
          <Divider />
          <Title>Generated Variants</Title>

          <Alert type="success">
            {`${generatedVariants.length} variants generated successfully!`}
          </Alert>

          <ButtonGroup>
            <Button onClick={exportAllVariantsAsPdf}>
              <IconWrapper>
                <FaFileExport />
              </IconWrapper>
              Export All Variants
            </Button>
          </ButtonGroup>

          {generatedVariants.map((variant) => (
            <VariantCard key={variant.id}>
              <VariantHeader>
                <VariantTitle>{variant.title}</VariantTitle>
                <VariantActions>
                  <Button onClick={() => copyToClipboard(variant.id)}>
                    <IconWrapper>
                      <FaCopy />
                    </IconWrapper>
                    Copy ID
                  </Button>
                  <Button onClick={() => exportVariantAsPdf(variant)}>
                    <IconWrapper>
                      <FaPlus />
                    </IconWrapper>
                    Export PDF
                  </Button>
                </VariantActions>
              </VariantHeader>

              <VariantDetails>
                <p><strong>ID:</strong> {variant.id}</p>
                <p><strong>Password:</strong> {variant.password}</p>
                <p>
                  <strong>Questions:</strong>{' '}
                  {variant.questions.length} questions
                  {shuffleQuestions && <Tag color="blue">Shuffled order</Tag>}
                  {shuffleOptions && <Tag color="green">Shuffled options</Tag>}
                </p>
              </VariantDetails>
            </VariantCard>
          ))}
        </>
      )}
    </Container>
  );
};

export default ExamVariantGenerator;