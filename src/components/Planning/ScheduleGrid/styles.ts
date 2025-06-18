import styled from 'styled-components';
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 120px repeat(5, 1fr);
  min-width: 800px;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

export const HeaderCell = styled.div`
  padding: 12px;
  background: #3f51b5;
  color: white;
  font-weight: bold;
  text-align: center;
  position: sticky;
  top: 0;
`;

export const TimeCell = styled.div<{ isBreak?: boolean }>`
  padding: 12px;
  background: ${({ isBreak }) => isBreak ? '#fff8e1' : '#f5f5f5'};
  font-weight: bold;
  text-align: center;
  border-right: 1px solid #e0e0e0;
  position: sticky;
  left: 0;
  color: ${({ isBreak }) => isBreak ? '#ff8f00' : 'inherit'};
`;

export const Cell = styled.div<{ hasLesson?: boolean }>`
  padding: 8px;
  min-height: 80px;
  position: relative;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  background: ${({ hasLesson }) => hasLesson ? '#e8f5e9' : 'white'};

  &:hover {
    background: ${({ hasLesson }) => hasLesson ? '#d4edda' : '#f5f5f5'};
  }

  .lesson-content {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 8px;
    border-radius: 4px;
    height: 100%;

    strong {
      color: #1b5e20;
      font-size: 0.95rem;
      font-weight: 500;
    }

    span {
      color: #424242;
      font-size: 0.8rem;
      display: block;
    }
  }

  .add-lesson {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #bdbdbd;
    font-size: 1.5rem;
    font-weight: bold;
  }
`;