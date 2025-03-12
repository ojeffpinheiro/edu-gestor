import React, { useCallback } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import { Student } from "../../utils/types";

import { TableCell, TableRow } from "../../styles/table";
import { IconButton } from "../StudentTable/styles";

interface StudentRowProps {
    studentData: Student,
    onEdit: (s: Student) => void;
    onDelete: (id: number) => void
}

const StudentRow: React.FC<StudentRowProps> = ({ studentData, onEdit, onDelete }) => {
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

export default StudentRow;