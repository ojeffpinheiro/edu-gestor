import React from 'react';
import { SupportMaterial } from '../../../utils/types/Planning';

interface SupportMaterialsProps {
  materials: SupportMaterial;
}

const SupportMaterialsSection: React.FC<SupportMaterialsProps> = ({ materials }) => {
  return (
    <div className="section">
      <h2>Materiais de Apoio</h2>
      
      <div className="form-group">
        <label>Slides:</label>
        <textarea value={materials.slides.join('\n')} />
      </div>
      
      <div className="form-group">
        <label>Caderno de Aprendizagem:</label>
        <textarea value={materials.learningNotebook.join('\n')} />
      </div>
      
      <div className="form-group">
        <label>Listas de Exercícios:</label>
        <textarea value={materials.exerciseLists.join('\n')} />
      </div>
      
      <div className="materials-subsection">
        <h3>Leituras e Mídias</h3>
        <div className="form-group">
          <label>Filmes:</label>
          <textarea value={materials.readingsAndMedia.films.join('\n')} />
        </div>
        <div className="form-group">
          <label>Livros:</label>
          <textarea value={materials.readingsAndMedia.books.join('\n')} />
        </div>
        <div className="form-group">
          <label>Simuladores:</label>
          <textarea value={materials.readingsAndMedia.simulators.join('\n')} />
        </div>
        <div className="form-group">
          <label>Mapas Mentais:</label>
          <textarea value={materials.readingsAndMedia.mindMaps.join('\n')} />
        </div>
        <div className="form-group">
          <label>Infográficos:</label>
          <textarea value={materials.readingsAndMedia.infographics.join('\n')} />
        </div>
      </div>
    </div>
  );
};

export default SupportMaterialsSection;