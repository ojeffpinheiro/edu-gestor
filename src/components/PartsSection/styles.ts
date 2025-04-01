import styled from "styled-components"
import { Badge } from "../../styles/CriteriaCard";

export const PartsList = styled.ul`
    list-style: none;
    margin: var(--space-md) 0;
    border-radius: var(--border-radius-md);
    overflow: hidden;
`;

export const PartItem = styled.li`
    padding: var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    margin-bottom: var(--space-sm);
    background-color: var(--color-card);
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
    
    &:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
    }
`;

export const PartHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const PartName = styled.span`
    font-weight: 500;
    font-size: var(--font-size-md);
    color: var(--color-title-card);
`;

export const PartControls = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-sm);
`;

export const IconButton = styled.button`
    background: transparent;
    border: none;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius-full);
    color: var(--color-text-secondary);
    transition: all 0.2s ease;
    
    &:hover {
        background-color: var(--color-button);
        color: var(--color-error);
    }
    
    &:focus-visible {
        outline: none;
        box-shadow: var(--shadow-focus);
    }
`;

export const WeightBadge = styled(Badge)`
    background-color: var(--color-primary);
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--font-size-sm);
    display: flex;
    align-items: center;
`;

export const InputContainer = styled.div`
    background-color: var(--color-background-secondary);
    padding: var(--space-md);
    border-radius: var(--border-radius-md);
    margin-top: var(--space-md);
    box-shadow: var(--shadow-sm);
`;

export const EmptyMessage = styled.div`
    text-align: center;
    padding: var(--space-lg);
    color: var(--color-text-secondary);
    background-color: var(--color-background-third);
    border-radius: var(--border-radius-md);
    border: 1px dashed var(--color-border);
    margin: var(--space-md) 0;
`;

export const SectionTitle = styled.h3`
    margin-bottom: var(--space-md);
    color: var(--color-text);
    font-size: var(--font-size-lg);
    font-weight: 600;
`;