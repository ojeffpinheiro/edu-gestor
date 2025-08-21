import React from 'react';
import { ItemContent, StyledNavLink } from './styles';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  isActive: boolean;
  isCollapsed: boolean;
  children?: React.ReactNode;
}

export function SidebarItem({
  to,
  icon,
  isActive,
  isCollapsed,
  children,
}: SidebarItemProps) {
  return (
    <StyledNavLink
      to={to}
      $isActive={isActive}
      $isCollapsed={isCollapsed}
    >
      {icon}
      {!isCollapsed && children && (
        <ItemContent>
          {children}
        </ItemContent>
      )}
    </StyledNavLink>
  );
}