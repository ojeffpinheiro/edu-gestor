import React from 'react'
import { FaCheckSquare, FaSquare } from "react-icons/fa";
import styled from 'styled-components';
import { Report } from '../../types/ui/UIComponent';

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

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: var(--space-md);
    color: var(--color-text-secondary);
    
    svg {
        color: var(--color-primary);
        font-size: var(--font-size-lg);
        margin-right: var(--space-xs);
    }
    
    &:hover {
        color: var(--color-text-primary);
    }
`;

const CheckboxLabel = styled.span`
    font-size: var(--font-size-sm);
`;

export default ReportCheckbox