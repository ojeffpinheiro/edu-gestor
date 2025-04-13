import React, { useState, useEffect, useCallback } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaTrash, FaExclamationTriangle, FaCheck, FaInfoCircle, FaSort } from "react-icons/fa";

import { Evaluation, EvaluationCriterion } from "../../../../utils/types";

import { Input, InputRow, Label, TextArea, InputGroup } from "../../../../styles/inputs";
import { Button, ActionButton } from "../../../../styles/buttons";
import CollapsibleSection from "../../CollapsibleSection";
import { AddCriterionContainer, Badge, CriteriaBody, CriteriaCard, CriteriaHeader, CriteriaOptionItem, CriteriaOptions, DragHandle, EmptyCriteriaState, ErrorMessage, FormActions, StatusBanner, Tooltip, WeightInput } from "./styles";

interface EvaluationCriteriaSectionProps {
}

interface EvaluationCriteriaSectionProps {
    criteria: EvaluationCriterion[];
    evaluation: Evaluation | null;
    addCriterion: (criterion: EvaluationCriterion) => void;
    removeCriterion: (id: string) => void;
    updateCriterion: (updatedCriterion: EvaluationCriterion) => void;
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

    // Estado para critérios de avaliação
    const [evaluationCriteria, setEvaluationCriteria] = useState<EvaluationCriterion[]>([
        {
            id: "1",
            name: "Organização das Ideias",
            weight: 2,
            comment: "",
            isExpanded: false,
            options: [
                { id: "1-1", description: "Completo. O orador transmite claramente a ideia principal e fornece detalhes que são relevantes e interessantes." },
                { id: "1-2", description: "Geralmente completo. O orador transmite a ideia principal, mas não fornece detalhes relevantes adequados para apoiá-la." },
                { id: "1-3", description: "Um tanto incompleto. A ideia principal não é clara. Muitos detalhes são irrelevantes." },
                { id: "1-4", description: "Incompleto. A ideia principal não é clara. Os detalhes são inexistentes ou aleatórios e irrelevantes." }
            ]
        },
        {
            id: "2",
            name: "Compreensibilidade",
            weight: 2,
            comment: "",
            isExpanded: false,
            options: [
                { id: "2-1", description: "Compreensível. O orador usa linguagem apropriada para transmitir a ideia principal deste item claramente." },
                { id: "2-2", description: "Geralmente compreensível. A mensagem não é clara em alguns lugares. A linguagem usada é inadequada para tornar a mensagem totalmente clara." },
                { id: "2-3", description: "Um tanto incompreensível. A mensagem só poderia ser entendida por um falante nativo simpático. A linguagem usada é frequentemente inapropriada ou distorcida pela interferência do inglês." },
                { id: "2-4", description: "Incompreensível. A mensagem não pode ser entendida." }
            ]
        },
        {
            id: "3",
            name: "Fluência",
            weight: 2,
            comment: "",
            isExpanded: false,
            options: [
                { id: "3-1", description: "O aluno fala muito claramente, sem hesitação. A pronúncia e a entonação soam naturais." },
                { id: "3-2", description: "O aluno fala com alguma hesitação. Problemas com pronúncia e entonação não impedem a comunicação." },
                { id: "3-3", description: "O aluno hesita frequentemente. Problemas com pronúncia e entonação distorcem o significado e inibem a comunicação em alguns casos." },
                { id: "3-4", description: "Hesitações frequentes e problemas extremos com a pronúncia causam interrupções na comunicação." }
            ]
        },
        {
            id: "4",
            name: "Precisão",
            weight: 2,
            comment: "",
            isExpanded: false,
            options: [
                { id: "4-1", description: "Funções, gramática e vocabulário são usados corretamente." },
                { id: "4-2", description: "Pequenos problemas de uso não distorcem o significado nem inibem a comunicação." },
                { id: "4-3", description: "Problemas no uso distorcem significativamente o significado e inibem a comunicação em alguns casos." },
                { id: "4-4", description: "Problemas no uso distorcem completamente o significado e inibem as comunicações." }
            ]
        },
        {
            id: "5",
            name: "Esforço",
            weight: 2,
            comment: "",
            isExpanded: false,
            options: [
                { id: "5-1", description: "Excede os requisitos mínimos da tarefa e fornece evidências de contribuição ponderada." },
                { id: "5-2", description: "Atende aos requisitos mínimos da tarefa e fornece evidências de contribuição ponderada." },
                { id: "5-3", description: "Atende aos requisitos mínimos da tarefa, mas não demonstra evidências de contribuição ponderada." },
                { id: "5-4", description: "Não cumpre os requisitos mínimos da tarefa nem fornece evidências de contribuição ponderada." }
            ]
        }
    ]);

