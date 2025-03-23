import { useState, useEffect, useCallback } from "react";
import { Evaluation, EvaluationCriterion, EvaluationPart, EvaluationStatus, EvaluationType, FormFeedback, FormSectionOptions, Resource, RubricOrConcept } from '../utils/types';

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

const useEvaluationForm = (
    evaluation: Evaluation | null, 
    onSave?: (evaluation: Evaluation) => Promise<void>
) => {

    // Estado para os dados do formulário
    const [evaluationData, setEvaluationData] = useState<Evaluation>(initializeEmptyEvaluation());

    // Estado para feedback do usuário
    const [feedback, setFeedback] = useState<FormFeedback>({});

    // Estado para seção atual do formulário
    const [currentSection, setCurrentSection] = useState<FormSectionOptions>(FormSectionOptions.BASIC_INFO);

    // Estado para gerenciar recursos
    const [resources, setResources] = useState<Resource[]>([]);

    // Estado para novo recurso sendo adicionado
    const [newResource, setNewResource] = useState<string>('');

    // Estado para gerenciar partes da avaliação
    const [parts, setParts] = useState<EvaluationPart[]>([]);

    // Estado para nova parte sendo adicionada
    const [newPart, setNewPart] = useState<string>('');

    // Estado para método de avaliação
    const [evaluationMethod, setEvaluationMethod] = useState<string>("numeric");

    // Estado para conceitos
    const [concepts, setConcepts] = useState<RubricOrConcept[]>([
        { id: "1", name: "A", description: "Excelente" },
        { id: "2", name: "B", description: "Bom" },
        { id: "3", name: "C", description: "Regular" },
        { id: "4", name: "D", description: "Insuficiente" }
    ]);

    // Estado para rubricas
    const [rubrics, setRubrics] = useState<RubricOrConcept[]>([
        { id: "1", name: "Domínio Completo", description: "Demonstra compreensão total do conteúdo" },
        { id: "2", name: "Domínio Parcial", description: "Demonstra compreensão parcial do conteúdo" },
        { id: "3", name: "Desenvolvimento", description: "Em processo de desenvolvimento" },
        { id: "4", name: "Iniciando", description: "Precisa de apoio significativo" }
    ]);

    // Estado para novo conceito/rubrica
    const [newConceptOrRubric, setNewConceptOrRubric] = useState<{ name: string, description: string }>({
        name: "",
        description: ""
    });

    // Estado para método de cálculo
    const [calculationMethod, setCalculationMethod] = useState<string>("sum");

    // Estado para pesos das partes
    const [weights, setWeights] = useState<{ [key: string]: number }>({});

    // Estado para fórmula personalizada
    const [customFormula, setCustomFormula] = useState<string>("");

    // Estado para critérios de avaliação
    const [evaluationCriteria, setEvaluationCriteria] = useState<EvaluationCriterion[]>([
        {
            id: "1",
            name: "Organização das Ideias",
            weight: 2,
            comment: "",
            isExpanded: false,
            options: [
                { id: "1-1", description: "Completo. O orador transmite claramente a ideia principal e fornece detalhes que são relevantes e interessantes." },
                { id: "1-2", description: "Geralmente completo. O orador transmite a ideia principal, mas não fornece detalhes relevantes adequados para apoiá-la." },
                { id: "1-3", description: "Um tanto incompleto. A ideia principal não é clara. Muitos detalhes são irrelevantes." },
                { id: "1-4", description: "Incompleto. A ideia principal não é clara. Os detalhes são inexistentes ou aleatórios e irrelevantes." }
            ]
        },
        {
            id: "2",
            name: "Compreensibilidade",
            weight: 2,
            comment: "",
            isExpanded: false,
            options: [
                { id: "2-1", description: "Compreensível. O orador usa linguagem apropriada para transmitir a ideia principal deste item claramente." },
                { id: "2-2", description: "Geralmente compreensível. A mensagem não é clara em alguns lugares. A linguagem usada é inadequada para tornar a mensagem totalmente clara." },
                { id: "2-3", description: "Um tanto incompreensível. A mensagem só poderia ser entendida por um falante nativo simpático. A linguagem usada é frequentemente inapropriada ou distorcida pela interferência do inglês." },
                { id: "2-4", description: "Incompreensível. A mensagem não pode ser entendida." }
            ]
        },
        {
            id: "3",
            name: "Fluência",
            weight: 2,
            comment: "",
            isExpanded: false,
            options: [
                { id: "3-1", description: "O aluno fala muito claramente, sem hesitação. A pronúncia e a entonação soam naturais." },
                { id: "3-2", description: "O aluno fala com alguma hesitação. Problemas com pronúncia e entonação não impedem a comunicação." },
                { id: "3-3", description: "O aluno hesita frequentemente. Problemas com pronúncia e entonação distorcem o significado e inibem a comunicação em alguns casos." },
                { id: "3-4", description: "Hesitações frequentes e problemas extremos com a pronúncia causam interrupções na comunicação." }
            ]
        },
        {
            id: "4",
            name: "Precisão",
            weight: 2,
            comment: "",
            isExpanded: false,
            options: [
                { id: "4-1", description: "Funções, gramática e vocabulário são usados corretamente." },
                { id: "4-2", description: "Pequenos problemas de uso não distorcem o significado nem inibem a comunicação." },
                { id: "4-3", description: "Problemas no uso distorcem significativamente o significado e inibem a comunicação em alguns casos." },
                { id: "4-4", description: "Problemas no uso distorcem completamente o significado e inibem as comunicações." }
            ]
        },
        {
            id: "5",
            name: "Esforço",
            weight: 2,
            comment: "",
            isExpanded: false,
            options: [
                { id: "5-1", description: "Excede os requisitos mínimos da tarefa e fornece evidências de contribuição ponderada." },
                { id: "5-2", description: "Atende aos requisitos mínimos da tarefa e fornece evidências de contribuição ponderada." },
                { id: "5-3", description: "Atende aos requisitos mínimos da tarefa, mas não demonstra evidências de contribuição ponderada." },
                { id: "5-4", description: "Não cumpre os requisitos mínimos da tarefa nem fornece evidências de contribuição ponderada." }
            ]
        }
    ]);

    // Estado para novo critério
    const [newCriterion, setNewCriterion] = useState<{ name: string }>({ name: "" });
    
    // Estado para indicar quando o formulário está enviando dados
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    // Estado para range de avaliação numérica
    const [numericRange, setNumericRange] = useState({ min: 0, max: 10 });


    useEffect(() => {
        if (evaluation) {
            setEvaluationData(evaluation);
            setResources(
                evaluation.resources?.map(r =>
                    typeof r === "string" ? { name: r } : r
                ) || []
            );
            setParts(evaluation.parts || []);
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
     * Adiciona uma nova parte à avaliação
     */
    const addPart = useCallback(() => {
        if (!newPart.trim()) return;

        const newPartItem: EvaluationPart = {
            id: Date.now().toString(),
            name: newPart.trim(),
            weight: 1,
            maxScore: 10
        };

        setParts(prev => [...prev, newPartItem]);
        setNewPart('');

        // Inicializa o peso da nova parte no estado de pesos
        setWeights(prev => ({ ...prev, [newPartItem.id]: 1 }));
    }, [newPart]);

    /**
     * Remove uma parte da avaliação
     */
    const removePart = useCallback((id: string) => {
        setParts(prev => prev.filter(part => part.id !== id));

        // Remove o peso da parte removida
        setWeights(prev => {
            const newWeights = { ...prev };
            delete newWeights[id];
            return newWeights;
        });
    }, []);

    /**
    * Adiciona um novo critério de avaliação
    */
    const addCriterion = useCallback(() => {
        if (!newCriterion.name.trim()) return;

        const newCriterionItem: EvaluationCriterion = {
            id: Date.now().toString(),
            name: newCriterion.name.trim(),
            weight: 1,
            comment: "",
            isExpanded: false,
            options: [
                { id: `${Date.now()}-1`, description: "Opção 1" },
                { id: `${Date.now()}-2`, description: "Opção 2" },
                { id: `${Date.now()}-3`, description: "Opção 3" },
                { id: `${Date.now()}-4`, description: "Opção 4" }
            ]
        };

        setEvaluationCriteria(prev => [...prev, newCriterionItem]);
        setNewCriterion({ name: "" });
    }, [newCriterion]);

    /**
     * Remove um critério de avaliação
     */
    const removeCriterion = useCallback((id: string) => {
        setEvaluationCriteria(prev => prev.filter(criterion => criterion.id !== id));
    }, []);

    /**
     * Alterna estado de expansão de um critério de avaliação
     */
    const toggleCriterionExpansion = useCallback((id: string) => {
        setEvaluationCriteria(prev =>
            prev.map(criterion =>
                criterion.id === id
                    ? { ...criterion, isExpanded: !criterion.isExpanded }
                    : criterion
            )
        );
    }, []);

    /**
     * Atualiza o peso de um critério de avaliação
     */
    const updateCriterionWeight = useCallback((id: string, weight: number) => {
        setEvaluationCriteria(prev =>
            prev.map(criterion =>
                criterion.id === id ? { ...criterion, weight } : criterion
            )
        );
    }, []);

    /**
     * Atualiza o comentário de um critério de avaliação
     */
    const updateCriterionComment = useCallback((id: string, comment: string) => {
        setEvaluationCriteria(prev =>
            prev.map(criterion =>
                criterion.id === id ? { ...criterion, comment } : criterion
            )
        );
    }, []);

    /**
         * Adiciona uma nova opção a um critério de avaliação
         */
    const addCriterionOption = useCallback((criterionId: string) => {
        setEvaluationCriteria(prev =>
            prev.map(criterion => {
                if (criterion.id === criterionId) {
                    const newOptionId = `${criterionId}-${criterion.options.length + 1}`;
                    return {
                        ...criterion,
                        options: [
                            ...criterion.options,
                            { id: newOptionId, description: "Nova opção" }
                        ]
                    };
                }
                return criterion;
            })
        );
    }, []);

    /**
     * Remove uma opção de um critério de avaliação
     */
    const removeCriterionOption = useCallback((criterionId: string, optionId: string) => {
        setEvaluationCriteria(prev =>
            prev.map(criterion => {
                if (criterion.id === criterionId) {
                    return {
                        ...criterion,
                        options: criterion.options.filter(option => option.id !== optionId)
                    };
                }
                return criterion;
            })
        );
    }, []);

    /**
         * Atualiza a descrição de uma opção de critério
         */
    const updateCriterionOption = useCallback((criterionId: string, optionId: string, description: string) => {
        setEvaluationCriteria(prev =>
            prev.map(criterion => {
                if (criterion.id === criterionId) {
                    return {
                        ...criterion,
                        options: criterion.options.map(option =>
                            option.id === optionId ? { ...option, description } : option
                        )
                    };
                }
                return criterion;
            })
        );
    }, []);

    /**
     * Adiciona um novo conceito ou rubrica
     */
    const addConceptOrRubric = useCallback(() => {
        if (!newConceptOrRubric.name.trim()) return;

        const newItem: RubricOrConcept = {
            id: Date.now().toString(),
            name: newConceptOrRubric.name.trim(),
            description: newConceptOrRubric.description.trim()
        };

        if (evaluationMethod === "concepts") {
            setConcepts(prev => [...prev, newItem]);
        } else if (evaluationMethod === "rubrics") {
            setRubrics(prev => [...prev, newItem]);
        }

        setNewConceptOrRubric({ name: "", description: "" });
    }, [newConceptOrRubric, evaluationMethod]);

    /**
    * Remove um conceito ou rubrica
    */
    const removeConceptOrRubric = useCallback((id: string) => {
        if (evaluationMethod === "concepts") {
            setConcepts(prev => prev.filter(item => item.id !== id));
        } else if (evaluationMethod === "rubrics") {
            setRubrics(prev => prev.filter(item => item.id !== id));
        }
    }, [evaluationMethod]);

    /**
     * Atualiza o peso de uma parte da avaliação
     */
    const updateWeight = useCallback((partId: string, weight: number) => {
        setWeights(prev => ({ ...prev, [partId]: weight }));
    }, []);

    /**
     * Valida o formulário antes de enviar
     */
    const validateForm = useCallback((): boolean => {
        // Campos obrigatórios na seção básica
        if (currentSection === FormSectionOptions.BASIC_INFO) {
            const requiredFields: (keyof Evaluation)[] = ['name', 'school', 'series', 'class', 'subject', 'objective', 'contents'];

            for (const field of requiredFields) {
                if (!evaluationData[field]) {
                    setFeedback({
                        errorMessage: `O campo ${getFieldLabel(field)} é obrigatório.`
                    });
                    return false;
                }
            }
        }

        // Validação para a seção de partes
        if (currentSection === FormSectionOptions.PARTS && parts.length === 0) {
            setFeedback({
                errorMessage: "É necessário adicionar pelo menos uma parte à avaliação."
            });
            return false;
        }

        // Validação para a seção de critérios
        if (currentSection === FormSectionOptions.EVALUATION_CRITERIA && evaluationCriteria.length === 0) {
            setFeedback({
                errorMessage: "É necessário definir pelo menos um critério de avaliação."
            });
            return false;
        }

        // Validação para a seção de cálculo
        if (currentSection === FormSectionOptions.CALCULATION) {
            if (calculationMethod === "weighted" && parts.length > 0) {
                const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
                if (Math.abs(totalWeight - 10) > 0.01) {  // Permite pequenas imprecisões de ponto flutuante
                    setFeedback({
                        errorMessage: `A soma dos pesos deve ser igual a 10. Atual: ${totalWeight.toFixed(1)}`
                    });
                    return false;
                }
            } else if (calculationMethod === "custom" && !customFormula.trim()) {
                setFeedback({
                    errorMessage: "É necessário definir uma fórmula personalizada."
                });
                return false;
            }
        }

        return true;
    }, [currentSection, evaluationData, parts.length, evaluationCriteria.length, calculationMethod, weights, customFormula]);

    /**
     * Navega para a próxima seção
     */
    const goToNextSection = useCallback(() => {
        if (!validateForm()) return;

        const sections = Object.values(FormSectionOptions);
        const currentIndex = sections.indexOf(currentSection);

        if (currentIndex < sections.length - 1) {
            setCurrentSection(sections[currentIndex + 1] as FormSectionOptions);
        }
    }, [currentSection, validateForm]);

    /**
     * Navega para a seção anterior
     */
    const goToPreviousSection = useCallback(() => {
        const sections = Object.values(FormSectionOptions);
        const currentIndex = sections.indexOf(currentSection);

        if (currentIndex > 0) {
            setCurrentSection(sections[currentIndex - 1] as FormSectionOptions);
        }
    }, [currentSection]);

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

    /** * Manipula o envio do formulário */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setIsSubmitting(true);

            // Prepara os dados para salvar
            const dataToSave: Evaluation = {
                ...evaluationData,
                resources: resources.map(r => r.name),
                parts: parts.map(part => ({
                    ...part,
                    weight: weights[part.id] || part.weight || 1
                })),
                formula: calculationMethod === "custom" ? customFormula : calculationMethod,

                // Salva informações de critérios e configurações em formato JSON
                evaluationCriteria: JSON.stringify({
                    method: evaluationMethod,
                    numericRange: evaluationMethod === "numeric" ? numericRange : null,
                    concepts: evaluationMethod === "concepts" ? concepts : null,
                    rubrics: evaluationMethod === "rubrics" ? rubrics : null,
                    posNeg: evaluationMethod === "posNeg" ? true : null,
                    calculationMethod: calculationMethod,
                    weights: calculationMethod === "weighted" ? weights : null,
                    customFormula: calculationMethod === "custom" ? customFormula : null,
                    criteria: evaluationCriteria.map(({ isExpanded, ...rest }) => rest)  // Remove campo isExpanded
                }),

                // Converte a data para o formato adequado
                applicationDate: typeof evaluationData.applicationDate === 'string'
                    ? new Date(evaluationData.applicationDate).getTime()
                    : evaluationData.applicationDate
            };

            if (onSave) {
                await onSave(dataToSave);
            }
            setFeedback({ successMessage: "Avaliação salva com sucesso!" });

            // Limpa o formulário após sucesso se for uma nova avaliação
            if (!evaluation) {
                setEvaluationData(initializeEmptyEvaluation());
                setResources([]);
                setParts([]);
                setCurrentSection(FormSectionOptions.BASIC_INFO);
            }
        } catch (error) {
            console.error("Erro ao salvar avaliação:", error);
            setFeedback({
                errorMessage: "Erro ao salvar avaliação. Verifique sua conexão e tente novamente."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        resources,
        initializeEmptyEvaluation,
        evaluationData,
        parts,
        evaluationCriteria,
        feedback,
        newResource,
        newPart,
        isSubmitting,
        weights,
        newCriterion,
        evaluationMethod,
        numericRange,
        newConceptOrRubric,
        rubrics,
        calculationMethod,
        customFormula,
        currentSection,
        setNumericRange,
        setNewCriterion,
        setResources,
        setNewResource,
        setParts,
        setNewPart,
        setEvaluationMethod,
        setNewConceptOrRubric,
        setRubrics,
        setCalculationMethod,
        setCustomFormula,
        setCurrentSection,
        handleInputChange,
        handleAddResource,
        handleRemoveResource,
        addPart,
        removePart,
        addCriterion,
        removeCriterion,
        toggleCriterionExpansion,
        updateCriterionWeight,
        updateCriterionComment,
        addCriterionOption,
        removeCriterionOption,
        updateCriterionOption,
        addConceptOrRubric,
        removeConceptOrRubric,
        updateWeight,
        validateForm,
        goToNextSection,
        goToPreviousSection,
        handleSubmit
    };
};

export default useEvaluationForm;