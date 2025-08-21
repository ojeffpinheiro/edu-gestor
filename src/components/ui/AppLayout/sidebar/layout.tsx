import React from 'react'
import { Outlet } from 'react-router-dom';
import { SidebarProvider, useSidebar } from './sidebar-context';
import { AppSidebar } from './app-sidebar';
import { useIsMobile } from './use-mobile';
import { Button } from '../../../shared/Button.styles';
import { FiMenu } from 'react-icons/fi';
import { ContentContainer, MainContainer, MainContent, MobileHeaderWrapper } from './styles';

export function Layout() {
  return (
    <SidebarProvider>
      <MainContainer>
        <AppSidebar />
        <ContentContainer>
          <MobileHeader />
          <MainContent>
            <Outlet />
          </MainContent>
        </ContentContainer>
      </MainContainer>
    </SidebarProvider>
  );
}

function MobileHeader() {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <MobileHeaderWrapper>
      <Button
        $variant="ghost"
        onClick={toggleSidebar}
        style={{ marginRight: '1rem' }}
      >
        <FiMenu size={20} />
      </Button>
      <h1 style={{ fontSize: '1.25rem', fontWeight: '600' }}>EduGestor</h1>
    </MobileHeaderWrapper>
  );
}