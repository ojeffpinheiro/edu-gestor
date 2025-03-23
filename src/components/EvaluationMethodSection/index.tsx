import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaTrash } from "react-icons/fa";

import { Evaluation, RubricOrConcept } from "../../utils/types";

import CollapsibleSection from "../CollapsibleSection";

import { Button } from "../../styles/buttons";
import { Input, InputRow, Label, Select } from "../../styles/inputs";
import { InputGroup } from "../modals/EvaluationForm/styles";
import useEvaluationForm from "../../hooks/useEvaluationForm";
import { CollapsibleContent, CollapsibleHeader } from "../ui/CollapsibleComponents";

interface EvaluationMethodSectionProps {
    evaluation: Evaluation | null;
}

const EvaluationMethodSection: React.FC<EvaluationMethodSectionProps> = ({ evaluation }) => {
    const { 
        evaluationMethod, setEvaluationMethod, 
        numericRange, setNumericRange, 
        removeConceptOrRubric, 
        newConceptOrRubric, 
        setNewConceptOrRubric, 
        addConceptOrRubric,
        rubrics,
        setRubrics,
     } = useEvaluationForm(evaluation);
    // Estado para método de avaliação expandido
    const [evaluationMethodExpanded, setEvaluationMethodExpanded] = useState<boolean>(true);

    // Estado para conceitos expandidos
    const [conceptsExpanded, setConceptsExpanded] = useState<boolean>(false);

    // Estado para rubricas expandidas
    const [rubricsExpanded, setRubricsExpanded] = useState<boolean>(false);

    // Estado para conceitos
    const [concepts, setConcepts] = useState<RubricOrConcept[]>([
        { id: "1", name: "A", description: "Excelente" },
        { id: "2", name: "B", description: "Bom" },
        { id: "3", name: "C", description: "Regular" },
        { id: "4", name: "D", description: "Insuficiente" }
    ]);

    return (
        <CollapsibleSection title="Método de avaliação">
            <CollapsibleHeader 
                title="Forma de Avaliação"
                icon={evaluationMethodExpanded ? <FaChevronUp /> : <FaChevronDown />}
                onClick={() => setEvaluationMethodExpanded(!evaluationMethodExpanded)} />

            <CollapsibleContent isOpen={evaluationMethodExpanded}>
                <InputGroup>
                    <Label htmlFor="evaluation-method">Método de Avaliação:</Label>
                    <Select
                        id="evaluation-method"
                        value={evaluationMethod}
                        onChange={(e) => setEvaluationMethod(e.target.value)}
                    >
                        <option value="numeric">Numérica (0-10)</option>
                        <option value="concepts">Conceitos (A, B, C, D)</option>
                        <option value="rubrics">Rubricas</option>
                        <option value="posNeg">Positivo/Negativo</option>
                    </Select>
                </InputGroup>

                {/* Configurações específicas para cada método de avaliação */}
                {evaluationMethod === "numeric" && (
                    <InputRow>
                        <InputGroup>
                            <Label htmlFor="min-grade">Nota Mínima:</Label>
                            <Input
                                id="min-grade"
                                type="number"
                                value={numericRange.min}
                                onChange={(e) => setNumericRange({ ...numericRange, min: Number(e.target.value) })}
                                min="0"
                                max={numericRange.max - 1}
                                step="0.1"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label htmlFor="max-grade">Nota Máxima:</Label>
                            <Input
                                id="max-grade"
                                type="number"
                                value={numericRange.max}
                                onChange={(e) => setNumericRange({ ...numericRange, max: Number(e.target.value) })}
                                min={numericRange.min + 1}
                                step="0.1"
                            />
                        </InputGroup>
                    </InputRow>
                )}

                {evaluationMethod === "concepts" && (
                    <CollapsibleSection title="Conceitos" >
                        <CollapsibleHeader 
                            title="Conceitos"
                            onClick={() => setConceptsExpanded(!conceptsExpanded)}
                            icon={conceptsExpanded ? <FaChevronUp /> : <FaChevronDown />} />

                        <CollapsibleContent isOpen={conceptsExpanded}>
                            {/* Lista de conceitos */}
                            {concepts.map((concept) => (
                                <div key={concept.id} className="concept-item">
                                    <InputRow>
                                        <InputGroup className="concept-name">
                                            <Label>Conceito:</Label>
                                            <Input
                                                type="text"
                                                value={concept.name}
                                                onChange={(e) => {
                                                    setConcepts(concepts.map(c =>
                                                        c.id === concept.id ? { ...c, name: e.target.value } : c
                                                    ));
                                                }}
                                            />
                                        </InputGroup>
                                        <InputGroup className="concept-description">
                                            <Label>Descrição:</Label>
                                            <Input
                                                type="text"
                                                value={concept.description}
                                                onChange={(e) => {
                                                    setConcepts(concepts.map(c =>
                                                        c.id === concept.id ? { ...c, description: e.target.value } : c
                                                    ));
                                                }}
                                            />
                                        </InputGroup>
                                        <button
                                            type="button"
                                            onClick={() => removeConceptOrRubric(concept.id)}
                                            className="delete-button"
                                            aria-label={`Remover conceito ${concept.name}`}
                                            disabled={concepts.length <= 1}
                                        >
                                            <FaTrash />
                                        </button>
                                    </InputRow>
                                </div>
                            ))}

                            {/* Adicionar novo conceito */}
                            <div className="add-concept-container">
                                <InputRow>
                                    <InputGroup>
                                        <Input
                                            type="text"
                                            value={newConceptOrRubric.name}
                                            onChange={(e) => setNewConceptOrRubric({
                                                ...newConceptOrRubric,
                                                name: e.target.value
                                            })}
                                            placeholder="Conceito (ex: A)"
                                        />
                                    </InputGroup>
                                    <InputGroup>
                                        <Input
                                            type="text"
                                            value={newConceptOrRubric.description}
                                            onChange={(e) => setNewConceptOrRubric({
                                                ...newConceptOrRubric,
                                                description: e.target.value
                                            })}
                                            placeholder="Descrição (ex: Excelente)"
                                        />
                                    </InputGroup>
                                    <Button
                                        type="button"
                                        onClick={addConceptOrRubric}
                                        disabled={!newConceptOrRubric.name.trim()}
                                    >
                                        <FaPlus /> Adicionar
                                    </Button>
                                </InputRow>
                            </div>
                        </CollapsibleContent>
                    </CollapsibleSection>
                )}

                {evaluationMethod === "rubrics" && (
                    <CollapsibleSection title="Rúbricas" >
                        <CollapsibleHeader
                            title="Rúbricas"
                            onClick={() => setRubricsExpanded(!rubricsExpanded)}
                            icon={rubricsExpanded ? <FaChevronUp /> : <FaChevronDown />} />

                        <CollapsibleContent isOpen={rubricsExpanded}>
                            {/* Lista de rubricas */}
                            {rubrics.map((rubric) => (
                                <div key={rubric.id} className="rubric-item">
                                    <InputRow>
                                        <InputGroup className="rubric-name">
                                            <Label>Rubrica:</Label>
                                            <Input
                                                type="text"
                                                value={rubric.name}
                                                onChange={(e) => {
                                                    setRubrics(rubrics.map(r =>
                                                        r.id === rubric.id ? { ...r, name: e.target.value } : r
                                                    ));
                                                }}
                                            />
                                        </InputGroup>
                                        <InputGroup className="rubric-description">
                                            <Label>Descrição:</Label>
                                            <Input
                                                type="text"
                                                value={rubric.description}
                                                onChange={(e) => {
                                                    setRubrics(rubrics.map(r =>
                                                        r.id === rubric.id ? { ...r, description: e.target.value } : r
                                                    ));
                                                }}
                                            />
                                        </InputGroup>
                                        <button
                                            type="button"
                                            onClick={() => removeConceptOrRubric(rubric.id)}
                                            className="delete-button"
                                            aria-label={`Remover rubrica ${rubric.name}`}
                                            disabled={rubrics.length <= 1}
                                        >
                                            <FaTrash />
                                        </button>
                                    </InputRow>
                                </div>
                            ))}

                            {/* Adicionar nova rubrica */}
                            <div className="add-rubric-container">
                                <InputRow>
                                    <InputGroup>
                                        <Input
                                            type="text"
                                            value={newConceptOrRubric.name}
                                            onChange={(e) => setNewConceptOrRubric({
                                                ...newConceptOrRubric,
                                                name: e.target.value
                                            })}
                                            placeholder="Rubrica (ex: Domínio Completo)"
                                        />
                                    </InputGroup>
                                    <InputGroup>
                                        <Input
                                            type="text"
                                            value={newConceptOrRubric.description}
                                            onChange={(e) => setNewConceptOrRubric({
                                                ...newConceptOrRubric,
                                                description: e.target.value
                                            })}
                                            placeholder="Descrição"
                                        />
                                    </InputGroup>
                                    <Button
                                        type="button"
                                        onClick={addConceptOrRubric}
                                        disabled={!newConceptOrRubric.name.trim()}
                                    >
                                        <FaPlus /> Adicionar
                                    </Button>
                                </InputRow>
                            </div>
                        </CollapsibleContent>
                    </CollapsibleSection>
                )}
            </CollapsibleContent>
        </CollapsibleSection>
    )
}

export default EvaluationMethodSection;