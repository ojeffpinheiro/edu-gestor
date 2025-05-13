import React, { useCallback } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import { TableCell, TableRow } from "../../styles/table";
import { AttendanceGrade } from "../StudentsTable/styles";
import { StudentAttendance } from "../../utils/types/BasicUser";
import { IconButton } from "../../styles/buttons";

interface StudentRowProps {
    studentData: StudentAttendance,
    onEdit: (s: StudentAttendance) => void;
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
                <AttendanceGrade grade={studentData.attendance}>{studentData.attendance}</AttendanceGrade>
            </TableCell>
            <TableCell>
                <IconButton
                    onClick={() => onEdit(studentData)}
                    title="Editar aluno"
                    className="edit"
                    aria-label={`editar aluno ${studentData.name}`} >
                    <FaEdit />
                </IconButton>
                <IconButton
                    title="Excluir aluno"
                    className="delete"
                    aria-label={`deletar aluno ${studentData.name}`}
                    onClick={handleDelete}>
                    <FaTrashAlt />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default StudentRow;