import { useState } from "react";
import { mockQuestions } from "../../mocks/question";
import { Question } from "../../types/evaluation/Question";

// hook customizado para gerenciar o estado das questões
const useQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  
  const addQuestion = (newQuestion: Question) => {
    setQuestions(prev => [...prev, newQuestion]);
  };
  
  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  };
  
  const deleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };
  
  return { questions, addQuestion, updateQuestion, deleteQuestion };
};

export default useQuestions;