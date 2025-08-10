import React, { useState } from 'react'
import { Modal } from "../Modal";
import LoadingSpinner from '../shared/LoadingSpinner';

interface Props {
    isOpen: boolean;
    count: number;
    isCombining: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const CombineQuestionsModal: React.FC<Props> = ({
    isOpen,
    count,
    isCombining,
    onConfirm,
    onCancel
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            await onConfirm();
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={onCancel} title="Combinar Questões" size="md">
            {isCombining ? (
                <LoadingSpinner message="Combinando questões..." />
            ) : (
                <>
                    <p>Você está prestes a combinar {count} questões em uma nova questão composta.</p>
                    <p>Esta ação criará uma nova questão que referencia as questões selecionadas.</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                        <button onClick={onCancel}>Cancelar</button>
                        <button
                            onClick={onConfirm}
                            style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                        >
                            Confirmar
                        </button>
                    </div>
                </>

            )}
        </Modal>
    );
}

export default CombineQuestionsModal;