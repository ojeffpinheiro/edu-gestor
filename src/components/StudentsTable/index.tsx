import React from "react";
import { Table, TableHeader, TableRow, Td } from "../../styles/table";

import { AttendanceGrade } from './styles'
import { StudentFormData } from "../../utils/types/BasicUser";

interface StudentsTableProps {
    students: StudentFormData[];
    calculateAttendanceGrade: (attendance: number) => number;
}

const StudentsTable: React.FC<StudentsTableProps> = ({ students, calculateAttendanceGrade }) => {
    return (
        <Table>
            <thead>
                <TableRow>
                    <TableHeader>Nome do aluno</TableHeader>
                    <TableHeader>Frequência (%)</TableHeader>
                    <TableHeader>Nota por Frequência</TableHeader>
                </TableRow>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student.id}>
                        <Td>{student.name}</Td>
                        <Td>{student.attendance}%</Td>
                        <Td>
                            <AttendanceGrade grade={student.attendance !== undefined ? calculateAttendanceGrade(student.attendance) : 0}>
                                {student.attendance !== undefined ? calculateAttendanceGrade(student.attendance).toFixed(1) : '0.0'}
                            </AttendanceGrade>

                        </Td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default StudentsTable;