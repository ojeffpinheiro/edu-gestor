import React from 'react';
import { Exam } from '../../../../../utils/types/Exam';

import HeaderPreview from '../HeaderSection/HeaderPreview';
import AnswerSheet from '../../../AnswerSheet';

import {
  ExamContainer,
  ExamContent,
  OptionText,
  QuestionItem,
  QuestionText,
  EmptyState,
  QuestionsList,
  OptionItem,
  ExamFooter,
  QuestionBody,
  SourceText,
  OptionsContainer,
  OptionCircle,
  QuestionHeader
} from './styles'

interface ExamPreviewProps {
  examData: Exam;
}

function ExamPreview({ examData }: ExamPreviewProps) {

  const { questions } = examData;

  return (
    <ExamContainer>
      <HeaderPreview examData={examData} />

       <AnswerSheet
        questionsCount={questions.length}
        questionLayout={examData.questionLayout} />

      <ExamContent
        questionLayout={examData.questionLayout}
        compact={examData.compactMode}
        className="enem-style"
      >
        {questions.length === 0 ? (
          <EmptyState>Nenhuma questão adicionada à prova.</EmptyState>
        ) : (
          <QuestionsList>
            {questions.map((question, index) => (
              <QuestionItem key={question.id} data-layout={examData.questionLayout}>
                <QuestionHeader>
                  QUESTÃO {(index + 1).toString().padStart(2, '0')}
                </QuestionHeader>
                <QuestionBody>
                  <QuestionText>{question.statement}</QuestionText>

                  {question.source && (
                    <SourceText>
                      {question.source}
                      {question.accessDate && ` (Acesso em: ${question.accessDate})`}
                    </SourceText>
                  )}

                  {question.questionType === 'multiple_choice' && (
                    <OptionsContainer columns={question.optionsLayout === 'two-columns' ? 2 : 1}>
                      {question.alternatives?.map((option, optIndex) => (
                        <OptionItem key={optIndex}>
                          <OptionCircle>
                            {String.fromCharCode(97 + optIndex).toUpperCase()}
                          </OptionCircle>
                          <OptionText>{option.text}</OptionText>
                        </OptionItem>
                      ))}
                    </OptionsContainer>
                  )}
                </QuestionBody>
              </QuestionItem>
            ))}
          </QuestionsList>
        )}
      </ExamContent>

      {/* Rodapé estilo ENEM */}
      <ExamFooter>
        <div className="page-info">Página 1 de 1</div>
        {examData.schoolName && (
          <div className="school-info">{examData.schoolName}</div>
        )}
      </ExamFooter>
    </ExamContainer>
  );
}

export default ExamPreview;