import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { FaTimes, FaCheck, FaExclamationTriangle, FaArrowLeft, FaArrowRight, FaSave } from "react-icons/fa";
import type { Resolver } from 'react-hook-form';

import { SequenceFormData, SequenceStatus } from '../../utils/types/DidacticSequence';

// Import separate section components
import BasicInfoSection from './BasicInfoSection';
import SkillsSection from './SkillsSection';
import ObjectivesSection from './ObjectivesSection';
import BNCCCodesSection from './BNCCCodesSection';
import StagesSection from './StagesSection';

import { SequenceFormStyle } from './style';
import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader } from '../../styles/modals';
import { Button, CloseButton } from '../../styles/buttons';

// Enum for form sections
enum FormSectionOptions {
  BASIC_INFO = "Informações Básicas",
  SKILLS = "Habilidades",
  OBJECTIVES = "Objetivos",
  BNCC_CODES = "Códigos BNCC",
  STAGES = "Etapas"
}

const stageSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  duration: z.number(),
  activities: z.array(z.string()),
  status: z.enum(["draft", "active", "completed"]),
  type: z.string(),
  objectives: z.array(z.string()),
  skills: z.array(z.string()),
  evaluationCriteria: z.array(z.string()).optional(),
  resources: z.array(z.string()).optional(),
  methodologies: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
  comments: z.array(z.string()).optional(),
  attachments: z.array(z.string()).optional(),
  estimatedTime: z.number().optional(),
  difficulty: z.string().optional()
});

const sequenceSchema = z.object({
  id: z.string(),
  title: z.string(),
  thematicAxis: z.string(),
  sequence: z.string(),
  stages: z.array(stageSchema),
  status: z.enum(["draft", "active", "completed"]),
  objectives: z.array(z.string()),
  skills: z.array(z.string()),
  bnccCodes: z.array(z.string()).optional(), // Adicione se necessário
  // e os outros 13 campos mencionados no erro
  createdAt: z.string(),
  updatedAt: z.string(),
  // Adicione os demais campos aqui
});

interface SequenceFormProps {
  initialData?: any; // Using any here as we don't have the exact DidacticSequence type
  onSubmit: (data: SequenceFormData) => void;
  onCancel: () => void;
}

const {
  ErrorMessage,
  FormProgress,
  FormProgressIndicator,
  FormStepButton,
  FormStepDivider,
  FormStepsNav,
  NavigationButtons,
  SubmitButton,
  SuccessMessage
} = SequenceFormStyle;

