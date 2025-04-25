import React from 'react'

import { FaClipboardList, FaExclamationTriangle } from "react-icons/fa";

import { Alternative, StepProps } from "../../../utils/types/Question";
import {
    RadioWrapper, 
    SectionTitle, 
    StepContent, 
    ValidationError
 } from "../../modals/QuestionModal/styles";
import { InputGroup, Label, Select } from "../../../styles/inputs";
import { Flex, Grid } from "../../../styles/layoutUtils";
import { FormCard } from '../../../styles/containers';

// Componente para o passo 1: Definições Básicas
const BasicDefinitionsStep: React.FC<StepProps> = ({
    formData,
    updateFormData,
    validationErrors,
    topics,
    selectedTopicId,
    setSelectedTopicId,
    filteredContents,
    setValidationErrors
}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        updateFormData({ [name]: value });

        // Remover erro de validação quando o campo é alterado
        if (validationErrors[name]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }

        // Caso especial para quando o tipo de questão muda
        if (name === 'questionType') {
            let alternatives: Alternative[] = [];
            switch (value) {
                case 'true_false':
                    alternatives = [
                        { id: Date.now().toString() + '-1', text: 'Verdadeiro', isCorrect: true },
                        { id: Date.now().toString() + '-2', text: 'Falso', isCorrect: false }
                    ];
                    break;
                case 'multiple_choice':
                    if (formData.alternatives.length === 0) {
                        alternatives = [
                            { id: Date.now().toString(), text: '', isCorrect: true }
                        ];
                    } else {
                        alternatives = formData.alternatives;
                    }
                    break;
                case 'essay':
                    // Questões dissertativas não possuem alternativas
                    alternatives = [];
                    break;
            }

            updateFormData({ alternatives });
        }
    };

    const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const topicId = e.target.value;
        setSelectedTopicId(topicId);

        // Reset do conteúdo selecionado quando mudar o tópico
        updateFormData({ contentId: '' });

        // Remover erro de validação
        if (validationErrors.contentId) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.contentId;
                return newErrors;
            });
        }
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const status = e.target.value as 'active' | 'inactive';
        updateFormData({ status });
    };

    return (
        <StepContent>
            <FormCard>
                <SectionTitle>
                    <FaClipboardList style={{ marginRight: '8px' }} />
                    Informações Básicas
                </SectionTitle>

                <Grid columns={2} gap='md' >
                    <InputGroup>
                        <Label htmlFor="topic" > Tópico </Label>
                        <Select
                            id="topic"
                            value={selectedTopicId}
                            onChange={handleTopicChange}>
                            <option value="" > Selecione um tópico </option>
                            {topics.map(topic => (
                                <option key={topic.id} value={topic.id} >
                                    {topic.name}
                                </option>
                            ))}
                        </Select>
                        {validationErrors.topicId && (
                            <ValidationError>
                                <FaExclamationTriangle /> {validationErrors.topicId}
                            </ValidationError>
                        )}
                    </InputGroup>

                    <InputGroup>
                        <Label htmlFor="contentId" > Conteúdo </Label>
                        <Select
                            id="contentId"
                            name="contentId"
                            value={formData.contentId}
                            onChange={handleChange}
                            disabled={!selectedTopicId}>
                            <option value="" > Selecione um conteúdo </option>
                            {filteredContents.map(content => (
                                <option key={content.id} value={content.id} >
                                    {content.name}
                                </option>
                            ))}
                        </Select>
                        {validationErrors.contentId && (
                            <ValidationError>
                                <FaExclamationTriangle /> {validationErrors.contentId}
                            </ValidationError>
                        )}
                    </InputGroup>
                </Grid>

                <InputGroup>
                    <Label htmlFor="questionType" > Tipo de Questão </Label>
                    <Select
                        id="questionType"
                        name="questionType"
                        value={formData.questionType}
                        onChange={handleChange}>
                        <option value="multiple_choice" > Múltipla Escolha </option>
                        <option value="true_false" > Verdadeiro / Falso </option>
                        <option value="essay" > Dissertativa </option>
                    </Select>
                </InputGroup>

                <Grid columns={2} gap='md'>
                    <InputGroup>
                        <Label>Nível de Dificuldade </Label>
                        <Flex gap="md" >
                            <RadioWrapper>
                                <input
                                    type="radio"
                                    id="easy"
                                    name="difficultyLevel"
                                    value="easy"
                                    checked={formData.difficultyLevel === 'easy'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="easy" > Fácil </label>
                            </RadioWrapper>

                            <RadioWrapper>
                                <input
                                    type="radio"
                                    id="medium"
                                    name="difficultyLevel"
                                    value="medium"
                                    checked={formData.difficultyLevel === 'medium'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="medium" > Médio </label>
                            </RadioWrapper>

                            <RadioWrapper>
                                <input
                                    type="radio"
                                    id="hard"
                                    name="difficultyLevel"
                                    value="hard"
                                    checked={formData.difficultyLevel === 'hard'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="hard" > Difícil </label>
                            </RadioWrapper>
                        </Flex>
                    </InputGroup>

                    <InputGroup>
                        <Label>Status da questão: </Label>
                        <Flex gap='md' >
                            <RadioWrapper>
                                <input
                                    type="radio"
                                    id="active"
                                    name="status"
                                    value="active"
                                    checked={formData.status === 'active'}
                                    onChange={handleStatusChange}
                                />
                                <label htmlFor="active" > Ativa </label>
                            </RadioWrapper>

                            <RadioWrapper>
                                <input
                                    type="radio"
                                    id="inactive"
                                    name="status"
                                    value="inactive"
                                    checked={formData.status === 'inactive'}
                                    onChange={handleStatusChange}
                                />
                                <label htmlFor="inactive" > Inativa </label>
                            </RadioWrapper>
                        </Flex>
                    </InputGroup>
                </Grid>
            </FormCard>
        </StepContent>
    );
};

export default BasicDefinitionsStep;