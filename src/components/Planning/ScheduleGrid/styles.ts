import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 120px repeat(5, 1fr);
  gap: 1px;
  background: #e0e0e0;
  border: 1px solid #e0e0e0;
`;

export const HeaderCell = styled.div`
  padding: 10px;
  background: #f5f5f5;
  font-weight: bold;
  text-align: center;
`;

export const TimeCell = styled.div`
  padding: 10px;
  background: #f5f5f5;
  text-align: center;
`;

export const Cell = styled.div`
  padding: 10px;
  background: white;
  min-height: 60px;
  position: relative;
  cursor: pointer;

  &:hover {
    background: #f9f9f9;
  }

  .lesson-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .add-lesson {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    color: #ccc;
  }
`;