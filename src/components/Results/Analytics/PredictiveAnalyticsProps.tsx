import React, { useState } from 'react';
import { PerformancePrediction, StudentResult, StudentRiskAssessment, StudyRecommendation, TeacherAlert } from '../../../types/academic/Assessment';
import RiskAnalysisChart from '../../../components/Results/Charts/RiskAnalysisChart';
import PredictionAccuracyChart from '../../../components/Results/Charts/PredictionAccuracyChart';

interface PredictiveAnalyticsProps {
  riskAssessments: StudentRiskAssessment[];
  predictions: PerformancePrediction[];
  recommendations: StudyRecommendation[];
  alerts: TeacherAlert[];
  studentResults: StudentResult[];
  onSelectStudent: (studentId: string) => void;
}

const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({
  riskAssessments,
  predictions,
  recommendations,
  alerts,
  studentResults,
  onSelectStudent
}) => {
  const [activeTab, setActiveTab] = useState<'risk' | 'predictions' | 'recommendations' | 'alerts'>('risk');

  // Agrupar recomendações por aluno
  const recommendationsByStudent = recommendations.reduce((acc, rec) => {
    if (!acc[rec.studentId]) {
      acc[rec.studentId] = [];
    }
    acc[rec.studentId].push(rec);
    return acc;
  }, {} as Record<string, StudyRecommendation[]>);

  return (
    <div className="predictive-analytics">
      <div className="tabs">
        <button 
          className={activeTab === 'risk' ? 'active' : ''}
          onClick={() => setActiveTab('risk')}
        >
          Risco de Evasão
        </button>
        <button 
          className={activeTab === 'predictions' ? 'active' : ''}
          onClick={() => setActiveTab('predictions')}
        >
          Previsões
        </button>
        <button 
          className={activeTab === 'recommendations' ? 'active' : ''}
          onClick={() => setActiveTab('recommendations')}
        >
          Recomendações
        </button>
        <button 
          className={activeTab === 'alerts' ? 'active' : ''}
          onClick={() => setActiveTab('alerts')}
        >
          Alertas
        </button>
      </div>

      {activeTab === 'risk' && (
        <div className="risk-analysis">
          <h2>Identificação de Alunos em Risco</h2>
          <div className="chart-container">
            <RiskAnalysisChart
              riskAssessments={riskAssessments} 
              studentResults={studentResults}
              onSelectStudent={onSelectStudent}
            />
          </div>
          <div className="risk-list">
            <h3>Alunos com Alto Risco</h3>
            {riskAssessments
              .filter(a => a.riskLevel === 'high')
              .map(assessment => (
                <div key={assessment.studentId} className="risk-item">
                  <span className="student" onClick={() => onSelectStudent(assessment.studentId)}>
                    {studentResults.find(s => s.studentId === assessment.studentId)?.studentName || assessment.studentId}
                  </span>
                  <span className={`risk-level ${assessment.riskLevel}`}>
                    {assessment.riskLevel}
                  </span>
                  <div className="factors">
                    <strong>Fatores:</strong>
                    <ul>
                      {assessment.mainFactors.map(factor => (
                        <li key={factor.id}>{factor.description}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {activeTab === 'predictions' && (
        <div className="performance-predictions">
          <h2>Predição de Performance</h2>
          <div className="chart-container">
            <PredictionAccuracyChart
              predictions={predictions} 
              studentResults={studentResults}
            />
          </div>
          <div className="predictions-list">
            {predictions.map(prediction => (
              <div key={`${prediction.studentId}-${prediction.examId}`} className="prediction-item">
                <div className="header">
                  <span className="student" onClick={() => onSelectStudent(prediction.studentId)}>
                    {studentResults.find(s => s.studentId === prediction.studentId)?.studentName || prediction.studentId}
                  </span>
                  <span className="confidence">
                    Confiança: {Math.round(prediction.confidence * 100)}%
                  </span>
                </div>
                <div className="prediction-bar">
                  <div 
                    className="prediction-fill" 
                    style={{ width: `${prediction.predictedScore}%` }}
                  >
                    {Math.round(prediction.predictedScore)}%
                  </div>
                </div>
                {prediction.keyImprovementAreas.length > 0 && (
                  <div className="improvement-areas">
                    <strong>Áreas para melhoria:</strong>
                    <ul>
                      {prediction.keyImprovementAreas.map((area, i) => (
                        <li key={i}>{area}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="study-recommendations">
          <h2>Recomendações Personalizadas</h2>
          <div className="recommendations-grid">
            {Object.entries(recommendationsByStudent).map(([studentId, recs]) => (
              <div key={studentId} className="student-recommendations">
                <h3 onClick={() => onSelectStudent(studentId)}>
                  {studentResults.find(s => s.studentId === studentId)?.studentName || studentId}
                </h3>
                <div className="recommendations-list">
                  {recs.map(rec => (
                    <div key={rec.id} className={`recommendation ${rec.priority}`}>
                      <div className="rec-header">
                        <span className="category">{rec.category}</span>
                        <span className={`priority ${rec.priority}`}>
                          {rec.priority}
                        </span>
                        {rec.completed && <span className="completed">✓</span>}
                      </div>
                      <div className="resources">
                        {rec.resources.map((resource, i) => (
                          <div key={i} className="resource">
                            <strong>{resource.title}</strong>
                            <p>{resource.description}</p>
                            {resource.url && (
                              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                Acessar recurso
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="teacher-alerts">
          <h2>Alertas para Professores</h2>
          <div className="alerts-list">
            {alerts.map(alert => (
              <div key={alert.id} className={`alert ${alert.severity}`}>
                <div className="alert-header">
                  <span className="type">{alert.type}</span>
                  <span className={`severity ${alert.severity}`}>
                    {alert.severity}
                  </span>
                  <span className="date">
                    {new Date(alert.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="alert-body">
                  <p>{alert.message}</p>
                  <div className="student-info" onClick={() => onSelectStudent(alert.studentId)}>
                    Aluno: {studentResults.find(s => s.studentId === alert.studentId)?.studentName || alert.studentId}
                  </div>
                  {alert.actionItems && alert.actionItems.length > 0 && (
                    <div className="action-items">
                      <strong>Ações recomendadas:</strong>
                      <ul>
                        {alert.actionItems.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="alert-footer">
                  <button className="acknowledge">
                    {alert.acknowledged ? '✔ Reconhecido' : 'Marcar como visto'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictiveAnalytics;