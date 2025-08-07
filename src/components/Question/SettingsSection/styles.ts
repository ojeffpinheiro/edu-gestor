import styled from 'styled-components';

export const SettingsSectionContainer = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SettingsSectionTitle = styled.h4`
  margin: 0 0 1rem;
  font-size: 1rem;
  color: var(--color-text);
`;

export const SettingsOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
`;

export const SettingsOptionLabel = styled.label`
  font-size: 0.875rem;
  color: var(--color-text);
`;

export const SettingsOptionDescription = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.75rem;
  color: var(--color-text-secondary);
`;

export const SettingsOptionControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;