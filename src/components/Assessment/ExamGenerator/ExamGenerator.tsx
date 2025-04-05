import React, { useState } from 'react';

import { Exam, Question } from '../../../utils/types/Assessment';
import QRCodeService from '../../../utils/qrCodeGenerator';
import BarCodeGenerator from '../../../utils/barCodeGenerator';
import ExamSecurityManager from './ExamSecurityManager';

import { CancelButton } from '../../../styles/buttons';
import {
  MainContainer,
  StepContainer,
  FormGroup,
  ActionContainer,
  QuestionItem,
  QuestionList,
  QuestionsContainer,
  QuestionSelectionActions,
  SuccessMessage,
  RandomSelectButton,
  AddQuestionButton,
  RemoveQuestionButton,
  NextStepButton,
  GenerateExamButton,
  StepIndicator,
  StepTitle,
  FormSection,
  StepContent
} from './ExamGeneratorStyles';

interface ExamConfigProps {
  config: {
    title: string;
    description: string;
    numQuestions: number;
    categories: string[];
    difficulty: string;
  };
  availableCategories: string[];
  onChange: (config: any) => void;
}

interface QuestionSelectorProps {
  availableQuestions: Question[];
  selectedQuestions: Question[];
  onSelectQuestion: (question: Question) => void;
  onRemoveQuestion: (questionId: string) => void;
  numQuestionsNeeded: number;
}

