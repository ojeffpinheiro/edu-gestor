import styled, { css } from 'styled-components';

export const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const SidebarContainer = styled.div<{ collapsed: boolean }>`
  width: ${props => props.collapsed ? '80px' : '250px'};
  background: #2c3e50;
  color: white;
  transition: width 0.3s ease;
  position: fixed;
  height: 100vh;
  z-index: 100;
`;

export const SidebarMenu = styled.div`
  padding: 20px 0;
`;

export const MenuItem = styled.div<{ active: boolean, collapsed: boolean }>`
  padding: ${props => props.collapsed ? '15px 0' : '15px 20px'};
  margin: 0 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  justify-content: ${props => props.collapsed ? 'center' : 'flex-start'};

  ${props => props.active 
    ? css`
      background: #3498db;
      color: white;
    `
    : css`
      background: transparent;
      color: rgba(255, 255, 255, 0.8);

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    `
  }
`;

export const MenuIcon = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MenuText = styled.div`
  margin-left: 15px;
  font-size: 15px;
  white-space: nowrap;
`;

export const MainContent = styled.main<{ collapsed: boolean }>`
  flex: 1;
  margin-left: ${props => props.collapsed ? '80px' : '250px'};
  padding: 20px;
  background: var(--color-background);
  transition: margin-left 0.3s ease;
`;