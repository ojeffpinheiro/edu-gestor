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
// Mock de dados para Movimento Uniforme
const initialEquations: Equation[] = [
    {
        id: '1',
        latex: 'S = S_0 + v \\cdot t',
        name: 'Função Horária da Posição (MU)',
        description: 'Determina a posição de um móvel em movimento uniforme em função do tempo',
        variables: [
            { symbol: 'S', name: 'posição final', unit: 'm' },
            { symbol: 'S_0', name: 'posição inicial', unit: 'm' },
            { symbol: 'v', name: 'velocidade', unit: 'm/s' },
            { symbol: 't', name: 'tempo', unit: 's' }
        ],
        tags: ['cinemática', 'MU', 'mecânica'],
        topics: ['movimento-uniforme', 'cinemática'],
        createdAt: new Date('2023-05-15')
    },
    {
        id: '2',
        latex: '\\Delta S = v \\cdot \\Delta t',
        name: 'Deslocamento no MU',
        description: 'Calcula o deslocamento de um móvel em movimento uniforme',
        variables: [
            { symbol: '\\Delta S', name: 'deslocamento', unit: 'm' },
            { symbol: 'v', name: 'velocidade', unit: 'm/s' },
            { symbol: '\\Delta t', name: 'intervalo de tempo', unit: 's' }
        ],
        tags: ['cinemática', 'MU', 'mecânica'],
        topics: ['movimento-uniforme', 'cinemática'],
        createdAt: new Date('2023-05-15')
    },
    {
        id: '3',
        latex: 'v = \\frac{\\Delta S}{\\Delta t}',
        name: 'Velocidade Média',
        description: 'Calcula a velocidade média de um móvel',
        variables: [
            { symbol: 'v', name: 'velocidade média', unit: 'm/s' },
            { symbol: '\\Delta S', name: 'deslocamento', unit: 'm' },
            { symbol: '\\Delta t', name: 'intervalo de tempo', unit: 's' }
        ],
        tags: ['cinemática', 'MU', 'mecânica'],
        topics: ['movimento-uniforme', 'cinemática'],
        createdAt: new Date('2023-05-16')
    },
    {
        id: '4',
        latex: 't = \\frac{\\Delta S}{v}',
        name: 'Tempo no MU',
        description: 'Calcula o tempo necessário para um deslocamento com velocidade constante',
        variables: [
            { symbol: 't', name: 'tempo', unit: 's' },
            { symbol: '\\Delta S', name: 'deslocamento', unit: 'm' },
            { symbol: 'v', name: 'velocidade', unit: 'm/s' }
        ],
        tags: ['cinemática', 'MU'],
        topics: ['movimento-uniforme', 'cinemática'],
        createdAt: new Date('2023-05-16')
    },
    {
        id: '5',
        latex: 'S - S_0 = v \\cdot t',
        name: 'Equação de deslocamento alternativa',
        description: 'Forma alternativa para calcular o deslocamento no MU',
        variables: [
            { symbol: 'S', name: 'posição final', unit: 'm' },
            { symbol: 'S_0', name: 'posição inicial', unit: 'm' },
            { symbol: 'v', name: 'velocidade', unit: 'm/s' },
            { symbol: 't', name: 'tempo', unit: 's' }
        ],
        tags: ['cinemática', 'MU', 'equação'],
        topics: ['movimento-uniforme'],
        createdAt: new Date('2023-05-17')
    }
];

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