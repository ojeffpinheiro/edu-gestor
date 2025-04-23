import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaPlus, FaSave } from 'react-icons/fa';

import { Equation, Variable } from '../../../utils/types/Topic';

import EnhancedEquationEditor from '../../Equation/EnhancedEquationEditor';
import EquationViewer from '../../Equation/EquationView';

import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader } from '../../../styles/modals';
import { ActionButton, CancelButton, CloseButton } from '../../../styles/buttons';
import { FormGroup } from '../../../styles/formControls';
import { Input, Label, TextArea } from '../../../styles/inputs';

import {
    AddVariableButton,
    PreviewHeader,
    RemoveVariableButton,
    Tag,
    TagsInput,
    VariableRow,
    VariablesContainer
} from './styles';

interface EquationFormProps {
    isOpen: boolean;
    equation: Equation | null;
    onSave: (equation: Equation) => void;
    onCancel: () => void;
}

const EquationForm: React.FC<EquationFormProps> = ({ isOpen, equation, onSave, onCancel }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const emptyVariable: Variable = { symbol: '', name: '', unit: [] };

    const [formData, setFormData] = useState<Equation>({
        id: '',
        name: '',
        description: '',
        latex: '',
        variables: [{ ...emptyVariable }],
        tags: [],
        topics: [],
        createdAt: new Date()
    });

    const [tagInput, setTagInput] = useState('');
    const [topicInput, setTopicInput] = useState('');

    // Inicializa o formulário com os dados da equação se estiver editando
    useEffect(() => {
        if (equation) {
            setFormData(equation);
        } else {
            // Resetar o form quando não há equação
            setFormData({
                id: '',
                name: '',
                description: '',
                latex: '',
                variables: [{ ...emptyVariable }],
                tags: [],
                topics: [],
                createdAt: new Date()
            });
        }
    }, [equation, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLatexChange = (value: string) => {
        setFormData(prev => ({ ...prev, latex: value }));
    };

    const handleVariableChange = (index: number, field: keyof Variable, value: string) => {
        const updatedVariables = [...formData.variables];
        updatedVariables[index] = { ...updatedVariables[index], [field]: value };
        setFormData(prev => ({ ...prev, variables: updatedVariables }));
    };

    const addVariable = () => {
        setFormData(prev => ({
            ...prev,
            variables: [...prev.variables, { ...emptyVariable }]
        }));
    };

    const removeVariable = (index: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Previne a propagação do evento
        if (formData.variables.length <= 1) return;

        const updatedVariables = formData.variables.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, variables: updatedVariables }));
    };

    const addTag = (tag: string) => {
        if (!tag.trim() || formData.tags.includes(tag.trim())) return;

        setFormData(prev => ({
            ...prev,
            tags: [...prev.tags, tag.trim()]
        }));
    };

    const removeTag = (tag: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Previne a propagação do evento
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(t => t !== tag)
        }));
    };

    const addTopic = (topic: string) => {
        if (!topic.trim() || formData.topics.includes(topic.trim())) return;

        setFormData(prev => ({
            ...prev,
            topics: [...prev.topics, topic.trim()]
        }));
    };

    const removeTopic = (topic: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Previne a propagação do evento
        setFormData(prev => ({
            ...prev,
            topics: prev.topics.filter(t => t !== topic)
        }));
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            e.stopPropagation(); // Previne a propagação do evento
            addTag(tagInput);
            setTagInput('');
        }
    };

    const handleTopicKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            e.stopPropagation(); // Previne a propagação do evento
            addTopic(topicInput);
            setTopicInput('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Previne a propagação do evento

        // Validação básica
        if (!formData.name.trim() || !formData.latex.trim()) {
            alert('Por favor, preencha o nome e a fórmula da equação.');
            return;
        }

        // Filtra variáveis vazias
        const validVariables = formData.variables.filter(v => v.symbol.trim() && v.name.trim());

        // Adiciona a tag atual se existir
        if (tagInput.trim()) {
            addTag(tagInput);
            setTagInput('');
        }

        // Adiciona o tópico atual se existir
        if (topicInput.trim()) {
            addTopic(topicInput);
            setTopicInput('');
        }

        const finalEquation = {
            ...formData,
            variables: validVariables.length ? validVariables : [{ ...emptyVariable }]
        };

        onSave(finalEquation);
    };

    const handleBackdropClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            onCancel();
        }
    };

    /**
     * Detecta cliques fora do modal para fechá-lo
     */
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onCancel();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }
        
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [isOpen, onCancel]);

    const handleModalClick = (e: React.MouseEvent) => {
        // Previne a propagação de cliques dentro do modal
        e.stopPropagation();
    };

    if (!isOpen) return null;

    return (
        <ModalContainer onClick={handleBackdropClick} role="dialog" aria-modal="true" data-testid="equation-modal">
                <ModalContent ref={modalRef} className="large" onClick={handleModalClick}>
                    <ModalHeader>
                        <h2>{equation ? 'Editar Equação' : 'Nova Equação'}</h2>
                        <CloseButton onClick={(e) => {
                            e.stopPropagation();
                            onCancel();
                        }} aria-label="Fechar formulário">
                            <FaTimes />
                        </CloseButton>
                    </ModalHeader>

                    <form onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label htmlFor="name">Nome da Equação</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ex: Lei de Ohm, Equação Quadrática, etc."
                                    required
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="description">Descrição</Label>
                                <TextArea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Descreva o que esta equação representa e em que contexto é utilizada..."
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Variáveis</Label>
                                <VariablesContainer>
                                    {formData.variables.map((variable, index) => (
                                        <VariableRow key={index}>
                                            <Input
                                                type="text"
                                                placeholder="Símbolo (ex: V)"
                                                value={variable.symbol}
                                                onChange={(e) => handleVariableChange(index, 'symbol', e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <Input
                                                type="text"
                                                placeholder="Nome (ex: Tensão)"
                                                value={variable.name}
                                                onChange={(e) => handleVariableChange(index, 'name', e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <Input
                                                type="text"
                                                placeholder="Unidade (ex: V)"
                                                value={variable.unit}
                                                onChange={(e) => handleVariableChange(index, 'unit', e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <RemoveVariableButton
                                                onClick={(e) => removeVariable(index, e)}
                                                disabled={formData.variables.length <= 1}
                                                title="Remover variável"
                                                type="button"
                                            >
                                                <FaTimes />
                                            </RemoveVariableButton>
                                        </VariableRow>
                                    ))}
                                    <AddVariableButton onClick={addVariable} type="button">
                                        <FaPlus /> Adicionar Variável
                                    </AddVariableButton>
                                </VariablesContainer>
                            </FormGroup>

                            <FormGroup>
                                <Label>Equação</Label>
                                <EnhancedEquationEditor
                                    initialValue={formData.latex}
                                    variables={formData.variables}
                                    onChange={handleLatexChange}
                                />
                            </FormGroup>

                            <FormGroup>
                                <PreviewHeader>Pré-visualização da Equação</PreviewHeader>
                                <EquationViewer equation={formData.latex} />
                            </FormGroup>

                            <FormGroup>
                                <Label>Tags</Label>
                                <TagsInput>
                                    {formData.tags.map((tag, index) => (
                                        <Tag key={index}>
                                            {tag} <span onClick={(e) => removeTag(tag, e)}><FaTimes /></span>
                                        </Tag>
                                    ))}
                                    <input
                                        type="text"
                                        placeholder="Adicione tags e pressione Enter..."
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </TagsInput>
                            </FormGroup>

                            <FormGroup>
                                <Label>Tópicos Relacionados</Label>
                                <TagsInput>
                                    {formData.topics.map((topic, index) => (
                                        <Tag key={index}>
                                            {topic} <span onClick={(e) => removeTopic(topic, e)}><FaTimes /></span>
                                        </Tag>
                                    ))}
                                    <input
                                        type="text"
                                        placeholder="Adicione tópicos e pressione Enter..."
                                        value={topicInput}
                                        onChange={(e) => setTopicInput(e.target.value)}
                                        onKeyDown={handleTopicKeyDown}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </TagsInput>
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <CancelButton type="button" onClick={(e) => {
                                e.stopPropagation();
                                onCancel();
                            }}>
                                <FaTimes /> Cancelar
                            </CancelButton>
                            <ActionButton type="submit">
                                <FaSave /> {equation ? 'Atualizar' : 'Criar'}
                            </ActionButton>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </ModalContainer>
    );
};

export default EquationForm;