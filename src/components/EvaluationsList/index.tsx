import React from "react";
import styled from "styled-components";

import { Evaluation } from "../../utils/types";

import { Table, TableHeader, TableRow, Td } from "../../styles/table";

const EvaluationsList: React.FC<{
    evaluations: Evaluation[];
    onSelect: (evaluation: Evaluation) => void;
    onDelete: (id: string) => void;
}> = ({ evaluations, onSelect, onDelete }) => {
    return (
        <Table>
            <thead>
                <TableRow>
                    <TableHeader>Nome</TableHeader>
                    <TableHeader>Trimestre</TableHeader>
                    <TableHeader>Ações</TableHeader>
                </TableRow>
            </thead>

            <tbody>
                {evaluations.map(evaluation => (
                    <tr key={evaluation.id}>
                        <Td>{evaluation.name}</Td>
                        <Td>{evaluation.trimester}º</Td>
                        <Td>
                            <ActionButton onClick={() => onSelect(evaluation)}>Selecionar</ActionButton>
                        </Td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

const ActionButton = styled.button`
    background: #28a745;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
        background: #218838;
    }
`;

export default EvaluationsList;