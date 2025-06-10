import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { CurriculumItem, HierarchyLevel } from '../../../utils/types/Topic';
import Modal from '../../modals/Modal';
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from '../../../styles/modals';
import { CancelButton, CloseButton } from '../../../styles/buttons';
import { FormGroup } from '../../../styles/formControls';
import { Input, Select } from '../../../styles/inputs';
import { ErrorText, SaveButton } from '../communStyles';
import LoadingSpinner from '../../shared/LoadingSpinner';

interface AddTopicModalProps {
    newItemData: {
        name: string;
        type: HierarchyLevel;
        parentId: string;
    };
    setNewItemData: (data: { name: string; type: HierarchyLevel; parentId: string }) => void;
    setShowAddModal: (show: boolean) => void;
    handleSave: () => void;
    isLoading: boolean;
    errors: Record<string, string>;
    getLevelLabel: (type: HierarchyLevel) => string;
    getAllItems: () => CurriculumItem[];
}

const AddTopicModal: React.FC<AddTopicModalProps> = ({
    newItemData,
    setNewItemData,
    setShowAddModal,
    handleSave,
    isLoading,
    errors,
    getLevelLabel,
    getAllItems
}) => {
    return (
        <Modal
            isOpen
            onClose={() => { }}
            title={`Adicionar ${getLevelLabel(newItemData.type)}`}
        >
            <ModalContent size='sm' >
                <ModalHeader>
                    <h3 id="modal-title">Adicionar {getLevelLabel(newItemData.type)}</h3>
                    <CloseButton
                        onClick={() => setShowAddModal(false)}
                        aria-label="Fechar modal"
                    >
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Nome</label>
                        <Input
                            type="text"
                            value={newItemData.name}
                            onChange={(e) => setNewItemData({ ...newItemData, name: e.target.value })}
                            placeholder={`Nome do ${getLevelLabel(newItemData.type).toLowerCase()}`}
                            aria-invalid={!!errors.name}
                        />
                        {errors.name && <ErrorText>{errors.name}</ErrorText>}
                    </FormGroup>

                    <FormGroup>
                        <label>Tipo</label>
                        <Select
                            value={newItemData.type}
                            onChange={(e) => setNewItemData({ ...newItemData, type: e.target.value as HierarchyLevel })}
                        >
                            <option value="eixoTematico">Eixo Temático</option>
                            <option value="unidade">Unidade</option>
                            <option value="capitulo">Capítulo</option>
                            <option value="titulo">Título</option>
                            <option value="subtitulo">Subtítulo</option>
                        </Select>
                    </FormGroup>

                    {newItemData.type !== 'eixoTematico' && (
                        <FormGroup>
                            <label>Item Pai</label>
                            <Select
                                value={newItemData.parentId}
                                onChange={(e) => setNewItemData({ ...newItemData, parentId: e.target.value })}
                            >
                                <option value="">Selecione um item pai</option>
                                {getAllItems()
                                    .filter(item => {
                                        if (newItemData.type === 'unidade') return item.type === 'eixoTematico';
                                        if (newItemData.type === 'capitulo') return item.type === 'unidade';
                                        if (newItemData.type === 'titulo') return item.type === 'capitulo';
                                        if (newItemData.type === 'subtitulo') return item.type === 'titulo';
                                        return false;
                                    })
                                    .map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                            </Select>
                            {errors.parentId && <ErrorText>{errors.parentId}</ErrorText>}
                        </FormGroup>
                    )}
                </ModalBody>
                <ModalFooter>
                    <CancelButton onClick={() => setShowAddModal(false)}>Cancelar</CancelButton>
                    <SaveButton
                        onClick={handleSave}
                        disabled={!newItemData.name || isLoading}
                    >
                        {isLoading ? (
                            <LoadingSpinner size='small' />
                        ) : (
                            'Salvar'
                        )}
                    </SaveButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AddTopicModal;