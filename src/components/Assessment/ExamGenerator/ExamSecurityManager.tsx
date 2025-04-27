import React, { useState } from 'react';
import { FiLock, FiClock, FiAlertTriangle, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import { generatePassword } from '../../../utils/passwordGenerator';
import { Exam } from '../../../utils/types/Assessment';
import { CardHeader } from '../../../styles/card';
import { Divider, Section } from '../../../styles/layoutUtils';
import { SectionTitle } from '../../../styles/baseComponents';
import { ErrorMessage } from '../../../styles/feedback';
import { 
  ButtonsContainer, 
  DatePickerWrapper, 
  GeneratePasswordButton, 
  InputField, 
  PasswordInputWrapper, 
  SaveButton, 
  SecurityCard, 
  StyledSwitch, 
  StyledTextField, 
  SwitchRow, 
  TimeLimitContainer
 } from './ExamSecurityManagerStyles';

interface ExamSecurityManagerProps {
  exam: Exam;
  onUpdate: (updatedExam: Exam) => void;
}

const ExamSecurityManager: React.FC<ExamSecurityManagerProps> = ({ exam, onUpdate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [examSecurity, setExamSecurity] = useState({
    password: exam.password || '',
    requirePassword: exam.requirePassword || false,
    startTime: exam.startTime || null,
    endTime: exam.endTime || null,
    timeLimit: exam.timeLimit || 0,
    enableTimeLimit: exam.timeLimit ? true : false,
    enableTimeWindow: exam.startTime && exam.endTime ? true : false,
  });

  // Função para atualizar o estado de segurança
  const handleSecurityChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExamSecurity({
      ...examSecurity,
      [field]: event.target.value,
    });
  };

  // Função para atualizar valores booleanos
  const handleSwitchChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExamSecurity({
      ...examSecurity,
      [field]: event.target.checked,
    });
  };

  // Função para atualizar datas
  const handleDateChange = (field: string) => (newDate: Date | null) => {
    setExamSecurity({
      ...examSecurity,
      [field]: newDate,
    });
  };

  // Função para gerar senha aleatória segura
  const handleGeneratePassword = () => {
    const newPassword = generatePassword(12, true, true, true);
    setExamSecurity({
      ...examSecurity,
      password: newPassword,
    });
  };

  // Função para visualizar/ocultar senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validação de datas
  const isDateRangeValid = () => {
    if (!examSecurity.enableTimeWindow) return true;
    if (!examSecurity.startTime || !examSecurity.endTime) return false;
    return new Date(examSecurity.endTime) > new Date(examSecurity.startTime);
  };

  // Salvar as configurações de segurança
  const saveSecuritySettings = () => {
    const updatedExam: Exam = {
      ...exam,
      password: examSecurity.requirePassword ? examSecurity.password : '',
      requirePassword: examSecurity.requirePassword,
      startTime: examSecurity.enableTimeWindow && examSecurity.startTime ? examSecurity.startTime : undefined,
      endTime: examSecurity.enableTimeWindow && examSecurity.endTime ? examSecurity.endTime : undefined,
      timeLimit: examSecurity.enableTimeLimit ? examSecurity.timeLimit : undefined,
    };
    
    onUpdate(updatedExam);
  };

  return (
    <SecurityCard>
      <CardHeader>
        <h2>
          <FiShield size={20} />
          Segurança da Prova
        </h2>
      </CardHeader>
      
      <Divider />
      
      {/* Configuração de senha */}
      <Section>
        <SectionTitle>Proteção por Senha</SectionTitle>

        <SwitchRow>
          <StyledSwitch>
            <input 
              type="checkbox" 
              checked={examSecurity.requirePassword}
              onChange={handleSwitchChange('requirePassword')}
            />
            <span></span>
          </StyledSwitch>
          <label>Exigir senha para acesso à prova</label>
        </SwitchRow>

        {examSecurity.requirePassword && (
          <>
            <PasswordInputWrapper>
              <FiLock className="icon-start" size={16} />
              <StyledTextField
                type={showPassword ? 'text' : 'password'}
                value={examSecurity.password}
                onChange={handleSecurityChange('password')}
                placeholder="Senha de acesso"
              />
              <button 
                className="toggle-visibility"
                onClick={togglePasswordVisibility}
                type="button"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </PasswordInputWrapper>

            <GeneratePasswordButton 
              onClick={handleGeneratePassword}
              type="button"
            >
              <FiLock size={16} />
              Gerar senha segura
            </GeneratePasswordButton>
          </>
        )}
      </Section>

      {/* Controle de Tempo */}
      <Section>
        <SectionTitle>Controle de Disponibilidade</SectionTitle>

        {/* Janela de tempo para disponibilidade */}
        <SwitchRow>
          <StyledSwitch>
            <input 
              type="checkbox" 
              checked={examSecurity.enableTimeWindow}
              onChange={handleSwitchChange('enableTimeWindow')}
            />
            <span></span>
          </StyledSwitch>
          <label>Definir período de disponibilidade</label>
        </SwitchRow>

        {examSecurity.enableTimeWindow && (
          <>
            <DatePickerWrapper>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Disponível a partir de"
                  value={examSecurity.startTime}
                  onChange={handleDateChange('startTime')}
                  format="dd/MM/yyyy HH:mm"
                />
                <DateTimePicker
                  label="Disponível até"
                  value={examSecurity.endTime}
                  onChange={handleDateChange('endTime')}
                  format="dd/MM/yyyy HH:mm"
                />
              </LocalizationProvider>
            </DatePickerWrapper>

            {!isDateRangeValid() && (
              <ErrorMessage>
                <FiAlertTriangle size={16} />
                <span>A data final deve ser posterior à data inicial.</span>
              </ErrorMessage>
            )}
          </>
        )}

        {/* Limite de tempo para realizar a prova */}
        <SwitchRow>
          <StyledSwitch>
            <input 
              type="checkbox" 
              checked={examSecurity.enableTimeLimit}
              onChange={handleSwitchChange('enableTimeLimit')}
            />
            <span></span>
          </StyledSwitch>
          <label>Definir tempo limite para realização</label>
        </SwitchRow>

        {examSecurity.enableTimeLimit && (
          <TimeLimitContainer>
            <InputField>
              <FiClock size={16} />
              <StyledTextField
                type="number"
                value={examSecurity.timeLimit}
                onChange={handleSecurityChange('timeLimit')}
                placeholder="Duração em minutos"
                min={1}
              />
            </InputField>
            {examSecurity.timeLimit > 0 && (
              <small>
                {Math.floor(examSecurity.timeLimit / 60) > 0 
                  ? `${Math.floor(examSecurity.timeLimit / 60)}h ${examSecurity.timeLimit % 60}min` 
                  : `${examSecurity.timeLimit} minutos`}
              </small>
            )}
          </TimeLimitContainer>
        )}
      </Section>

      <ButtonsContainer>
        <SaveButton 
          onClick={saveSecuritySettings}
          disabled={examSecurity.enableTimeWindow && !isDateRangeValid()}
        >
          Salvar Configurações de Segurança
        </SaveButton>
      </ButtonsContainer>
    </SecurityCard>
  );
};

export default ExamSecurityManager;