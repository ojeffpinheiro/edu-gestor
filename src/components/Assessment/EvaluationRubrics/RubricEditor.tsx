import React, { useState } from 'react';

interface RubricFormProps {
    title: string;
    onTitleChange: (title: string) => void;
}

interface CriterionFormProps {
    criterion: {
        id: string;
        description: string;
        weight: number;
        levels: {
            score: number;
            description: string;
        }[];
    };
    onUpdate: (criterion: any) => void;
    onCancel: () => void;
}

const RubricForm: React.FC<RubricFormProps> = ({ title, onTitleChange }) => {
    return (
        <div className="rubric-form">
            <div className="form-group">
                <label htmlFor="title">Título da Rubrica:</label>
                <input
                    id="title"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    required
                />
            </div>
        </div>
    );
};

const CriterionForm: React.FC<CriterionFormProps> = ({
    criterion,
    onUpdate,
    onCancel
}) => {
    const [formData, setFormData] = useState({
        description: criterion.description,
        weight: criterion.weight,
        levels: [...criterion.levels]
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'weight' ? Number(value) : value
        }));
    };

    const handleLevelChange = (index: number, field: string, value: string | number) => {
        const updatedLevels = [...formData.levels];
        updatedLevels[index] = {
            ...updatedLevels[index],
            [field]: field === 'score' ? Number(value) : value
        };
        setFormData(prev => ({
            ...prev,
            levels: updatedLevels
        }));
    };

    const addLevel = () => {
        setFormData(prev => ({
            ...prev,
            levels: [
                ...prev.levels,
                { score: 0, description: '' }
            ]
        }));
    };

    const removeLevel = (index: number) => {
        if (formData.levels.length <= 2) {
            // Manter pelo menos 2 níveis para a rubrica
            return;
        }

        const updatedLevels = [...formData.levels];
        updatedLevels.splice(index, 1);
        setFormData(prev => ({
            ...prev,
            levels: updatedLevels
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validar se há pelo menos dois níveis
        if (formData.levels.length < 2) {
            alert('É necessário pelo menos dois níveis para um critério.');
            return;
        }

        // Validar se todos os campos estão preenchidos
        if (!formData.description || formData.weight <= 0) {
            alert('Preencha todos os campos obrigatórios.');
            return;
        }

        // Verificar se todos os níveis possuem descrição e pontuação
        const invalidLevels = formData.levels.some(level =>
            !level.description || typeof level.score !== 'number'
        );

        if (invalidLevels) {
            alert('Todos os níveis devem ter descrição e pontuação válida.');
            return;
        }

        onUpdate({
            ...criterion,
            description: formData.description,
            weight: formData.weight,
            levels: formData.levels
        });
    };

    return (
        <form className="criterion-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="description">Descrição do Critério:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="weight">Peso:</label>
                <input
                    id="weight"
                    name="weight"
                    type="number"
                    min="1"
                    step="1"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                />
            </div>

            <h3>Níveis de Avaliação</h3>
            {formData.levels.map((level, index) => (
                <div key={index} className="level-form">
                    <div className="level-header">
                        <h4>Nível {index + 1}</h4>
                        <button
                            type="button"
                            className="remove-level-btn"
                            onClick={() => removeLevel(index)}
                        >
                            Remover
                        </button>
                    </div>

                    <div className="form-group">
                        <label htmlFor={`level-${index}-score`}>Pontuação:</label>
                        <input
                            id={`level-${index}-score`}
                            type="number"
                            min="0"
                            step="0.1"
                            value={level.score}
                            onChange={(e) => handleLevelChange(index, 'score', e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor={`level-${index}-description`}>Descrição:</label>
                        <textarea
                            id={`level-${index}-description`}
                            value={level.description}
                            onChange={(e) => handleLevelChange(index, 'description', e.target.value)}
                            required
                        />
                    </div>
                </div>
            ))}

            <button
                type="button"
                className="add-level-btn"
                onClick={addLevel}
            >
                Adicionar Nível
            </button>

            <div className="form-actions">
                <button type="submit" className="save-btn">Salvar</button>
                <button
                    type="button"
                    className="cancel-btn"
                    onClick={onCancel}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export { RubricForm, CriterionForm };