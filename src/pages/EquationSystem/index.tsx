// index.tsx - Componente principal corrigido
import React, { useState, useEffect } from 'react';
import {
  FaEdit, FaTrash, FaPlus, FaTags, FaFilter,
  FaExclamationTriangle
} from 'react-icons/fa';

import { Equation } from '../../utils/types/Topic';
import { initialEquations } from '../../mocks/equation';

// Componentes
import EquationForm from '../../components/modals/EquationForm';
import Notification from '../../components/shared/Notification';
import ConfirmDialog from '../../components/shared/ConfirmDialog';

// Estilos
import {
  ActionButton,
  Actions,
  AddButton,
  ControlsWrapper,
  EmptyState,
  EquationCard,
  EquationContent,
  EquationHeader,
  EquationsGrid,
  FilterContainer,
  FilterSection,
  FilterTag,
  Header,
  SearchInput,
  Tag as TagComponent,
  TagFilter,
  TagIcon,
  TagsContainer,
  Title,
  ActiveFilters,
  ClearFiltersButton
} from './styles';
import { Container } from '../../styles/layoutUtils';
import EquationViewer from '../../components/Equation/EquationView';

/**
 * Sistema de Equações - Componente principal que gerencia o CRUD de equações físicas
 * e sua visualização em formato LaTeX
 */
