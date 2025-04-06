import React, { useState, useEffect } from 'react';

import { FaPlus, FaEdit, FaTrash, FaChevronDown, FaChevronUp, FaBook, FaLayerGroup, FaCalendarAlt, FaTimes } from 'react-icons/fa';


import { Button, CancelButton, IconButton, PrimaryActionButton } from '../../styles/buttons';
import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader } from '../../styles/modals';
import { Input, InputGroup, Label, TextArea } from '../../styles/inputs';
import { EmptyStateMessage } from '../../styles/table';

import {
    PageContainer,
    PageHeader,
    TopicCard,
    TopicHeader,
    TopicTitle,
    TopicActions,
    ContentList,
    ContentGrid,
    Badge,
    StatsContainer,
    StatCard,
    ContentDescription,
    ContentInfo,
    ContentItem,
    ContentTitle,
    ContentHeader,
    ContentFooter,
    FormRow,
    StatLabel,
    StatValue,
    ListHeader,
} from './styles';

// Definição dos tipos
interface Topic {
    id: string;
    nome: string;
    descricao: string;
    status: 'ativo' | 'inativo';
    data_criacao: string;
    data_atualizacao: string;
}

interface Content {
    id: string;
    id_topico: string;
    nome: string;
    descricao: string;
    status: 'ativo' | 'inativo';
    data_criacao: string;
    data_atualizacao: string;
}

