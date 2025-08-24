import React, { useEffect, useState } from 'react'
import { EvaluationPart } from '../../../types/evaluation/AssessmentEvaluation';
import { TableRow, Td } from '../../../styles/table';
import { Input } from '../../../styles/inputs';
import { Button } from '../../../styles/buttons';
import { FaEdit, FaSave, FaTimes, FaTrash } from 'react-icons/fa';

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
export const EditableRow: React.FC<EditableRowProps> = ({ 
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

