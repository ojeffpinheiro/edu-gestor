import React, { useState } from 'react';
import {
  DidacticSequenceContainer,
  SequenceHeader,
  SequenceActions,
  StageCard,
  ModalOverlay,
  ModalContent,
  ModalActions
} from './styled';

import {
  Button,
  ActionButton,
  CancelButton
} from '../../styles/buttons';

import {
  Discipline,
  DidacticSequence,
  DidacticSequenceStage
} from '../../utils/types';

interface DidacticSequencesPageProps {
  discipline: Discipline;
}

const DidacticSequencesPage: React.FC<DidacticSequencesPageProps> = ({ discipline }) => {
  const [sequences, setSequences] = useState<DidacticSequence[]>([]);
  const [currentSequence, setCurrentSequence] = useState<DidacticSequence | null>(null);
  const [stages, setStages] = useState<DidacticSequenceStage[]>([]);

  const [isSequenceModalOpen, setIsSequenceModalOpen] = useState(false);
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);

  const handleCreateSequence = () => {
    setCurrentSequence(null);
    setIsSequenceModalOpen(true);
  };

  const handleEditSequence = (sequence: DidacticSequence) => {
    setCurrentSequence(sequence);
    setIsSequenceModalOpen(true);
  };

  const handleDeleteSequence = (sequenceId: string) => {
    // Implement delete logic
    setSequences(sequences.filter(seq => seq.id !== sequenceId));
  };

  const handleCreateStage = () => {
    if (!currentSequence) return;
    setIsStageModalOpen(true);
  };

  const handleEditStage = (stage: DidacticSequenceStage) => {
    // Implement stage editing logic
  };

  const handleDeleteStage = (stageId: string) => {
    setStages(stages.filter(stage => stage.id !== stageId));
  };

  return (
    <DidacticSequenceContainer>
      <SequenceHeader>
        <h1>Sequências Didáticas - {discipline.name}</h1>
        <SequenceActions>
          <ActionButton onClick={handleCreateSequence}>
            Nova Sequência Didática
          </ActionButton>
        </SequenceActions>
      </SequenceHeader>

      {sequences.map(sequence => (
        <div key={sequence.id}>
          <StageCard>
            <div>
              <h2>{sequence.title}</h2>
              <p>{sequence.description}</p>
            </div>
            <SequenceActions>
              <Button onClick={() => handleEditSequence(sequence)}>
                Editar
              </Button>
              <CancelButton onClick={() => handleDeleteSequence(sequence.id)}>
                Excluir
              </CancelButton>
              <ActionButton onClick={() => setCurrentSequence(sequence)}>
                Gerenciar Etapas
              </ActionButton>
            </SequenceActions>
          </StageCard>

          {currentSequence?.id === sequence.id && (
            <div>
              <SequenceHeader>
                <h2>Etapas da Sequência</h2>
                <Button onClick={handleCreateStage}>
                  Nova Etapa
                </Button>
              </SequenceHeader>
              {stages
                .filter(stage => stage.sequenceId === sequence.id)
                .map(stage => (
                  <StageCard key={stage.id}>
                    <div>
                      <h3>{stage.title}</h3>
                      <p>Objetivos de Aprendizagem: {stage.learningObjectives.join(', ')}</p>
                    </div>
                    <SequenceActions>
                      <Button onClick={() => handleEditStage(stage)}>
                        Editar
                      </Button>
                      <CancelButton onClick={() => handleDeleteStage(stage.id)}>
                        Excluir
                      </CancelButton>
                    </SequenceActions>
                  </StageCard>
                ))}
            </div>
          )}
        </div>
      ))}

      {isSequenceModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2>{currentSequence ? 'Editar' : 'Criar'} Sequência Didática</h2>
            {/* Add sequence form here */}
            <ModalActions>
              <CancelButton onClick={() => setIsSequenceModalOpen(false)}>
                Cancelar
              </CancelButton>
              <ActionButton>Salvar</ActionButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}

      {isStageModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2>{currentSequence ? 'Editar' : 'Criar'} Etapa</h2>
            {/* Add stage form here */}
            <ModalActions>
              <CancelButton onClick={() => setIsStageModalOpen(false)}>
                Cancelar
              </CancelButton>
              <ActionButton>Salvar</ActionButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </DidacticSequenceContainer>
  );
};

export default DidacticSequencesPage;