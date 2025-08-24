import React from 'react';
import { SupportMaterial } from '../../../types/academic/Planning';
import { Section } from '../../../styles/layoutUtils';
import { SectionTitle } from '../../../styles/baseComponents';
import { FormGroup } from '../../../styles/formControls';
import { TextArea } from '../../../styles/inputs';

interface SupportMaterialsProps {
  materials: SupportMaterial;
}

const SupportMaterialsSection: React.FC<SupportMaterialsProps> = ({ materials }) => {
  return (
    <Section>
      <SectionTitle>Materiais de Apoio</SectionTitle>

      <FormGroup>
        <label>Slides:</label>
        <TextArea value={materials.slides.join('\n')} rows={3} readOnly />
      </FormGroup>

      <FormGroup>
        <label>Caderno de Aprendizagem:</label>
        <TextArea value={materials.learningNotebook.join('\n')} rows={3} readOnly />
      </FormGroup>

      <FormGroup>
        <label>Listas de Exercícios:</label>
        <TextArea value={materials.exerciseLists.join('\n')} rows={3} readOnly />
      </FormGroup>

      <div style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', color: '#334155', marginBottom: '1rem' }}>Leituras e Mídias</h3>
        <FormGroup>
          <label>Filmes:</label>
          <TextArea value={materials.readingsAndMedia.films.join('\n')} rows={2} readOnly />
        </FormGroup>
        <FormGroup>
          <label>Livros:</label>
          <TextArea value={materials.readingsAndMedia.books.join('\n')} rows={2} readOnly />
        </FormGroup>
        <FormGroup>
          <label>Simuladores:</label>
          <TextArea value={materials.readingsAndMedia.simulators.join('\n')} rows={2} readOnly />
        </FormGroup>
        <FormGroup>
          <label>Mapas Mentais:</label>
          <TextArea value={materials.readingsAndMedia.mindMaps.join('\n')} rows={2} readOnly />
        </FormGroup>
        <FormGroup>
          <label>Infográficos:</label>
          <TextArea value={materials.readingsAndMedia.infographics.join('\n')} rows={2} readOnly />
        </FormGroup>
      </div>
    </Section>
  );
};

export default SupportMaterialsSection;