import React, { useState } from 'react';
import { useAssessment } from '../../../contexts/AssessmentContext';

import { Question } from '../../../utils/types/Assessment';

import QRCodeService from '../../../utils/qrCodeGenerator';
import BarCodeGenerator from '../../../utils/barCodeGenerator';

interface ExamConfigProps {
  config: {
    title: string;
    description: string;
    numQuestions: number;
    categories: string[];
    difficulty: string;
  };
  availableCategories: string[];
  onChange: (config: any) => void;
}

interface QuestionSelectorProps {
  availableQuestions: Question[];
  selectedQuestions: Question[];
  onSelectQuestion: (question: Question) => void;
  onRemoveQuestion: (questionId: string) => void;
}

const ExamConfig: React.FC<ExamConfigProps> = ({
  config,
  availableCategories,
  onChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...config, [name]: value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    onChange({ ...config, categories: selectedOptions });
  };

  return (
    <div className="exam-config">
      <h3>Configurações da Prova</h3>

      <div className="form-group">
        <label htmlFor="title">Título da Prova:</label>
        <input
          id="title"
          name="title"
          value={config.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          name="description"
          value={config.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="numQuestions">Número de Questões:</label>
        <input
          id="numQuestions"
          name="numQuestions"
          type="number"
          min="1"
          value={config.numQuestions}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="categories">Categorias:</label>
        <select
          id="categories"
          name="categories"
          multiple
          value={config.categories}
          onChange={handleCategoryChange}
        >
          {availableCategories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <small>Segure Ctrl para selecionar múltiplas categorias</small>
      </div>

      <div className="form-group">
        <label htmlFor="difficulty">Dificuldade:</label>
        <select
          id="difficulty"
          name="difficulty"
          value={config.difficulty}
          onChange={handleChange}
        >
          <option value="">Todas as dificuldades</option>
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>
      </div>
    </div>
  );
};

const QuestionSelector: React.FC<QuestionSelectorProps> = ({
  availableQuestions,
  selectedQuestions,
  onSelectQuestion,
  onRemoveQuestion
}) => {
  // Filter out questions that are already selected
  const filteredQuestions = availableQuestions.filter(
    question => !selectedQuestions.some(sq => sq.id === question.id)
  );

  return (
    <div className="question-selector">
      <div className="available-questions">
        <h3>Questões Disponíveis ({filteredQuestions.length})</h3>
        <ul>
          {filteredQuestions.map(question => (
            <li key={question.id} className="question-item">
              <p>{question.content.substring(0, 100)}...</p>
              <div className="question-meta">
                <span>Dificuldade: {question.difficulty}</span>
                <span>Categorias: {question.categories.join(', ')}</span>
              </div>
              <button onClick={() => onSelectQuestion(question)}>Adicionar</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="selected-questions">
        <h3>Questões Selecionadas ({selectedQuestions.length})</h3>
        <ul>
          {selectedQuestions.map(question => (
            <li key={question.id} className="question-item">
              <p>{question.content.substring(0, 100)}...</p>
              <div className="question-meta">
                <span>Dificuldade: {question.difficulty}</span>
                <span>Categorias: {question.categories.join(', ')}</span>
              </div>
              <button onClick={() => onRemoveQuestion(question.id)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ExamGenerator: React.FC = () => {
  const { questions, createExam } = useAssessment();
  const { createQRCodeComponent } = QRCodeService;
  const { generateExamBarCode } = BarCodeGenerator

  const [examConfig, setExamConfig] = useState({
    title: '',
    description: '',
    questions: [],
    totalPoints: 10,
    qrCode: '',
    barCode: '',
    password: '',
    createAt: new Date(),
    createBy: '',
    questionDistribution: {
      categories: [] as string[],
      difficulty: '',
      count: 0,
    },
    userQRCode: false,
    useBarCode: true,
    classIds: [] as string[],
  });

  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [randomSelection, setRandomSelection] = useState(false);
  const [generatedExamId, setGeneratedExamId] = useState<string | null>(null);

  // Get all available categories from questions
  const availableCategories = Array.from(
    new Set(questions.flatMap(q => q.categories))
  );

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
    const selected = shuffled.slice(0, examConfig.questions.length);

    setSelectedQuestions(selected);
    setRandomSelection(true);
  };

  const handleGenerateExam = async () => {
    try {
      // Generate QR code and barcode
      const qrCode = await createQRCodeComponent(`exam_${Date.now()}`);
      const barCode = await generateExamBarCode(`exam_${Date.now()}`);

      // Generate random password for exam
      const password = Math.random().toString(36).substring(2, 8).toUpperCase();

      // Calculate total points (1 point per question for simplicity)
      const totalPoints = selectedQuestions.length;

      // Create exam
      const newExam = await createExam({
        title: examConfig.title,
        description: examConfig.description,
        questions: selectedQuestions.map(q => q.id),
        classIds: examConfig.classIds,
        totalPoints,
        qrCode,
        barCode,
        password,
        createdBy: 'current_user_id',
        questionDistribution: [],
        useBarCode: false,
        useQRCode: false,
        requirePassword: false
      });

      // Set the generated exam ID for confirmation message
      setGeneratedExamId(newExam.id);

    } catch (error) {
      console.error('Error generating exam:', error);
      // Show error message to user
    }
  };

  return (
    <div className="exam-generator-container">
      <h1>Gerador de Provas</h1>

      {generatedExamId ? (
        <div className="exam-generated-success">
          <h2>Prova gerada com sucesso!</h2>
          <p>ID da Prova: {generatedExamId}</p>
          <button onClick={() => setGeneratedExamId(null)}>Criar Nova Prova</button>
        </div>
      ) : (
        <>
          <ExamConfig
            config={{ 
              title: examConfig.title, 
              description: examConfig.description, 
              numQuestions: examConfig.questions.length, 
              categories: examConfig.questionDistribution.categories,
              difficulty: examConfig.questionDistribution.difficulty
             }}
            availableCategories={availableCategories}
            onChange={handleConfigChange}
          />

          <div className="question-selection-actions">
            <button onClick={handleRandomSelection}>
              Selecionar {examConfig.questions.length } Questões Aleatoriamente
            </button>
            <span>ou selecione manualmente abaixo:</span>
          </div>

          <QuestionSelector
            availableQuestions={filteredQuestions}
            selectedQuestions={selectedQuestions}
            onSelectQuestion={handleSelectQuestion}
            onRemoveQuestion={handleRemoveQuestion}
          />

          <div className="generate-exam-action">
            <button
              onClick={handleGenerateExam}
              disabled={selectedQuestions.length === 0 || !examConfig.title}
            >
              Gerar Prova com {selectedQuestions.length} Questões
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ExamGenerator;