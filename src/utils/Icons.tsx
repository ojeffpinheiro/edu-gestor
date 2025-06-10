import React from 'react'
import { FaLayerGroup, FaBook, FaCubes, FaBookOpen, FaAlignLeft } from 'react-icons/fa';
import { HierarchyLevel } from './types/Topic';

export const getItemIcon = (type: HierarchyLevel, size = 16) => {
  const iconProps = { size };
  
  switch (type) {
    case 'eixoTematico':
      return <FaLayerGroup {...iconProps} />;
    case 'unidade':
      return <FaBook {...iconProps} />;
    case 'capitulo':
      return <FaCubes {...iconProps} />;
    case 'titulo':
      return <FaBookOpen {...iconProps} />;
    case 'subtitulo':
      return <FaAlignLeft {...iconProps} />;
    default:
      return <FaBook {...iconProps} />;
  }
};