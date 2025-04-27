// src/components/Units/UnitCategoryTable.tsx
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { UnitType } from '../../utils/types/Question';
import { Flex } from '../../styles/layoutUtils';
import { IconButton } from '../../styles/buttons';
import {
    Table,
    TableHeader,
    TableRow,
    TableCell
} from '../../styles/table';
import { Card } from '../../styles/card';

interface UnitCategoryTableProps {
    category: string;
    units: UnitType[];
    allUnits: UnitType[];
    onEdit: (unit: UnitType) => void;
    onDelete: (id: string) => void;
}

const UnitCategoryTable: React.FC<UnitCategoryTableProps> = ({
    category,
    units,
    allUnits,
    onEdit,
    onDelete
}) => {
    return (
        <Card>
            <h3>{category}</h3>
            <Table>
                <thead>
                    <tr>
                        <TableHeader>Nome</TableHeader>
                        <TableHeader>Símbolo</TableHeader>
                        <TableHeader>Tipo</TableHeader>
                        <TableHeader>Fator de Conversão</TableHeader>
                        <TableHeader>Ações</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {units.map(unit => (
                        <TableRow key={unit.id}>
                            <TableCell>{unit.name}</TableCell>
                            <TableCell>{unit.symbol}</TableCell>
                            <TableCell>
                                {unit.baseUnit ? 'Base' : 'Derivada'}
                            </TableCell>
                            <TableCell>
                                {unit.baseUnit
                                    ? '-'
                                    : `${unit.conversionFactor} (para ${allUnits.find(u => u.id === unit.baseUnitId)?.symbol})`
                                }
                            </TableCell>
                            <TableCell>
                                <Flex justify="center" gap="sm">
                                    <IconButton onClick={() => onEdit(unit)}>
                                        <FaEdit />
                                    </IconButton>
                                    <IconButton onClick={() => onDelete(unit.id)}>
                                        <FaTrash />
                                    </IconButton>
                                </Flex>
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </Card>
    );
};

export default UnitCategoryTable;