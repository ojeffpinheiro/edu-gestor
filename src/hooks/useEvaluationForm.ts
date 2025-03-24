import { useState, useEffect, useCallback, useMemo } from "react";
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
const REQUIRED_FIELDS = {
    [FormSectionOptions.BASIC_INFO]: ['name', 'school', 'series', 'class', 'subject', 'objective', 'contents'],
    [FormSectionOptions.RESOURCES]: [],
    [FormSectionOptions.PARTS]: [], // Verificado dinamicamente
    [FormSectionOptions.EVALUATION_CRITERIA]: [], // Verificado dinamicamente
    [FormSectionOptions.EVALUATION_METHOD]: ['evaluationMethod'],
    [FormSectionOptions.CALCULATION]: ['calculationMethod']
};

// Hook principal para gerenciar o formulário de avaliação
const useEvaluationForm = (
    initialEvaluation: Evaluation | null, 
    onSave?: (evaluation: Evaluation) => Promise<void>
) => {
    // Estado para gerenciar todos os dados da avaliação
    const [formState, setFormState] = useState<{
        evaluationData: Evaluation;
        resources: Resource[];
        parts: EvaluationPart[];
        evaluationCriteria: EvaluationCriterion[];
        evaluationMethod: string;
        calculationMethod: string;
        weights: { [key: string]: number };
        numericRange: { min: number; max: number };
        concepts: RubricOrConcept[];
        rubrics: RubricOrConcept[];
        customFormula: string;
        hasChanges: boolean;
    }>({
        evaluationData: initialEvaluation || initializeEmptyEvaluation(),
        resources: initialEvaluation?.resources || [],
        parts: initialEvaluation?.parts || [],
        evaluationCriteria: [
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
        hasChanges: false
    });

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

    // Efeito para atualizar dados quando o initialEvaluation mudar
    useEffect(() => {
        if (initialEvaluation) {
            setFormState(prevState => ({
                ...prevState,
                evaluationData: initialEvaluation,
                resources: initialEvaluation.resources || [],
                parts: initialEvaluation.parts || [],
                hasChanges: false
            }));
        }
    }, [initialEvaluation]);

    // Handler para mudanças nos inputs
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setFormState(prevState => ({
            ...prevState,
            evaluationData: {
                ...prevState.evaluationData,
                [name]: value
            },
            hasChanges: true
        }));
        
        setFeedback(prev => ({
            ...prev,
            hasChanges: true,
            errorMessage: ""
        }));
    }, []);

    // Handler para adicionar recursos
    const handleAddResource = useCallback((resource: Resource) => {
        setFormState(prevState => ({
            ...prevState,
            resources: [...prevState.resources, resource],
            hasChanges: true
        }));
        
        setFeedback(prev => ({
            ...prev,
            hasChanges: true
        }));
    }, []);

    // Handler para remover recursos
    const handleRemoveResource = useCallback((id: string) => {
        setFormState(prevState => ({
            ...prevState,
            resources: prevState.resources.filter(r => r.id !== id),
            hasChanges: true
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
        const { evaluationData } = formState;
        
        // Verificar campos obrigatórios específicos da seção
        const requiredFields = REQUIRED_FIELDS[section];
        
        if (section === FormSectionOptions.BASIC_INFO) {
            return requiredFields.every(field => 
                evaluationData[field as keyof Evaluation] !== undefined && 
                evaluationData[field as keyof Evaluation] !== ""
            );
        }
        
        if (section === FormSectionOptions.PARTS) {
            return formState.parts.length > 0;
        }
        
        if (section === FormSectionOptions.EVALUATION_CRITERIA) {
            return formState.evaluationCriteria.length > 0;
        }
        
        if (section === FormSectionOptions.EVALUATION_METHOD) {
            return formState.evaluationMethod !== "";
        }
        
        if (section === FormSectionOptions.CALCULATION) {
            return formState.calculationMethod !== "";
        }
        
        // Para seções sem verificações específicas
        return true;
    }, [formState]);

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
                ...formState.evaluationData,
                resources: formState.resources,
                parts: formState.parts
            };
            
            // Chamar a função de salvamento
            if (onSave) {
                await onSave(finalEvaluation);
            }
            
            setFeedback({
                errorMessage: "",
                successMessage: "Avaliação salva com sucesso!",
                hasChanges: false
            });
            
            // Resetar o estado de mudanças
            setFormState(prev => ({
                ...prev,
                hasChanges: false
            }));
        } catch (error) {
            setFeedback({
                errorMessage: "Erro ao salvar a avaliação. Por favor, tente novamente.",
                successMessage: "",
                hasChanges: true
            });
            console.error("Erro ao salvar avaliação:", error);
        } finally {
            setIsSubmitting(false);
        }
    }, [formState, isFormValid, onSave]);

    // Retornar os valores e métodos necessários para o componente
    return {
        evaluationData: formState.evaluationData,
        resources: formState.resources,
        parts: formState.parts,
        evaluationCriteria: formState.evaluationCriteria,
        feedback,
        isSubmitting,
        currentSection,
        setCurrentSection,
        handleInputChange,
        handleRemoveResource,
        handleAddResource,
        goToPreviousSection,
        goToNextSection,
        handleSubmit,
        isFormValid,
        getSectionValidationState,
        getFormProgress
    };
};

export default useEvaluationForm;