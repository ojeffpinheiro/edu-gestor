import React from 'react';
import { FaSquare, FaObjectGroup, FaAlignCenter, FaTextHeight, FaEyeSlash, FaEye } from 'react-icons/fa';
import { ImageWrapType } from '../../../types/evaluation/Question';

interface ImageWrapControlsProps {
  wrapType: ImageWrapType;
  onChange: (type: ImageWrapType) => void;
}

export const ImageWrapControls: React.FC<ImageWrapControlsProps> = ({ wrapType, onChange }) => (
  <div className="wrap-controls">
    <button onClick={() => onChange('square')} className={wrapType === 'square' ? 'active' : ''}>
      <FaSquare /> Quadrado
    </button>
    <button onClick={() => onChange('tight')} className={wrapType === 'tight' ? 'active' : ''}>
      <FaObjectGroup /> Justa
    </button>
    <button onClick={() => onChange('through')} className={wrapType === 'through' ? 'active' : ''}>
      <FaAlignCenter /> Através
    </button>
    <button onClick={() => onChange('top-bottom')} className={wrapType === 'top-bottom' ? 'active' : ''}>
      <FaTextHeight /> Sup/Inf
    </button>
    <button onClick={() => onChange('behind-text')} className={wrapType === 'behind-text' ? 'active' : ''}>
      <FaEyeSlash /> Atrás
    </button>
    <button onClick={() => onChange('in-front-of-text')} className={wrapType === 'in-front-of-text' ? 'active' : ''}>
      <FaEye /> Frente
    </button>
  </div>
);