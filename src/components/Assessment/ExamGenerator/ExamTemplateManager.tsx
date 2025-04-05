import React, { useState, useEffect } from 'react';

import { Button } from '../../shared/Button';
import { LoadingStates } from '../../shared/LoadingStates';
import { Notifications } from '../../shared/Notifications';
import { Exam } from '../../../utils/types/Assessment';
import examService from '../../../services/examService';

interface ExamTemplateManagerProps {
  onTemplateSelect: (template: Exam) => void;
  currentExamConfig?: Partial<Exam>;
}

const ExamTemplateManager: React.FC<ExamTemplateManagerProps> = ({
  onTemplateSelect,
  currentExamConfig
}) => {
  const [templates, setTemplates] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [templateForm, setTemplateForm] = useState<Partial<Exam>>({
    title: '',
    description: '',
    questions: [],
    classIds: [],
    totalPoints: 100,
    qrCode: '',
    barCode: '',
    password: ''
  });

  // Carregar templates existentes
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setIsLoading(true);
      const response = await examService.getAllExams();
      if (response.success) {
        const fetchedTemplates: Exam[] = (response.data ?? []).map(exam => ({
          id: exam.id,
          title: exam.title,
          description: exam.description,
          questions: exam.questions,
          classIds: exam.classIds,
          totalPoints: exam.totalPoints,
          qrCode: exam.qrCode,
          barCode: exam.barCode,
          password: exam.password,
          createdAt: exam.createdAt,
          createdBy: exam.createdBy,
          questionDistribution: exam.questionDistribution,
          useQRCode: exam.useQRCode,
          useBarCode: exam.useBarCode,
          requirePassword: exam.requirePassword,
          variants: exam.variants || []
        }));
        setTemplates(fetchedTemplates);
      }
    } catch (error) {
      setNotification({ 
        message: 'Erro ao carregar templates de prova', 
        type: 'error' 
      });
      console.error('Error fetching exam templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar templates com base no termo de busca
  const filteredTemplates = templates.filter(template => 
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Salvar um novo template
  const saveTemplate = async () => {
    try {
      setIsLoading(true);
      
      if (!templateForm.title) { // Alterado de 'name' para 'title'
        setNotification({ 
          message: 'Título do template é obrigatório', 
          type: 'error' 
        });
        return;
      }
  
      const newTemplate: Exam = {
        id: templateForm.id || crypto.randomUUID(),
        title: templateForm.title || '',
        description: templateForm.description || '',
        questions: templateForm.questions || [],
        classIds: templateForm.classIds || [],
        totalPoints: templateForm.totalPoints || 0,
        qrCode: templateForm.qrCode || '',
        barCode: templateForm.barCode || '',
        password: templateForm.password || '',
        createdAt: new Date(),
        createdBy: 'currentUser Id',
        questionDistribution: [],
        useQRCode: false,
        useBarCode: false,
        requirePassword: false,
        variants: [],
        ...templateForm
      };
  
      if (templateForm.id) {
        // Atualizar template existente
        await examService.updateExam(templateForm.id, newTemplate);
        setNotification({ 
          message: 'Template atualizado com sucesso', 
          type: 'success' 
        });
      } else {
        // Criar novo template
        const response = await examService.createExam(newTemplate);
        if (response.success && response.data) {
          setTemplates([...templates, response.data]);
        }
        setNotification({ 
          message: 'Template criado com sucesso', 
          type: 'success' 
        });
      }
      
      // Resetar o formulário
      setTemplateForm({
        title: '',
        description: '',
        questions: [],
        classIds: [],
        totalPoints: 100,
        qrCode: '',
        barCode: '',
        password: ''
      });
      
      fetchTemplates();
    } catch (error) {
      setNotification({ 
        message: 'Erro ao salvar template', 
        type: 'error' 
      });
      console.error('Error saving exam template:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Selecionar e carregar um template
  const handleSelectTemplate = (template: Exam) => {
    if (template.id) {
      setSelectedTemplate(template.id);
      onTemplateSelect(template);
    }
  };

  // Remover um template
  const handleDeleteTemplate = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (window.confirm('Tem certeza que deseja excluir este template?')) {
      try {
        setIsLoading(true);
        await examService.deleteExam(id);
        setTemplates(templates.filter(template => template.id !== id));
        setNotification({ 
          message: 'Template excluído com sucesso', 
          type: 'success' 
        });
        
        if (selectedTemplate === id) {
          setSelectedTemplate(null);
        }
      } catch (error) {
        setNotification({ 
          message: 'Erro ao excluir template', 
          type: 'error' 
        });
        console.error('Error deleting exam template:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Editar um template existente
  const handleEditTemplate = (template: Exam, event: React.MouseEvent) => {
    event.stopPropagation();
    setTemplateForm(template);
    setIsCreating(true);
  };

  // Salvar o exame atual como template
  const saveCurrentAsTemplate = () => {
    if (currentExamConfig) {
      setTemplateForm({
        ...templateForm,
        ...currentExamConfig,
        id: undefined,
        title: `${currentExamConfig.title || ''} - Cópia`,
        createdAt: undefined
      });
      setIsCreating(true);
    } else {
      setNotification({ 
        message: 'Nenhuma configuração de exame atual para salvar', 
        type: 'error' 
      });
    }
  };

  // Adicionar uma nova distribuição de questões
  const addQuestionDistribution = () => {
    setTemplateForm({
      ...templateForm,
      questionDistribution: [
        ...(templateForm.questionDistribution || []),
        { categories: [], difficulty: 'medium', count: 5 }
      ]
    });
  };

  // Atualizar uma distribuição de questões
  const updateQuestionDistribution = (index: number, field: string, value: any) => {
    if (templateForm.questionDistribution) {
      const updatedDistribution = [...templateForm.questionDistribution];
      updatedDistribution[index] = {
        ...updatedDistribution[index],
        [field]: value
      };
      
      setTemplateForm({
        ...templateForm,
        questionDistribution: updatedDistribution
      });
    }
  };

  // Remover uma distribuição de questões
  const removeQuestionDistribution = (index: number) => {
    if (templateForm.questionDistribution) {
      const updatedDistribution = [...templateForm.questionDistribution];
      updatedDistribution.splice(index, 1);
      
      setTemplateForm({
        ...templateForm,
        questionDistribution: updatedDistribution
      });
    }
  };

  return (
    <div className="exam-template-manager">
      {notification && (
        <Notifications 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
      
      <div className="template-manager-header">
        <h2>Gerenciador de Templates de Prova</h2>
        <div className="template-actions">
          <input
            type="text"
            placeholder="Buscar templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Button 
            onClick={() => setIsCreating(true)}
            disabled={isLoading}
          >
            Novo Template
          </Button>
          {currentExamConfig && (
            <Button 
              onClick={saveCurrentAsTemplate}
              disabled={isLoading}
              variant="secondary"
            >
              Salvar Atual como Template
            </Button>
          )}
        </div>
      </div>
      
      {isLoading ? (
        <LoadingStates type="spinner" text="Carregando templates..." />
      ) : (
        <>
          {isCreating ? (
            <div className="template-form">
              <h3>{templateForm.id ? 'Editar Template' : 'Novo Template'}</h3>
              
              <div className="form-group">
                <label htmlFor="templateName">Título</label>
                <input
                  id="templateName"
                  type="text"
                  value={templateForm.title || ''}
                  onChange={(e) => setTemplateForm({...templateForm, title: e.target.value})}
                  placeholder="Título"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="templateDescription">Descrição</label>
                <textarea
                  id="templateDescription"
                  value={templateForm.description || ''}
                  onChange={(e) => setTemplateForm({...templateForm, description: e.target.value})}
                  placeholder="Descrição do template"
                  rows={3}
                />
              </div>
              
              <div className="form-group">
                <label>Distribuição de Questões</label>
                {templateForm.questionDistribution && templateForm.questionDistribution.length > 0 ? (
                  <div className="distribution-list">
                    {templateForm.questionDistribution.map((dist, index) => (
                      <div key={index} className="distribution-item">
                        <div className="distribution-item-header">
                          <h4>Grupo {index + 1}</h4>
                          <button 
                            type="button" 
                            className="remove-button"
                            onClick={() => removeQuestionDistribution(index)}
                          >
                            Remover
                          </button>
                        </div>
                        
                        <div className="distribution-fields">
                          <div className="field">
                            <label>Dificuldade</label>
                            <select
                              value={dist.difficulty}
                              onChange={(e) => updateQuestionDistribution(
                                index, 
                                'difficulty', 
                                e.target.value as 'easy' | 'medium' | 'hard'
                              )}
                            >
                              <option value="easy">Fácil</option>
                              <option value="medium">Média</option>
                              <option value="hard">Difícil</option>
                            </select>
                          </div>
                          
                          <div className="field">
                            <label>Quantidade</label>
                            <input
                              type="number"
                              min="1"
                              value={dist.count}
                              onChange={(e) => updateQuestionDistribution(
                                index, 
                                'count', 
                                parseInt(e.target.value)
                              )}
                            />
                          </div>
                          
                          <div className="field categories-field">
                            <label>Categorias</label>
                            {/* Idealmente, estas categorias viriam de uma API */}
                            <div className="categories-selector">
                              {['Matemática', 'Português', 'História', 'Geografia', 'Ciências'].map(category => (
                                <label key={category} className="category-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={dist.categories.includes(category)}
                                    onChange={(e) => {
                                      const updatedCategories = e.target.checked
                                        ? [...dist.categories, category]
                                        : dist.categories.filter(c => c !== category);
                                      
                                      updateQuestionDistribution(index, 'categories', updatedCategories);
                                    }}
                                  />
                                  {category}
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Nenhuma distribuição de questões definida</p>
                )}
                
                <Button 
                  onClick={addQuestionDistribution}
                  variant="outline"
                  size="small"
                >
                  Adicionar Grupo de Questões
                </Button>
              </div>
              
              <div className="form-group">
                <label htmlFor="totalPoints">Pontuação Total</label>
                <input
                  id="totalPoints"
                  type="number"
                  min="1"
                  value={templateForm.totalPoints || 100}
                  onChange={(e) => setTemplateForm({
                    ...templateForm, 
                    totalPoints: parseInt(e.target.value)
                  })}
                />
              </div>
              
              <div className="form-group options-group">
                <div className="option">
                  <input
                    id="useQrCode"
                    type="checkbox"
                    checked={templateForm.useQRCode || false}
                    onChange={(e) => setTemplateForm({
                      ...templateForm, 
                      useQRCode: e.target.checked
                    })}
                  />
                  <label htmlFor="useQrCode">Usar QR Code</label>
                </div>
                
                <div className="option">
                  <input
                    id="useBarCode"
                    type="checkbox"
                    checked={templateForm.useBarCode || false}
                    onChange={(e) => setTemplateForm({
                      ...templateForm, 
                      useBarCode: e.target.checked
                    })}
                  />
                  <label htmlFor="useBarCode">Usar Código de Barras</label>
                </div>
                
                <div className="option">
                  <input
                    id="requirePassword"
                    type="checkbox"
                    checked={templateForm.requirePassword || false}
                    onChange={(e) => setTemplateForm({
                      ...templateForm, 
                      requirePassword: e.target.checked
                    })}
                  />
                  <label htmlFor="requirePassword">Exigir Senha</label>
                </div>
              </div>
              
              <div className="form-actions">
                <Button 
                  onClick={() => setIsCreating(false)}
                  variant="secondary"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={saveTemplate}
                  disabled={isLoading || !templateForm.title}
                >
                  {templateForm.id ? 'Atualizar' : 'Salvar'} Template
                </Button>
              </div>
            </div>
          ) : (
            <div className="templates-list">
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map(template => (
                  <div 
                    key={template.id}
                    className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
                    onClick={() => handleSelectTemplate(template)}
                  >
                    <div className="template-info">
                      <h3>{template.title}</h3>
                      <p>{template.description}</p>
                      <div className="template-meta">
                        <span>Total de pontos: {template.totalPoints}</span>
                        <span>Criado em: {new Date(template.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="template-distribution">
                        <strong>Distribuição:</strong>
                        <ul>
                          {template.questionDistribution.map((dist, index) => (
                            <li key={index}>
                              {dist.count} questões - {dist.difficulty === 'easy' ? 'Fácil' : 
                                dist.difficulty === 'medium' ? 'Média' : 'Difícil'}
                              {dist.categories.length > 0 && ` (${dist.categories.join(', ')})`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="template-actions">
                      <button 
                        className="edit-button"
                        onClick={(e) => handleEditTemplate(template, e)}
                      >
                        Editar
                      </button>
                      <button 
                        className="delete-button"
                        onClick={(e) => template.id && handleDeleteTemplate(template.id, e)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-templates">
                  <p>Nenhum template encontrado.</p>
                  {searchTerm && <p>Tente outro termo de busca ou crie um novo template.</p>}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExamTemplateManager;