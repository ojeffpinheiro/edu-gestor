import styled from "styled-components";
import { Input, Select, TextArea } from "../../../../styles/inputs";

export const Container = styled.div`
    background-color: var(--color-background-secondary);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: .75rem;
`;

export const SectionTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    color: var(--color-primary);
    
    h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0;
        color: var(--color-primary);
    }
`;

export const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const StyledInput = styled(Input)<{ isValid?: boolean }>`
    padding: 0.625rem 0.75rem;
    border-radius: 6px;
    border: 1px solid ${props => props.isValid === false ? 'var(--color-error)' :  'var(--color-border-dark)'};
    font-size: 0.875rem;
    transition: all 0.2s ease;
    
    &:hover {
        border-color: ${props => props.isValid === false ? 'var(--color-error)' : 'var(--color-border-dark)'};
    }
    
    &:focus {
        border-color: var(--color-input-focus);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
        outline: none;
    }
    
    &::placeholder {
        color: var(--color-text-secondary, #4a5568)
        opacity: 1;
    }
`;

export const StyledSelect = styled(Select)<{ isValid?: boolean }>`
    padding: 0.625rem 0.75rem;
    border-radius: 6px;
    border: 1px solid ${props => props.isValid === false ? 'var(--color-error)' :  'var(--color-border-dark)'};
    font-size: 0.875rem;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px;
    padding-right: 2.5rem;
    transition: all 0.2s ease;
    
    &:focus {
        border-color: var(--color-input-focus);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
        outline: none;
    }
`;

export const StyledTextArea = styled(TextArea)<{ isValid?: boolean }>`
    padding: 0.625rem 0.75rem;
    border-radius: 6px;
    border: 1px solid ${props => props.isValid === false ? '#ef4444' : '#d1d5db'};
    font-size: 0.875rem;
    resize: vertical;
    min-height: 5rem;
    transition: all 0.2s ease;
    
    &:hover {
        border-color: ${props => props.isValid === false ? '#ef4444' : '#a3a8b8'};
    }
    
    &:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
        outline: none;
    }
    
    &::placeholder {
        color: var(--color-text-secondary, #4a5568)
    }
`;

export const ErrorMessage = styled.span`
    color: #ef4444;
    font-size: 0.75rem;
    margin-top: 0.25rem;
`;

export const RequiredFieldsNote = styled.p`
    color: #6b7280;
    font-size: 0.75rem;
    margin-top: 1rem;
    text-align: right;
`;

export const InputWithIcon = styled.div`
    position: relative;
`;

export const IconWrapper = styled.span`
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
    pointer-events: none;
`;