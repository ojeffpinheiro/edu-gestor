import styled from "styled-components";

// Card component
export const StatsCard = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  border: 1px solid var(--color-border-light);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }
`;

export const CardTitle = styled.h3`
  font-size: var(--font-size-md);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-sm);
`;

export const CardValue = styled.div`
  font-size: var(--font-size-2xl);
  font-weight: 600;
  color: var(--color-text);
  margin-top: var(--space-sm);
`;

export const CardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--space-md);
`;

export const CardTrend = styled.div<{ positive: boolean }>`
  display: flex;
  align-items: center;
  font-size: var(--font-size-sm);
  color: ${props => props.positive ? 'var(--color-success)' : 'var(--color-error)'};
  margin-top: var(--space-sm);
`;

// Layout components
export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) var(--space-lg);
  background-color: var(--color-background-secondary);
  border-bottom: 1px solid var(--color-border-light);
`;

export const Logo = styled.div`
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-primary);
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-md);
  padding: 0 var(--space-md);
  flex: 1;
  max-width: 400px;
  margin: 0 var(--space-xl);
  
  input {
    border: none;
    background-color: transparent;
    padding: var(--space-sm);
    width: 100%;
    
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`;

export const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-md);
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: var(--space-sm);
  border-radius: var(--border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--color-background-third);
    color: var(--color-primary);
  }
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: var(--border-radius-full);
  background-color: var(--color-primary);
  color: var(--color-text-on-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

export const MainContent = styled.main`
  display: flex;
  flex: 1;
`;

export const Sidebar = styled.aside`
  width: 240px;
  background-color: var(--color-background-secondary);
  border-right: 1px solid var(--color-border-light);
  padding: var(--space-md);
`;

export const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SidebarMenuItem = styled.li<{ active?: boolean }>`
  margin-bottom: var(--space-sm);
  
  a {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md);
    border-radius: var(--border-radius-md);
    color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-text)'};
    background-color: ${props => props.active ? 'var(--color-background-third)' : 'transparent'};
    transition: all 0.2s ease;
    
    &:hover {
      background-color: var(--color-background-third);
    }
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

export const PageContent = styled.div`
  flex: 1;
  padding: var(--space-lg);
`;

export const PageTitle = styled.h1`
  font-size: var(--font-size-2xl);
  margin-bottom: var(--space-lg);
  color: var(--color-text);
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-lg);
  margin-bottom: var(--space-xl);
`;

export const ChartContainer = styled.div`
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-lg);
  border: 1px solid var(--color-border-light);
`;

export const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartTitle = styled.h3`
  font-size: var(--font-size-md);
  margin-bottom: var(--space-md);
  color: var(--color-text);
`;

export const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ActivityItem = styled.li`
  display: flex;
  align-items: center;
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--color-border-light);
  
  &:last-child {
    border-bottom: none;
  }
`;

export const ActivityIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: var(--border-radius-full);
  background-color: var(--color-background-third);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--space-md);
  color: var(--color-primary);
`;

export const ActivityContent = styled.div`
  flex: 1;
`;

export const ActivityTitle = styled.div`
  font-weight: 500;
  color: var(--color-text);
`;

export const ActivityTime = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
`;

export const ChartPlaceholder = styled.div`
  height: 300px;
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
`;