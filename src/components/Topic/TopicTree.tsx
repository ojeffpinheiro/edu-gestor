import React from 'react';
import {
    FaEdit,
    FaTrash,
    FaChevronDown,
    FaChevronRight,
    FaRocket,
    FaCalculator
} from 'react-icons/fa';

import { EmptyStateMessage } from '../../styles/table';
import { Topic } from '../../types/academic/Topic';
import { TopicTreeStyles } from './styles'
import { IconButton } from '../../styles/buttons';

interface TopicTreeProps {
    topics: Topic[];
    expandedTopics: Set<string>;
    onToggleTopic: (id: string) => void;
    onEditTopic: (topic: Topic, e: React.MouseEvent) => void;
    onDeleteTopic: (id: string, e: React.MouseEvent) => void;
}

const TopicTree: React.FC<TopicTreeProps> = ({ 
  topics, 
  expandedTopics, 
  onToggleTopic, 
  onEditTopic, 
  onDeleteTopic 
}) => {
  const { AreaTag, DisciplineTag, TopicActions, TopicItem, TopicName, TreeContainer } = TopicTreeStyles

  if (topics.length === 0) {
    return (
      <EmptyStateMessage>
        Nenhum tópico encontrado. Tente ajustar os filtros ou adicione um novo tópico.
      </EmptyStateMessage>
    );
  }

  // Função auxiliar para obter todos os tópicos raiz (sem pai)
  const getRootTopics = () => {
    return topics.filter(topic => topic.parentId === null);
  };

  // Função auxiliar para obter subtópicos de um tópico específico
  const getChildTopics = (parentId: string) => {
    return topics.filter(topic => topic.parentId === parentId);
  };

  // Função para renderizar tópicos de forma recursiva
  const renderTopicItems = (parentId: string | null) => {
    const topicsToRender = parentId === null ? getRootTopics() : getChildTopics(parentId);
    
    return topicsToRender.map(topic => {
      const hasChildren = topics.some(t => t.parentId === topic.id);
      const isExpanded = expandedTopics.has(topic.id);
      
      return (
        <React.Fragment key={topic.id}>
          <TopicItem 
            level={topic.level} 
            isExpanded={isExpanded}
            onClick={() => onToggleTopic(topic.id)}
          >
            <TopicName>
              {hasChildren && (
                isExpanded ? <FaChevronDown /> : <FaChevronRight />
              )}
              <span>{topic.title}</span>
              
              <DisciplineTag 
                discipline={topic.discipline === 'Física' ? 'Física' : 'Matemática'}
              >
                {topic.discipline === 'Física' ? (
                  <>
                    <FaRocket size={12} />
                    Física
                  </>
                ) : (
                  <>
                    <FaCalculator size={12} />
                    Matemática
                  </>
                )}
              </DisciplineTag>
              
              <AreaTag>
                {topics.find(area => area.knowledgeArea === topic.knowledgeArea)?.knowledgeArea || 'Área não especificada'}
              </AreaTag>
            </TopicName>
            
            <TopicActions>
              <IconButton 
                onClick={(e) => onEditTopic(topic, e)}
                aria-label="Editar tópico"
              >
                <FaEdit />
              </IconButton>
              <IconButton 
                onClick={(e) => onDeleteTopic(topic.id, e)}
                aria-label="Excluir tópico"
              >
                <FaTrash />
              </IconButton>
            </TopicActions>
          </TopicItem>
          
          {/* Renderizar subtópicos se o tópico atual estiver expandido */}
          {isExpanded && hasChildren && renderTopicItems(topic.id)}
        </React.Fragment>
      );
    });
  };

  return (
    <TreeContainer>
      {renderTopicItems(null)}
    </TreeContainer>
  );
};

export default TopicTree;