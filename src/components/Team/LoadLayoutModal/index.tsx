import React, { useMemo, useState } from 'react';
import { useClassroom } from '../../../contexts/ClassroomContext';
import { LayoutConfig } from '../../../utils/types/Team';

import Modal from '../../modals/Modal';

import { ModalContainer, ModalHeader } from '../../../styles/modals';
import { ActionButton } from '../../../styles/buttons';
import { DeleteButton, LayoutActions, LayoutInfo, LayoutItem, LayoutList, ModalActions } from './styles';

interface LoadLayoutModalProps {
    loadLayout: (layout: LayoutConfig) => void;
    onClose: () => void;
}

const LoadLayoutModal: React.FC<LoadLayoutModalProps> = ({ loadLayout, onClose }) => {
    const {
        state: { savedLayouts, loadModalOpen },
        actions: { showNotification, deleteLayout },
    } = useClassroom();

    const [searchTerm, setSearchTerm] = useState('');

    const filteredLayouts = useMemo(() => {
        return savedLayouts.filter(layout =>
            layout.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [savedLayouts, searchTerm]);

    const handleDelete = (name: string) => {
        if (window.confirm(`Tem certeza que deseja excluir permanentemente o layout "${name}"?`)) {
            deleteLayout(name);
        }
    };

    const handleLoad = (layout: any) => {
        loadLayout(layout);
        onClose();
        showNotification('Layout carregado com sucesso!', 'success');
    };

    if (!loadModalOpen) return null;

    return (
        <Modal
            isOpen
            title="Carregar Layout"
            size='lg'
            onClose={onClose}
            cancelText='Fechar'
        >
            <ModalContainer>
                <ModalHeader>
                    <h3 id="loadLayoutTitle">Carregar Layout</h3>
                </ModalHeader>

                {savedLayouts.length === 0 ? (
                    <p>Nenhum layout salvo encontrado</p>
                ) : (
                    <LayoutList role="list">
                        {savedLayouts.map((saved, index) => (
                            <LayoutItem key={index} role="listitem">
                                <LayoutInfo>
                                    <strong>{saved.name}</strong>
                                    <span>{saved.layout.rows} fileiras × {saved.layout.columns} colunas</span>
                                </LayoutInfo>
                                <LayoutActions>
                                    <ActionButton
                                        onClick={() => handleLoad(saved.layout)}
                                        aria-label={`Carregar layout ${saved.name}`}
                                    >
                                        Carregar
                                    </ActionButton>
                                    <DeleteButton
                                        onClick={() => deleteLayout(saved.name)}
                                        aria-label={`Excluir layout ${saved.name}`}
                                    >
                                        Excluir
                                    </DeleteButton>
                                </LayoutActions>
                            </LayoutItem>
                        ))}
                    </LayoutList>
                )}

                <ModalActions>
                    <ActionButton
                        onClick={onClose}
                        aria-label="Fechar modal de carregamento"
                    >
                        Fechar
                    </ActionButton>
                </ModalActions>
            </ModalContainer>
        </Modal>
    );
};

export default LoadLayoutModal;