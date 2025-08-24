import React from 'react';
import { FaLayerGroup, FaPlus } from 'react-icons/fa';
import { HierarchyLevel } from '../../types/academic/Topic';
import { AddButton, EmptyState } from './communStyles';

interface EmptyTopicStateProps {
  setShowAddModal: (show: boolean) => void;
  setNewItemData: (data: { name: string; type: HierarchyLevel; parentId: string }) => void;
}

const EmptyTopicState: React.FC<EmptyTopicStateProps> = ({ setShowAddModal, setNewItemData }) => {
  return (
    <EmptyState className="fade-in">
      <FaLayerGroup size={64} />
      <h2>Organização de Conteúdos</h2>
      <p>Selecione um item na árvore de navegação para visualizar ou editar seus detalhes</p>
      <AddButton onClick={() => {
        setNewItemData({ name: '', type: 'eixoTematico', parentId: '' });
        setShowAddModal(true);
      }}>
        <FaPlus />
        <span>Criar Primeiro Eixo Temático</span>
      </AddButton>
    </EmptyState>
  );
};

export default EmptyTopicState;