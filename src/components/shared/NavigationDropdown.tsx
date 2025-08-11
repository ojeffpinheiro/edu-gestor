import React from 'react'
import styled from 'styled-components';
import { FiChevronDown } from 'react-icons/fi';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
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

const DropdownContent = styled.div`
  position: absolute;
  background-color: var(--color-background-secondary);
  min-width: 200px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
  border-radius: 4px;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  display: none;

  ${DropdownContainer}:hover & {
    display: block;
  }
`;

const DropdownItem = styled.a`
  color: var(--color-text-secondary);
  padding: 0.75rem 1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    background-color: #f5f5f5;
  }
`;

interface DropdownItem {
  icon: React.ReactNode;
  label: string;
}

interface NavigationDropdownProps {
  items: DropdownItem[];
}

export const NavigationDropdown = ({ items }: NavigationDropdownProps) => (
  <DropdownContainer>
    <DropdownButton>
      Navegação <FiChevronDown />
    </DropdownButton>
    <DropdownContent>
      {items.map((item, index) => (
        <DropdownItem key={index}>
          {item.icon} {item.label}
        </DropdownItem>
      ))}
    </DropdownContent>
  </DropdownContainer>
);