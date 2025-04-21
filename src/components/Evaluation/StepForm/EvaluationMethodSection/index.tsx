import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaTrash, FaInfoCircle } from "react-icons/fa";

import CollapsibleSection from "../../CollapsibleSection";
import { Tooltip } from "../../../ui/Tooltip";

import {  ActionButton } from "../../../../styles/buttons";
import { Input, InputRow, Label, TextArea } from "../../../../styles/inputs";
import { CollapsibleContent, CollapsibleHeader } from "../../../ui/CollapsibleComponents";
import { EmptyStateMessage } from "../../../../styles/table";
import { CriteriaActions, CriteriaCard, CriteriaHeader, CriteriaTitle, DeleteButton, FormFeedback, TotalWeightDisplay, WeightBadge } from "./styles";
import { Evaluation } from "../../../../utils/types/AssessmentEvaluation";
import { EvaluationCriteria } from "../../../../utils/types/RubricCriteria";
import { evaluationCriteria } from "../../../../mocks/evaluation";

interface EvaluationCriteriaSectionProps {
    evaluation: Evaluation | null;
    updateMethod: (method: string) => void;
}

const EvaluationCriteriaSection: React.FC<EvaluationCriteriaSectionProps> = ({ evaluation }) => {
    const [criteriaExpanded, setCriteriaExpanded] = useState<boolean>(true);
    const [expandedCriteria, setExpandedCriteria] = useState<string | null>(null);
    
    // Example state - replace with your actual hook or state management
    const [criteria, setCriteria] = useState<EvaluationCriteria[]>(evaluationCriteria);
    
    const [newCriteria, setNewCriteria] = useState<Partial<EvaluationCriteria>>({
        name: "",
        description: "",
        weight: 0
    });

    const totalWeight = criteria.reduce((sum, item) => sum + (item.weight || 0), 0);
    const isWeightValid = totalWeight === 100;

    const handleToggleCriteria = (id: string) => {
        setExpandedCriteria(expandedCriteria === id ? null : id);
    };

    const handleUpdateCriteria = (id: string, field: keyof EvaluationCriteria, value: any) => {
        setCriteria(criteria.map(c => 
            c.id === id ? { ...c, [field]: field === 'weight' ? Number(value) : value } : c
        ));
    };

    const handleAddCriteria = () => {
        if (!newCriteria.name || !newCriteria.weight) return;
        
        const newItem: EvaluationCriteria = {
            id: Date.now().toString(),
            name: newCriteria.name || "",
            description: newCriteria.description || "",
            weight: Number(newCriteria.weight) || 0
        };
        
        setCriteria([...criteria, newItem]);
        setNewCriteria({ name: "", description: "", weight: 0 });
        // Automatically expand the newly added criteria
        setExpandedCriteria(newItem.id);
    };

    const handleRemoveCriteria = (id: string) => {
        setCriteria(criteria.filter(c => c.id !== id));
        if (expandedCriteria === id) {
            setExpandedCriteria(null);
        }
    };

    return (
        <CollapsibleSection title="Critérios de Avaliação">
            <CollapsibleHeader 
                title="Critérios de Avaliação"
                icon={criteriaExpanded ? <FaChevronUp /> : <FaChevronDown />}
                onClick={() => setCriteriaExpanded(!criteriaExpanded)} />

            <CollapsibleContent isOpen={criteriaExpanded}>
                <TotalWeightDisplay isValid={isWeightValid}>
                    Peso Total: {totalWeight}%
                    {!isWeightValid && 
                        <Tooltip content="Os pesos devem somar 100%">
                            <FaInfoCircle style={{ marginLeft: 'var(--space-sm)' }} />
                        </Tooltip>
                    }
                </TotalWeightDisplay>

                {criteria.length === 0 ? (
                    <EmptyStateMessage>
                        Nenhum critério adicionado. Crie critérios para avaliar seus alunos.
                    </EmptyStateMessage>
                ) : (
                    criteria.map((criterion) => (
                        <CriteriaCard key={criterion.id}>
                            <CriteriaHeader onClick={() => handleToggleCriteria(criterion.id)}>
                                <CriteriaTitle>
                                    {criterion.name}
                                    <WeightBadge>Peso: {criterion.weight}%</WeightBadge>
                                </CriteriaTitle>
                                <CriteriaActions>
                                    <DeleteButton
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveCriteria(criterion.id);
                                        }}
                                        aria-label={`Remover critério ${criterion.name}`}
                                        disabled={criteria.length <= 1}
                                    >
                                        <FaTrash />
                                    </DeleteButton>
                                    {expandedCriteria === criterion.id ? <FaChevronUp /> : <FaChevronDown />}
                                </CriteriaActions>
                            </CriteriaHeader>
                            
                            {expandedCriteria === criterion.id && (
                                <div className="criteria-details">
                                    <InputRow>
                                        <div>
                                            <Label htmlFor={`name-${criterion.id}`}>Nome do Critério:</Label>
                                            <Input
                                                id={`name-${criterion.id}`}
                                                type="text"
                                                value={criterion.name}
                                                onChange={(e) => handleUpdateCriteria(criterion.id, 'name', e.target.value)}
                                                placeholder="Ex: Participação em Aula"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor={`weight-${criterion.id}`}>
                                                Peso (%):
                                                <Tooltip content="O valor deve estar entre 1 e 100">
                                                    <FaInfoCircle style={{ marginLeft: 'var(--space-xs)' }} />
                                                </Tooltip>
                                            </Label>
                                            <Input
                                                id={`weight-${criterion.id}`}
                                                type="number"
                                                min="1"
                                                max="100"
                                                value={criterion.weight}
                                                onChange={(e) => handleUpdateCriteria(criterion.id, 'weight', e.target.value)}
                                            />
                                        </div>
                                    </InputRow>
                                    <div>
                                        <Label htmlFor={`description-${criterion.id}`}>Descrição:</Label>
                                        <TextArea
                                            id={`description-${criterion.id}`}
                                            value={criterion.description || ''}
                                            onChange={(e) => handleUpdateCriteria(criterion.id, 'description', e.target.value)}
                                            placeholder="Descreva como este critério será avaliado..."
                                        />
                                    </div>
                                </div>
                            )}
                        </CriteriaCard>
                    ))
                )}

                <div className="add-criteria-form">
                    <h3>Adicionar Novo Critério</h3>
                    <InputRow>
                        <div>
                            <Label htmlFor="new-criteria-name">Nome do Critério:</Label>
                            <Input
                                id="new-criteria-name"
                                type="text"
                                value={newCriteria.name || ''}
                                onChange={(e) => setNewCriteria({...newCriteria, name: e.target.value})}
                                placeholder="Ex: Trabalho em Equipe"
                            />
                        </div>
                        <div>
                            <Label htmlFor="new-criteria-weight">Peso (%):</Label>
                            <Input
                                id="new-criteria-weight"
                                type="number"
                                min="1"
                                max="100"
                                value={newCriteria.weight || ''}
                                onChange={(e) => setNewCriteria({...newCriteria, weight: Number(e.target.value)})}
                                placeholder="Ex: 25"
                            />
                            {!isWeightValid && (
                                <FormFeedback type="info">
                                    Peso disponível: {100 - totalWeight}%
                                </FormFeedback>
                            )}
                        </div>
                    </InputRow>
                    <div>
                        <Label htmlFor="new-criteria-description">Descrição:</Label>
                        <TextArea
                            id="new-criteria-description"
                            value={newCriteria.description || ''}
                            onChange={(e) => setNewCriteria({...newCriteria, description: e.target.value})}
                            placeholder="Descreva como este critério será avaliado..."
                        />
                    </div>
                    
                    <ActionButton
                        type="button"
                        onClick={handleAddCriteria}
                        disabled={!newCriteria.name || !newCriteria.weight}
                    >
                        <FaPlus /> Adicionar Critério
                    </ActionButton>
                </div>
            </CollapsibleContent>
        </CollapsibleSection>
    );
};

export default EvaluationCriteriaSection;