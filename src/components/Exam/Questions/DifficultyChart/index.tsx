import React from 'react'
import { Question } from "../../../../types/evaluation/Question";

const DifficultyChart = ({ questions }: { questions: Question[] }) => {
  const data = [
    { level: 'Fácil', value: questions.filter(q => q.difficultyLevel === 'easy').length },
    { level: 'Médio', value: questions.filter(q => q.difficultyLevel === 'medium').length },
    { level: 'Difícil', value: questions.filter(q => q.difficultyLevel === 'hard').length },
  ];

  return (
    <div className="chart">
      {data.map(item => (
        <div key={item.level} className="chart-item">
          <span>{item.level}</span>
          <div className="bar" style={{ width: `${(item.value / questions.length) * 100}%` }} />
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default DifficultyChart;