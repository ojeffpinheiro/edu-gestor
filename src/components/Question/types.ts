import { ReactNode } from 'react';

export interface DropdownItemType {
  id: string;
  content: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItemType[];
  position?: 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  triggerClassName?: string;
  contentClassName?: string;
}