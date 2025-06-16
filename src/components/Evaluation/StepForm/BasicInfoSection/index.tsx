import React, { useState } from "react";
import { FiInfo, FiCalendar, FiBook, FiClipboard } from "react-icons/fi";

import { initializeEmptyEvaluation } from "../../../../hooks/useEvaluationForm";

import { Label, StyledInputGroup } from "../../../../styles/inputs";
import { 
    Container, 
    ErrorMessage, 
    FormSection, 
    IconWrapper, 
    InputWithIcon, 
    RequiredFieldsNote,
    SectionTitle, 
    StyledInput,
    StyledSelect, 
    StyledTextArea
 } from './styles'
import { Evaluation, EvaluationType } from "../../../../utils/types/AssessmentEvaluation";
import { FormGrid, Grid2Columns, SectionHeader } from "../../../../styles/layoutUtils";

interface BasicInfoSectionProps {
    evaluationData: Evaluation | null;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ evaluationData, handleInputChange }) => {
    const formData = initializeEmptyEvaluation();
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Verificar se campo obrigatório foi preenchido
    const isRequired = (fieldName: string) => {
        const requiredFields = ["name", "school", "trimester", "series", "class", "subject", "objective", "contents"];
        return requiredFields.includes(fieldName);
    };

    // Verificar se campo está válido
    const isValid = (fieldName: string) => {
        if (!isRequired(fieldName)) return true;
        return formData[fieldName as keyof Evaluation] ? true : false;
    };

    // Manipular o evento de perda de foco para marcar campo como tocado
    const handleBlur = (fieldName: string) => {
        setTouched(prev => ({
            ...prev,
            [fieldName]: true
        }));
    };

    return (
        <Container>
            <SectionTitle>
                <FiClipboard size={20} />
                <h2>Informações da Avaliação</h2>
            </SectionTitle>

            <FormGrid>
                {/* Coluna 1 - Informações básicas */}
                <FormSection>
                    <SectionHeader>
                        <FiInfo size={18} />
                        <h3>Dados Básicos</h3>
                    </SectionHeader>

                    <StyledInputGroup>
                        <Label htmlFor="name">Nome da Avaliação *</Label>
                        <StyledInput 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Ex: Avaliação Bimestral de Matemática"
                            value={formData.name} 
                            onChange={handleInputChange} 
                            onBlur={() => handleBlur("name")}
                            isValid={!touched["name"] || isValid("name")}
                            aria-required="true" 
                        />
                        {touched["name"] && !isValid("name") && (
                            <ErrorMessage>Campo obrigatório</ErrorMessage>
                        )}
                    </StyledInputGroup>

                    <StyledInputGroup>
                        <Label htmlFor="school">Escola *</Label>
                        <StyledInput 
                            type="text" 
                            id="school" 
                            name="school" 
                            placeholder="Ex: Escola Municipal João da Silva"
                            value={formData.school} 
                            onChange={handleInputChange} 
                            onBlur={() => handleBlur("school")}
                            isValid={!touched["school"] || isValid("school")}
                            aria-required="true" 
                        />
                        {touched["school"] && !isValid("school") && (
                            <ErrorMessage>Campo obrigatório</ErrorMessage>
                        )}
                    </StyledInputGroup>

                    <Grid2Columns>
                        <StyledInputGroup>
                            <Label htmlFor="trimester">Trimestre *</Label>
                            <StyledSelect 
                                id="trimester" 
                                name="trimester" 
                                value={formData.trimester} 
                                onChange={handleInputChange}
                                onBlur={() => handleBlur("trimester")}
                                isValid={!touched["trimester"] || isValid("trimester")}
                                aria-required="true"
                            >
                                <option value="">Selecione</option>
                                <option value="1">1º Trimestre</option>
                                <option value="2">2º Trimestre</option>
                                <option value="3">3º Trimestre</option>
                            </StyledSelect>
                            {touched["trimester"] && !isValid("trimester") && (
                                <ErrorMessage>Campo obrigatório</ErrorMessage>
                            )}
                        </StyledInputGroup>

                        <StyledInputGroup>
                            <Label htmlFor="applicationDate">Data de Aplicação</Label>
                            <InputWithIcon>
                                <StyledInput
                                    type="date"
                                    id="applicationDate"
                                    name="applicationDate"
                                    value={formData.applicationDate instanceof Date 
                                            ? formData.applicationDate.toISOString().split('T')[0] 
                                            : formData.applicationDate}
                                    onChange={handleInputChange} 
                                />
                                <IconWrapper>
                                    <FiCalendar size={16} />
                                </IconWrapper>
                            </InputWithIcon>
                        </StyledInputGroup>
                    </Grid2Columns>

                    <Grid2Columns>
                        <StyledInputGroup>
                            <Label htmlFor="series">Série *</Label>
                            <StyledInput 
                                type="text" 
                                id="series" 
                                name="series" 
                                placeholder="Ex: 5º Ano" 
                                value={formData.series}
                                onChange={handleInputChange} 
                                onBlur={() => handleBlur("series")}
                                isValid={!touched["series"] || isValid("series")}
                                aria-required="true" 
                            />
                            {touched["series"] && !isValid("series") && (
                                <ErrorMessage>Campo obrigatório</ErrorMessage>
                            )}
                        </StyledInputGroup>

                        <StyledInputGroup>
                            <Label htmlFor="class">Turma *</Label>
                            <StyledInput 
                                type="text" 
                                id="class" 
                                name="class" 
                                placeholder="Ex: Turma A" 
                                value={formData.class}
                                onChange={handleInputChange} 
                                onBlur={() => handleBlur("class")}
                                isValid={!touched["class"] || isValid("class")}
                                aria-required="true" 
                            />
                            {touched["class"] && !isValid("class") && (
                                <ErrorMessage>Campo obrigatório</ErrorMessage>
                            )}
                        </StyledInputGroup>
                    </Grid2Columns>
                </FormSection>

                {/* Coluna 2 - Informações da disciplina */}
                <FormSection>
                    <SectionHeader>
                        <FiBook size={18} />
                        <h3>Informações da Disciplina</h3>
                    </SectionHeader>

                    <StyledInputGroup>
                        <Label htmlFor="subject">Disciplina *</Label>
                        <StyledInput 
                            type="text" 
                            id="subject" 
                            name="subject" 
                            placeholder="Ex: Matemática" 
                            value={formData.subject}
                            onChange={handleInputChange} 
                            onBlur={() => handleBlur("subject")}
                            isValid={!touched["subject"] || isValid("subject")}
                            aria-required="true" 
                        />
                        {touched["subject"] && !isValid("subject") && (
                            <ErrorMessage>Campo obrigatório</ErrorMessage>
                        )}
                    </StyledInputGroup>

                    <StyledInputGroup>
                        <Label htmlFor="record">Registro</Label>
                        <StyledInput 
                            type="text" 
                            id="record" 
                            name="record" 
                            placeholder="Ex: 2023/MT/001" 
                            value={formData.record}
                            onChange={handleInputChange} 
                        />
                    </StyledInputGroup>

                    <Grid2Columns>
                        <StyledInputGroup>
                            <Label htmlFor="type">Tipo de Avaliação</Label>
                            <StyledSelect 
                                id="type" 
                                name="type" 
                                value={formData.type} 
                                onChange={handleInputChange}
                            >
                                <option value={EvaluationType.PROVA}>Prova</option>
                                <option value={EvaluationType.TRABALHO}>Trabalho</option>
                                <option value={EvaluationType.APRESENTACAO}>Apresentação</option>
                                <option value={EvaluationType.PROJETO}>Projeto</option>
                                <option value={EvaluationType.OUTRO}>Outro</option>
                            </StyledSelect>
                        </StyledInputGroup>

                        <StyledInputGroup>
                            <Label htmlFor="passingGrade">Nota de Aprovação</Label>
                            <StyledInput 
                                type="number" 
                                id="passingGrade" 
                                name="passingGrade" 
                                min="0" 
                                max="10" 
                                step="0.1"
                                value={formData.passingGrade} 
                                onChange={handleInputChange} 
                            />
                        </StyledInputGroup>
                    </Grid2Columns>

                    <StyledInputGroup>
                        <Label htmlFor="objective">Objetivo *</Label>
                        <StyledTextArea 
                            id="objective" 
                            name="objective" 
                            placeholder="Descreva o objetivo principal desta avaliação"
                            value={formData.objective} 
                            onChange={handleInputChange} 
                            onBlur={() => handleBlur("objective")}
                            isValid={!touched["objective"] || isValid("objective")}
                            rows={3} 
                            aria-required="true" 
                        />
                        {touched["objective"] && !isValid("objective") && (
                            <ErrorMessage>Campo obrigatório</ErrorMessage>
                        )}
                    </StyledInputGroup>

                    <StyledInputGroup>
                        <Label htmlFor="contents">Conteúdo *</Label>
                        <StyledTextArea 
                            id="contents" 
                            name="contents" 
                            placeholder="Liste os conteúdos que serão avaliados"
                            value={formData.contents} 
                            onChange={handleInputChange} 
                            onBlur={() => handleBlur("contents")}
                            isValid={!touched["contents"] || isValid("contents")}
                            rows={3} 
                            aria-required="true" 
                        />
                        {touched["contents"] && !isValid("contents") && (
                            <ErrorMessage>Campo obrigatório</ErrorMessage>
                        )}
                    </StyledInputGroup>
                </FormSection>
            </FormGrid>
            <RequiredFieldsNote>* Campos obrigatórios</RequiredFieldsNote>
        </Container>
    );
};

export default BasicInfoSection;