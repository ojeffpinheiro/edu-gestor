import React from 'react';
import { CurriculumItem, HierarchyLevel } from '../../../types/academic/Topic';
import { CardContent, CardIcon, CardTitle, CardType, ContentCard } from './styles';
import { getItemIcon } from '../../../utils/Icons';

interface TopicCardProps {
  item: CurriculumItem;
  selectItem: (item: CurriculumItem) => void;
  getLevelLabel: (type: HierarchyLevel) => string;
}

const TopicCard: React.FC<TopicCardProps> = ({ item, selectItem, getLevelLabel }) => {
  return (
    <ContentCard
      role="button"
      tabIndex={0}
      aria-label={`${item.name}, ${getLevelLabel(item.type)}`}
      onClick={() => selectItem(item)}
      onKeyDown={(e) => e.key === 'Enter' && selectItem(item)}
    >
      <CardIcon>{getItemIcon(item.type)}</CardIcon>
      <CardContent>
        <CardTitle>{item.name}</CardTitle>
        <CardType>{getLevelLabel(item.type)}</CardType>
      </CardContent>
    </ContentCard>
  );
};

export default TopicCard;