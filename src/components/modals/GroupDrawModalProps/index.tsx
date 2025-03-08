import React, { useState } from "react";
import { FaRandom } from "react-icons/fa";
import { Student } from '../../../utils/types';
import { realizarSorteioGrupos } from '../../../hooks/useRandomSelection';
import {
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CloseButton,
    Input,
    Button
} from "./styles";

interface GroupDrawModalProps {
    alunos: Student[];
    onClose: () => void;
}

const GroupDrawModal: React.FC<GroupDrawModalProps> = ({ alunos, onClose }) => {
    const [tamanhoGrupo, setTamanhoGrupo] = useState<number>(2);
    const [numeroGrupos, setNumeroGrupos] = useState<number>(1);
    const [gruposSorteados, setGruposSorteados] = useState<Student[][]>([]);
    const [sortearPorNumeroGrupos, setSortearPorNumeroGrupos] = useState<boolean>(false);

    const handleRealizarSorteio = () => {
        let grupos: Student[][] = [];
        if (sortearPorNumeroGrupos) {
            const tamanhoCalculado = Math.ceil(alunos.length / numeroGrupos);
            grupos = realizarSorteioGrupos(alunos, tamanhoCalculado);
        } else {
            grupos = realizarSorteioGrupos(alunos, tamanhoGrupo);
        }
        setGruposSorteados(grupos);
    };

    return (
        <ModalContainer>
            <ModalContent>
                <ModalHeader>
                    <h3>Sorteio de Grupos</h3>
                    <CloseButton onClick={onClose}>×</CloseButton>
                </ModalHeader>
                <ModalBody>
                    <label>
                        <input
                            type="checkbox"
                            checked={sortearPorNumeroGrupos}
                            onChange={() => setSortearPorNumeroGrupos(!sortearPorNumeroGrupos)}
                        />
                        Sortear por número de grupos
                    </label>
                    {sortearPorNumeroGrupos ? (
                        <Input
                            type="number"
                            min="1"
                            max={alunos.length}
                            value={numeroGrupos}
                            onChange={(e) => setNumeroGrupos(parseInt(e.target.value))}
                        />
                    ) : (
                        <Input
                            type="number"
                            min="2"
                            max={alunos.length}
                            value={tamanhoGrupo}
                            onChange={(e) => setTamanhoGrupo(parseInt(e.target.value))}
                        />
                    )}

                    <Button variant="primary" onClick={handleRealizarSorteio}>
                        <FaRandom /> Realizar Sorteio
                    </Button>

                    {gruposSorteados.length > 0 && (
                        <div>
                            <h4>Grupos Formados:</h4>
                            {gruposSorteados.map((grupo, index) => (
                                <div key={index}>
                                    <h5>Grupo {index + 1}</h5>
                                    <ul>
                                        {grupo.map((aluno) => (
                                            <li key={aluno.id}>{aluno.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={onClose}>Fechar</Button>
                </ModalFooter>
            </ModalContent>
        </ModalContainer>
    );
};

export default GroupDrawModal;
