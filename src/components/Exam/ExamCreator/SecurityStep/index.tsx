import React from 'react'
import { ButtonGroup, ExamForm, FormSection, ResponsiveWrapper, SectionTitle } from "./styles";
import { FiArrowLeft, FiArrowRight, FiLock } from 'react-icons/fi';
import { InputGroup, Label, Select, Switch, SwitchRow } from '../../../../styles/inputs';
import { Exam } from '../../../../utils/types/Exam';

interface SecurityStepProps {
    examData: Exam;
    setExamData: (examData: Exam) => void;
    onBack: () => void;
    onNext: () => void;
}

const SecurityStep: React.FC<SecurityStepProps> = ({
    examData,
    setExamData,
    onBack,
    onNext
}) => {
    return (
        <ExamForm>
            <FormSection>
                <SectionTitle>
                    <FiLock />
                    <h3>Configurações de Correção</h3>
                </SectionTitle>

                <ResponsiveWrapper>
                    <InputGroup>
                        <Label htmlFor="correction-type">Tipo de Correção</Label>
                        <Select
                            id="correction-type"
                            value={examData.correctionType}
                            onChange={(e) => setExamData({ ...examData, correctionType: e.target.value as 'manual' | 'automatic' })}
                        >
                            <option value="automatic">Automática</option>
                            <option value="manual">Manual</option>
                        </Select>
                    </InputGroup>

                    <InputGroup>
                        <Label htmlFor="identification-method">Método de Identificação</Label>
                        <Select
                            id="identification-method"
                            value={examData.identificationMethod}
                            onChange={(e) => setExamData({ ...examData, identificationMethod: e.target.value as 'manual' | 'barcode' | 'qrcode' })}
                        >
                            <option value="barcode">Código de Barras</option>
                            <option value="qrcode">QR Code</option>
                            <option value="manual">Manual</option>
                        </Select>
                    </InputGroup>
                </ResponsiveWrapper>

                <SectionTitle>
                    <FiLock />
                    <h3>Segurança</h3>
                </SectionTitle>

                <ResponsiveWrapper>
                    <SwitchRow>
                        <Switch>
                            <input
                                id="require-password"
                                type="checkbox"
                                checked={examData.requirePassword}
                                onChange={(e) => setExamData({ ...examData, requirePassword: e.target.checked })}
                            />
                            <span></span>
                        </Switch>
                        <Label>Proteger com senha</Label>
                    </SwitchRow>
                </ResponsiveWrapper>

                {examData.requirePassword && (
                    <ResponsiveWrapper>
                        <InputGroup>
                            <label htmlFor="exam-password">Senha de Acesso</label>
                            <input
                                id="exam-password"
                                type="password"
                                value={examData.password}
                                onChange={(e) => setExamData({ ...examData, password: e.target.value })}
                                placeholder="Digite uma senha"
                            />
                        </InputGroup>
                    </ResponsiveWrapper>
                )}

                <ResponsiveWrapper>
                    <SwitchRow>
                        <Switch>
                            <input
                                id="is-public"
                                type="checkbox"
                                checked={examData.isPublic}
                                onChange={(e) => setExamData({ ...examData, isPublic: e.target.checked })}
                            />
                            <span></span>
                        </Switch>
                        <Label>Disponibilizar publicamente</Label>
                    </SwitchRow>
                </ResponsiveWrapper>

                {examData.isPublic && (
                    <ResponsiveWrapper>
                        <InputGroup>
                            <label htmlFor="access-code">Código de Acesso (opcional)</label>
                            <input
                                id="access-code"
                                type="text"
                                value={examData.accessCode}
                                onChange={(e) => setExamData({ ...examData, accessCode: e.target.value })}
                                placeholder="Código para acesso rápido"
                            />
                        </InputGroup>
                    </ResponsiveWrapper>
                )}
            </FormSection>

            <ButtonGroup>
                <button type="button" onClick={onBack} className="secondary">
                    <FiArrowLeft /> Voltar
                </button>
                <button type="button" onClick={onNext}>
                    Próximo <FiArrowRight />
                </button>
            </ButtonGroup>
        </ExamForm>
    )
}

export default SecurityStep;