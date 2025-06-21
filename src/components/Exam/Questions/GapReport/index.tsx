import React from 'react'
import { Question } from '../../../../utils/types/Question';

const generateGapReport = (questions: Question[]) => {
  const topicStats = questions.reduce((acc, q) => {
    acc[q.discipline] = (acc[q.discipline] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const MIN_QUESTIONS_PER_TOPIC = 5;
  const gaps = Object.entries(topicStats)
    .filter(([_, count]) => count < MIN_QUESTIONS_PER_TOPIC)
    .map(([topic]) => topic);

  return gaps;
};

// Componente de relatório
const GapReport = ({ questions }: { questions: Question[] }) => {
  const MIN_QUESTIONS_PER_TOPIC = 5;
  const topicStats = questions.reduce((acc, q) => {
    acc[q.discipline] = (acc[q.discipline] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const gaps = Object.entries(topicStats)
    .filter(([_, count]) => count < MIN_QUESTIONS_PER_TOPIC)
    .map(([topic]) => topic);

  return (
    <div className="gap-report">
      <h3>Relatório de Lacunas</h3>
      {gaps.length > 0 ? (
        <ul>
          {gaps.map(topic => (
            <li key={topic}>
              {topic} - Precisa de mais {MIN_QUESTIONS_PER_TOPIC - (topicStats[topic] || 0)} questões
            </li>
          ))}
        </ul>
      ) : (
        <p>Todos os tópicos têm questões suficientes</p>
      )}
    </div>
  );
};

export default GapReport;