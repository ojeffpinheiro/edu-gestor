import React, { useState, useMemo } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { FaTimes, FaCheck, FaExclamationTriangle, FaPlus, FaArrowLeft, FaArrowRight, FaSave } from "react-icons/fa";

import { DidacticSequence } from '../../utils/types/DidacticSequence';

import StageForm from './StageForm';

import { SequenceFormStyle } from './style';
import { Input, Label, Select, TextArea } from '../../styles/inputs';
import { Button, CloseButton } from '../../styles/buttons';
import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader } from '../../styles/modals';

// Enum for form sections
enum FormSectionOptions {
  BASIC_INFO = "Informações Básicas",
  SKILLS = "Habilidades",
  OBJECTIVES = "Objetivos",
  BNCC_CODES = "Códigos BNCC",
  STAGES = "Etapas"
}

// Validation schema with Zod
const sequenceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  thematicAxis: z.string().min(3, "O eixo temático deve ter pelo menos 3 caracteres"),
  teachingLevel: z.string().min(2, "O nível de ensino é obrigatório"),
  discipline: z.string().min(2, "A disciplina é obrigatória"),
  author: z.string().min(2, "O autor é obrigatório"),
  totalDuration: z.number().min(1, "A carga horária deve ser maior que zero"),
  overview: z.string().min(10, "A visão geral deve ter pelo menos 10 caracteres"),
  numberOfLessons: z.number().int().min(1, "Número de aulas deve ser pelo menos 1"),
  skills: z.array(
    z.string()).min(1, "Adicione pelo menos uma habilidade"),
  bnccCodes: z.array(
    z.object({
      id: z.string().min(1, "O código BNCC é obrigatório"),
      description: z.string().min(1, "A descrição do código é obrigatória")
    })
  ),
  objectives: z.array(z.string()).min(1, "Adicione pelo menos um objetivo"),
  stages: z.array(
    z.object({
      id: z.string(),
      title: z.string().min(3, "O título da etapa é obrigatório"),
      description: z.string(),
      duration: z.number().min(1, "A duração deve ser maior que zero"),
      activities: z.array(z.string())
    })
  ),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

