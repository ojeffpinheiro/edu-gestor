import React from 'react'
import { FaCheckSquare, FaSquare } from "react-icons/fa";
import { Report } from "../../utils/types";
import { CheckboxContainer, CheckboxLabel } from "../modals/ModalStudent/styles";

/**
 * Checkbox personalizado para selecionar opções de exportação
 */
const ReportCheckbox: React.FC<Report> = ({ checked, onChange, label, disabled = false }) => {
    return (
        <CheckboxContainer
            onClick={disabled ? undefined : onChange}
            style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
            {checked ? <FaCheckSquare /> : <FaSquare />}
            <CheckboxLabel>{label}</CheckboxLabel>
        </CheckboxContainer>
    );
};

export default ReportCheckbox