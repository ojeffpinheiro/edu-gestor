import React from "react";
import { Evaluation } from "../../utils/types";

import CollapsibleSection from "../CollapsibleSection";
import styled from "styled-components";
import { Input, Label, TextArea } from "../../styles/inputs";


interface BasicInfoSectionProps {
    evaluationData: Evaluation;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ evaluationData, handleInputChange }) => {
    return (
        <CollapsibleSection title="Definições Básicas">
            <FormGrid>
                <FormSection>
                    <InputGroup>
                        <Label htmlFor="name">Nome da Avaliação *</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Ex: Avaliação Bimestral de Matemática"
                            value={evaluationData.name}
                            onChange={handleInputChange}
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label htmlFor="school">Escola *</Label>
                        <Input
                            type="text"
                            id="school"
                            name="school"
                            placeholder="Ex: Escola Municipal João da Silva"
                            value={evaluationData.school}
                            onChange={handleInputChange}
                        />
                    </InputGroup>
                </FormSection>

                <FormSection>
                    <InputGroup>
                        <Label htmlFor="objective">Objetivo *</Label>
                        <TextArea
                            id="objective"
                            name="objective"
                            placeholder="Descreva o objetivo principal desta avaliação"
                            value={evaluationData.objective}
                            onChange={handleInputChange}
                            rows={4}
                        />
                    </InputGroup>
                </FormSection>
            </FormGrid>
        </CollapsibleSection>
    );
};

const FormGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-lg, 1.5rem);
    
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-md, 1rem);
`;

const InputGroup = styled.div`
    margin-bottom: var(--space-md, 1rem);
    
    &:last-child {
        margin-bottom: 0;
    }
    
    &.mt-6 {
        margin-top: var(--space-2xl, 3rem);
    }
    
    .space-y-2 {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm, 0.5rem);
    }
    
    .flex.items-center {
        display: flex;
        align-items: center;
        gap: var(--space-sm, 0.5rem);
    }
    
    .ml-2 {
        margin-left: var(--space-sm, 0.5rem);
    }
`;

export default BasicInfoSection;