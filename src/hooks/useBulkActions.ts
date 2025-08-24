import { useCallback, useState } from "react";
import { Question } from "../types/evaluation/Question";

interface UseBulkActionsProps {
    questions: Question[];
    selectedQuestionIds: Set<string>;
    onUpdateQuestions: (updatedQuestions: Question[]) => void;
    onClearSelection: () => void;
}

export const useBulkActions = ({ questions, selectedQuestionIds, onUpdateQuestions, onClearSelection }: UseBulkActionsProps) => {
    const [isEditing, setIsEditing] = useState(false); // Adicionado estado para rastrear edição em massa

    const deleteQuestions = useCallback(() => {
        onUpdateQuestions(questions.filter(q => !selectedQuestionIds.has(q.id)));
        onClearSelection();
    }, [questions, selectedQuestionIds, onUpdateQuestions, onClearSelection]);
    
    const editQuestions = useCallback((updates: Partial<Question>) => {
        setIsEditing(true); // Ativa o estado de edição
        try {
            onUpdateQuestions(questions.map(q =>
                selectedQuestionIds.has(q.id) ? { ...q, ...updates } : q
            ));
        } finally {
            setIsEditing(false); // Desativa após a conclusão
        }
    }, [questions, selectedQuestionIds, onUpdateQuestions]);
    
    const exportQuestions = useCallback(() => {
        const questionsToExport = questions.filter(q => selectedQuestionIds.has(q.id));
        const exportData = {
            version: '1.0',
            generatedAt: new Date().toISOString(),
            count: questionsToExport.length,
            questions: questionsToExport
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `questoes-exportadas-${new Date().toLocaleDateString()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }, [questions, selectedQuestionIds]);

    return { 
        deleteQuestions, 
        editQuestions, 
        exportQuestions,
        isEditing // Adicionado ao retorno
    };
}