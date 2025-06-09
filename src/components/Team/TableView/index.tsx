import React from 'react';
import {
  TableContainer,
  TableHeader,
  TableRow,
  AttendanceBadge,
  PriorityTag
} from './styles';
import { StudentFormData } from '../../../utils/types/BasicUser';
import { PRIORITY_CONFIGS, PriorityType } from '../../../utils/types/Team';
import { useClassroom } from '../../../contexts/ClassroomContext';

interface TableViewProps {
  highlightText?: (text: string) => React.ReactNode;
  onSelectStudent: (student: StudentFormData) => void;
  getAttendanceColor: (attendance: number) => string;
}

/**
 * Visualização em tabela dos alunos e seus assentos
 * Exibe informações como frequência, posição e prioridades
 * @param {function} [highlightText] - Função para destacar texto de busca
 * @param {function} onSelectStudent - Callback ao selecionar aluno
 * @param {function} getAttendanceColor - Obtém cor baseada na frequência
 */
const TableView: React.FC<TableViewProps> = ({
  highlightText,
  onSelectStudent,
  getAttendanceColor
}) => {
  const { 
    state: { layout, filteredStudents },
    getStudentAttendance
   } = useClassroom();
  const getPriorityConfig = (priority?: PriorityType) => {
    return priority ? PRIORITY_CONFIGS[priority] : null;
  };

  return (
    <TableContainer>
      <TableHeader>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Frequência</th>
          <th>Assento</th>
          <th>Prioridade</th>
        </tr>
      </TableHeader>
      <tbody>
        {filteredStudents.map(student => {
          const seat = layout.seats.find(s => s.studentId === student.id);
          const attendance = getStudentAttendance(student.id!);
          const priorityConfig = getPriorityConfig(seat?.priority ?? undefined);

          return (
            <TableRow key={student.id} onClick={() => onSelectStudent(student)}>
              <td>{student.id}</td>
              <td>
                {highlightText ? highlightText(student.name) : student.name}
              </td>
              <td>
                <AttendanceBadge color={getAttendanceColor(attendance)}>
                  {attendance}%
                </AttendanceBadge>
              </td>
              <td>
                {seat ? `F${seat.position.row + 1}C${seat.position.column + 1}` : '-'}
              </td>
              <td>
                {priorityConfig ? (
                  <PriorityTag color={priorityConfig.color}>
                    {priorityConfig.label}
                  </PriorityTag>
                ) : (
                  <PriorityTag>Nenhuma</PriorityTag>
                )}
              </td>
            </TableRow>
          );
        })}
      </tbody>
    </TableContainer>
  );
};

export default TableView;