    // Estado para novo critério
    const [newCriterion, setNewCriterion] = useState<{ name: string }>({ name: "" });

    // Store the original criteria when the component mounts or when evaluation changes
    useEffect(() => {
        if (evaluation?.evaluationCriteria) {
            setOriginalCriteria(JSON.parse(JSON.stringify(evaluation.evaluationCriteria)));
        }
    }, [evaluation]);

    /**
     * Alterna estado de expansão de um critério de avaliação
     */
    const toggleCriterionExpansion = useCallback((id: string) => {
        setEvaluationCriteria(prev =>
            prev.map(criterion =>
                criterion.id === id
                    ? { ...criterion, isExpanded: !criterion.isExpanded }
                    : criterion
            )
        );
    }, []);

    /**
     * Atualiza o peso de um critério de avaliação
     */
    const updateCriterionWeight = useCallback((id: string, weight: number) => {
        setEvaluationCriteria(prev =>
            prev.map(criterion =>
                criterion.id === id ? { ...criterion, weight } : criterion
            )
        );
    }, []);

    const addCriterion = useCallback(() => {
        if (!newCriterion.name.trim()) return;

        const newCriterionItem: EvaluationCriterion = {
            id: Date.now().toString(),
            name: newCriterion.name.trim(),
            weight: 1,
            comment: "",
            isExpanded: false,
            options: [
                { id: `${Date.now()}-1`, description: "Opção 1" },
                { id: `${Date.now()}-2`, description: "Opção 2" },
                { id: `${Date.now()}-3`, description: "Opção 3" },
                { id: `${Date.now()}-4`, description: "Opção 4" }
            ]
        };

        setEvaluationCriteria(prev => [...prev, newCriterionItem]);
        setNewCriterion({ name: "" });
    }, [newCriterion]);

    /**
         * Adiciona uma nova opção a um critério de avaliação
         */
    const addCriterionOption = useCallback((criterionId: string) => {
        setEvaluationCriteria(prev =>
            prev.map(criterion => {
                if (criterion.id === criterionId) {
                    const newOptionId = `${criterionId}-${criterion.options.length + 1}`;
                    return {
                        ...criterion,
                        options: [
                            ...criterion.options,
                            { id: newOptionId, description: "Nova opção" }
                        ]
                    };
                }
                return criterion;
            })
        );
    }, []);

    /**
     * Atualiza o comentário de um critério de avaliação
     */
    const updateCriterionComment = useCallback((id: string, comment: string) => {
        setEvaluationCriteria(prev =>
            prev.map(criterion =>
                criterion.id === id ? { ...criterion, comment } : criterion
            )
        );
    }, []);

    const updateCriterionOption = useCallback((criterionId: string, optionId: string, description: string) => {
        setEvaluationCriteria(prev =>
            prev.map(criterion => {
                if (criterion.id === criterionId) {
                    return {
                        ...criterion,
                        options: criterion.options.map(option =>
                            option.id === optionId ? { ...option, description } : option
                        )
                    };
                }
                return criterion;
            })
        );
    }, []);

    const removeCriterionOption = useCallback((criterionId: string, optionId: string) => {
        setEvaluationCriteria(prev =>
            prev.map(criterion => {
                if (criterion.id === criterionId) {
                    return {
                        ...criterion,
                        options: criterion.options.filter(option => option.id !== optionId)
                    };
                }
                return criterion;
            })
        );
    }, []);

    /**
     * Remove um critério de avaliação
     */
    const removeCriterion = useCallback((id: string) => {
        setEvaluationCriteria(prev => prev.filter(criterion => criterion.id !== id));
    }, []);

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