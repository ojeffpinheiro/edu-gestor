import React, { useState, useRef, useEffect } from 'react';
import { FiEdit2, FiFolder, FiMoreVertical, FiTrash2, FiX, FiPlus } from "react-icons/fi";
import {
    FolderActionItem,
    FolderActions,
    FolderActionsDropdown,
    FolderCardContainer,
    FolderCardContent,
    FolderCount,
    FolderIcon,
    FolderMoreButton,
    FolderTitle,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody
} from "../../styles/folderManagementStyles";
import { Category, SubTopic } from './QuestionForm/type';
import { ActionButton } from '../../styles/header';

interface FolderCardProps extends Category {
    onDelete: (id: string) => void;
    onEdit: (id: string, newName: string) => void;
    onAddSubTopic: (folderId: string, subTopicName: string) => void;
    onEditSubTopic: (folderId: string, subTopicId: string, newName: string) => void;
    onDeleteSubTopic: (folderId: string, subTopicId: string) => void;
}

const FolderCard = ({ 
    id, 
    name, 
    color, 
    count, 
    subTopics = [], 
    onDelete, 
    onEdit, 
    onAddSubTopic,
    onEditSubTopic,
    onDeleteSubTopic
}: FolderCardProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name);
    const [newSubTopicName, setNewSubTopicName] = useState('');
    const [editingSubTopicId, setEditingSubTopicId] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditingSubTopicId(null);
    };

    const handleEdit = () => {
        onEdit(id, newName);
        setIsEditing(false);
    };

    const handleAddSubTopic = () => {
        if (newSubTopicName.trim()) {
            onAddSubTopic(id, newSubTopicName);
            setNewSubTopicName('');
        }
    };

    const startEditingSubTopic = (subTopic: SubTopic) => {
        setEditingSubTopicId(subTopic.id);
        setNewSubTopicName(subTopic.name);
    };

    const saveSubTopicEdit = () => {
        if (editingSubTopicId && newSubTopicName.trim()) {
            onEditSubTopic(id, editingSubTopicId, newSubTopicName);
            setEditingSubTopicId(null);
            setNewSubTopicName('');
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
        if (modalRef.current && isModalOpen && !modalRef.current.contains(event.target as Node)) {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen, handleClickOutside]);

    return (
        <>
            <FolderCardContainer onClick={openModal}>
                <FolderCardContent>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <FolderIcon className={color}>
                            <FiFolder />
                        </FolderIcon>
                        <div>
                            <FolderTitle>{name}</FolderTitle>
                            <FolderCount>{count} questões • {subTopics.length} subtópicos</FolderCount>
                        </div>
                    </div>

                    <FolderActions ref={dropdownRef} onClick={(e) => e.stopPropagation()}>
                        <FolderMoreButton
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleDropdown();
                            }}
                            aria-label={`Ações para a pasta ${name}`}
                            aria-haspopup="true"
                            aria-expanded={isDropdownOpen}
                        >
                            <FiMoreVertical />
                        </FolderMoreButton>
                        <FolderActionsDropdown isOpen={isDropdownOpen}>
                            <FolderActionItem onClick={(e) => {
                                e.stopPropagation();
                                setIsEditing(true);
                                openModal();
                                setIsDropdownOpen(false);
                            }}>
                                <FiEdit2 /> Editar Pasta
                            </FolderActionItem>
                            <FolderActionItem 
                                className="delete" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete(id);
                                    setIsDropdownOpen(false);
                                }}
                            >
                                <FiTrash2 /> Excluir Pasta
                            </FolderActionItem>
                        </FolderActionsDropdown>
                    </FolderActions>
                </FolderCardContent>
            </FolderCardContainer>

            {isModalOpen && (
                <ModalOverlay>
                    <ModalContent ref={modalRef}>
                        <ModalHeader>
                            <h3>{isEditing ? 'Editar Pasta' : name}</h3>
                            <ModalCloseButton onClick={closeModal} aria-label="Fechar modal">
                                <FiX />
                            </ModalCloseButton>
                        </ModalHeader>
                        <ModalBody>
                            {isEditing ? (
                                <div>
                                    <label htmlFor="folderName">Nome da Pasta</label>
                                    <input
                                        id="folderName"
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        autoFocus
                                    />
                                    <ActionButton onClick={handleEdit}>Salvar</ActionButton>
                                </div>
                            ) : (
                                <>
                                    <h4>Subtópicos</h4>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <input
                                            type="text"
                                            value={newSubTopicName}
                                            onChange={(e) => setNewSubTopicName(e.target.value)}
                                            placeholder="Novo subtópico"
                                            style={{ marginRight: '0.5rem' }}
                                        />
                                        <ActionButton onClick={handleAddSubTopic}>
                                            <FiPlus /> Adicionar
                                        </ActionButton>
                                    </div>
                                    
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {subTopics.map(subTopic => (
                                            <li key={subTopic.id} style={{ 
                                                display: 'flex', 
                                                justifyContent: 'space-between', 
                                                alignItems: 'center',
                                                marginBottom: '0.5rem',
                                                padding: '0.5rem',
                                                backgroundColor: 'var(--color-background-secondary)',
                                                borderRadius: '4px'
                                            }}>
                                                {editingSubTopicId === subTopic.id ? (
                                                    <>
                                                        <input
                                                            type="text"
                                                            value={newSubTopicName}
                                                            onChange={(e) => setNewSubTopicName(e.target.value)}
                                                            autoFocus
                                                        />
                                                        <button onClick={saveSubTopicEdit}>Salvar</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>{subTopic.name}</span>
                                                        <div>
                                                            <button 
                                                                onClick={() => startEditingSubTopic(subTopic)}
                                                                style={{ marginRight: '0.5rem' }}
                                                            >
                                                                Editar
                                                            </button>
                                                            <button 
                                                                onClick={() => onDeleteSubTopic(id, subTopic.id)}
                                                                style={{ color: 'var(--color-error)' }}
                                                            >
                                                                Excluir
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
}

export default FolderCard;