// Componente principal
const TopicContentManagement: React.FC = () => {
    // Estados
    const [topics, setTopics] = useState<Topic[]>([]);
    const [contents, setContents] = useState<Content[]>([]);
    const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
    const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
    const [isContentModalOpen, setIsContentModalOpen] = useState(false);
    const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
    const [currentContent, setCurrentContent] = useState<Content | null>(null);
    const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

    // Dados fictícios para demonstração
    useEffect(() => {
        // Simulando requisição à API
        const mockTopics: Topic[] = [
            {
                id: '1',
                nome: 'Matemática',
                descricao: 'Tópicos relacionados à matemática básica e avançada',
                status: 'ativo',
                data_criacao: '2023-01-01',
                data_atualizacao: '2023-01-15'
            },
            {
                id: '2',
                nome: 'Português',
                descricao: 'Gramática, literatura e interpretação de textos',
                status: 'ativo',
                data_criacao: '2023-01-02',
                data_atualizacao: '2023-01-12'
            }
        ];

        const mockContents: Content[] = [
            {
                id: '1',
                id_topico: '1',
                nome: 'Álgebra',
                descricao: 'Estudo de equações e estruturas matemáticas',
                status: 'ativo',
                data_criacao: '2023-01-03',
                data_atualizacao: '2023-01-10'
            },
            {
                id: '2',
                id_topico: '1',
                nome: 'Geometria',
                descricao: 'Estudo de formas e espaços',
                status: 'ativo',
                data_criacao: '2023-01-04',
                data_atualizacao: '2023-01-11'
            },
            {
                id: '3',
                id_topico: '2',
                nome: 'Gramática',
                descricao: 'Regras e estruturas da língua portuguesa',
                status: 'ativo',
                data_criacao: '2023-01-05',
                data_atualizacao: '2023-01-13'
            }
        ];

        setTopics(mockTopics);
        setContents(mockContents);

        // Inicializar todos os tópicos como colapsados
        const initialExpandedState: Record<string, boolean> = {};
        mockTopics.forEach(topic => {
            initialExpandedState[topic.id] = false;
        });
        setExpandedTopics(initialExpandedState);
    }, []);

    // Funções auxiliares
    const toggleTopicExpansion = (topicId: string) => {
        setExpandedTopics(prev => ({
            ...prev,
            [topicId]: !prev[topicId]
        }));
    };

    const getContentsByTopicId = (topicId: string) => {
        return contents.filter(content => content.id_topico === topicId);
    };

    const handleEditTopic = (topic: Topic) => {
        setCurrentTopic(topic);
        setIsTopicModalOpen(true);
    };

    const handleAddTopic = () => {
        setCurrentTopic(null);
        setIsTopicModalOpen(true);
    };

    const handleEditContent = (content: Content) => {
        setCurrentContent(content);
        setSelectedTopicId(content.id_topico);
        setIsContentModalOpen(true);
    };

    const handleAddContent = (topicId: string) => {
        setCurrentContent(null);
        setSelectedTopicId(topicId);
        setIsContentModalOpen(true);
    };

    const handleSaveTopic = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você implementaria a lógica para salvar no backend
        setIsTopicModalOpen(false);
    };

    const handleSaveContent = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você implementaria a lógica para salvar no backend
        setIsContentModalOpen(false);
    };

    const handleDeleteTopic = (topicId: string) => {
        // Aqui você implementaria a lógica para deletar no backend
        setTopics(prev => prev.filter(topic => topic.id !== topicId));
    };

    const handleDeleteContent = (contentId: string) => {
        // Aqui você implementaria a lógica para deletar no backend
        setContents(prev => prev.filter(content => content.id !== contentId));
    };

    // Função para formatar data
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    return (
        <PageContainer>
            <PageHeader>
                <h1>Gerenciamento de Tópicos e Conteúdos</h1>
                <PrimaryActionButton onClick={handleAddTopic}>
                    <FaPlus /> Novo Tópico
                </PrimaryActionButton>
            </PageHeader>

            {topics.length === 0 ? (
                <EmptyStateMessage>
                    Nenhum tópico encontrado. Clique em "Novo Tópico" para adicionar.
                </EmptyStateMessage>
            ) : (
                topics.map(topic => (
                    <TopicCard key={topic.id}>
                        <TopicHeader onClick={() => toggleTopicExpansion(topic.id)}>
                            <TopicTitle>
                                <FaLayerGroup />
                                {topic.nome}
                                <Badge status={topic.status}>{topic.status}</Badge>
                            </TopicTitle>
                            <TopicActions>
                                <IconButton onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditTopic(topic);
                                }}>
                                    <FaEdit />
                                </IconButton>
                                <IconButton onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteTopic(topic.id);
                                }}>
                                    <FaTrash />
                                </IconButton>
                                {expandedTopics[topic.id] ? <FaChevronUp /> : <FaChevronDown />}
                            </TopicActions>
                        </TopicHeader>

                        {expandedTopics[topic.id] && (
                            <>
                                <p>{topic.descricao}</p>

                                <StatsContainer>
                                    <StatCard>
                                        <StatValue>{getContentsByTopicId(topic.id).length}</StatValue>
                                        <StatLabel>Conteúdos</StatLabel>
                                    </StatCard>
                                    <StatCard>
                                        <StatValue>
                                            {getContentsByTopicId(topic.id).filter(c => c.status === 'ativo').length}
                                        </StatValue>
                                        <StatLabel>Ativos</StatLabel>
                                    </StatCard>
                                </StatsContainer>

                                <ContentList>
                                    <ListHeader>
                                        <h4>Lista de Conteúdos</h4>
                                        <Button onClick={() => handleAddContent(topic.id)}>
                                            <FaPlus /> Novo Conteúdo
                                        </Button>
                                    </ListHeader>

                                    {getContentsByTopicId(topic.id).length === 0 ? (
                                        <EmptyStateMessage>
                                            Nenhum conteúdo encontrado para este tópico.
                                        </EmptyStateMessage>
                                    ) : (
                                        <ContentGrid>
                                            {getContentsByTopicId(topic.id).map(content => (
                                                <ContentItem key={content.id}>
                                                    <ContentHeader>
                                                        <ContentTitle>
                                                            <FaBook />
                                                            {content.nome}
                                                        </ContentTitle>
                                                        <Badge status={content.status}>{content.status}</Badge>
                                                    </ContentHeader>

                                                    <ContentInfo>
                                                        <ContentDescription>{content.descricao}</ContentDescription>
                                                        <div style={{
                                                            marginTop: 'var(--space-sm)',
                                                            fontSize: 'var(--font-size-xs)',
                                                            color: 'var(--color-text-secondary)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 'var(--space-xs)'
                                                        }}>
                                                            <FaCalendarAlt /> Atualizado em: {formatDate(content.data_atualizacao)}
                                                        </div>
                                                    </ContentInfo>

                                                    <ContentFooter>
                                                        <IconButton onClick={() => handleEditContent(content)}>
                                                            <FaEdit />
                                                        </IconButton>
                                                        <IconButton onClick={() => handleDeleteContent(content.id)}>
                                                            <FaTrash />
                                                        </IconButton>
                                                    </ContentFooter>
                                                </ContentItem>
                                            ))}
                                        </ContentGrid>
                                    )}
                                </ContentList>
                            </>
                        )}
                    </TopicCard>
                ))
            )}

            {/* Modal para Tópicos */}
            {isTopicModalOpen && (
                <ModalContainer>
                    <ModalContent>
                        <ModalHeader>
                            <h3>{currentTopic ? 'Editar Tópico' : 'Novo Tópico'}</h3>
                            <IconButton onClick={() => setIsTopicModalOpen(false)}>
                                <FaTimes />
                            </IconButton>
                        </ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSaveTopic}>
                                <InputGroup>
                                    <Label htmlFor="topicName">Nome do Tópico</Label>
                                    <Input
                                        id="topicName"
                                        defaultValue={currentTopic?.nome || ''}
                                        required
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Label htmlFor="topicDescription">Descrição</Label>
                                    <TextArea
                                        id="topicDescription"
                                        defaultValue={currentTopic?.descricao || ''}
                                        required
                                    />
                                </InputGroup>
                                <FormRow>
                                    <InputGroup>
                                        <Label htmlFor="topicStatus">Status</Label>
                                        <select
                                            id="topicStatus"
                                            defaultValue={currentTopic?.status || 'ativo'}
                                            style={{
                                                width: '100%',
                                                padding: 'var(--space-sm) var(--space-md)',
                                                border: '2px solid var(--color-border)',
                                                borderRadius: 'var(--border-radius-sm)',
                                                backgroundColor: 'var(--color-input)',
                                            }}
                                        >
                                            <option value="ativo">Ativo</option>
                                            <option value="inativo">Inativo</option>
                                        </select>
                                    </InputGroup>
                                </FormRow>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <CancelButton onClick={() => setIsTopicModalOpen(false)}>Cancelar</CancelButton>
                            <PrimaryActionButton onClick={handleSaveTopic}>
                                Salvar
                            </PrimaryActionButton>
                        </ModalFooter>
                    </ModalContent>
                </ModalContainer>
            )}

            {/* Modal para Conteúdos */}
            {isContentModalOpen && (
                <ModalContainer>
                    <ModalContent>
                        <ModalHeader>
                            <h3>{currentContent ? 'Editar Conteúdo' : 'Novo Conteúdo'}</h3>
                            <IconButton onClick={() => setIsContentModalOpen(false)}>
                                <FaTimes />
                            </IconButton>
                        </ModalHeader>
                        <ModalBody>
                            <form onSubmit={handleSaveContent}>
                                <InputGroup>
                                    <Label htmlFor="contentName">Nome do Conteúdo</Label>
                                    <Input
                                        id="contentName"
                                        defaultValue={currentContent?.nome || ''}
                                        required
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <Label htmlFor="contentDescription">Descrição</Label>
                                    <TextArea
                                        id="contentDescription"
                                        defaultValue={currentContent?.descricao || ''}
                                        required
                                    />
                                </InputGroup>
                                <FormRow>
                                    <InputGroup>
                                        <Label htmlFor="contentTopic">Tópico</Label>
                                        <select
                                            id="contentTopic"
                                            defaultValue={selectedTopicId || ''}
                                            style={{
                                                width: '100%',
                                                padding: 'var(--space-sm) var(--space-md)',
                                                border: '2px solid var(--color-border)',
                                                borderRadius: 'var(--border-radius-sm)',
                                                backgroundColor: 'var(--color-input)',
                                            }}
                                        >
                                            {topics.map(topic => (
                                                <option key={topic.id} value={topic.id}>
                                                    {topic.nome}
                                                </option>
                                            ))}
                                        </select>
                                    </InputGroup>
                                    <InputGroup>
                                        <Label htmlFor="contentStatus">Status</Label>
                                        <select
                                            id="contentStatus"
                                            defaultValue={currentContent?.status || 'ativo'}
                                            style={{
                                                width: '100%',
                                                padding: 'var(--space-sm) var(--space-md)',
                                                border: '2px solid var(--color-border)',
                                                borderRadius: 'var(--border-radius-sm)',
                                                backgroundColor: 'var(--color-input)',
                                            }}
                                        >
                                            <option value="ativo">Ativo</option>
                                            <option value="inativo">Inativo</option>
                                        </select>
                                    </InputGroup>
                                </FormRow>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <CancelButton onClick={() => setIsContentModalOpen(false)}>Cancelar</CancelButton>
                            <PrimaryActionButton onClick={handleSaveContent}>
                                Salvar
                            </PrimaryActionButton>
                        </ModalFooter>
                    </ModalContent>
                </ModalContainer>
            )}
        </PageContainer>
    );
};

export default TopicContentManagement;