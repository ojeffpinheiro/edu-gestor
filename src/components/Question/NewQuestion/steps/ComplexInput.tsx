import React from 'react';
import { FormGroup, FormLabel, FormInput, FormErrorContainer } from '../../QuestionForm.styles';

interface ComplexInputProps {
  label?: string;
  error?: string;
}

const ComplexInput: React.FC<ComplexInputProps> = ({ label, error }) => {
  return (
    <FormGroup>
      {label && <FormLabel>{label}</FormLabel>}
      <FormInput 
        type="text" 
        placeholder="Componente complexo otimizado" 
      />
      {error && <FormErrorContainer>{error}</FormErrorContainer>}
    </FormGroup>
  );
};

export default ComplexInput;