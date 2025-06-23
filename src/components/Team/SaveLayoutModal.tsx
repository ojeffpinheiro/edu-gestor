import React, { useState } from 'react';
import { useClassroom } from '../../contexts/ClassroomContext';
import { 
    ModalContainer, 
    ModalHeader 
} from '../../styles/modals';
import { ActionButton } from '../../styles/buttons';

interface SavedLayout {
    name: string;
    layout: {
        rows: number;
        columns: number;
        seats: Array<{
            id: string;
            studentId?: number;
            position: {
                row: number;
                column: number;
            };
            priority?: string | null;
        }>;
    };
}

const SaveLayoutModal: React.FC = () => {
    const {
        state: { layoutName, saveModalOpen, savedLayouts },
        dispatch,
        actions: { saveCurrentLayout }
    } = useClassroom();

    const [error, setError] = useState('');

    const handleSave = () => {
        if (!layoutName.trim()) {
            setError('Por favor, insira um nome para o layout');
            return;
        }
        
        if (savedLayouts.some((layout: SavedLayout) => layout.name === layoutName.trim())) {
            setError('Já existe um layout com este nome');
            return;
        }

        saveCurrentLayout();
        setError('')
    };

    if (!saveModalOpen) return null;

    return (
        <ModalContainer onClick={() => dispatch({ type: 'TOGGLE_SAVE_MODAL', payload: false })}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <h3>Salvar Layout</h3>
                </ModalHeader>
                
                <div style={{ padding: '1rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="layoutName" style={{ display: 'block', marginBottom: '0.5rem' }}>
                            Nome do Layout
                        </label>
                        <input
                            id="layoutName"
                            type="text"
                            value={layoutName}
                            onChange={(e) => {
                                setError('');
                                dispatch({ type: 'SET_LAYOUT_NAME', payload: e.target.value });
                            }}
                            placeholder="Ex: Aula Segunda-feira, Prova Final"
                            aria-label="Nome do layout"
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: `1px solid ${error ? '#f44336' : '#ccc'}`,
                                borderRadius: '4px'
                            }}
                        />
                    </div>
                    
                    {error && (
                        <div style={{ 
                            color: '#f44336',
                            fontSize: '0.875rem',
                            marginTop: '0.5rem'
                        }}>
                            {error}
                        </div>
                    )}
                </div>

                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    padding: '1rem',
                    gap: '0.5rem',
                    borderTop: '1px solid #eee'
                }}>
                    <ActionButton
                        onClick={() => dispatch({ type: 'TOGGLE_SAVE_MODAL', payload: false })}
                    >
                        Cancelar
                    </ActionButton>
                    <ActionButton
                        onClick={handleSave}
                        disabled={!!error}
                    >
                        Salvar
                    </ActionButton>
                </div>
            </div>
        </ModalContainer>
    );
};

export default SaveLayoutModal;