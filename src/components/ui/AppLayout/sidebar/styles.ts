
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  background-color: #f8f9fa;
`;

export const MobileHeaderWrapper = styled.header`
  display: none;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  background-color: #fff;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

export const DesktopSidebar = styled.aside<{ $isCollapsed: boolean }>`
  height: 100vh;
  border-right: 1px solid #e9ecef;
  transition: width 0.3s ease;
  width: ${props => props.$isCollapsed ? '70px' : '250px'};
  overflow: hidden;
  background-color: #fff;
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const MobileSidebarOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${props => props.$isOpen ? 'block' : 'none'};
`;

export const MobileSidebarContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: #fff;
  z-index: 1001;
  overflow-y: auto;
`;


export const StyledNavLink = styled(NavLink)<{ 
  $isActive: boolean; 
  $isCollapsed: boolean 
}>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  justify-content: ${props => props.$isCollapsed ? 'center' : 'flex-start'};
  gap: ${props => props.$isCollapsed ? '0' : '0.75rem'};
  
  background-color: ${props => props.$isActive ? '#e3f2fd' : 'transparent'};
  color: ${props => props.$isActive ? '#1976d2' : '#64748b'};
  
  &:hover {
    background-color: ${props => props.$isActive ? '#e3f2fd' : '#f1f5f9'};
    color: ${props => props.$isActive ? '#1976d2' : '#334155'};
  }
  
  & > svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }
`;

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  
  & > div:last-child {
    font-size: 0.75rem;
    color: #94a3b8;
  }
`;

export const SidebarGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
`;

export const SidebarHeader = styled.div`
  display: flex;
  height: 4rem;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid #e9ecef;
  justify-content: space-between;
`;

export const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
`;


export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
`;

export const SectionTitle = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ItemTitle = styled.div`
  font-weight: 500;
  color: inherit;
`;

export const ItemDescription = styled.div`
  font-size: 0.75rem;
  color: #64748b;
`;

export const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
`;
