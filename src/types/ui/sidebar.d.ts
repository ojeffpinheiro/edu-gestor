import { ReactNode } from 'react';

export interface SidebarItem {
  path: string;
  label: string;
  icon: ReactNode;
  description?: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}