import { ReactNode } from 'react';

export interface SettingsOption {
  id: string;
  label: string;
  description?: string;
  control: ReactNode;
}

export interface SettingsSection {
  title: string;
  options: SettingsOption[];
}

export interface SettingsModalProps {
  title: string;
  sections: SettingsSection[];
  onClose: () => void;
  actions?: ReactNode;
  className?: string;
}