import React, { useState, useEffect, useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import { Evaluation, EvaluationPart, Resource } from "../../../utils/types";

import { Button, CloseButton } from '../../../styles/buttons';
import {
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    InputGroup,
    Input,
    Label,
    ErrorMessage,
    SuccessMessage,
    Select,
    TextArea,
    FormGrid,
    FormSection,
    InputRow
} from './styles';

/** * Interface para as propriedades do componente EvaluationForm */
interface EvaluationFormProps {
    evaluation: Evaluation | null;
    onSave: (evaluation: Evaluation) => Promise<void>;
    onClose: () => void;
}

/** * Interface para os estados de feedback do formulário */
interface FormFeedback {
    errorMessage?: string;
    successMessage?: string;
}

/**
 * Enumeração para os tipos de avaliação
 */
enum EvaluationType {
    PROVA = "PROVA",
    TRABALHO = "TRABALHO",
    SEMINARIO = "SEMINARIO",
    PROJETO = "PROJETO",
    OUTRO = "OUTRO"
}

/**
 * Enumeração para os status de avaliação
 */
enum EvaluationStatus {
    RASCUNHO = "RASCUNHO",
    PLANEJADA = "PLANEJADA",
    AGENDADA = "AGENDADA",
    APLICADA = "APLICADA",
    CORRIGIDA = "CORRIGIDA",
    FINALIZADA = "FINALIZADA",
    CANCELADA = "CANCELADA"
}


const EvaluationForm: React.FC<EvaluationFormProps> = ({ evaluation, onSave, onClose }) => {
    // Estado para os dados do formulário
    const [evaluationData, setEvaluationData] = useState<Evaluation>(createEmptyEvaluation());

    // Estado para feedback do usuário
    const [feedback, setFeedback] = useState<FormFeedback>({});

    // Estado para indicar quando o formulário está enviando dados
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Estado para gerenciar recursos
    const [resources, setResources] = useState<Resource[]>([]);

    // Estado para novo recurso sendo adicionado
    const [newResource, setNewResource] = useState<string>('');

    const [newPart, setNewPart] = useState<string>('');

    const [parts, setParts] = useState<EvaluationPart[]>(evaluation?.parts || []);

    /**
     * Cria uma avaliação vazia com valores padrão
     */
    function createEmptyEvaluation(): Evaluation {
        return {
            id: Date.now(),
            name: '',
            trimester: 1,
            passingGrade: 6,
            formula: 'standard',
            parts: [],
            tools: [],
            school: '',
            series: '',
            class: '',
            objective: '',
            contents: '',
            evaluationCriteria: '',
            subject: '',
            record: '',
            applicationDate: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
            type: EvaluationType.PROVA,
            status: EvaluationStatus.RASCUNHO,
            resources: []
        };
    }

    /**
     * Inicializa o formulário quando recebe uma avaliação existente
     */
    useEffect(() => {
        if (evaluation) {
            // Garante que a data esteja no formato correto para o input date
            const formattedEvaluation = {
                ...evaluation,
                applicationDate: typeof evaluation.applicationDate === 'number'
                    ? new Date(evaluation.applicationDate).toISOString().split('T')[0]
                    : evaluation.applicationDate
            };

            setEvaluationData(formattedEvaluation);
            setResources(Array.isArray(evaluation.resources)
                ? evaluation.resources.map(r => typeof r === 'string' ? { name: r } : r)
                : []);
        } else {
            setEvaluationData(createEmptyEvaluation());
            setResources([]);
        }
    }, [evaluation]);

    /**
     * Manipula alterações nos campos do formulário
     */
    const handleInputChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setEvaluationData(prev => ({ ...prev, [name]: value }));

        // Limpa mensagens de erro ao alterar o campo
        if (feedback.errorMessage) {
            setFeedback({});
        }
    }, [feedback.errorMessage]);

    /**
     * Manipula a adição de um novo recurso
     */
    const handleAddResource = useCallback(() => {
        if (!newResource.trim()) return;

        const newResourceItem: Resource = { name: newResource.trim() };
        setResources(prev => [...prev, newResourceItem]);
        setNewResource('');
    }, [newResource]);

    /**
     * Manipula a remoção de um recurso
     */
    const handleRemoveResource = useCallback((index: number) => {
        setResources(prev => prev.filter((_, i) => i !== index));
    }, []);

    /**
     * Valida o formulário antes de enviar
     */
    const validateForm = useCallback((): boolean => {
        // Campos obrigatórios
        const requiredFields: (keyof Evaluation)[] = ['name', 'school', 'series', 'class', 'subject', 'objective', 'contents'];

        for (const field of requiredFields) {
            if (!evaluationData[field]) {
                setFeedback({
                    errorMessage: `O campo ${getFieldLabel(field)} é obrigatório.`
                });
                return false;
            }
        }

        return true;
    }, [evaluationData]);

    /**
     * Mapeia o nome do campo para um rótulo amigável
     */
    const getFieldLabel = (field: string): string => {
        const fieldLabels: Record<string, string> = {
            name: 'Nome da Avaliação',
            school: 'Escola',
            series: 'Série',
            class: 'Turma',
            subject: 'Disciplina',
            objective: 'Objetivo',
            contents: 'Conteúdo',
            evaluationCriteria: 'Critérios de Avaliação'
        };

        return fieldLabels[field] || field;
    };

    /**
     * Manipula o envio do formulário
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setIsSubmitting(true);

            // Prepara os dados para salvar
            const dataToSave: Evaluation = {
                ...evaluationData,
                resources: resources.map(r => r.name),
                // Converte a data do formato input para timestamp se necessário
                applicationDate: typeof evaluationData.applicationDate === 'string'
                    ? new Date(evaluationData.applicationDate).getTime()
                    : evaluationData.applicationDate
            };

            await onSave(dataToSave);
            setFeedback({ successMessage: "Avaliação salva com sucesso!" });

            // Limpa o formulário após sucesso se for uma nova avaliação
            if (!evaluation) {
                setEvaluationData(createEmptyEvaluation());
                setResources([]);
            }

            // Opcional: fechar o modal após salvar com sucesso
            // setTimeout(onClose, 1500);
        } catch (error) {
            console.error("Erro ao salvar avaliação:", error);
            setFeedback({
                errorMessage: "Erro ao salvar avaliação. Verifique sua conexão e tente novamente."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const addPart = () => {
        const newPart: EvaluationPart = { id: Date.now().toString(), name: '', weight: 0, maxScore: 10 };
        setParts(prevParts => [...prevParts, newPart]);
    };

    const removePart = (id: string) => {
        setParts(prevParts => prevParts.filter(part => part.id !== id));
    };

    return (
        <ModalContainer>
            <ModalContent>
                <ModalHeader>
                    <h3>{evaluation ? 'Editar Avaliação' : 'Nova Avaliação'}</h3>
                    <CloseButton onClick={onClose} aria-label="Fechar modal">
                        <FaTimes />
                    </CloseButton>
                </ModalHeader>

                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <FormGrid>
                            {/* Coluna 1 - Informações básicas */}
                            <FormSection>
                                <InputGroup>
                                    <Label htmlFor="name">Nome da Avaliação *</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Ex: Avaliação Bimestral de Matemática"
                                        value={evaluationData.name}
                                        onChange={handleInputChange}
                                        aria-required="true"
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Label htmlFor="school">Escola *</Label>
                                    <Input
                                        type="text"
                                        id="school"
                                        name="school"
                                        placeholder="Ex: Escola Municipal João da Silva"
                                        value={evaluationData.school}
                                        onChange={handleInputChange}
                                        aria-required="true"
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Label htmlFor="trimester">Trimestre *</Label>
                                    <Select
                                        id="trimester"
                                        name="trimester"
                                        value={evaluationData.trimester}
                                        onChange={handleInputChange}
                                        aria-required="true"
                                    >
                                        <option value="1">1º Trimestre</option>
                                        <option value="2">2º Trimestre</option>
                                        <option value="3">3º Trimestre</option>
                                        <option value="4">4º Trimestre</option>
                                    </Select>
                                </InputGroup>

                                <InputRow>
                                    <InputGroup>
                                        <Label htmlFor="series">Série *</Label>
                                        <Input
                                            type="text"
                                            id="series"
                                            name="series"
                                            placeholder="Ex: 5º ano"
                                            value={evaluationData.series}
                                            onChange={handleInputChange}
                                            aria-required="true"
                                        />
                                    </InputGroup>

                                    <InputGroup>
                                        <Label htmlFor="class">Turma *</Label>
                                        <Input
                                            type="text"
                                            id="class"
                                            name="class"
                                            placeholder="Ex: B"
                                            value={evaluationData.class}
                                            onChange={handleInputChange}
                                            aria-required="true"
                                        />
                                    </InputGroup>
                                </InputRow>

                                <InputGroup>
                                    <Label htmlFor="subject">Disciplina *</Label>
                                    <Input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Ex: Matemática"
                                        value={evaluationData.subject}
                                        onChange={handleInputChange}
                                        aria-required="true"
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Label htmlFor="record">Registro</Label>
                                    <Input
                                        type="text"
                                        id="record"
                                        name="record"
                                        placeholder="Ex: AV-2023-001"
                                        value={evaluationData.record}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                            </FormSection>

                            {/* Coluna 2 - Informações detalhadas */}
                            <FormSection>
                                <InputRow>
                                    <InputGroup>
                                        <Label htmlFor="applicationDate">Data de Aplicação *</Label>
                                        <Input
                                            type="date"
                                            id="applicationDate"
                                            name="applicationDate"
                                            value={typeof evaluationData.applicationDate === 'string' ? evaluationData.applicationDate : evaluationData.applicationDate.toString().split('T')[0]}
                                            onChange={handleInputChange}
                                            aria-required="true"
                                        />
                                    </InputGroup>

                                    <InputGroup>
                                        <Label htmlFor="type">Tipo *</Label>
                                        <Select
                                            id="type"
                                            name="type"
                                            value={evaluationData.type}
                                            onChange={handleInputChange}
                                            aria-required="true"
                                        >
                                            <option value={EvaluationType.PROVA}>PROVA</option>
                                            <option value={EvaluationType.TRABALHO}>TRABALHO</option>
                                            <option value={EvaluationType.SEMINARIO}>SEMINÁRIO</option>
                                            <option value={EvaluationType.PROJETO}>PROJETO</option>
                                            <option value={EvaluationType.OUTRO}>OUTRO</option>
                                        </Select>
                                    </InputGroup>
                                </InputRow>

                                <InputGroup>
                                    <Label htmlFor="status">Status *</Label>
                                    <Select
                                        id="status"
                                        name="status"
                                        value={evaluationData.status}
                                        onChange={handleInputChange}
                                        aria-required="true"
                                    >
                                        <option value={EvaluationStatus.RASCUNHO}>RASCUNHO</option>
                                        <option value={EvaluationStatus.PLANEJADA}>PLANEJADA</option>
                                        <option value={EvaluationStatus.AGENDADA}>AGENDADA</option>
                                        <option value={EvaluationStatus.APLICADA}>APLICADA</option>
                                        <option value={EvaluationStatus.CORRIGIDA}>CORRIGIDA</option>
                                        <option value={EvaluationStatus.FINALIZADA}>FINALIZADA</option>
                                        <option value={EvaluationStatus.CANCELADA}>CANCELADA</option>
                                    </Select>
                                </InputGroup>

                                <InputGroup>
                                    <Label htmlFor="objective">Objetivo *</Label>
                                    <TextArea
                                        id="objective"
                                        name="objective"
                                        placeholder="Descreva os objetivos desta avaliação..."
                                        value={evaluationData.objective}
                                        onChange={handleInputChange}
                                        rows={3}
                                        aria-required="true"
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Label htmlFor="contents">Conteúdo *</Label>
                                    <TextArea
                                        id="contents"
                                        name="contents"
                                        placeholder="Liste os conteúdos abordados..."
                                        value={evaluationData.contents}
                                        onChange={handleInputChange}
                                        rows={3}
                                        aria-required="true"
                                    />
                                </InputGroup>

                                <InputGroup>
                                    <Label htmlFor="evaluationCriteria">Critérios de Avaliação *</Label>
                                    <TextArea
                                        id="evaluationCriteria"
                                        name="evaluationCriteria"
                                        placeholder="Descreva os critérios de avaliação..."
                                        value={evaluationData.evaluationCriteria}
                                        onChange={handleInputChange}
                                        rows={3}
                                        aria-required="true"
                                    />
                                </InputGroup>
                            </FormSection>
                        </FormGrid>

                        {/* Seção de Recursos */}
                        <InputGroup className="mt-6">
                            <Label>Recursos</Label>
                            <div className="space-y-2">
                                {resources.map((resource, index) => (
                                    <div key={index} className="flex items-center">
                                        <Input
                                            type="text"
                                            value={resource.name}
                                            onChange={(e) => {
                                                const updated = [...resources];
                                                updated[index].name = e.target.value;
                                                setResources(updated);
                                            }}
                                            placeholder="Ex: Projetor, Computador, Material didático..."
                                        />
                                        <Button
                                            type="button"
                                            variant="info"
                                            className="ml-2"
                                            onClick={() => handleRemoveResource(index)}
                                            aria-label="Remover recurso"
                                        >
                                            Remover
                                        </Button>
                                    </div>
                                ))}

                                <div className="flex items-center">
                                    <Input
                                        type="text"
                                        value={newResource}
                                        onChange={(e) => setNewResource(e.target.value)}
                                        placeholder="Ex: Projetor, Computador, Material didático..."
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddResource();
                                            }
                                        }}
                                    />
                                    <Button
                                        type="button"
                                        variant="info"
                                        className="ml-2"
                                        onClick={handleAddResource}
                                        aria-label="Adicionar recurso"
                                    >
                                        Adicionar
                                    </Button>
                                </div>
                            </div>
                        </InputGroup>

                        {/* Seção de Partes da Avaliação */}
                        <InputGroup className="mt-6">
                            <Label>Partes</Label>
                            <div className="space-y-2">
                                {parts.map(part => (
                                    <div key={part.id} className="flex items-center">
                                        <Input
                                            type="text" value={part.name}
                                            onChange={(e) => {
                                                const updatedParts = parts.map(p => p.id === part.id ? { ...p, name: e.target.value } : p);
                                                setParts(updatedParts);
                                            }}
                                        />
                                        <Button onClick={() => removePart(part.id)}>Remover</Button>
                                    </div>
                                ))}
                                <div className="flex items-center">
                                    <Input type="text" value={newPart}
                                        onChange={(e) => setNewPart(e.target.value)}
                                        placeholder="Ex: Relatório, Teórico, Partipação..."
                                        onKeyPress={(e) => { if(e.key === 'Enter') { e.preventDefault(); addPart() } }} />
                                    <Button type="button" variant="info" className="ml-2" onClick={addPart} aria-label="Adicionar Parte" >Adicionar</Button>
                                </div>
                            </div>
                        </InputGroup>

                        {/* Mensagens de Feedback */}
                        {feedback.errorMessage && (
                            <ErrorMessage role="alert">{feedback.errorMessage}</ErrorMessage>
                        )}
                        {feedback.successMessage && (
                            <SuccessMessage role="status">{feedback.successMessage}</SuccessMessage>
                        )}
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary" onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? 'Salvando...' : 'Salvar Avaliação'}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    );
};

export default EvaluationForm;