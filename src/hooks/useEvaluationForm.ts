import { useState, useEffect, useCallback } from "react";
import { Evaluation, EvaluationPart, EvaluationStatus, EvaluationType, Resource } from '../utils/types';

const useEvaluationForm = (evaluation: Evaluation | null) => {
    const [evaluationData, setEvaluationData] = useState<Evaluation>(createEmptyEvaluation());
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [resources, setResources] = useState<Resource[]>([]);
    const [parts, setParts] = useState<EvaluationPart[]>([]);
    
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

    const handleInputChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setEvaluationData(prev => ({ ...prev, [name]: value }));
    }, []);

    const addResource = useCallback((resource: string) => {
        if (!resource.trim()) return;
        setResources(prev => [...prev, { name: resource.trim() }]);
    }, []);

    const removeResource = useCallback((index: number) => {
        setResources(prev => prev.filter((_, i) => i !== index));
    }, []);

    const addPart = useCallback((partName: string) => {
        if (!partName.trim()) return;
        setParts(prev => [...prev, { id: Date.now().toString(), name: partName.trim(), weight: 1, maxScore: 10 }]);
    }, []);

    const removePart = useCallback((id: string) => {
        setParts(prev => prev.filter(part => part.id !== id));
    }, []);

    const handleSubmit = async (onSave: (evaluation: Evaluation) => Promise<void>) => {
        setIsSubmitting(true);
        try {
            await onSave({
                ...evaluationData,
                resources: resources.map(r => r.name),
                parts
            });
        } catch (error) {
            console.error("Erro ao salvar avaliação:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        evaluationData,
        isSubmitting,
        resources,
        parts,
        handleInputChange,
        addResource,
        removeResource,
        addPart,
        removePart,
        handleSubmit
    };
};

export default useEvaluationForm;

function createEmptyEvaluation(): Evaluation {
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