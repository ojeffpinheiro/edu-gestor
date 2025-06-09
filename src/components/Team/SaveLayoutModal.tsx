import React from 'react';
import { useClassroom } from '../../contexts/ClassroomContext';

export const SaveLayoutModal: React.FC = () => {
    const {
        state: { layoutName, saveModalOpen },
        dispatch,
        actions: { saveCurrentLayout }
    } = useClassroom();

    if (!saveModalOpen) return null;

    return (
        <div className="modal-overlay" onClick={() => dispatch({ type: 'TOGGLE_SAVE_MODAL', payload: false })}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3>Salvar Layout</h3>
                <input
                    type="text"
                    value={layoutName}
                    onChange={(e) => dispatch({ type: 'SET_LAYOUT_NAME', payload: e.target.value })}
                    placeholder="Nome do layout (ex: Aula 1, Prova)"
                    aria-label="Nome do layout"
                />
                <div className="modal-actions">
                    <button onClick={() => dispatch({ type: 'TOGGLE_SAVE_MODAL', payload: false })}>
                        Cancelar
                    </button>
                    <button onClick={saveCurrentLayout}>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};