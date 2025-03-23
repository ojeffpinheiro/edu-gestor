import React, { useState } from "react";
import { Evaluation, EvaluationType } from "../../utils/types";

import styled from "styled-components";
import { Input, Label, Select, TextArea, InputGroup } from "../../styles/inputs";
import useEvaluationForm from "../../hooks/useEvaluationForm";


interface BasicInfoSectionProps {
    evaluationData: Evaluation | null;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ evaluationData, handleInputChange }) => {
    const { initializeEmptyEvaluation } = useEvaluationForm(evaluationData);
    const formData = initializeEmptyEvaluation();

    return (
        <FormGrid>
            {/* Coluna 1 - Informações básicas */}
            <FormSection>
                <InputGroup>
                    <Label htmlFor="name">Nome da Avaliação *</Label>
                    <Input type="text" id="name" name="name" placeholder="Ex: Avaliação Bimestral de Matemática"
                        value={formData.name} onChange={handleInputChange} aria-required="true" />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="school">Escola *</Label>
                    <Input type="text" id="school" name="school" placeholder="Ex: Escola Municipal João da Silva"
                        value={formData.school} onChange={handleInputChange} aria-required="true" />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="trimester">Trimestre *</Label>
                    <Select id="trimester" name="trimester" value={formData.trimester} onChange={handleInputChange}
                        aria-required="true">
                        <option value="1">1º Trimestre</option>
                        <option value="2">2º Trimestre</option>
                        <option value="3">3º Trimestre</option>
                    </Select>
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="series">Série *</Label>
                    <Input type="text" id="series" name="series" placeholder="Ex: 5º Ano" value={formData.series}
                        onChange={handleInputChange} aria-required="true" />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="class">Turma *</Label>
                    <Input type="text" id="class" name="class" placeholder="Ex: Turma A" value={formData.class}
                        onChange={handleInputChange} aria-required="true" />
                </InputGroup>
            </FormSection>

            {/* Coluna 2 - Informações da disciplina */}
            <FormSection>
                <InputGroup>
                    <Label htmlFor="subject">Disciplina *</Label>
                    <Input type="text" id="subject" name="subject" placeholder="Ex: Matemática" value={formData.subject}
                        onChange={handleInputChange} aria-required="true" />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="record">Registro</Label>
                    <Input type="text" id="record" name="record" placeholder="Ex: 2023/MT/001" value={formData.record}
                        onChange={handleInputChange} />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="applicationDate">Data de Aplicação</Label>
                    <Input
                        type="date"
                        id="applicationDate"
                        name="applicationDate"
                        value={formData.applicationDate instanceof Date 
                                ? formData.applicationDate.toISOString().split('T')[0] 
                                : formData.applicationDate}
                        onChange={handleInputChange} />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="type">Tipo de Avaliação</Label>
                    <Select id="type" name="type" value={formData.type} onChange={handleInputChange}>
                        <option value={EvaluationType.PROVA}>Prova</option>
                        <option value={EvaluationType.TRABALHO}>Trabalho</option>
                        <option value={EvaluationType.APRESENTACAO}>Apresentação</option>
                        <option value={EvaluationType.PROJETO}>Projeto</option>
                        <option value={EvaluationType.OUTRO}>Outro</option>
                    </Select>
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="passingGrade">Nota de Aprovação</Label>
                    <Input type="number" id="passingGrade" name="passingGrade" min="0" max="10" step="0.1"
                        value={formData.passingGrade} onChange={handleInputChange} />
                </InputGroup>
            </FormSection>

            {/* Coluna 3 - Objetivo e conteúdo */}
            <FormSection>
                <InputGroup>
                    <Label htmlFor="objective">Objetivo *</Label>
                    <TextArea id="objective" name="objective" placeholder="Descreva o objetivo principal desta avaliação"
                        value={formData.objective} onChange={handleInputChange} rows={4} aria-required="true" />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="contents">Conteúdo *</Label>
                    <TextArea id="contents" name="contents" placeholder="Liste os conteúdos que serão avaliados"
                        value={formData.contents} onChange={handleInputChange} rows={4} aria-required="true" />
                </InputGroup>
            </FormSection>
        </FormGrid>
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

export default BasicInfoSection;