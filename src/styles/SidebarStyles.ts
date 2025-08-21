import { Link } from "react-router-dom";
import styled from "styled-components";

interface SidebarWrapperProps {
  $isOpen: boolean;
}

interface NavLinkProps {
  $active?: boolean;
}

export const SidebarWrapper = styled.aside<SidebarWrapperProps>`
  background-color: #2c3e50;
  color: #ecf0f1;
  width: ${props => props.$isOpen ? '250px' : '0'};
  overflow-x: hidden;
  transition: width 0.3s ease;
  
  @media (max-width: 1024px) {
    position: fixed;
    height: 100vh;
    z-index: 999;
    box-shadow: ${props => props.$isOpen ? '2px 0 8px rgba(0, 0, 0, 0.2)' : 'none'};
  }
`;

export const SidebarContent = styled.div`
  padding: 1.5rem 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const SidebarSection = styled.div`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled.h3`
  color: #7f8c8d;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 1.5rem;
  margin-bottom: 0.75rem;
`;

export const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li`
  margin-bottom: 0.25rem;
`;

export const NavLink = styled(Link) <NavLinkProps>`
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: #ecf0f1;
  text-decoration: none;
  transition: background-color 0.2s;
  border-left: 3px solid transparent;
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: 0.75rem;
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background-color: rgba(52, 152, 219, 0.2);
    border-left-color: #3498db;
    color: #3498db;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1.5rem;
  
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const UserDetails = styled.div`
  margin-left: 0.75rem;
  
  h4 {
    margin: 0;
    font-size: 0.9rem;
  }
  
  p {
    margin: 0;
    font-size: 0.75rem;
    color: #7f8c8d;
  }
`;