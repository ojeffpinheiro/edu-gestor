import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaTrash, FaEdit, FaGripLines } from "react-icons/fa";
import { Evaluation } from "../../utils/types";
import useEvaluationForm from "../../hooks/useEvaluationForm";
import { Input, InputRow, Label } from "../../styles/inputs";
import { Button } from "../../styles/buttons";
import { CollapsibleContent, CollapsibleHeader } from "../ui/CollapsibleComponents";

import CollapsibleSection from "../CollapsibleSection";
import { EmptyMessage, IconButton, InputContainer, PartControls, PartHeader, PartItem, PartName, PartsList, SectionTitle, WeightBadge } from "./styles";

interface PartsSectionProps {
    evaluation: Evaluation | null;
}

const PartsSection: React.FC<PartsSectionProps> = ({ evaluation }) => {
    const { parts, weights, newPart, removePart, addPart, setNewPart } = useEvaluationForm(evaluation);
    const [partsExpanded, setPartsExpanded] = useState<boolean>(true);
    const [editWeight, setEditWeight] = useState<{id: string, weight: number} | null>(null);
    const [hoveredPart, setHoveredPart] = useState<string | null>(null);

    const handleWeightChange = (id: string, weight: number) => {
        // Aqui precisaria implementar uma função para atualizar o peso no hook useEvaluationForm
        // Como não temos acesso a esse hook, apenas simulamos o comportamento
        console.log(`Peso da parte ${id} atualizado para ${weight}`);
        setEditWeight(null);
    };

    return (
        <CollapsibleSection title="Partes da avaliação">
            <CollapsibleHeader 
                title="Partes da Avaliação"
                icon={partsExpanded ? <FaChevronUp /> : <FaChevronDown />}
                onClick={() => setPartsExpanded(!partsExpanded)} 
            />

            <CollapsibleContent isOpen={partsExpanded}>
                <div>
                    <SectionTitle>Componentes da Avaliação</SectionTitle>
                    
                    {parts.length > 0 ? (
                        <PartsList>
                            {parts.map((part) => (
                                <PartItem 
                                    key={part.id}
                                    onMouseEnter={() => setHoveredPart(part.id)}
                                    onMouseLeave={() => setHoveredPart(null)}
                                >
                                    <PartHeader>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                            <FaGripLines color="var(--color-text-third)" />
                                            <PartName>{part.name}</PartName>
                                        </div>
                                        <PartControls>
                                            {editWeight && editWeight.id === part.id ? (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        max="10"
                                                        value={editWeight.weight}
                                                        onChange={(e) => setEditWeight({ 
                                                            ...editWeight, 
                                                            weight: parseInt(e.target.value) 
                                                        })}
                                                        style={{ width: '60px' }}
                                                    />
                                                    <Button 
                                                        type="button"
                                                        variant="success"
                                                        onClick={() => handleWeightChange(part.id, editWeight.weight)}
                                                    >
                                                        OK
                                                    </Button>
                                                </div>
                                            ) : (
                                                <WeightBadge 
                                                    onClick={() => setEditWeight({ 
                                                        id: part.id, 
                                                        weight: weights[part.id] || part.weight || 1 
                                                    })}
                                                >
                                                    Peso: {weights[part.id] || part.weight || 1}
                                                </WeightBadge>
                                            )}
                                            
                                            <IconButton
                                                type="button"
                                                onClick={() => removePart(part.id)}
                                                aria-label={`Remover parte ${part.name}`}
                                                title="Remover parte"
                                            >
                                                <FaTrash />
                                            </IconButton>
                                        </PartControls>
                                    </PartHeader>
                                </PartItem>
                            ))}
                        </PartsList>
                    ) : (
                        <EmptyMessage>
                            <div style={{ marginBottom: 'var(--space-sm)' }}>
                                Nenhuma parte adicionada ainda.
                            </div>
                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-third)' }}>
                                Adicione componentes como "Questões Objetivas", "Redação", etc.
                            </div>
                        </EmptyMessage>
                    )}

                    <InputContainer>
                        <Label htmlFor="novaParte">Nova parte da avaliação</Label>
                        <InputRow>
                            <Input
                                id="novaParte"
                                type="text"
                                value={newPart}
                                onChange={(e) => setNewPart(e.target.value)}
                                placeholder="Ex: Questões Objetivas, Redação"
                                aria-label="Nova parte"
                            />
                            <Button
                                type="button"
                                onClick={addPart}
                                disabled={!newPart.trim()}
                                aria-label="Adicionar parte"
                            >
                                <FaPlus /> Adicionar
                            </Button>
                        </InputRow>
                    </InputContainer>
                </div>
            </CollapsibleContent>
        </CollapsibleSection>
    );
}

export default PartsSection;