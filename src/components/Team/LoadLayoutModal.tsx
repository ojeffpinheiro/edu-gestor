import React from 'react';
import styled from 'styled-components';
import { useClassroom } from '../../contexts/ClassroomContext';
import { LayoutConfig } from '../../utils/types/Team';
import Modal from '../modals/Modal';
import { ModalContainer, ModalHeader } from '../../styles/modals';
import { ActionButton } from '../../styles/buttons';

interface LoadLayoutModalProps {
    loadLayout: (layout: LayoutConfig) => void;
    onClose: () => void;
}

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
  gap: 1rem;
`;

export const LayoutList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const LayoutItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const LayoutInfo = styled.div`
  display: flex;
  flex-direction: column;
  
  strong {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  
  span {
    font-size: 0.875rem;
    color: #666;
  }
`;

export const LayoutActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const DeleteButton = styled.button`
  background: #ffebee;
  color: #c62828;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: #ffcdd2;
  }
`;

export const LoadLayoutModal: React.FC<LoadLayoutModalProps> = ({ loadLayout, onClose }) => {
    const {
        state: { savedLayouts, loadModalOpen },
        actions: { showNotification, deleteLayout },
    } = useClassroom();

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