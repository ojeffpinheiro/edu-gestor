
import React, { useState } from "react";
import { Evaluation } from "../../utils/types";
import CollapsibleSection from "../CollapsibleSection";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { InputGroup } from "../modals/EvaluationForm/styles";
import { Input, InputRow, Label, Select, TextArea } from "../../styles/inputs";
import useEvaluationForm from "../../hooks/useEvaluationForm";
import { CollapsibleContent, CollapsibleHeader } from "../ui/CollapsibleComponents";

interface CalculationSectionProps {
    evaluationData: Evaluation | null;
}

const CalculationSection: React.FC<CalculationSectionProps> = ({ evaluationData }) => {
    const { calculationMethod, setCalculationMethod, parts, weights, updateWeight, customFormula, setCustomFormula } = useEvaluationForm(evaluationData)
    // Estado para método de cálculo expandido
    const [calculationMethodExpanded, setCalculationMethodExpanded] = useState<boolean>(true);

    return (
        <CollapsibleSection title="Calculo" >
            <CollapsibleHeader
                title="Método de cálculo"
                onClick={() => setCalculationMethodExpanded(!calculationMethodExpanded)}
                icon={calculationMethodExpanded ? <FaChevronUp /> : <FaChevronDown />}
            />

            <CollapsibleContent isOpen={calculationMethodExpanded}>
                <InputGroup>
                    <Label htmlFor="calculation-method">Cálculo:</Label>
                    <Select
                        id="calculation-method"
                        value={calculationMethod}
                        onChange={(e) => setCalculationMethod(e.target.value)}
                    >
                        <option value="sum">Soma Simples</option>
                        <option value="average">Média Simples</option>
                        <option value="weighted">Média Ponderada</option>
                        <option value="custom">Fórmula Personalizada</option>
                    </Select>
                </InputGroup>

                {calculationMethod === "weighted" && parts.length > 0 && (
                    <div className="weights-container">
                        <h4>Pesos das Partes (Total: 10)</h4>
                        {parts.map((part) => (
                            <InputRow key={part.id}>
                                <Label htmlFor={`weight-${part.id}`}>{part.name}:</Label>
                                <Input
                                    id={`weight-${part.id}`}
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    value={weights[part.id] || 1}
                                    onChange={(e) => updateWeight(part.id, Number(e.target.value))}
                                />
                            </InputRow>
                        ))}
                        <div className="weight-total">
                            <strong>Total:</strong> {Object.values(weights).reduce((sum, weight) => sum + weight, 0).toFixed(1)}
                        </div>
                    </div>
                )}

                {calculationMethod === "custom" && (
                    <div className="custom-formula-container">
                        <Label htmlFor="custom-formula">Fórmula Personalizada:</Label>
                        <TextArea
                            id="custom-formula"
                            value={customFormula}
                            onChange={(e) => setCustomFormula(e.target.value)}
                            rows={3}
                            placeholder="Ex: (P1 * 0.3) + (P2 * 0.7)"
                        />
                        <p className="formula-help">
                            Use identificadores de partes como P1, P2, etc. para referir-se às partes da avaliação.
                        </p>
                    </div>
                )}
            </CollapsibleContent>
        </CollapsibleSection>
    );
};

export default CalculationSection;