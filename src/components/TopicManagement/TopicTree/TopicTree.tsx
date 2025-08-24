import React from 'react';
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';

import { CurriculumItem, HierarchyLevel } from '../../../types/academic/Topic.js';

import TopicTreeNode from './TopicTreeNode';

import { 
  NavigationPanel, 
  PanelHeader, 
  CollapseButton, 
  NavigationTree, 
  SearchBar 
} from './TopicTreeStyles.js';

interface TopicTreeProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  filteredData: CurriculumItem[];
  selectItem: (item: CurriculumItem) => void;
  expandedItems: Set<string>;
  toggleExpand: (id: string, e: React.MouseEvent) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  getLevelLabel: (type: HierarchyLevel) => string;
}

const TopicTree: React.FC<TopicTreeProps> = ({
  isCollapsed,
  setIsCollapsed,
  filteredData,
  selectItem,
  expandedItems,
  toggleExpand,
  searchTerm,
  setSearchTerm,
  getLevelLabel
}) => {
  return (
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
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>

      <NavigationTree>
        {filteredData.map(item => (
          <TopicTreeNode
            key={item.id}
            item={item}
            level={0}
            selectItem={selectItem}
            expandedItems={expandedItems}
            toggleExpand={toggleExpand}
            getLevelLabel={getLevelLabel}
          />
        ))}
      </NavigationTree>
    </NavigationPanel>
  );
};

export default TopicTree;