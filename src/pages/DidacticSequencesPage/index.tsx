import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaBook, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaCheckCircle,
  FaExclamationTriangle,
  FaLayerGroup,
  FaFileAlt
} from 'react-icons/fa';

// Types
interface Discipline {
  id: number;
  name: string;
}

interface SequenceStage {
  id?: number;
  sequenceId: number;
  title: string;
  description: string;
  order: number;
}

interface SequenceContent {
  id?: number;
  stageId: number;
  type: 'explanation' | 'example' | 'solved-exercises' | 'exercise-list';
  content: string;
}

interface DidacticSequence {
  id?: number;
  disciplineId: number;
  title: string;
  description: string;
  grade: string;
  order: number;
}

// Styled Components (Previous styled components remain the same)
// ... (Keeping the previous styled components)
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: var(--color-background-secondary);
`;

const Header = styled.header`
  margin-bottom: 2rem;
  
  h1 {
    color: var(--color-text);
    font-size: var(--font-size-3xl);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--color-text-secondary);
    font-size: var(--font-size-md);
  }
`;

const DisciplineSelectorContainer = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const DisciplineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const DisciplineButton = styled.button<{ $isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: var(--border-radius-md);
  transition: all var(--transition-normal);
  background-color: ${props => props.$isSelected 
    ? 'var(--color-primary)' 
    : 'var(--color-background-third)'};
  color: ${props => props.$isSelected 
    ? 'var(--color-text-on-primary)' 
    : 'var(--color-text)'};
  border: none;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-sm);
    background-color: ${props => props.$isSelected 
      ? 'var(--color-primary-hover)' 
      : 'var(--color-background)'};
  }
`;

const SequenceListContainer = styled.div`
  background-color: var(--color-card);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
`;

const SequenceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SequenceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SequenceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-normal);

  &:hover {
    background-color: var(--color-background);
    box-shadow: var(--shadow-sm);
  }
`;

const ActionButton = styled.button<{ $variant?: 'edit' | 'delete' }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-normal);
  color: ${props => 
    props.$variant === 'edit' 
      ? 'var(--color-primary)' 
      : props.$variant === 'delete' 
      ? 'var(--color-error)' 
      : 'var(--color-text)'};

  &:hover {
    background-color: ${props => 
      props.$variant === 'edit' 
        ? 'rgba(24, 144, 255, 0.1)' 
        : props.$variant === 'delete' 
        ? 'rgba(245, 34, 45, 0.1)' 
        : 'var(--color-background)'};
  }
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: var(--z-index-modal);
`;

const ModalContent = styled.div`
  background: var(--color-card);
  border-radius: var(--border-radius-lg);
  max-width: 500px;
  margin: 3rem auto;
  padding: 2rem;
  box-shadow: var(--shadow-lg);
`;

const Feedback = styled.div<{ $type: 'success' | 'warning' | 'error' }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: var(--border-radius-md);
  margin-bottom: 1rem;
  background-color: ${props => 
    props.$type === 'success' 
      ? 'var(--color-success)' 
      : props.$type === 'warning' 
      ? 'var(--color-warning)' 
      : 'var(--color-error)'};
  color: var(--color-text-on-primary);

  svg {
    margin-right: 0.5rem;
  }
`;

// Additional Styled Components
const StageContainer = styled.div`
  background-color: var(--color-background-third);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  margin-bottom: 1rem;
`;

const ContentContainer = styled.div`
  background-color: var(--color-background);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  margin-top: 1rem;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Tab = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: var(--border-radius-sm);
  background-color: ${props => props.$active 
    ? 'var(--color-primary)' 
    : 'var(--color-background-third)'};
  color: ${props => props.$active 
    ? 'var(--color-text-on-primary)' 
    : 'var(--color-text)'};
  cursor: pointer;
