import React from 'react'
import { useLocation } from 'react-router-dom';
import { 
  FiBookOpen, FiChevronLeft, 
  FiChevronRight, FiFilePlus, 
  FiFolder, FiHome, 
  FiSettings, FiUsers 
} from 'react-icons/fi';
import { Button } from '../../../shared/Button.styles';
import { useSidebar } from './sidebar-context';
import Sidebar from '../Sidebar';
import { SidebarItem } from './sidebar-item';
import { 
  HeaderContent, IconWrapper, 
  ItemDescription, ItemTitle, 
  SectionTitle, SidebarContent, 
  SidebarGroup, SidebarHeader, 
  Title 
} from './styles';

const mainNavItems = [
  { 
    title: "Dashboard", 
    path: "/", 
    icon: FiHome,
    description: "Visão geral do sistema" 
  },
  { 
    title: "Banco de Questões", 
    path: "/questions", 
    icon: FiBookOpen,
    description: "Gerencie suas questões" 
  },
  { 
    title: "Pastas", 
    path: "/folders", 
    icon: FiFolder,
    description: "Organize por categorias" 
  },
  { 
    title: "Nova Questão", 
    path: "/questions/new", 
    icon: FiFilePlus,
    description: "Adicione uma nova questão" 
  }
];

const settingsNavItems = [
  { 
    title: "Usuários", 
    path: "/users", 
    icon: FiUsers,
    description: "Gerencie usuários" 
  },
  { 
    title: "Configurações", 
    path: "/settings", 
    icon: FiSettings,
    description: "Configurações do sistema" 
  }
];

export function AppSidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === path;
    return currentPath.startsWith(path);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <HeaderContent>
          {!isCollapsed && <Title>EduGestor</Title>}
          <Button
            $variant="ghost"
            $size="sm"
            onClick={toggleSidebar}
            style={{ width: '2rem', height: '2rem' }}
          >
            {isCollapsed ? (
              <IconWrapper>
                <FiChevronRight size={16} />
              </IconWrapper>
            ) : (
              <IconWrapper>
                <FiChevronLeft size={16} />
              </IconWrapper>
            )}
            <span className="sr-only">Alternar Sidebar</span>
          </Button>
        </HeaderContent>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {mainNavItems.map((item) => (
            <SidebarItem
              key={item.path}
              to={item.path}
              icon={<item.icon size={20} />}
              isActive={isActive(item.path)}
              isCollapsed={isCollapsed}
            >
              <div>
                <ItemTitle>{item.title}</ItemTitle>
                {!isCollapsed && <ItemDescription>{item.description}</ItemDescription>}
              </div>
            </SidebarItem>
          ))}
        </SidebarGroup>

        <SidebarGroup style={{ marginTop: '2rem' }}>
          {!isCollapsed && <SectionTitle>Configurações</SectionTitle>}
          {settingsNavItems.map((item) => (
            <SidebarItem
              key={item.path}
              to={item.path}
              icon={<item.icon size={20} />}
              isActive={isActive(item.path)}
              isCollapsed={isCollapsed}
            >
              <div>
                <ItemTitle>{item.title}</ItemTitle>
                {!isCollapsed && <ItemDescription>{item.description}</ItemDescription>}
              </div>
            </SidebarItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}