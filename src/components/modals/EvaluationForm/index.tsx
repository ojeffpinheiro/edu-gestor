import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

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
        handleSubmit
    } = useEvaluationForm(evaluation, onSave);

    const renderCurrentSection = () => {
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
    }

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault(); // Impedir o comportamento padrão do formulário
    
        try {
            await onSave(evaluation);
        } catch (error) {
            console.error("Erro ao salvar avaliação:", error);
        }
    };
    

    return (
        <ModalContainer>
            <ModalContent>
                <ModalHeader>
                    <h3>{evaluation ? 'Editar Avaliação' : 'Nova Avaliação'}</h3>
                    <CloseButton onClick={onClose} aria-label="Fechar modal">
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>

                <form onSubmit={handleSubmitForm}>
                    <ModalBody>
                        {/* Mensagens de Feedback */}
                        {feedback.errorMessage && (
                            <ErrorMessage role="alert">{feedback.errorMessage}</ErrorMessage>
                        )}
                        {feedback.successMessage && (
                            <SuccessMessage role="status">{feedback.successMessage}</SuccessMessage>
                        )}

                        {/* Navegação de seções */}
                        <div className="sections-nav">
                            {Object.values(FormSectionOptions).map((section) => (
                                <button
                                    key={section}
                                    type="button"
                                    className={`section-button ${currentSection === section ? 'active' : ''}`}
                                    onClick={() => setCurrentSection(section)} >
                                    {section}
                                </button>
                            ))}
                        </div>

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
                                >
                                    Próximo
                                </Button>
                            ) : (
                                <Button
                                    type="submit"
                                    className="primary save-button"
                                    disabled={isSubmitting}
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