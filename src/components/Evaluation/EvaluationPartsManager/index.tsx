import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";

import { EvaluationPart } from "../../../utils/types/AssessmentEvaluation";

import { Table, TableHeader, TableRow, Td, EmptyStateMessage } from "../../../styles/table";
import { Input, Label } from "../../../styles/inputs";
import { Button, ActionButton } from "../../../styles/buttons";
import { ButtonGroup, CancelButtonStyled, CloseButtonStyled, CriteriaSectionContainer, EmptyState, ErrorMessage, FeedbackContainer, FormGroup, ModalContent, ModalHeader, ModalOverlay, SectionHeader, SuccessMessage, WeightSummaryContainer, WeightWarning } from "./styles";


// Interface para componente EditableRow
interface EditableRowProps {
  part: EvaluationPart;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (updatedPart: EvaluationPart) => void;
  onCancel: () => void;
  onDelete: () => void;
}

// Componente de linha editável
const EditableRow: React.FC<EditableRowProps> = ({ 
  part, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  onDelete 
}) => {
  const [editData, setEditData] = useState<EvaluationPart>({ ...part });

  useEffect(() => {
    setEditData({ ...part });
  }, [part, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ 
      ...prev, 
      [name]: name === 'weight' || name === 'maxScore' ? Number(value) : value 
    }));
  };

  if (isEditing) {
    return (
      <TableRow>
        <Td>
          <Input
            type="text"
            name="name"
            value={editData.name}
            onChange={handleInputChange}
            placeholder="Nome do critério"
          />
        </Td>
        <Td>
          <Input
            type="number"
            name="weight"
            min="0"
            max="100"
            value={editData.weight}
            onChange={handleInputChange}
            placeholder="Peso (%)"
          />
        </Td>
        <Td>
          <Input
            type="number"
            name="maxScore"
            min="0"
            value={editData.maxScore}
            onChange={handleInputChange}
            placeholder="Nota máxima"
          />
        </Td>
        <Td className="actions">
          <Button 
            variant="success" 
            onClick={() => onSave(editData)}
            title="Salvar alterações"
          >
            <FaSave /> Salvar
          </Button>
          <Button 
            variant="secondary" 
            onClick={onCancel}
            title="Cancelar edição"
          >
            <FaTimes /> Cancelar
          </Button>
        </Td>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <Td>{part.name}</Td>
      <Td>{part.weight}%</Td>
      <Td>{part.maxScore}</Td>
      <Td className="actions">
        <Button 
          variant="info" 
          onClick={onEdit}
          title="Editar critério"
        >
          <FaEdit />
        </Button>
        <Button 
          variant="error" 
          onClick={onDelete}
          title="Remover critério"
        >
          <FaTrash />
        </Button>
      </Td>
    </TableRow>
  );
};

// Modal de adição/edição de critério
const CriteriaFormModal: React.FC<{ 
  isOpen: boolean;
  title: string;
  initialData: EvaluationPart;
  onClose: () => void;
  onSave: (part: EvaluationPart) => void;
  error?: string;
}> = ({ isOpen, title, initialData, onClose, onSave, error }) => {
  const [formData, setFormData] = useState<EvaluationPart>({ ...initialData });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData({ ...initialData });
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'weight' || name === 'maxScore' ? Number(value) : value 
    }));
    
    // Limpar erro do campo quando o usuário digita
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Nome do critério é obrigatório';
    }
    
    if (formData.weight < 0 || formData.weight > 100) {
      errors.weight = 'Peso deve estar entre 0 e 100';
    }
    
    if (formData.maxScore <= 0) {
      errors.maxScore = 'Nota máxima deve ser maior que zero';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    try {
      await onSave(formData);
      setFormData({ id: '', name: '', weight: 0, maxScore: 10 });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>{title}</h2>
          <CloseButtonStyled onClick={onClose} aria-label="Fechar">
            <FaTimes />
          </CloseButtonStyled>
        </ModalHeader>

        <FormGroup>
          <Label htmlFor="name">Nome do Critério</Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ex: Apresentação, Conteúdo, Metodologia"
          />
          {formErrors.name && <ErrorMessage>{formErrors.name}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="weight">Peso (%)</Label>
          <Input
            id="weight"
            type="number"
            name="weight"
            min="0"
            max="100"
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="Peso em porcentagem (0-100)"
          />
          {formErrors.weight && <ErrorMessage>{formErrors.weight}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="maxScore">Nota Máxima</Label>
          <Input
            id="maxScore"
            type="number"
            name="maxScore"
            min="1"
            value={formData.maxScore}
            onChange={handleInputChange}
            placeholder="Ex: 10, 100, etc."
          />
          {formErrors.maxScore && <ErrorMessage>{formErrors.maxScore}</ErrorMessage>}
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonGroup>
          <ActionButton 
            onClick={handleSave} 
            disabled={isSaving}
          >
            {isSaving ? 'Salvando...' : 'Salvar Critério'}
          </ActionButton>
          <CancelButtonStyled onClick={onClose}>
            Cancelar
          </CancelButtonStyled>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

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

// Componente para mostrar o resumo de peso total
const WeightSummary: React.FC<{ weight: number }> = ({ weight }) => {
  const isValid = weight === 100;
  
  return (
    <WeightSummaryContainer isValid={isValid}>
      <div>
        <strong>Peso Total:</strong> {weight}%
      </div>
      {!isValid && (
        <WeightWarning>
          {weight < 100 
            ? `Faltam ${100 - weight}% para completar 100%` 
            : `Excede em ${weight - 100}% o limite de 100%`}
        </WeightWarning>
      )}
    </WeightSummaryContainer>
  );
};

export default EvaluationCriteriaSection;