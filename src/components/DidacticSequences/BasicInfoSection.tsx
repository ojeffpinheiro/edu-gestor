import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FaExclamationTriangle } from "react-icons/fa";

import { Input, Label, Select, TextArea } from '../../styles/inputs';
import { SequenceFormStyle} from './style';
import { SequenceFormData } from '../../utils/types/DidacticSequence';

const {
  ErrorMessage,
  FormColumn,
  FormGroup,
  FormRow,
  FormSection,
  SectionTitle,
  ErrorSection
} = SequenceFormStyle;

const BasicInfoSection: React.FC = () => {
  const { 
    register, 
    formState: { errors } 
  } = useFormContext<SequenceFormData>();

  try {
    return (
      <FormSection>
        <SectionTitle>Informações Básicas</SectionTitle>

        <FormGroup>
          <Label htmlFor="title">Título da Sequência</Label>
          <Input
            id="title"
            placeholder="Ex: Introdução à Geometria Espacial"
            {...register("title")}
          />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </FormGroup>

        <FormRow>
          <FormColumn>
            <FormGroup>
              <Label htmlFor="thematicAxis">Eixo Temático</Label>
              <Input
                id="thematicAxis"
                placeholder="Ex: Geometria"
                {...register("thematicAxis")}
              />
              {errors.thematicAxis && <ErrorMessage>{errors.thematicAxis.message}</ErrorMessage>}
            </FormGroup>
          </FormColumn>

          <FormColumn>
            <FormGroup>
              <Label htmlFor="educationLevel">Nível de Ensino</Label>
              <Select id="educationLevel" {...register("educationLevel")}>
                <option value="">Selecione um nível</option>
                <option value="Infantil">Educação Infantil</option>
                <option value="Fundamental I">Ensino Fundamental I</option>
                <option value="Fundamental II">Ensino Fundamental II</option>
                <option value="Médio">Ensino Médio</option>
                <option value="Superior">Ensino Superior</option>
              </Select>
              {errors.educationLevel && <ErrorMessage>{errors.educationLevel.message}</ErrorMessage>}
            </FormGroup>
          </FormColumn>
        </FormRow>

        <FormRow>
          <FormColumn>
            <FormGroup>
              <Label htmlFor="discipline">Disciplina</Label>
              <Select id="discipline" {...register("discipline")}>
                <option value="">Selecione uma disciplina</option>
                <option value="Português">Português</option>
                <option value="Matemática">Matemática</option>
                <option value="História">História</option>
                <option value="Geografia">Geografia</option>
                <option value="Ciências">Ciências</option>
                <option value="Artes">Artes</option>
                <option value="Educação Física">Educação Física</option>
              </Select>
              {errors.discipline && <ErrorMessage>{errors.discipline.message}</ErrorMessage>}
            </FormGroup>
          </FormColumn>

          <FormColumn>
            <FormGroup>
              <Label htmlFor="lessonsCount">Número de Aulas</Label>
              <Input
                id="lessonsCount"
                type="number"
                min="1"
                {...register("lessonsCount", { valueAsNumber: true })}
              />
              {errors.lessonsCount && <ErrorMessage>{errors.lessonsCount.message}</ErrorMessage>}
            </FormGroup>
          </FormColumn>
        </FormRow>

        <FormGroup>
          <Label htmlFor="overview">Visão Geral</Label>
          <TextArea
            id="overview"
            placeholder="Descreva brevemente o que será abordado nesta sequência didática..."
            {...register("overview")}
            rows={4}
          />
          {errors.overview && <ErrorMessage>{errors.overview.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="author">Autor</Label>
          <Input
            id="author"
            placeholder="Seu nome"
            {...register("author")}
          />
          {errors.author && <ErrorMessage>{errors.author.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="status">Status</Label>
          <Select id="status" {...register("status")}>
            <option value="draft">Rascunho</option>
            <option value="active">Ativo</option>
            <option value="completed">Concluído</option>
          </Select>
        </FormGroup>
      </FormSection>
    );
  } catch (error) {
    console.error("Erro ao renderizar seção:", error);
    return (
      <ErrorSection role="alert">
        <h4><FaExclamationTriangle /> Erro</h4>
        <p>Ocorreu um erro ao carregar esta seção. Por favor, tente novamente ou contate o suporte.</p>
      </ErrorSection>
    );
  }
};

export default BasicInfoSection;