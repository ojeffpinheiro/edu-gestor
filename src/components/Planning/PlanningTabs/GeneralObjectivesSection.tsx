import React, { useState } from 'react';
import { GeneralObjective } from '../../../utils/types/Planning';
import styled from 'styled-components';
import { Card, CardContent } from '../../../styles/card';
import { FormGroup } from '../../../styles/formControls';
import { Button, ButtonGroup } from '../../../styles/buttons';
import { CardActions } from '../Tabs/PlanningTab/styles';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

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
                  Remover
                </Button>
              </CardActions>
            </>
          )}
              <CardContent>
                <p>{obj.description}</p>
              </CardContent>
              <CardActions>
                <Button onClick={() => onEdit(obj)}>Editar</Button>
                <Button 
                  className="danger" 
                  onClick={() => onDelete('generalObjective', obj.id)}
                >
                  <FaTrash />
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}

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
                <Button onClick={() => onAdd}>Salvar</Button>
                <Button onClick={() => setEditingId(null)}>Cancelar</Button>
              </ButtonGroup>
            </>
          ) : (
            <>
              <p>{obj.description}</p>
              <ButtonGroup>
                <Button onClick={() => handleEdit(obj)}>Editar</Button>
                <Button 
                  className="danger" 
                  onClick={() => onDelete('generalObjective', obj.id)}
                >
                  Remover
                </Button>
              </ButtonGroup>
            </>
          )}
        </Card>
      ))}
      
      <Button onClick={onAdd}>Adicionar Objetivo</Button>
    </Section>
  );
};


const Section = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export default GeneralObjectivesSection;