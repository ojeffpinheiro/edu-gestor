import React, { useState } from 'react';
import { FaBell, FaCalendarAlt, FaClock, FaFileAlt, FaCheckSquare, FaUsers, FaBookOpen } from 'react-icons/fa';

import { FiFileText, FiLayers } from 'react-icons/fi';

interface PlanningCardProps {
  title: string;
  completo: number;
  parcial?: number;
  pendente: number;
}

interface Notificacao {
  id: number;
  tipo: string;
  mensagem: string;
  data: string;
}

interface Atividade {
  id: number;
  titulo: string;
  data: string;
  horario: string;
}

const PlanningDashboard = () => {
  const [activeTab, setActiveTab] = useState('series');

  const notificacoes = [
    { id: 1, tipo: 'prazo', mensagem: 'Entrega de notas do 1º bimestre até 15/04', data: '2025-04-15' },
    { id: 2, tipo: 'lembrete', mensagem: 'Reunião pedagógica amanhã às 14h', data: '2025-03-25' },
    { id: 3, tipo: 'evento', mensagem: 'Feira de ciências em 10 dias', data: '2025-04-03' }
  ];

  const proximasAtividades = [
    { id: 1, titulo: 'Avaliação de Matemática - 9º ano A', data: '2025-03-26', horario: '10:00' },
    { id: 2, titulo: 'Entrega de trabalho - 8º ano B', data: '2025-03-28', horario: '08:00' },
    { id: 3, titulo: 'Aula prática de Ciências - 7º ano C', data: '2025-03-31', horario: '13:30' }
  ];

  const resumoPorDisciplina = [
    { disciplina: 'Matemática', turmas: 5, aulas: 20, planejadas: 18, pendentes: 2 },
    { disciplina: 'Português', turmas: 4, aulas: 16, planejadas: 16, pendentes: 0 },
    { disciplina: 'Ciências', turmas: 3, aulas: 12, planejadas: 10, pendentes: 2 }
  ];

  const resumoPorTurma = [
    { turma: '9º ano A', disciplinas: 8, aulas: 32, planejadas: 30, pendentes: 2 },
    { turma: '8º ano B', disciplinas: 8, aulas: 32, planejadas: 29, pendentes: 3 },
    { turma: '7º ano C', disciplinas: 8, aulas: 32, planejadas: 28, pendentes: 4 }
  ];

  const planejamentoPorSerie = [
    { serie: '6º ano', completo: 85, parcial: 10, pendente: 5 },
    { serie: '7º ano', completo: 90, parcial: 5, pendente: 5 },
    { serie: '8º ano', completo: 80, parcial: 15, pendente: 5 },
    { serie: '9º ano', completo: 95, parcial: 5, pendente: 0 }
  ];

  const planejamentoPorAno = [
    { mes: 'Janeiro', completo: 100, pendente: 0 },
    { mes: 'Fevereiro', completo: 100, pendente: 0 },
    { mes: 'Março', completo: 85, pendente: 15 },
    { mes: 'Abril', completo: 50, pendente: 50 },
    { mes: 'Maio', completo: 10, pendente: 90 }
  ];

  const accessCards = [
    { id: 1, titulo: 'Sequências Didáticas', icon: <FiLayers size={24} />, color: 'bg-blue-500', link: '/sequencias' },
    { id: 2, titulo: 'Planejamento de Aulas', icon: <FiFileText size={24} />, color: 'bg-green-500', link: '/planejamento' },
    { id: 3, titulo: 'Horário Semanal', icon: <FaClock size={24} />, color: 'bg-purple-500', link: '/horario' },
    { id: 4, titulo: 'Atividades e Avaliações', icon: <FaCheckSquare size={24} />, color: 'bg-orange-500', link: '/atividades' },
    { id: 5, titulo: 'Gestão de Turmas', icon: <FaUsers size={24} />, color: 'bg-red-500', link: '/turmas' },
    { id: 6, titulo: 'Calendário Acadêmico', icon: <FaCalendarAlt size={24} />, color: 'bg-teal-500', link: '/calendario' }
  ];

  const renderPlanningOverview = () => {
    return activeTab === 'series' ? (
      <div className="grid grid-cols-4 gap-4">
        {planejamentoPorSerie.map((item, index) => (
          <PlanningCard key={index} title={item.serie} completo={item.completo} parcial={item.parcial} pendente={item.pendente} />
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-5 gap-4">
        {planejamentoPorAno.map((item, index) => (
          <PlanningCard key={index} title={item.mes} completo={item.completo} pendente={item.pendente} />
        ))}
      </div>
    );
  };

  const getNotificationClass = (tipo: string): string => {
    switch (tipo) {
      case 'prazo':
        return 'bg-red-100 text-red-800';
      case 'lembrete':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const renderNotifications = () => (
    <section>
      <div className="flex items-center mb-4">
        <FaBell size={20} className="text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Notificações</h2>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {notificacoes.map((notificacao) => (
            <NotificationItem key={notificacao.id} notificacao={notificacao} />
          ))}
        </ul>
      </div>
    </section>
  );

  const renderUpcomingActivities = () => (
    <section>
      <div className="flex items-center mb-4">
        <FaCalendarAlt size={20} className="text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Próximas Atividades</h2>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {proximasAtividades.map((atividade) => (
            <ActivityItem key={atividade.id} atividade={atividade} />
          ))}
        </ul>
      </div>
    </section>
  );

  const renderSummaryTable = (title: string, data: any[]) => (
    <section>
      <div className="flex items-center mb-4">
        <FaBookOpen size={20} className="text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {Object.values(item).map((value, idx) => (
                    <td key={idx} className={`px-4 py-2 whitespace-nowrap ${typeof value === 'number' ? (value > 0 ? 'text-gray-700' : 'text-red-600') : 'font-medium text-gray-800'}`}>
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );

  const PlanningCard: React.FC<PlanningCardProps> = ({ title, completo, parcial, pendente }) => (
    <div className="bg-gray-50 p-3 rounded-md">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500" style={{ width: `${completo}%` }}></div>
      </div>
      <div className="mt-2 flex justify-between text-sm">
        <span className="text-green-600">{completo}% concluído</span>
        {parcial !== undefined && <span className="text-yellow-600">{parcial}% parcial</span>}
        <span className="text-red-600">{pendente}% pendente</span>
      </div>
    </div>
  );

  const NotificationItem = ({ notificacao }: { notificacao: Notificacao }) => (
    <li className="p-4 hover:bg-gray-50">
      <div className="flex justify-between">
        <span className={`px-2 py-1 text-xs rounded-full ${getNotificationClass(notificacao.tipo)}`}>
          {notificacao.tipo}
        </span>
        <span className="text-sm text-gray-500">
          {new Date(notificacao.data).toLocaleDateString('pt-BR')}
        </span>
      </div>
      <p className="mt-2 text-gray-700">{notificacao.mensagem}</p>
    </li>
  );

  const ActivityItem: React.FC<{ atividade: Atividade }> = ({ atividade }) => (
    <li className="p-4 hover:bg-gray-50">
      <p className="font-medium text-gray-800">{atividade.titulo}</p>
      <div className="mt-1 flex items-center text-sm text-gray-500">
        <FaCalendarAlt size={16} className="mr-1" />
        <span>{new Date(atividade.data).toLocaleDateString('pt-BR')}</span>
        <FaClock size={16} className="ml-3 mr-1" />
        <span>{atividade.horario}</span>
      </div>
    </li>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard do Professor</h1>
        <p className="text-gray-600">Bem-vindo(a) de volta! Aqui está seu panorama acadêmico.</p>
      </header>

      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Visão Geral do Planejamento</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 rounded-md ${activeTab === 'series' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('series')}
            >
              Por Série
            </button>
            <button 
              className={`px-3 py-1 rounded-md ${activeTab === 'ano' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveTab('ano')}
            >
              Por Ano
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          {renderPlanningOverview()}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {renderNotifications()}
        {renderUpcomingActivities()}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {renderSummaryTable('Resumo por Disciplina', resumoPorDisciplina)}
        {renderSummaryTable('Resumo por Turma', resumoPorTurma)}
      </div>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Acesso Rápido</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accessCards.map(card => (
            <div 
              key={card.id} 
              className={`${card.color} rounded-lg shadow-lg p-6 text-white transition-transform hover:scale-105 cursor-pointer`}
            >
              <div className="flex items-center mb-3">
                {card.icon}
                <h3 className="ml-2 text-lg font-semibold">{card.titulo}</h3>
              </div>
              <div className="h-1 bg-white bg-opacity-30 rounded-full mb-3"></div>
              <p className="text-sm opacity-90">Acesse e gerencie {card.titulo.toLowerCase()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PlanningDashboard;
