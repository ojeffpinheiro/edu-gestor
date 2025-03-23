import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

import CollapsibleSection from "../CollapsibleSection";
import styled from "styled-components";
import { Input } from "../../styles/inputs";
import { Button } from "../../styles/buttons";

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
    const [newResource, setNewResource] = React.useState("");

    return (
        <CollapsibleSection title="Recursos Necessários">
            <div>
                {resources.length > 0 ? (
                    <ul>
                        {resources.map((resource, index) => (
                            <li key={index}>
                                {resource.name}
                                <button type="button" onClick={() => removeResource(index)}>
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Nenhum recurso adicionado ainda.</p>
                )}

                <InputRow>
                    <Input
                        type="text"
                        value={newResource}
                        onChange={(e) => setNewResource(e.target.value)}
                        placeholder="Ex: Calculadora, Livro didático"
                    />
                    <Button type="button" onClick={() => { addResource(newResource); setNewResource(""); }} disabled={!newResource.trim()}>
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
