import React, { useState } from 'react';
import { Bar, Line, Radar } from 'react-chartjs-2';
import { ExamResult, StudentResult } from '../../utils/types/Assessment';

interface EnhancedStudentDetailModalProps {
  student: StudentResult;
  onClose: () => void;
}

const EnhancedStudentDetailModal: React.FC<EnhancedStudentDetailModalProps> = ({ 
  student, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'performance' | 'progress' | 'skills'>('performance');

  // Processa dados para gráficos
  const processExamData = () => {
    const sortedExams = student.examResults
      .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());

    return {
      labels: sortedExams.map((_, index) => `Avaliação ${index + 1}`),
      datasets: [
        {
          label: 'Notas do Aluno',
          data: sortedExams.map(exam => exam.totalScore),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };
  };

  const processProgressData = () => {
    const sortedExams = student.examResults
      .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());

    return {
      labels: sortedExams.map((_, index) => `Av. ${index + 1}`),
      datasets: [
        {
          label: 'Progresso do Aluno',
          data: sortedExams.map(exam => exam.totalScore),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.4
        }
      ]
    };
  };

  const processSkillsData = () => {
    if (!student.skillProfile) return null;

    const skills = Object.keys(student.skillProfile);
    const values = Object.values(student.skillProfile);

    return {
      labels: skills,
      datasets: [
        {
          label: 'Habilidades',
          data: values,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(255, 99, 132, 1)'
        }
      ]
    };
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#44ff44';
      default: return '#cccccc';
    }
  };

  const formatProgressTrend = (trend: string) => {
    const trends = {
      improving: { icon: '📈', text: 'Melhorando', color: '#4caf50' },
      declining: { icon: '📉', text: 'Declinando', color: '#f44336' },
      stable: { icon: '➡️', text: 'Estável', color: '#ff9800' }
    };
    return trends[trend as keyof typeof trends] || trends.stable;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{student.studentName}</h2>
            <p className="text-blue-100">{student.className}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 text-3xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Quick Stats */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {student.overallAverage.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Média Geral</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {student.attendanceRate?.toFixed(1) || 'N/A'}%
              </div>
              <div className="text-sm text-gray-600">Frequência</div>
            </div>
            <div className="text-center">
              <div 
                className="text-2xl font-bold"
                style={{ color: formatProgressTrend(student.progressTrend).color }}
              >
                {formatProgressTrend(student.progressTrend).icon}
              </div>
              <div className="text-sm text-gray-600">
                {formatProgressTrend(student.progressTrend).text}
              </div>
            </div>
            <div className="text-center">
              <div 
                className="text-2xl font-bold"
                style={{ color: getRiskColor(student.riskAssessment?.level || 'low') }}
              >
                {student.riskAssessment?.level.toUpperCase() || 'BAIXO'}
              </div>
              <div className="text-sm text-gray-600">Risco</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {[
            { key: 'performance', label: 'Desempenho' },
            { key: 'progress', label: 'Progresso' },
            { key: 'skills', label: 'Habilidades' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-3 font-medium ${
                activeTab === tab.key
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'performance' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Notas por Avaliação</h3>
              <div className="h-64 mb-6">
                <Bar data={processExamData()} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <h4 className="text-md font-semibold">Últimas Avaliações</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Avaliação</th>
                        <th className="text-center py-2">Nota</th>
                        <th className="text-center py-2">Data</th>
                        <th className="text-center py-2">Tempo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.examResults.slice(-5).map((exam: ExamResult) => (
                        <tr key={exam.id} className="border-b hover:bg-gray-50">
                          <td className="py-2">{exam.examId}</td>
                          <td className="text-center py-2 font-semibold">
                            <span className={`px-2 py-1 rounded text-white text-xs ${
                              exam.totalScore >= 70 ? 'bg-green-500' : 'bg-red-500'
                            }`}>
                              {exam.totalScore}
                            </span>
                          </td>
                          <td className="text-center py-2">
                            {new Date(exam.completedAt).toLocaleDateString()}
                          </td>
                          <td className="text-center py-2">
                            {exam.metadata?.timeSpent ? `${exam.metadata.timeSpent}min` : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Evolução Temporal</h3>
              <div className="h-64">
                <Line data={processProgressData()} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Perfil de Habilidades</h3>
              {student.skillProfile ? (
                <div className="h-64">
                  <Radar data={processSkillsData()!} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Dados de habilidades não disponíveis
                </div>
              )}
              
              {student.riskAssessment && (
                <div className="mt-6 p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Fatores de Risco Identificados:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {student.riskAssessment.factors.map((factor, index) => (
                      <li key={index}>{factor}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedStudentDetailModal;