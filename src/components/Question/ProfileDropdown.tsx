import React from 'react'
import { FiUser, FiChevronDown } from 'react-icons/fi';
import { IoMdSettings, IoMdHelp } from 'react-icons/io';
import { RiLogoutBoxLine } from 'react-icons/ri';
import styled from 'styled-components';

const ProfileDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const ProfileImage = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DropdownContent = styled.div`
  position: absolute;
  right: 0;
  background-color: var(--color-background-secondary);
  min-width: 200px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
  border-radius: 4px;
  top: 100%;
  margin-top: 0.5rem;
  display: none;

  ${ProfileDropdownContainer}:hover & {
    display: block;
  }
`;

const DropdownItem = styled.a`
  color: var(--color-text);
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
  onClick?: () => void;
}

interface ProfileDropdownProps {
  items?: DropdownItem[]; // Opcional para permitir valores padrão
}

export const ProfileDropdown = ({ 
  items = [
    { icon: <FiUser />, label: 'Perfil' },
    { icon: <IoMdSettings />, label: 'Configurações' },
    { icon: <IoMdHelp />, label: 'Ajuda' },
    { icon: <RiLogoutBoxLine />, label: 'Sair' }
  ]
}: ProfileDropdownProps) => (
  <ProfileDropdownContainer>
    <ProfileButton>
      <ProfileImage>
        <FiUser />
      </ProfileImage>
      <FiChevronDown />
    </ProfileButton>
    <DropdownContent>
      {items.map((item, index) => (
        <DropdownItem key={index} onClick={item.onClick}>
          {item.icon} {item.label}
        </DropdownItem>
      ))}
    </DropdownContent>
  </ProfileDropdownContainer>
);