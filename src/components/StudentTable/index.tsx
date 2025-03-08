import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Student } from "../../utils/types";
import { TableContainer, Table, Th, Tr, Td, IconButton, EmptyState } from "./styles";

interface StudentTableProps {
    alunos: Student[];
    onEdit: (aluno: Student) => void;
    onDelete: (id: number) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ alunos, onEdit, onDelete }) => {
    return (
        <TableContainer>
            <Table>
                <thead>
                    <tr>
                        <Th>Nome</Th>
                        <Th>Email</Th>
                        <Th>Ações</Th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.length > 0 ? (
                        alunos.map((aluno) => (
                            <Tr key={aluno.id}>
                                <Td>{aluno.name}</Td>
                                <Td>{aluno.email}</Td>
                                <Td>
                                    <IconButton onClick={() => onEdit(aluno)} variant="info">
                                        <FaEdit />
                                    </IconButton>
                                    <IconButton onClick={() => onDelete(aluno.id)} variant="error">
                                        <FaTrashAlt />
                                    </IconButton>
                                </Td>
                            </Tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>
                                <EmptyState>
                                    Nenhum aluno cadastrado. Clique em "Adicionar Aluno" para começar.
                                </EmptyState>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </TableContainer>
    );
};

export default StudentTable;
