import React, { useState } from 'react';

import { FaPlus, FaTrash, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

import { Variable } from '../../types/evaluation/Question';

import { EmptyStateMessage, TableCell, TableHeader, TableRow } from '../../styles/table';
import { Flex } from '../../styles/layoutUtils';
import { FormGroup, Label } from '../../styles/formControls';
import { Button, IconButton } from '../../styles/buttons';
import { Input } from '../../styles/inputs';
import { RequiredVariableIndicator, VariableContainer, VariableForm, VariableTable } from './VariableManagerStyles';

interface VariableManagerProps {
  variables: Variable[];
  onUpdateVariables: (variables: Variable[]) => void;
  equationVariables: string[]; // Variáveis das equações selecionadas
}

// Componente Principal
const VariableManager: React.FC<VariableManagerProps> = ({ 
  variables, 
  onUpdateVariables,
  equationVariables
}) => {
  // Estado para o formulário de nova variável
  const [isAddingVariable, setIsAddingVariable] = useState(false);
  const [editingVariableIndex, setEditingVariableIndex] = useState<number | null>(null);
  
  // Estado para a nova variável ou variável em edição
  const [variableForm, setVariableForm] = useState<Variable>({
    name: '',
    min: 1,
    max: 10,
    unit: '',
    precision: 2,
  });
  
  // Manipuladores
  const handleAddVariable = () => {
    setIsAddingVariable(true);
    setVariableForm({
      name: '',
      min: 1,
      max: 10,
      unit: '',
      precision: 2,
    });
  };
  
  const handleEditVariable = (index: number) => {
    setEditingVariableIndex(index);
    setVariableForm({...variables[index]});
  };
  
  const handleDeleteVariable = (index: number) => {
    const updatedVariables = [...variables];
    updatedVariables.splice(index, 1);
    onUpdateVariables(updatedVariables);
  };
  
  const handleSaveVariable = () => {
    if (!variableForm.name.trim()) {
      alert('O nome da variável é obrigatório');
      return;
    }
    
    // Validação para garantir que min < max
    if (variableForm.min >= variableForm.max) {
      alert('O valor mínimo deve ser menor que o valor máximo');
      return;
    }
    
    const updatedVariables = [...variables];
    
    if (editingVariableIndex !== null) {
      // Editando variável existente
      updatedVariables[editingVariableIndex] = variableForm;
    } else {
      // Adicionando nova variável
      // Verifica se a variável já existe
      if (variables.some(v => v.name === variableForm.name)) {
        alert(`A variável ${variableForm.name} já existe`);
        return;
      }
      updatedVariables.push(variableForm);
    }
    
    onUpdateVariables(updatedVariables);
    resetForm();
  };
  
  const resetForm = () => {
    setIsAddingVariable(false);
    setEditingVariableIndex(null);
    setVariableForm({
      name: '',
      min: 1,
      max: 10,
      unit: '',
      precision: 2,
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Para campos numéricos, converte o valor para número
    if (['min', 'max', 'precision'].includes(name)) {
      setVariableForm({
        ...variableForm,
        [name]: parseFloat(value)
      });
    } else {
      setVariableForm({
        ...variableForm,
        [name]: value
      });
    }
  };
  
  // Verifica se uma variável é obrigatória (está presente nas equações)
  const isRequiredVariable = (name: string) => {
    return equationVariables.includes(name);
  };
  
  return (
    <VariableContainer>
      <h3>Gerenciamento de Variáveis</h3>
      
      {(isAddingVariable || editingVariableIndex !== null) && (
        <VariableForm>
          <h4>{editingVariableIndex !== null ? 'Editar Variável' : 'Adicionar Variável'}</h4>
          
          <Flex gap="md" wrap={true}>
            <FormGroup>
              <Label htmlFor="name">Nome da Variável</Label>
              <Input
                id="name"
                name="name"
                value={variableForm.name}
                onChange={handleInputChange}
                placeholder="Ex: velocidade, massa, etc."
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="unit">Unidade</Label>
              <Input
                id="unit"
                name="unit"
                value={variableForm.unit}
                onChange={handleInputChange}
                placeholder="Ex: m/s, kg, etc."
              />
            </FormGroup>
          </Flex>
          
          <Flex gap="md" wrap={true}>
            <FormGroup>
              <Label htmlFor="min">Valor Mínimo</Label>
              <Input
                id="min"
                name="min"
                type="number"
                value={variableForm.min}
                onChange={handleInputChange}
                step="0.1"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="max">Valor Máximo</Label>
              <Input
                id="max"
                name="max"
                type="number"
                value={variableForm.max}
                onChange={handleInputChange}
                step="0.1"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="precision">Precisão Decimal</Label>
              <Input
                id="precision"
                name="precision"
                type="number"
                value={variableForm.precision}
                onChange={handleInputChange}
                min="0"
                max="10"
                step="1"
              />
            </FormGroup>
          </Flex>
          
          <Flex justify="end" gap="sm">
            <Button variant="secondary" onClick={resetForm}>
              <FaTimes /> Cancelar
            </Button>
            <Button variant="primary" onClick={handleSaveVariable}>
              <FaSave /> Salvar
            </Button>
          </Flex>
        </VariableForm>
      )}
      
      {!isAddingVariable && editingVariableIndex === null && (
        <Button variant="primary" onClick={handleAddVariable}>
          <FaPlus /> Adicionar Variável
        </Button>
      )}
      
      {variables.length > 0 ? (
        <VariableTable>
          <thead>
            <tr>
              <TableHeader>Nome</TableHeader>
              <TableHeader>Unidade</TableHeader>
              <TableHeader>Mínimo</TableHeader>
              <TableHeader>Máximo</TableHeader>
              <TableHeader>Precisão</TableHeader>
              <TableHeader>Ações</TableHeader>
            </tr>
          </thead>
          <tbody>
            {variables.map((variable, index) => (
              <TableRow key={index}>
                <TableCell>
                  {variable.name}
                  {isRequiredVariable(variable.name) && (
                    <RequiredVariableIndicator title="Variável obrigatória (usada em equações)">*</RequiredVariableIndicator>
                  )}
                </TableCell>
                <TableCell>{variable.unit}</TableCell>
                <TableCell>{variable.min}</TableCell>
                <TableCell>{variable.max}</TableCell>
                <TableCell>{variable.precision}</TableCell>
                <TableCell>
                  <Flex justify="center" gap="sm">
                    <IconButton onClick={() => handleEditVariable(index)}>
                      <FaEdit />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDeleteVariable(index)}
                      disabled={isRequiredVariable(variable.name)}
                      title={isRequiredVariable(variable.name) ? 
                        "Esta variável não pode ser excluída pois é usada em uma equação" : 
                        "Excluir variável"}
                    >
                      <FaTrash />
                    </IconButton>
                  </Flex>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </VariableTable>
      ) : (
        <EmptyStateMessage>
          Nenhuma variável adicionada. Adicione variáveis para criar questões dinâmicas.
        </EmptyStateMessage>
      )}
    </VariableContainer>
  );
};

export default VariableManager;