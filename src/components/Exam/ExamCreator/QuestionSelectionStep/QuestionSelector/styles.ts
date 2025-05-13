import styled from "styled-components";

export const Td = styled.td`
    padding: var(--space-md);
    border-bottom: 1px solid var(--color-border);
`;

export const TableHeader = styled.th`
    padding: var(--space-md);
    background-color: var(--color-primary);
    color: var(--color-text-on-primary);
    text-align: left;
    font-weight: 600;
`;

export const TableCell = styled.td`
    text-align: center;
    padding: var(--space-md);
    border: 1px solid var(--color-border);
`;

export const TableHead = styled.thead`
  background-color: var(--color-border-light);
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: var(--color-background-third);
  }

  &:hover {
    background-color: var(--color-primary-hover);
  }
`;

export const EmptyStateMessage = styled.p`
    color: var(--color-text-secondary);
    font-style: italic;
    padding: var(--space-md);
    text-align: center;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: var(--space-sm);
`;

export const Button = styled.button`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 0.75rem;
    border-radius: var(--border-radius-sm);
    font-size: 0.875rem;
    cursor: pointer;
    border: none;
    
    &.primary {
        background-color: var(--color-primary);
        color: var(--color-text-on-primary);
        &:hover {
            background-color: var(--color-primary-hover);
        }
    }
    
    &.secondary {
        background-color: var(--color-background-third);
        color: var(--color-text-primary);
        &:hover {
            background-color: var(--color-border-light);
        }
    }
    
    &.info {
        background-color: var(--color-info-light);
        color: var(--color-info);
        &:hover {
            background-color: var(--color-info-hover);
        }
    }
`;

export const ActionButton = styled.button`
    padding: 0.25rem;
    border-radius: var(--border-radius-sm);
    border: none;
    background: transparent;
    cursor: pointer;
    
    &.view {
        color: var(--color-info);
        &:hover {
            background-color: var(--color-info-light);
        }
    }
    
    &.edit {
        color: var(--color-success);
        &:hover {
            background-color: var(--color-success-light);
        }
    }
    
    &.delete {
        color: var(--color-error);
        &:hover {
            background-color: var(--color-error-light);
        }
    }
`;

export const Badge = styled.span`
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    
    &.easy {
        background-color: var(--color-success-light);
        color: var(--color-success);
    }
    
    &.medium {
        background-color: var(--color-warning-light);
        color: var(--color-warning);
    }
    
    &.hard {
        background-color: var(--color-error-light);
        color: var(--color-error);
    }
    
    &.active {
        background-color: var(--color-info-light);
        color: var(--color-info);
    }
    
    &.inactive {
        background-color: var(--color-border-light);
        color: var(--color-text-secondary);
    }
`;

export const SelectedContainer = styled.div`
    margin-bottom: var(--space-md);
    padding: var(--space-md);
    background-color: var(--color-info-light);
    border: 1px solid var(--color-info);
    border-radius: var(--border-radius-md);
`;

export const SelectedHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-sm);
`;

export const SelectedTitle = styled.h3`
    font-weight: 500;
    color: var(--color-info);
`;

export const SelectedGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: var(--space-sm);
    
    @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

export const SelectedItem = styled.div`
    display: flex;
    align-items: center;
    padding: var(--space-sm);
    background-color: var(--color-background-primary);
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--color-info);
`;

export const ItemContent = styled.div`
    flex: 1;
`;

export const ItemTitle = styled.div`
    font-weight: 500;
`;

export const ItemMeta = styled.div`
    font-size: 0.75rem;
    color: var(--color-text-secondary);
`;

export const Footer = styled.div`
    margin-top: var(--space-md);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
`;

export const Pagination = styled.div`
    display: flex;
    align-items: center;
    gap: var(--space-sm);
`;

export const Container = styled.div`
  width: 100%;
  padding: var(--space-md);
  background: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
  flex-wrap: wrap;
  gap: var(--space-md);
`;

export const SelectionControls = styled.div`
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
  flex-wrap: wrap;
  flex-direction: column;

  & > * {
    flex: 1;
    min-width: 250px;
  }
`;

export const Title = styled.h2`
  font-weight: bold;
  color: var(--color-text-primary);
  font-size: 1.25rem;
  margin: 0;
`;

// ... (mantive os outros estilos existentes, mas adicionei media queries para responsividade)

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

// ... (outros estilos permanecem similares, mas com melhorias de responsividade)