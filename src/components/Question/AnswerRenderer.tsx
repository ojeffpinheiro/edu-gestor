import React from 'react'
import { Answer, AnswerType, QuestionType } from '../../types/evaluation/Question';

// Mapeamento de QuestionType para AnswerType
const getAnswerType = (questionType: QuestionType): AnswerType => {
  switch(questionType) {
    case 'multiple_choice': return 'single_select';
    case 'true_false': return 'boolean';
    case 'essay': return 'text';
    case 'fill_in_the_blank': return 'text';
    case 'short_answer': return 'text';
    case 'matching': return 'multi_select';
    case 'ordering': return 'multi_select';
    default: return 'text';
  }
};

interface AnswerRendererProps {
  answer: Answer;
  questionType: QuestionType; // Manter como QuestionType
}

export const AnswerRenderer: React.FC<AnswerRendererProps> = ({ answer, questionType }) => {
  const answerType = getAnswerType(questionType);
  
  switch(answerType) { // Usar answerType mapeado
    case 'single_select':
    case 'multi_select':
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input 
            type={answerType === 'single_select' ? 'radio' : 'checkbox'}
            checked={answer.isCorrect}
            readOnly
          />
          <span>{answer.content}</span>
        </div>
      );
    
    case 'boolean':
      return (
        <div>
          {answer.content ? 'Verdadeiro' : 'Falso'}
          {answer.isCorrect && <span> ✓</span>}
        </div>
      );
    
    case 'text':
    case 'code':
    case 'formula':
    default:
      return <div>{answer.content}</div>;
  }
};