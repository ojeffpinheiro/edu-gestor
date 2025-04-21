import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaTags } from 'react-icons/fa';

import { Equation } from '../../utils/types/Topic';

import EquationForm from '../../components/modals/EquationForm';
import {
    ActionButton,
    Actions,
    AddButton,
    Container,
    ControlsWrapper,
    Description,
    EmptyState,
    EquationCard,
    EquationContent,
    EquationDisplay,
    EquationHeader,
    EquationsGrid,
    Header,
    SearchInput,
    Tag,
    TagFilter,
    TagIcon,
    TagsContainer,
    Title,
    VariablesList
} from './styles';
import { initialEquations } from '../../mocks/equation';

// Componente principal
const EquationSystem = () => {
    const [equations, setEquations] = useState(initialEquations);
    const [filterTag, setFilterTag] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingEquation, setEditingEquation] = useState<Equation | null>(null);
    const [showForm, setShowForm] = useState(false);

    const filteredEquations = equations.filter(eq => {
        const matchesTag = filterTag ? eq.tags.includes(filterTag) : true;
        const matchesSearch = searchTerm
            ? eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            eq.description.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
        return matchesTag && matchesSearch;
    });

    // Funções CRUD
    const handleAddEquation = (newEquation: Omit<Equation, 'id' | 'createdAt'>) => {
        const id = (equations.length + 1).toString();
        const equationWithId = {
            ...newEquation,
            id,
            createdAt: new Date()
        };
        setEquations([...equations, equationWithId]);
        setShowForm(false);
    };

    const handleUpdateEquation = (updatedEquation: Equation) => {
        setEquations(
            equations.map(eq => (eq.id === updatedEquation.id ? updatedEquation : eq))
        );
        setIsEditing(false);
        setEditingEquation(null);
    };

    const handleDeleteEquation = (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir esta equação?')) {
            setEquations(equations.filter(eq => eq.id !== id));
        }
    };

    const handleEditClick = (equation: Equation) => {
        setIsEditing(true);
        setEditingEquation(equation);
        setShowForm(true);
    };

    // Obtendo todas as tags únicas para o filtro
    const allTags = Array.from(
        new Set(equations.flatMap(eq => eq.tags))
    ).sort();

    return (
        <Container>
            <Header>
                <Title>Sistema de Equações - Movimento Uniforme</Title>
                <ControlsWrapper>
                    <SearchInput
                        type="text"
                        placeholder="Buscar equações..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <TagFilter>
                        <select
                            value={filterTag}
                            onChange={(e) => setFilterTag(e.target.value)}
                        >
                            <option value="">Todas as tags</option>
                            {allTags.map(tag => (
                                <option key={tag} value={tag}>
                                    {tag}
                                </option>
                            ))}
                        </select>
                    </TagFilter>
                    <AddButton onClick={() => {
                        setIsEditing(false);
                        setEditingEquation(null);
                        setShowForm(true);
                    }}>
                        <FaPlus /> Nova Equação
                    </AddButton>
                </ControlsWrapper>
            </Header>

            <EquationsGrid>
                {filteredEquations.length > 0 ? (
                    filteredEquations.map(equation => (
                        <EquationCard key={equation.id}>
                            <EquationHeader>
                                <h3>{equation.name}</h3>
                                <Actions>
                                    <ActionButton onClick={() => handleEditClick(equation)}>
                                        <FaEdit />
                                    </ActionButton>
                                    <ActionButton onClick={() => handleDeleteEquation(equation.id)}>
                                        <FaTrash />
                                    </ActionButton>
                                </Actions>
                            </EquationHeader>
                            <EquationContent>
                                <EquationDisplay>
                                    {equation.latex}
                                </EquationDisplay>
                                <Description>{equation.description}</Description>
                                <VariablesList>
                                    <h4>Variáveis:</h4>
                                    <ul>
                                        {equation.variables.map((variable, index) => (
                                            <li key={index}>
                                                <strong>{variable.symbol}</strong>: {variable.name} ({variable.unit})
                                            </li>
                                        ))}
                                    </ul>
                                </VariablesList>
                                <TagsContainer>
                                    <TagIcon><FaTags /></TagIcon>
                                    {equation.tags.map((tag, index) => (
                                        <Tag
                                            key={index}
                                            onClick={() => setFilterTag(tag)}
                                            className={filterTag === tag ? 'active' : ''}
                                        >
                                            {tag}
                                        </Tag>
                                    ))}
                                </TagsContainer>
                            </EquationContent>
                        </EquationCard>
                    ))
                ) : (
                    <EmptyState>
                        <p>Nenhuma equação encontrada.</p>
                    </EmptyState>
                )}
            </EquationsGrid>

            <EquationForm
                isOpen={showForm}
                equation={isEditing ? editingEquation : null}
                onSave={isEditing ? handleUpdateEquation : handleAddEquation}
                onCancel={() => {
                    setShowForm(false);
                    setIsEditing(false);
                    setEditingEquation(null);
                }}
            />
        </Container>
    );
};

export default EquationSystem;