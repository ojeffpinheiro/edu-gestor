import React, { useMemo, useState } from 'react';
import {
  FaBook,
  FaChevronRight,
  FaChevronDown,
  FaEdit,
  FaTrash,
  FaPlus,
  FaLayerGroup,
  FaCubes,
  FaBookOpen,
  FaAlignLeft,
  FaChevronLeft,
  FaSearch,
  FaTimes
} from 'react-icons/fa';
import {
  ActionButton,
  ActionButtons,
  AddButton,
  AddCard,
  PageContainer,
  BreadcrumbItem,
  BreadcrumbNav,
  CardContent,
  CardIcon,
  CardTitle,
  CardType,
  ContentCard,
  ContentGrid,
  ContentPanel,
  ContentSection,
  DetailHeader,
  DetailsContainer, DetailTitle, EmptyContentMessage, EmptyState, ExpandButton,
  ItemIcon, ItemLabel, ItemType, ItemTypeLabel, MainLayout,
  ModalContent, ModalOverlay, NavigationPanel,
  NavigationTree, NavItem, PageHeader, PageTitle,
  PanelHeader, SectionTitle,
  CancelButton,
  CloseButton,
  FormGroup,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  SaveButton,
  Select,
  CollapseButton,
  SearchBar,
  LoadingSpinner,
  ErrorText
} from './styles';
import { CurriculumItem, HierarchyLevel } from '../../utils/types/Topic';
import { initialCurriculumItem } from '../../mocks/topic';

