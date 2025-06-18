import styled from 'styled-components';

export const HeaderContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
`;

export const SettingsButton = styled.button`
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: var(--color-primary-dark);
    }
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 1rem;
    flex-wrap: wrap;
`;

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

export const Title = styled.h2`
    margin: 0;
    font-size: 1.5rem;
    color: var(--color-text-primary);
`;

export const ShiftSelector = styled.select`
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    font-size: 0.9rem;
`;

export const ActionButton = styled.button<{ primary?: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    background: ${props => props.primary ? 'var(--color-primary)' : 'var(--color-secondary)'};
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: ${props => props.primary ? 'var(--color-primary-dark)' : 'var(--color-secondary-dark)'};
    }

    svg {
        font-size: 0.8rem;
    }
`;

export const ViewerContainer = styled.div`
    padding: 1rem;
    background: var(--color-background-secondary);
    border-radius: 8px;
`;