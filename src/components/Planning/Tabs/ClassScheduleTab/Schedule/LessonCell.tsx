import React from 'react';
import { Lesson } from '../../../../../utils/types/Planning';

import { LessonInfo, EmptyCell, LessonCellContent } from './styles';

interface LessonCellProps {
  lesson?: Lesson;
  onClick: () => void;
}

const LessonCell: React.FC<LessonCellProps> = ({
  lesson,
  onClick,
}) => {
  return (
    <LessonCellContent isEmpty={!lesson} onClick={onClick}>
      {lesson ? (
        <LessonInfo>
          <strong>{lesson.discipline}</strong>
          <div>{lesson.team}</div>
        </LessonInfo>
      ) : (
        <EmptyCell>Clique para adicionar</EmptyCell>
      )}
    </LessonCellContent>
  );
};

export default LessonCell;