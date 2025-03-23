import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaTrash } from "react-icons/fa";

import { Evaluation } from "../../utils/types";

import useEvaluationForm from "../../hooks/useEvaluationForm";

import CollapsibleSection from "../CollapsibleSection";

import { Input, InputRow } from "../../styles/inputs";
import { Button } from "../../styles/buttons";
import { CollapsibleContent, CollapsibleHeader } from "../ui/CollapsibleComponents";
import { Badge } from "../../utils/CriteriaCard";


interface PartsSectionProps {
    evaluation: Evaluation | null;
}

const PartsSection: React.FC<PartsSectionProps> = ({ evaluation }) => {
    const { parts, weights, newPart, removePart, addPart, setNewPart } = useEvaluationForm(evaluation)
    // Estado para partes expandidas
    const [partsExpanded, setPartsExpanded] = useState<boolean>(true);

    return (
        <CollapsibleSection title="Partes da avaliação">
            <CollapsibleHeader 
                title="Partes da Avaliação"
                icon={partsExpanded ? <FaChevronUp /> : <FaChevronDown />}
                onClick={() => setPartsExpanded(!partsExpanded)} />

           <CollapsibleContent isOpen={partsExpanded}>
               <div>
                   {/* Lista de partes */}
                   {parts.length > 0 ? (
                       <ul className="parts-list">
                           {parts.map((part) => (
                               <li key={part.id} className="part-item">
                                   <div className="part-header">
                                       <span className="part-name">{part.name}</span>
                                       <div className="part-controls">
                                           <Badge>{`Peso: ${weights[part.id] || part.weight || 1}`}</Badge>
                                           <button
                                               type="button"
                                               onClick={() => removePart(part.id)}
                                               className="delete-button"
                                               aria-label={`Remover parte ${part.name}`}
                                           >
                                               <FaTrash />
                                           </button>
                                       </div>
                                   </div>
                               </li>
                           ))}
                       </ul>
                   ) : (
                       <p className="empty-message">Nenhuma parte adicionada ainda.</p>
                   )}

                   {/* Adicionar nova parte */}
                   <InputRow>
                       <Input
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
               </div>
           </CollapsibleContent>
        </CollapsibleSection>
    );
}

export default PartsSection;