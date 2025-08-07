import React from 'react'
import {
  SettingsSectionContainer,
  SettingsSectionTitle,
  SettingsOption,
  SettingsOptionLabel,
  SettingsOptionDescription,
  SettingsOptionControl
} from './styles';
import { SettingsSection } from './types';

interface SettingsSectionProps {
  section: SettingsSection;
  className?: string;
}

export const SettingsSectionComponent = ({ 
  section, 
  className 
}: SettingsSectionProps) => {
  return (
    <SettingsSectionContainer className={className}>
      <SettingsSectionTitle>{section.title}</SettingsSectionTitle>
      
      {section.options.map((option) => (
        <SettingsOption key={option.id}>
          <div>
            <SettingsOptionLabel>{option.label}</SettingsOptionLabel>
            {option.description && (
              <SettingsOptionDescription>
                {option.description}
              </SettingsOptionDescription>
            )}
          </div>
          
          <SettingsOptionControl>
            {option.control}
          </SettingsOptionControl>
        </SettingsOption>
      ))}
    </SettingsSectionContainer>
  );
};