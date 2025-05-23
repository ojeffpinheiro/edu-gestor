import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { FiInfo, FiUpload, FiEye, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import {
  SectionTitle,
  FormSection,
  InputGroup,
  ResponsiveWrapper,
  SchoolInfoItem
} from '../ExamSettingsForm/styles';
import { Exam } from '../../../../../utils/types/Exam';
import { Label, Switch, SwitchRow } from '../../../../../styles/inputs';
import HeaderPreview from './HeaderPreview';

import { SecondaryButton } from '../../../../../styles/buttons';
import { ButtonGroup } from '../QuestionSelectionStep/styles';

interface HeaderSectionProps {
  examData: Exam;
  onDataChange: (data: Partial<Exam>) => void;
  onBack: () => void;
  onNext: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ examData, onDataChange, onBack, onNext }) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (field: keyof Exam, value: any) => {
    onDataChange({ ...examData, [field]: value });
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...examData.instructions];
    newInstructions[index] = value;
    onDataChange({ instructions: newInstructions });
  };

  const addInstruction = () => {
    onDataChange({ instructions: [...examData.instructions, ''] });
  };

  const removeInstruction = (index: number) => {
    const newInstructions = [...examData.instructions];
    newInstructions.splice(index, 1);
    onDataChange({ instructions: newInstructions });
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <FormSection>
      <SectionTitle>
        <FiInfo />
        <h3>Cabeçalho da Prova</h3>
        <SecondaryButton onClick={togglePreview}>
          <FiEye /> {showPreview ? 'Ocultar Prévia' : 'Ver Prévia'}
        </SecondaryButton>
      </SectionTitle>

      <ResponsiveWrapper>
        <InputGroup>
          <label htmlFor="headerStyle">Estilo do Cabeçalho</label>
          <select
            id="headerStyle"
            value={examData.headerStyle}
            onChange={(e) => handleInputChange('headerStyle', e.target.value)}
            required
          >
            <option value="standard">Padrão</option>
            <option value="custom">Personalizado</option>
          </select>
        </InputGroup>
      </ResponsiveWrapper>

      {examData.headerStyle === 'standard' && (
        <>
          {/* Logo Upload */}
          <ResponsiveWrapper>
            <InputGroup>
              <div className="file-upload">
                <input
                  id="school-logo"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleInputChange('institutionLogo', e.target.files[0]);
                    }
                  }}
                />
                <label htmlFor="school-logo" className="upload-button">
                  <FiUpload /> Selecionar Logo
                </label>
                {examData.institutionLogo && (
                  <span className="file-name">
                    {examData.institutionLogo instanceof File
                      ? examData.institutionLogo.name
                      : 'Logo selecionada'}
                  </span>
                )}
              </div>
            </InputGroup>
          </ResponsiveWrapper>

          {/* Seção de informações da escola com controle dinâmico */}
          <InputGroup>
            <label>Informações da Escola</label>
            <div className="school-info-fields">
              {(examData.schoolInfos?.length ? examData.schoolInfos : [
                'ESTADO DO RIO GRANDE DO SUL',
                '2ª COORDENADORIA',
                'EEEM 9 DE OUTUBRO'
              ]).map((info, index) => (
                <SchoolInfoItem key={index}>
                  <input
                    type="text"
                    value={info}
                    onChange={(e) => {
                      const newInfos = [...(examData.schoolInfos || [
                        'ESTADO DO RIO GRANDE DO SUL',
                        '2ª COORDENADORIA',
                        'EEEM 9 DE OUTUBRO'
                      ])];
                      newInfos[index] = e.target.value;
                      handleInputChange('schoolInfos', newInfos);
                    }}
                    placeholder={`Informação da linha ${index + 1}`}
                    className="school-info-input"
                  />
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => {
                      const newInfos = [...(examData.schoolInfos || [
                        'ESTADO DO RIO GRANDE DO SUL',
                        '2ª COORDENADORIA',
                        'EEEM 9 DE OUTUBRO'
                      ])];
                      newInfos.splice(index, 1);
                      handleInputChange('schoolInfos', newInfos.length ? newInfos : undefined);
                    }}
                  >
                    <FaTimes />
                  </button>
                </SchoolInfoItem>
              ))}
              <button
                type="button"
                className="add-btn"
                onClick={() => {
                  handleInputChange('schoolInfos', [
                    ...(examData.schoolInfos || [
                      'ESTADO DO RIO GRANDE DO SUL',
                      '2ª COORDENADORIA',
                      'EEEM 9 DE OUTUBRO'
                    ]),
                    ''
                  ]);
                }}
              >
                + Adicionar Linha
              </button>
            </div>
          </InputGroup>

          <ResponsiveWrapper>
            <SwitchRow>
              <Switch>
                <input
                  id="with-grade-space"
                  type="checkbox"
                  checked={examData.withGradeSpace}
                  onChange={(e) => handleInputChange('withGradeSpace', e.target.checked)}
                />
                <span></span>
              </Switch>
              <Label>Incluir espaço para nota</Label>
            </SwitchRow>

            <SwitchRow>
              <Switch>
                <input
                  id="show-student-name"
                  type="checkbox"
                  checked={examData.showStudentName}
                  onChange={(e) => handleInputChange('showStudentName', e.target.checked)}
                />
                <span></span>
              </Switch>
              <Label>Campo para nome do aluno</Label>
            </SwitchRow>
          </ResponsiveWrapper>

          <ResponsiveWrapper>
            <SwitchRow>
              <Switch>
                <input
                  id="show-student-id"
                  type="checkbox"
                  checked={examData.showStudentId}
                  onChange={(e) => handleInputChange('showStudentId', e.target.checked)}
                />
                <span></span>
              </Switch>
              <Label>Campo para número/ID do aluno</Label>
            </SwitchRow>

            <SwitchRow>
              <Switch>
                <input
                  id="show-date"
                  type="checkbox"
                  checked={examData.showDate}
                  onChange={(e) => handleInputChange('showDate', e.target.checked)}
                />
                <span></span>
              </Switch>
              <Label>Campo para data</Label>
            </SwitchRow>
          </ResponsiveWrapper>

          <InputGroup>
            <label htmlFor="exam-instructions">Instruções da Prova</label>
            <div className="instructions-list">
              {examData.instructions.map((instruction, index) => (
                <div className="instruction-item" key={index}>
                  <input
                    type="text"
                    value={instruction}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                    placeholder={`Instrução ${index + 1}`}
                  />
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeInstruction(index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              <button type="button" className="add-btn" onClick={addInstruction}>
                + Adicionar Instrução
              </button>
            </div>
          </InputGroup>
        </>
      )}

      {examData.headerStyle === 'custom' && (
        <InputGroup>
          <label htmlFor="school-logo">
            Logotipo da Instituição (Recomendado: 150x150px, formato PNG)
          </label>
          <div className="file-upload">
            <input
              id="school-logo"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleInputChange('institutionLogo', e.target.files[0]);
                }
              }}
            />
            <label htmlFor="school-logo" className="upload-button">
              <FiUpload /> Selecionar Logo
            </label>
            {examData.institutionLogo && (
              <span className="file-name">
                {examData.institutionLogo instanceof File
                  ? examData.institutionLogo.name
                  : 'Logo selecionada'}
              </span>
            )}
          </div>
        </InputGroup>
      )}

      {showPreview && (
        <HeaderPreview examData={examData} />
      )}

      <ButtonGroup>
        <button type="button" onClick={onBack} className="secondary">
          <FiArrowLeft /> Voltar
        </button>

        <button
          type="button"
          onClick={onNext}
        >
          Próximo <FiArrowRight />
        </button>
      </ButtonGroup>

    </FormSection>
  );
};

export default HeaderSection;