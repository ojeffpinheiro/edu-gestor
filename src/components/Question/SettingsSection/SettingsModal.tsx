import React from 'react'
import { SettingsModalProps } from './types';
import { Modal } from '../../Modal';
import { SettingsSectionComponent } from './SettingsSection';

export const SettingsModal = ({
  title = 'Configurações',
  sections,
  onClose,
  actions,
  className,
  isOpen
}: SettingsModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
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