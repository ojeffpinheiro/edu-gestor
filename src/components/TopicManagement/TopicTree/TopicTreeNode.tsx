import React from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { CurriculumItem, HierarchyLevel } from '../../../utils/types/Topic';
import { ExpandButton, ItemIcon, ItemLabel, NavItem } from './TopicTreeNodeStyles';
import { ItemType } from '../communStyles';
import { getItemIcon } from '../../../utils/Icons';

interface TopicTreeNodeProps {
  item: CurriculumItem;
  level: number;
  selectItem: (item: CurriculumItem) => void;
  expandedItems: Set<string>;
  toggleExpand: (id: string, e: React.MouseEvent) => void;
  getLevelLabel: (type: HierarchyLevel) => string;
}

const TopicTreeNode: React.FC<TopicTreeNodeProps> = ({
  item,
  level,
  selectItem,
  expandedItems,
  toggleExpand,
  getLevelLabel
}) => {
  const isExpanded = expandedItems.has(item.id);
  const isHigherLevel = item.type === 'eixoTematico' || item.type === 'unidade' || item.type === 'capitulo';

  return (
    <div key={item.id}>
      <NavItem
        level={level}
        isSelected
        onClick={() => selectItem(item)}
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

      {isExpanded && item.children.length > 0 && (
        <div>
          {item.children.map(child => (
            <TopicTreeNode
              key={child.id}
              item={child}
              level={level + 1}
              selectItem={selectItem}
              expandedItems={expandedItems}
              toggleExpand={toggleExpand}
              getLevelLabel={getLevelLabel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicTreeNode;