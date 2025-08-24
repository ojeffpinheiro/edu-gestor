import { useState } from 'react'
import { Question } from '../../utils/types/Assessment';

const useExamGenerator = (
    questions: Question[],
) => {
    // Configuração do exame
    const [examConfig, setExamConfig] = useState({
        title: '',
        description: '',
        numQuestions: 10,
        questions: [],
        totalPoints: 10,
        qrCode: '',
        barCode: '',
        password: '',
        createdAt: new Date(),
        createdBy: 'current_user_id',
        questionDistribution: {
            categories: [] as string[],
            difficulty: '',
            count: 0,
        },
        useQRCode: false,
        useBarCode: true,
        classIds: [] as string[],
        requirePassword: false,
        startTime: undefined as Date | undefined,
        endTime: undefined as Date | undefined,
        timeLimit: undefined as number | undefined,
    });

    const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

    // Filter questions based on exam config
      const filteredQuestions = questions.filter(question => {
        // Filter by category
        if (examConfig.questionDistribution.categories.length > 0 &&
          !question.categories.some(cat => examConfig.questionDistribution.categories.includes(cat))) {
          return false;
        }
    
        // Filter by difficulty
        if (examConfig.questionDistribution.difficulty && question.difficulty !== examConfig.questionDistribution.difficulty) {
          return false;
        }
    
        return true;
      });

      const handleConfigChange = (newConfig: any) => {
        setExamConfig(prev => ({ ...prev, ...newConfig }));
      };

      const handleSelectQuestion = (question: Question) => {
        setSelectedQuestions(prev => [...prev, question]);
      };

      const handleRemoveQuestion = (questionId: string) => {
        setSelectedQuestions(prev => prev.filter(q => q.id !== questionId));
      };

      const handleRandomSelection = () => {
        // Clear current selection
        setSelectedQuestions([]);
    
        // Randomly select questions based on exam config
        const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, examConfig.numQuestions);
    
        setSelectedQuestions(selected);
      };

        // Get all available categories from questions
  const availableCategories = Array.from(
    new Set(questions.flatMap(q => q.categories))
  );

  const resetExamGenerator = () => {
    setSelectedQuestions([]);
    
    setExamConfig({
      title: '',
      description: '',
      numQuestions: 10,
      questions: [],
      totalPoints: 10,
      qrCode: '',
      barCode: '',
      password: '',
      createdAt: new Date(),
      createdBy: 'current_user_id',
      questionDistribution: {
        categories: [],
        difficulty: '',
        count: 0,
      },
      useQRCode: false,
      useBarCode: true,
      classIds: [],
      requirePassword: false,
      startTime: undefined,
      endTime: undefined,
      timeLimit: undefined,
    });
  };

    return {
        examConfig, 
        selectedQuestions, 
        filteredQuestions, 
        availableCategories,
        handleConfigChange,
        handleSelectQuestion,
        handleRemoveQuestion,
        handleRandomSelection,
        resetExamGenerator
    }
    
}

export default useExamGenerator;