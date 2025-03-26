import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FaBook, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

// Styled Components
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

// Types (keeping the previous types)
interface Discipline {
  id: number;
  name: string;
}

interface DidacticSequence {
  id?: number;
  disciplineId: number;
  title: string;
  description: string;
  grade: string;
}

const DidacticSequencesPage: React.FC = () => {
  // State management
  const [disciplines] = useState<Discipline[]>([
    { id: 1, name: 'Matemática' },
    { id: 2, name: 'Português' },
    { id: 3, name: 'Ciências' }
  ]);

  const [selectedDiscipline, setSelectedDiscipline] = useState<number | null>(null);
  const [didacticSequences, setDidacticSequences] = useState<DidacticSequence[]>([]);
  const [currentSequence, setCurrentSequence] = useState<DidacticSequence | null>(null);

  // Modal and form states
  const [isSequenceModalOpen, setIsSequenceModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'warning' | 'error' | null, 
    message: string
  } | null>(null);

  // Form state
  const [sequenceForm, setSequenceForm] = useState<DidacticSequence>({
    disciplineId: 0,
    title: '',
    description: '',
    grade: ''
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
        grade: '9º ano'
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
        grade: ''
      });
      setCurrentSequence(null);
      setIsSequenceModalOpen(true);
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
    
    setIsSequenceModalOpen(false);
    setCurrentSequence(null);
  };

  const handleEditSequence = (sequence: DidacticSequence) => {
    setCurrentSequence(sequence);
    setSequenceForm(sequence);
    setIsSequenceModalOpen(true);
  };

  const handleDeleteSequence = (sequenceId: number) => {
    setDidacticSequences(prev => prev.filter(seq => seq.id !== sequenceId));
    setFeedback({
      type: 'success',
      message: 'Sequência removida com sucesso!'
    });
  };

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
          <SequenceItem key={sequence.id}>
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
        ))}
      </SequenceList>
    </SequenceListContainer>
  );

  // Render Sequence Modal
  const renderSequenceModal = () => (
    <Modal $isOpen={isSequenceModalOpen}>
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
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <ActionButton 
            onClick={() => setIsSequenceModalOpen(false)}
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
    </PageContainer>
  );
};

export default DidacticSequencesPage;