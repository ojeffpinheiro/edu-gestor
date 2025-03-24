import { useState, useEffect, useCallback } from "react";
import { 
    Evaluation, 
    EvaluationCriterion, 
    EvaluationPart, 
    EvaluationStatus, 
    EvaluationType, 
    FormFeedback, 
    FormSectionOptions, 
    Resource, 
    RubricOrConcept 
} from '../utils/types';

// Inicializa uma avaliação vazia com valores padrão
function initializeEmptyEvaluation(): Evaluation {
    return {
        id: Date.now(),
        name: "",
        trimester: 1,
        passingGrade: 6,
        formula: "standard",
        parts: [],
        tools: [],
        school: "",
        series: "",
        class: "",
        objective: "",
        contents: "",
        evaluationCriteria: "",
        subject: "",
        record: "",
        applicationDate: new Date().toISOString().split("T")[0],
        type: EvaluationType.PROVA,
        status: EvaluationStatus.RASCUNHO,
        resources: []
    };
}

// Campos obrigatórios para cada seção
const REQUIRED_FIELDS: Record<FormSectionOptions, string[]> = {
    [FormSectionOptions.BASIC_INFO]: ['name', 'school', 'series', 'class', 'subject', 'objective', 'contents'],
    [FormSectionOptions.RESOURCES]: [],
    [FormSectionOptions.PARTS]: [], // Verificado dinamicamente
    [FormSectionOptions.EVALUATION_CRITERIA]: [], // Verificado dinamicamente
    [FormSectionOptions.EVALUATION_METHOD]: ['evaluationMethod'],
    [FormSectionOptions.CALCULATION]: ['calculationMethod']
};

interface UseEvaluationFormProps {
    evaluation: Evaluation | null;
    onSave: (evaluation: Evaluation) => Promise<void>;
}

