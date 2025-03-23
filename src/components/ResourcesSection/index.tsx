import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaTrash } from "react-icons/fa";
import styled from "styled-components";

import CollapsibleSection from "../CollapsibleSection";
import { Input } from "../../styles/inputs";
import { Button } from "../../styles/buttons";
import { CollapsibleHeader } from "../ui/CollapsibleComponents";

interface Resource {
    id?: number;
    name: string;
    quantity?: number;
}

interface ResourcesSectionProps {
    resources: Resource[];
    addResource: (resource: string) => void;
    removeResource: (index: number) => void;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ resources, addResource, removeResource }) => {
    const [newResource, setNewResource] = useState("");

    // Estado para recursos expandidos
    const [resourcesExpanded, setResourcesExpanded] = useState<boolean>(true);

    return (
        <CollapsibleSection title="Recursos Necessários">
            <CollapsibleHeader
                title="Recursos Necessários"
                icon={resourcesExpanded ? <FaChevronUp /> : <FaChevronDown />}
                onClick={() => setResourcesExpanded(!resourcesExpanded)} />

            <div>
                {resources.length > 0 ? (
                    <ul className="resource-list" >
                        {resources.map((resource, index) => (
                            <li key={index} className="resource-item" >
                                {resource.name}
                                <button
                                    type="button"
                                    className="delete-button"
                                    aria-label={`Remover recurso ${resource.name}`}
                                    onClick={() => removeResource(index)}>
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="empty-message" >Nenhum recurso adicionado ainda.</p>
                )}

                <InputRow>
                    <Input
                        type="text"
                        aria-label="Novo recurso"
                        value={newResource}
                        onChange={(e) => setNewResource(e.target.value)}
                        placeholder="Ex: Calculadora, Livro didático"
                    />
                    <Button
                        type="button"
                        aria-label="Adicionar recurso"
                        onClick={() => { addResource(newResource); setNewResource(""); }}
                        disabled={!newResource.trim()}>
                        <FaPlus /> Adicionar
                    </Button>
                </InputRow>
            </div>
        </CollapsibleSection>
    );
};

const InputRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-md, 1rem);
`;

export default ResourcesSection;