`;

const DidacticSequencesPage: React.FC = () => {
  // State management
  const [disciplines] = useState<Discipline[]>([
    { id: 1, name: 'Matemática' },
    { id: 2, name: 'Português' },
    { id: 3, name: 'Ciências' }
  ]);

  const [selectedDiscipline, setSelectedDiscipline] = useState<number | null>(null);
  const [didacticSequences, setDidacticSequences] = useState<DidacticSequence[]>([]);
  const [sequenceStages, setSequenceStages] = useState<SequenceStage[]>([]);
  const [sequenceContents, setSequenceContents] = useState<SequenceContent[]>([]);

  const [currentSequence, setCurrentSequence] = useState<DidacticSequence | null>(null);
  const [currentStage, setCurrentStage] = useState<SequenceStage | null>(null);
  const [currentContent, setCurrentContent] = useState<SequenceContent | null>(null);

  // Modal and form states
  const [activeModal, setActiveModal] = useState<
    'sequence' | 'stage' | 'content' | null
  >(null);

  const [feedback, setFeedback] = useState<{
    type: 'success' | 'warning' | 'error' | null, 
    message: string
  } | null>(null);

  // Form states
  const [sequenceForm, setSequenceForm] = useState<DidacticSequence>({
    disciplineId: 0,
    title: '',
    description: '',
    grade: '',
    order: 1
  });

  const [stageForm, setStageForm] = useState<SequenceStage>({
    sequenceId: 0,
    title: '',
    description: '',
    order: 1
  });

  const [contentForm, setContentForm] = useState<SequenceContent>({
    stageId: 0,
    type: 'explanation',
    content: ''
  });

  // Discipline Selection
  const handleDisciplineSelect = (disciplineId: number) => {
    setSelectedDiscipline(disciplineId);
    // Mock data for sequences
    setDidacticSequences([
      { 
        id: 1, 
        disciplineId, 
        title: 'Progressão Aritmética', 
        description: 'Sequência para entender progressões aritméticas',
        grade: '9º ano',
        order: 1
      }
    ]);
  };

  // Sequence CRUD Operations
  const handleAddSequence = () => {
    if (selectedDiscipline) {
      setSequenceForm({
        disciplineId: selectedDiscipline,
        title: '',
        description: '',
        grade: '',
        order: didacticSequences.length + 1
      });
      setCurrentSequence(null);
      setActiveModal('sequence');
    } else {
      setFeedback({
        type: 'warning',
        message: 'Selecione uma disciplina antes de criar uma sequência.'
      });
    }
  };

  const saveSequence = () => {
    // Validate form
    if (!sequenceForm.title.trim()) {
      setFeedback({
        type: 'error',
        message: 'O título da sequência é obrigatório.'
      });
      return;
    }

    if (currentSequence?.id) {
      // Update existing sequence
      setDidacticSequences(prev => 
        prev.map(seq => seq.id === currentSequence.id ? sequenceForm : seq)
      );
      setFeedback({
        type: 'success',
        message: 'Sequência atualizada com sucesso!'
      });
    } else {
      // Add new sequence
      const newSequence = {
        ...sequenceForm,
        id: Date.now()
      };
      setDidacticSequences(prev => [...prev, newSequence]);
      setFeedback({
        type: 'success',
        message: 'Nova sequência criada com sucesso!'
      });
    }
    
    setActiveModal(null);
    setCurrentSequence(null);
  };

  const handleEditSequence = (sequence: DidacticSequence) => {
    setCurrentSequence(sequence);
    setSequenceForm(sequence);
    setActiveModal('sequence');
  };

  const handleDeleteSequence = (sequenceId: number) => {
    setDidacticSequences(prev => prev.filter(seq => seq.id !== sequenceId));
    // Also delete associated stages and contents
    setSequenceStages(prev => prev.filter(stage => stage.sequenceId !== sequenceId));
    setSequenceContents(prev => prev.filter(content => 
      !sequenceStages.some(stage => stage.sequenceId === sequenceId && stage.id === content.stageId)
    ));
    setFeedback({
      type: 'success',
      message: 'Sequência removida com sucesso!'
    });
  };

  // Stage CRUD Operations
  const handleAddStage = (sequenceId: number) => {
    setStageForm({
      sequenceId,
      title: '',
      description: '',
      order: (sequenceStages.filter(s => s.sequenceId === sequenceId).length) + 1
    });
    setCurrentStage(null);
    setActiveModal('stage');
  };

  const saveStage = () => {
    if (!stageForm.title.trim()) {
      setFeedback({
        type: 'error',
        message: 'O título da etapa é obrigatório.'
      });
      return;
    }

    if (currentStage?.id) {
      // Update existing stage
      setSequenceStages(prev => 
        prev.map(stage => stage.id === currentStage.id ? stageForm : stage)
      );
      setFeedback({
        type: 'success',
        message: 'Etapa atualizada com sucesso!'
      });
    } else {
      // Add new stage
      const newStage = {
        ...stageForm,
        id: Date.now()
      };
      setSequenceStages(prev => [...prev, newStage]);
      setFeedback({
        type: 'success',
        message: 'Nova etapa criada com sucesso!'
      });
    }
    
    setActiveModal(null);
    setCurrentStage(null);
  };

  const handleEditStage = (stage: SequenceStage) => {
    setCurrentStage(stage);
    setStageForm(stage);
    setActiveModal('stage');
  };

  const handleDeleteStage = (stageId: number) => {
    setSequenceStages(prev => prev.filter(stage => stage.id !== stageId));
    // Also delete associated contents
    setSequenceContents(prev => prev.filter(content => content.stageId !== stageId));
    setFeedback({
      type: 'success',
      message: 'Etapa removida com sucesso!'
    });
  };

  // Content CRUD Operations
  const handleAddContent = (stageId: number) => {
    setContentForm({
      stageId,
      type: 'explanation',
      content: ''
    });
    setCurrentContent(null);
    setActiveModal('content');
  };

  const saveContent = () => {
    if (!contentForm.content.trim()) {
      setFeedback({
        type: 'error',
        message: 'O conteúdo não pode estar vazio.'
      });
      return;
    }

    if (currentContent?.id) {
      // Update existing content
      setSequenceContents(prev => 
        prev.map(content => content.id === currentContent.id ? contentForm : content)
      );
      setFeedback({
        type: 'success',
        message: 'Conteúdo atualizado com sucesso!'
      });
    } else {
      // Add new content
      const newContent = {
        ...contentForm,
        id: Date.now()
      };
      setSequenceContents(prev => [...prev, newContent]);
      setFeedback({
        type: 'success',
        message: 'Novo conteúdo criado com sucesso!'
      });
    }
    
    setActiveModal(null);
    setCurrentContent(null);
  };

  const handleEditContent = (content: SequenceContent) => {
    setCurrentContent(content);
    setContentForm(content);
    setActiveModal('content');
  };

  const handleDeleteContent = (contentId: number) => {
    setSequenceContents(prev => prev.filter(content => content.id !== contentId));
    setFeedback({
      type: 'success',
      message: 'Conteúdo removido com sucesso!'
    });
  };

  // Render Modals (Sequence, Stage, Content)
  const renderSequenceModal = () => (
    <Modal $isOpen={activeModal === 'sequence'}>
      <ModalContent>
        <h2 className="text-xl font-semibold mb-4">
          {currentSequence ? 'Editar' : 'Nova'} Sequência Didática
        </h2>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título da Sequência"
            value={sequenceForm.title}
            onChange={(e) => setSequenceForm(prev => ({...prev, title: e.target.value}))}
            className="w-full border rounded p-2"
          />
          <textarea
            placeholder="Descrição"
            value={sequenceForm.description}
            onChange={(e) => setSequenceForm(prev => ({...prev, description: e.target.value}))}
            className="w-full border rounded p-2"
            rows={3}
          />
          <input
            type="text"
            placeholder="Ano/Série"
            value={sequenceForm.grade}
            onChange={(e) => setSequenceForm(prev => ({...prev, grade: e.target.value}))}
            className="w-full border rounded p-2"
          />
          <input
            type="number"
            placeholder="Ordem"
            value={sequenceForm.order}
            onChange={(e) => setSequenceForm(prev => ({...prev, order: Number(e.target.value)}))}
            className="w-full border rounded p-2"
            min="1"
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <ActionButton 
            onClick={() => setActiveModal(null)}
            style={{ 
              backgroundColor: 'var(--color-background-third)',
              padding: '0.5rem 1rem'
            }}
          >
            Cancelar
          </ActionButton>
          <ActionButton 
            onClick={saveSequence}
            style={{ 
              backgroundColor: 'var(--color-success)', 
              color: 'white',
              padding: '0.5rem 1rem'
            }}
          >
            Salvar
          </ActionButton>
        </div>
      </ModalContent>
    </Modal>
  );

  const renderStageModal = () => (
    <Modal $isOpen={activeModal === 'stage'}>
      <ModalContent>
        <h2 className="text-xl font-semibold mb-4">
          {currentStage ? 'Editar' : 'Nova'} Etapa da Sequência
        </h2>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Título da Etapa"
            value={stageForm.title}
            onChange={(e) => setStageForm(prev => ({...prev, title: e.target.value}))}
            className="w-full border rounded p-2"
          />
          <textarea
            placeholder="Descrição da Etapa"
            value={stageForm.description}
            onChange={(e) => setStageForm(prev => ({...prev, description: e.target.value}))}
            className="w-full border rounded p-2"
            rows={3}
          />
          <input
            type="number"
            placeholder="Ordem"
            value={stageForm.order}
            onChange={(e) => setStageForm(prev => ({...prev, order: Number(e.target.value)}))}
            className="w-full border rounded p-2"
            min="1"
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <ActionButton 
            onClick={() => setActiveModal(null)}
            style={{ 
              backgroundColor: 'var(--color-background-third)',
              padding: '0.5rem 1rem'
            }}
          >
            Cancelar
          </ActionButton>
          <ActionButton 
            onClick={saveStage}
            style={{ 
              backgroundColor: 'var(--color-success)', 
              color: 'white',
              padding: '0.5rem 1rem'
            }}
          >
            Salvar
          </ActionButton>
        </div>
      </ModalContent>
    </Modal>
  );

  const renderContentModal = () => (
    <Modal $isOpen={activeModal === 'content'}>
      <ModalContent>
        <h2 className="text-xl font-semibold mb-4">
          {currentContent ? 'Editar' : 'Novo'} Conteúdo da Etapa
        </h2>
        
        <div className="space-y-4">
          <div className="flex space-x-2 mb-4">
            <Tab 
              $active={contentForm.type === 'explanation'}
              onClick={() => setContentForm(prev => ({...prev, type: 'explanation'}))}
            >
              Explicação
            </Tab>
            <Tab 
              $active={contentForm.type === 'example'}
              onClick={() => setContentForm(prev => ({...prev, type: 'example'}))}
            >
              Exemplo
            </Tab>
            <Tab 
              $active={contentForm.type === 'solved-exercises'}
              onClick={() => setContentForm(prev => ({...prev, type: 'solved-exercises'}))}
            >
              Exercícios Resolvidos
            </Tab>
            <Tab 
              $active={contentForm.type === 'exercise-list'}
              onClick={() => setContentForm(prev => ({...prev, type: 'exercise-list'}))}
            >
              Lista de Exercícios
            </Tab>
          </div>
          <textarea
            placeholder={`Conteúdo de ${
              contentForm.type === 'explanation' ? 'Explicação' :
              contentForm.type === 'example' ? 'Exemplo' :
              contentForm.type === 'solved-exercises' ? 'Exercícios Resolvidos' :
              'Lista de Exercícios'
            }`}
            value={contentForm.content}
            onChange={(e) => setContentForm(prev => ({...prev, content: e.target.value}))}
            className="w-full border rounded p-2"
            rows={6}
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <ActionButton 
            onClick={() => setActiveModal(null)}
            style={{ 
              backgroundColor: 'var(--color-background-third)',
              padding: '0.5rem 1rem'
            }}
          >
            Cancelar
          </ActionButton>
          <ActionButton 
            onClick={saveContent}
            style={{ 
              backgroundColor: 'var(--color-success)', 
              color: 'white',
              padding: '0.5rem 1rem'
            }}
          >
            Salvar
          </ActionButton>
        </div>
      </ModalContent>
    </Modal>
  );

  // Render Sequence Stages and Contents
  const renderSequenceDetails = (sequence: DidacticSequence) => {
    const stages = sequenceStages.filter(stage => stage.sequenceId === sequence.id);

    return (
      <div>
        <ActionButton 
          onClick={() => handleAddStage(sequence.id!)}
          style={{ 
            backgroundColor: 'var(--color-success)', 
            color: 'white',
            padding: '0.5rem 1rem',
            marginBottom: '1rem'
          }}
        >
          <FaPlus className="mr-2" /> Nova Etapa
        </ActionButton>

        {stages.map(stage => {
          const contents = sequenceContents.filter(content => content.stageId === stage.id);
          
          return (
            <StageContainer key={stage.id}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-semibold">{stage.title}</h3>
                  <p className="text-sm text-gray-600">{stage.description}</p>
                </div>
                <div className="flex space-x-2">
                  <ActionButton 
                    $variant="edit"
                    onClick={() => handleEditStage(stage)}
                  >
                    <FaEdit />
                  </ActionButton>
                  <ActionButton 
                    $variant="delete"
                    onClick={() => handleDeleteStage(stage.id!)}
                  >
                    <FaTrash />
                  </ActionButton>
                </div>
              </div>

              <ActionButton 
                onClick={() => handleAddContent(stage.id!)}
                style={{ 
                  backgroundColor: 'var(--color-primary)', 
                  color: 'white',
                  padding: '0.5rem 1rem',
                  marginBottom: '1rem'
                }}
              >
                <FaPlus className="mr-2" /> Novo Conteúdo
              </ActionButton>

              {contents.map(content => (
                <ContentContainer key={content.id}>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h4 className="font-semibold">
                        {content.type === 'explanation' ? 'Explicação' :
                         content.type === 'example' ? 'Exemplo' :
                         content.type === 'solved-exercises' ? 'Exercícios Resolvidos' :
                         'Lista de Exercícios'}
                      </h4>
                    </div>
                    <div className="flex space-x-2">
                      <ActionButton 
                        $variant="edit"
                        onClick={() => handleEditContent(content)}
                      >
                        <FaEdit />
                      </ActionButton>
                      <ActionButton 
                        $variant="delete"
                        onClick={() => handleDeleteContent(content.id!)}
                      >
                        <FaTrash />
                      </ActionButton>
                    </div>
                  </div>
                  <p className="text-sm">{content.content}</p>
                </ContentContainer>
              ))}
            </StageContainer>
          );
        })}
      </div>
    );
  };

  // Render Sequence List
  const renderSequenceList = () => (
    <SequenceListContainer>
      <SequenceHeader>
        <h2 className="text-xl font-semibold">Sequências Didáticas</h2>
        <ActionButton 
          as="button" 
          onClick={handleAddSequence}
          style={{ 
            backgroundColor: 'var(--color-success)', 
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--border-radius-md)'
          }}
        >
          <FaPlus className="mr-2" /> Nova Sequência
        </ActionButton>
      </SequenceHeader>
      
      <SequenceList>
        {didacticSequences.map(sequence => (
          <div key={sequence.id}>
            <SequenceItem>
              <div>
                <h3 className="font-semibold">{sequence.title}</h3>
                <p className="text-sm text-gray-600">{sequence.description}</p>
                <p className="text-xs text-gray-500">{sequence.grade}</p>
              </div>
              <div className="flex space-x-2">
                <ActionButton 
                  $variant="edit"
                  onClick={() => handleEditSequence(sequence)}
                >
                  <FaEdit />
                </ActionButton>
                <ActionButton 
                  $variant="delete"
                  onClick={() => handleDeleteSequence(sequence.id!)}
                >
                  <FaTrash />
                </ActionButton>
              </div>
            </SequenceItem>
            {renderSequenceDetails(sequence)}
          </div>
        ))}
      </SequenceList>
    </SequenceListContainer>
  );

  // Render Discipline Selector
  const renderDisciplineSelector = () => (
    <DisciplineSelectorContainer>
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FaBook className="mr-2 text-blue-600" /> Selecione uma Disciplina
      </h2>
      <DisciplineGrid>
        {disciplines.map(discipline => (
          <DisciplineButton
            key={discipline.id}
            $isSelected={selectedDiscipline === discipline.id}
            onClick={() => handleDisciplineSelect(discipline.id)}
          >
            {discipline.name}
          </DisciplineButton>
        ))}
      </DisciplineGrid>
    </DisciplineSelectorContainer>
  );

  // Render Feedback
  const renderFeedback = () => {
    if (!feedback) return null;

    const icons = {
      success: <FaCheckCircle />,
      warning: <FaExclamationTriangle />,
      error: <FaExclamationTriangle />
    };

    return (
      <Feedback $type={feedback.type!}>
        {icons[feedback.type!]}
        {feedback.message}
      </Feedback>
    );
  };

  // Rest of the render method remains the same as in the previous implementation
  return (
    <PageContainer>
      <Header>
        <h1>Sequências Didáticas</h1>
        <p>Gerencie suas sequências didáticas por disciplina</p>
      </Header>

      {renderFeedback()}
      {renderDisciplineSelector()}
      
      {selectedDiscipline && renderSequenceList()}
      {renderSequenceModal()}
      {renderStageModal()}
      {renderContentModal()}
    </PageContainer>
  );
};

export default DidacticSequencesPage;