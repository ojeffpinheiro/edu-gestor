import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import useModal from '../../utils/useModal';
import { ActionButton } from '../../styles/buttons';
import Modal from './Modal';
import { ErrorMessage, SuccessMessage } from '../../styles/errorMessages';
import { FormGroup } from '../../styles/formControls';
import { Input, Label, Select, TextArea } from '../../styles/inputs';

interface FormData {
  title: string;
  description: string;
  type: string;
  deadline: string;
}

const initialFormData: FormData = {
  title: '',
  description: '',
  type: 'quiz',
  deadline: ''
};

/**
 * Exemplo de uso do componente Modal com um formulário
 */
const FormExample: React.FC = () => {
  const { isOpen, modalData, openModal, closeModal } = useModal();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Abre o modal para criar um novo item
   */
  const handleCreate = () => {
    setFormData(initialFormData);
    setErrors({});
    openModal({ mode: 'create' });
  };

  /**
   * Abre o modal para editar um item existente
   */
  const handleEdit = (item: any) => {
    setFormData({
      title: item.title,
      description: item.description,
      type: item.type,
      deadline: item.deadline
    });
    setErrors({});
    openModal({ mode: 'edit', id: item.id });
  };

  /**
   * Manipula a mudança nos campos do formulário
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpa o erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Valida o formulário antes do envio
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'O título é obrigatório';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'A descrição é obrigatória';
    }
    
    if (!formData.deadline) {
      newErrors.deadline = 'O prazo é obrigatório';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Envia o formulário após validação
   */
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simula uma requisição assíncrona
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simula a resposta do servidor
      console.log('Dados enviados:', formData);
      
      // Exibe mensagem de sucesso
      setSuccess(
        modalData?.mode === 'create' 
          ? 'Item criado com sucesso!' 
          : 'Item atualizado com sucesso!'
      );
      
      // Fecha o modal após alguns segundos
      setTimeout(() => {
        closeModal();
        setSuccess(null);
      }, 2000);
      
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      setErrors({ submit: 'Ocorreu um erro ao processar sua solicitação. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="button-group">
        <ActionButton onClick={handleCreate}>
          <FaPlus /> Novo Item
        </ActionButton>
      </div>

      <Modal
        isOpen={isOpen}
        title={modalData?.mode === 'create' ? 'Criar Novo Item' : 'Editar Item'}
        onClose={closeModal}
        onSubmit={handleSubmit}
        submitText={isSubmitting ? 'Processando...' : 'Salvar'}
        size="md"
      >
        {success && <SuccessMessage>{success}</SuccessMessage>}
        {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
        
        <FormGroup>
          <Label>
            Título <span className="required">*</span>
          </Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Digite o título"
            disabled={isSubmitting}
          />
          {errors.title && <FormErrorMessage>{errors.title}</FormErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>
            Descrição <span className="required">*</span>
          </Label>
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Digite a descrição"
            disabled={isSubmitting}
          />
          {errors.description && <FormErrorMessage>{errors.description}</FormErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Tipo</Label>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            disabled={isSubmitting}
          >
            <option value="quiz">Quiz</option>
            <option value="essay">Dissertativo</option>
            <option value="multiple_choice">Múltipla Escolha</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>
            Prazo <span className="required">*</span>
          </Label>
          <Input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.deadline && <FormErrorMessage>{errors.deadline}</FormErrorMessage>}
        </FormGroup>
      </Modal>
    </div>
  );
};

// Estilo para mensagens de erro nos campos
const FormErrorMessage = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-top: var(--space-xs);
`;

export default FormExample;