import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchInput } from '../../../styles/formControls';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 100;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  
  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-left: 0.75rem;
    color: #2c3e50;
  }
  
  svg {
    width: 2rem;
    height: 2rem;
    color: #3498db;
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 1.2rem;
    }
  }
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  margin-right: 1rem;
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const SearchWrapper = styled.div`
  width: 300px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NotificationBell = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: #7f8c8d;
  }
  
  span {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: #e74c3c;
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
  }
  
  span {
    margin-left: 0.5rem;
    font-weight: 500;
    
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [notificationCount, setNotificationCount] = useState(3);
  
  return (
    <HeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MenuToggle onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </MenuToggle>
        <Logo>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h1>Exam Generator</h1>
        </Logo>
      </div>
      
      <HeaderActions>
        <SearchWrapper>
          <SearchInput placeholder="Buscar..." />
        </SearchWrapper>
        <NotificationBell>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {notificationCount > 0 && <span>{notificationCount}</span>}
        </NotificationBell>
        <UserMenu>
          <img src="/api/placeholder/40/40" alt="User profile" />
          <span>Professor Silva</span>
        </UserMenu>
      </HeaderActions>
    </HeaderContainer>
  );
};

export default Header;