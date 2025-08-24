import React from 'react'
import { Question } from '../../../../types/evaluation/Question';

const QuestionStats = ({ question }: { question: Question }) => {
  if (!question.answerStats) return null;
  
  const accuracy = question.answerStats.totalAttempts > 0 
    ? (question.answerStats.correctAttempts / question.answerStats.totalAttempts) * 100 
    : 0;

  return (
    <div className='stats'>
      <div>Total de tentativas: {question.answerStats.totalAttempts}</div>
      <div>Taxa de acerto: {accuracy.toFixed(1)}%</div>
      <div className="accuracy-bar" style={{ width: `${accuracy}%` }} />
    </div>
  )
};

export default QuestionStats;