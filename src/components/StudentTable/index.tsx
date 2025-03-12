import React from "react";

import { Student } from "../../utils/types";

import { Table, TableHeader, TableRow } from '../../styles/table'

import {
    TableContainer,
    EmptyState
} from "./styles";
import StudentRow from "../ui/StudentRow";

/**
 * Propriedades do componente StudentTable
 */
interface StudentTableProps {
    students: Student[];
    onEdit: (studentData: Student) => void;
    onDelete: (id: number) => void;
}

/**
 * Componente de tabela para exibir alunos cadastrados
 */
const StudentTable: React.FC<StudentTableProps> = ({ students, onEdit, onDelete }) => {
    return (
        <TableContainer>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>Nome</TableHeader>
                        <TableHeader>Email</TableHeader>
                        <TableHeader>Ações</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((studentData) => (
                            <StudentRow
                                key={studentData.id}
                                studentData={studentData} onEdit={onEdit} onDelete={onDelete} />
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
