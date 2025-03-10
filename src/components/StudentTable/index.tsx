import React, { useCallback } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Student } from "../../utils/types";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    IconButton,
    EmptyState
} from "./styles";

/**
 * Propriedades do componente StudentTable
 */
interface StudentTableProps {
    students: Student[];
    onEdit: (studentData: Student) => void;
    onDelete: (id: number) => void;
}

/**
 * Componente de linha da tabela para modularização
 */
const StudentRow: React.FC<{ studentData: Student; onEdit: (s: Student) => void; onDelete: (id: number) => void }> = ({
    studentData,
    onEdit,
    onDelete
}) => {
    const handleDelete = useCallback(() => {
        if (window.confirm(`Tem certeza que deseja excluir ${studentData.name}?`)) {
            onDelete(studentData.id);
        }
    }, [studentData, onDelete]);

    return (
        <TableRow>
            <TableCell>{studentData.name}</TableCell>
            <TableCell>{studentData.email}</TableCell>
            <TableCell>
                <IconButton onClick={() => onEdit(studentData)} title="Editar aluno">
                    <FaEdit />
                </IconButton>
                <IconButton onClick={handleDelete} title="Excluir aluno" variant="error">
                    <FaTrashAlt />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

/**
 * Componente de tabela para exibir alunos cadastrados
 */
const StudentTable: React.FC<StudentTableProps> = ({ students, onEdit, onDelete }) => {
    return (
        <TableContainer>
            <Table>
                <thead>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((studentData) => (
                            <StudentRow
                                key={studentData.id}
                                studentData={studentData}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>
                                <EmptyState>Nenhum aluno cadastrado. Clique em "Adicionar Aluno" para começar.</EmptyState>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </TableContainer>
    );
};

export default StudentTable;
