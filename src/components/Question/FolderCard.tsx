import React from 'react'
import { FiFolder, FiMoreVertical } from "react-icons/fi"
import { FolderActionItem, FolderActions, FolderActionsDropdown, FolderCardContent, FolderCount, FolderHeader, FolderIcon, FolderMoreButton, FolderTitle } from "../../styles/folderManagementStyles"
import { Category } from './QuestionForm/type';

const FolderCard = ({ name, color, count, i }: Category) => {
    return (
        <FolderCardContent key={i}>
            <FolderHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <FolderIcon>
                        <FiFolder />
                    </FolderIcon>
                    <div>
                        <FolderTitle>{name}</FolderTitle>
                        <FolderCount>{count} questões</FolderCount>
                    </div>
                </div>

                <FolderActions>
                    <FolderMoreButton>
                        <FiMoreVertical />
                    </FolderMoreButton>
                    <FolderActionsDropdown>
                        <FolderActionItem>Editar</FolderActionItem>
                        <FolderActionItem className="delete">Excluir</FolderActionItem>
                    </FolderActionsDropdown>
                </FolderActions>
            </FolderHeader>
        </FolderCardContent>
    );
}

export default FolderCard;