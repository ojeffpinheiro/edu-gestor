import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { CurriculumItem, HierarchyLevel } from '../../../types/academic/Topic';
import { EmptyContentMessage } from '../../../pages/TopicContentManagement/styles';
import { AddButton } from '../communStyles';

interface EmptyContentStateProps {
  selectedItem: CurriculumItem;
  getNextLevelType: (type: HierarchyLevel) => HierarchyLevel;
  setNewItemData: (data: { name: string; type: HierarchyLevel; parentId: string }) => void;
  setShowAddModal: (show: boolean) => void;
  getLevelLabel: (type: HierarchyLevel) => string;
}

const EmptyContentState: React.FC<EmptyContentStateProps> = ({
  selectedItem,
  getNextLevelType,
  setNewItemData,
  setShowAddModal,
  getLevelLabel
}) => {
  return (
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
  );
};

export default EmptyContentState;