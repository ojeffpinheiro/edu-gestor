import { useState, useMemo } from 'react';
import { CurriculumItem, HierarchyLevel } from '../utils/types/Topic';

export const useTopicManagement = (initialData: CurriculumItem[]) => {
  const [data, setData] = useState<CurriculumItem[]>(initialData);
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

  const selectItem = (item: CurriculumItem) => {
    setSelectedItem(item);
  };

  const getAllItems = (items: CurriculumItem[] = data, result: CurriculumItem[] = []): CurriculumItem[] => {
    items.forEach(item => {
      result.push(item);
      if (item.children.length > 0) {
        getAllItems(item.children, result);
      }
    });
    return result;
  };

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

  const getNextLevelType = (currentType: HierarchyLevel): HierarchyLevel => {
    switch (currentType) {
      case 'eixoTematico': return 'unidade';
      case 'unidade': return 'capitulo';
      case 'capitulo': return 'titulo';
      case 'titulo': return 'subtitulo';
      default: return 'subtitulo';
    }
  };

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

  const handleAddItem = () => {
    if (!validateForm()) return;

    const newItem: CurriculumItem = {
      id: `id-${Date.now()}`,
      name: newItemData.name,
      type: newItemData.type,
      parentId: newItemData.parentId || null,
      children: []
    };

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

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      handleAddItem();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    expandedItems,
    selectedItem,
    showAddModal,
    isLoading,
    errors,
    isCollapsed,
    editItem,
    searchTerm,
    newItemData,
    filteredData,
    toggleExpand,
    selectItem,
    setShowAddModal,
    setNewItemData,
    setIsCollapsed,
    setSearchTerm,
    getLevelLabel,
    findBreadcrumb,
    getNextLevelType,
    getAllItems,
    handleSave,
    validateForm
  };
};