// src/pages/NotFound/index.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1>404 - Página não encontrada</h1>
      <p>A página que você está procurando não existe ou foi removida.</p>
      <Link to="/" style={{ 
        marginTop: '20px', 
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px'
      }}>
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound;