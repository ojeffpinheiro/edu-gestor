import styled from "styled-components";
import { Button } from "../../../styles/buttons";
import { flexRow, gap, spaceBetween } from "../../../styles/layoutUtils";
import { BaseInput } from "../../../styles/baseComponents";
import { Table, TableCell, TableHeader, TableRow } from "../../../styles/table";
import { fadeIn } from "../../../styles/animations";
import { Card } from "../../../styles/card";

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

export const TabsList = styled.div`
  display: flex;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1.5rem;
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

// Styled Components
export const DashboardContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

export const DashboardHeader = styled.div`
  ${flexRow}
  ${spaceBetween}
  margin-bottom: var(--space-lg);
  
  h2 {
    margin: 0;
  }
`;

export const TimeframeSelector = styled.div`
  ${flexRow}
  ${gap('sm')}
`;

export const SummaryCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-gap: var(--space-md);
  margin-bottom: var(--space-lg);
`;

export const MetricCard = styled(Card)`
  ${flexRow}
  padding: var(--space-md);
  background-color: var(--color-background-secondary);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

export const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  ${flexRow}
  justify-content: center;
  background-color: var(--color-primary);
  border-radius: var(--border-radius-md);
  color: var(--color-text-on-primary);
  font-size: var(--font-size-xl);
  margin-right: var(--space-md);
`;

export const CardContentDashboard = styled.div`
  flex: 1;
`;

export const MetricTitle = styled.h4`
  margin: 0 0 var(--space-xs) 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
`;

export const MetricValue = styled.div`
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text);
`;

export const MetricValueWithTrend = styled(MetricValue)`
  ${flexRow}
  ${gap('sm')}
`;

export const TrendUpIndicator = styled.span`
  color: var(--color-success);
  font-size: var(--font-size-sm);
  ${flexRow}
`;

export const TrendDownIndicator = styled.span`
  color: var(--color-error);
  font-size: var(--font-size-sm);
  ${flexRow}
`;

export const DetailSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--space-lg);
  margin-bottom: var(--space-lg);
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailCard = styled(Card)`
  padding: var(--space-lg);
  
  h3 {
    margin-top: 0;
    margin-bottom: var(--space-md);
    font-size: var(--font-size-lg);
  }
`;

export const CategoryBreakdown = styled.div`
  ${flexRow}
  flex-direction: column;
  gap: var(--space-md);
`;

export const CategoryItem = styled.div`
  width: 100%;
`;

export const CategoryName = styled.div`
  margin-bottom: var(--space-xs);
  font-weight: 500;
`;

export const CategoryScoreWrapper = styled.div`
  ${flexRow}
  ${gap('sm')}
  align-items: center;
  height: 24px;
`;

export const CategoryScoreBar = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${({ percentage }) => percentage}%;
  background-color: var(--color-primary);
  border-radius: var(--border-radius-sm);
  transition: width 1s ease-out;
`;

export const CategoryScore = styled.div`
  font-weight: 600;
  min-width: 48px;
  text-align: right;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
`;