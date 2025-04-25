import React, { useState, useEffect, useCallback } from "react";
import { FaInfoCircle } from "react-icons/fa";

import useEvaluationForm from "../../../../hooks/useEvaluationForm";

import { Input, InputRow, Label, Select, TextArea } from "../../../../styles/inputs";

import { CollapsibleContent } from "../../../ui/CollapsibleComponents";
import { Tooltip } from "../../../ui/Tooltip";

import CollapsibleSection from "../../CollapsibleSection";
import { Evaluation } from "../../../../utils/types/AssessmentEvaluation";
import { InputGroup } from "../../../../styles/formControls";

interface CalculationSectionProps {
    evaluationData: Evaluation | null;
    updateCalculationMethod: (method: string) => void;
}

const CalculationSection: React.FC<CalculationSectionProps> = ({ evaluationData, updateCalculationMethod }) => {
    // Estado para método de cálculo
    const [calculationMethod, setCalculationMethod] = useState<string>("sum");
    // Estado para pesos das partes
    const [weights, setWeights] = useState<{ [key: string]: number }>({});

    const [customFormula, setCustomFormula] = useState<string>("");

    const { parts } = useEvaluationForm(evaluationData);
    
    const [calculationMethodExpanded, setCalculationMethodExpanded] = useState<boolean>(true);
    const [isWeightValid, setIsWeightValid] = useState<boolean>(true);
    const [totalWeight, setTotalWeight] = useState<number>(0);

    // Recalculate total weight whenever weights change
    useEffect(() => {
        const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
        setTotalWeight(total);
        setIsWeightValid(Math.abs(total - 10) < 0.1); // Allow small floating point discrepancies
    }, [weights]);

    const updateWeight = useCallback((partId: string, weight: number) => {
        setWeights(prev => ({ ...prev, [partId]: weight }));
    }, []);

    // Calculation method descriptions for better user understanding
    const methodDescriptions = {
        sum: "Soma direta de todas as notas das partes, sem divisor.",
        average: "Média aritmética: soma das notas dividida pelo número de partes.",
        weighted: "Cada parte tem um peso específico (de 0 a 10) na nota final.",
        custom: "Define sua própria fórmula matemática para calcular a nota final."
    };

    return (
        <CollapsibleSection title="Cálculo">
            <CollapsibleContent isOpen={calculationMethodExpanded}>
                <div className="p-4 bg-gray-50 rounded-lg mb-4">
                    <InputGroup className="mb-2">
                        <Label htmlFor="calculation-method" className="font-medium">
                            Escolha o método de cálculo:
                        </Label>
                        <div className="flex items-center">
                            <Select
                                id="calculation-method"
                                value={calculationMethod}
                                onChange={(e) => setCalculationMethod(e.target.value)}
                                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="sum">Soma Simples</option>
                                <option value="average">Média Simples</option>
                                <option value="weighted">Média Ponderada</option>
                                <option value="custom">Fórmula Personalizada</option>
                            </Select>
                            <Tooltip content={methodDescriptions[calculationMethod as keyof typeof methodDescriptions]}>
                                <FaInfoCircle className="ml-2 text-blue-500" />
                            </Tooltip>
                        </div>
                    </InputGroup>
                    
                    <p className="text-sm text-gray-600 mt-1 mb-3">
                        {methodDescriptions[calculationMethod as keyof typeof methodDescriptions]}
                    </p>
                </div>

                {calculationMethod === "weighted" && parts.length > 0 && (
                    <div className="weights-container bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium">Pesos das Partes</h4>
                            <div className={`weight-total px-3 py-1 rounded-full text-sm font-medium ${isWeightValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                Total: {totalWeight.toFixed(1)}/10
                            </div>
                        </div>
                        
                        <div className="grid gap-3">
                            {parts.map((part) => (
                                <InputRow key={part.id} className="flex items-center">
                                    <Label htmlFor={`weight-${part.id}`} className="w-1/3 text-gray-700">
                                        {part.name}:
                                    </Label>
                                    <div className="w-2/3">
                                        <Input
                                            id={`weight-${part.id}`}
                                            type="number"
                                            min="0"
                                            max="10"
                                            step="0.1"
                                            value={weights[part.id] || 1}
                                            onChange={(e) => updateWeight(part.id, Number(e.target.value))}
                                            className="rounded-md w-full"
                                        />
                                        <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                                            <div 
                                                className="bg-blue-600 h-1.5 rounded-full" 
                                                style={{ width: `${(weights[part.id] || 0) * 10}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </InputRow>
                            ))}
                        </div>
                        
                        {!isWeightValid && (
                            <p className="text-red-500 text-sm mt-3">
                                O total dos pesos deve ser igual a 10.
                            </p>
                        )}
                    </div>
                )}

                {calculationMethod === "custom" && (
                    <div className="custom-formula-container bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <Label htmlFor="custom-formula" className="font-medium">Fórmula Personalizada:</Label>
                        <TextArea
                            id="custom-formula"
                            value={customFormula}
                            onChange={(e) => setCustomFormula(e.target.value)}
                            rows={3}
                            placeholder="Ex: (P1 * 0.3) + (P2 * 0.7)"
                            className="w-full rounded-md border-gray-300 shadow-sm mt-2 font-mono"
                        />
                        
                        <div className="formula-help mt-3 bg-blue-50 p-3 rounded-md text-sm">
                            <h5 className="font-medium text-blue-700 mb-1">Como usar a fórmula personalizada:</h5>
                            <ul className="list-disc pl-5 text-blue-800">
                                <li>Use <code className="bg-blue-100 px-1 rounded">P1, P2, P3...</code> para representar as partes da avaliação</li>
                                <li>Operadores disponíveis: <code className="bg-blue-100 px-1 rounded">+, -, *, /, (, )</code></li>
                                <li>Exemplo: <code className="bg-blue-100 px-1 rounded">(P1 * 0.4) + (P2 * 0.6)</code></li>
                            </ul>
                            
                            <div className="mt-2 pt-2 border-t border-blue-200">
                                <strong>Partes disponíveis:</strong> 
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {parts.map((part, index) => (
                                        <span key={part.id} className="inline-block bg-blue-200 text-blue-800 px-2 py-0.5 rounded text-xs">
                                            P{index + 1}: {part.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CollapsibleContent>
        </CollapsibleSection>
    );
};

export default CalculationSection;