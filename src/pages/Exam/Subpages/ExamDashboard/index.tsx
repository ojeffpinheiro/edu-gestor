import React from 'react';
import { FiBook, FiFileText, FiBarChart2, FiDatabase, FiCalendar, FiUsers } from 'react-icons/fi';

import {
    DashboardContainer,
    SectionTitle,
    CardContainer,
    Card,
    
} from './styles';

const ExamDashboard = () => {
  return (
    <DashboardContainer>
      <SectionTitle>
        <FiBarChart2 size={24} />
        <h1>Dashboard Pedagógico</h1>
      </SectionTitle>
      
      <CardContainer>
        <Card>
          <div className="card-icon">
            <FiDatabase size={32} />
          </div>
          <h3>Banco de Questões</h3>
          <p>Total: 1.245 questões</p>
          <button>Acessar</button>
        </Card>

        <Card>
          <div className="card-icon">
            <FiFileText size={32} />
          </div>
          <h3>Geração de Provas</h3>
          <p>Última prova: 15/05/2023</p>
          <button>Criar Nova</button>
        </Card>

        <Card>
          <div className="card-icon">
            <FiBook size={32} />
          </div>
          <h3>Avaliações</h3>
          <p>Ativas: 12</p>
          <button>Ver Todas</button>
        </Card>

        <Card>
          <div className="card-icon">
            <FiCalendar size={32} />
          </div>
          <h3>Calendário</h3>
          <p>Próxima avaliação: 22/05</p>
          <button>Visualizar</button>
        </Card>

        <Card>
          <div className="card-icon">
            <FiUsers size={32} />
          </div>
          <h3>Desempenho</h3>
          <p>Média geral: 7.8</p>
          <button>Analisar</button>
        </Card>
      </CardContainer>
    </DashboardContainer>
  );
};

export default ExamDashboard;