const SequenceForm: React.FC<SequenceFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [currentSection, setCurrentSection] = useState<FormSectionOptions>(FormSectionOptions.BASIC_INFO);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({
    errorMessage: '',
    successMessage: '',
    hasChanges: false
  });

  // Setup form with React Hook Form and Zod
  const defaultValues = useMemo(() => {
    if (initialData) {
      return {
        ...initialData,
        // Convert dates to string format if needed
        createdAt: initialData.createdAt || new Date().toISOString(),
        updatedAt: initialData.updatedAt || new Date().toISOString(),
        // Ensure stages are in the correct format
        stages: initialData.stages || [],
      };
    }
    return {
      id: uuidv4(),
      title: '',
      thematicAxis: '',
      sequence: '',
      educationLevel: '',
      discipline: '',
      author: '',
      workload: 0,
      overview: '',
      lessonsCount: 1,
      skills: [],
      bnccCodes: [],
      objectives: [],
      stages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft' as SequenceStatus
    };
  }, [initialData]);

  const methods = useForm<SequenceFormData>({
    resolver: zodResolver(sequenceSchema) as unknown as Resolver<SequenceFormData>,
    defaultValues,
    mode: 'onChange'
  });

  const {
    formState: { errors, isValid },
    handleSubmit,
    trigger
  } = methods;

  const modalRef = useRef<HTMLDivElement>(null);

  // Icons for each form section
  const sectionIcons = useMemo(() => ({
    [FormSectionOptions.BASIC_INFO]: "FaFileAlt",
    [FormSectionOptions.OBJECTIVES]: "FaBullseye",
    [FormSectionOptions.SKILLS]: "FaBrain",
    [FormSectionOptions.BNCC_CODES]: "FaCubes",
    [FormSectionOptions.STAGES]: "FaPuzzlePiece"
  }), []);

  // Descriptions for each section
  const sectionDescriptions = useMemo(() => ({
    [FormSectionOptions.BASIC_INFO]: "Informações básicas da sequência",
    [FormSectionOptions.OBJECTIVES]: "Objetivos de aprendizagem",
    [FormSectionOptions.SKILLS]: "Habilidades desenvolvidas",
    [FormSectionOptions.BNCC_CODES]: "Códigos da Base Nacional Comum Curricular",
    [FormSectionOptions.STAGES]: "Etapas da sequência didática"
  }), []);

  // Check section validation status
  const isSectionValid = (section: FormSectionOptions): boolean => {
    switch (section) {
      case FormSectionOptions.BASIC_INFO:
        return !errors.title && !errors.thematicAxis && !errors.educationLevel &&
          !errors.discipline && !errors.author && !errors.overview && !errors.lessonsCount;
      case FormSectionOptions.SKILLS:
        return !errors.skills;
      case FormSectionOptions.OBJECTIVES:
        return !errors.objectives;
      case FormSectionOptions.BNCC_CODES:
        return !errors.bnccCodes;
      case FormSectionOptions.STAGES:
        return !errors.stages;
      default:
        return true;
    }
  };

  // Handle form submission
  const onFormSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      setFeedback({
        errorMessage: '',
        successMessage: '',
        hasChanges: true
      });

      // Calculate workload from stages
      const totalWorkload = data.stages.reduce(
        (total: number, stage: any) => total + stage.duration, 0
      );
      data.workload = totalWorkload;

      // Set or update dates
      data.updatedAt = new Date().toISOString();
      if (!data.createdAt) {
        data.createdAt = new Date().toISOString();
      }

      await onSubmit(data);

      setFeedback({
        errorMessage: '',
        successMessage: 'Sequência didática salva com sucesso!',
        hasChanges: false
      });
    } catch (error) {
      console.error('Erro ao salvar sequência:', error);
      setFeedback({
        errorMessage: 'Ocorreu um erro ao salvar a sequência. Por favor, tente novamente.',
        successMessage: '',
        hasChanges: true
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  // Navigate to next section
  const handleNextSection = async () => {
    // Validate current section fields before proceeding
    let isValid = false;

    switch (currentSection) {
      case FormSectionOptions.BASIC_INFO:
        isValid = await trigger(['title', 'thematicAxis', 'educationLevel', 'discipline', 'author', 'overview', 'lessonsCount']);
        break;
      case FormSectionOptions.SKILLS:
        isValid = await trigger('skills');
        break;
      case FormSectionOptions.OBJECTIVES:
        isValid = await trigger('objectives');
        break;
      case FormSectionOptions.BNCC_CODES:
        isValid = await trigger('bnccCodes');
        break;
      default:
        isValid = true;
    }

    if (isValid) {
      const sections = Object.values(FormSectionOptions);
      const currentIndex = sections.indexOf(currentSection);

      if (currentIndex < sections.length - 1) {
        setCurrentSection(sections[currentIndex + 1]);
      }
    }
  };

  // Navigate to previous section
  const handlePreviousSection = () => {
    const sections = Object.values(FormSectionOptions);
    const currentIndex = sections.indexOf(currentSection);

    if (currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1]);
    }
  };

  // Set feedback when form changes
  const handleFormChange = () => {
    setFeedback(prev => ({ ...prev, hasChanges: true }));
  };

  // Update the renderCurrentSection function to pass required props to sections
  const renderCurrentSection = () => {
    switch (currentSection) {
      case FormSectionOptions.BASIC_INFO:
        return <BasicInfoSection />;
      case FormSectionOptions.SKILLS:
        return <SkillsSection />;
      case FormSectionOptions.OBJECTIVES:
        return <ObjectivesSection
          control={methods.control}
          register={methods.register}
          errors={errors}
        />;
      case FormSectionOptions.BNCC_CODES:
        return <BNCCCodesSection
          control={methods.control}
          register={methods.register}
          errors={errors}
        />;
      case FormSectionOptions.STAGES:
        return <StagesSection />;
      default:
        return null;
    }
  };

  // Check if there are unsaved changes to confirm before closing
  const handleCloseModal = () => {
    if (feedback.hasChanges) {
      if (window.confirm("Existem mudanças não salvas. Deseja realmente sair?")) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  // Calculate form progress
  const calculateProgress = () => {
    const sections = Object.values(FormSectionOptions);
    const currentIndex = sections.indexOf(currentSection);
    return Math.round(((currentIndex + 1) / sections.length) * 100);
  };

   /**
      * Fecha o modal ao clicar fora dele
    */
    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          onCancel();
        }
      };
      document.addEventListener("mousedown", handleOutsideClick);
      return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [onCancel]);
  

  // Check if form has validation errors
  const hasErrors = useMemo(() => {
    return Object.keys(errors).length > 0;
  }, [errors]);

  return (
    <ModalContainer role='dialog' aria-modal='true' >
      <ModalContent ref={modalRef} >
        <ModalHeader>
          <h3>{initialData ? 'Editar Sequência' : 'Nova Sequência'}</h3>
          <CloseButton onClick={handleCloseModal} aria-label="Fechar modal">
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <FormProvider {...methods}>
          <form onSubmit={onFormSubmit} onChange={handleFormChange}>
            <ModalBody>
              {/* Feedback Messages */}
              {feedback.errorMessage && (
                <ErrorMessage role="alert">
                  <FaExclamationTriangle />
                  {feedback.errorMessage}
                </ErrorMessage>
              )}
              {feedback.successMessage && (
                <SuccessMessage role="status">
                  <FaCheck />
                  {feedback.successMessage}
                </SuccessMessage>
              )}

              {/* Progress bar */}
              <FormProgress>
                <FormProgressIndicator progress={calculateProgress()} />
              </FormProgress>

              {/* Enhanced section navigation */}
              <FormStepsNav>
                {Object.values(FormSectionOptions).map((section, index) => (
                  <React.Fragment key={section}>
                    {index > 0 && <FormStepDivider />}
                    <FormStepButton
                      type="button"
                      $isActive={currentSection === section}
                      $isValid={isSectionValid(section)}
                      onClick={() => setCurrentSection(section)}
                      title={sectionDescriptions[section]}
                    >
                      <span className="step-icon">{sectionIcons[section]}</span>
                      <span className="step-text">{section}</span>
                      {isSectionValid(section) && (
                        <span className="status-indicator">
                          <FaCheck size={8} />
                        </span>
                      )}
                    </FormStepButton>
                  </React.Fragment>
                ))}
              </FormStepsNav>

              {/* Current section content */}
              {renderCurrentSection()}
            </ModalBody>

            <ModalFooter>
              {/* Navigation and submission buttons */}
              <NavigationButtons>
                {currentSection !== FormSectionOptions.BASIC_INFO && (
                  <Button
                    type="button"
                    className="secondary"
                    onClick={handlePreviousSection}
                  >
                    <FaArrowLeft /> Anterior
                  </Button>
                )}

                {currentSection !== FormSectionOptions.STAGES ? (
                  <Button
                    type="button"
                    className="primary"
                    onClick={handleNextSection}
                  >
                    Próximo <FaArrowRight />
                  </Button>
                ) : (
                  <SubmitButton
                    type="submit"
                    disabled={isSubmitting || hasErrors}
                  >
                    {isSubmitting ? 'Salvando...' : (
                      <>
                        <FaSave /> {initialData ? 'Atualizar Sequência' : 'Criar Sequência'}
                      </>
                    )}
                  </SubmitButton>
                )}
              </NavigationButtons>
            </ModalFooter>
          </form>
        </FormProvider>
      </ModalContent>
    </ModalContainer>
  );
};

export default SequenceForm;