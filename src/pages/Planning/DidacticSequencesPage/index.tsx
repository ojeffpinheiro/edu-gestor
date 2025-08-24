import React, { useState, Fragment } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { useDidacticSequences } from '../../../hooks/didactic-sequence/useDidacticSequences';

import { DidacticSequence, DisciplineType } from '../../../utils/types/DidacticSequence';

import SequenceForm from '../../../components/DidacticSequences/SequenceForm';

import { Table, TableHeader, TableRow, Td } from '../../../styles/table';
import { Button } from '../../../styles/buttons';

import { 
  ActionsContainer,
  BadgeContainer,
  CodeBadge,
  EmptyState,
  ErrorMessage,
  FilterButton,
  FilterContainer,
  IconButton,
  LoadingMessage,
  PageContainer,
  PageHeader,
  StatusBadge,
  Title
} from './styled'



const DidacticSequencesPage: React.FC = () => {
  const navigate = useNavigate();
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
  
  const handleViewDetails = (sequence: DidacticSequence) => {
    // Implement view details functionality
    console.log('View details for sequence:', sequence);
    navigate('/topic-content')
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <Title>Sequências Didáticas</Title>
        {!showForm && (
          <Button onClick={handleCreateClick}>
            <FaPlus /> Nova Sequência
          </Button>
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
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>Eixo Temático</TableHeader>
                  <TableHeader>Sequência </TableHeader>
                  <TableHeader>Título</TableHeader>
                  <TableHeader>Nível de Ensino </TableHeader>
                  <TableHeader>Códigos BNCC</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Ações</TableHeader>
                </TableRow>
              </thead>

              <tbody>
                {sequences.map((sequence) => (
                  <TableRow key={sequence.id}>
                    <Td>{sequence.thematicAxis}</Td>
                    <Td>{sequence.sequence}</Td>
                    <Td>{sequence.title}</Td>
                    <Td>{sequence.educationLevel}</Td>
                    <Td>
                      <BadgeContainer>
                        {sequence.bnccCodes?.map((code, index) => (
                          <CodeBadge key={index}>{code}</CodeBadge>
                        ))}
                      </BadgeContainer>
                    </Td>
                    <Td>
                      <StatusBadge status={sequence.status || 'draft'}>
                        {sequence.status === 'draft' && 'Rascunho'}
                        {sequence.status === 'active' && 'Ativa'}
                        {sequence.status === 'completed' && 'Concluída'}
                        {!sequence.status && 'Não definido'}
                      </StatusBadge>
                    </Td>
                    <Td>
                      <ActionsContainer>
                        <IconButton 
                          className="view" 
                          onClick={() => handleViewDetails(sequence)}
                          title="Ver detalhes"
                        >
                          <FaEye size={16} />
                        </IconButton>
                        <IconButton 
                          className="edit" 
                          onClick={() => handleEdit(sequence)}
                          title="Editar"
                        >
                          <FaEdit size={16} />
                        </IconButton>
                        <IconButton 
                          className="delete" 
                          onClick={() => handleDelete(sequence.id)}
                          title="Excluir"
                        >
                          <FaTrash size={16} />
                        </IconButton>
                      </ActionsContainer>
                    </Td>
                  </TableRow>
                ))}
              </tbody>
            </Table>
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