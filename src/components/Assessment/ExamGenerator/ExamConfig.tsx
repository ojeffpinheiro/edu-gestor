import React from 'react'
import { FormGroup, FormSection, TextArea } from '../../../styles/formControls';
import { Grid } from '../../../styles/layoutUtils';
import { Input, Label, Select } from '../../../styles/inputs';

interface ExamConfigProps {
  config: {
    title: string;
    description: string;
    numQuestions: number;
    categories: string[];
    difficulty: string;
  };
  availableCategories: string[];
  onChange: (config: any) => void;
}

const ExamConfig: React.FC<ExamConfigProps> = ({
  config,
  availableCategories,
  onChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...config, [name]: value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    onChange({ ...config, categories: selectedOptions });
  };

  return (
    <FormSection>
      <Grid columns={2} gap='sm'>
        <FormGroup>
          <Label htmlFor="title" >Título da Prova:</Label>
          <Input
            id='title'
            name='title'
            type='text'
            placeholder='Título da prova'
            value={config.title}
            onChange={handleChange}
            required />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="numQuestions" >Número de Questões:</Label>
          <Input
            type='number'
            id='numQuestions'
            name='numQuestions'
            value={config.numQuestions}
            onChange={handleChange}
            min={1}
            step={1}
            required />
        </FormGroup>
      </Grid>

      <Grid columns={2} gap='md'>
        <FormGroup>
          <Label htmlFor="description" >Descrição:</Label>
          <TextArea
            id="description"
            name="description"
            value={config.description}
            onChange={handleChange}
            rows={3} />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="categories">Categorias:</Label>
          <Select
            id="categories"
            name="categories"
            multiple
            value={config.categories}
            onChange={handleCategoryChange}>
            {availableCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <small>Segure Ctrl para selecionar múltiplas categorias</small>
        </FormGroup>
      </Grid>

      <FormGroup>
        <Label htmlFor="difficulty">Dificuldade: </Label>
        <Select
          id="difficulty"
          name="difficulty"
          value={config.difficulty}
          onChange={handleChange} >
          <option value="">Todas as dificuldades</option>
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </Select>
      </FormGroup>
    </FormSection>
  );
};

export default ExamConfig