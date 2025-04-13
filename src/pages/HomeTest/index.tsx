// src/pages/Home/index.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomeTest: React.FC = () => {

  const linkStyle = {
    display: 'block',
    padding: '12px 15px',
    margin: '5px 0',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '10px 0',
    borderBottom: '1px solid #eee'
  };

  const sectionStyle = {
    marginBottom: '30px'
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1>Sistema de Gestão Educacional</h1>
      </header>

      <section style={sectionStyle}>
        <h2>Gestão Pedagógica</h2>
        <div>
          <Link to="/units" style={linkStyle}>Gerenciamento de Unidades</Link>
          <Link to="/didactic-sequences" style={linkStyle}>Sequências Didáticas</Link>
          <Link to="/topic-content" style={linkStyle}>Gerenciamento de Conteúdo</Link>
          <Link to="/planning" style={linkStyle}>Painel de Planejamento</Link>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>Avaliações</h2>
        <div>
          <Link to="/questions" style={linkStyle}>Banco de Questões</Link>
          <Link to="/exams" style={linkStyle}>Gerenciador de Exames</Link>
          <Link to="/evaluations" style={linkStyle}>Gestão de Avaliações</Link>
          <Link to="/results" style={linkStyle}>Visualizador de Resultados</Link>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>Ferramentas</h2>
        <div>
          <Link to="/digital-notebook" style={linkStyle}>Caderno Digital</Link>
          <Link to="/equation-system" style={linkStyle}>Sistema de Equações</Link>
          <Link to="/daily-report" style={linkStyle}>Relatório Diário</Link>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2>Administração</h2>
        <div>
          <Link to="/team-management" style={linkStyle}>Gerenciamento de Equipes</Link>
          <Link to="/team" style={linkStyle}>Página de Equipe</Link>
          <Link to="/test" style={linkStyle}>Página de Testes</Link>
        </div>
      </section>
    </div>
  );
};

export default HomeTest;