interface SequenceFormData {
  title: string;
  thematicAxis: string;
  teachingLevel: string;
  discipline: string;
  author: string;
  totalDuration: number;
  overview: string;
  numberOfLessons: number;
  skills: string[];
  objectives: string[];
  bnccCodes: { id: string; description: string }[];
  stages: {
    id: string;
    title: string;
    description: string;
    duration: number;
    activities: string[];
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}


interface SequenceFormProps {
  initialData?: DidacticSequence;
  onSubmit: (data: SequenceFormData) => void;
  onCancel: () => void;
}

const {
  AddButton,
  AddItemButton,
  AddItemContainer,
  AddItemInput,
  Chip,
  ChipContainer,
  ChipDeleteButton,
  ErrorMessage,
  FormColumn,
  FormGroup,
  FormProgress,
  FormProgressIndicator,
  FormRow,
  FormSection,
  FormStepButton,
  FormStepDivider,
  FormStepsNav,
  NavigationButtons,
  SectionTitle,
  SubmitButton,
  SuccessMessage,
  ErrorSection
} = SequenceFormStyle;

const SequenceForm: React.FC<SequenceFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [newObjective, setNewObjective] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newBNCCCode, setNewBNCCCode] = useState({ id: '', description: '' });
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
        createdAt: initialData.createdAt ? new Date(initialData.createdAt) : new Date(),
        updatedAt: initialData.updatedAt ? new Date(initialData.updatedAt) : new Date(),
        bnccCodes: initialData.bnccCodes.map(code =>
          typeof code === 'string'
            ? { id: code, description: code }
            : code
        )
      };
    }
    return {
      id: uuidv4(),
      title: '',
      thematicAxis: '',
      teachingLevel: '',
      discipline: '',
      author: '',
      totalDuration: 0,
      overview: '',
      numberOfLessons: 1,
      skills: [],
      bnccCodes: [],
      objectives: [],
      stages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }, [initialData]);

  const methods = useForm<SequenceFormData>({
    resolver: zodResolver(sequenceSchema),
    defaultValues,
    mode: 'onChange'
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields, dirtyFields },
    watch,
    setValue,
    trigger,
    getValues
  } = methods;

  // Setup field arrays for lists
  const {
    fields: skillsFields,
    append: appendSkill,
    remove: removeSkill
  } = useFieldArray({ control, name: 'skills' });

  const { 
    fields: objectivesFields, 
    append: appendObjective, 
    remove: removeObjective 
  } = useFieldArray({ control, name: 'objectives' });

  const {
    fields: bnccCodesFields,
    append: appendBnccCode,
    remove: removeBnccCode
  } = useFieldArray({ control, name: 'bnccCodes' });

  const {
    fields: stagesFields,
    append: appendStage,
    remove: removeStage
  } = useFieldArray({ control, name: 'stages' });

  // Icons for each form section
  const sectionIcons = useMemo(() => ({
    [FormSectionOptions.BASIC_INFO]: "📋",
    [FormSectionOptions.OBJECTIVES]: "🎯",
    [FormSectionOptions.SKILLS]: "🧠",
    [FormSectionOptions.BNCC_CODES]: "📚",
    [FormSectionOptions.STAGES]: "🧩"
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
        return !errors.title && !errors.thematicAxis && !errors.teachingLevel &&
          !errors.discipline && !errors.author && !errors.overview && !errors.numberOfLessons;
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
  const onFormSubmit = handleSubmit(async (data: SequenceFormData) => {
    try {
      setIsSubmitting(true);
      setFeedback({
        errorMessage: '',
        successMessage: '',
        hasChanges: true
      });

      // Calculate total duration from stages
      const totalDuration = data.stages.reduce(
        (total: number, stage: any) => total + stage.duration, 0
      );
      data.totalDuration = totalDuration;

      // Set or update dates
      data.updatedAt = new Date();
      if (!data.createdAt) {
        data.createdAt = new Date();
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
        isValid = await trigger(['title', 'thematicAxis', 'teachingLevel', 'discipline', 'author', 'overview', 'numberOfLessons']);
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

  // Add a new objective
  const handleAddObjective = () => {
    if (newObjective.trim()) {
      appendObjective(newObjective.trim());
      setNewObjective('');
      setFeedback({ ...feedback, hasChanges: true });
    }
  };

  // Add a new skill
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      appendSkill(newSkill.trim());
      setNewSkill('');
      setFeedback({ ...feedback, hasChanges: true });
    }
  };

  // Add a new BNCC code
  const handleAddBNCCCode = () => {
    if (newBNCCCode.id.trim() && newBNCCCode.description.trim()) {
      appendBnccCode(newBNCCCode);
      setNewBNCCCode({ id: '', description: '' });
      setFeedback({ ...feedback, hasChanges: true });
    }
  };

  // Add a new stage
  const handleAddStage = () => {
    appendStage({
      id: uuidv4(),
      title: '',
      description: '',
      duration: 1,
      activities: []
    });
    setFeedback({ ...feedback, hasChanges: true });
  };

  // Key press handler for entering objectives and skills
  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      action();
    }
  };

  // Render the current section
  const renderCurrentSection = () => {
    try {
      switch (currentSection) {
        case FormSectionOptions.BASIC_INFO:
          return (
            <FormSection>
              <SectionTitle>Informações Básicas</SectionTitle>

              <FormGroup>
                <Label htmlFor="title">Título da Sequência</Label>
                <Input
                  id="title"
                  placeholder="Ex: Introdução à Geometria Espacial"
                  {...register("title")}
                />
                {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
              </FormGroup>

              <FormRow>
                <FormColumn>
                  <FormGroup>
                    <Label htmlFor="thematicAxis">Eixo Temático</Label>
                    <Input
                      id="thematicAxis"
                      placeholder="Ex: Geometria"
                      {...register("thematicAxis")}
                    />
                    {errors.thematicAxis && <ErrorMessage>{errors.thematicAxis.message}</ErrorMessage>}
                  </FormGroup>
                </FormColumn>

                <FormColumn>
                  <FormGroup>
                    <Label htmlFor="teachingLevel">Nível de Ensino</Label>
                    <Select id="teachingLevel" {...register("teachingLevel")}>
                      <option value="">Selecione um nível</option>
                      <option value="Educação Infantil">Educação Infantil</option>
                      <option value="Ensino Fundamental I">Ensino Fundamental I</option>
                      <option value="Ensino Fundamental II">Ensino Fundamental II</option>
                      <option value="Ensino Médio">Ensino Médio</option>
                      <option value="Ensino Superior">Ensino Superior</option>
                    </Select>
                    {errors.teachingLevel && <ErrorMessage>{errors.teachingLevel.message}</ErrorMessage>}
                  </FormGroup>
                </FormColumn>
              </FormRow>

              <FormRow>
                <FormColumn>
                  <FormGroup>
                    <Label htmlFor="discipline">Disciplina</Label>
                    <Select id="discipline" {...register("discipline")}>
                      <option value="">Selecione uma disciplina</option>
                      <option value="Português">Português</option>
                      <option value="Matemática">Matemática</option>
                      <option value="História">História</option>
                      <option value="Geografia">Geografia</option>
                      <option value="Ciências">Ciências</option>
                      <option value="Artes">Artes</option>
                      <option value="Educação Física">Educação Física</option>
                      <option value="Inglês">Inglês</option>
                      <option value="Outro">Outro</option>
                    </Select>
                    {errors.discipline && <ErrorMessage>{errors.discipline.message}</ErrorMessage>}
                  </FormGroup>
                </FormColumn>

                <FormColumn>
                  <FormGroup>
                    <Label htmlFor="numberOfLessons">Número de Aulas</Label>
                    <Input
                      id="numberOfLessons"
                      type="number"
                      min="1"
                      {...register("numberOfLessons", { valueAsNumber: true })}
                    />
                    {errors.numberOfLessons && <ErrorMessage>{errors.numberOfLessons.message}</ErrorMessage>}
                  </FormGroup>
                </FormColumn>
              </FormRow>

              <FormGroup>
                <Label htmlFor="overview">Visão Geral</Label>
                <TextArea
                  id="overview"
                  placeholder="Descreva brevemente o que será abordado nesta sequência didática..."
                  {...register("overview")}
                  rows={4}
                />
                {errors.overview && <ErrorMessage>{errors.overview.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="author">Autor</Label>
                <Input
                  id="author"
                  placeholder="Seu nome"
                  {...register("author")}
                />
                {errors.author && <ErrorMessage>{errors.author.message}</ErrorMessage>}
              </FormGroup>
            </FormSection>
          );

        case FormSectionOptions.SKILLS:
          return (
            <FormSection>
              <SectionTitle>Habilidades</SectionTitle>

              <FormGroup>
                <Label>Habilidades Desenvolvidas</Label>
                <ChipContainer>
                  {skillsFields.map((field, index) => (
                    <Chip key={field.id}>
                      {watch(`skills.${index}`)}
                      <ChipDeleteButton
                        type="button"
                        onClick={() => removeSkill(index)}
                        aria-label="Remover habilidade"
                      >
                        <FaTimes />
                      </ChipDeleteButton>
                    </Chip>
                  ))}
                </ChipContainer>
                {errors.skills && <ErrorMessage>{errors.skills.message}</ErrorMessage>}

                <AddItemContainer>
                  <AddItemInput
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Adicionar habilidade..."
                    onKeyPress={(e) => handleKeyPress(e, handleAddSkill)}
                  />
                  <AddItemButton
                    type="button"
                    onClick={handleAddSkill}
                    disabled={!newSkill.trim()}
                  >
                    <FaPlus /> Adicionar
                  </AddItemButton>
                </AddItemContainer>
              </FormGroup>
            </FormSection>
          );

        case FormSectionOptions.OBJECTIVES:
          return (
            <FormSection>
              <SectionTitle>Objetivos</SectionTitle>

              <FormGroup>
                <Label>Objetivos de Aprendizagem</Label>
                <ChipContainer>
                  {objectivesFields.map((field, index) => (
                    <Chip key={field.id}>
                      {watch(`objectives.${index}`)}
                      <ChipDeleteButton
                        type="button"
                        onClick={() => removeObjective(index)}
                        aria-label="Remover objetivo"
                      >
                        <FaTimes />
                      </ChipDeleteButton>
                    </Chip>
                  ))}
                </ChipContainer>
                {errors.objectives && <ErrorMessage>{errors.objectives.message}</ErrorMessage>}

                <AddItemContainer>
                  <AddItemInput
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value)}
                    placeholder="Adicionar objetivo..."
                    onKeyPress={(e) => handleKeyPress(e, handleAddObjective)}
                  />
                  <AddItemButton
                    type="button"
                    onClick={handleAddObjective}
                    disabled={!newObjective.trim()}
                  >
                    <FaPlus /> Adicionar
                  </AddItemButton>
                </AddItemContainer>
              </FormGroup>
            </FormSection>
          );

        case FormSectionOptions.BNCC_CODES:
          return (
            <FormSection>
              <SectionTitle>Códigos BNCC</SectionTitle>

              <FormGroup>
                <Label>Códigos da Base Nacional Comum Curricular</Label>
                <ChipContainer>
                  {bnccCodesFields.map((field, index) => (
                    <Chip key={field.id}>
                      {watch(`bnccCodes.${index}.id`)}: {watch(`bnccCodes.${index}.description`)}
                      <ChipDeleteButton
                        type="button"
                        onClick={() => removeBnccCode(index)}
                        aria-label="Remover código BNCC"
                      >
                        <FaTimes />
                      </ChipDeleteButton>
                    </Chip>
                  ))}
                </ChipContainer>
                {errors.bnccCodes && <ErrorMessage>{errors.bnccCodes.message}</ErrorMessage>}

                <FormRow>
                  <FormColumn>
                    <FormGroup>
                      <Label htmlFor="bnccId">Código BNCC</Label>
                      <Input
                        id="bnccId"
                        value={newBNCCCode.id}
                        onChange={(e) => setNewBNCCCode({ ...newBNCCCode, id: e.target.value })}
                        placeholder="Ex: EF06MA01"
                      />
                    </FormGroup>
                  </FormColumn>

                  <FormColumn>
                    <FormGroup>
                      <Label htmlFor="bnccDescription">Descrição</Label>
                      <Input
                        id="bnccDescription"
                        value={newBNCCCode.description}
                        onChange={(e) => setNewBNCCCode({ ...newBNCCCode, description: e.target.value })}
                        placeholder="Descrição da habilidade BNCC"
                      />
                    </FormGroup>
                  </FormColumn>
                </FormRow>

                <AddItemButton
                  type="button"
                  onClick={handleAddBNCCCode}
                  disabled={!newBNCCCode.id.trim() || !newBNCCCode.description.trim()}
                >
                  <FaPlus /> Adicionar Código BNCC
                </AddItemButton>
              </FormGroup>
            </FormSection>
          );

        case FormSectionOptions.STAGES:
          return (
            <FormSection>
              <SectionTitle>Etapas da Sequência</SectionTitle>

              {stagesFields.length === 0 ? (
                <div className="empty-state">
                  <p>Nenhuma etapa adicionada. Adicione etapas para sua sequência didática.</p>
                </div>
              ) : (
                stagesFields.map((field, index) => (
                  <StageForm
                    key={field.id}
                    stageIndex={index}
                    control={control}
                    register={register}
                    errors={errors}
                    onRemove={() => removeStage(index)}
                  />
                ))
              )}

              <AddButton type="button" onClick={handleAddStage}>
                <FaPlus /> Adicionar Nova Etapa
              </AddButton>

              {errors.stages &&
                <ErrorMessage>
                  É necessário adicionar pelo menos uma etapa com informações válidas
                </ErrorMessage>
              }
            </FormSection>
          );

        default:
          return null;
      }
    } catch (error) {
      console.error("Erro ao renderizar seção:", error);
      return (
        <ErrorSection role="alert">
          <h4><FaExclamationTriangle /> Erro</h4>
          <p>Ocorreu um erro ao carregar esta seção. Por favor, tente novamente ou contate o suporte.</p>
        </ErrorSection>
      );
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

  // Check if form has validation errors
  const hasErrors = useMemo(() => {
    return Object.keys(errors).length > 0;
  }, [errors]);

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <h3>{initialData ? 'Editar Sequência' : 'Nova Sequência'}</h3>
          <CloseButton onClick={handleCloseModal} aria-label="Fechar modal">
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <FormProvider {...methods}>
          <form onSubmit={onFormSubmit}>
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