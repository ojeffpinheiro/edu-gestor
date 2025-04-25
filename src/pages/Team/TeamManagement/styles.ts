import styled from 'styled-components';

export const PageContainer = styled.div`
    padding: var(--space-xl);
    max-width: 1200px;
    margin: 0 auto;
    background-color: var(--color-background);
    border-radius: var(--border-radius-lg);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    
    @media (max-width: var(--breakpoint-md)) {
        padding: var(--space-md);
        border-radius: var(--border-radius-md);
    }
    
    @media (max-width: var(--breakpoint-sm)) {
        padding: var(--space-sm);
        border-radius: var(--border-radius-sm);
    }
`;

export const Title = styled.h2`
    color: var(--color-text);
    margin-bottom: var(--space-lg);
    font-size: var(--font-size-2xl);
    font-weight: 600;
    position: relative;
    padding-bottom: var(--space-sm);
    
    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 60px;
        height: 3px;
        background-color: var(--color-primary);
        border-radius: 3px;
    }
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-xl);
    text-align: center;
    color: var(--color-text-secondary);
    
    svg {
        font-size: var(--font-size-3xl);
        margin-bottom: var(--space-md);
        color: var(--color-text-tertiary);
    }
    
    h3 {
        margin-bottom: var(--space-sm);
        font-weight: 500;
    }
    
    p {
        margin-bottom: var(--space-lg);
        max-width: 500px;
    }
`;

export const ActionButton = styled.button`
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: var(--border-radius-sm);
    padding: var(--space-sm) var(--space-md);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background-color: var(--color-primary-dark);
        transform: translateY(-2px);
    }
    
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--color-primary-light);
    }
    
    &:active {
        transform: translateY(0);
    }
    
    &:disabled {
        background-color: var(--color-disabled);
        cursor: not-allowed;
        transform: none;
    }
`;

export const LoadingSpinner = styled.div`
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 0.8s linear infinite;
    margin-right: var(--space-sm);
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

export const StatusBadge = styled.span<{ status: 'active' | 'inactive' | 'pending' }>`
    display: inline-block;
    padding: 4px 8px;
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 500;
    
    ${({ status }) => {
        switch (status) {
            case 'active':
                return `
                    background-color: var(--color-success-light);
                    color: var(--color-success);
                `;
            case 'inactive':
                return `
                    background-color: var(--color-error-light);
                    color: var(--color-error);
                `;
            case 'pending':
                return `
                    background-color: var(--color-warning-light);
                    color: var(--color-warning);
                `;
            default:
                return '';
        }
    }}
`;