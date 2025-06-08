import React from 'react';
import {
  TableContainer,
  TableHeader,
  TableRow,
  AttendanceBadge,
  PriorityTag
} from './styles';
import { StudentFormData } from '../../../utils/types/BasicUser';
import { LayoutConfig, PRIORITY_CONFIGS, PriorityType } from '../../../utils/types/Team';

interface TableViewProps {
  studentList: StudentFormData[];
  layout: LayoutConfig;
  highlightText?: (text: string) => React.ReactNode;
  onSelectStudent: (student: StudentFormData) => void;
  getStudentAttendance: (id: number) => number;
  getAttendanceColor: (attendance: number) => string;
}

const TableView: React.FC<TableViewProps> = ({
  studentList,
  layout,
  highlightText,
  onSelectStudent,
  getStudentAttendance,
  getAttendanceColor
}) => {
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
        {studentList.map(student => {
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