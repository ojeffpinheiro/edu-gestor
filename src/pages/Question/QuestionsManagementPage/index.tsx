import React, { useState } from 'react';
import { FiMenu, FiSearch, FiBell, FiUser, FiChevronDown, FiFilter, FiUpload, FiDownload, FiPlus, FiEye, FiEdit2, FiTrash2, FiMoreHorizontal, FiFolder, FiMoreVertical, FiX } from 'react-icons/fi';
import { MdDashboard, MdQuestionAnswer, MdAssignment, MdAssessment, MdBarChart } from 'react-icons/md';
import { IoMdSettings, IoMdHelp } from 'react-icons/io';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { FaTag } from 'react-icons/fa';
import {
  NavbarContainer,
  NavLeft,
  MenuButton,
  NavigationDropdown,
  NavDropdownButton,
  NavDropdownContent,
  NavDropdownItem,
  SearchContainer,
  SearchInput,
  SearchIcon,
  NavRight,
  NotificationButton,
  NotificationBadge,
  ProfileDropdown,
  ProfileButton,
  ProfileImage,
  ProfileDropdownContent,
  ProfileDropdownItem
} from '../../../styles/navbar'
import {
  PageHeaderContainer,
  PageTitleContainer,
  PageActions,
  ActionButton
} from '../../../styles/header';
import {
  TabsContainer,
  TabsList,
  TabTrigger,
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
  FormGrid,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  FormTextarea,
  FormActions,
  FormButton
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
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalContent,
  SettingsSection,
  SettingsSectionTitle,
  SettingsOption,
  SettingsOptionLabel,
  SettingsOptionControl,
  ModalActions,
  ModalButton
} from '../../../styles/settingsModalStyles';
import { 
  QuestionCard,
  QuestionsGrid,
  ActionItem, ActionsDropdown, MoreActionsButton,
  QuestionHeader, QuestionTitle, QuestionBadge, QuestionActions,
  QuestionContent, QuestionMeta, QuestionTags, QuestionTag,
} from '../../../styles/questionList';

// Icons

