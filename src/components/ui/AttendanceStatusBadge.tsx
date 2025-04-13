import React from "react";

import { colorPalette } from "../../styles/colors";
import styled from "styled-components";
import { AttendanceStatus } from "../../utils/types/Attendance";

const AttendanceStatusBadge: React.FC<{ status: AttendanceStatus }> = ({ status }) => {
    const getStatusColor = () => {
        switch (status) {
            case 'Presente':
                return colorPalette.feedback.success;
            case 'Ausente':
                return colorPalette.feedback.error;
            case 'Justificada':
                return colorPalette.feedback.warning;
            default:
                return colorPalette.gray[500];
        }
    };

    return <StatusBadge color={getStatusColor()}>{status}</StatusBadge>;
};

const StatusBadge = styled.span<{ color: string }>`
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: var(--border-radius-sm);
    background-color: ${props => props.color}20;
    color: ${props => props.color};
    font-size: var(--font-size-sm);
    font-weight: 500;
`;

export default AttendanceStatusBadge