import React, { useState } from 'react';
import { SchoolInfo } from '../../../utils/types/Planning';
import { FormGroup } from '../../../styles/formControls';
import { ErrorMessage } from '../../../styles/feedback';
import { usePlanning } from '../../../contexts/PlannerContext';
import { Section } from '../../../styles/layoutUtils';

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
        <input
          type="text"
          name="stage"
          value={data.stage}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormGroup>

      <FormGroup>
        <label>Série:</label>
        <input
          type="text"
          name="grade"
          value={data.grade}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormGroup>

      <FormGroup>
        <label>Área do Conhecimento:</label>
        <input
          type="text"
          name="knowledgeArea"
          value={data.knowledgeArea}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormGroup>

      <FormGroup>
        <label>Quantidade de Alunos:</label>
        <input
          type="number"
          name="studentCount"
          value={data.studentCount}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormGroup>

      <FormGroup>
        <label>Turmas:</label>
        <input
          type="text"
          name="classes"
          value={data.classes.join(', ')}
          onChange={(e) => {
            const classes = e.target.value.split(',').map(c => c.trim());
            onChange({
              ...data,
              classes: classes.filter(c => c !== '')
            });
          }}
          onBlur={(e) => validateField('classes', e.target.value)}
        />
      </FormGroup>

      <FormGroup>
        <label>Período:</label>
        <input
          type="text"
          name="period"
          value={data.period}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormGroup>

      <FormGroup>
        <label>Trimestre:</label>
        <input
          type="text"
          name="trimester"
          value={data.trimester}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormGroup>

    </Section>
  );
};

export default SchoolInfoSection;