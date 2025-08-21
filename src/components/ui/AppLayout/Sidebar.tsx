import React from 'react';
import { useSidebar } from './sidebar/sidebar-context';
import { useIsMobile } from './sidebar/use-mobile';
import { DesktopSidebar, MobileSidebarContent, MobileSidebarOverlay } from './sidebar/styles';

interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const { isCollapsed, isMobileOpen, closeMobileSidebar } = useSidebar();
  const isMobile = useIsMobile();


  if (isMobile) {
    return (
      <>
        <MobileSidebarOverlay 
          $isOpen={isMobileOpen} 
          onClick={closeMobileSidebar} 
        />
        {isMobileOpen && (
          <MobileSidebarContent>
            {children}
          </MobileSidebarContent>
        )}
      </>
    );
  }

  return (
    <DesktopSidebar $isCollapsed={isCollapsed}>
      {children}
    </DesktopSidebar>
  );
};

export default Sidebar;