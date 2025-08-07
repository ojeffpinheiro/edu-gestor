import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';

// Navbar Container
export const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: var(--color-primary);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// Left Side - Menu and Navigation
export const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const NavigationDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

export const NavDropdownButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

export const NavDropdownContent = styled.div`
  position: absolute;
  background-color: white;
  min-width: 200px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
  border-radius: 4px;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  display: none;
  ${NavigationDropdown}:hover & {
    display: block;
  }
`;

export const NavDropdownItem = styled.a`
color: var(--color-text-secondary);
padding: 0.75rem 1rem;
text-decoration: none;
display: flex;
align-items: center;
gap: 0.75rem;

&:hover {
opacity: 0.8;
}
`;

// Search Bar
export const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
  margin: 0 2rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border-radius: 4px;
  border: none;
  color: white;
  background-color: var(--glass-background);
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const SearchIconWrapper = styled(FiSearch)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: white;
`;

// Right Side - Notifications and Profile
export const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const NotificationButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.25rem;
  position: relative;
  cursor: pointer;
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--color-error);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
`;


export const ProfileDropdownItem = styled.a`
  color: var(--color-text);
  padding: 0.75rem 1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  &:hover {
    opacity: 0.8;
  }
`;