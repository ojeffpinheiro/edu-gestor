import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import SequenceCard from '../../components/DidacticSequences/SequenceCard';
import SequenceForm from '../../components/DidacticSequences/SequenceForm';
import { useDidacticSequences } from '../../hooks/useDidacticSequences';
import { DidacticSequence, DisciplineType } from '../../utils/types/DidacticSequence';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 1.75rem;
  font-weight: 600;
`;

const Button = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1976d2;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.active ? '#2196f3' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#666'};
  border: 1px solid ${props => props.active ? '#2196f3' : '#ddd'};
  
  &:hover {
    background-color: ${props => props.active ? '#1976d2' : '#e0e0e0'};
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #d32f2f;
  font-size: 1rem;
  background-color: #ffebee;
  border-radius: 4px;
  margin-bottom: 2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const SequencesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DidacticSequencesPage: React.FC = () => {
  const disciplines: DisciplineType[] = ['Português', 'Matemática', 'História', 'Geografia', 'Ciências', 'Artes', 'Educação Física'];
  const [showForm, setShowForm] = useState(false);
  const [editingSequence, setEditingSequence] = useState<DidacticSequence | null>(null);
  
  const {
    sequences,
    isLoading,
    error,
    selectedDiscipline,
    filterByDiscipline,
    createSequence,
    updateSequence,
    deleteSequence,
  } = useDidacticSequences();
  
  const handleCreateClick = () => {
    setEditingSequence(null);
    setShowForm(true);
  };
  
  const handleEdit = (sequence: DidacticSequence) => {
    setEditingSequence(sequence);
    setShowForm(true);
  };
  
  const handleCancel = () => {
    setShowForm(false);
    setEditingSequence(null);
  };
  
  const handleSubmit = (data: any) => {
    if (editingSequence) {
      updateSequence({
        id: editingSequence.id,
        data
      });
    } else {
      createSequence(data);
    }
    
    setShowForm(false);
    setEditingSequence(null);
  };
  
  const handleDelete = (id: string) => {
    deleteSequence(id);
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <Title>Sequências Didáticas</Title>
        {!showForm && (
          <Button onClick={handleCreateClick}>Nova Sequência</Button>
        )}
      </PageHeader>
      
      {!showForm ? (
        <Fragment>
          <FilterContainer>
            <FilterButton
              active={selectedDiscipline === null}
              onClick={() => filterByDiscipline(null)}
            >
              Todas
            </FilterButton>
            
            {disciplines.map((discipline) => (
              <FilterButton
                key={discipline}
                active={selectedDiscipline === discipline}
                onClick={() => filterByDiscipline(discipline)}
              >
                {discipline}
              </FilterButton>
            ))}
          </FilterContainer>
          
          {isLoading && <LoadingMessage>Carregando sequências didáticas...</LoadingMessage>}
          
          {error ? (
            <ErrorMessage>
              {error instanceof Error ? error.message : 'Ocorreu um erro ao carregar as sequências didáticas. Por favor, tente novamente.'}
            </ErrorMessage>
          ) : null}
          
          {!isLoading && !error && sequences && sequences.length === 0 && (
            <EmptyState>
              <h3>Nenhuma sequência didática encontrada</h3>
              <p>Clique em "Nova Sequência" para criar sua primeira sequência didática.</p>
            </EmptyState>
          )}
          
          {!isLoading && !error && sequences && sequences.length > 0 && (
            <SequencesGrid>
              {sequences.map((sequence) => (
                <SequenceCard
                  key={sequence.id}
                  sequence={sequence}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </SequencesGrid>
          )}
        </Fragment>
      ) : (
        <SequenceForm
          initialData={editingSequence || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </PageContainer>
  );
};

export default DidacticSequencesPage;