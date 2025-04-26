import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
    InputGroup,
    InputRow,
    Label,
    Input,
    TextArea,
    Select
} from '../../styles/inputs';
import {
    Button,
    CancelButton,
    PrimaryActionButton,
    CloseButton
} from '../../styles/buttons';

import {
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from '../../styles/modals';

import { LessonContentEditor } from './LessonContentEditor';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

// Define the schema for form validation
const lessonPlanSchema = z.object({
    title: z.string().min(3, { message: 'O título é obrigatório e deve ter pelo menos 3 caracteres' }),
    description: z.string().min(10, { message: 'A descrição deve ter pelo menos 10 caracteres' }),
    duration: z.string().min(1, { message: 'A duração é obrigatória' }),
    sequenceId: z.string().min(1, { message: 'Selecione uma sequência didática' }),
    disciplineId: z.string().min(1, { message: 'Selecione uma disciplina' }),
    applicationWeek: z.string().min(1, { message: 'Informe a semana de aplicação' }),
    status: z.enum(['em_planejamento', 'planejada', 'em_aplicacao', 'aplicada', 'lancada']),
    classGroup: z.string().min(1, { message: 'Selecione uma turma' }),
    type: z.enum(['aula', 'avaliacao']),
    objectives: z.array(z.string()).min(1, { message: 'Adicione pelo menos um objetivo' }),
    skills: z.array(z.string()).min(1, { message: 'Adicione pelo menos uma habilidade' }),
    bnccCodes: z.array(z.string()),
    learningObjectives: z.array(z.string()),
    methodologies: z.array(z.string()),
    knowledgeObjects: z.array(z.object({
        title: z.string(),
        subtopics: z.array(z.string()).optional()
    })),
    resources: z.array(z.string()),
    contentExplanation: z.string(),
    solvedExercises: z.array(z.object({
        statement: z.string(),
        answer: z.string()
    })),
    evaluation: z.object({
        type: z.string(),
        criteria: z.array(z.string()),
        weight: z.number().optional(),
        registrationText: z.string().optional(),
        exercises: z.array(z.string()).optional()
    }).optional()
});

type LessonPlanFormData = z.infer<typeof lessonPlanSchema>;

interface LessonPlanFormProps {
    initialData?: Partial<LessonPlanFormData>;
    onSubmit: (data: LessonPlanFormData) => void;
    onCancel: () => void;
    isOpen: boolean;
    sequences: { id: string; title: string }[];
    disciplines: { id: string; name: string }[];
    classGroups: { id: string; name: string }[];
}

const TagInputContainer = styled.div({
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem'
})

export const LessonPlanForm: React.FC<LessonPlanFormProps> = ({
    initialData,
    onSubmit,
    onCancel,
    isOpen,
    sequences,
    disciplines,
    classGroups
}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [newObjective, setNewObjective] = useState('');
    const [newSkill, setNewSkill] = useState('');
    const [newBnccCode, setNewBnccCode] = useState('');
    const [newResource, setNewResource] = useState('');
    const [newExercise, setNewExercise] = useState({ statement: '', answer: '' });
    const [currentTag, setCurrentTag] = useState<'objectives' | 'skills' | 'bnccCodes' | 'resources'>('objectives');

    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<LessonPlanFormData>({
        resolver: zodResolver(lessonPlanSchema),
        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            duration: initialData?.duration || '',
            sequenceId: initialData?.sequenceId || '',
            disciplineId: initialData?.disciplineId || '',
            applicationWeek: initialData?.applicationWeek || '',
            status: initialData?.status || 'em_planejamento',
            classGroup: initialData?.classGroup || '',
            type: initialData?.type || 'aula',
            objectives: initialData?.objectives || [],
            skills: initialData?.skills || [],
            bnccCodes: initialData?.bnccCodes || [],
            learningObjectives: initialData?.learningObjectives || [],
            methodologies: initialData?.methodologies || [],
            knowledgeObjects: initialData?.knowledgeObjects || [],
            resources: initialData?.resources || [],
            contentExplanation: initialData?.contentExplanation || '',
            solvedExercises: initialData?.solvedExercises || [],
            evaluation: initialData?.evaluation || {
                type: 'formativa',
                criteria: [],
                weight: 1,
                registrationText: '',
                exercises: []
            }
        }
    });

    const addTag = (fieldName: 'objectives' | 'skills' | 'bnccCodes' | 'resources') => {
        const newValue = fieldName === 'objectives' ? newObjective :
            fieldName === 'skills' ? newSkill :
                fieldName === 'bnccCodes' ? newBnccCode : newResource;

        if (newValue.trim()) {
            const currentValues = watch(fieldName) || [];
            setValue(fieldName, [...currentValues, newValue.trim()]);

            // Reset the input field
            if (fieldName === 'objectives') setNewObjective('');
            else if (fieldName === 'skills') setNewSkill('');
            else if (fieldName === 'bnccCodes') setNewBnccCode('');
            else setNewResource('');
        }
    };

    const removeTag = (fieldName: 'objectives' | 'skills' | 'bnccCodes' | 'resources', index: number) => {
        const currentValues = watch(fieldName) || [];
        setValue(fieldName, currentValues.filter((_, i) => i !== index));
    };

    const addExercise = () => {
        if (newExercise.statement.trim() && newExercise.answer.trim()) {
            const currentExercises = watch('solvedExercises') || [];
            setValue('solvedExercises', [...currentExercises, newExercise]);
            setNewExercise({ statement: '', answer: '' });
        }
    };

    const handleNextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 5));
    };

    const handlePrevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    if (!isOpen) return null;

    return (
        <ModalContainer>
            <ModalContent size='md' >
                <ModalHeader>
                    <h3>{initialData ? 'Editar Plano de Aula' : 'Novo Plano de Aula'}</h3>
                    <CloseButton onClick={onCancel}>
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {currentStep === 1 && (
                            <>
                                <h3>Informações Básicas</h3>
                                <InputGroup>
                                    <Label htmlFor="title">Título da Aula</Label>
                                    <Input
                                        id="title"
                                        {...register('title')}
                                        placeholder="Digite o título da aula"
                                    />
                                    {errors.title && <span className="error">{errors.title.message}</span>}
                                </InputGroup>

                                <InputRow>
                                    <InputGroup>
                                        <Label htmlFor="sequenceId">Sequência Didática</Label>
                                        <Select id="sequenceId" {...register('sequenceId')}>
                                            <option value="">Selecione uma sequência</option>
                                            {sequences.map(seq => (
                                                <option key={seq.id} value={seq.id}>{seq.title}</option>
                                            ))}
                                        </Select>
                                        {errors.sequenceId && <span className="error">{errors.sequenceId.message}</span>}
                                    </InputGroup>

                                    <InputGroup>
                                        <Label htmlFor="disciplineId">Disciplina</Label>
                                        <Select id="disciplineId" {...register('disciplineId')}>
                                            <option value="">Selecione uma disciplina</option>
                                            {disciplines.map(disc => (
                                                <option key={disc.id} value={disc.id}>{disc.name}</option>
                                            ))}
                                        </Select>
                                        {errors.disciplineId && <span className="error">{errors.disciplineId.message}</span>}
                                    </InputGroup>
                                </InputRow>

                                <InputRow>
                                    <InputGroup>
                                        <Label htmlFor="applicationWeek">Semana de Aplicação</Label>
                                        <Input
                                            id="applicationWeek"
                                            type="week"
                                            {...register('applicationWeek')}
                                        />
                                        {errors.applicationWeek && <span className="error">{errors.applicationWeek.message}</span>}
                                    </InputGroup>

                                    <InputGroup>
                                        <Label htmlFor="duration">Duração (em minutos)</Label>
                                        <Input
                                            id="duration"
                                            type="number"
                                            {...register('duration')}
                                            placeholder="Ex: 50"
                                        />
                                        {errors.duration && <span className="error">{errors.duration.message}</span>}
                                    </InputGroup>
                                </InputRow>

                                <InputRow>
                                    <InputGroup>
                                        <Label htmlFor="status">Status</Label>
                                        <Select id="status" {...register('status')}>
                                            <option value="em_planejamento">Em Planejamento</option>
                                            <option value="planejada">Planejada</option>
                                            <option value="em_aplicacao">Em Aplicação</option>
                                            <option value="aplicada">Aplicada</option>
                                            <option value="lancada">Lançada</option>
                                        </Select>
                                        {errors.status && <span className="error">{errors.status.message}</span>}
                                    </InputGroup>

                                    <InputGroup>
                                        <Label htmlFor="type">Tipo</Label>
                                        <Select id="type" {...register('type')}>
                                            <option value="aula">Aula</option>
                                            <option value="avaliacao">Avaliação</option>
                                        </Select>
                                        {errors.type && <span className="error">{errors.type.message}</span>}
                                    </InputGroup>
                                </InputRow>

                                <InputGroup>
                                    <Label htmlFor="classGroup">Turma</Label>
                                    <Select id="classGroup" {...register('classGroup')}>
                                        <option value="">Selecione uma turma</option>
                                        {classGroups.map(group => (
                                            <option key={group.id} value={group.id}>{group.name}</option>
                                        ))}
                                    </Select>
                                    {errors.classGroup && <span className="error">{errors.classGroup.message}</span>}
                                </InputGroup>

                                <InputGroup>
                                    <Label htmlFor="description">Descrição</Label>
                                    <TextArea
                                        id="description"
                                        {...register('description')}
                                        placeholder="Digite uma breve descrição desta aula"
                                        rows={4}
                                    />
                                    {errors.description && <span className="error">{errors.description.message}</span>}
                                </InputGroup>
                            </>
                        )}

                        {currentStep === 2 && (
                            <>
                                <h3>Objetivos e Habilidades</h3>

                                <InputGroup>
                                    <Label>Objetivos</Label>
                                   <TagInputContainer>
                                        <Input
                                            value={newObjective}
                                            onChange={(e) => setNewObjective(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('objectives'))}
                                            placeholder="Digite um objetivo e pressione Enter"
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => addTag('objectives')}
                                        >
                                            Adicionar
                                        </Button>
                                    </TagInputContainer>

                                    <div className="tag-container">
                                        {watch('objectives')?.map((obj, index) => (
                                            <div key={index} className="tag">
                                                <span>{obj}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag('objectives', index)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.objectives && <span className="error">{errors.objectives.message}</span>}
                                </InputGroup>

                                <InputGroup>
                                    <Label>Habilidades</Label>
                                    <TagInputContainer>
                                        <Input
                                            value={newSkill}
                                            onChange={(e) => setNewSkill(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('skills'))}
                                            placeholder="Digite uma habilidade e pressione Enter"
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => addTag('skills')}
                                        >
                                            Adicionar
                                        </Button>
                                    </TagInputContainer>

                                    <div className="tag-container">
                                        {watch('skills')?.map((skill, index) => (
                                            <div key={index} className="tag">
                                                <span>{skill}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag('skills', index)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.skills && <span className="error">{errors.skills.message}</span>}
                                </InputGroup>

                                <InputGroup>
                                    <Label>Códigos BNCC</Label>
                                    <TagInputContainer>
                                        <Input
                                            value={newBnccCode}
                                            onChange={(e) => setNewBnccCode(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('bnccCodes'))}
                                            placeholder="Digite um código BNCC e pressione Enter"
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => addTag('bnccCodes')}
                                        >
                                            Adicionar
                                        </Button>
                                    </TagInputContainer>

                                    <div className="tag-container">
                                        {watch('bnccCodes')?.map((code, index) => (
                                            <div key={index} className="tag">
                                                <span>{code}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag('bnccCodes', index)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </InputGroup>
                            </>
                        )}

                        {currentStep === 3 && (
                            <>
                                <h3>Metodologia e Recursos</h3>

                                <InputGroup>
                                    <Label htmlFor="methodologies">Metodologias</Label>
                                    <Controller
                                        name="methodologies"
                                        control={control}
                                        render={({ field }) => (
                                            <TextArea
                                                id="methodologies"
                                                placeholder="Descreva as metodologias utilizadas nesta aula"
                                                rows={4}
                                                value={field.value?.join('\n')}
                                                onChange={(e) => field.onChange(e.target.value.split('\n'))}
                                            />
                                        )}
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Label>Recursos Necessários</Label>
                                    <TagInputContainer>
                                        <Input
                                            value={newResource}
                                            onChange={(e) => setNewResource(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('resources'))}
                                            placeholder="Digite um recurso e pressione Enter"
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => addTag('resources')}
                                        >
                                            Adicionar
                                        </Button>
                                    </TagInputContainer>

                                    <div className="tag-container">
                                        {watch('resources')?.map((resource, index) => (
                                            <div key={index} className="tag">
                                                <span>{resource}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeTag('resources', index)}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </InputGroup>
                            </>
                        )}

                        {currentStep === 4 && (
                            <>
                                <h3>Conteúdo da Aula</h3>

                                <InputGroup>
                                    <Label htmlFor="contentExplanation">Explicação do Conteúdo</Label>
                                    <Controller
                                        name="contentExplanation"
                                        control={control}
                                        render={({ field }) => (
                                            <LessonContentEditor
                                                content={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Label>Exercícios Resolvidos</Label>
                                    <div className="exercise-form">
                                        <TextArea
                                            placeholder="Enunciado do exercício"
                                            value={newExercise.statement}
                                            onChange={(e) => setNewExercise({ ...newExercise, statement: e.target.value })}
                                        />
                                        <TextArea
                                            placeholder="Resposta do exercício"
                                            value={newExercise.answer}
                                            onChange={(e) => setNewExercise({ ...newExercise, answer: e.target.value })}
                                        />
                                        <Button type="button" onClick={addExercise}>
                                            Adicionar Exercício
                                        </Button>
                                    </div>

                                    <div className="exercises-list">
                                        {watch('solvedExercises')?.map((exercise, index) => (
                                            <div key={index} className="exercise-item">
                                                <h4>Exercício {index + 1}</h4>
                                                <p><strong>Enunciado:</strong> {exercise.statement}</p>
                                                <p><strong>Resposta:</strong> {exercise.answer}</p>
                                                <Button
                                                    type="button"
                                                    variant="error"
                                                    onClick={() => {
                                                        const current = watch('solvedExercises') || [];
                                                        setValue('solvedExercises', current.filter((_, i) => i !== index));
                                                    }}
                                                >
                                                    Remover
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </InputGroup>
                            </>
                        )}

                        {currentStep === 5 && (
                            <>
                                <h3>Avaliação</h3>

                                <InputGroup>
                                    <Label htmlFor="evaluation.type">Tipo de Avaliação</Label>
                                    <Select
                                        id="evaluation.type"
                                        {...register('evaluation.type')}
                                    >
                                        <option value="formativa">Formativa</option>
                                        <option value="somativa">Somativa</option>
                                        <option value="diagnostica">Diagnóstica</option>
                                        <option value="lista_exercicios">Lista de Exercícios</option>
                                    </Select>
                                </InputGroup>

                                <InputGroup>
                                    <Label htmlFor="evaluation.criteria">Critérios de Avaliação</Label>
                                    <Controller
                                        name="evaluation.criteria"
                                        control={control}
                                        render={({ field }) => (
                                            <TextArea
                                                id="evaluation.criteria"
                                                placeholder="Descreva os critérios de avaliação (um por linha)"
                                                rows={4}
                                                value={field.value?.join('\n')}
                                                onChange={(e) => field.onChange(e.target.value.split('\n').filter(line => line.trim()))}
                                            />
                                        )}
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Label htmlFor="evaluation.weight">Peso da Avaliação</Label>
                                    <Input
                                        id="evaluation.weight"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        {...register('evaluation.weight', { valueAsNumber: true })}
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Label htmlFor="evaluation.registrationText">Texto para Registro</Label>
                                    <TextArea
                                        id="evaluation.registrationText"
                                        {...register('evaluation.registrationText')}
                                        placeholder="Texto para registro no diário"
                                        rows={4}
                                    />
                                </InputGroup>

                                {watch('evaluation.type') === 'lista_exercicios' && (
                                    <InputGroup>
                                        <Label>Exercícios da Lista</Label>
                                        <p>Funcionalidade para gerenciar exercícios do banco de questões a ser implementada.</p>
                                    </InputGroup>
                                )}
                            </>
                        )}
                    </form>
                </ModalBody>

                <ModalFooter>
                    <CancelButton type="button" onClick={onCancel}>
                        Cancelar
                    </CancelButton>

                    <div className="navigation-buttons">
                        {currentStep > 1 && (
                            <Button type="button" onClick={handlePrevStep}>
                                Anterior
                            </Button>
                        )}

                        {currentStep < 5 ? (
                            <PrimaryActionButton type="button" onClick={handleNextStep}>
                                Próximo
                            </PrimaryActionButton>
                        ) : (
                            <PrimaryActionButton type="button" onClick={handleSubmit(onSubmit)}>
                                Salvar Plano
                            </PrimaryActionButton>
                        )}
                    </div>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    );
};