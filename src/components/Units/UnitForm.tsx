// src/components/Units/UnitForm.tsx
import React, { useEffect, useRef } from 'react';
import { UnitType } from '../../utils/types/Question';

import { Grid, Flex } from '../../styles/layoutUtils';
import {
    Input,
    Label,
    InputGroup,
    Select,
    TextArea
} from '../../styles/inputs';
import {
    ActionButton,
    CancelButton,
    CloseButton,
} from '../../styles/buttons';

import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader } from '../../styles/modals';
import { FaTimes } from 'react-icons/fa';

interface UnitFormProps {
    isOpen: boolean;
    unit: Partial<UnitType>;
    setUnit: (unit: Partial<UnitType>) => void;
    onSubmit: () => void;
    onCancel: () => void;
    isEditing: boolean;
    unitCategories: string[];
    units: UnitType[];
}

const UnitForm: React.FC<UnitFormProps> = ({
    isOpen,
    unit,
    setUnit,
    onSubmit,
    onCancel,
    isEditing,
    unitCategories,
    units
}) => {

    const modalRef = useRef<HTMLDivElement>(null);

    /**
    * Fecha o modal ao clicar fora dele
    */
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onCancel();
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [onCancel]);

    if (!isOpen) return null;

    return (
        <ModalContainer role='dialog' aria-modal="true">
            <ModalContent ref={modalRef} >
                <ModalHeader>
                    <h2>{isEditing ? 'Editar Unidade' : 'Nova Unidade'}</h2>
                    <CloseButton onClick={onCancel}>
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>

                <form onSubmit={onSubmit}>
                    <ModalBody>
                        <Grid columns={2} gap="md">
                            <InputGroup>
                                <Label>Nome da Unidade</Label>
                                <Input
                                    type="text"
                                    value={unit.name}
                                    onChange={(e) => setUnit({ ...unit, name: e.target.value })}
                                    placeholder="Ex: Metro"
                                />
                            </InputGroup>

                            <InputGroup>
                                <Label>Símbolo</Label>
                                <Input
                                    type="text"
                                    value={unit.symbol}
                                    onChange={(e) => setUnit({ ...unit, symbol: e.target.value })}
                                    placeholder="Ex: m"
                                />
                            </InputGroup>
                        </Grid>

                        <Grid columns={2} gap="md">
                            <InputGroup>
                                <Label>Categoria</Label>
                                <Select
                                    value={unit.type}
                                    onChange={(e) => setUnit({ ...unit, type: e.target.value })}
                                >
                                    {unitCategories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </Select>
                            </InputGroup>

                            <InputGroup>
                                <Label>Tipo de Unidade</Label>
                                <Flex align="center" gap="sm">
                                    <input
                                        type="checkbox"
                                        id="baseUnitCheck"
                                        checked={unit.baseUnit}
                                        onChange={(e) => {
                                            setUnit({
                                                ...unit,
                                                baseUnit: e.target.checked,
                                                baseUnitId: e.target.checked ? undefined : unit.baseUnitId,
                                                conversionFactor: e.target.checked ? undefined : unit.conversionFactor
                                            });
                                        }}
                                    />
                                    <label htmlFor="baseUnitCheck">Unidade Base</label>
                                </Flex>
                            </InputGroup>
                        </Grid>

                        {!unit.baseUnit && (
                            <Grid columns={2} gap="md">
                                <InputGroup>
                                    <Label>Unidade Base Relacionada</Label>
                                    <Select
                                        value={unit.baseUnitId || ''}
                                        onChange={(e) => setUnit({ ...unit, baseUnitId: e.target.value })}
                                    >
                                        <option value="">Selecione a unidade base</option>
                                        {units
                                            .filter(u => u.baseUnit && u.type === unit.type)
                                            .map(baseUnit => (
                                                <option key={baseUnit.id} value={baseUnit.id}>
                                                    {baseUnit.name} ({baseUnit.symbol})
                                                </option>
                                            ))}
                                    </Select>
                                </InputGroup>

                                <InputGroup>
                                    <Label>Fator de Conversão</Label>
                                    <Input
                                        type="number"
                                        value={unit.conversionFactor || ''}
                                        onChange={(e) => setUnit({
                                            ...unit,
                                            conversionFactor: parseFloat(e.target.value)
                                        })}
                                        placeholder="Ex: 0.01 (para cm → m)"
                                    />
                                </InputGroup>
                            </Grid>
                        )}

                        <InputGroup>
                            <Label>Descrição</Label>
                            <TextArea
                                value={unit.description || ''}
                                onChange={(e) => setUnit({ ...unit, description: e.target.value })}
                                placeholder="Descrição opcional da unidade e seu uso"
                            />
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Flex justify="end" gap="md">
                            <CancelButton onClick={onCancel}>
                                Cancelar
                            </CancelButton>
                            <ActionButton onClick={onSubmit}>
                                {isEditing ? 'Salvar Alterações' : 'Adicionar Unidade'}
                            </ActionButton>
                        </Flex>
                    </ModalFooter>
                </form>
            </ModalContent>
        </ModalContainer>
    );
};

export default UnitForm;