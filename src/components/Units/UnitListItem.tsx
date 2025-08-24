// src/components/Units/UnitListItem.tsx
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { UnitType } from '../../types/evaluation/Question';
import { Flex } from '../../styles/layoutUtils';
import { IconButton } from '../../styles/buttons';
import { 
    UnitCard, 
    CategoryBadge, 
    UnitSymbol, 
    BaseUnitBadge 
} from '../../pages/UnitsManagement/styles';

interface UnitListItemProps {
    unit: UnitType;
    onEdit: (unit: UnitType) => void;
    onDelete: (id: string) => void;
    units: UnitType[];
}

const UnitListItem: React.FC<UnitListItemProps> = ({ 
    unit, 
    onEdit, 
    onDelete,
    units 
}) => {
    return (
        <UnitCard>
            <CategoryBadge>{unit.type}</CategoryBadge>
            <Flex justify="between" align="center">
                <h3>
                    {unit.name} <UnitSymbol>({unit.symbol})</UnitSymbol>
                    {unit.baseUnit && <BaseUnitBadge>Unidade Base</BaseUnitBadge>}
                </h3>
                <Flex gap="sm">
                    <IconButton onClick={() => onEdit(unit)}>
                        <FaEdit />
                    </IconButton>
                    <IconButton onClick={() => onDelete(unit.id)}>
                        <FaTrash />
                    </IconButton>
                </Flex>
            </Flex>

            {unit.description && <p>{unit.description}</p>}

            {!unit.baseUnit && unit.baseUnitId && (
                <p>
                    Baseada em: {units.find(u => u.id === unit.baseUnitId)?.name}
                    <br />
                    Fator de conversão: {unit.conversionFactor}
                </p>
            )}
        </UnitCard>
    );
};

export default UnitListItem;