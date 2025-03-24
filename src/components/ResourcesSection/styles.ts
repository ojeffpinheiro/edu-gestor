import styled from "styled-components";
import { Button } from "../../styles/buttons";
import { Input } from "../../styles/inputs";

export const ResourcesContainer = styled.div`
    margin-bottom: var(--space-lg);
`;

export const ResourcesContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
`;

export const ResourcesList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    max-height: 250px;
    overflow-y: auto;
    padding-right: var(--space-sm);

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: var(--color-background-third);
        border-radius: var(--border-radius-sm);
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--color-text-third);
        border-radius: var(--border-radius-sm);
    }
`;

export const ResourceItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-sm) var(--space-md);
    background-color: var(--color-background-secondary);
    border-radius: var(--border-radius-md);
    border-left: 3px solid var(--color-primary);
    transition: all 0.2s ease;

    &:hover {
        transform: translateX(2px);
        box-shadow: var(--shadow-sm);
    }
`;

export const ResourceName = styled.span`
    font-weight: 500;
    color: var(--color-text);
`;

export const DeleteButton = styled.button`
    background: transparent;
    color: var(--color-text-third);
    padding: var(--space-xs);
    border-radius: var(--border-radius-full);
    transition: all 0.2s ease;

    &:hover {
        color: var(--color-error);
        background-color: rgba(245, 34, 45, 0.05);
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--shadow-focus);
    }
`;

export const InputContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--space-md);
    align-items: center;
`;

export const StyledInput = styled(Input)`
    width: 100%;
    height: 42px;
`;

export const AddButton = styled(Button)`
    height: 42px;
    padding: 0 var(--space-lg);
`;

export const EmptyMessage = styled.p`
    color: var(--color-text-third);
    text-align: center;
    padding: var(--space-lg);
    background-color: var(--color-background-secondary);
    border-radius: var(--border-radius-md);
    font-style: italic;
`;

export const FeedbackMessage = styled.div<{ type: string }>`
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-sm);
    text-align: center;
    animation: fadeIn 0.3s ease;
    
    ${({ type }) => type === 'success' && `
        background-color: rgba(82, 196, 26, 0.1);
        color: var(--color-success);
        border: 1px solid var(--color-success);
    `}
    
    ${({ type }) => type === 'error' && `
        background-color: rgba(245, 34, 45, 0.1);
        color: var(--color-error);
        border: 1px solid var(--color-error);
    `}
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

export const HelpText = styled.p`
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
    margin-top: var(--space-xs);
`;