import React, { useCallback, useState } from 'react';

import { Category, CategoryWithId } from '../../../components/Question/QuestionForm/type';
import { SortOption } from '../../../components/Sort/types';

import { Question } from '../../../utils/types/Question';

import { mockQuestions } from '../../../mocks/question';

import Navbar from '../../../../src/components/shared/Navbar'

import { SettingsModal } from '../../../components/Question/SettingsSection/SettingsModal';
import NewQuestionView from '../../../components/Question/views/NewQuestionView';
import QuestionsView from '../../../components/Question/views/QuestionsView';
import FoldersView from '../../../components/Question/views/FoldersView';
import PageHeader from '../../../components/Question/PageHeader';
import Tabs from '../../../components/Question/Tabs';
import { FaSave } from 'react-icons/fa';

const QuestionBankPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('questions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');  // 'all' em vez de ''
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');  // 'all' em vez de ''
  const [searchValue, setSearchValue] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Matemática',
      count: 342,
      color: 'blue',
      subTopics: [
        { id: '1-1', name: 'Álgebra' },
        { id: '1-2', name: 'Geometria' }
      ]
    },
    {
      id: '2',
      name: 'Português',
      count: 256,
      color: 'green',
      subTopics: [
        { id: '2-1', name: 'Gramática' },
        { id: '2-2', name: 'Literatura' }
      ]
    },
    // Outras categorias...
  ]);

  const sortOptions: SortOption[] = [
    { value: 'title', label: 'Título', direction: 'asc', },
    { value: 'createdAt', label: 'Data de criação', direction: 'desc' },
    { value: 'updatedAt', label: 'Último uso', direction: 'desc' },
    { value: 'difficulty', label: 'Dificuldade', direction: 'asc' }
  ];

  const handleSortChange = useCallback((field: string, direction: 'asc' | 'desc') => {
    console.log('Ordenação alterada:', field, direction);
    setSortField(field);
    setSortDirection(direction);
    // Aqui você pode adicionar lógica adicional do componente pai
    // como atualizar uma API, analytics, etc.
  }, []);

  const categoriesWithID: CategoryWithId[] = [
    { id: 'math', name: 'Matemática', count: 342, color: 'bg-blue-100 text-blue-800' },
    { id: 'portuguese', name: 'Português', count: 256, color: 'bg-green-100 text-green-800' },
    { id: 'science', name: 'Ciências', count: 189, color: 'bg-purple-100 text-purple-800' },
    { id: 'history', name: 'História', count: 167, color: 'bg-orange-100 text-orange-800' },
    { id: 'geography', name: 'Geografia', count: 134, color: 'bg-red-100 text-red-800' }
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

  /**
   * const handleSubmit = (values: Record<string, unknown>) => {
    console.log('Dados do formulário:', values);
  };
   */

  const saveSettings = () => {
    // Lógica para salvar configurações
    console.log('Configurações salvas');
  };
  // Funções para manipulação de pastas
  const handleAddFolder = async (folderName: string) => {
    const newFolder: Category = {
      id: Date.now().toString(),
      name: folderName,
      count: 0,
      color: 'gray',
      subTopics: []
    };
    setCategories([...categories, newFolder]);
  };

  const handleEditFolder = async (folderId: string, newName: string) => {
    setCategories(categories.map(cat =>
      cat.id === folderId ? { ...cat, name: newName } : cat
    ));
  };

  const handleDeleteFolder = async (folderId: string) => {
    setCategories(categories.filter(cat => cat.id !== folderId));
  };

  // Funções para manipulação de subtópicos
  const handleAddSubTopic = async (folderId: string, subTopicName: string) => {
    setCategories(categories.map(cat => {
      if (cat.id === folderId) {
        const newSubTopic = {
          id: `${folderId}-${Date.now()}`,
          name: subTopicName
        };
        return {
          ...cat,
          subTopics: [...(cat.subTopics || []), newSubTopic]
        };
      }
      return cat;
    }));
  };

  const handleEditSubTopic = async (folderId: string, subTopicId: string, newName: string) => {
    setCategories(categories.map(cat => {
      if (cat.id === folderId) {
        return {
          ...cat,
          subTopics: cat.subTopics?.map(st =>
            st.id === subTopicId ? { ...st, name: newName } : st
          )
        };
      }
      return cat;
    }));
  };

  const handleDeleteSubTopic = async (folderId: string, subTopicId: string) => {
    setCategories(categories.map(cat => {
      if (cat.id === folderId) {
        return {
          ...cat,
          subTopics: cat.subTopics?.filter(st => st.id !== subTopicId)
        };
      }
      return cat;
    }));
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
              initialSortField={sortField}
              initialSortDirection={sortDirection}
              onQuestionChange={(question) => setQuestions(question)}
            />
          </div>

          <div id="new-question">
            <NewQuestionView
              questions={questions}
              onQuestionCreated={(newQuestion) =>
                setQuestions([...questions, newQuestion])
              } />
          </div>


          <div id="folders">
            <FoldersView
              categories={categories}
              onAddFolder={handleAddFolder}
              onEditFolder={handleEditFolder}
              onDeleteFolder={handleDeleteFolder}
              onAddSubTopic={handleAddSubTopic}
              onEditSubTopic={handleEditSubTopic}
              onDeleteSubTopic={handleDeleteSubTopic}
            />
          </div>
        </Tabs>
      </div>

      {/* Modal de Configurações */}
      {isOpen && (
        <SettingsModal
          title="Configurações do Sistema"
          isOpen={isOpen}
          sections={sections}
          onClose={() => setIsOpen(false)}
          actions={
            <>
              <button onClick={() => setIsOpen(false)}>Cancelar</button>
              <button onClick={() => {
                saveSettings();
                setIsOpen(false);
              }}>
                <FaSave />
                Salvar
              </button>
            </>
          }
        />
      )}
    </div>
  );
};

export default QuestionBankPage;