import React, { useEffect, useState } from "react";
import { FaPlus, FaSave, FaTimes, FaTrash } from "react-icons/fa";

import { Equation } from "../../../utils/types/Topic";

import {
    CancelButton,
    FormActions,
    FormGroup,
    RemoveVariableButton,
    VariablesSection,
    VariableRow,
    VariableInput,
    VariablesHeader
} from "./styles";
import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader } from "../../../styles/modals";
import { CloseButton, PrimaryActionButton } from "../../../styles/buttons";

interface EquationFormProps {
    isOpen: boolean;
    equation?: Equation | null;
    onSave: (equation: Equation) => void;
    onCancel: () => void;
}

// Componente do formulário de equação
const EquationForm = ({ equation, onSave, onCancel, isOpen }: EquationFormProps) => {
    const [formData, setFormData] = useState<Equation>({
        id: new Date().toISOString(),
        latex: '',
        name: '',
        description: '',
        variables: [{ symbol: '', name: '', unit: '' }],
        tags: [] as string[],
        topics: [] as string[],
        createdAt: new Date()
    });

    useEffect(() => {
        if (equation) {
            setFormData(equation);
        }
    }, [equation]);


    if (!isOpen) return null;

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTagsChange = (e: { target: { value: string; }; }) => {
        const tags = e.target.value.split(',').map(tag => tag.trim());
        setFormData({ ...formData, tags });
    };

    const handleTopicsChange = (e: { target: { value: string; }; }) => {
        const topics = e.target.value.split(',').map(topic => topic.trim());
        setFormData({ ...formData, topics });
    };

    const handleVariableChange = (index: number, field: string, value: string) => {
        const updatedVariables = [...formData.variables];
        updatedVariables[index] = {
            ...updatedVariables[index],
            [field]: value
        };
        setFormData({ ...formData, variables: updatedVariables });
    };

    const addVariable = () => {
        setFormData({
            ...formData,
            variables: [...formData.variables, { symbol: '', name: '', unit: '' }]
        });
    };

    const removeVariable = (index: number) => {
        const variables = [...formData.variables];
        variables.splice(index, 1);
        setFormData({ ...formData, variables });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        onSave(formData);
    };


    const handleBackdropClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            onCancel();
        }
    };

    return (
        <ModalContainer onClick={handleBackdropClick} role="dialog" aria-modal="true">
            <ModalContent >
                <ModalHeader>
                    <h2>{equation ? 'Editar Equação' : 'Nova Equação'}</h2>
                    <CloseButton onClick={onCancel}>
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handleSubmit} id="equation-form">
                        <FormGroup>
                            <label>Nome:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Equação (LaTeX):</label>
                            <input
                                type="text"
                                name="latex"
                                value={formData.latex}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Descrição:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Tags (separadas por vírgula):</label>
                            <input
                                type="text"
                                value={formData.tags.join(', ')}
                                onChange={handleTagsChange}
                                placeholder="Ex: cinemática, MU, mecânica"
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Tópicos (separados por vírgula):</label>
                            <input
                                type="text"
                                value={formData.topics.join(', ')}
                                onChange={handleTopicsChange}
                                placeholder="Ex: movimento-uniforme, cinemática"
                            />
                        </FormGroup>

                        <VariablesSection>
                            <VariablesHeader>
                                <h3>Variáveis</h3>
                                <button type="button" onClick={addVariable}>
                                    <FaPlus /> Adicionar Variável
                                </button>
                            </VariablesHeader>

                            {formData.variables.map((variable, index) => (
                                <VariableRow key={index}>
                                    <VariableInput>
                                        <label>Símbolo:</label>
                                        <input
                                            type="text"
                                            value={variable.symbol}
                                            onChange={(e) => handleVariableChange(index, 'symbol', e.target.value)}
                                            required
                                        />
                                    </VariableInput>

                                    <VariableInput>
                                        <label>Nome:</label>
                                        <input
                                            type="text"
                                            value={variable.name}
                                            onChange={(e) => handleVariableChange(index, 'name', e.target.value)}
                                            required
                                        />
                                    </VariableInput>

                                    <VariableInput>
                                        <label>Unidade:</label>
                                        <input
                                            type="text"
                                            value={variable.unit}
                                            onChange={(e) => handleVariableChange(index, 'unit', e.target.value)}
                                        />
                                    </VariableInput>

                                    <RemoveVariableButton
                                        type="button"
                                        onClick={() => removeVariable(index)}
                                        disabled={formData.variables.length <= 1}
                                    >
                                        <FaTrash />
                                    </RemoveVariableButton>
                                </VariableRow>
                            ))}
                        </VariablesSection>
                    </form>
                </ModalBody>

                <ModalFooter>
                <FormActions>
                    <CancelButton type="button" onClick={onCancel}>Cancelar</CancelButton>
                    <PrimaryActionButton 
                        form='equation-form'
                        type="submit">
                        <FaSave /> Salvar Equação
                    </PrimaryActionButton>
                </FormActions>
                </ModalFooter>

            </ModalContent>
        </ModalContainer>
    );
};

export default EquationForm;