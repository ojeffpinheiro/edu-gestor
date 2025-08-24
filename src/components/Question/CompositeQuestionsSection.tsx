import React from 'react'
import QuestionCard from "./QuestionCard";
import { Question } from '../../types/evaluation/Question';

interface CompositeQuestionsProps {
  questions: Question[];
  onFindSimilar: (question: Question) => void;
  showActionsOnClick?: boolean;
}

const CompositeQuestionsSection: React.FC<CompositeQuestionsProps> = ({ questions, onFindSimilar }) => (
  <div>
    <h3>Questões Compostas</h3>
    {questions.map(q => (
      <QuestionCard
        key={q.id}
        question={q}
        onFindSimilar={onFindSimilar}  />
    ))}
  </div>
);

export default CompositeQuestionsSection;