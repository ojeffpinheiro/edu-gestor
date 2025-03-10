import React from "react";

import { AttendanceStatus } from "../../utils/types";
import { StatusBadge } from "../modals/ModalStudent/styles";
import { colorPalette } from "../../styles/colors";

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

export default AttendanceStatusBadge