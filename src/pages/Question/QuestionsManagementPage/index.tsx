import React, { useState } from 'react';
import { FiSearch, FiFilter, FiUpload, FiDownload, FiPlus, FiFolder, FiMoreVertical } from 'react-icons/fi';

import Navbar from '../../../../src/components/shared/Navbar'
import PageHeader from '../../../components/Question/PageHeader';
import Tabs from '../../../components/Question/Tabs';
import Filters from '../../../components/Question/Filter/Filters';
import AdvancedFilters from '../../../components/Results/AdvancedFilters';
import { QuestionForm } from '../../../components/Question/QuestionForm/QuestionForm';
import { SettingsModal } from '../../../components/Question/SettingsSection/SettingsModal';

import { QuestionsGrid } from '../../../styles/questionList';

import {
  SearchContainer,
  SearchInput,
  SearchIconWrapper
} from '../../../styles/navbar'
import {
  PageHeaderContainer,
  PageTitleContainer,
  PageActions,
  ActionButton
} from '../../../styles/header';
import {
  TabsContainer,
  TabContent
} from '../../../styles/tab';
import {
  FiltersContainer,
  FiltersHeader,
  FiltersTitle,
  FiltersContent,
  FiltersGrid,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  AdvancedFiltersButton
} from '../../../styles/filters';
import {
  QuestionFormContainer,
  QuestionFormHeader,
  QuestionFormTitle,
  QuestionFormDescription,
  QuestionFormContent,
} from '../../../styles/questionsForm';
import {
  FoldersContainer,
  FoldersHeader,
  FoldersTitle,
  FoldersGrid,
  FolderCard,
  FolderHeader,
  FolderIcon,
  FolderTitle,
  FolderCount,
  FolderActions,
  FolderMoreButton,
  FolderActionsDropdown,
  FolderActionItem,
  AddFolderCard,
  AddFolderIcon,
  AddFolderText
} from '../../../styles/folderManagementStyles';
import QuestionCard from '../../../components/Question/QuestionCard';
import { FormField } from '../../../components/Question/QuestionForm/type';

const QuestionBankPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('questions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categoryOptions = [
    { value: 'math', label: 'Matemática' },
    { value: 'science', label: 'Ciências' }
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Fácil' },
    { value: 'medium', label: 'Médio' },
    { value: 'hard', label: 'Difícil' }
  ];

  // Dados de exemplo
  const categories = [
    { id: 'math', name: 'Matemática', count: 342, color: 'bg-blue-100 text-blue-800' },
    { id: 'portuguese', name: 'Português', count: 256, color: 'bg-green-100 text-green-800' },
    { id: 'science', name: 'Ciências', count: 189, color: 'bg-purple-100 text-purple-800' },
    { id: 'history', name: 'História', count: 167, color: 'bg-orange-100 text-orange-800' },
    { id: 'geography', name: 'Geografia', count: 134, color: 'bg-red-100 text-red-800' }
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
          <div id="questions">Conteúdo da lista de questões</div>
          <div id="new-question">Formulário de nova questão</div>
          <div id="folders">Gerenciamento de pastas</div>
        </Tabs>

        <PageHeaderContainer>
          <PageTitleContainer>
            <h1>Banco de Questões</h1>
            <p>Gerencie suas questões, categorias e organize seu conteúdo</p>
          </PageTitleContainer>

          <PageActions>
            <ActionButton>
              <FiUpload /> Importar
            </ActionButton>
            <ActionButton>
              <FiDownload /> Exportar
            </ActionButton>
            <ActionButton className="primary" onClick={() => setActiveTab('new-question')}>
              <FiPlus /> Nova Questão
            </ActionButton>
          </PageActions>
        </PageHeaderContainer>

        {/* Tabs */}
        <TabsContainer orientation='horizontal' >
          {/* Conteúdo das Tabs */}
          <TabContent>
            {activeTab === 'questions' && (
              <>
                {/* Filtros */}
                <Filters
                  searchValue={searchValue}
                  onSearchChange={setSearchValue}
                  categoryOptions={categoryOptions}
                  difficultyOptions={difficultyOptions}
                  selectedCategory={selectedCategory}
                  selectedDifficulty={selectedDifficulty}
                  onCategoryChange={setSelectedCategory}
                  onDifficultyChange={setSelectedDifficulty}
                  showAdvanced={showAdvanced}
                  onAdvancedToggle={() => setShowAdvanced(!showAdvanced)}
                />
                <FiltersContainer>
                  <FiltersHeader>
                    <FiltersTitle>
                      <FiFilter /> Filtros e Busca
                    </FiltersTitle>
                  </FiltersHeader>
                  <FiltersContent>
                    <FiltersGrid>
                      <FilterGroup>
                        <FilterLabel>Buscar</FilterLabel>
                        <SearchContainer>
                          <SearchIconWrapper as={FiSearch} />
                          <SearchInput
                            placeholder="Buscar questões..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </SearchContainer>
                      </FilterGroup>

                      <FilterGroup>
                        <FilterLabel>Categoria</FilterLabel>
                        <FilterSelect
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option value="all">Todas as categorias</option>
                          {categories.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </FilterSelect>
                      </FilterGroup>

                      <FilterGroup>
                        <FilterLabel>Dificuldade</FilterLabel>
                        <FilterSelect
                          value={selectedDifficulty}
                          onChange={(e) => setSelectedDifficulty(e.target.value)}
                        >
                          <option value="all">Todas as dificuldades</option>
                          <option value="easy">Fácil</option>
                          <option value="medium">Médio</option>
                          <option value="hard">Difícil</option>
                        </FilterSelect>
                      </FilterGroup>

                      <FilterGroup>
                        <FilterLabel>&nbsp;</FilterLabel>
                        <AdvancedFiltersButton>
                          <FiFilter /> Filtros Avançados
                        </AdvancedFiltersButton>
                      </FilterGroup>
                    </FiltersGrid>
                  </FiltersContent>
                </FiltersContainer>

                {/* Lista de Questões */}
                <QuestionsGrid>
                  {questions.map(question => (
                    <QuestionCard
                      question={question}
                      onView={() => console.log('Visualizar')}
                      onEdit={() => console.log('Editar')}
                      onDelete={() => console.log('Excluir')}
                      onTagClick={(tag) => console.log('Tag clicada:', tag)}
                    />
                  ))}
                </QuestionsGrid>
              </>
            )}

            {activeTab === 'new-question' && (
              <QuestionFormContainer>
                <QuestionFormHeader>
                  <QuestionFormTitle>Criar Nova Questão</QuestionFormTitle>
                  <QuestionFormDescription>
                    Preencha os campos abaixo para adicionar uma nova questão ao banco
                  </QuestionFormDescription>
                </QuestionFormHeader>

                <QuestionFormContent>

                  <QuestionForm
                    title="Criar Nova Questão"
                    description="Preencha os campos abaixo"
                    fields={fields}
                    onSubmit={handleSubmit}
                  />
                </QuestionFormContent>
              </QuestionFormContainer>
            )}

            {activeTab === 'folders' && (
              <FoldersContainer>
                <FoldersHeader>
                  <FoldersTitle>Gestão de Pastas</FoldersTitle>
                  <ActionButton className="primary">
                    <FiPlus /> Nova Pasta
                  </ActionButton>
                </FoldersHeader>

                <FoldersGrid>
                  {categories.map(category => (
                    <FolderCard key={category.id}>
                      <FolderHeader>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <FolderIcon>
                            <FiFolder />
                          </FolderIcon>
                          <div>
                            <FolderTitle>{category.name}</FolderTitle>
                            <FolderCount>{category.count} questões</FolderCount>
                          </div>
                        </div>

                        <FolderActions>
                          <FolderMoreButton>
                            <FiMoreVertical />
                          </FolderMoreButton>
                          <FolderActionsDropdown>
                            <FolderActionItem>Editar</FolderActionItem>
                            <FolderActionItem className="delete">Excluir</FolderActionItem>
                          </FolderActionsDropdown>
                        </FolderActions>
                      </FolderHeader>
                    </FolderCard>
                  ))}

                  <AddFolderCard>
                    <AddFolderIcon>
                      <FiPlus />
                    </AddFolderIcon>
                    <AddFolderText>Adicionar Pasta</AddFolderText>
                  </AddFolderCard>
                </FoldersGrid>
              </FoldersContainer>
            )}
          </TabContent>
        </TabsContainer>
      </div>

      {showAdvanced && (
        <AdvancedFilters
          periods={[]}
          subjects={[]}
          classes={[]}
          currentFilters={{
            classId: '',
            period: '',
            subject: '',
            searchTerm: searchValue,
          }}
          onFilterChange={() => { }}
          onReset={() => { }}
          onApply={() => { }}
          isLoading={isOpen}
        />
      )}

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