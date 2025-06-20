import React, { useState } from 'react';
import { SchoolInfo } from '../../../utils/types/Planning';
import { Section } from '../../../styles/containers'
import { FormGroup } from '../../../styles/formControls';
import { ErrorMessage } from '../../../styles/feedback';
import { Button } from '../../../styles/buttons';
import { usePlanning } from '../../../contexts/PlannerContext';

interface SchoolInfoProps {
  data: SchoolInfo;
  onChange: (data: SchoolInfo) => void;
}

const SchoolInfoSection: React.FC<SchoolInfoProps> = ({ data, onChange }) => {
  const { state, dispatch } = usePlanning();

  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedInfo = {
      ...state.schoolInfo,
      [name]: name === 'studentCount' ? parseInt(value) || 0 : value
    };
    
    dispatch({ 
      type: 'UPDATE_SCHOOL_INFO', 
      payload: updatedInfo 
    });
    
    validateField(name, value);
  };

  const validateField = (name: string, value: string | number) => {
    let error = '';
    
    if (typeof value === 'string' && value.trim() === '') {
      error = 'Este campo é obrigatório';
    } else if (name === 'studentCount' && (isNaN(Number(value)) || Number(value) <= 0)) {
      error = 'Deve ser um número positivo';
    } else if (name === 'classes' && typeof value === 'string' && value.split(',').length === 0) {
      error = 'Informe pelo menos uma turma';
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const isValid = Object.values(errors).every(error => !error) && 
    data.school.trim() !== '' && 
    data.discipline.trim() !== '' && 
    data.grade.trim() !== '' && 
    data.studentCount > 0;

  return (
    <Section>
      <h2>Informações da Escola</h2>
      <FormGroup>
        <label>Escola:</label>
        <input 
          type="text" 
          name="school"
          value={data.school} 
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.school && <ErrorMessage>{errors.school}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <label>Disciplina:</label>
        <input 
          type="text" 
          name="discipline"
          value={data.discipline} 
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.discipline && <ErrorMessage>{errors.discipline}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <label>Etapa:</label>
        <input type="text" value={data.stage} />
      </FormGroup>

      <FormGroup>
        <label>Série:</label>
        <input type="text" value={data.grade} />
      </FormGroup>

      <FormGroup>
        <label>Área do Conhecimento:</label>
        <input type="text" value={data.knowledgeArea} />
      </FormGroup>

      <FormGroup>
        <label>Quantidade de Alunos:</label>
        <input type="number" value={data.studentCount} />
      </FormGroup>

      <FormGroup>
        <label>Turmas:</label>
        <input type="text" value={data.classes.join(', ')} />
      </FormGroup>

      <FormGroup>
        <label>Período:</label>
        <input type="text" value={data.period} />
      </FormGroup>

      <FormGroup>
        <label>Trimestre:</label>
        <input type="text" value={data.trimester} />
      </FormGroup>
      
      <Button
        onClick={() => console.log('Dados salvos:', data)}
        disabled={!isValid}
      >
        Salvar Informações
      </Button>
    </Section>
  );
};

export default SchoolInfoSection;