// Hook principal para gerenciar o formulário de avaliação
const useEvaluationForm = ({ evaluation, onSave }: UseEvaluationFormProps) => {
    // Estado para gerenciar todos os dados da avaliação
    const [formData, setFormData] = useState<{
        evaluation: Evaluation;
        resources: Resource[];
        parts: EvaluationPart[];
        evaluationCriteria: EvaluationCriterion[];
        evaluationMethod: string;
        calculationMethod: string;
        weights: Record<string, number>;
        numericRange: { min: number; max: number };
        concepts: RubricOrConcept[];
        rubrics: RubricOrConcept[];
        customFormula: string;
    }>(() => ({
        evaluation: evaluation || initializeEmptyEvaluation(),
        resources: Array.isArray(evaluation?.resources) && evaluation.resources.every(res => typeof res !== 'string') ? evaluation.resources as Resource[] : [],
        parts: evaluation?.parts || [],
        evaluationCriteria: evaluation?.evaluationCriteria ? 
            typeof evaluation.evaluationCriteria === 'string' ? 
                [] : JSON.parse(evaluation.evaluationCriteria as string) : 
            [
                {
                    id: "1",
                    name: "Organização das Ideias",
                    weight: 2,
                    comment: "",
                    isExpanded: false,
                    options: [
                        { id: "1-1", description: "Muito boa", value: 10 },
                        { id: "1-2", description: "Boa", value: 8 },
                        { id: "1-3", description: "Regular", value: 6 },
                        { id: "1-4", description: "Insuficiente", value: 4 }
                    ]
                }
            ],
        evaluationMethod: "numeric",
        calculationMethod: "average",
        weights: {},
        numericRange: { min: 0, max: 10 },
        concepts: [
            { id: "1", name: "Excelente", description: "Desempenho excepcional", minValue: 9, maxValue: 10 },
            { id: "2", name: "Bom", description: "Desempenho acima da média", minValue: 7, maxValue: 8.9 },
            { id: "3", name: "Satisfatório", description: "Desempenho suficiente", minValue: 6, maxValue: 6.9 },
            { id: "4", name: "Insatisfatório", description: "Desempenho abaixo do esperado", minValue: 0, maxValue: 5.9 }
        ],
        rubrics: [],
        customFormula: "",
    }));

    // Estado para navegar entre as seções do formulário
    const [currentSection, setCurrentSection] = useState<FormSectionOptions>(FormSectionOptions.BASIC_INFO);

    // Estado para feedback e status de envio do formulário
    const [feedback, setFeedback] = useState<FormFeedback>({
        errorMessage: "",
        successMessage: "",
        hasChanges: false
    });

    // Estado para controlar o envio do formulário
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Efeito para atualizar dados quando o evaluation mudar
    useEffect(() => {
            if (evaluation) {
                setFormData(prevState => ({
                    ...prevState,
                    evaluation,
                    resources: Array.isArray(evaluation.resources) && evaluation.resources.every(res => typeof res !== 'string') ? evaluation.resources as Resource[] : [],
                    parts: evaluation.parts || [],
                }));
                
                setFeedback(prev => ({
                    ...prev,
                    hasChanges: false
                }));
            }
        }, [evaluation]);

    // Handler para mudanças nos inputs
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setFormData(prevState => ({
            ...prevState,
            evaluation: {
                ...prevState.evaluation,
                [name]: value
            }
        }));
        
        setFeedback(prev => ({
            ...prev,
            hasChanges: true,
            errorMessage: ""
        }));
    }, []);

    // Handler para adicionar recursos
    const handleAddResource = useCallback((resource: Resource) => {
        setFormData(prevState => ({
            ...prevState,
            resources: [...prevState.resources, resource]
        }));
        
        setFeedback(prev => ({
            ...prev,
            hasChanges: true
        }));
    }, []);

    // Handler para remover recursos
    const handleRemoveResource = useCallback((id: string) => {
        setFormData(prevState => ({
            ...prevState,
            resources: prevState.resources.filter(r => r.id?.toString() !== id)
        }));
        
        setFeedback(prev => ({
            ...prev,
            hasChanges: true
        }));
    }, []);

    // Handler para adicionar partes da avaliação
    const handleAddPart = useCallback((part: EvaluationPart) => {
        setFormData(prevState => ({
            ...prevState,
            parts: [...prevState.parts, part]
        }));
        
        setFeedback(prev => ({
            ...prev,
            hasChanges: true
        }));
    }, []);

    // Handler para remover partes da avaliação
    const handleRemovePart = useCallback((id: string) => {
        setFormData(prevState => ({
            ...prevState,
            parts: prevState.parts.filter(p => p.id !== id)
        }));
        
        setFeedback(prev => ({
            ...prev,
            hasChanges: true
        }));
    }, []);

    // Handler para atualizar partes da avaliação
    const handleUpdatePart = useCallback((updatedPart: EvaluationPart) => {
        setFormData(prevState => ({
            ...prevState,
            parts: prevState.parts.map(p => p.id === updatedPart.id ? updatedPart : p)
        }));
        
        setFeedback(prev => ({
            ...prev,
            hasChanges: true
        }));
    }, []);

    // Handler para adicionar critérios de avaliação
    const handleAddCriterion = useCallback((criterion: EvaluationCriterion) => {
        setFormData(prevState => ({
            ...prevState,
            evaluationCriteria: [...prevState.evaluationCriteria, criterion]
        }));
        
        setFeedback(prev => ({
            ...prev,
            hasChanges: true
        }));
    }, []);

    // Handler para remover critérios de avaliação
    const handleRemoveCriterion = useCallback((id: string) => {
        setFormData(prevState => ({
            ...prevState,
            evaluationCriteria: prevState.evaluationCriteria.filter(c => c.id !== id)
        }));
        
        setFeedback(prev => ({
            ...prev,
            hasChanges: true
        }));
    }, []);

    // Handler para atualizar critérios de avaliação
    const handleUpdateCriterion = useCallback((updatedCriterion: EvaluationCriterion) => {
        setFormData(prevState => ({
            ...prevState,
            evaluationCriteria: prevState.evaluationCriteria.map(c => 
                c.id === updatedCriterion.id ? updatedCriterion : c
            )
        }));
        
        setFeedback(prev => ({
            ...prev,
            hasChanges: true
        }));
    }, []);

    // Funções para navegar entre seções
    const goToPreviousSection = useCallback(() => {
        const allSections = Object.values(FormSectionOptions);
        const currentIndex = allSections.indexOf(currentSection);
        
        if (currentIndex > 0) {
            setCurrentSection(allSections[currentIndex - 1]);
        }
    }, [currentSection]);

    const goToNextSection = useCallback(() => {
        const allSections = Object.values(FormSectionOptions);
        const currentIndex = allSections.indexOf(currentSection);
        
        if (currentIndex < allSections.length - 1 && getSectionValidationState(currentSection)) {
            setCurrentSection(allSections[currentIndex + 1]);
        }
    }, [currentSection]);

    // Verificação de validade da seção atual
    const getSectionValidationState = useCallback((section: FormSectionOptions): boolean => {
        const { evaluation } = formData;
        
        switch (section) {
            case FormSectionOptions.BASIC_INFO:
                return REQUIRED_FIELDS[section].every(field => 
                    evaluation[field as keyof Evaluation] !== undefined && 
                    evaluation[field as keyof Evaluation] !== ""
                );
                
            case FormSectionOptions.PARTS:
                return formData.parts.length > 0;
                
            case FormSectionOptions.EVALUATION_CRITERIA:
                return formData.evaluationCriteria.length > 0;
                
            case FormSectionOptions.EVALUATION_METHOD:
                return formData.evaluationMethod !== "";
                
            case FormSectionOptions.CALCULATION:
                return formData.calculationMethod !== "";
                
            default:
                return true;
        }
    }, [formData]);

    // Verificação da validade geral do formulário
    const isFormValid = useCallback((): boolean => {
        return Object.values(FormSectionOptions).every(section => 
            getSectionValidationState(section)
        );
    }, [getSectionValidationState]);

    // Calcular o progresso do formulário
    const getFormProgress = useCallback((): number => {
        const sections = Object.values(FormSectionOptions);
        const validSections = sections.filter(section => getSectionValidationState(section)).length;
        return (validSections / sections.length) * 100;
    }, [getSectionValidationState]);

    // Handler para atualizar método de avaliação
    const updateEvaluationMethod = useCallback((method: string) => {
        setFormData(prevState => ({
            ...prevState,
            evaluationMethod: method
        }));
        
        setFeedback(prev => ({
            ...prev,
            hasChanges: true
        }));
    }, []);

    // Handler para atualizar método de cálculo
    const updateCalculationMethod = useCallback((method: string) => {
        setFormData(prevState => ({
            ...prevState,
            calculationMethod: method
        }));
        
        setFeedback(prev => ({
            ...prev,
            hasChanges: true
        }));
    }, []);

    // Handler para submissão do formulário
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isFormValid()) {
            setFeedback({
                errorMessage: "Por favor, preencha todos os campos obrigatórios antes de salvar.",
                successMessage: "",
                hasChanges: true
            });
            return;
        }
        
        try {
            setIsSubmitting(true);
            
            // Preparar dados finais da avaliação
            const finalEvaluation: Evaluation = {
                ...formData.evaluation,
                resources: formData.resources,
                parts: formData.parts,
                evaluationCriteria: typeof formData.evaluation.evaluationCriteria === 'string' ? 
                    formData.evaluation.evaluationCriteria : 
                    JSON.stringify(formData.evaluationCriteria)
            };
            
            // Chamar a função de salvamento
            await onSave(finalEvaluation);
            
            setFeedback({
                errorMessage: "",
                successMessage: "Avaliação salva com sucesso!",
                hasChanges: false
            });
        } catch (error) {
            console.error("Erro ao salvar avaliação:", error);
            setFeedback({
                errorMessage: "Erro ao salvar a avaliação. Por favor, tente novamente.",
                successMessage: "",
                hasChanges: true
            });
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, isFormValid, onSave]);

    return {
        evaluation: formData.evaluation,
        resources: formData.resources,
        parts: formData.parts,
        evaluationCriteria: formData.evaluationCriteria,
        evaluationMethod: formData.evaluationMethod,
        calculationMethod: formData.calculationMethod,
        concepts: formData.concepts,
        rubrics: formData.rubrics,
        numericRange: formData.numericRange,
        feedback,
        isSubmitting,
        currentSection,
        setCurrentSection,
        handleInputChange,
        handleAddResource,
        handleRemoveResource,
        handleAddPart,
        handleRemovePart,
        handleUpdatePart,
        handleAddCriterion,
        handleRemoveCriterion,
        handleUpdateCriterion,
        updateEvaluationMethod,
        updateCalculationMethod,
        goToPreviousSection,
        goToNextSection,
        handleSubmit,
        isFormValid,
        getSectionValidationState,
        getFormProgress
    };
};

export default useEvaluationForm;