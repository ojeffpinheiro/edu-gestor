import React, { useState, useEffect, useCallback } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaTrash, FaExclamationTriangle, FaCheck } from "react-icons/fa";

import { Evaluation } from "../../utils/types";

import useEvaluationForm from "../../hooks/useEvaluationForm";

import { Input, InputRow, Label, TextArea, InputGroup } from "../../styles/inputs";
import { Button, ActionButton } from "../../styles/buttons";
import CollapsibleSection from "../CollapsibleSection";

import { Badge, CriteriaBody, CriteriaCard, CriteriaHeader, CriteriaOptionItem, CriteriaOptions, WeightInput } from "../../utils/CriteriaCard";

interface EvaluationCriteriaSectionProps {
    evaluation: Evaluation | null;
    onCriteriaChange?: (hasChanges: boolean) => void;
}

/**
 * Component for managing evaluation criteria in an assessment form
 * Allows users to create, edit, and manage weighted evaluation criteria and options
 */
const EvaluationCriteriaSection: React.FC<EvaluationCriteriaSectionProps> = ({
    evaluation,
    onCriteriaChange
}) => {
    // Track if there are unsaved changes
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
    // Store original criteria for reset functionality
    const [originalCriteria, setOriginalCriteria] = useState<any[]>([]);
    // Track errors in the form
    const [formErrors, setFormErrors] = useState<{
        criterionName?: string;
        weightError?: string;
    }>({});

    // Get evaluation form handlers from custom hook
    const {
        evaluationCriteria,
        toggleCriterionExpansion,
        updateCriterionWeight,
        updateCriterionComment,
        updateCriterionOption,
        removeCriterionOption,
        addCriterionOption,
        removeCriterion,
        newCriterion,
        setNewCriterion,
        addCriterion
    } = useEvaluationForm(evaluation);

    // Store the original criteria when the component mounts or when evaluation changes
    useEffect(() => {
        if (evaluation?.evaluationCriteria) {
            setOriginalCriteria(JSON.parse(JSON.stringify(evaluation.evaluationCriteria)));
        }
    }, [evaluation]);

    // Validate criterion name input
    const validateCriterionName = (name: string): boolean => {
        if (!name.trim()) {
            setFormErrors(prev => ({ ...prev, criterionName: "O nome do critério é obrigatório" }));
            return false;
        }

        // Check if name already exists
        const nameExists = evaluationCriteria.some(c =>
            c.name.toLowerCase() === name.trim().toLowerCase()
        );

        if (nameExists) {
            setFormErrors(prev => ({ ...prev, criterionName: "Já existe um critério com este nome" }));
            return false;
        }

        setFormErrors(prev => ({ ...prev, criterionName: undefined }));
        return true;
    };

    // Validate weight value
    const validateWeight = (weight: number): boolean => {
        if (weight < 1 || weight > 10) {
            setFormErrors(prev => ({ ...prev, weightError: "O peso deve ser entre 1 e 10" }));
            return false;
        }
        setFormErrors(prev => ({ ...prev, weightError: undefined }));
        return true;
    };

    // Check if the current criteria are different from the original
    const checkForChanges = useCallback(() => {
        // Simple check - comparing lengths
        if (!originalCriteria || originalCriteria.length !== evaluationCriteria.length) {
            return true;
        }

        // Deep comparison would need more sophisticated logic depending on your data structure
        // For demonstration, this is a simplified check
        const currentJson = JSON.stringify(evaluationCriteria.map(c => ({
            id: c.id,
            name: c.name,
            weight: c.weight,
            comment: c.comment,
            options: c.options
        })));
        const originalJson = JSON.stringify(originalCriteria);

        return currentJson !== originalJson;
    }, [evaluationCriteria, originalCriteria]);

    // Update hasUnsavedChanges state when criteria change
    useEffect(() => {
        const hasChanges = checkForChanges();
        setHasUnsavedChanges(hasChanges);

        if (onCriteriaChange) {
            onCriteriaChange(hasChanges);
        }
    }, [evaluationCriteria, checkForChanges, onCriteriaChange]);

    // Reset to original criteria
    const resetChanges = () => {
        if (evaluation && originalCriteria.length > 0) {
            // This is a simplified approach. In a real scenario, 
            // you would need to call the appropriate state management functions
            // to reset all criteria to their original state.

            // For demonstration purposes, we'll show a toast and set hasUnsavedChanges to false
            console.log("Alterações descartadas");
            setHasUnsavedChanges(false);

            // Ideally, you would reset the state in your form hook
            // For example: resetEvaluationCriteria(originalCriteria)
        }
    };

    // Handle adding a new criterion with validation
    const handleAddCriterion = () => {
        try {
            if (validateCriterionName(newCriterion.name)) {
                addCriterion();
                console.log("Critério adicionado com sucesso!");
                setHasUnsavedChanges(true);
            }
        } catch (error) {
            console.error("Erro ao adicionar critério:", error);
        }
    };

    // Handle weight update with validation
    const handleWeightUpdate = (criterionId: string, weight: number) => {
        if (validateWeight(weight)) {
            updateCriterionWeight(criterionId, weight);
            setHasUnsavedChanges(true);
        }
    };

    // Handle criterion removal with confirmation
    const handleRemoveCriterion = (criterionId: string, name: string) => {
        if (window.confirm(`Tem certeza que deseja remover o critério "${name}"?`)) {
            removeCriterion(criterionId);
            console.log("Critério removido");
            setHasUnsavedChanges(true);
        }
    };

    // Save changes
    const saveChanges = () => {
        // Here would be the save action to persist changes to your backend
        // For demonstration purposes, we're just updating the original criteria
        setOriginalCriteria(JSON.parse(JSON.stringify(evaluationCriteria)));
        setHasUnsavedChanges(false);
        console.log("Critérios salvos com sucesso!");
    };

    // Render no criteria message when empty
    const renderNoCriteria = () => {
        if (evaluationCriteria.length === 0) {
            return (
                <div className="no-criteria-message">
                    <FaExclamationTriangle color="var(--color-warning)" />
                    <p>Nenhum critério de avaliação definido. Adicione pelo menos um critério.</p>
                </div>
            );
        }
        return null;
    };

    return (
        <CollapsibleSection
            title='Critérios de Avaliação'>
            <div className="section-title-with-badge">
                <span />
                {evaluationCriteria.length > 0 && (
                    <Badge className="criteria-count">{evaluationCriteria.length}</Badge>
                )}
            </div>
            <div className="evaluation-criteria-container">
                {/* Status indicator for unsaved changes */}
                {hasUnsavedChanges && (
                    <div className="unsaved-changes-indicator">
                        <FaExclamationTriangle color="var(--color-warning)" />
                        <span>Alterações não salvas</span>
                    </div>
                )}

                {renderNoCriteria()}

                {evaluationCriteria.map((criterion) => (
                    <CriteriaCard key={criterion.id} data-testid={`criterion-card-${criterion.id}`}>
                        <CriteriaHeader
                            onClick={() => toggleCriterionExpansion(criterion.id)}
                            isExpanded={criterion.isExpanded}
                            aria-expanded={criterion.isExpanded}
                        >
                            <div className="criteria-title">
                                <span className="criterion-name">{criterion.name}</span>
                                <Badge>{`Peso: ${criterion.weight}`}</Badge>
                                <Badge className="options-count">{`Opções: ${criterion.options.length}`}</Badge>
                            </div>
                            <div className="criteria-controls">
                                {criterion.isExpanded ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
                            </div>
                        </CriteriaHeader>

                        <CriteriaBody isExpanded={criterion.isExpanded}>
                            <InputGroup>
                                <Label htmlFor={`criterion-weight-${criterion.id}`}>Peso (1-10):</Label>
                                <WeightInput
                                    id={`criterion-weight-${criterion.id}`}
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={criterion.weight}
                                    onChange={(e) => handleWeightUpdate(criterion.id, Number(e.target.value))}
                                    aria-describedby={formErrors.weightError ? `weight-error-${criterion.id}` : undefined}
                                />
                                {formErrors.weightError && (
                                    <div className="error-message" id={`weight-error-${criterion.id}`}>
                                        {formErrors.weightError}
                                    </div>
                                )}
                            </InputGroup>

                            <InputGroup>
                                <Label htmlFor={`criterion-comment-${criterion.id}`}>Comentário:</Label>
                                <TextArea
                                    id={`criterion-comment-${criterion.id}`}
                                    value={criterion.comment}
                                    onChange={(e) => {
                                        updateCriterionComment(criterion.id, e.target.value);
                                        setHasUnsavedChanges(true);
                                    }}
                                    placeholder="Adicione comentários explicativos para este critério"
                                    rows={2}
                                />
                            </InputGroup>

                            <InputGroup>
                                <div className="criterion-options-header">
                                    <h4>Opções de Avaliação:</h4>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            addCriterionOption(criterion.id);
                                            setHasUnsavedChanges(true);
                                        }}
                                        className="add-option-button"
                                        variant="success"
                                    >
                                        <FaPlus aria-hidden="true" /> Nova Opção
                                    </Button>
                                </div>
                                <CriteriaOptions>
                                    {criterion.options.map((option, index) => (
                                        <CriteriaOptionItem key={option.id}>
                                            <div className="option-numbering">{index + 1}.</div>
                                            <div className="option-content">
                                                <TextArea
                                                    value={option.description}
                                                    onChange={(e) => {
                                                        updateCriterionOption(
                                                            criterion.id,
                                                            option.id,
                                                            e.target.value
                                                        );
                                                        setHasUnsavedChanges(true);
                                                    }}
                                                    rows={2}
                                                    placeholder="Descreva esta opção de avaliação"
                                                    aria-label={`Opção ${index + 1} para critério ${criterion.name}`}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (criterion.options.length <= 1) {
                                                        console.error("É necessário pelo menos uma opção por critério");
                                                        return;
                                                    }
                                                    removeCriterionOption(criterion.id, option.id);
                                                    setHasUnsavedChanges(true);
                                                }}
                                                className="delete-option-button"
                                                aria-label={`Remover opção ${index + 1}`}
                                                disabled={criterion.options.length <= 1}
                                                title={criterion.options.length <= 1 ? "É necessário pelo menos uma opção" : "Remover opção"}
                                            >
                                                <FaTrash aria-hidden="true" />
                                            </button>
                                        </CriteriaOptionItem>
                                    ))}
                                </CriteriaOptions>
                            </InputGroup>

                            <div className="criterion-controls">
                                <Button
                                    type="button"
                                    onClick={() => handleRemoveCriterion(criterion.id, criterion.name)}
                                    className="delete-criterion-button"
                                    aria-label={`Remover critério ${criterion.name}`}
                                    variant="error"
                                >
                                    <FaTrash aria-hidden="true" /> Remover Critério
                                </Button>
                            </div>
                        </CriteriaBody>
                    </CriteriaCard>
                ))}

                {/* Adicionar novo critério */}
                <div className="add-criterion-container">
                    <h4>Adicionar Novo Critério</h4>
                    <InputRow>
                        <div className="input-with-error">
                            <Input
                                type="text"
                                value={newCriterion.name}
                                onChange={(e) => {
                                    setNewCriterion({ name: e.target.value });
                                    if (e.target.value) {
                                        validateCriterionName(e.target.value);
                                    } else {
                                        setFormErrors(prev => ({ ...prev, criterionName: undefined }));
                                    }
                                }}
                                placeholder="Nome do novo critério"
                                aria-label="Nome do novo critério"
                                aria-describedby={formErrors.criterionName ? "criterion-name-error" : undefined}
                            />
                            {formErrors.criterionName && (
                                <div className="error-message" id="criterion-name-error">
                                    {formErrors.criterionName}
                                </div>
                            )}
                        </div>
                        <Button
                            type="button"
                            onClick={handleAddCriterion}
                            disabled={!newCriterion.name.trim() || !!formErrors.criterionName}
                            aria-label="Adicionar critério"
                            variant="primary"
                        >
                            <FaPlus aria-hidden="true" /> Adicionar Critério
                        </Button>
                    </InputRow>
                </div>

                {/* Footer actions when changes exist */}
                {hasUnsavedChanges && (
                    <div className="form-actions">
                        <Button
                            type="button"
                            onClick={resetChanges}
                            variant="secondary"
                        >
                            Descartar Alterações
                        </Button>
                        <ActionButton
                            type="button"
                            onClick={saveChanges}
                        >
                            <FaCheck aria-hidden="true" /> Salvar Critérios
                        </ActionButton>
                    </div>
                )}
            </div>
        </CollapsibleSection>
    );
};

export default EvaluationCriteriaSection;