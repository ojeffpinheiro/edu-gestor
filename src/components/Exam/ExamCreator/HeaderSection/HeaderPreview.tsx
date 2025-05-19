import React from 'react';
import { Exam } from '../../../../utils/types/Exam';

import { 
  BoldLabel,
  PreviewContainer,
  HeaderContainer,
  LogoContainer,
  SchoolInfo,
  SchoolLine,
  GradeContainer,
  GradeBox,
  GradeLabel,
  GradeInput,
  Row1,
  Row2,
  Row3,
  FieldContainer,
  UnderlineField,
  LongField,
  TrimestreContainer,
  TrimestreBox,
  TitleArea,
  ExamTitle,
  ExamSubtitle,
  InstructionsArea,
  InstructionsList,
  InstructionsTitle
 } from './HeaderPreviewStyle'

interface HeaderPreviewProps {
  examData: Exam;
}

const HeaderPreview: React.FC<HeaderPreviewProps> = ({ examData }) => {
  const {
    schoolName,
    showStudentName,
    institutionLogo,
    withGradeSpace,
    showStudentId,
    instructions,
    showDate,
    schoolInfos = [
      'ESTADO DO RIO GRANDE DO SUL',
      'SECRETARIA DA EDUCAÇÃO – 2ª CRE',
      schoolName
    ]
  } = examData;

  const logoUrl = institutionLogo instanceof File
    ? URL.createObjectURL(institutionLogo)
    : null;

  return (
    <PreviewContainer>
      <HeaderContainer>
        <LogoContainer>
          {logoUrl && <img src={logoUrl} alt="School Logo" />}
        </LogoContainer>

        <SchoolInfo>
          {schoolInfos.map((line, index) => (
            <SchoolLine key={index}>{line}</SchoolLine>
          ))}
        </SchoolInfo>

        {withGradeSpace && (
          <GradeContainer>
            <GradeBox>
              <GradeLabel>NOTA:</GradeLabel>
              <GradeInput />
            </GradeBox>
          </GradeContainer>
        )}
      </HeaderContainer>

      {/* Linha 3: Professor + Disciplina */}
      <Row1>
        <FieldContainer>
          <BoldLabel>PROFESSOR:</BoldLabel>
          <UnderlineField hasValue={!!examData.createdBy}>
            {examData.createdBy}
          </UnderlineField>
        </FieldContainer>

        <FieldContainer>
          <BoldLabel>DISCIPLINA:</BoldLabel>
          <UnderlineField hasValue={!!examData.discipline}>
            {examData.discipline}
          </UnderlineField>
        </FieldContainer>
      </Row1>

      {/* Linha 4: Nome + Nº + Turma */}
      <Row2 hasStudentId={showStudentId}>
        {showStudentName && (
          <FieldContainer>
            <BoldLabel>NOME:</BoldLabel>
            <LongField hasValue={showStudentName} />
        </FieldContainer>
        )}

        {showStudentId && (
          <FieldContainer>
            <BoldLabel>Nº:</BoldLabel>
            <UnderlineField hasValue={false} />
          </FieldContainer>
        )}

        <FieldContainer>
          <BoldLabel>TURMA:</BoldLabel>
          <UnderlineField hasValue={false} />
        </FieldContainer>
      </Row2>

      {/* Linha 5: Data + Trimestre */}
      <Row3>
        {showDate && <FieldContainer>
          <BoldLabel>DATA:</BoldLabel>
          <UnderlineField style={{ minWidth: '100px' }} hasValue={false} />
        </FieldContainer> }

        <FieldContainer>
          <BoldLabel>TRIMESTRE:</BoldLabel>
          <TrimestreContainer>
            <TrimestreBox />
            <span>1 TRI</span>
            <TrimestreBox />
            <span>2 TRI</span>
            <TrimestreBox />
            <span>3 TRI</span>
          </TrimestreContainer>
        </FieldContainer>
      </Row3>

      <TitleArea>
        <ExamTitle>{examData.title}</ExamTitle>
        {examData.headerSubtitle && <ExamSubtitle>{examData.headerSubtitle}</ExamSubtitle>}
      </TitleArea>

      {/* Instruções */}
      <InstructionsArea>
        <InstructionsTitle>INSTRUÇÕES</InstructionsTitle>
        <InstructionsList>
          {instructions.length > 0 ? (
            instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))
          ) : (
            <li>Nenhuma instrução adicionada.</li>
          )}
        </InstructionsList>
      </InstructionsArea>
    </PreviewContainer>
  );
};

export default HeaderPreview;