import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaPlus, FaTrash } from "react-icons/fa";

import CollapsibleSection from "../CollapsibleSection";

import { CollapsibleHeader } from "../ui/CollapsibleComponents";
import { AddButton, DeleteButton, EmptyMessage, FeedbackMessage, HelpText, InputContainer, ResourceItem, ResourceName, ResourcesContainer, ResourcesContent, ResourcesList, StyledInput } from "./styles";

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
    const [resourcesExpanded, setResourcesExpanded] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ type: "", message: "" });

    const handleAddResource = () => {
        if (!newResource.trim()) return;
        
        setIsSubmitting(true);
        
        try {
            addResource(newResource);
            setNewResource("");
            setFeedback({ 
                type: "success", 
                message: `Recurso "${newResource}" adicionado com sucesso!` 
            });
        } catch (error) {
            setFeedback({ 
                type: "error", 
                message: "Erro ao adicionar recurso. Tente novamente." 
            });
        } finally {
            setIsSubmitting(false);
            
            // Clear feedback after 3 seconds
            setTimeout(() => {
                setFeedback({ type: "", message: "" });
            }, 3000);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newResource.trim()) {
            handleAddResource();
        }
    };

    const handleRemoveResource = (index: number, resourceName: string) => {
        removeResource(index);
        setFeedback({ 
            type: "success", 
            message: `Recurso "${resourceName}" removido.` 
        });
        
        // Clear feedback after 3 seconds
        setTimeout(() => {
            setFeedback({ type: "", message: "" });
        }, 3000);
    };

    return (
        <ResourcesContainer>
            <CollapsibleSection title="Recursos Necessários">
                <CollapsibleHeader
                    title="Recursos Necessários"
                    icon={resourcesExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    onClick={() => setResourcesExpanded(!resourcesExpanded)} />

                {resourcesExpanded && (
                    <ResourcesContent>
                        <ResourcesList>
                            {resources.length > 0 ? (
                                resources.map((resource, index) => (
                                    <ResourceItem key={index} data-testid={`resource-item-${index}`}>
                                        <ResourceName>{resource.name}</ResourceName>
                                        <DeleteButton
                                            type="button"
                                            aria-label={`Remover recurso ${resource.name}`}
                                            onClick={() => handleRemoveResource(index, resource.name)}
                                            title="Remover recurso">
                                            <FaTrash />
                                        </DeleteButton>
                                    </ResourceItem>
                                ))
                            ) : (
                                <EmptyMessage>
                                    Nenhum recurso adicionado ainda. Adicione recursos necessários para esta atividade.
                                </EmptyMessage>
                            )}
                        </ResourcesList>

                        <InputContainer>
                            <StyledInput
                                type="text"
                                aria-label="Novo recurso"
                                value={newResource}
                                onChange={(e) => setNewResource(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Digite um recurso necessário..."
                                disabled={isSubmitting}
                            />
                            <AddButton
                                type="button"
                                aria-label="Adicionar recurso"
                                onClick={handleAddResource}
                                disabled={!newResource.trim() || isSubmitting}
                                variant="success"
                            >
                                <FaPlus /> Adicionar
                            </AddButton>
                        </InputContainer>

                        {feedback.message && (
                            <FeedbackMessage type={feedback.type}>
                                {feedback.message}
                            </FeedbackMessage>
                        )}

                        <HelpText>
                            Adicione todos os recursos necessários para realizar esta atividade, como materiais, 
                            equipamentos ou ferramentas.
                        </HelpText>
                    </ResourcesContent>
                )}
            </CollapsibleSection>
        </ResourcesContainer>
    );
};

export default ResourcesSection;