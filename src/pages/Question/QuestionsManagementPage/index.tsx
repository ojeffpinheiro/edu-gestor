import React, { useState, useEffect, useMemo } from 'react';
import { FaPlus, FaEdit, FaTrashAlt, FaEye, FaSort, FaChevronLeft, FaChevronRight, FaSearch, FaFilter } from 'react-icons/fa';

import { Content, Filters, Question, Topic } from '../../../utils/types/Question';

import { Divider, Flex, Section } from '../../../styles/layoutUtils';
import { ActionButton, Button, IconButton } from '../../../styles/buttons';

import { EmptyStateMessage, Table, TableCell, TableHeader, TableRow } from '../../../styles/table';
import QuestionModal from '../../../components/modals/QuestionModal';

import {
  ActionColumn,
  DifficultyBadge,
  PageButton,
  PaginationContainer,
  PaginationControls,
  PaginationInfo,
  SearchBar,
  QuestionStatement,
  QuestionsHeader,
  Title,
  TypeBadge,
  QuestionsManagementContainer
} from './styles'
import { mockContents, mockQuestions, mockTopics } from '../../../mocks/question';
import { Card } from '../../../styles/card';
import FiltersPanel from '../../../components/Question/FiltersPanel';

// Componente principal
const QuestionsManagementPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<Filters>({
    contentId: '',
    difficulty: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 10;

  // Mock data para demonstração
  useEffect(() => {
    // Simulando carregamento de dados da API
    setTimeout(() => {
      setTopics(mockTopics);
      setContents(mockContents);
      setQuestions(mockQuestions);
      setLoading(false);
    }, 800);
  }, []);

  // Função para filtragem das questões
  // Usar useMemo para questões filtradas e cálculos de paginação
  const filteredQuestions = useMemo(() =>
    questions.filter(question => {
      const matchesSearch =
        question.statement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getContentName(question.contentId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getTopicForContent(question.contentId).toLowerCase().includes(searchTerm.toLowerCase());

      const matchesContent =
        !activeFilters.contentId || question.contentId === activeFilters.contentId;

      const matchesDifficulty =
        !activeFilters.difficulty || question.difficultyLevel === activeFilters.difficulty;

      return matchesSearch && matchesContent && matchesDifficulty;
    }),
    [questions, searchTerm, activeFilters]
  );

  const handleApplyFilters = (newFilters: Filters) => {
    setActiveFilters(newFilters);
  };

  const totalPages = useMemo(() => Math.ceil(filteredQuestions.length / itemsPerPage), [filteredQuestions]);

  // Lógica para paginação
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentQuestions = filteredQuestions.slice(startIndex, endIndex);

  // Funções para manipulação
  const handleDeleteQuestion = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta questão?')) {
      setQuestions(questions.filter(question => question.id !== id));
    }
  };

  const handleEditQuestion = (id: string) => {
    const questionToEdit = questions.find(q => q.id === id);
    if (questionToEdit) {
      setCurrentQuestion(questionToEdit);
      setIsModalOpen(true);
    }
  };

  const handleViewQuestion = (id: string) => {
    // Implementar visualização detalhada da questão
    const questionToView = questions.find(q => q.id === id);
    if (questionToView) {
      // Por enquanto apenas exibimos no console, mas poderia abrir outro modal ou redirecionar
      console.log('Visualizando questão:', questionToView);
    }
  };

  const handleCreateQuestion = () => {
    setCurrentQuestion(undefined); // Reset current question for new creation
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentQuestion(undefined);
  };

  const handleSaveQuestion = (questionData: Omit<Question, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => {
    const now = new Date().toISOString();

    if (questionData.id) {
      // Atualizar questão existente
      setQuestions(questions.map(q =>
        q.id === questionData.id
          ? { ...questionData, updatedAt: now } as Question
          : q
      ));
    } else {
      // Criar nova questão
      const newQuestion: Question = {
        ...questionData,
        id: Math.random().toString(36).substring(2, 11), // Gera ID aleatório
        createdAt: now,
        updatedAt: now,
      } as Question;

      setQuestions([...questions, newQuestion]);
    }
  };

  const getContentName = (contentId: string) => {
    const content = contents.find(c => c.id === contentId);
    return content ? content.name : 'Não categorizado';
  };

  const getTopicForContent = (contentId: string) => {
    const content = contents.find(c => c.id === contentId);
    if (!content) return 'Não categorizado';

    const topic = topics.find(t => t.id === content.topicId);
    return topic ? topic.name : 'Não categorizado';
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset para primeira página ao pesquisar
  };

  // Renderizar a página
  return (
    <>
      <QuestionsManagementContainer>
        <Section>
          <QuestionsHeader justify="between" align="center">
            <Title>Gerenciamento de Questões</Title>
            <ActionButton onClick={handleCreateQuestion}>
              <FaPlus size={16} />
              Nova Questão
            </ActionButton>
          </QuestionsHeader>

          <Card>
            <Flex justify="between" align="center" gap="md" wrap>
              <SearchBar>
                <input
                  type="text"
                  placeholder="Pesquisar questões..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <FaSearch size={16} />
              </SearchBar>
              <Button onClick={() => setShowFilters(!showFilters)}>
                <FaFilter size={14} />
                Filtros
              </Button>
            </Flex>

            {showFilters && (
              <Card style={{ marginTop: '1rem' }}>
                <FiltersPanel
                  contents={contents}
                  onApply={handleApplyFilters}
                />
              </Card>
            )}

            <Divider />

            {loading ? (
              <p>Carregando questões...</p>
            ) : (
              <>
                <Table role="grid" aria-label="Lista de questões">
                  <thead>
                    <tr>
                      <TableHeader>ID</TableHeader>
                      <TableHeader>
                        <Flex align="center" gap="xs">
                          Enunciado
                          <FaSort size={12} />
                        </Flex>
                      </TableHeader>
                      <TableHeader>
                        <Flex align="center" gap="xs">
                          Tópico
                          <FaSort size={12} />
                        </Flex>
                      </TableHeader>
                      <TableHeader>
                        <Flex align="center" gap="xs">
                          Conteúdo
                          <FaSort size={12} />
                        </Flex>
                      </TableHeader>
                      <TableHeader>
                        <Flex align="center" gap="xs">
                          Tipo
                          <FaSort size={12} />
                        </Flex>
                      </TableHeader>
                      <TableHeader>
                        <Flex align="center" gap="xs">
                          Dificuldade
                          <FaSort size={12} />
                        </Flex>
                      </TableHeader>
                      <TableHeader>Ações</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {currentQuestions.length > 0 ? (
                      currentQuestions.map(question => (
                        <TableRow key={question.id}>
                          <TableCell>{question.id}</TableCell>
                          <TableCell>
                            <QuestionStatement title={question.statement}>
                              {question.statement}
                            </QuestionStatement>
                          </TableCell>
                          <TableCell>{getTopicForContent(question.contentId)}</TableCell>
                          <TableCell>{getContentName(question.contentId)}</TableCell>
                          <TableCell>
                            <TypeBadge type={question.questionType}>
                              {question.questionType === 'multiple_choice' && 'Múltipla Escolha'}
                              {question.questionType === 'true_false' && 'V/F'}
                              {question.questionType === 'essay' && 'Dissertativa'}
                            </TypeBadge>
                          </TableCell>
                          <TableCell>
                            <DifficultyBadge level={question.difficultyLevel}>
                              {question.difficultyLevel === 'easy' && 'Fácil'}
                              {question.difficultyLevel === 'medium' && 'Médio'}
                              {question.difficultyLevel === 'hard' && 'Difícil'}
                            </DifficultyBadge>
                          </TableCell>
                          <TableCell>
                            <ActionColumn>
                              <IconButton
                                title="Visualizar"
                                aria-label={`Visualizar questão ${question.id}`}
                                onClick={() => question.id && handleViewQuestion(question.id)}
                              >
                                <FaEye size={14} />
                              </IconButton>
                              <IconButton
                                title="Editar"
                                onClick={() => question.id && handleEditQuestion(question.id)}
                              >
                                <FaEdit size={14} />
                              </IconButton>
                              <IconButton
                                title="Excluir"
                                onClick={() => question.id && handleDeleteQuestion(question.id)}
                              >
                                <FaTrashAlt size={14} />
                              </IconButton>
                            </ActionColumn>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7}>
                          <EmptyStateMessage>
                            Nenhuma questão encontrada
                          </EmptyStateMessage>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>

                <PaginationContainer>
                  <PaginationInfo>
                    Mostrando {currentQuestions.length > 0 ? startIndex + 1 : 0} a {Math.min(endIndex, filteredQuestions.length)} de {filteredQuestions.length} questões
                  </PaginationInfo>
                  <PaginationControls>
                    <PageButton
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                      <FaChevronLeft size={14} />
                    </PageButton>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => {
                        if (totalPages <= 5) return true;
                        return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                      })
                      .map((page, index, array) => {
                        // Adicionar elipses
                        if (index > 0 && page - array[index - 1] > 1) {
                          return (
                            <React.Fragment key={`ellipsis-${page}`}>
                              <span>...</span>
                              <PageButton
                                className={currentPage === page ? 'active' : ''}
                                onClick={() => setCurrentPage(page)}
                              >
                                {page}
                              </PageButton>
                            </React.Fragment>
                          );
                        }
                        return (
                          <PageButton
                            key={page}
                            className={currentPage === page ? 'active' : ''}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </PageButton>
                        );
                      })}

                    <PageButton
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    >
                      <FaChevronRight size={14} />
                    </PageButton>
                  </PaginationControls>
                </PaginationContainer>
              </>
            )}
          </Card>
        </Section>
      </QuestionsManagementContainer>

      {/* Modal de questão */}
      <QuestionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        question={currentQuestion}
        topics={topics}
        contents={contents}
        onSave={handleSaveQuestion}
      />
    </>
  );
};

export default QuestionsManagementPage;