import React from 'react';
import { ShiftSettings, Period } from '../../../types/academic/Planning';
import { FormGroup, Label } from '../../../styles/formControls';
import { Input } from '../../../styles/inputs';
import { Button } from '../../../styles/buttons';
import { FaPlus, FaTrash, FaClock, FaRegClock, FaCoffee, FaEdit } from 'react-icons/fa';

import {
  PeriodItem,
  PeriodGrid,
  PeriodActions,
  PeriodSelect,
  SectionTitle,
  EnhancedModalContent,
  ScrollableModalBody,
  CenteredButtonContainer
} from './styles';
import Modal from '../../modals/Modal';
import { useModal } from '../../../contexts/ModalContext';
import { useSchedule } from '../../../contexts/ScheduleContext';

const periodOptions = [
  { value: '1º período', label: '1º Período' },
  { value: '2º período', label: '2º Período' },
  { value: '3º período', label: '3º Período' },
  { value: '4º período', label: '4º Período' },
  { value: 'Intervalo', label: 'Intervalo' },
  { value: 'Almoço', label: 'Almoço' },
  { value: 'Café', label: 'Café' },
  { value: 'Lanche', label: 'Lanche' },
  { value: 'Descanso', label: 'Descanso' },
];

interface ShiftSettingsEditorProps {
  settings: ShiftSettings;
  onChange: (settings: ShiftSettings) => void;
}


const ShiftSettingsEditor: React.FC<ShiftSettingsEditorProps> = ({ 
  settings, 
  onChange
}) => {
  const { state: modalState, actions: modalActions } = useModal();
  const { 
    state: { shiftSettings, selectedShift },
    updateShiftSettings
  } = useSchedule();

  if (modalState.type !== 'SHIFT_SETTINGS') return null;

  const currentSettings = shiftSettings[selectedShift];

  
  const handleChange = (updated: Partial<ShiftSettings>) => {
    updateShiftSettings(selectedShift, { ...currentSettings, ...updated });
  };

  const handlePeriodChange = (index: number, field: keyof Period, value: string | boolean) => {
    const newPeriods = [...settings.periods];
    newPeriods[index] = { ...newPeriods[index], [field]: value };
    onChange({ ...settings, periods: newPeriods });
  };

  const addPeriod = () => {
    const lastPeriod = settings.periods[settings.periods.length - 1];
    const newId = lastPeriod ? lastPeriod.id + 1 : 1;
    const newPeriod: Period = {
      id: newId,
      name: 'Novo período',
      startTime: lastPeriod?.endTime || '08:00',
      endTime: '09:00',
      isBreak: false
    };
    onChange({ ...settings, periods: [...settings.periods, newPeriod] });
  };

  const removePeriod = (id: number) => {
    onChange({ ...settings, periods: settings.periods.filter((p: Period) => p.id !== id) });
  };

  return (
    <Modal
      isOpen={modalState.isOpen && modalState.type === 'SHIFT_SETTINGS'}
      onClose={modalActions.closeModal}
      title={`Configurações do Turno ${selectedShift}`}
      size="xl"
      submitText="Salvar Configurações"
      onSubmit={() => handleChange(currentSettings)}
    >
      <EnhancedModalContent size='lg' >
        <PeriodGrid>
          <FormGroup>
            <Label><FaClock /> Horário de Início</Label>
            <Input
              type="time"
              value={settings.startTime}
              onChange={(e) => handleChange({ ...settings, startTime: e.target.value })}
            />
          </FormGroup>

          <FormGroup>
            <Label><FaRegClock /> Duração (minutos)</Label>
            <Input
              type="number"
              value={settings.periodDuration}
              onChange={(e) => handleChange({ ...settings, periodDuration: parseInt(e.target.value) || 0 })}
              min="1"
            />
          </FormGroup>
        </PeriodGrid>

        <SectionTitle>
          <FaEdit /> Períodos Configurados
        </SectionTitle>

        <ScrollableModalBody>
          {settings.periods.map((period, index) => (
            <PeriodItem key={period.id}>
              <PeriodGrid>
                <FormGroup>
                  <Label>Nome do Período</Label>
                  <PeriodSelect
                    value={period.name}
                    onChange={(e) => handlePeriodChange(index, 'name', e.target.value)}
                  >
                    {periodOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </PeriodSelect>
                </FormGroup>

                <FormGroup>
                  <Label>
                    <input
                      type="checkbox"
                      checked={period.isBreak || false}
                      onChange={(e) => handlePeriodChange(index, 'isBreak', e.target.checked)}
                    />
                    <FaCoffee style={{ marginLeft: '0.5rem' }} /> Período de Descanso?
                  </Label>
                </FormGroup>
              </PeriodGrid>

              <PeriodGrid>
                <FormGroup>
                  <Label>Horário de Início</Label>
                  <Input
                    type="time"
                    value={period.startTime}
                    onChange={(e) => handlePeriodChange(index, 'startTime', e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Horário de Término</Label>
                  <Input
                    type="time"
                    value={period.endTime}
                    onChange={(e) => handlePeriodChange(index, 'endTime', e.target.value)}
                  />
                </FormGroup>
              </PeriodGrid>

              <PeriodActions>
                <Button
                  variant="error"
                  onClick={() => removePeriod(period.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <FaTrash /> Remover Período
                </Button>
              </PeriodActions>
            </PeriodItem>
          ))}
        </ScrollableModalBody>

        <CenteredButtonContainer>
          <Button
            onClick={addPeriod}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <FaPlus /> Adicionar Novo Período
          </Button>
        </CenteredButtonContainer>
      </EnhancedModalContent>
    </Modal>
  );
};

export default ShiftSettingsEditor;