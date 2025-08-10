import React from 'react'
import { Modal } from "../Modal";
import LoadingSpinner from '../shared/LoadingSpinner';

interface Props {
    count: number;
    isCombining: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const CombineQuestionsModal: React.FC<Props> = ({
    count,
    isCombining,
    onConfirm,
    onCancel
}) => {
    return (
        <>
            {isCombining ? (
                <LoadingSpinner message="Combinando questões..." />
            ) : (
                <Modal
                    title="Combinar Questões"
                    isOpen={true}
                    onClose={onCancel}
                    size="md"
                >
                    <p>Você está prestes a combinar {count} questões em uma nova questão composta.</p>
                    <p>Esta ação criará uma nova questão que referencia as questões selecionadas.</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                        <button onClick={onCancel}>Cancelar</button>
                        <button
                            onClick={onConfirm}
                            style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                        >
                            Confirmar Combinação
                        </button>
                    </div>
                </Modal>

            )}
        </>
    );
}

export default CombineQuestionsModal;