const EquationSystem = () => {
  // Estado principal
  const [equations, setEquations] = useState<Equation[]>(initialEquations);
  const [filteredEquations, setFilteredEquations] = useState<Equation[]>(equations);

  // Filtros
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [filterTopics, setFilterTopics] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Estado do formulário
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEquation, setCurrentEquation] = useState<Equation | null>(null);

  // Estado de UI
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: '', name: '' });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Extrair todas as tags e tópicos únicos
  const allTags = Array.from(new Set(equations.flatMap(eq => eq.tags))).sort();
  const allTopics = Array.from(new Set(equations.flatMap(eq => eq.topics))).sort();

  // Filtrar equações quando os filtros ou equações mudam
  useEffect(() => {
    const filtered = equations.filter(equation => {
      // Filtrar por tags selecionadas
      const matchesTags = filterTags.length === 0 ||
        filterTags.every(tag => equation.tags.includes(tag));

      // Filtrar por tópicos selecionados
      const matchesTopics = filterTopics.length === 0 ||
        filterTopics.some(topic => equation.topics.includes(topic));

      // Filtrar por termo de busca
      const matchesSearch = searchTerm === '' ||
        equation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equation.latex.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesTags && matchesTopics && matchesSearch;
    });

    setFilteredEquations(filtered);
  }, [equations, filterTags, filterTopics, searchTerm]);

  /**
   * Manipuladores de CRUD para equações
   */
  const handleAddEquation = (newEquation: Equation) => {
    try {
      // Gerar ID único baseado em timestamp para evitar colisões
      const uniqueId = `eq_${Date.now()}`;
      const equationWithId = {
        ...newEquation,
        id: uniqueId,
        createdAt: new Date()
      };

      setEquations(prevEquations => [...prevEquations, equationWithId]);
      setShowForm(false);
      showNotification('Equação adicionada com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao adicionar equação:', error);
      showNotification('Erro ao adicionar equação. Tente novamente.', 'error');
    }
  };

  const handleUpdateEquation = (updatedEquation: Equation) => {
    try {
      setEquations(prevEquations =>
        prevEquations.map(eq => (eq.id === updatedEquation.id ? updatedEquation : eq))
      );
      setIsEditing(false);
      setCurrentEquation(null);
      setShowForm(false);
      showNotification('Equação atualizada com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao atualizar equação:', error);
      showNotification('Erro ao atualizar equação. Tente novamente.', 'error');
    }
  };

  const handleDeleteEquation = (id: string) => {
    try {
      setEquations(prevEquations => prevEquations.filter(eq => eq.id !== id));
      setConfirmDialog({ show: false, id: '', name: '' });
      showNotification('Equação removida com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao remover equação:', error);
      showNotification('Erro ao remover equação. Tente novamente.', 'error');
    }
  };

  /**
   * Manipuladores de filtros
   */
  const toggleTagFilter = (tag: string) => {
    setFilterTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const toggleTopicFilter = (topic: string) => {
    setFilterTopics(prev =>
      prev.includes(topic)
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const clearFilters = () => {
    setFilterTags([]);
    setFilterTopics([]);
    setSearchTerm('');
  };

  /**
   * Manipuladores de UI
   */
  const openEditForm = (equation: Equation) => {
    setIsEditing(true);
    setCurrentEquation(equation);
    setShowForm(true);
  };

  const openNewForm = () => {
    setIsEditing(false);
    setCurrentEquation(null);
    setShowForm(true);
  };

  const confirmDelete = (id: string, name: string) => {
    setConfirmDialog({ show: true, id, name });
  };

  const showNotification = (message: string, type: string) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleCloseEquationSystemModal = () => {
    setShowForm(false);
    setIsEditing(false);
    setCurrentEquation(null);
  }

  return (
    <Container>
      <Header>
        <Title>Sistema de Equações - Física e Matemática</Title>

        <div style={{ 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <FilterSection>
            <SearchInput
              type="text"
              placeholder="Buscar equações por nome, descrição ou fórmula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar equações"
            />

            <FilterContainer>
              <TagFilter>
                <details>
                  <summary>
                    <FaTags /> Tags <span>({filterTags.length ? filterTags.length : 'Todas'})</span>
                  </summary>
                  <div className="filter-options">
                    {allTags.map(tag => (
                      <FilterTag
                        key={tag}
                        onClick={() => toggleTagFilter(tag)}
                        isActive={filterTags.includes(tag)}
                      >
                        {tag}
                      </FilterTag>
                    ))}
                  </div>
                </details>
              </TagFilter>

              <TagFilter>
                <details>
                  <summary>
                    <FaFilter /> Tópicos <span>({filterTopics.length ? filterTopics.length : 'Todos'})</span>
                  </summary>
                  <div className="filter-options">
                    {allTopics.map(topic => (
                      <FilterTag
                        key={topic}
                        onClick={() => toggleTopicFilter(topic)}
                        isActive={filterTopics.includes(topic)}
                      >
                        {topic}
                      </FilterTag>
                    ))}
                  </div>
                </details>
              </TagFilter>
            </FilterContainer>
          </FilterSection>

          <ControlsWrapper>
            {(filterTags.length > 0 || filterTopics.length > 0 || searchTerm) && (
              <ActiveFilters>
                <span>Filtros ativos:</span>
                {filterTags.map(tag => (
                  <FilterTag key={tag} isActive={true} onClick={() => toggleTagFilter(tag)}>
                    {tag} ✕
                  </FilterTag>
                ))}
                {filterTopics.map(topic => (
                  <FilterTag key={topic} isActive={true} onClick={() => toggleTopicFilter(topic)}>
                    {topic} ✕
                  </FilterTag>
                ))}
                {searchTerm && (
                  <FilterTag isActive={true} onClick={() => setSearchTerm('')}>
                    "{searchTerm}" ✕
                  </FilterTag>
                )}
                <ClearFiltersButton onClick={clearFilters}>
                  Limpar filtros
                </ClearFiltersButton>
              </ActiveFilters>
            )}

            <AddButton onClick={openNewForm}>
              <FaPlus /> Nova Equação
            </AddButton>
          </ControlsWrapper>
        </div>
      </Header>

      <EquationsGrid>
        {filteredEquations.length > 0 ? (
          filteredEquations.map(equation => (
            <EquationCard key={equation.id}>
              <EquationHeader>
                <h3>{equation.name}</h3>
                <Actions>
                  <ActionButton
                    onClick={() => openEditForm(equation)}
                    aria-label="Editar equação"
                  >
                    <FaEdit />
                  </ActionButton>
                  <ActionButton
                    onClick={() => confirmDelete(equation.id, equation.name)}
                    aria-label="Excluir equação"
                  >
                    <FaTrash />
                  </ActionButton>
                </Actions>
              </EquationHeader>

              <EquationContent>
                {/* Visualizador de equações LaTeX */}
                <EquationViewer equation={equation.latex} />

                <TagsContainer>
                  <TagIcon><FaTags /></TagIcon>
                  {equation.tags.map((tag, index) => (
                    <TagComponent
                      key={index}
                      onClick={() => toggleTagFilter(tag)}
                      className={filterTags.includes(tag) ? 'active' : ''}
                    >
                      {tag}
                    </TagComponent>
                  ))}
                </TagsContainer>
              </EquationContent>
            </EquationCard>
          ))
        ) : (
          <EmptyState>
            <FaExclamationTriangle size={48} />
            <p>Nenhuma equação encontrada com os filtros atuais.</p>
            {(filterTags.length > 0 || filterTopics.length > 0 || searchTerm) && (
              <ClearFiltersButton onClick={clearFilters}>
                Limpar filtros
              </ClearFiltersButton>
            )}
          </EmptyState>
        )}
      </EquationsGrid>

      {/* Modal de formulário de equação */}
      {showForm && (
        <EquationForm
          isOpen={showForm}
          equation={isEditing ? currentEquation : null}
          onSave={isEditing ? handleUpdateEquation : handleAddEquation}
          onClose={handleCloseEquationSystemModal}
        />
      )}

      {/* Diálogo de confirmação para exclusão */}
      {confirmDialog.show && (
        <ConfirmDialog
          title="Confirmar exclusão"
          message={`Tem certeza que deseja excluir a equação "${confirmDialog.name}"?`}
          confirmLabel="Excluir"
          cancelLabel="Cancelar"
          onConfirm={() => handleDeleteEquation(confirmDialog.id)}
          onCancel={() => setConfirmDialog({ show: false, id: '', name: '' })}
        />
      )}

      {/* Notificações de feedback */}
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
        />
      )}
    </Container>
  );
};

export default EquationSystem;