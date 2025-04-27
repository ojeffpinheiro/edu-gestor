import React, { useState } from 'react';
import { FaCalculator, FaChevronDown, FaChevronRight, FaEdit, FaPlus, FaRocket, FaTrash } from 'react-icons/fa';

import { Topic } from '../../utils/types/Topic';


import TopicFilter from '../../components/Topic/TopicFilter';
import TopicForm from '../../components/Topic/TopicForm';
import { initialTopics, knowledgeAreas } from '../../mocks/topic';

// Estilos específicos da página
import { EmptyStateMessage } from '../../styles/table';
import { IconButton, PrimaryActionButton } from '../../styles/buttons';
import {
  AreaTag,
  TopicItem,
  TopicName,
  DisciplineTag,
  TopicActions,
  PageContainer,
  PageHeader,
  PageTitle,
  TopicTree
} from './styles'
import { Card } from '../../styles/card';

// Componente principal
const TopicManagementPage: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  
  // Estado para o formulário
  const [formData, setFormData] = useState({
    name: '',
    discipline: 'physics',
    knowledgeArea: '',
    parentId: ''
  });
  
  // Função para obter todas as áreas de conhecimento dos tópicos
  const getUniqueAreas = (): string[] => {
    const areas = new Set<string>();
    
    const collectAreas = (topicList: Topic[]) => {
      topicList.forEach(topic => {
        areas.add(topic.knowledgeArea);
        collectAreas(topic.children);
      });
    };
    
    collectAreas(topics);
    return Array.from(areas);
  };
  
  // Função para obter todos os tópicos em formato de lista plana
  const getFlatTopicsList = (topicList: Topic[] = topics, result: Topic[] = []): Topic[] => {
    topicList.forEach(topic => {
      result.push(topic);
      getFlatTopicsList(topic.children, result);
    });
    return result;
  };
  
  // Função para alternar a expansão de um tópico
  const toggleTopic = (id: string) => {
    setExpandedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  
  // Abrir modal de adição de tópico
  const openAddTopicModal = () => {
    setFormData({
      name: '',
      discipline: 'physics',
      knowledgeArea: '',
      parentId: ''
    });
    setShowAddModal(true);
  };
  
  // Abrir modal de edição de tópico
  const openEditTopicModal = (topic: Topic, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTopic(topic);
    setFormData({
      name: topic.title,
      discipline: topic.discipline,
      knowledgeArea: topic.knowledgeArea,
      parentId: topic.parentId || ''
    });
    setShowEditModal(true);
  };
  
  // Fechar todos os modais
  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedTopic(null);
  };
  
  // Atualizar dados do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Gerar ID único
  const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };
  
  // Adicionar tópico
  const addTopic = () => {
    const newTopic: Topic = {
      id: generateId(),
      title: formData.name,
      discipline: formData.discipline as 'Física' | 'Matemática',
      knowledgeArea: formData.knowledgeArea,
      parentId: formData.parentId || null,
      level: 0, // será calculado depois
      children: []
    };
    
    // Se não tiver pai, adiciona como tópico raiz
    if (!formData.parentId) {
      setTopics(prev => [...prev, newTopic]);
      closeModals();
      return;
    }
    
    // Função para adicionar tópico filho recursivamente
    const addChildTopic = (topicList: Topic[], parentId: string, level: number): Topic[] => {
      return topicList.map(topic => {
        if (topic.id === parentId) {
          // Atualiza o nível do novo tópico
          newTopic.level = level + 1;
          return {
            ...topic,
            children: [...topic.children, newTopic]
          };
        }
        
        if (topic.children.length > 0) {
          return {
            ...topic,
            children: addChildTopic(topic.children, parentId, topic.level)
          };
        }
        
        return topic;
      });
    };
    
    setTopics(prev => addChildTopic(prev, formData.parentId, 0));
    closeModals();
  };
  
  // Editar tópico
  const editTopic = () => {
    if (!selectedTopic) return;
    
    // Função para editar tópico recursivamente
    const updateTopic = (topicList: Topic[], topicId: string): Topic[] => {
      return topicList.map(topic => {
        if (topic.id === topicId) {
          return {
            ...topic,
            title: formData.name,
            discipline: formData.discipline as 'Física' | 'Matemática',
            knowledgeArea: formData.knowledgeArea,
          };
        }
        
        if (topic.children.length > 0) {
          return {
            ...topic,
            children: updateTopic(topic.children, topicId)
          };
        }
        
        return topic;
      });
    };
    
    setTopics(prev => updateTopic(prev, selectedTopic.id));
    closeModals();
  };
  
  // Excluir tópico
  const deleteTopic = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Tem certeza que deseja excluir este tópico? Esta ação excluirá também todos os subtópicos!")) {
      return;
    }
    
    // Função para remover tópico recursivamente
    const removeTopic = (topicList: Topic[], id: string): Topic[] => {
      return topicList.filter(topic => {
        if (topic.id === id) {
          return false;
        }
        
        if (topic.children.length > 0) {
          topic.children = removeTopic(topic.children, id);
        }
        
        return true;
      });
    };
    
    setTopics(prev => removeTopic(prev, topicId));
  };
  
  // Filtrar tópicos com base na pesquisa e filtros
  const filterTopics = (topicList: Topic[]): Topic[] => {
    // Se não há filtros, retorna a lista original
    if (searchTerm === '' && selectedDiscipline === 'all' && selectedArea === 'all') {
      return topicList;
    }
    
    // Filtra recursivamente
    const filterRecursive = (list: Topic[]): Topic[] => {
      return list.reduce<Topic[]>((filtered, topic) => {
        let matches = true;
        
        // Filtra por termo de pesquisa
        if (searchTerm && !topic.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          matches = false;
        }
        
        // Filtra por disciplina
        if (selectedDiscipline !== 'all' && topic.discipline !== selectedDiscipline) {
          matches = false;
        }
        
        // Filtra por área de conhecimento
        if (selectedArea !== 'all' && topic.knowledgeArea !== selectedArea) {
          matches = false;
        }
        
        // Processa os filhos
        const filteredChildren = filterRecursive(topic.children);
        
        // Se o tópico corresponde ou tem filhos que correspondem, adiciona-o
        if (matches || filteredChildren.length > 0) {
          filtered.push({
            ...topic,
            children: filteredChildren
          });
        }
        
        return filtered;
      }, []);
    };
    
    return filterRecursive(topicList);
  };
  
  // Renderizar a árvore de tópicos
  const renderTopicTree = (topicList: Topic[]) => {
    const filteredTopics = filterTopics(topicList);
    
    if (filteredTopics.length === 0) {
      return (
        <EmptyStateMessage>
          Nenhum tópico encontrado. Tente ajustar os filtros ou adicione um novo tópico.
        </EmptyStateMessage>
      );
    }
    
    return filteredTopics.map(topic => (
      <React.Fragment key={topic.id}>
        <TopicItem 
          level={topic.level} 
          isExpanded={expandedTopics.has(topic.id)}
          onClick={() => toggleTopic(topic.id)}
        >
          <TopicName>
            {topic.children.length > 0 ? (
              expandedTopics.has(topic.id) ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />
            ) : <span style={{ width: '14px' }}></span>}
            
            {topic.discipline === 'Física' ? (
              <FaRocket size={16} color="#3498db" />
            ) : (
              <FaCalculator size={16} color="#27ae60" />
            )}
            
            {topic.title}
            
            <DisciplineTag discipline={topic.discipline}>
              {topic.discipline === 'Física' ? 'Física' : 'Matemática'}
            </DisciplineTag>
            
            <AreaTag>{topic.knowledgeArea}</AreaTag>
          </TopicName>
          
          <TopicActions>
            <IconButton onClick={(e) => openEditTopicModal(topic, e)}>
              <FaEdit />
            </IconButton>
            <IconButton onClick={(e) => deleteTopic(topic.id, e)}>
              <FaTrash />
            </IconButton>
          </TopicActions>
        </TopicItem>
        
        {expandedTopics.has(topic.id) && topic.children.length > 0 && renderTopicTree(topic.children)}
      </React.Fragment>
    ));
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Gerenciamento de Tópicos</PageTitle>
        <PrimaryActionButton onClick={openAddTopicModal}>
          <FaPlus />
          Adicionar Tópico
        </PrimaryActionButton>
      </PageHeader>
      
      <Card>
        <TopicFilter
          searchTerm={searchTerm}
          selectedDiscipline={selectedDiscipline}
          selectedArea={selectedArea}
          areas={getUniqueAreas()}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onDisciplineChange={(e) => setSelectedDiscipline(e.target.value)}
          onAreaChange={(e) => setSelectedArea(e.target.value)}
        />
        
        <TopicTree>
          {renderTopicTree(topics)}
        </TopicTree>
      </Card>
      
      {/* Modal de Adição de Tópico */}
      <TopicForm
        showModal={showAddModal}
        isEditing={false}
        selectedTopic={null}
        formData={formData}
        knowledgeAreas={knowledgeAreas}
        topicsList={getFlatTopicsList()}
        onInputChange={handleInputChange}
        onSave={addTopic}
        onClose={closeModals}
      />
      
      {/* Modal de Edição de Tópico */}
      <TopicForm
        showModal={showEditModal}
        isEditing={true}
        selectedTopic={selectedTopic}
        formData={formData}
        knowledgeAreas={knowledgeAreas}
        topicsList={getFlatTopicsList()}
        onInputChange={handleInputChange}
        onSave={editTopic}
        onClose={closeModals}
      />
    </PageContainer>
  );
};

export default TopicManagementPage;