const ExamConfig: React.FC<ExamConfigProps> = ({
  config,
  availableCategories,
  onChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...config, [name]: value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    onChange({ ...config, categories: selectedOptions });
  };

  return (
    <FormSection>
      <FormGroup>
        <label htmlFor="title">Título da Prova:</label>
        <input
          id="title"
          name="title"
          value={config.title}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="numQuestions">Número de Questões:</label>
        <input
          type="number"
          id="numQuestions"
          name="numQuestions"
          value={config.numQuestions}
          onChange={handleChange}
          min={1}
          step={1}
          required
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          name="description"
          value={config.description}
          onChange={handleChange}
          rows={3}
        />
      </FormGroup>

      <FormGroup>
        <label htmlFor="categories">Categorias:</label>
        <select
          id="categories"
          name="categories"
          multiple
          value={config.categories}
          onChange={handleCategoryChange}
        >
          {availableCategories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <small>Segure Ctrl para selecionar múltiplas categorias</small>
      </FormGroup>

      <FormGroup>
        <label htmlFor="difficulty">Dificuldade:</label>
        <select
          id="difficulty"
          name="difficulty"
          value={config.difficulty}
          onChange={handleChange}
        >
          <option value="">Todas as dificuldades</option>
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>
      </FormGroup>
    </FormSection>
  );
};

const QuestionSelector: React.FC<QuestionSelectorProps> = ({
  availableQuestions,
  selectedQuestions,
  onSelectQuestion,
  onRemoveQuestion,
  numQuestionsNeeded
}) => {
  // Filter out questions that are already selected
  const filteredQuestions = availableQuestions.filter(
    question => !selectedQuestions.some(sq => sq.id === question.id)
  );

  return (
    <QuestionsContainer>
      <div>
        <h3>Questões Disponíveis ({filteredQuestions.length})</h3>
        <QuestionList>
          {filteredQuestions.map(question => (
            <QuestionItem key={question.id}>
              <p>{question.content.substring(0, 100)}...</p>
              <div className="question-meta">
                <span>Dificuldade: {question.difficulty}</span>
                <span>Categorias: {question.categories.join(', ')}</span>
              </div>
              <AddQuestionButton onClick={() => onSelectQuestion(question)}>Adicionar</AddQuestionButton>
            </QuestionItem>
          ))}
        </QuestionList>
      </div>

      <div>
        <h3>Questões Selecionadas ({selectedQuestions.length}/{numQuestionsNeeded})</h3>
        <QuestionList>
          {selectedQuestions.map(question => (
            <QuestionItem key={question.id}>
              <p>{question.content.substring(0, 100)}...</p>
              <div className="question-meta">
                <span>Dificuldade: {question.difficulty}</span>
                <span>Categorias: {question.categories.join(', ')}</span>
              </div>
              <RemoveQuestionButton onClick={() => onRemoveQuestion(question.id)}>Remover</RemoveQuestionButton>
            </QuestionItem>
          ))}
        </QuestionList>
      </div>
    </QuestionsContainer>
  );
};

const ExamGenerator: React.FC<{
  questions: Question[],
  createExam: (exam: Omit<Exam, 'id' | 'createdAt'>) => Promise<Exam>,
  onExamCreated: (exam: Exam) => void
}> = ({ questions, createExam, onExamCreated }) => {
  const { createQRCodeComponent } = QRCodeService;
  const { generateExamBarCode } = BarCodeGenerator;
  
  // Estado para controlar o passo atual do processo
  const [currentStep, setCurrentStep] = useState(1);

  // Configuração do exame
  const [examConfig, setExamConfig] = useState({
    title: '',
    description: '',
    numQuestions: 10,
    questions: [],
    totalPoints: 10,
    qrCode: '',
    barCode: '',
    password: '',
    createdAt: new Date(),
    createdBy: 'current_user_id',
    questionDistribution: {
      categories: [] as string[],
      difficulty: '',
      count: 0,
    },
    useQRCode: false,
    useBarCode: true,
    classIds: [] as string[],
    requirePassword: false,
    startTime: undefined as Date | undefined,
    endTime: undefined as Date | undefined,
    timeLimit: undefined as number | undefined,
  });

  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [generatedExamId, setGeneratedExamId] = useState<string | null>(null);
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);

  // Get all available categories from questions
  const availableCategories = Array.from(
    new Set(questions.flatMap(q => q.categories))
  );

  // Filter questions based on exam config
  const filteredQuestions = questions.filter(question => {
    // Filter by category
    if (examConfig.questionDistribution.categories.length > 0 &&
      !question.categories.some(cat => examConfig.questionDistribution.categories.includes(cat))) {
      return false;
    }

    // Filter by difficulty
    if (examConfig.questionDistribution.difficulty && question.difficulty !== examConfig.questionDistribution.difficulty) {
      return false;
    }

    return true;
  });

  const handleConfigChange = (newConfig: any) => {
    setExamConfig(prev => ({ ...prev, ...newConfig }));
  };

  const handleSelectQuestion = (question: Question) => {
    setSelectedQuestions(prev => [...prev, question]);
  };

  const handleRemoveQuestion = (questionId: string) => {
    setSelectedQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const handleRandomSelection = () => {
    // Clear current selection
    setSelectedQuestions([]);

    // Randomly select questions based on exam config
    const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, examConfig.numQuestions);

    setSelectedQuestions(selected);
  };

  const handlePrepareExam = async () => {
    // Generate QR code and barcode
    const qrCode = await createQRCodeComponent(`exam_${Date.now()}`);
    const barCode = await generateExamBarCode(`exam_${Date.now()}`);

    // Generate random password for exam if not specified
    const password = examConfig.password || Math.random().toString(36).substring(2, 8).toUpperCase();

    // Calculate total points (1 point per question for simplicity)
    const totalPoints = selectedQuestions.length;

    // Prepare the exam object but don't save it yet
    const preparedExam: Exam = {
      id: `temp_${Date.now().toString()}`,
      title: examConfig.title,
      description: examConfig.description,
      questions: selectedQuestions.map(q => q.id),
      classIds: examConfig.classIds,
      totalPoints,
      qrCode,
      barCode,
      password,
      createdBy: 'current_user_id',
      questionDistribution: [],
      useBarCode: examConfig.useBarCode,
      useQRCode: examConfig.useQRCode,
      requirePassword: examConfig.requirePassword,
      startTime: examConfig.startTime,
      endTime: examConfig.endTime,
      timeLimit: examConfig.timeLimit,
      createdAt: new Date(),
      variants: [],
    };

    setCurrentExam(preparedExam);
    setCurrentStep(3);
  };

  const handleUpdateExam = (updatedExam: Exam) => {
    setCurrentExam(updatedExam);
  };

  const handleGenerateExam = async () => {
    try {
      if (!currentExam) return;
  
      // Create exam
      const newExam = await createExam(currentExam);
  
      // Set the generated exam ID for confirmation message
      setGeneratedExamId(newExam.id ?? null);
      setCurrentStep(4);
      
      // Notificar o componente pai
      onExamCreated(newExam);
  
    } catch (error) {
      console.error('Error generating exam:', error);
      // Show error message to user
    }
  };

  const resetForm = () => {
    setGeneratedExamId(null);
    setCurrentExam(null);
    setSelectedQuestions([]);
    setCurrentStep(1);
    setExamConfig({
      title: '',
      description: '',
      numQuestions: 10,
      questions: [],
      totalPoints: 10,
      qrCode: '',
      barCode: '',
      password: '',
      createdAt: new Date(),
      createdBy: 'current_user_id',
      questionDistribution: {
        categories: [],
        difficulty: '',
        count: 0,
      },
      useQRCode: false,
      useBarCode: true,
      classIds: [],
      requirePassword: false,
      startTime: undefined,
      endTime: undefined,
      timeLimit: undefined,
    });
  };

  // Renderiza o conteúdo baseado no passo atual
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Configurações básicas
        return (
          <StepContainer>
            <StepTitle>
              <StepIndicator active>1</StepIndicator>
              <h2>Configurações da Prova</h2>
            </StepTitle>
            
            <StepContent>
              <ExamConfig
                config={{
                  title: examConfig.title,
                  description: examConfig.description,
                  numQuestions: examConfig.numQuestions,
                  categories: examConfig.questionDistribution.categories,
                  difficulty: examConfig.questionDistribution.difficulty
                }}
                availableCategories={availableCategories}
                onChange={handleConfigChange}
              />
              
              <ActionContainer>
                <NextStepButton
                  onClick={() => setCurrentStep(2)}
                  disabled={!examConfig.title}
                >
                  Próximo: Selecionar Questões
                </NextStepButton>
              </ActionContainer>
            </StepContent>
          </StepContainer>
        );
        
      case 2: // Seleção de questões
        return (
          <StepContainer>
            <StepTitle>
              <StepIndicator>1</StepIndicator>
              <h2 onClick={() => setCurrentStep(1)} style={{ cursor: 'pointer' }}>Configurações da Prova</h2>
              <StepIndicator active>2</StepIndicator>
              <h2>Seleção de Questões</h2>
            </StepTitle>
            
            <StepContent>
              <QuestionSelectionActions>
                <RandomSelectButton onClick={handleRandomSelection}>
                  Selecionar {examConfig.numQuestions} Questões Aleatoriamente
                </RandomSelectButton>
                <span>ou selecione manualmente abaixo:</span>
              </QuestionSelectionActions>

              <QuestionSelector
                availableQuestions={filteredQuestions}
                selectedQuestions={selectedQuestions}
                onSelectQuestion={handleSelectQuestion}
                onRemoveQuestion={handleRemoveQuestion}
                numQuestionsNeeded={examConfig.numQuestions}
              />

              <ActionContainer>
                <CancelButton onClick={() => setCurrentStep(1)}>
                  Voltar
                </CancelButton>
                <NextStepButton
                  onClick={handlePrepareExam}
                  disabled={selectedQuestions.length === 0}
                >
                  Próximo: Configurações de Segurança
                </NextStepButton>
              </ActionContainer>
            </StepContent>
          </StepContainer>
        );

      case 3: // Configurações de segurança
        return currentExam ? (
          <StepContainer>
            <StepTitle>
              <StepIndicator>1</StepIndicator>
              <h2 onClick={() => setCurrentStep(1)} style={{ cursor: 'pointer' }}>Configurações da Prova</h2>
              <StepIndicator>2</StepIndicator>
              <h2 onClick={() => setCurrentStep(2)} style={{ cursor: 'pointer' }}>Seleção de Questões</h2>
              <StepIndicator active>3</StepIndicator>
              <h2>Configurações de Segurança</h2>
            </StepTitle>
            
            <StepContent>
              <ExamSecurityManager
                exam={currentExam}
                onUpdate={handleUpdateExam}
              />
              
              <ActionContainer>
                <CancelButton onClick={() => setCurrentStep(2)}>
                  Voltar
                </CancelButton>
                <GenerateExamButton onClick={handleGenerateExam}>
                  Finalizar e Gerar Prova
                </GenerateExamButton>
              </ActionContainer>
            </StepContent>
          </StepContainer>
        ) : null;

      case 4: // Sucesso
        return (
          <SuccessMessage>
            <h2>Prova gerada com sucesso!</h2>
            <p>ID da Prova: {generatedExamId}</p>
            <NextStepButton onClick={resetForm}>
              Criar Nova Prova
            </NextStepButton>
          </SuccessMessage>
        );

      default:
        return null;
    }
  };

  return (
    <MainContainer>
      {renderStepContent()}
    </MainContainer>
  );
};

export default ExamGenerator;