import React from 'react'
import { Modal } from "../Modal";

const CombineQuestionsModal = ({
    count,
    onConfirm,
    onCancel
}: {
    count: number;
    onConfirm: () => void;
    onCancel: () => void;
}) => (
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
);

export default CombineQuestionsModal;