const QuestionBankPage = () => {
  const [activeTab, setActiveTab] = useState('questions');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

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
      difficulty: 'Médio',
      type: 'Múltipla escolha',
      tags: ['álgebra', 'equações', '9º ano'],
      createdAt: '2024-01-15',
      lastUsed: '2024-01-20'
    },
    {
      id: 2,
      title: 'Interpretação de texto',
      content: 'Com base no texto acima, analise as alternativas...',
      category: 'Português',
      difficulty: 'Fácil',
      type: 'Múltipla escolha',
      tags: ['interpretação', 'leitura', '8º ano'],
      createdAt: '2024-01-14',
      lastUsed: '2024-01-18'
    },
    {
      id: 3,
      title: 'Fotossíntese e respiração celular',
      content: 'Explique o processo de fotossíntese...',
      category: 'Ciências',
      difficulty: 'Difícil',
      type: 'Dissertativa',
      tags: ['biologia', 'fotossíntese', '7º ano'],
      createdAt: '2024-01-13',
      lastUsed: '2024-01-19'
    }
  ];

  return (
    <div>
      {/* Navbar Superior */}
      <NavbarContainer>
        <NavLeft>
          <MenuButton>
            <FiMenu />
          </MenuButton>
          
          <NavigationDropdown>
            <NavDropdownButton>
              Navegação <FiChevronDown />
            </NavDropdownButton>
            <NavDropdownContent>
              <NavDropdownItem>
                <MdDashboard /> Dashboard
              </NavDropdownItem>
              <NavDropdownItem>
                <MdQuestionAnswer /> Banco de Questões
              </NavDropdownItem>
              <NavDropdownItem>
                <MdAssignment /> Geração de Prova
              </NavDropdownItem>
              <NavDropdownItem>
                <MdAssessment /> Avaliação
              </NavDropdownItem>
              <NavDropdownItem>
                <MdBarChart /> Estatísticas
              </NavDropdownItem>
            </NavDropdownContent>
          </NavigationDropdown>
        </NavLeft>
        
        <SearchContainer>
          <SearchIcon as={FiSearch} />
          <SearchInput 
            placeholder="Buscar..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        
        <NavRight>
          <NotificationButton>
            <FiBell />
            <NotificationBadge>3</NotificationBadge>
          </NotificationButton>
          
          <ProfileDropdown>
            <ProfileButton>
              <ProfileImage>
                <FiUser />
              </ProfileImage>
              <FiChevronDown />
            </ProfileButton>
            <ProfileDropdownContent>
              <ProfileDropdownItem>
                <FiUser /> Perfil
              </ProfileDropdownItem>
              <ProfileDropdownItem onClick={() => setShowSettingsModal(true)}>
                <IoMdSettings /> Configurações
              </ProfileDropdownItem>
              <ProfileDropdownItem>
                <IoMdHelp /> Ajuda
              </ProfileDropdownItem>
              <ProfileDropdownItem>
                <RiLogoutBoxLine /> Sair
              </ProfileDropdownItem>
            </ProfileDropdownContent>
          </ProfileDropdown>
        </NavRight>
      </NavbarContainer>
      
      {/* Conteúdo da Página */}
      <div style={{ padding: '0 2rem' }}>
        {/* Header da Página */}
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
        <TabsContainer>
          <TabsList>
            <TabTrigger 
              className={activeTab === 'questions' ? 'active' : ''}
              onClick={() => setActiveTab('questions')}
            >
              Lista de Questões
            </TabTrigger>
            <TabTrigger 
              className={activeTab === 'new-question' ? 'active' : ''}
              onClick={() => setActiveTab('new-question')}
            >
              Nova Questão
            </TabTrigger>
            <TabTrigger 
              className={activeTab === 'folders' ? 'active' : ''}
              onClick={() => setActiveTab('folders')}
            >
              Gestão de Pastas
            </TabTrigger>
          </TabsList>
          
          {/* Conteúdo das Tabs */}
          <TabContent>
            {activeTab === 'questions' && (
              <>
                {/* Filtros */}
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
                          <SearchIcon as={FiSearch} />
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
                    <QuestionCard key={question.id}>
                      <QuestionHeader>
                        <div>
                          <QuestionTitle>{question.title}</QuestionTitle>
                          <QuestionBadge className={question.difficulty.toLowerCase()}>
                            {question.difficulty}
                          </QuestionBadge>
                          <QuestionBadge className={question.type.toLowerCase().replace(' ', '-')}>
                            {question.type}
                          </QuestionBadge>
                        </div>
                        
                        <QuestionActions>
                          <MoreActionsButton>
                            <FiMoreHorizontal />
                          </MoreActionsButton>
                          <ActionsDropdown>
                            <ActionItem>
                              <FiEye /> Visualizar
                            </ActionItem>
                            <ActionItem>
                              <FiEdit2 /> Editar
                            </ActionItem>
                            <ActionItem className="delete">
                              <FiTrash2 /> Excluir
                            </ActionItem>
                          </ActionsDropdown>
                        </QuestionActions>
                      </QuestionHeader>
                      
                      <QuestionContent>{question.content}</QuestionContent>
                      
                      <QuestionMeta>
                        <span>Categoria: {question.category}</span>
                        <span>Criada em: {question.createdAt}</span>
                        <span>Última utilização: {question.lastUsed}</span>
                      </QuestionMeta>
                      
                      <QuestionTags>
                        {question.tags.map((tag, index) => (
                          <QuestionTag key={index}>
                            <FaTag size={12} /> {tag}
                          </QuestionTag>
                        ))}
                      </QuestionTags>
                    </QuestionCard>
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
                  <FormGrid>
                    <div>
                      <FormGroup>
                        <FormLabel>Título da Questão</FormLabel>
                        <FormInput placeholder="Digite o título da questão" />
                      </FormGroup>
                      
                      <FormGroup>
                        <FormLabel>Categoria</FormLabel>
                        <FormSelect>
                          <option value="">Selecione a categoria</option>
                          {categories.map(category => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </FormSelect>
                      </FormGroup>
                      
                      <FormGroup>
                        <FormLabel>Dificuldade</FormLabel>
                        <FormSelect>
                          <option value="">Selecione a dificuldade</option>
                          <option value="easy">Fácil</option>
                          <option value="medium">Médio</option>
                          <option value="hard">Difícil</option>
                        </FormSelect>
                      </FormGroup>
                      
                      <FormGroup>
                        <FormLabel>Tipo de Questão</FormLabel>
                        <FormSelect>
                          <option value="">Selecione o tipo</option>
                          <option value="multiple-choice">Múltipla escolha</option>
                          <option value="essay">Dissertativa</option>
                          <option value="true-false">Verdadeiro/Falso</option>
                        </FormSelect>
                      </FormGroup>
                    </div>
                    
                    <div>
                      <FormGroup>
                        <FormLabel>Enunciado</FormLabel>
                        <FormTextarea placeholder="Digite o enunciado da questão..." />
                      </FormGroup>
                      
                      <FormGroup>
                        <FormLabel>Tags (separadas por vírgula)</FormLabel>
                        <FormInput placeholder="álgebra, equações, 9º ano" />
                      </FormGroup>
                    </div>
                  </FormGrid>
                  
                  <FormActions>
                    <FormButton className="outline">Cancelar</FormButton>
                    <FormButton className="primary">Salvar Questão</FormButton>
                  </FormActions>
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
      
      {/* Modal de Configurações */}
      {showSettingsModal && (
        <ModalOverlay onClick={() => setShowSettingsModal(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Configurações</ModalTitle>
              <ModalCloseButton onClick={() => setShowSettingsModal(false)}>
                <FiX />
              </ModalCloseButton>
            </ModalHeader>
            
            <ModalContent>
              <SettingsSection>
                <SettingsSectionTitle>Preferências</SettingsSectionTitle>
                
                <SettingsOption>
                  <SettingsOptionLabel>Tema</SettingsOptionLabel>
                  <SettingsOptionControl>
                    <select>
                      <option>Claro</option>
                      <option>Escuro</option>
                      <option>Sistema</option>
                    </select>
                  </SettingsOptionControl>
                </SettingsOption>
                
                <SettingsOption>
                  <SettingsOptionLabel>Idioma</SettingsOptionLabel>
                  <SettingsOptionControl>
                    <select>
                      <option>Português</option>
                      <option>Inglês</option>
                      <option>Espanhol</option>
                    </select>
                  </SettingsOptionControl>
                </SettingsOption>
              </SettingsSection>
              
              <SettingsSection>
                <SettingsSectionTitle>Notificações</SettingsSectionTitle>
                
                <SettingsOption>
                  <SettingsOptionLabel>Notificações por email</SettingsOptionLabel>
                  <SettingsOptionControl>
                    <input type="checkbox" />
                  </SettingsOptionControl>
                </SettingsOption>
                
                <SettingsOption>
                  <SettingsOptionLabel>Notificações no sistema</SettingsOptionLabel>
                  <SettingsOptionControl>
                    <input type="checkbox" defaultChecked />
                  </SettingsOptionControl>
                </SettingsOption>
              </SettingsSection>
            </ModalContent>
            
            <ModalActions>
              <ModalButton className="outline" onClick={() => setShowSettingsModal(false)}>
                Cancelar
              </ModalButton>
              <ModalButton className="primary">
                Salvar Configurações
              </ModalButton>
            </ModalActions>
          </ModalContainer>
        </ModalOverlay>
      )}
    </div>
  );
};

export default QuestionBankPage;