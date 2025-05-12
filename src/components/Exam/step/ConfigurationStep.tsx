import React from 'react';
import { ExamGenerationParams } from '../../../services/examsService';
import { Grid2Columns } from '../../../styles/modals';
import { Input, Label } from '../../../styles/inputs';
import { FormGroup } from '../../../styles/formControls';

interface ConfigurationStepProps {
  formData: ExamGenerationParams;
  errors: Record<string, string>;
  onFormUpdate: (updates: Partial<ExamGenerationParams>) => void;
}

const ConfigurationStep: React.FC<ConfigurationStepProps> = ({ 
  formData, 
  errors,
  onFormUpdate 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onFormUpdate({ 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormUpdate({ 
      [name]: Number(value) 
    });
  };

  return (
    <form>
      <Grid2Columns>
        <FormGroup>
          <Label htmlFor="title">Título Base</Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            aria-required="true"
            aria-invalid={!!errors.title}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Senha de Proteção (opcional)</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password || ''}
            onChange={handleChange}
            placeholder="Deixe em branco para não usar senha"
          />
        </FormGroup>
      </Grid2Columns>

      <Grid2Columns>
        <FormGroup>
          <Label htmlFor="numberOfExams">Número de Variantes</Label>
          <Input
            id="numberOfExams"
            name="numberOfExams"
            type="number"
            min="1"
            value={formData.numberOfExams}
            onChange={handleNumberChange}
            required
            aria-required="true"
            aria-invalid={!!errors.numberOfExams}
          />
          {errors.numberOfExams && <span className="error">{errors.numberOfExams}</span>}
        </FormGroup>

        {formData.numberOfExams > 1 && (
          <FormGroup>
            <Label htmlFor="titlePrefix">Prefixo para Variantes</Label>
            <Input
              id="titlePrefix"
              name="titlePrefix"
              type="text"
              value={formData.titlePrefix || ''}
              onChange={handleChange}
              placeholder="Ex: Turma A, Versão"
            />
          </FormGroup>
        )}
      </Grid2Columns>

      <FormGroup>
        <Label>Opções de Embaralhamento</Label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="shuffleQuestions"
              checked={formData.shuffleQuestions || false}
              onChange={handleChange}
            />
            <span>Embaralhar questões</span>
          </label>
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="shuffleOptions"
              checked={formData.shuffleOptions || false}
              onChange={handleChange}
            />
            <span>Embaralhar alternativas</span>
          </label>
        </div>
      </FormGroup>
    </form>
  );
};

export default ConfigurationStep;