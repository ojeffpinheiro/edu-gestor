import styled from 'styled-components';

export const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    padding: var(--space-md);
`;

export const ModalContent = styled.div`
    position: relative;
    background-color: var(--color-card);
    padding: var(--space-xl);
    border-radius: var(--border-radius-md);
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: var(--shadow-lg);

    @media (max-width: var(--breakpoint-md)) {
        padding: var(--space-md);
        max-width: 100%;
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: var(--space-md);
    right: var(--space-md);
    background-color: transparent;
    border: none;
    font-size: var(--font-size-lg);
    cursor: pointer;
    color: var(--color-text);
    height: 32px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius-full);
    transition: background-color 0.2s;

    &:hover {
        background-color: var(--color-button);
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--shadow-focus);
    }
`;

export const ActionButton = styled.button`
    padding: var(--space-md) var(--space-lg);
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    border: none;
    border-radius: var(--border-radius-md);
    cursor: pointer;
    font-size: var(--font-size-md);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    transition: background-color 0.2s;
    white-space: nowrap;

    &:hover:not(:disabled) {
        filter: brightness(1.1);
    }

    &:disabled {
        background-color: var(--color-button-disabled);
        cursor: not-allowed;
    }

    &:focus-visible {
        outline: none;
        box-shadow: var(--shadow-focus);
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-md);
    margin-top: var(--space-xl);
    
    @media (max-width: var(--breakpoint-md)) {
        flex-direction: column;
    }
`;

export const Table = styled.table`
    width: 100%;
    margin-top: var(--space-sm);
    border-collapse: collapse;
    border-radius: var(--border-radius-sm);
    overflow: hidden;
`;

export const TableHeader = styled.th`
    padding: var(--space-md);
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    text-align: left;
    font-weight: 600;
`;

export const TableCell = styled.td`
    padding: var(--space-md);
    border: 1px solid var(--color-border);
`;

export const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: var(--color-background-third);
    }

    &:hover {
        background-color: var(--color-background-secondary);
    }
`;

export const SectionContainer = styled.div<{ backgroundColor: string }>`
    margin-bottom: var(--space-xl);
    padding: var(--space-md);
    border-radius: var(--border-radius-md);
    background-color: ${props => props.backgroundColor};
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
`;

export const SectionHeader = styled.h3`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-md);
    font-size: var(--font-size-lg);
    color: var(--color-title-card);
    cursor: pointer;
    padding: var(--space-sm);
    border-radius: var(--border-radius-sm);
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`;

export const StudentHeader = styled.div`
    border-bottom: 1px solid var(--color-border);
    margin-bottom: var(--space-lg);
    padding-bottom: var(--space-md);

    h2 {
        font-size: var(--font-size-2xl);
        color: var(--color-title-card);
        margin-bottom: var(--space-xs);
    }
`;

export const ContactInfo = styled.p`
    color: var(--color-text-secondary);
    font-size: var(--font-size-md);
`;

export const StatusBadge = styled.span<{ color: string }>`
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: var(--border-radius-sm);
    background-color: ${props => props.color}20;
    color: ${props => props.color};
    font-size: var(--font-size-sm);
    font-weight: 500;
`;

export const CheckboxContainer = styled.div`
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

export const CheckboxLabel = styled.span`
    font-size: var(--font-size-sm);
`;