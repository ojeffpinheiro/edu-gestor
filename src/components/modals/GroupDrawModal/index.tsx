import React, { useCallback, useEffect } from "react";
import { FaRandom } from "react-icons/fa";

import { validateFormationParams } from '../../../utils/groupFormationValidators'
import { createStudentGroups } from '../../../services/groupFormationService'
import { useFormationState } from '../../../hooks/student/useFormationState'

import { FORMATION_CONFIG, GroupFormationModalProps, GroupFormationType } from "../../../types/classroom/GroupFormation";

import FormationControls from "../../ui/FormationControls";
import GroupsResultList from "../../ui/GroupsResultList";
import Modal from "../Modal";

import { Button } from '../../../styles/buttons'

import { ControlsContainer, LoadingIndicator, RadioGroup, RadioOption } from "./styles";
import { ErrorMessage, SuccessMessage } from "../../../styles/feedback";

/**
 * Modal de formação de grupos aleatórios de estudantes
 * 
 * Permite aos usuários formarem grupos baseados no tamanho desejado 
 * ou na quantidade total de grupos necessária
 */
const GroupFormationModal: React.FC<GroupFormationModalProps> = ({
    students,
    onClose,
    onSave,
    processingDelay = FORMATION_CONFIG.DEFAULT_PROCESSING_DELAY
}) => {

    const {
        formationParams,
        feedback,
        studentGroups,
        setStudentGroups,
        updateFeedback,
        updateFormationParams
    } = useFormationState(students);

    // Reset dos feedbacks quando parâmetros são alterados
    useEffect(() => {
        if (feedback.errorMessage || feedback.successMessage) {
            updateFeedback({ errorMessage: '', successMessage: '' });
        }
    }, [formationParams, feedback.errorMessage, feedback.successMessage, updateFeedback]);

    /**
     * Verifica se há alterações não salvas antes de fechar o modal
     */
    const handleCloseAttempt = useCallback(() => {
        if (feedback.hasUnsavedChanges && studentGroups.length > 0) {
            const userWantsToClose = window.confirm(
                "Você tem grupos não salvos. Deseja realmente fechar o modal? Os grupos formados não serão perdidos."
            );
            if (!userWantsToClose) {
                return;
            }
        }
        onClose();
    }, [studentGroups, onClose, feedback.hasUnsavedChanges]);

    /**
     * Processa a formação de grupos
     */
    const handleFormGroups = useCallback(async () => {
        const validationResult = validateFormationParams(students, formationParams);
        if (!validationResult.isValid) {
            updateFeedback({ errorMessage: validationResult.errorMessage });
            return;
        }

        try {
            updateFeedback({
                isProcessing: true,
                errorMessage: '',
                successMessage: '',
                showResults: false
            });

            // Simula processamento para melhor UX
            await new Promise(resolve => setTimeout(resolve, processingDelay));

            const generatedGroups = createStudentGroups(students, formationParams);

            if (generatedGroups.length === 0) {
                throw new Error('Não foi possível formar os grupos. Verifique os parâmetros.');
            }

            setStudentGroups(generatedGroups);
            updateFeedback({
                successMessage: `${generatedGroups.length} grupos foram formados com sucesso!`,
                showResults: true,
                hasUnsavedChanges: true
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            updateFeedback({ errorMessage: `Erro ao formar grupos: ${errorMessage}` });
            console.error('Erro na formação de grupos:', error);
        } finally {
            updateFeedback({ isProcessing: false });
        }
    }, [students, formationParams, processingDelay, updateFeedback, setStudentGroups]);

    /**
     * Salva os grupos formados e notifica o usuário
     */
    const handleSaveGroups = useCallback(() => {
        try {
            if (onSave && studentGroups.length > 0) {
                onSave(studentGroups);
                updateFeedback({
                    successMessage: "Grupos salvos com sucesso!",
                    hasUnsavedChanges: false
                });
            } else if (!onSave) {
                throw new Error('Função de salvamento não disponível');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Erro ao salvar os grupos';
            updateFeedback({ errorMessage });
        }
    }, [studentGroups, onSave, updateFeedback]);

    /**
     * Atualiza o tamanho de cada grupo
     */
    const handleGroupSizeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        const validValue = isNaN(value)
            ? FORMATION_CONFIG.MIN_GROUP_SIZE
            : Math.max(FORMATION_CONFIG.MIN_GROUP_SIZE, value);

        updateFormationParams({ groupSize: validValue });
    }, [updateFormationParams]);

    /**
     * Atualiza o número total de grupos
     */
    const handleNumberOfGroupsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        const validValue = isNaN(value)
            ? FORMATION_CONFIG.MIN_GROUPS
            : Math.max(FORMATION_CONFIG.MIN_GROUPS, value);

        updateFormationParams({ numberOfGroups: validValue });
    }, [updateFormationParams]);

    /**
     * Altera o tipo de formação de grupos
     */
    const handleFormTypeChange = useCallback((formationType: GroupFormationType) => {
        updateFormationParams({ formationType });
        updateFeedback({ showResults: false });
    }, [updateFormationParams, updateFeedback]);

    return (
        <Modal
            isOpen={!!students}
            size="sm"
            onClose={handleCloseAttempt}
            title='Formação de Grupos'
            onSubmit={handleSaveGroups}
            submitText='Salvar Grupos' >

            <RadioGroup role="radiogroup" aria-labelledby="formation-type-label">
                <p id="formation-type-label" className="sr-only">Selecione o tipo de formação de grupos</p>
                <RadioOption>
                    <input
                        type="radio"
                        id="bySize"
                        name="formationType"
                        checked={formationParams.formationType === GroupFormationType.BY_SIZE}
                        onChange={() => handleFormTypeChange(GroupFormationType.BY_SIZE)}
                        data-testid="by-size-radio"
                    />
                    <label htmlFor="bySize">Definir tamanho de cada grupo</label>
                </RadioOption>

                <RadioOption>
                    <input
                        type="radio"
                        id="byNumber"
                        name="formationType"
                        checked={formationParams.formationType === GroupFormationType.BY_NUMBER}
                        onChange={() => handleFormTypeChange(GroupFormationType.BY_NUMBER)}
                        data-testid="by-number-radio"
                    />
                    <label htmlFor="byNumber">Definir número total de grupos</label>
                </RadioOption>
            </RadioGroup>

            <ControlsContainer>
                <FormationControls
                    formationParams={formationParams}
                    students={students}
                    handleGroupSizeChange={handleGroupSizeChange}
                    handleNumberOfGroupsChange={handleNumberOfGroupsChange}
                />
            </ControlsContainer>

            {feedback.errorMessage && (
                <ErrorMessage role="alert">{feedback.errorMessage}</ErrorMessage>
            )}

            {feedback.successMessage && (
                <SuccessMessage role="status">{feedback.successMessage}</SuccessMessage>
            )}

            <Button
                variant="primary"
                onClick={handleFormGroups}
                disabled={feedback.isProcessing || students.length === 0}
                aria-busy={feedback.isProcessing}
                data-testid="form-groups-btn"
            >
                {feedback.isProcessing ? (
                    <><LoadingIndicator aria-hidden="true" /> Processando...</>
                ) : (
                    <><FaRandom aria-hidden="true" /> Formar Grupos</>
                )}
            </Button>

            <GroupsResultList
                studentGroups={studentGroups}
                showResults={feedback.showResults}
            />
        </Modal>
    );
};

export default GroupFormationModal;