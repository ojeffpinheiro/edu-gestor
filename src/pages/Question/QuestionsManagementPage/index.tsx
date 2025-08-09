import React, { useState } from 'react';

import { Category, CategoryWithId, FormField } from '../../../components/Question/QuestionForm/type';
import { SortOption } from '../../../components/Sort/types';

import Navbar from '../../../../src/components/shared/Navbar'
import { SettingsModal } from '../../../components/Question/SettingsSection/SettingsModal';

import NewQuestionView from '../../../components/Question/views/NewQuestionView';
import QuestionsView from '../../../components/Question/views/QuestionsView';
import FoldersView from '../../../components/Question/views/FoldersView';
import PageHeader from '../../../components/Question/PageHeader';
import Tabs from '../../../components/Question/Tabs';

const QuestionBankPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('questions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');  // 'all' em vez de ''
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');  // 'all' em vez de ''
  const [searchValue, setSearchValue] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const sortOptions: SortOption[] = [
    { value: 'title', label: 'Título', direction: 'asc', },
    { value: 'createdAt', label: 'Data de criação', direction: 'desc' },
    { value: 'lastUsed', label: 'Último uso', direction: 'desc' },
    { value: 'difficulty', label: 'Dificuldade', direction: 'asc' }
  ];

  const handleSortChange = (value: string, direction: 'asc' | 'desc') => {
    setSortField(value);
    setSortDirection(direction);
  };

  // Dados de exemplo
  const categories: Category[] = [
    { i: 'math', name: 'Matemática', count: 342, color: 'bg-blue-100 text-blue-800' },
    { i: 'portuguese', name: 'Português', count: 256, color: 'bg-green-100 text-green-800' },
    { i: 'science', name: 'Ciências', count: 189, color: 'bg-purple-100 text-purple-800' },
    { i: 'history', name: 'História', count: 167, color: 'bg-orange-100 text-orange-800' },
    { i: 'geography', name: 'Geografia', count: 134, color: 'bg-red-100 text-red-800' }
  ];

  const categoriesWithID: CategoryWithId[] = [
    { i: '', id: 'math', name: 'Matemática', count: 342, color: 'bg-blue-100 text-blue-800' },
    { i: '', id: 'portuguese', name: 'Português', count: 256, color: 'bg-green-100 text-green-800' },
    { i: '', id: 'science', name: 'Ciências', count: 189, color: 'bg-purple-100 text-purple-800' },
    { i: '', id: 'history', name: 'História', count: 167, color: 'bg-orange-100 text-orange-800' },
    { i: '', id: 'geography', name: 'Geografia', count: 134, color: 'bg-red-100 text-red-800' }
  ];

  const questions = [
    {
      id: 1,
      title: 'Resolução de equações do 2º grau',
      content: 'Resolva a equação x² - 5x + 6 = 0',
      category: 'Matemática',
      difficulty: 'medium' as const, // ou 'easy' | 'medium' | 'hard'
      type: 'multiple_choice' as const,
      tags: ['álgebra', 'equações', '9º ano'],
      createdAt: '2024-01-15',
      lastUsed: '2024-01-20'
    },
    {
      id: 2,
      title: 'Interpretação de texto',
      content: 'Com base no texto acima, analise as alternativas...',
      category: 'Português',
      difficulty: 'easy' as const, // ou 'easy' | 'medium' | 'hard'
      type: 'multiple_choice' as const,
      tags: ['interpretação', 'leitura', '8º ano'],
      createdAt: '2024-01-14',
      lastUsed: '2024-01-18'
    },
    {
      id: 3,
      title: 'Fotossíntese e respiração celular',
      content: 'Explique o processo de fotossíntese...',
      category: 'Ciências',
      difficulty: 'hard' as const, // ou 'easy' | 'medium' | 'hard'
      type: 'multiple_choice' as const,
      tags: ['biologia', 'fotossíntese', '7º ano'],
      createdAt: '2024-01-13',
      lastUsed: '2024-01-19'
    }
  ];

  const fields: FormField[] = [
    {
      name: 'title',
      label: 'Título da Questão',
      type: 'text' as const,
      required: true,
      placeholder: 'Digite o título'
    },
    {
      name: 'category',
      label: 'Categoria',
      type: 'select' as const,
      required: true,
      options: [
        { value: 'math', label: 'Matemática' },
        { value: 'science', label: 'Ciências' }
      ]
    },
    {
      name: 'content',
      label: 'Enunciado',
      type: 'textarea' as const,
      required: true
    }
  ];

  const sections = [
    {
      title: 'Preferências',
      options: [
        {
          id: 'dark-mode',
          label: 'Modo Escuro',
          description: 'Ativar tema escuro',
          control: (
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
          )
        }
      ]
    },
    {
      title: 'Notificações',
      options: [
        {
          id: 'notifications',
          label: 'Notificações',
          description: 'Receber notificações por e-mail',
          control: (
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            />
          )
        }
      ]
    }
  ];

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log('Dados do formulário:', values);
  };

  const saveSettings = () => {
    // Lógica para salvar configurações
    console.log('Configurações salvas');
  };

  return (
    <div>
      {/* Navbar Superior */}
      <Navbar searchValue={searchTerm} onSearchChange={setSearchTerm} />

      {/* Conteúdo da Página */}
      <div style={{ padding: '0 2rem' }}>
        {/* Header da Página */}
        <PageHeader title="Banco de Questões"
          description="Gerencie suas questões, categorias e organize seu conteúdo"
          onSetView={(setView) => setActiveTab(setView)}
        />
        {/* TABS */}
        <Tabs
          tabs={[
            { id: 'questions', label: 'Lista de Questões' },
            { id: 'new-question', label: 'Nova Questão' },
            { id: 'folders', label: 'Pastas' }
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        >
          <div id="questions">
            <QuestionsView
              searchTerm={searchValue}
              onSearchChange={setSearchValue}
              categories={categoriesWithID}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedDifficulty={selectedDifficulty}
              onDifficultyChange={setSelectedDifficulty}
              questions={questions}
              sortOptions={sortOptions}
              sortField={sortField}
              sortDirection={sortDirection}
              onSortChange={handleSortChange}
            />
          </div>

          <div id="new-question">
            <NewQuestionView
              fields={fields}
              onSubmit={handleSubmit}
            />
          </div>

          <div id="folders">
            <FoldersView
              categories={categories}
              onAddFolder={() => console.log('Adicionar pasta')}
            />
          </div>
        </Tabs>
      </div>

      {/* Modal de Configurações */}
      {isOpen && (
        <SettingsModal
          title="Configurações do Sistema"
          sections={sections}
          onClose={() => setIsOpen(false)}
          actions={
            <>
              <button onClick={() => setIsOpen(false)}>Cancelar</button>
              <button onClick={() => {
                saveSettings();
                setIsOpen(false);
              }}>Salvar</button>
            </>
          }
        />
      )}
    </div>
  );
};

export default QuestionBankPage;