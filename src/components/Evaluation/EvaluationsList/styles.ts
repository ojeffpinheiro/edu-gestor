import styled from "styled-components";

export const Card = styled.div`
    background: var(--color-card);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-md);
    padding: var(--space-md);
    width: 250px;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
    
    h3 {
        margin: 0;
        font-size: var(--font-size-lg);
        color: var(--color-title-card);
    }

    p {
        color: var(--color-text);
        margin: var(--space-xs) 0;
    }
        
    .actions {
        display: flex;
        justify-content: space-between;
        margin-top: var(--space-md);
    }
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-md);
`;

export const CardBody = styled.div`
    flex: 1;
    margin-bottom: var(--space-md);
`;

export const CardFooter = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const ActionButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    margin-left: 8px;
    color: var(--color-primary);
    transition: color 0.2s;

    &:hover {
        color: var(--color-primary-hover);
    }
`;