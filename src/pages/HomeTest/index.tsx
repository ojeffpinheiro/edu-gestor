// src/pages/Home/index.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSchool, 
  FaBook, 
  FaList, 
  FaCalendarAlt,
  FaQuestion, 
  FaFileAlt, 
  FaClipboardCheck, 
  FaChartBar,
  FaEdit, 
  FaCalculator, 
  FaFileInvoice,
  FaUsers, 
  FaUserFriends, 
  FaFlask,
  FaChalkboardTeacher,
  FaCalendarDay,
  FaClipboardList,
  FaGraduationCap,
  FaMagic
} from 'react-icons/fa';

interface CardProps {
  title: string;
  to: string;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, to, icon }) => {
  return (
    <Link 
      to={to}
      className="card-link"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        margin: '8px 0',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        textDecoration: 'none',
        color: '#333',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        border: '1px solid #eaeaea'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#e9ecef';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#f8f9fa';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
      }}
    >
      <div style={{ marginRight: '15px', fontSize: '24px', color: '#4a6da7' }}>
        {icon}
      </div>
      <span style={{ fontWeight: '500' }}>{title}</span>
    </Link>
  );
};

const HomeTest: React.FC = () => {
  const containerStyle = {
    maxWidth: '1000px',
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

  const sectionHeaderStyle = {
    padding: '10px 0',
    marginBottom: '15px',
    borderBottom: '2px solid #f0f0f0',
    color: 'var(--color-input-focus)'
  };

  const cardsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '15px'
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={{ color: 'var(--color-input-focus)' }}>Sistema de Gestão Educacional</h1>
      </header>

      <section style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>Gestão Pedagógica</h2>
        <div style={cardsContainerStyle}>
          <Card to="/units" title="Gerenciamento de Unidades" icon={<FaSchool />} />
          <Card to="/didactic-sequences" title="Sequências Didáticas" icon={<FaBook />} />
          <Card to="/topic-content" title="Gerenciamento de Conteúdo" icon={<FaList />} />
          <Card to="/planning" title="Painel de Planejamento" icon={<FaCalendarAlt />} />
          <Card to="/planning-new" title="Novo Painel de Planejamento" icon={<FaCalendarDay />} />
          <Card to="/plannig-page" title="Página de Planejamento" icon={<FaClipboardList />} />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>Avaliações</h2>
        <div style={cardsContainerStyle}>
          <Card to="/questions" title="Banco de Questões" icon={<FaQuestion />} />
          <Card to="/exams" title="Gerenciador de Exames" icon={<FaFileAlt />} />
          <Card to="/exam" title="Exames" icon={<FaFileAlt />} />
          <Card to="/evaluations" title="Gestão de Avaliações" icon={<FaClipboardCheck />} />
          <Card to="/results" title="Visualizador de Resultados" icon={<FaChartBar />} />
          <Card to="/result-dashboard" title="Dashboard de Resultados" icon={<FaChartBar />} />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>Ferramentas</h2>
        <div style={cardsContainerStyle}>
          <Card to="/digital-notebook" title="Caderno Digital" icon={<FaEdit />} />
          <Card to="/equation-system" title="Sistema de Equações" icon={<FaCalculator />} />
          <Card to="/daily-report" title="Relatório Diário" icon={<FaFileInvoice />} />
          <Card to="/corrector-page" title="Corretor de Atividades" icon={<FaGraduationCap />} />
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={sectionHeaderStyle}>Administração</h2>
        <div style={cardsContainerStyle}>
          <Card to="/team-management" title="Gerenciamento de Equipes" icon={<FaUsers />} />
          <Card to="/team" title="Página de Equipe" icon={<FaUserFriends />} />
          <Card to="/classroom-mapping" title="Mapeamento de Sala" icon={<FaChalkboardTeacher />} />
          <Card to="/test" title="Página de Testes" icon={<FaFlask />} />
          <Card to="/calendar" title="Visualização de Calendário" icon={<FaCalendarAlt />} />
          <Card to="/schedule" title="Visualização de Agenda" icon={<FaCalendarDay />} />
        </div>
      </section>
    </div>
  );
};

export default HomeTest;