import React, { useMemo } from "react";
import { FaTimes, FaCheck, FaExclamationTriangle } from "react-icons/fa";

import { Evaluation, FormSectionOptions } from "../../../utils/types";

import useEvaluationForm from "../../../hooks/useEvaluationForm";

import { Button, CloseButton } from '../../../styles/buttons';

import BasicInfoSection from "../../BasicInfoSection";
import ResourcesSection from "../../ResourcesSection";
import PartsSection from "../../PartsSection";
import EvaluationCriteriaSection from "../../EvaluationCriteriaSection";
import EvaluationMethodSection from "../../EvaluationMethodSection";
import CalculationSection from "../../CalculationSection";

import {
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ErrorMessage,
    SuccessMessage,
    FormStepsNav,
    FormStepButton,
    FormStepDivider,
    FormProgress,
    FormProgressIndicator,
} from './styles';

/** * Interface para as propriedades do componente EvaluationForm */
interface EvaluationFormProps {
    evaluation: Evaluation | null;
    onSave: (evaluation: Evaluation | null) => Promise<void>;
    onClose: () => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ evaluation, onSave, onClose }) => {
    const {
        resources,
        feedback,
        isSubmitting,
        currentSection,
        setCurrentSection,
        handleInputChange,
        handleRemoveResource,
        handleAddResource,
        goToPreviousSection,
        goToNextSection,
        handleSubmit,
        isFormValid,
        getSectionValidationState,
        getFormProgress
    } = useEvaluationForm(evaluation, onSave);

    // Ícones para cada seção do formulário
    const sectionIcons = useMemo(() => ({
        [FormSectionOptions.BASIC_INFO]: "📋",
        [FormSectionOptions.RESOURCES]: "📚",
        [FormSectionOptions.PARTS]: "🧩",
        [FormSectionOptions.EVALUATION_CRITERIA]: "📊",
        [FormSectionOptions.EVALUATION_METHOD]: "⚖️",
        [FormSectionOptions.CALCULATION]: "🔢"
    }), []);

    // Descrição para cada seção
    const sectionDescriptions = useMemo(() => ({
        [FormSectionOptions.BASIC_INFO]: "Informações básicas da avaliação",
        [FormSectionOptions.RESOURCES]: "Recursos necessários para a avaliação",
        [FormSectionOptions.PARTS]: "Partes ou seções da avaliação",
        [FormSectionOptions.EVALUATION_CRITERIA]: "Critérios utilizados na avaliação",
        [FormSectionOptions.EVALUATION_METHOD]: "Método de avaliação a ser aplicado",
        [FormSectionOptions.CALCULATION]: "Cálculo da nota final"
    }), []);

    // Função para renderizar a seção atual
    const renderCurrentSection = () => {
        try {
            switch (currentSection) {
                case FormSectionOptions.BASIC_INFO:
                    return <BasicInfoSection evaluationData={evaluation} handleInputChange={handleInputChange} />
                case FormSectionOptions.RESOURCES:
                    return <ResourcesSection addResource={handleAddResource} removeResource={handleRemoveResource} resources={resources} />
                case FormSectionOptions.PARTS:
                    return <PartsSection evaluation={evaluation} />
                case FormSectionOptions.EVALUATION_CRITERIA:
                    return <EvaluationCriteriaSection evaluation={evaluation} />
                case FormSectionOptions.EVALUATION_METHOD:
                    return <EvaluationMethodSection evaluation={evaluation} />
                case FormSectionOptions.CALCULATION:
                    return <CalculationSection evaluationData={evaluation} />
                default:
                    return <BasicInfoSection evaluationData={evaluation} handleInputChange={handleInputChange} />
            }
        } catch (error) {
            console.error("Erro ao renderizar seção:", error);
            return (
                <ErrorMessage role="alert">
                    <FaExclamationTriangle />
                    Ocorreu um erro ao carregar esta seção. Por favor, tente novamente ou contate o suporte.
                </ErrorMessage>
            );
        }
    }

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault(); // Impedir o comportamento padrão do formulário
        
        if (!isFormValid()) {
            // Mostrar mensagem de erro para formulário inválido
            return;
        }
        
        try {
            await handleSubmit(e);
        } catch (error) {
            console.error("Erro ao salvar avaliação:", error);
        }
    };

    // Calcula o progresso do formulário para a barra de progresso
    const progressPercentage = useMemo(() => {
        return getFormProgress();
    }, [getFormProgress]);

    // Verifica se há mudanças não salvas para confirmar antes de fechar
    const handleCloseModal = () => {
        // Se houver mudanças não salvas, confirmar antes de fechar
        if (feedback.hasChanges) {
            if (window.confirm("Existem mudanças não salvas. Deseja realmente sair?")) {
                onClose();
            }
        } else {
            onClose();
        }
    };

    return (
        <ModalContainer>
            <ModalContent>
                <ModalHeader>
                    <h3>{evaluation ? 'Editar Avaliação' : 'Nova Avaliação'}</h3>
                    <CloseButton onClick={handleCloseModal} aria-label="Fechar modal">
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>

                <FormProgress aria-label="Progresso do formulário">
                    <FormProgressIndicator progress={progressPercentage} />
                </FormProgress>

                <form onSubmit={handleSubmitForm}>
                    <ModalBody>
                        {/* Mensagens de Feedback */}
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

                        {/* Navegação de seções aprimorada */}
                        <FormStepsNav>
                            {Object.values(FormSectionOptions).map((section, index) => (
                                <React.Fragment key={section}>
                                    {index > 0 && <FormStepDivider />}
                                    <FormStepButton 
                                        type="button"
                                        $isActive={currentSection === section}
                                        $isValid={getSectionValidationState(section)}
                                        onClick={() => setCurrentSection(section)}
                                        aria-label={`Ir para seção ${section}`}
                                        title={sectionDescriptions[section]}
                                    >
                                        <span className="step-icon">{sectionIcons[section]}</span>
                                        <span className="step-text">{section}</span>
                                        {getSectionValidationState(section) && (
                                            <span className="status-indicator">✓</span>
                                        )}
                                    </FormStepButton>
                                </React.Fragment>
                            ))}
                        </FormStepsNav>

                        {/* Conteúdo da seção atual */}
                        { renderCurrentSection() }
                    </ModalBody>
                    
                    <ModalFooter>
                        {/* Botões de navegação e envio */}
                        <div className="navigation-buttons">
                            {currentSection !== FormSectionOptions.BASIC_INFO && (
                                <Button
                                    type="button"
                                    onClick={goToPreviousSection}
                                    className="secondary"
                                >
                                    Anterior
                                </Button>
                            )}

                            {currentSection !== FormSectionOptions.CALCULATION ? (
                                <Button
                                    type="button"
                                    onClick={goToNextSection}
                                    className="primary"
                                    disabled={!getSectionValidationState(currentSection)}
                                    title={!getSectionValidationState(currentSection) ? "Preencha todos os campos obrigatórios antes de continuar" : ""}
                                >
                                    Próximo
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="primary save-button"
                                    disabled={isSubmitting || !isFormValid()}
                                >
                                    {isSubmitting ? 'Salvando...' : 'Salvar Avaliação'}
                                </Button>
                            )}
                        </div>
                    </ModalFooter>
                </form>
            </ModalContent>
        </ModalContainer>
    );
};

export default EvaluationForm;