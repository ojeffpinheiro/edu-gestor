import React from 'react'
import { SettingsModalProps } from './types';
import { Modal } from '../../Modal';
import { SettingsSectionComponent } from './SettingsSection';

export const SettingsModal = ({
  title = 'Configurações',
  sections,
  onClose,
  actions,
  className
}: SettingsModalProps) => {
  return (
    <Modal
      title={title}
      onClose={onClose}
      actions={actions}
      size="md"
      className={className}
    >
      {sections.map((section, index) => (
        <SettingsSectionComponent 
          key={`section-${index}`} 
          section={section} 
        />
      ))}
    </Modal>
  );
};