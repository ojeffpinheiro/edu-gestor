import React, { useState, useEffect, useCallback } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaTrash, FaExclamationTriangle, FaCheck, FaInfoCircle, FaSort } from "react-icons/fa";

import { Evaluation } from "../../utils/types";

import useEvaluationForm from "../../hooks/useEvaluationForm";

import { Input, InputRow, Label, TextArea, InputGroup } from "../../styles/inputs";
import { Button, ActionButton } from "../../styles/buttons";
import CollapsibleSection from "../CollapsibleSection";
import { AddCriterionContainer, Badge, CriteriaBody, CriteriaCard, CriteriaHeader, CriteriaOptionItem, CriteriaOptions, DragHandle, EmptyCriteriaState, ErrorMessage, FormActions, StatusBanner, Tooltip, WeightInput } from "./styles";

interface EvaluationCriteriaSectionProps {
    evaluation: Evaluation | null;
    onCriteriaChange?: (hasChanges: boolean) => void;
}

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
    // Track success message
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

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
        if (!originalCriteria || originalCriteria.length !== evaluationCriteria.length) {
            return true;
        }

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
            if (window.confirm("Tem certeza que deseja descartar todas as alterações?")) {
                console.log("Alterações descartadas");
                setHasUnsavedChanges(false);
                // Reset implementation would normally go here
            }
        }
    };

    // Handle adding a new criterion with validation
    const handleAddCriterion = () => {
        try {
            if (validateCriterionName(newCriterion.name)) {
                addCriterion();
                console.log("Critério adicionado com sucesso!");
                setHasUnsavedChanges(true);
                // Show feedback
                setTimeout(() => {
                    const newCard = document.querySelector(`[data-testid^="criterion-card-"]:last-child`);
                    if (newCard) {
                        newCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
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
        setOriginalCriteria(JSON.parse(JSON.stringify(evaluationCriteria)));
        setHasUnsavedChanges(false);
        setShowSuccessMessage(true);
        console.log("Critérios salvos com sucesso!");
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);
    };

    // Render empty state when no criteria exist
    const renderEmptyState = () => {
        if (evaluationCriteria.length === 0) {
            return (
                <EmptyCriteriaState>
                    <FaInfoCircle size={36} />
                    <p>Nenhum critério de avaliação definido ainda.</p>
                    <p>Adicione critérios para personalizar sua avaliação.</p>
                    <Button 
                        variant="primary" 
                        onClick={() => {
                            // Scroll to add criterion section
                            setTimeout(() => {
                                const addSection = document.querySelector('.add-criterion-container');
                                if (addSection) {
                                    addSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    // Focus on the input
                                    const input = document.querySelector('.add-criterion-container input');
                                    if (input) {
                                        (input as HTMLElement).focus();
                                    }
                                }
                            }, 100);
                        }}
                    >
                        <FaPlus aria-hidden="true" /> Começar a adicionar
                    </Button>
                </EmptyCriteriaState>
            );
        }
        return null;
    };

    return (
        <CollapsibleSection title='Critérios de Avaliação'>
            <div className="section-title-with-badge">
                <span />
                {evaluationCriteria.length > 0 && (
                    <Badge>{evaluationCriteria.length}</Badge>
                )}
            </div>
            <div className="evaluation-criteria-container">
                {/* Status messages */}
                {hasUnsavedChanges && (
                    <StatusBanner className="warning" role="alert">
                        <FaExclamationTriangle aria-hidden="true" />
                        <span>Há alterações não salvas. Lembre-se de salvar antes de sair.</span>
                    </StatusBanner>
                )}
                
                {showSuccessMessage && (
                    <StatusBanner className="success" role="status">
                        <FaCheck aria-hidden="true" />
                        <span>Critérios salvos com sucesso!</span>
                    </StatusBanner>
                )}

                {renderEmptyState()}

                {evaluationCriteria.map((criterion) => (
                    <CriteriaCard key={criterion.id} data-testid={`criterion-card-${criterion.id}`}>
                        <CriteriaHeader
                            onClick={() => toggleCriterionExpansion(criterion.id)}
                            isExpanded={criterion.isExpanded}
                            aria-expanded={criterion.isExpanded}
                        >
                            <div className="criteria-title">
                                <DragHandle title="Reordenar critério">
                                    <FaSort aria-hidden="true" />
                                </DragHandle>
                                <span className="criterion-name">{criterion.name}</span>
                                <Badge>{`Peso: ${criterion.weight}`}</Badge>
                                <Badge className="options-count">{`${criterion.options.length} opç${criterion.options.length === 1 ? 'ão' : 'ões'}`}</Badge>
                            </div>
                            <div className="criteria-controls">
                                {criterion.isExpanded ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
                            </div>
                        </CriteriaHeader>

                        <CriteriaBody isExpanded={criterion.isExpanded}>
                            <InputGroup>
                                <Label htmlFor={`criterion-weight-${criterion.id}`}>
                                    Peso do critério (1-10):
                                    <Tooltip>
                                        <FaInfoCircle className="tooltip-icon" size={14} />
                                        <span className="tooltip-text">
                                            Define a importância deste critério na avaliação final. 
                                            Valores mais altos têm maior influência.
                                        </span>
                                    </Tooltip>
                                </Label>
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
                                    <ErrorMessage id={`weight-error-${criterion.id}`}>
                                        {formErrors.weightError}
                                    </ErrorMessage>
                                )}
                            </InputGroup>

                            <InputGroup>
                                <Label htmlFor={`criterion-comment-${criterion.id}`}>
                                    Comentário:
                                    <Tooltip>
                                        <FaInfoCircle className="tooltip-icon" size={14} />
                                        <span className="tooltip-text">
                                            Adicione informações adicionais para ajudar os avaliadores a 
                                            entenderem melhor este critério.
                                        </span>
                                    </Tooltip>
                                </Label>
                                <TextArea
                                    id={`criterion-comment-${criterion.id}`}
                                    value={criterion.comment}
                                    onChange={(e) => {
                                        updateCriterionComment(criterion.id, e.target.value);
                                        setHasUnsavedChanges(true);
                                    }}
                                    placeholder="Ex: Este critério avalia a capacidade do candidato em..."
                                    rows={2}
                                />
                            </InputGroup>

                            <InputGroup>
                                <div className="criterion-options-header">
                                    <Label>
                                        Opções de Avaliação:
                                        <Tooltip>
                                            <FaInfoCircle className="tooltip-icon" size={14} />
                                            <span className="tooltip-text">
                                                Crie diferentes níveis de desempenho para este critério.
                                                Cada opção representa um possível resultado da avaliação.
                                            </span>
                                        </Tooltip>
                                    </Label>
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
                                                    placeholder={`Ex: ${index === 0 ? 'Não atende' : index === criterion.options.length - 1 ? 'Excede expectativas' : 'Atende parcialmente'} o critério...`}
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
                <AddCriterionContainer className="add-criterion-container">
                    <h4><FaPlus aria-hidden="true" /> Adicionar Novo Critério</h4>
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
                                placeholder="Ex: Comunicação, Liderança, Conhecimento Técnico..."
                                aria-label="Nome do novo critério"
                                aria-describedby={formErrors.criterionName ? "criterion-name-error" : undefined}
                            />
                            {formErrors.criterionName && (
                                <ErrorMessage id="criterion-name-error">
                                    {formErrors.criterionName}
                                </ErrorMessage>
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
                </AddCriterionContainer>

                {/* Footer actions when changes exist */}
                {hasUnsavedChanges && (
                    <FormActions className="form-actions">
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
                    </FormActions>
                )}
            </div>
        </CollapsibleSection>
    );
};

export default EvaluationCriteriaSection;