import React, { useEffect, useState } from "react";
import { Content, Question, Topic } from "../../../utils/types/Question";

import BasicDefinitionsStep from "../../Question/steps/BasicInfo";
import StatementStep from "../../Question/steps/StatementStep";
import AlternativesStep from "../../Question/steps/AlternativesStep";
import ResourcesStep from "../../Question/steps/ResourcesStep";

import { Flex } from "../../../styles/layoutUtils";
import Modal from "../Modal";

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question?: Question;
  topics: Topic[];
  contents: Content[];
  onSave: (question: Question) => void;
}

// Componente QuestionModal refatorado
const QuestionModal: React.FC<QuestionModalProps> = ({
  isOpen,
  onClose,
  question,
  topics,
  contents,
  onSave
}) => {
  const isEditMode = !!question?.id;

  // Estado para controlar os passos
  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps = ['Básico', 'Enunciado', 'Alternativas', 'Recursos'];
  const [formData, setFormData] = useState<Question>({
    contentId: '',
    statement: '',
    questionType: 'multiple_choice',
    difficultyLevel: 'medium',
    alternatives: [],
    explanation: '',
    status: 'active',
    imageUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: question?.id || Date.now().toString()
  });

  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [filteredContents, setFilteredContents] = useState<Content[]>([]);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Inicializar formulário com dados da questão se estiver em modo de edição
  useEffect(() => {
    if (question) {
      setFormData(question);

      // Localizar o tópico baseado no conteúdo
      if (question.contentId) {
        const content = contents.find(c => c.id === question.contentId);
        if (content) {
          setSelectedTopicId(content.topicId);
          setFilteredContents(contents.filter(c => c.topicId === content.topicId));
        }
      }
    } else {
      // Reset para valores padrão em modo de criação
      setFormData({
        contentId: '',
        statement: '',
        questionType: 'multiple_choice',
        difficultyLevel: 'medium',
        alternatives: [],
        explanation: '',
        status: 'active',
        imageUrl: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: Date.now().toString()
      });
      setSelectedTopicId('');
      setFilteredContents([]);
    }

    // Resetar passos, erros de validação e estado de submissão
    setCurrentStep(0);
    setValidationErrors({});
    setIsSubmitting(false);
  }, [question, contents, isOpen]);

  // Filtrar conteúdos com base no tópico selecionado
  useEffect(() => {
    if (selectedTopicId) {
      setFilteredContents(contents.filter(content => content.topicId === selectedTopicId));
    } else {
      setFilteredContents([]);
    }
  }, [selectedTopicId, contents]);

  // Handler para atualizar formData parcialmente
  const updateFormData = (updates: Partial<Question>) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Validação específica para cada passo
  const validateStep = (step: number): boolean => {
    const errors: { [key: string]: string } = {};

    switch (step) {
      case 0: // Validação do passo 1: Definições Básicas
        if (!selectedTopicId) {
          errors.topicId = 'Selecione um tópico';
        }

        if (!formData.contentId) {
          errors.contentId = 'Selecione um conteúdo';
        }
        break;

      case 1: // Validação do passo 2: Enunciado
        if (!formData.statement.trim()) {
          errors.statement = 'O enunciado da questão é obrigatório';
        }
        break;

      case 2: // Validação do passo 3: Alternativas
        if (formData.questionType !== 'essay') {
          const hasEmptyAlternative = formData.alternatives.some(alt => !alt.text.trim());
          const hasCorrectAlternative = formData.alternatives.some(alt => alt.isCorrect);

          if (hasEmptyAlternative) {
            errors.alternatives = 'Todas as alternativas devem ter texto';
          }

          if (!hasCorrectAlternative) {
            errors.correctAlternative = 'Selecione uma alternativa correta';
          }

          if (formData.alternatives.length < 2 && formData.questionType === 'multiple_choice') {
            errors.alternativesCount = 'Adicione pelo menos duas alternativas';
          }
        }
        break;

      // O passo 4 (Recursos) não tem validações obrigatórias
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validação completa do formulário
  const validateForm = (): boolean => {
    let isValid = true;

    // Validar todos os passos
    for (let i = 0; i < steps.length; i++) {
      if (!validateStep(i)) {
        isValid = false;
        setCurrentStep(i); // Mover para o primeiro passo com erro
        break;
      }
    }

    return isValid;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Atualizar a data de modificação
      const updatedQuestion = {
        ...formData,
        updatedAt: new Date().toISOString()
      };

      await onSave(updatedQuestion);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar questão:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Renderizar o componente de passo atual
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicDefinitionsStep
            formData={formData}
            updateFormData={updateFormData}
            validationErrors={validationErrors}
            topics={topics}
            contents={contents}
            selectedTopicId={selectedTopicId}
            setSelectedTopicId={setSelectedTopicId}
            filteredContents={filteredContents}
            setValidationErrors={setValidationErrors}
          />
        );
      case 1:
        return (
          <StatementStep
            formData={formData}
            updateFormData={updateFormData}
            validationErrors={validationErrors}
            topics={topics}
            selectedTopicId={selectedTopicId}
            setSelectedTopicId={setSelectedTopicId}
            filteredContents={filteredContents}
            setValidationErrors={setValidationErrors}
          />
        );
      case 2:
        return (
          <AlternativesStep
            formData={formData}
            updateFormData={updateFormData}
            validationErrors={validationErrors}
            topics={topics}
            selectedTopicId={selectedTopicId}
            setSelectedTopicId={setSelectedTopicId}
            filteredContents={filteredContents}
            setValidationErrors={setValidationErrors}
          />
        );
      case 3:
        return (
          <ResourcesStep
            formData={formData}
            updateFormData={updateFormData}
            validationErrors={validationErrors}
            topics={topics}
            selectedTopicId={selectedTopicId}
            setSelectedTopicId={setSelectedTopicId}
            filteredContents={filteredContents}
            setValidationErrors={setValidationErrors}
          />
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen
      title={isEditMode ? 'Editar Questão' : 'Nova Questão'}
      size='md'
      showFooter
      onSubmit={() => handleSubmit(new Event('submit') as unknown as React.FormEvent)}
      submitText={isSubmitting ? 'Salvando...' : isEditMode ? 'Atualizar' : 'Salvar'}
      onClose={onClose} >
      {/* Navegação entre passos */}
      <Flex justify="center" style={{ marginBottom: '2rem' }}>
        {steps.map((step, index) => (
          <div
            key={step}
            className={`step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''
              }`}
            onClick={() => {
              // Permitir navegar diretamente para passos anteriores
              if (index < currentStep) {
                setCurrentStep(index);
              }
            }}
            style={{
              cursor: index < currentStep ? 'pointer' : 'default',
              padding: '0.5rem 1rem',
              margin: '0 0.5rem',
              borderRadius: '4px',
              backgroundColor: index === currentStep ? '#2196f3' : index < currentStep ? '#e3f2fd' : '#f5f5f5',
              color: index === currentStep ? 'white' : index < currentStep ? '#2196f3' : '#757575',
              fontWeight: index === currentStep ? 'bold' : 'normal',
            }}
          >
            {step}
          </div>
        ))}
      </Flex>

      {/* Componente do passo atual */}
      {renderCurrentStep()}
    </Modal>
  );
};

export default QuestionModal;