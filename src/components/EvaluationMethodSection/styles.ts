import styled from "styled-components";
import { Button } from "../../styles/buttons";

export const CriteriaCard = styled.div`
    background: var(--color-card);
    padding: var(--space-md);
    border-radius: var(--border-radius-md);
    margin-bottom: var(--space-md);
    border: 1px solid var(--color-border-light);
    transition: all 0.2s ease;
    position: relative;
    
    &:hover {
        border-color: var(--color-border);
        box-shadow: var(--shadow-sm);
    }
`;

export const CriteriaHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding-bottom: var(--space-sm);
`;

export const CriteriaTitle = styled.h3`
    font-size: var(--font-size-md);
    color: var(--color-title-card);
    margin: 0;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
`;

export const CriteriaActions = styled.div`
    display: flex;
    gap: var(--space-sm);
`;

export const DeleteButton = styled.button`
    background-color: transparent;
    color: var(--color-error);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: var(--border-radius-full);
    transition: all 0.2s;
    
    &:hover {
        background-color: var(--color-error);
        color: white;
    }
    
    &:disabled {
        color: var(--color-text-third);
        background-color: transparent;
        cursor: not-allowed;
    }
`;

export const WeightBadge = styled.span`
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--border-radius-full);
    font-size: var(--font-size-xs);
    font-weight: 500;
`;

export const AddCriteriaButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: var(--space-md);
    background-color: var(--color-background-secondary);
    color: var(--color-primary);
    border: 1px dashed var(--color-primary);
    
    &:hover {
        background-color: var(--color-primary);
        color: var(--color-text-on-primary);
    }
`;

export const FormFeedback = styled.p<{ type: 'success' | 'error' | 'info' }>`
    font-size: var(--font-size-sm);
    margin-top: var(--space-xs);
    color: ${props => 
        props.type === 'success' ? 'var(--color-success)' : 
        props.type === 'error' ? 'var(--color-error)' : 
        'var(--color-info)'
    };
`;

export const TotalWeightDisplay = styled.div<{ isValid: boolean }>`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--space-md) 0;
    font-weight: 500;
    color: ${props => props.isValid ? 'var(--color-success)' : 'var(--color-error)'};
`;