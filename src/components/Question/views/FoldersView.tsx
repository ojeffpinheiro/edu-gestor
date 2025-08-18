import React, { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import {
    FoldersContainer,
    FoldersHeader,
    FoldersTitle,
    FoldersGrid,
    AddFolderCard,
    AddFolderIcon,
    AddFolderText,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from '../../../styles/folderManagementStyles';
import { ActionButton } from '../../../styles/header';
import FolderCard from '../FolderCard';
import { Category } from '../QuestionForm/type';

interface FoldersViewProps {
    categories: Category[];
    onAddFolder: (folderName: string) => Promise<void>;
    onEditFolder: (folderId: string, newName: string) => Promise<void>;
    onDeleteFolder: (folderId: string) => Promise<void>;
    onAddSubTopic: (folderId: string, subTopicName: string) => Promise<void>;
    onEditSubTopic: (folderId: string, subTopicId: string, newName: string) => Promise<void>;
    onDeleteSubTopic: (folderId: string, subTopicId: string) => Promise<void>;
}

const FoldersView: React.FC<FoldersViewProps> = ({
    categories,
    onAddFolder,
    onEditFolder,
    onDeleteFolder,
    onAddSubTopic,
    onEditSubTopic,
    onDeleteSubTopic
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [folderName, setFolderName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onAddFolder(folderName);
            setIsModalOpen(false);
            setFolderName('');
        } catch (error) {
            console.error('Error adding folder:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FoldersContainer>
            <FoldersHeader>
                <FoldersTitle>Gestão de Pastas</FoldersTitle>
                <ActionButton
                    className="primary"
                    onClick={() => setIsModalOpen(true)}
                    aria-label="Adicionar nova pasta"
                >
                    <FiPlus /> Nova Pasta
                </ActionButton>
            </FoldersHeader>

            <FoldersGrid>
                {categories.map(category => (
                    <FolderCard
                        key={category.id}
                        id={category.id}
                        name={category.name}
                        color={category.color}
                        count={category.count}
                        subTopics={category.subTopics || []}
                        onDelete={onDeleteFolder}
                        onEdit={onEditFolder}
                        onAddSubTopic={onAddSubTopic}
                        onEditSubTopic={onEditSubTopic}
                        onDeleteSubTopic={onDeleteSubTopic}
                    />
                ))}

                <AddFolderCard
                    onClick={() => setIsModalOpen(true)}
                    role="button"
                    aria-label="Adicionar pasta"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setIsModalOpen(true)}
                >
                    <AddFolderIcon>
                        <FiPlus />
                    </AddFolderIcon>
                    <AddFolderText>Adicionar Pasta</AddFolderText>
                </AddFolderCard>
            </FoldersGrid>

            {isModalOpen && (
                <ModalOverlay onClick={() => setIsModalOpen(false)}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <h3>Criar Nova Pasta</h3>
                            <ModalCloseButton
                                onClick={() => setIsModalOpen(false)}
                                aria-label="Fechar modal"
                            >
                                <FiX />
                            </ModalCloseButton>
                        </ModalHeader>
                        <form onSubmit={handleSubmit}>
                            <ModalBody>
                                <label htmlFor="folderName">Nome da Pasta</label>
                                <input
                                    id="folderName"
                                    type="text"
                                    value={folderName}
                                    onChange={(e) => setFolderName(e.target.value)}
                                    placeholder="Digite o nome da pasta"
                                    required
                                    autoFocus
                                />
                            </ModalBody>
                            <ModalFooter>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !folderName.trim()}
                                >
                                    {isSubmitting ? 'Criando...' : 'Criar Pasta'}
                                </button>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </FoldersContainer>
    );
};

export default FoldersView;