import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { usePlanning } from '../../../contexts/PlannerContext';

import { GeneralObjective } from '../../../utils/types/Planning';

import { Card, CardContent } from '../../../styles/card';
import { FormGroup } from '../../../styles/formControls';
import { Button, ButtonGroup } from '../../../styles/buttons';

import { CardActions } from '../Tabs/PlanningTab/styles';
import { Section } from '../../../styles/containers';

interface GeneralObjectivesProps {
  objectives: GeneralObjective[];
  onAdd: () => void;
  onEdit: (obj: GeneralObjective) => void;
  onDelete: (type: string, id: string) => void;
}

const GeneralObjectivesSection: React.FC<GeneralObjectivesProps> = ({
  objectives,
  onAdd,
  onEdit,
  onDelete
}) => {
  const { dispatch } = usePlanning();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAddObjective = () => {
    const newObjective = {
      id: Date.now().toString(),
      description: 'Novo objetivo'
    };
    dispatch({ type: 'ADD_GENERAL_OBJECTIVE', payload: newObjective });
  };

  const handleDeleteObjective = (id: string) => {
    dispatch({ type: 'DELETE_GENERAL_OBJECTIVE', payload: id });
  };

  const handleEdit = (obj: GeneralObjective) => {
    setEditingId(obj.id);
    setEditValue(obj.description);
  };

  return (
    <Section>
      <h2>Objetivos Gerais da Unidade/Trimestre</h2>
      {objectives.length === 0 ? (
        <p>Nenhum objetivo cadastrado</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {objectives.map((obj) => (
            <Card key={obj.id}>
              {editingId === obj.id ? (
                <>
                  <FormGroup>
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      rows={3}
                    />
                  </FormGroup>
                  <ButtonGroup>
                    <Button onClick={() => onAdd()}>Salvar</Button>
                    <Button onClick={() => setEditingId(null)}>Cancelar</Button>
                  </ButtonGroup>
                </>
              ) : (
                <>
                  <CardContent>
                    <p>{obj.description}</p>
                  </CardContent>
                  <CardActions>
                    <Button onClick={() => handleEdit(obj)}><FaEdit /></Button>
                    <Button
                      className="danger"
                      onClick={() => onDelete('generalObjective', obj.id)}
                    >
                      <FaTrash />
                    </Button>
                  </CardActions>
                </>
              )}
            </Card>
          ))}
          <Button onClick={onAdd}>Adicionar Objetivo</Button>
        </div>
      )}
    </Section>
  );
};

export default GeneralObjectivesSection;