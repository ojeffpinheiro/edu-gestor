import React from 'react';
import { FiPlus } from 'react-icons/fi';
import {
    FoldersContainer,
    FoldersHeader,
    FoldersTitle,
    FoldersGrid,
    AddFolderCard,
    AddFolderIcon,
    AddFolderText,
} from '../../../styles/folderManagementStyles';
import { ActionButton } from '../../../styles/header';
import FolderCard from '../FolderCard';
import { Category } from '../QuestionForm/type';

interface FoldersViewProps {
    categories: Category[];
    onAddFolder: () => void;
}

const FoldersView: React.FC<FoldersViewProps> = ({ categories, onAddFolder }) => {
    return (
        <FoldersContainer>
            <FoldersHeader>
                <FoldersTitle>Gestão de Pastas</FoldersTitle>
                <ActionButton className="primary" onClick={onAddFolder}>
                    <FiPlus /> Nova Pasta
                </ActionButton>
            </FoldersHeader>

            <FoldersGrid>
                {categories.map(category => (
                    <FolderCard i={category.i} name={category.name}
                        color={category.color} count={category.count} />
                ))}

                <AddFolderCard onClick={onAddFolder}>
                    <AddFolderIcon>
                        <FiPlus />
                    </AddFolderIcon>
                    <AddFolderText>Adicionar Pasta</AddFolderText>
                </AddFolderCard>
            </FoldersGrid>
        </FoldersContainer>
    );
};

export default FoldersView;