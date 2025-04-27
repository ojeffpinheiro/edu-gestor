import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

import { EvaluationPart } from "../../../utils/types/AssessmentEvaluation";

import { WeightSummary } from "./WeightSummary";
import { EditableRow } from "./EditableRow";
import { CriteriaFormModal } from "./CriteriaFormModal";

import { Table, TableHeader, TableRow, EmptyStateMessage } from "../../../styles/table";
import { SectionHeader } from "../../../styles/modals";
import { Button } from "../../../styles/buttons";

import { CriteriaSectionContainer, EmptyState, FeedbackContainer } from "./styles";
import { ErrorMessage, SuccessMessage } from "../../../styles/feedback";

// Componente principal
const EvaluationCriteriaSection: React.FC<{
  evaluationId: string;
  parts: EvaluationPart[];
  onUpdate: (parts: EvaluationPart[]) => void;
}> = ({ evaluationId, parts, onUpdate }) => {
  const [criteriaList, setCriteriaList] = useState<EvaluationPart[]>([...parts]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPart, setCurrentPart] = useState<EvaluationPart>({ id: '', name: '', weight: 0, maxScore: 10 });
  const [formError, setFormError] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState({ type: '', text: '' });
  const [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    setCriteriaList([...parts]);
    calculateTotalWeight(parts);
  }, [parts]);

  const calculateTotalWeight = (criteria: EvaluationPart[]) => {
    const total = criteria.reduce((sum, part) => sum + part.weight, 0);
    setTotalWeight(total);
  };

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedbackMessage({ type, text });
    setTimeout(() => setFeedbackMessage({ type: '', text: '' }), 3000);
  };

  const handleAddCriteria = async (part: EvaluationPart) => {
    try {
      // Gerar ID temporário (ou poderia vir do backend)
      const newPart = { 
        ...part, 
        id: part.id || `temp-${Date.now()}` 
      };
      
      const updatedList = [...criteriaList, newPart];
      setCriteriaList(updatedList);
      onUpdate(updatedList);
      calculateTotalWeight(updatedList);
      
      setIsModalOpen(false);
      showFeedback('success', 'Critério adicionado com sucesso!');
    } catch (error) {
      setFormError('Erro ao adicionar critério. Tente novamente.');
    }
  };

  const handleEditCriteria = (id: string) => {
    setEditingId(id);
  };

  const handleSaveEdit = (id: string, updatedPart: EvaluationPart) => {
    const updatedList = criteriaList.map(part => 
      part.id === id ? { ...updatedPart, id } : part
    );
    
    setCriteriaList(updatedList);
    onUpdate(updatedList);
    calculateTotalWeight(updatedList);
    setEditingId(null);
    showFeedback('success', 'Critério atualizado com sucesso!');
  };

  const handleDeleteCriteria = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este critério de avaliação?')) {
      const updatedList = criteriaList.filter(part => part.id !== id);
      setCriteriaList(updatedList);
      onUpdate(updatedList);
      calculateTotalWeight(updatedList);
      showFeedback('success', 'Critério removido com sucesso!');
    }
  };

  const openAddModal = () => {
    setCurrentPart({ id: '', name: '', weight: 0, maxScore: 10 });
    setFormError('');
    setIsModalOpen(true);
  };

  return (
    <CriteriaSectionContainer>
      <SectionHeader>
        <h2>Critérios de Avaliação</h2>
        <Button 
          variant="primary" 
          onClick={openAddModal}
        >
          <FaPlus /> Adicionar Critério
        </Button>
      </SectionHeader>

      {feedbackMessage.text && (
        <FeedbackContainer type={feedbackMessage.type as 'success' | 'error'}>
          {feedbackMessage.type === 'success' ? (
            <SuccessMessage>{feedbackMessage.text}</SuccessMessage>
          ) : (
            <ErrorMessage>{feedbackMessage.text}</ErrorMessage>
          )}
        </FeedbackContainer>
      )}

      <WeightSummary weight={totalWeight} />

      {criteriaList.length > 0 ? (
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Nome do Critério</TableHeader>
              <TableHeader>Peso (%)</TableHeader>
              <TableHeader>Nota Máxima</TableHeader>
              <TableHeader>Ações</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {criteriaList.map((part) => (
              <EditableRow
                key={part.id}
                part={part}
                isEditing={editingId === part.id}
                onEdit={() => handleEditCriteria(part.id)}
                onSave={(updatedPart) => handleSaveEdit(part.id, updatedPart)}
                onCancel={() => setEditingId(null)}
                onDelete={() => handleDeleteCriteria(part.id)}
              />
            ))}
          </tbody>
        </Table>
      ) : (
        <EmptyState>
          <EmptyStateMessage>
            Nenhum critério de avaliação definido. Clique no botão acima para adicionar.
          </EmptyStateMessage>
        </EmptyState>
      )}

      <CriteriaFormModal
        isOpen={isModalOpen}
        title="Adicionar Novo Critério"
        initialData={currentPart}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddCriteria}
        error={formError}
      />
    </CriteriaSectionContainer>
  );
};

export default EvaluationCriteriaSection;