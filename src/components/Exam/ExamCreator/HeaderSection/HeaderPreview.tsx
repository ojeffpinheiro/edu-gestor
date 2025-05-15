import React from 'react';
import styled from 'styled-components';
import { Exam } from '../../../../utils/types/Exam';

const PreviewContainer = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  background-color: white;
  font-family: Arial, sans-serif;
`;

/* Sistema de Grid Principal */
const HeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px;
  grid-template-areas:
    "school nota"
    "row1 row1"
    "row2 row2"
    "row3 row3"
    "title title"
    "instructions instructions";
  gap: 10px;
`;

/* Áreas do Grid */
const LogoArea = styled.div`
  grid-area: logo;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SchoolHeader = styled.div`
  text-align: center;
  line-height: 1.3;
  margin-bottom: 15px;
`;

const GradeUnderline = styled.span`
  border-bottom: 1px solid #000;
  width: 100px;
  height: 1em;
  display: inline-block;
`;

const SchoolArea = styled.div`
  grid-area: school;
  text-align: center;
  margin: 10px 0;
`;

const Row1 = styled.div`
  grid-area: row1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Row2 = styled.div<{ hasStudentId: boolean }>`
  grid-area: row2;
  display: grid;
  grid-template-columns: ${props => props.hasStudentId ? '1fr .3fr 1fr' : '1fr 1fr'};
  gap: 20px;
`;

const Row3 = styled.div`
  grid-area: row3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const TitleArea = styled.div`
  grid-area: title;
  text-align: center;
  margin: 20px 0;
`;

const InstructionsArea = styled.div`
  grid-area: instructions;
  border: 3px solid #000;
  padding-block: 1rem;
  padding: 1rem;
`;

/* Componentes Específicos */
const SchoolTitle = styled.h1`
  font-size: 18px;
  margin: 0;
  font-weight: bold;
  text-transform: uppercase;
`;

const SchoolSubtitle = styled.h2`
  font-size: 14px;
  margin: 5px 0;
  font-weight: bold;
`;

const ExamTitle = styled.h2`
  font-size: 16px;
  margin: 0;
  font-weight: bold;
  text-transform: uppercase;
`;

const ExamSubtitle = styled.h3`
  font-size: 14px;
  margin: 5px 0;
  font-weight: normal;
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const BoldLabel = styled.span`
  font-weight: bold;
  white-space: nowrap;
`;

const UnderlineField = styled.span<{ hasValue: boolean }>`
  border-bottom: ${props => props.hasValue ? 'none' : '1px solid #000'};
  min-width: 50px;
  flex-grow: 1;
  padding-right: ${props => props.hasValue ? '0' : '10px'};
`;

const LongField = styled(UnderlineField)`
  min-width: 150px;
`;

const TrimestreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const TrimestreBox = styled.div`
  border: 1px solid #000;
  width: 18px;
  height: 18px;
  margin: 0 2px;
`;

const InstructionsList = styled.ol`
  columns: 2;
  column-gap: 40px;
  padding-left: 0;
  margin: 10px 0;
  list-style-type: none;
  counter-reset: instruction-counter;

  li {
    margin-bottom: 8px;
    break-inside: avoid;
    position: relative;
    padding-left: 25px;
    
    &::before {
      content: counter(instruction-counter) ".";
      counter-increment: instruction-counter;
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  }
`;

const InstructionsTitle = styled.h3`
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 100%;
`;

const LogoContainer = styled.div`
  width: 80px;
  height: 80px;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const SchoolInfo = styled.div`
  text-align: center;
  flex-grow: 1;
`;

const SchoolLine = styled.div`
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  line-height: 1.3;
`;

const GradeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 20px;
`;

const GradeBox = styled.div`
  border: 3px solid #000;
  width: 7rem;
  height: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
`;


const GradeLabel = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  height: .75rem;
`;

const GradeInput = styled.div`
  border-bottom: 3px solid #000;
  width: 7rem;
  height: 20px;
`;

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
      schoolName || 'NOME DA ESCOLA'
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