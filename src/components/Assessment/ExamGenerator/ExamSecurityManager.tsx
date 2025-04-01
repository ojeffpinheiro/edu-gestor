import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Divider, FormControl, FormHelperText, InputAdornment, Stack, Switch, TextField, Typography } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FiLock, FiClock, FiAlertTriangle, FiEye, FiEyeOff } from 'react-icons/fi';
import { generatePassword } from '../../../utils/passwordGenerator';

// Usando as interfaces definidas no documento
interface Exam {
  id: string;
  title: string;
  description: string;
  questions: string[];
  classIds: string[];
  totalPoints: number;
  qrCode: string;
  barCode: string;
  password: string;
  createdAt: Date;
  createdBy: string;
  startTime?: Date;
  endTime?: Date;
  timeLimit?: number;
  requirePassword: boolean;
}

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
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FiLock style={{ marginRight: 8 }} /> Segurança da Prova
        </Typography>
        
        <Divider sx={{ mb: 3 }} />
        
        {/* Configuração de senha */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Proteção por Senha
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Switch 
              checked={examSecurity.requirePassword}
              onChange={handleSwitchChange('requirePassword')}
              color="primary"
            />
            <Typography>Exigir senha para acesso à prova</Typography>
          </Stack>

          {examSecurity.requirePassword && (
            <Stack spacing={2}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  label="Senha da Prova"
                  value={examSecurity.password}
                  onChange={handleSecurityChange('password')}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FiLock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button onClick={togglePasswordVisibility} size="small">
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <Button 
                variant="outlined" 
                onClick={handleGeneratePassword}
                startIcon={<FiLock />}
                sx={{ alignSelf: 'flex-start' }}
              >
                Gerar senha segura
              </Button>
            </Stack>
          )}
        </Box>

        {/* Controle de Tempo */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
            Controle de Disponibilidade
          </Typography>

          <Stack spacing={3}>
            {/* Janela de tempo para disponibilidade */}
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Switch 
                  checked={examSecurity.enableTimeWindow}
                  onChange={handleSwitchChange('enableTimeWindow')}
                  color="primary"
                />
                <Typography>Definir período de disponibilidade</Typography>
              </Stack>

              {examSecurity.enableTimeWindow && (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ ml: 4 }}>
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
                  </Stack>
                </LocalizationProvider>
              )}

              {examSecurity.enableTimeWindow && !isDateRangeValid() && (
                <Typography color="error" sx={{ display: 'flex', alignItems: 'center', mt: 1, ml: 4 }}>
                  <FiAlertTriangle style={{ marginRight: 8 }} /> 
                  A data final deve ser posterior à data inicial.
                </Typography>
              )}
            </Box>

            {/* Limite de tempo para realizar a prova */}
            <Box>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Switch 
                  checked={examSecurity.enableTimeLimit}
                  onChange={handleSwitchChange('enableTimeLimit')}
                  color="primary"
                />
                <Typography>Definir tempo limite para realização</Typography>
              </Stack>

              {examSecurity.enableTimeLimit && (
                <FormControl sx={{ ml: 4, width: 200 }}>
                  <TextField
                    label="Duração em minutos"
                    value={examSecurity.timeLimit}
                    onChange={handleSecurityChange('timeLimit')}
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FiClock />
                        </InputAdornment>
                      ),
                      inputProps: { min: 1 }
                    }}
                  />
                  <FormHelperText>
                    {Math.floor(examSecurity.timeLimit / 60) > 0 
                      ? `${Math.floor(examSecurity.timeLimit / 60)}h ${examSecurity.timeLimit % 60}min` 
                      : ''}
                  </FormHelperText>
                </FormControl>
              )}
            </Box>
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={saveSecuritySettings}
            disabled={examSecurity.enableTimeWindow && !isDateRangeValid()}
          >
            Salvar Configurações de Segurança
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExamSecurityManager;