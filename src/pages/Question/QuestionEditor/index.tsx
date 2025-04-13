import React, { useState } from 'react';
import { FaSave, FaTimes, FaEye } from 'react-icons/fa';
import { Editor, EditorState, RichUtils, ContentState, convertFromHTML } from 'draft-js';

import 'draft-js/dist/Draft.css';

import { Equation } from '../../../utils/types/Topic';

import { FormContainer } from '../../../styles/containers';
import { FormGroup } from '../../../styles/formControls';
import { Label } from '../../../styles/inputs';
import { EditorContainer, EditorTab, EditorTabs, Toolbar, ToolbarButton } from './styles';
import { Flex } from '../../../styles/layoutUtils';
import { ActionButton, Button, CancelButton } from '../../../styles/buttons';
import { Variable } from '../../../utils/types/Question';
import VariableManager from '../../../components/Question/VariableManager';
import QuestionPreview from '../../../components/Question/QuestionPreview';
import EquationSelector from '../../../components/Question/EquationSelector';

export interface Question {
    id?: string;
    title: string;
    content: string;
    variables: Variable[];
    equations: Equation[];
    tags: string[];
    topic?: string;
}

interface QuestionEditorProps {
    initialQuestion?: Question;
    onSave: (question: Question) => void;
    onCancel: () => void;
    availableEquations: Equation[];
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
    initialQuestion,
    onSave,
    onCancel,
    availableEquations
}) => {
    // Estado inicial padrão
    const defaultQuestion: Question = {
        title: '',
        content: '',
        variables: [],
        equations: [],
        tags: []
    };

    // Estados
    const [question, setQuestion] = useState<Question>(initialQuestion || defaultQuestion);
    const [activeTab, setActiveTab] = useState<'editor' | 'variables' | 'preview'>('editor');
    const [editorState, setEditorState] = useState(() => {
        const contentHTML = initialQuestion?.content || '';
        const blocksFromHTML = convertFromHTML(contentHTML);
        const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        return EditorState.createWithContent(contentState);
    });

    // Manipuladores do editor de texto
    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);
        // Não precisamos atualizar o content aqui, apenas no save para melhor performance
    };

    const applyStyle = (style: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    const applyBlockType = (blockType: string) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    // Atualiza o título da questão
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion({ ...question, title: e.target.value });
    };

    // Adiciona equação selecionada
    const handleAddEquation = (equation: Equation) => {
        if (!question.equations.some(eq => eq.id === equation.id)) {
            setQuestion({
                ...question,
                equations: [...question.equations, equation],
                // Adicionamos automaticamente as variáveis da equação
                variables: [
                    ...question.variables,
                    ...equation.variables
                        .filter(varName => !question.variables.some(v => v.name === (typeof varName === 'string' ? varName : varName.name)))
                        .map(varName => ({
                            name: typeof varName === 'string' ? varName : varName.name,
                            min: 1,
                            max: 10,
                            unit: '',
                            precision: 2,
                        }))
                ]
            });
        }
    };

    // Remove equação
    const handleRemoveEquation = (equationId: string) => {
        const updatedEquations = question.equations.filter(eq => eq.id !== equationId);
        setQuestion({ ...question, equations: updatedEquations });
    };

    // Atualiza variáveis
    const handleUpdateVariables = (variables: Variable[]) => {
        setQuestion({ ...question, variables });
    };

    // Salva a questão
    const handleSave = () => {
        // Converte o conteúdo do editor para HTML
        const contentHTML = document.getElementsByClassName('DraftEditor-root')[0].innerHTML;
        const updatedQuestion = {
            ...question,
            content: contentHTML
        };
        onSave(updatedQuestion);
    };

    // Gera exemplos com valores aleatórios
    const generateRandomValues = () => {
        const updatedVariables = question.variables.map(variable => ({
            ...variable,
            value: Math.random() * (variable.max - variable.min) + variable.min
        }));
        setQuestion({ ...question, variables: updatedVariables });
    };

    return (
        <FormContainer>
            <h2>{initialQuestion ? 'Editar Questão' : 'Nova Questão'}</h2>

            <FormGroup>
                <Label htmlFor="title">Título da Questão</Label>
                <input
                    id="title"
                    type="text"
                    value={question.title}
                    onChange={handleTitleChange}
                    placeholder="Digite um título descritivo para a questão"
                />
            </FormGroup>

            <EditorTabs>
                <EditorTab
                    active={activeTab === 'editor'}
                    onClick={() => setActiveTab('editor')}
                >
                    Editor
                </EditorTab>
                <EditorTab
                    active={activeTab === 'variables'}
                    onClick={() => setActiveTab('variables')}
                >
                    Variáveis
                </EditorTab>
                <EditorTab
                    active={activeTab === 'preview'}
                    onClick={() => setActiveTab('preview')}
                >
                    Prévia
                </EditorTab>
            </EditorTabs>

            {activeTab === 'editor' && (
                <EditorContainer>
                    <Toolbar>
                        <ToolbarButton onClick={() => applyStyle('BOLD')} title="Negrito">
                            B
                        </ToolbarButton>
                        <ToolbarButton onClick={() => applyStyle('ITALIC')} title="Itálico">
                            I
                        </ToolbarButton>
                        <ToolbarButton onClick={() => applyStyle('UNDERLINE')} title="Sublinhado">
                            U
                        </ToolbarButton>
                        <ToolbarButton onClick={() => applyBlockType('header-one')} title="Título 1">
                            H1
                        </ToolbarButton>
                        <ToolbarButton onClick={() => applyBlockType('header-two')} title="Título 2">
                            H2
                        </ToolbarButton>
                        <ToolbarButton onClick={() => applyBlockType('unordered-list-item')} title="Lista">
                            •
                        </ToolbarButton>
                    </Toolbar>

                    <Editor
                        editorState={editorState}
                        onChange={handleEditorChange}
                        placeholder="Digite o enunciado da questão aqui..."
                    />

                    <EquationSelector
                        availableEquations={availableEquations}
                        selectedEquations={question.equations}
                        onAddEquation={handleAddEquation}
                        onRemoveEquation={handleRemoveEquation} onSelect={function (equation: Equation): void {
                            throw new Error('Function not implemented.');
                        } } onRemove={function (equationId: string): void {
                            throw new Error('Function not implemented.');
                        } }                    />
                </EditorContainer>
            )}

            {activeTab === 'variables' && (
                <VariableManager
                    variables={question.variables}
                    onUpdateVariables={handleUpdateVariables}
                    equationVariables={question.equations.flatMap(eq => eq.variables.map(v => typeof v === 'string' ? v : v.name))}
                />
            )}

            {activeTab === 'preview' && (
                <QuestionPreview
                    question={question}
                    onRegenerateValues={generateRandomValues}
                />
            )}

            <Flex justify="between" align="center" gap="md">
                <CancelButton onClick={onCancel}>
                    <FaTimes /> Cancelar
                </CancelButton>

                <Flex gap="sm">
                    {activeTab !== 'preview' && (
                        <Button variant="secondary" onClick={() => setActiveTab('preview')}>
                            <FaEye /> Visualizar
                        </Button>
                    )}
                    <ActionButton onClick={handleSave}>
                        <FaSave /> Salvar Questão
                    </ActionButton>
                </Flex>
            </Flex>
        </FormContainer>
    );
};

export default QuestionEditor;