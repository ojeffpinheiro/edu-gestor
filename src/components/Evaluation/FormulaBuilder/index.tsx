import React, { useState } from 'react'
import { EvaluationPart } from "../../../utils/types/AssessmentEvaluation";
import DraggablePart from '../DraggablePart';

const FormulaBuilder: React.FC<{
    parts: EvaluationPart[];
    onSave: (formula: string) => void;
}> = ({ parts, onSave }) => {
    const [formula, setFormula] = useState<string>('');
    const [isDragging, setIsDragging] = useState(false);
    
    const handleDragStart = (partId: string) => {
        setIsDragging(true);
        // Add to formula logic
    };
    
    return (
        <div>
            <h3>Partes Disponíveis</h3>
            <div style={{ display: 'flex', gap: '8px' }}>
                {parts.map(part => (
                    <DraggablePart
                        key={part.id}
                        part={part}
                        onDragStart={handleDragStart}
                    />
                ))}
            </div>
            
            <div 
                style={{ minHeight: '100px', border: '1px dashed #ccc' }}
                onDragOver={(e) => e.preventDefault()}
            >
                {formula || 'Arraste partes para criar a fórmula'}
            </div>
            
            <button onClick={() => onSave(formula)}>Salvar Fórmula</button>
        </div>
    );
};

export default FormulaBuilder;