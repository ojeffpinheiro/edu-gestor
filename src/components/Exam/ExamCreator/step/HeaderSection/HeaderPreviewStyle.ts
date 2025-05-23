
import styled from 'styled-components';

export const PreviewContainer = styled.div`
  padding: 20px;
  background-color: white;
`;

/* Sistema de Grid Principal */
export const HeaderGrid = styled.div`
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
export const LogoArea = styled.div`
  grid-area: logo;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const SchoolHeader = styled.div`
  text-align: center;
  line-height: 1.3;
  margin-bottom: 15px;
`;

export const GradeUnderline = styled.span`
  border-bottom: 1px solid #000;
  width: 100px;
  height: 1em;
  display: inline-block;
`;

export const SchoolArea = styled.div`
  grid-area: school;
  text-align: center;
  margin: 10px 0;
`;

export const Row1 = styled.div`
  grid-area: row1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

export const Row2 = styled.div<{ hasStudentId: boolean }>`
  grid-area: row2;
  display: grid;
  grid-template-columns: ${props => props.hasStudentId ? '1fr .3fr 1fr' : '1fr 1fr'};
  gap: 20px;
`;

export const Row3 = styled.div`
  grid-area: row3;
  display: grid;
  grid-template-columns: .73fr 1fr;
  gap: 20px;
`;

export const TitleArea = styled.div`
  grid-area: title;
  text-align: center;
  margin: 20px 0;
`;

export const InstructionsArea = styled.div`
  grid-area: instructions;
  border: 3px solid var(--color-border);
  padding-block: 1rem;
  padding: 1rem;
`;

/* Componentes Específicos */
export const SchoolTitle = styled.h1`
  font-size: 18px;
  margin: 0;
  font-weight: bold;
  text-transform: uppercase;
`;

export const SchoolSubtitle = styled.h2`
  font-size: 14px;
  margin: 5px 0;
  font-weight: bold;
`;

export const ExamTitle = styled.h2`
  font-size: 16px;
  margin: 0;
  font-weight: bold;
  text-transform: uppercase;
  color: #000;
`;

export const ExamSubtitle = styled.h3`
  font-size: 14px;
  margin: 5px 0;
  font-weight: normal;
`;

export const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const BoldLabel = styled.span`
  font-weight: bold;
  white-space: nowrap;
`;

export const UnderlineField = styled.span<{ hasValue: boolean }>`
  border-bottom: ${props => props.hasValue ? 'none' : '1px solid #000'};
  min-width: 50px;
  flex-grow: 1;
  padding-right: ${props => props.hasValue ? '0' : '10px'};
`;

export const LongField = styled(UnderlineField)`
  min-width: 150px;
`;

export const TrimestreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const TrimestreBox = styled.div`
  border: 1px solid #000;
  width: 18px;
  height: 18px;
  margin: 0 2px;
`;

export const InstructionsList = styled.ol`
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

export const InstructionsTitle = styled.h3`
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  color: #000;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  width: 100%;
`;

export const LogoContainer = styled.div`
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

export const SchoolInfo = styled.div`
  text-align: center;
  flex-grow: 1;
`;

export const SchoolLine = styled.div`
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  line-height: 1.3;
`;

export const GradeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 20px;
`;

export const GradeBox = styled.div`
  border: 3px solid #000;
  width: 7rem;
  height: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
`;


export const GradeLabel = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  height: .75rem;
`;

export const GradeInput = styled.div`
  border-bottom: 3px solid #000;
  width: 7rem;
  height: 20px;
`;
