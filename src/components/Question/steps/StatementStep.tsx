import React from 'react'
import { FaEdit, FaExclamationTriangle } from "react-icons/fa";

import { StepProps } from "../../../utils/types/Question";
import { FormCard, SectionTitle, StepContent, ValidationError } from "../../modals/QuestionModal/styles";
import { FormGroup } from "../../../styles/formControls";
import { Label, TextArea } from "../../../styles/inputs";

// Componente para o passo 2: Enunciado
const StatementStep: React.FC<StepProps> = ({
    formData,
    updateFormData,
    validationErrors,
    setValidationErrors
}) => {

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        updateFormData({ [name]: value });

        // Remover erro de validação quando o campo é alterado
        if (validationErrors[name]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    return (
        <StepContent>
            <FormCard>
                <SectionTitle>
                    <FaEdit style={{ marginRight: '8px' }
                    } />
                    Enunciado da Questão
                </SectionTitle>

                <FormGroup>
                    <TextArea
                        id="statement"
                        name="statement"
                        value={formData.statement}
                        onChange={handleChange}
                        rows={7}
                        placeholder="Digite o enunciado da questão aqui..."
                    />
                    {validationErrors.statement && (
                            <ValidationError>
                                <FaExclamationTriangle /> {validationErrors.statement}
                            </ValidationError>
                        )}
                </FormGroup>

                < FormGroup >
                    <Label htmlFor="explanation" > Feedback / Explicação </Label>
                    <TextArea
                        id="explanation"
                        name="explanation"
                        value={formData.explanation}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Explicação que será mostrada após o aluno responder a questão"
                    />
                </FormGroup>
            </FormCard>
        </StepContent>
    );
};

export default StatementStep;