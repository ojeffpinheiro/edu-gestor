import styled from "styled-components";

interface AttendanceGradeProps {
    grade: number;
  }
  
  export const AttendanceGrade = styled.span<AttendanceGradeProps>`
    font-weight: bold;
    color: ${({ grade }) =>
      grade >= 7 ? 'var(--color-success)' : grade >= 5 ? 'var(--color-warning)' : 'var(--color-danger)'};
  `;

