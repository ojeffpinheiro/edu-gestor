import React, { useMemo, useState } from "react";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";

import useEvaluationForm from '../../../hooks/assessment/useEvaluationForm';

import { Evaluation } from "../../../utils/types/AssessmentEvaluation";
import { FormSectionOptions } from "../../../utils/types/FormSection";

import { Button } from '../../../styles/buttons';
import { ModalBody, ModalFooter } from "../../../styles/modals";

import BasicInfoSection from "../../Evaluation/StepForm/BasicInfoSection";
import ResourcesSection from "../../Evaluation/StepForm/ResourcesSection";
import PartsSection from "../../Evaluation/StepForm/PartsSection";
import EvaluationCriteriaSection from "../../Evaluation/StepForm/EvaluationCriteriaSection";
import EvaluationMethodSection from "../../Evaluation/StepForm/EvaluationMethodSection";
import CalculationSection from "../../Evaluation/StepForm/CalculationSection";

import Modal from "../Modal";
import {
    FormStepsNav,
    FormStepButton,
    FormStepDivider,
    FormProgress,
    FormProgressIndicator,
} from './styles';
import { ErrorMessage, SuccessMessage } from "../../../styles/feedback";

interface EvaluationFormProps {
    evaluation: Evaluation | null;
    onSave: (evaluation: Evaluation) => Promise<void>;
    onClose: () => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ evaluation, onSave, onClose }) => {
    const {
        evaluation: evaluationData,
        resources,
        parts,
        evaluationCriteria,
        feedback,
        isSubmitting,
        currentSection,
        setCurrentSection,
        handleInputChange,
        handleAddResource,
        handleRemoveResource,
        handleAddPart,
        handleRemovePart,
        handleUpdatePart,
        handleAddCriterion,
        handleRemoveCriterion,
        handleUpdateCriterion,
        updateEvaluationMethod,
        updateCalculationMethod,
        goToPreviousSection,
        goToNextSection,
        handleSubmit,
        isFormValid,
        getSectionValidationState,
        getFormProgress
    } = useEvaluationForm(evaluation, onSave);

    const [draft, setDraft] = useState<boolean>(false);

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
                    return <BasicInfoSection
                        evaluationData={evaluationData}
                        handleInputChange={handleInputChange}
                    />;
                case FormSectionOptions.RESOURCES:
                    return <ResourcesSection
                        addResource={handleAddResource}
                        removeResource={handleRemoveResource}
                        resources={resources}
                    />;
                case FormSectionOptions.PARTS:
                    return <PartsSection
                        parts={parts}
                        evaluation={evaluationData}
                        addPart={handleAddPart}
                        removePart={handleRemovePart}
                        updatePart={handleUpdatePart}
                    />;
                case FormSectionOptions.EVALUATION_CRITERIA:
                    return <EvaluationCriteriaSection
                        criteria={evaluationCriteria}
                        evaluation={evaluationData}
                        addCriterion={handleAddCriterion}
                        removeCriterion={handleRemoveCriterion}
                        updateCriterion={handleUpdateCriterion}
                    />;
                case FormSectionOptions.EVALUATION_METHOD:
                    return <EvaluationMethodSection
                        evaluation={evaluationData}
                        updateMethod={updateEvaluationMethod}
                    />;
                case FormSectionOptions.CALCULATION:
                    return <CalculationSection
                        evaluationData={evaluationData}
                        updateCalculationMethod={updateCalculationMethod}
                    />;
                default:
                    return <BasicInfoSection
                        evaluationData={evaluationData}
                        handleInputChange={handleInputChange}
                    />;
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

    const handleSaveDraft = () => {
        // Lógica para salvar rascunho
        setDraft(true);
        onSave({ ...evaluationData, status: 'rascunho' });
    };

    const handleSubmitForm = () => {
        handleSubmit(new Event('submit') as unknown as React.FormEvent);
    };

    return (
        <Modal
            isOpen={!!evaluation}
            title={evaluation ? 'Editar Avaliação' : 'Nova Avaliação'}
            size="md"
            onSubmit={handleSubmitForm}
            onClose={handleCloseModal} >
            <FormProgress aria-label="Progresso do formulário">
                <FormProgressIndicator progress={progressPercentage} />
            </FormProgress>

            <form>
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
                    {renderCurrentSection()}
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
        </Modal>
    );
};

export default EvaluationForm;