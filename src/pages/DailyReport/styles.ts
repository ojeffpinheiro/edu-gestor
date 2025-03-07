import styled from 'styled-components';

export const TableContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-md);

    @media (max-width: 768px) {
        padding: var(--space-sm);
    }
`;

export const CategoryContainer = styled.div`
    margin-bottom: var(--space-lg);
    
    h2 {
        margin-bottom: var(--space-md);
        color: var(--color-text);
        font-size: var(--font-size-xl);
    }
`;

export const CategoryButtonsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    margin-bottom: var(--space-md);
`;

export const TableWrapper = styled.div`
    overflow-x: auto;
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);
    background-color: var(--color-background-secondary);
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;
`;

export const Th = styled.th<{ fixed?: boolean }>`
    padding: var(--space-md);
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    font-weight: bold;
    text-align: center;
    border-bottom: 1px solid var(--color-border);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: ${props => props.fixed ? '180px' : '150px'};
    max-width: ${props => props.fixed ? '180px' : '150px'};
    position: ${props => props.fixed ? 'sticky' : 'relative'};
    left: ${props => props.fixed ? '0' : 'auto'};
    z-index: ${props => props.fixed ? '1' : 'auto'};
    
    &:first-child {
        border-top-left-radius: var(--border-radius-md);
    }
    
    &:last-child {
        border-top-right-radius: var(--border-radius-md);
    }
`;

export const Tr = styled.tr`
    &:nth-child(even) {
        background-color: var(--color-background-secondary);
    }
    &:nth-child(odd) {
        background-color: var(--color-background);
    }
    
    &:hover {
        background-color: var(--color-button);
    }
`;

export const Td = styled.td<{ fixed?: boolean }>`
    padding: var(--space-sm);
    border-bottom: 1px solid var(--color-border-light);
    text-align: center;
    min-width: ${props => props.fixed ? '180px' : '150px'};
    max-width: ${props => props.fixed ? '180px' : '150px'};
    position: ${props => props.fixed ? 'sticky' : 'relative'};
    left: ${props => props.fixed ? '0' : 'auto'};
    z-index: ${props => props.fixed ? '1' : 'auto'};
    background-color: inherit;
`;

export const StudentName = styled.div`
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
`;

export const Button = styled.button<{ selected: boolean }>`
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-size-sm);
    background-color: ${(props) => (props.selected ? 'var(--color-primary)' : 'var(--color-background-secondary)')};
    color: ${(props) => (props.selected ? 'var(--color-text-on-primary)' : 'var(--color-text)')};
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: var(--color-primary-hover);
        color: var(--color-text-on-primary);
    }
`;

export const Icon = styled.span`
    margin-left: var(--space-sm);
    font-size: var(--font-size-sm);
    display: flex;
    align-items: center;
`;

export const Select = styled.select`
    width: 100%;
    padding: var(--space-sm);
    font-size: var(--font-size-sm);
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--color-input-border);
    background-color: var(--color-input);
    color: var(--color-text);
    
    &:focus {
        border-color: var(--color-input-focus);
        outline: none;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
    }
`;

export const Option = styled.option``;