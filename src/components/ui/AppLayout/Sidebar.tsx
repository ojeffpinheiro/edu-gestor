import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarWrapper = styled.aside<{ isOpen: boolean }>`
  background-color: #2c3e50;
  color: #ecf0f1;
  width: ${props => props.isOpen ? '250px' : '0'};
  overflow-x: hidden;
  transition: width 0.3s ease;
  
  @media (max-width: 1024px) {
    position: fixed;
    height: 100vh;
    z-index: 999;
    box-shadow: ${props => props.isOpen ? '2px 0 8px rgba(0, 0, 0, 0.2)' : 'none'};
  }
`;

const SidebarContent = styled.div`
  padding: 1.5rem 0;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SidebarSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: #7f8c8d;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 1.5rem;
  margin-bottom: 0.75rem;
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: 0.25rem;
`;

const NavLink = styled(Link)`
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

const UserInfo = styled.div`
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

const UserDetails = styled.div`
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

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <SidebarWrapper isOpen={isOpen}>
      <SidebarContent>
        <UserInfo>
          <img src="/api/placeholder/40/40" alt="User profile" />
          <UserDetails>
            <h4>Professor Silva</h4>
            <p>Matemática</p>
          </UserDetails>
        </UserInfo>
        
        <SidebarSection>
          <SectionTitle>Principal</SectionTitle>
          <NavMenu>
            <NavItem>
              <NavLink to="/dashboard">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/exams" className="active">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Geração de Provas
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/assessments">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Avaliações
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/questions">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Banco de Questões
              </NavLink>
            </NavItem>
          </NavMenu>
        </SidebarSection>
        
        <SidebarSection>
          <SectionTitle>Configurações</SectionTitle>
          <NavMenu>
            <NavItem>
              <NavLink to="/profile">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Perfil
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/settings">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Configurações
              </NavLink>
            </NavItem>
          </NavMenu>
        </SidebarSection>
      </SidebarContent>
    </SidebarWrapper>
  );
};

export default Sidebar;