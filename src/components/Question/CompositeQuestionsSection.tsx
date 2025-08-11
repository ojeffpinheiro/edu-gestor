import React from 'react'
import QuestionCard from "./QuestionCard";
import { Question } from '../../utils/types/Question';

interface CompositeQuestionsProps {
  questions: Question[];
  onFindSimilar: (question: Question) => void;
}

const CompositeQuestionsSection: React.FC<CompositeQuestionsProps> = ({ questions, onFindSimilar }) => (
  <div>
    <h3>Questões Compostas</h3>
    {questions.map(q => (
      <QuestionCard
        key={q.id}
        question={q}
        onFindSimilar={onFindSimilar}
        showActionsOnClick />
    ))}
  </div>
);

export default CompositeQuestionsSection;