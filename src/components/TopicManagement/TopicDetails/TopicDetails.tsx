import React from 'react';
import { FaEdit, FaTrash, FaPlus, FaChevronRight } from 'react-icons/fa';
import { 
  DetailsContainer, 
  BreadcrumbNav, 
  BreadcrumbItem, 
  DetailHeader, 
  ItemTypeLabel, 
  DetailTitle, 
  ActionButtons, 
  ActionButton, 
  ContentSection, 
  SectionTitle, 
  ContentGrid 
} from './styles';
import { CurriculumItem, HierarchyLevel } from '../../../types/academic/Topic';
import EmptyTopicState from '../EmptyTopicState';
import TopicCard from '../TopicCard';
import AddCard from '../AddCard';
import EmptyContentState from '../EmptyContentState';

interface TopicDetailsProps {
  selectedItem: CurriculumItem | null;
  findBreadcrumb: (itemId: string) => CurriculumItem[];
  getLevelLabel: (type: HierarchyLevel) => string;
  getNextLevelType: (type: HierarchyLevel) => HierarchyLevel;
  setNewItemData: (data: { name: string; type: HierarchyLevel; parentId: string }) => void;
  setShowAddModal: (show: boolean) => void;
  selectItem: (item: CurriculumItem) => void;
}

const TopicDetails: React.FC<TopicDetailsProps> = ({
  selectedItem,
  findBreadcrumb,
  getLevelLabel,
  getNextLevelType,
  setNewItemData,
  setShowAddModal,
  selectItem
}) => {
  if (!selectedItem) {
    return <EmptyTopicState setShowAddModal={setShowAddModal} setNewItemData={setNewItemData} />;
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
              <TopicCard
                key={child.id}
                item={child}
                selectItem={selectItem}
                getLevelLabel={getLevelLabel}
              />
            ))}
            <AddCard
              onClick={() => {
                setNewItemData({
                  name: '',
                  type: getNextLevelType(selectedItem.type),
                  parentId: selectedItem.id
                });
                setShowAddModal(true);
              }}
            >
              <FaPlus size={20} />
              <span>Adicionar {getLevelLabel(getNextLevelType(selectedItem.type))}</span>
            </AddCard>
          </ContentGrid>
        </ContentSection>
      ) : (
        <EmptyContentState
          selectedItem={selectedItem}
          getNextLevelType={getNextLevelType}
          setNewItemData={setNewItemData}
          setShowAddModal={setShowAddModal}
          getLevelLabel={getLevelLabel}
        />
      )}
    </DetailsContainer>
  );
};

export default TopicDetails;