import styled from "styled-components";
import { Button } from "../../../styles/buttons";
import { flexRow, gap, spaceBetween } from "../../../styles/layoutUtils";
import { BaseInput } from "../../../styles/baseComponents";
import { Table, TableCell, TableHeader, TableRow } from "../../../styles/table";

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-title-card);
`;

export const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TabsContainer = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`;

export const TabsList = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1.5rem;
`;

export const TabButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-text)'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--color-primary);
  }
`;

export const TabContent = styled.div<{ active: boolean }>`
  display: ${props => props.active ? 'block' : 'none'};
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const Card = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  width: 100%;
`;

export const CardHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border-light);
`;

export const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

export const CardContent = styled.div`
  padding: 1.5rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StatItem = styled.div`
  padding: 1rem;
  border: 1px solid var(--color-border-light);
  border-radius: var(--border-radius-md);
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
`;

export const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
`;

export const QuartilesContainer = styled.div`
  margin-top: 1.5rem;
`;

export const QuartilesLabel = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const QuartilesBar = styled.div`
  width: 100%;
  height: 1.5rem;
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-md);
  position: relative;
  margin-bottom: 0.5rem;
`;

export const QuartileSection = styled.div<{
  left: string;
  width: string;
  color: string;
  borderRadius?: string;
}>`
  position: absolute;
  height: 100%;
  background-color: ${props => props.color};
  left: ${props => props.left};
  width: ${props => props.width};
  border-radius: ${props => props.borderRadius || '0'};
`;

export const QuartileMean = styled.div<{ left: string }>`
  position: absolute;
  width: 2px;
  height: 2rem;
  background-color: var(--color-text-primary);
  left: ${props => props.left};
`;

export const QuartilesScale = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
`;

export const Select = styled.select`
  background-color: var(--color-input);
  border: 1px solid var(--color-input-border);
  border-radius: var(--border-radius-md);
  padding: 0.5rem;
  font-family: var(--font-family);
  color: var(--color-text);
  width: 140px;
  outline: none;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-focus);
  }
`;

export const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  padding: 0.5rem 1rem;
  font-family: var(--font-family);
  color: var(--color-text);
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

export const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16rem;
  color: var(--color-text-third);
`;

export const TableContainer = styled.div`
  width: 100%;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border);
  margin-bottom: var(--space-lg);
`;

export const StyledTable = styled(Table)`
  margin-bottom: 0;
`;

export const StyledTableHeader = styled(TableHeader)`
  background-color: var(--color-background-third);
  color: var(--color-text);
  padding: var(--space-md);
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const StyledTableCell = styled(TableCell)`
  text-align: left;
  padding: var(--space-md);
`;

export const StyledTableRow = styled(TableRow)<{ clickable?: boolean }>`
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  
  &:hover {
    background-color: ${props => props.clickable ? 'var(--color-background-third)' : 'inherit'};
  }
`;

export const SearchInput = styled(BaseInput)`
  max-width: 300px;
`;

export const FilterInput = styled(BaseInput)`
  margin-top: var(--space-sm);
  height: 32px;
  font-size: var(--font-size-xs);
`;

export const ColumnHeader = styled.div`
  min-width: 150px;
`;

export const SortableHeader = styled.div`
  ${flexRow}
  ${gap('xs')}
  cursor: pointer;
  font-weight: 600;
`;

export const PaginationContainer = styled.div`
  ${flexRow}
  ${spaceBetween}
  margin-top: var(--space-md);
`;

export const PaginationInfo = styled.div`
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
`;

export const PaginationControls = styled.div`
  ${flexRow}
  ${gap('xs')}
`;

export const PageButton = styled(Button)<{ active?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-background-secondary)'};
  color: ${props => props.active ? 'var(--color-text-on-primary)' : 'var(--color-text)'};
  
  &:hover {
    background-color: ${props => props.active ? 'var(--color-primary-hover)' : 'var(--color-secondary-hover)'};
  }
`;

export const StatusBadge = styled.span<{ status: 'completed' | 'pending' | 'in-progress' }>`
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-xs);
  font-weight: 500;
  text-transform: capitalize;
  
  ${props => {
    switch (props.status) {
      case 'completed':
        return `
          background-color: var(--color-success);
          color: white;
        `;
      case 'pending':
        return `
          background-color: var(--color-warning);
          color: white;
        `;
      case 'in-progress':
        return `
          background-color: var(--color-info);
          color: white;
        `;
      default:
        return '';
    }
  }}
`;

export const NoResults = styled.div`
  padding: var(--space-xl);
  text-align: center;
  color: var(--color-text-secondary);
`;

export const DropdownContainer = styled.div`
  position: relative;
`;

export const DropdownTrigger = styled(Button)`
  ${flexRow}
  ${gap('xs')}
`;

export const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--color-background-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  z-index: 100;
  min-width: 150px;
  margin-top: var(--space-xs);
`;

export const DropdownItem = styled.button`
  width: 100%;
  text-align: left;
  padding: var(--space-sm) var(--space-md);
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-background-third);
  }
`;