import React from 'react'
import { FaExclamationTriangle, FaGripLines, FaPlus, FaPuzzlePiece, FaSortDown, FaSortUp, FaTrashAlt } from "react-icons/fa";
import { StepProps } from "../../../utils/types/Question";
import { AlternativeActions, AlternativeContent, AlternativeItem, AlternativesContainer, CorrectBadge, DragHandle, SectionTitle, StepContent, ValidationError } from "../../modals/QuestionModal/styles";
import { Input } from '../../../styles/inputs';
import { Button } from '../../../styles/buttons';
import { Flex } from '../../../styles/layoutUtils';
import { FormCard } from '../../../styles/containers';

// Componente para o passo 3: Alternativas
const AlternativesStep: React.FC<StepProps> = ({
    formData,
    updateFormData,
    validationErrors,
    setValidationErrors
}) => {

    const handleAddAlternative = () => {
        updateFormData({
            alternatives: [
                ...formData.alternatives,
                { id: Date.now().toString(), text: '', isCorrect: false }
            ]
        });
    };

    const handleRemoveAlternative = (id: string) => {
        // Não permitir remover todas as alternativas para questões de múltipla escolha
        if (formData.questionType === 'multiple_choice' && formData.alternatives.length <= 1) {
            return;
        }

        // Ajustar isCorrect caso a alternativa correta seja removida
        const isRemovingCorrect = formData.alternatives.find(alt => alt.id === id)?.isCorrect;
        let updatedAlternatives = formData.alternatives.filter(alt => alt.id !== id);

        if (isRemovingCorrect && updatedAlternatives.length > 0 && formData.questionType === 'multiple_choice') {
            updatedAlternatives[0].isCorrect = true;
        }

        updateFormData({ alternatives: updatedAlternatives });
    };

    const handleAlternativeChange = (id: string, text: string) => {
        updateFormData({
            alternatives: formData.alternatives.map(alt =>
                alt.id === id ? { ...alt, text } : alt
            )
        });

        // Remover erro de validação para alternativas
        if (validationErrors.alternatives) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.alternatives;
                return newErrors;
            });
        }
    };

    const handleCorrectChange = (id: string) => {
        updateFormData({
            alternatives: formData.alternatives.map(alt => ({
                ...alt,
                isCorrect: alt.id === id
            }))
        });
    };

    const handleMoveAlternative = (index: number, direction: 'up' | 'down') => {
        const newIndex = direction === 'up' ? index - 1 : index + 1;

        if (newIndex < 0 || newIndex >= formData.alternatives.length) return;

        const newAlternatives = [...formData.alternatives];
        const temp = newAlternatives[index];
        newAlternatives[index] = newAlternatives[newIndex];
        newAlternatives[newIndex] = temp;

        updateFormData({ alternatives: newAlternatives });
    };

    if (formData.questionType === 'essay') {
        return (
            <StepContent>
                <FormCard>
                    <SectionTitle>
                        <FaPuzzlePiece style={{ marginRight: '8px' }
                        } />
                        Questão Dissertativa
                    </SectionTitle>

                    < p style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }
                    }>
                        Esta é uma questão dissertativa, portanto não possui alternativas para definir.
                    </p>
                </FormCard>
            </StepContent>
        );
    }

    return (
        <StepContent>
            <FormCard>
                <SectionTitle>
                    <FaPuzzlePiece style={{ marginRight: '8px' }} />
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
                                        onClick={() => handleCorrectChange(alternative.id)
                                        }
                                    >
                                        {alternative.isCorrect ? (
                                            <CorrectBadge>Correta </CorrectBadge>
                                        ) : (
                                            "Marcar Correta"
                                        )
                                        }
                                    </Button>
                                )}

                                <Button
                                    title="Mover para cima"
                                    onClick={() => handleMoveAlternative(index, 'up')}
                                    disabled={index === 0}
                                >
                                    <FaSortUp />
                                </Button>

                                < Button
                                    title="Mover para baixo"
                                    onClick={() => handleMoveAlternative(index, 'down')}
                                    disabled={index === formData.alternatives.length - 1}
                                >
                                    <FaSortDown />
                                </Button>

                                < Button
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
        </StepContent>
    );
};

export default AlternativesStep;