// Componente principal
const TopicManagementPage = () => {
  const [data, setData] = useState<CurriculumItem[]>(initialCurriculumItem);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['eixo1', 'unidade1', 'cap1']));
  const [selectedItem, setSelectedItem] = useState<CurriculumItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [editItem, setEditItem] = useState<CurriculumItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [newItemData, setNewItemData] = useState({
    name: '',
    type: 'titulo' as HierarchyLevel,
    parentId: ''
  });

  // Função para expandir/colapsar um item
  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Selecionar um item
  const selectItem = (item: CurriculumItem) => {
    setSelectedItem(item);
  };

  // Gerar ícone conforme o tipo de item
  const getItemIcon = (type: HierarchyLevel) => {
    switch (type) {
      case 'eixoTematico':
        return <FaLayerGroup size={16} />;
      case 'unidade':
        return <FaBook size={16} />;
      case 'capitulo':
        return <FaCubes size={16} />;
      case 'titulo':
        return <FaBookOpen size={16} />;
      case 'subtitulo':
        return <FaAlignLeft size={16} />;
      default:
        return <FaBook size={16} />;
    }
  };

  // Função para adicionar novo item
  const handleAddItem = () => {
    if (!validateForm()) return;

    const newItem: CurriculumItem = {
      id: `id-${Date.now()}`,
      name: newItemData.name,
      type: newItemData.type,
      parentId: newItemData.parentId || null,
      children: []
    };

    // Função recursiva para adicionar item ao lugar correto na hierarquia
    const addItemToHierarchy = (items: CurriculumItem[]): CurriculumItem[] => {
      return items.map(item => {
        if (item.id === newItemData.parentId) {
          return {
            ...item,
            children: [...item.children, newItem]
          };
        } else if (item.children.length > 0) {
          return {
            ...item,
            children: addItemToHierarchy(item.children)
          };
        }
        return item;
      });
    };

    // Se não tem parentId, adiciona no nível raiz
    if (!newItemData.parentId) {
      setData([...data, newItem]);
    } else {
      setData(addItemToHierarchy(data));
    }

    setShowAddModal(false);
    setNewItemData({
      name: '',
      type: 'titulo',
      parentId: ''
    });
  };

  // Obter lista plana de todos os items
  const getAllItems = (items: CurriculumItem[] = data, result: CurriculumItem[] = []): CurriculumItem[] => {
    items.forEach(item => {
      result.push(item);
      if (item.children.length > 0) {
        getAllItems(item.children, result);
      }
    });
    return result;
  };

  // Renderizar a árvore de navegação
  const renderNavigationItem = (item: CurriculumItem, level: number = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const isSelected = selectedItem?.id === item.id;
    const showChildren = isExpanded && item.children.length > 0;
    const isHigherLevel = item.type === 'eixoTematico' || item.type === 'unidade' || item.type === 'capitulo';

    return (
      <div key={item.id}>
        <NavItem
          level={level}
          onClick={() => selectItem(item)}
          isSelected={isSelected}
          isHigherLevel={isHigherLevel}
        >
          <ItemLabel>
            {item.children.length > 0 && (
              <ExpandButton onClick={(e) => toggleExpand(item.id, e)}>
                {isExpanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
              </ExpandButton>
            )}
            <ItemIcon>{getItemIcon(item.type)}</ItemIcon>
            <span>{item.name}</span>
          </ItemLabel>

          <ItemType>{getLevelLabel(item.type)}</ItemType>
        </NavItem>

        {showChildren && (
          <div>
            {item.children.map(child => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Obter label amigável para o tipo de nível
  const getLevelLabel = (type: HierarchyLevel): string => {
    switch (type) {
      case 'eixoTematico': return 'Eixo';
      case 'unidade': return 'Unidade';
      case 'capitulo': return 'Capítulo';
      case 'titulo': return 'Título';
      case 'subtitulo': return 'Subtítulo';
      default: return type;
    }
  };

  // Encontrar o caminho completo de um item até a raiz
  const findBreadcrumb = (itemId: string): CurriculumItem[] => {
    const result: CurriculumItem[] = [];
    const allItems = getAllItems();

    const findParents = (id: string | null) => {
      if (!id) return;

      const item = allItems.find(i => i.id === id);
      if (item) {
        result.unshift(item);
        findParents(item.parentId);
      }
    };

    findParents(itemId);
    return result;
  };

  // Renderizar detalhes do item selecionado
  const renderItemDetails = () => {
    if (!selectedItem) {
      return (
        <EmptyState className="fade-in">
          <FaLayerGroup size={64} />
          <h2>Organização de Conteúdos</h2>
          <p>Selecione um item na árvore de navegação para visualizar ou editar seus detalhes</p>
          <AddButton onClick={() => {
            setNewItemData({ name: '', type: 'eixoTematico', parentId: '' });
            setShowAddModal(true);
          }}>
            <FaPlus />
            <span>Criar Primeiro Eixo Temático</span>
          </AddButton>
        </EmptyState>
      );
    }

    const breadcrumb = findBreadcrumb(selectedItem.id);

    return (
      <DetailsContainer>
        <BreadcrumbNav>
          {breadcrumb.map((item, index) => (
            <span key={item.id}>
              {index > 0 && <FaChevronRight size={10} style={{ margin: '0 8px' }} />}
              <BreadcrumbItem onClick={() => selectItem(item)}>
                {item.name}
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbNav>

        <DetailHeader>
          <div>
            <ItemTypeLabel>{getLevelLabel(selectedItem.type)}</ItemTypeLabel>
            <DetailTitle>{selectedItem.name}</DetailTitle>
          </div>
          <ActionButtons>
            <ActionButton>
              <FaEdit />
            </ActionButton>
            <ActionButton>
              <FaTrash />
            </ActionButton>
          </ActionButtons>
        </DetailHeader>

        {selectedItem.children.length > 0 ? (
          <ContentSection>
            <SectionTitle>Conteúdo</SectionTitle>
            <ContentGrid>
              {selectedItem.children.map(child => (
                <ContentCard
                  role="button"
                  tabIndex={0}
                  aria-label={`${child.name}, ${getLevelLabel(child.type)}`}
                  onClick={() => selectItem(child)}
                  onKeyDown={(e) => e.key === 'Enter' && selectItem(child)}
                >
                  <CardIcon>{getItemIcon(child.type)}</CardIcon>
                  <CardContent>
                    <CardTitle>{child.name}</CardTitle>
                    <CardType>{getLevelLabel(child.type)}</CardType>
                  </CardContent>
                </ContentCard>
              ))}
              <AddCard onClick={() => {
                setNewItemData({
                  name: '',
                  type: getNextLevelType(selectedItem.type),
                  parentId: selectedItem.id
                });
                setShowAddModal(true);
              }}>
                <FaPlus size={20} />
                <span>Adicionar {getLevelLabel(getNextLevelType(selectedItem.type))}</span>
              </AddCard>
            </ContentGrid>
          </ContentSection>
        ) : (
          <EmptyContentMessage>
            <p>Este item não possui conteúdos. Adicione um novo item abaixo.</p>
            <AddButton onClick={() => {
              setNewItemData({
                name: '',
                type: getNextLevelType(selectedItem.type),
                parentId: selectedItem.id
              });
              setShowAddModal(true);
            }}>
              <FaPlus />
              <span>Adicionar {getLevelLabel(getNextLevelType(selectedItem.type))}</span>
            </AddButton>
          </EmptyContentMessage>
        )}
      </DetailsContainer>
    );
  };

  // Determinar o próximo nível na hierarquia
  const getNextLevelType = (currentType: HierarchyLevel): HierarchyLevel => {
    switch (currentType) {
      case 'eixoTematico': return 'unidade';
      case 'unidade': return 'capitulo';
      case 'capitulo': return 'titulo';
      case 'titulo': return 'subtitulo';
      default: return 'subtitulo';
    }
  };

  // Funções CRUD adicionais
  const handleEditItem = () => {
    if (!editItem) return;

    setData(prevData => {
      const updateItem = (items: CurriculumItem[]): CurriculumItem[] => {
        return items.map(item => {
          if (item.id === editItem.id) {
            return { ...item, ...editItem };
          }
          if (item.children.length > 0) {
            return { ...item, children: updateItem(item.children) };
          }
          return item;
        });
      };

      return updateItem(prevData);
    });

    setEditItem(null);
    setSelectedItem(editItem);
  };

  const handleDeleteItem = (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) return;

    setData(prevData => {
      const deleteItem = (items: CurriculumItem[]): CurriculumItem[] => {
        return items.filter(item => item.id !== id)
          .map(item => ({
            ...item,
            children: item.children ? deleteItem(item.children) : []
          }));
      };

      return deleteItem(prevData);
    });

    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  // Função de busca
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    const searchItems = (items: CurriculumItem[]): CurriculumItem[] => {
      return items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).map(item => ({
        ...item,
        children: searchItems(item.children)
      }));
    };

    return searchItems(data);
  }, [data, searchTerm]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simular chamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      handleAddItem();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!newItemData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (newItemData.name.length > 100) {
      newErrors.name = 'Nome muito longo (máx. 100 caracteres)';
    }

    if (newItemData.type !== 'eixoTematico' && !newItemData.parentId) {
      newErrors.parentId = 'Selecione um item pai';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Organização de Sequências Didáticas</PageTitle>
        <AddButton onClick={() => {
          setNewItemData({ name: '', type: 'eixoTematico', parentId: '' });
          setShowAddModal(true);
        }}>
          <FaPlus />
          <span>Adicionar Eixo Temático</span>
        </AddButton>
      </PageHeader>


      <MainLayout className={isCollapsed ? 'collapsed' : ''}>
        <NavigationPanel>
          <PanelHeader>
            {!isCollapsed && <span>Estrutura do Conteúdo</span>}
            <CollapseButton
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-label={isCollapsed ? 'Expandir painel' : 'Recolher painel'}
            >
              {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </CollapseButton>
          </PanelHeader>

          <SearchBar>
            <FaSearch />
            <Input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>

          <NavigationTree>
            {filteredData.map(item => renderNavigationItem(item))}
          </NavigationTree>
        </NavigationPanel>

        <ContentPanel>
          {renderItemDetails()}
        </ContentPanel>
      </MainLayout>

      {/* Modal para adicionar novo item */}
      {showAddModal && (
        <ModalOverlay
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <ModalContent>
            <ModalHeader>
              <h3 id="modal-title">Adicionar {getLevelLabel(newItemData.type)}</h3>
              <CloseButton
                onClick={() => setShowAddModal(false)}
                aria-label="Fechar modal"
              >
                <FaTimes />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <label>Nome</label>
                <Input
                  type="text"
                  value={newItemData.name}
                  onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                  placeholder={`Nome do ${getLevelLabel(newItemData.type).toLowerCase()}`}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <ErrorText>{errors.name}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <label>Tipo</label>
                <Select
                  value={newItemData.type}
                  onChange={(e) => setNewItemData({ ...newItemData, type: e.target.value as HierarchyLevel })}
                >
                  <option value="eixoTematico">Eixo Temático</option>
                  <option value="unidade">Unidade</option>
                  <option value="capitulo">Capítulo</option>
                  <option value="titulo">Título</option>
                  <option value="subtitulo">Subtítulo</option>
                </Select>
                {errors.type && <ErrorText>{errors.type}</ErrorText>}
              </FormGroup>

              {newItemData.type !== 'eixoTematico' && (
                <FormGroup>
                  <label>Item Pai</label>
                  <Select
                    value={newItemData.parentId}
                    onChange={(e) => setNewItemData({ ...newItemData, parentId: e.target.value })}
                  >
                    <option value="">Selecione um item pai</option>
                    {getAllItems()
                      .filter(item => {
                        // Filtrar os itens pai válidos com base na hierarquia
                        if (newItemData.type === 'unidade') return item.type === 'eixoTematico';
                        if (newItemData.type === 'capitulo') return item.type === 'unidade';
                        if (newItemData.type === 'titulo') return item.type === 'capitulo';
                        if (newItemData.type === 'subtitulo') return item.type === 'titulo';
                        return false;
                      })
                      .map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                  </Select>
                </FormGroup>
              )}
            </ModalBody>
            <ModalFooter>
              <CancelButton onClick={() => setShowAddModal(false)}>Cancelar</CancelButton>
              <SaveButton
                onClick={handleSave}
                disabled={!newItemData.name || isLoading}
              >
                {isLoading ? (
                  <LoadingSpinner size="16px" />
                ) : (
                  'Salvar'
                )}
              </SaveButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default TopicManagementPage;