import React, { useState, useEffect, useRef } from 'react';
import { 
  FaPlus, FaTrashAlt, FaSortUp, FaSortDown, FaGripLines, 
  FaSave, FaExclamationTriangle, FaTimes, FaImage, FaUpload 
} from 'react-icons/fa';

import { Alternative, Content, Question, Topic } from '../../../utils/types/Question';

import { Flex } from '../../../styles/layoutUtils';
import { FormGroup } from '../../../styles/formControls';
import { Input, Label, Select, TextArea } from '../../../styles/inputs';
import { Button, CancelButton, CloseButton, PrimaryActionButton } from '../../../styles/buttons';
import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader } from '../../../styles/modals';

import {
  AlternativeActions,
  AlternativeContent,
  AlternativeItem,
  AlternativesContainer,
  CorrectBadge,
  DragHandle,
  RadioWrapper,
  StatusToggle,
  ValidationError,
  TwoColumnLayout,
  Column,
  SectionTitle,
  ImagePreviewContainer,
  ImagePreview,
  ImageUploadContainer,
  RemoveImageButton,
  FormCard,
} from './styles';

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question?: Question;
  topics: Topic[];
  contents: Content[];
  onSave: (question: Question) => void;
}
const QuestionModal: React.FC<QuestionModalProps> = ({
  isOpen,
  onClose,
  question,
  topics,
  contents,
  onSave
}) => {
  const isEditMode = !!question?.id;
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Estado do formulário
  const [formData, setFormData] = useState<Question>({
    contentId: '',
    statement: '',
    questionType: 'multiple_choice',
    difficultyLevel: 'medium',
    alternatives: [],
    explanation: '',
    status: 'active',
    imageUrl: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: question?.id || Date.now().toString()
  });
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [filteredContents, setFilteredContents] = useState<Content[]>([]);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  // Inicializar formulário com dados da questão se estiver em modo de edição
  useEffect(() => {
    if (question) {
      setFormData(question);
      // Configurar imagem se existir
      if (question.imageUrl) {
        setImagePreview(question.imageUrl);
      }
      // Localizar o tópico baseado no conteúdo
      if (question.contentId) {
        const content = contents.find(c => c.id === question.contentId);
        if (content) {
          setSelectedTopicId(content.topicId);
          setFilteredContents(contents.filter(c => c.topicId === content.topicId));
        }
      }
    } else {
      // Reset para valores padrão em modo de criação
      setFormData({
        contentId: '',
        statement: '',
        questionType: 'multiple_choice',
        difficultyLevel: 'medium',
        alternatives: [],
        explanation: '',
        status: 'active',
        imageUrl: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: Date.now().toString()
      });
      setSelectedTopicId('');
      setFilteredContents([]);
      setImageFile(null);
      setImagePreview('');
    }
    // Resetar erros de validação
    setValidationErrors({});
    setIsSubmitting(false);
  }, [question, contents, isOpen]);
  // Filtrar conteúdos com base no tópico selecionado
  useEffect(() => {
    if (selectedTopicId) {
      setFilteredContents(contents.filter(content => content.topicId === selectedTopicId));
    } else {
      setFilteredContents([]);
    }
  }, [selectedTopicId, contents]);
  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Remover erro de validação quando o campo é alterado
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
    // Caso especial para quando o tipo de questão muda
    if (name === 'questionType') {
      let alternatives: Alternative[] = [];
      switch (value) {
        case 'true_false':
          alternatives = [
            { id: Date.now().toString() + '-1', text: 'Verdadeiro', isCorrect: true },
            { id: Date.now().toString() + '-2', text: 'Falso', isCorrect: false }
          ];
          break;
        case 'multiple_choice':
          if (formData.alternatives.length === 0) {
            alternatives = [
              { id: Date.now().toString(), text: '', isCorrect: true }
            ];
          } else {
            alternatives = formData.alternatives;
          }
          break;
        case 'essay':
          // Questões dissertativas não possuem alternativas
          alternatives = [];
          break;
      }
      
      setFormData(prev => ({
        ...prev,
        alternatives
      }));
    }
  };
  
  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const topicId = e.target.value;
    setSelectedTopicId(topicId);
    
    // Reset do conteúdo selecionado quando mudar o tópico
    setFormData(prev => ({
      ...prev,
      contentId: ''
    }));
    
    // Remover erro de validação
    if (validationErrors.contentId) {
      setValidationErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.contentId;
        return newErrors;
      });
    }
  };
  
  const handleAddAlternative = () => {
    setFormData(prev => ({
      ...prev,
      alternatives: [
        ...prev.alternatives,
        { id: Date.now().toString(), text: '', isCorrect: false }
      ]
    }));
  };
  
  const handleRemoveAlternative = (id: string) => {
    setFormData(prev => {
      // Não permitir remover todas as alternativas para questões de múltipla escolha
      if (prev.questionType === 'multiple_choice' && prev.alternatives.length <= 1) {
        return prev;
      }
      
      // Ajustar isCorrect caso a alternativa correta seja removida
      const isRemovingCorrect = prev.alternatives.find(alt => alt.id === id)?.isCorrect;
      let updatedAlternatives = prev.alternatives.filter(alt => alt.id !== id);
      
      if (isRemovingCorrect && updatedAlternatives.length > 0 && prev.questionType === 'multiple_choice') {
        updatedAlternatives[0].isCorrect = true;
      }
      
      return {
        ...prev,
        alternatives: updatedAlternatives
      };
    });
  };
  
  const handleAlternativeChange = (id: string, text: string) => {
    setFormData(prev => ({
      ...prev,
      alternatives: prev.alternatives.map(alt => 
        alt.id === id ? { ...alt, text } : alt
      )
    }));
    
    // Remover erro de validação para alternativas
    if (validationErrors.alternatives) {
      setValidationErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.alternatives;
        return newErrors;
      });
    }
  };
  
  const handleCorrectChange = (id: string) => {
    setFormData(prev => ({
      ...prev,
      alternatives: prev.alternatives.map(alt => ({
        ...alt,
        isCorrect: alt.id === id
      }))
    }));
  };
  
  const handleMoveAlternative = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= formData.alternatives.length) return;
    
    const newAlternatives = [...formData.alternatives];
    const temp = newAlternatives[index];
    newAlternatives[index] = newAlternatives[newIndex];
    newAlternatives[newIndex] = temp;
    
    setFormData(prev => ({
      ...prev,
      alternatives: newAlternatives
    }));
  };
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.value as 'active' | 'inactive';
    setFormData(prev => ({
      ...prev,
      status
    }));
  };
  
  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files && files.length > 0) {
      const file = files[0];
      
      // Verificar tipo da imagem
      if (!file.type.match('image.*')) {
        setValidationErrors(prev => ({
          ...prev,
          image: 'O arquivo selecionado não é uma imagem válida'
        }));
        return;
      }
      
      // Limite de tamanho (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setValidationErrors(prev => ({
          ...prev,
          image: 'A imagem deve ter no máximo 5MB'
        }));
        return;
      }
      
      setImageFile(file);
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setImagePreview(e.target.result);
          
          // Em um ambiente real, você enviaria a imagem para um servidor
          // e atualizaria o formData com a URL da imagem após o upload
          setFormData(prev => ({
            ...prev,
            imageUrl: e.target?.result as string // Na prática, seria a URL do servidor
          }));
        }
      };
      reader.readAsDataURL(file);
      
      // Remover erro de validação
      if (validationErrors.image) {
        setValidationErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.image;
          return newErrors;
        });
      }
    }
  };
  
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    setFormData(prev => ({
      ...prev,
      imageUrl: ''
    }));
  };
  
  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!selectedTopicId) {
      errors.topicId = 'Selecione um tópico';
    }
    
    if (!formData.contentId) {
      errors.contentId = 'Selecione um conteúdo';
    }
    
    if (!formData.statement.trim()) {
      errors.statement = 'O enunciado da questão é obrigatório';
    }
    
    if (formData.questionType !== 'essay') {
      const hasEmptyAlternative = formData.alternatives.some(alt => !alt.text.trim());
      const hasCorrectAlternative = formData.alternatives.some(alt => alt.isCorrect);
      
      if (hasEmptyAlternative) {
        errors.alternatives = 'Todas as alternativas devem ter texto';
      }
      
      if (!hasCorrectAlternative) {
        errors.correctAlternative = 'Selecione uma alternativa correta';
      }
      
      if (formData.alternatives.length < 2 && formData.questionType === 'multiple_choice') {
        errors.alternativesCount = 'Adicione pelo menos duas alternativas';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Em um ambiente real, você primeiro enviaria a imagem para um servidor
      // e depois atualizaria o formData com a URL da imagem antes de salvar a questão
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar questão:', error);
      // Adicionar tratamento de erro se necessário
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }
  if (!isOpen) return null;
  return (
    <ModalContainer onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <ModalContent style={{ maxWidth: '1000px', width: '95%' }}>
        <ModalHeader>
          <h3>{isEditMode ? 'Editar Questão' : 'Nova Questão'}</h3>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <form onSubmit={handleSubmit} id="questionForm">
            <TwoColumnLayout>
              <Column>
                <FormCard>
                  <SectionTitle>
                    <FaGripLines style={{ marginRight: '8px' }} />
                    Classificação
                  </SectionTitle>
                  
                  <FormGroup>
                    <Label htmlFor="topic">Tópico</Label>
                    <Select 
                      id="topic" 
                      value={selectedTopicId} 
                      onChange={handleTopicChange}
                    >
                      <option value="">Selecione um tópico</option>
                      {topics.map(topic => (
                        <option key={topic.id} value={topic.id}>
                          {topic.name}
                        </option>
                      ))}
                    </Select>
                    {validationErrors.topicId && (
                      <ValidationError>
                        <FaExclamationTriangle /> {validationErrors.topicId}
                      </ValidationError>
                    )}
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="contentId">Conteúdo</Label>
                    <Select 
                      id="contentId" 
                      name="contentId" 
                      value={formData.contentId} 
                      onChange={handleChange}
                      disabled={!selectedTopicId}
                    >
                      <option value="">Selecione um conteúdo</option>
                      {filteredContents.map(content => (
                        <option key={content.id} value={content.id}>
                          {content.name}
                        </option>
                      ))}
                    </Select>
                    {validationErrors.contentId && (
                      <ValidationError>
                        <FaExclamationTriangle /> {validationErrors.contentId}
                      </ValidationError>
                    )}
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="questionType">Tipo de Questão</Label>
                    <Select 
                      id="questionType" 
                      name="questionType" 
                      value={formData.questionType} 
                      onChange={handleChange}
                    >
                      <option value="multiple_choice">Múltipla Escolha</option>
                      <option value="true_false">Verdadeiro/Falso</option>
                      <option value="essay">Dissertativa</option>
                    </Select>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Nível de Dificuldade</Label>
                    <Flex gap="md">
                      <RadioWrapper>
                        <input 
                          type="radio" 
                          id="easy" 
                          name="difficultyLevel" 
                          value="easy"
                          checked={formData.difficultyLevel === 'easy'}
                          onChange={handleChange}
                        />
                        <label htmlFor="easy">Fácil</label>
                      </RadioWrapper>
                      
                      <RadioWrapper>
                        <input 
                          type="radio" 
                          id="medium" 
                          name="difficultyLevel" 
                          value="medium"
                          checked={formData.difficultyLevel === 'medium'}
                          onChange={handleChange}
                        />
                        <label htmlFor="medium">Médio</label>
                      </RadioWrapper>
                      
                      <RadioWrapper>
                        <input 
                          type="radio" 
                          id="hard" 
                          name="difficultyLevel" 
                          value="hard"
                          checked={formData.difficultyLevel === 'hard'}
                          onChange={handleChange}
                        />
                        <label htmlFor="hard">Difícil</label>
                      </RadioWrapper>
                    </Flex>
                  </FormGroup>
                  
                  <StatusToggle>
                    <Label>Status da questão:</Label>
                    
                    <RadioWrapper>
                      <input 
                        type="radio" 
                        id="active" 
                        name="status" 
                        value="active"
                        checked={formData.status === 'active'}
                        onChange={handleStatusChange}
                      />
                      <label htmlFor="active">Ativa</label>
                    </RadioWrapper>
                    
                    <RadioWrapper>
                      <input 
                        type="radio" 
                        id="inactive" 
                        name="status" 
                        value="inactive"
                        checked={formData.status === 'inactive'}
                        onChange={handleStatusChange}
                      />
                      <label htmlFor="inactive">Inativa</label>
                    </RadioWrapper>
                  </StatusToggle>
                </FormCard>
                
                <FormCard>
                  <SectionTitle>
                    <FaImage style={{ marginRight: '8px' }} />
                    Imagem da Questão
                  </SectionTitle>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  
                  {!imagePreview ? (
                    <ImageUploadContainer onClick={handleImageUploadClick}>
                      <FaUpload size={24} />
                      <p>Clique para adicionar uma imagem</p>
                      <small>Formatos aceitos: JPG, PNG, GIF (máx. 5MB)</small>
                    </ImageUploadContainer>
                  ) : (
                    <ImagePreviewContainer>
                      <ImagePreview src={imagePreview} alt="Preview da imagem" />
                      <RemoveImageButton onClick={handleRemoveImage}>
                        <FaTrashAlt /> Remover imagem
                      </RemoveImageButton>
                    </ImagePreviewContainer>
                  )}
                  
                  {validationErrors.image && (
                    <ValidationError>
                      <FaExclamationTriangle /> {validationErrors.image}
                    </ValidationError>
                  )}
                </FormCard>
              </Column>
              
              <Column>
                <FormCard>
                  <SectionTitle>
                    <FaGripLines style={{ marginRight: '8px' }} />
                    Enunciado
                  </SectionTitle>
                  
                  <FormGroup>
                    <TextArea 
                      id="statement" 
                      name="statement" 
                      value={formData.statement} 
                      onChange={handleChange}
                      rows={5}
                      placeholder="Digite o enunciado da questão aqui..."
                    />
                    {validationErrors.statement && (
                      <ValidationError>
                        <FaExclamationTriangle /> {validationErrors.statement}
                      </ValidationError>
                    )}
                  </FormGroup>
                </FormCard>
                
                {formData.questionType !== 'essay' && (
                  <FormCard>
                    <SectionTitle>
                      <FaGripLines style={{ marginRight: '8px' }} />
                      Alternativas
                    </SectionTitle>
                    
                    {validationErrors.alternativesCount && (
                      <ValidationError>
                        <FaExclamationTriangle /> {validationErrors.alternativesCount}
                      </ValidationError>
                    )}
                    
                    {validationErrors.correctAlternative && (
                      <ValidationError>
                        <FaExclamationTriangle /> {validationErrors.correctAlternative}
                      </ValidationError>
                    )}
                    
                    {validationErrors.alternatives && (
                      <ValidationError>
                        <FaExclamationTriangle /> {validationErrors.alternatives}
                      </ValidationError>
                    )}
                    
                    <AlternativesContainer>
                      {formData.alternatives.map((alternative, index) => (
                        <AlternativeItem 
                          key={alternative.id} 
                          className={alternative.isCorrect ? 'correct' : ''}
                        >
                          <DragHandle>
                            <FaGripLines />
                          </DragHandle>
                          
                          <AlternativeContent>
                            <Input 
                              type="text"
                              value={alternative.text}
                              onChange={(e) => handleAlternativeChange(alternative.id, e.target.value)}
                              placeholder="Digite o texto da alternativa"
                            />
                          </AlternativeContent>
                          
                          <AlternativeActions>
                            {formData.questionType === 'multiple_choice' && (
                              <Button 
                                title="Marcar como correta"
                                onClick={() => handleCorrectChange(alternative.id)}
                              >
                                {alternative.isCorrect ? (
                                  <CorrectBadge>Correta</CorrectBadge>
                                ) : (
                                  "Marcar Correta"
                                )}
                              </Button>
                            )}
                            
                            <Button 
                              title="Mover para cima"
                              onClick={() => handleMoveAlternative(index, 'up')}
                              disabled={index === 0}
                            >
                              <FaSortUp />
                            </Button>
                            
                            <Button 
                              title="Mover para baixo"
                              onClick={() => handleMoveAlternative(index, 'down')}
                              disabled={index === formData.alternatives.length - 1}
                            >
                              <FaSortDown />
                            </Button>
                            
                            <Button 
                              title="Remover alternativa"
                              onClick={() => handleRemoveAlternative(alternative.id)}
                              disabled={formData.questionType === 'multiple_choice' && formData.alternatives.length <= 1}
                            >
                              <FaTrashAlt />
                            </Button>
                          </AlternativeActions>
                        </AlternativeItem>
                      ))}
                    </AlternativesContainer>
                    
                    <Flex justify="end" style={{ margin: '1rem 0 0 0' }}>
                      <Button onClick={handleAddAlternative}>
                        <FaPlus /> Adicionar Alternativa
                      </Button>
                    </Flex>
                  </FormCard>
                )}
                
                <FormCard>
                  <SectionTitle>
                    <FaGripLines style={{ marginRight: '8px' }} />
                    Feedback
                  </SectionTitle>
                  
                  <FormGroup>
                    <TextArea 
                      id="explanation" 
                      name="explanation" 
                      value={formData.explanation} 
                      onChange={handleChange}
                      rows={3}
                      placeholder="Explicação que será mostrada após o aluno responder a questão"
                    />
                  </FormGroup>
                </FormCard>
              </Column>
            </TwoColumnLayout>
          </form>
        </ModalBody>
        
        <ModalFooter>
          <CancelButton onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </CancelButton>
          <PrimaryActionButton 
            form="questionForm" 
            type="submit"
            disabled={isSubmitting}
          >
            <FaSave /> {isSubmitting ? 'Salvando...' : isEditMode ? 'Atualizar' : 'Salvar'}
          </PrimaryActionButton>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  );
};
export default QuestionModal;