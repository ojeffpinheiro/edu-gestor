import React from 'react'
import { SECTION_CONFIG } from "../../utils/setting";
import { AttendanceRecord } from "../../utils/types";

import { Table, TableCell, TableHeader, TableRow, EmptyStateMessage } from '../../styles/table'

import AttendanceStatusBadge from './AttendanceStatusBadge';

import { formatDate } from '../../utils/dateFormatter';
import styled from 'styled-components';

/**
 * Calculates attendance statistics for visual feedback
 * @param attendance List of attendance records
 * @returns Object with attendance statistics
 */
const calculateAttendanceStats = (attendance: AttendanceRecord[] = []) => {
    const total = attendance.length;

    if (total === 0) {
        return {
            presentPercentage: '0.0',
            absentPercentage: '0.0',
            justifiedPercentage: '0.0',
            totalClasses: 0,
            present: 0,
            absent: 0,
            justified: 0
        };
    }

    const present = attendance.filter(record => record.status === 'Presente').length;
    const absent = attendance.filter(record => record.status === 'Ausente').length;
    const justified = attendance.filter(record => record.status === 'Justificada').length;

    return {
        presentPercentage: (present / total * 100).toFixed(1),
        absentPercentage: (absent / total * 100).toFixed(1),
        justifiedPercentage: (justified / total * 100).toFixed(1),
        totalClasses: total,
        present,
        absent,
        justified
    };
};

const AttendanceTable: React.FC<{ attendance: AttendanceRecord[] }> = ({ attendance }) => {
    if (!attendance || attendance.length === 0) {
        return <EmptyStateMessage>{SECTION_CONFIG.ATTENDANCE.emptyMessage}</EmptyStateMessage>;
    }

    const stats = calculateAttendanceStats(attendance);

    return (
        <>
            <Table aria-label="Tabela de frequência">
                <thead>
                    <tr>
                        <TableHeader scope="col">Data</TableHeader>
                        <TableHeader scope="col">Status</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((record, index) => (
                        <TableRow key={`attendance-${index}`}>
                            <TableCell>{formatDate(record.date)}</TableCell>
                            <TableCell>
                                <AttendanceStatusBadge status={record.status} />
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>

            <AttendanceStatsContainer aria-label="Estatísticas de frequência">
                <p>Total de aulas: <strong>{stats.totalClasses}</strong></p>
                <p>Presença: <strong>{stats.presentPercentage}%</strong></p>
                <p>Ausência: <strong>{stats.absentPercentage}%</strong></p>
                <p>Justificadas: <strong>{stats.justifiedPercentage}%</strong></p>
            </AttendanceStatsContainer>
        </>
    );
};

const AttendanceStatsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--space-md);
    margin-top: var(--space-md);
    p {
        padding: var(--space-sm);
        background-color: var(--color-background-secondary);
        border-radius: var(--border-radius-sm);
        text-align: center;

        strong {
            display: block;
            font-size: 16px;
            margin-top: 4px;
        }
    }
`;

export default AttendanceTable;