// components/StudentDetailModal.tsx
import React from 'react';
import { StudentResult, ExamResult } from '../../utils/types/Assessment';

interface StudentDetailModalProps {
  student: StudentResult;
  onClose: () => void;
}

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Detalhes do Aluno: {student.studentName}</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>
        
        <div className="modal-tabs">
          <button className="tab-button active">Desempenho</button>
          <button className="tab-button">Progresso</button>
          <button className="tab-button">Habilidades</button>
        </div>
        
        <div className="modal-body">
          <div className="performance-section">
            <h3>Médias por Disciplina</h3>
            {/* Gráfico de barras será inserido aqui */}
            
            <div className="metrics-grid">
              <div className="metric-card">
                <span className="metric-label">Média Geral</span>
                <span className="metric-value">{student.overallAverage.toFixed(1)}</span>
              </div>
              {/* Outras métricas */}
            </div>
          </div>
          
          <div className="exams-section">
            <h3>Últimas Avaliações</h3>
            <table className="exams-table">
              <thead>
                <tr>
                  <th>Avaliação</th>
                  <th>Nota</th>
                  <th>Desempenho</th>
                  <th>Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {student.examResults.map((exam: ExamResult) => (
                  <tr key={exam.id}>
                    <td>{exam.examId}</td>
                    <td>{exam.totalScore}</td>
                    <td>
                      <div className="performance-bar" style={{ width: `${(exam.totalScore / 100) * 100}%` }} />
                    </td>
                    <td>
                      <button className="details-button">Ver</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;