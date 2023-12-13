import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSuspenseQueries } from '@tanstack/react-query';
import {
  QuestionDetailContent,
  QuestionAnswerRequestCard,
  QuestionAnswerCard,
  QuestionAnswerFormCard,
} from '../../components';
import {
  getQuestionDetailContentData,
  getQuestionAnswerListData,
  postAnswer,
} from '../../api';
import { QuestionDetailPageMetas } from '../../metas/metas';
import { Container, NoAnswer } from './QuestionDetailPage.styles';

const QuestionDetailPage = () => {
  const { id: questionId } = useParams();
  const [answerState, setAnswerState] = useState<
    'notyet' | 'progress' | 'done'
  >('notyet');

  const submitAnswer = async (content: string) => {
    await postAnswer(content, questionId!);
    setAnswerState(() => 'done');
  };

  const questionDetailContentQueryFn = async () => {
    return await getQuestionDetailContentData(questionId!);
  };

  const questionDetailAnswerListQueryFn = async () => {
    return await getQuestionAnswerListData(questionId!);
  };

  const [
    { data: questionDetailContentData },
    { data: questionAnswerListData },
  ] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['questionDetailContent', questionId],
        queryFn: questionDetailContentQueryFn,
        staleTime: 10 * 6000,
        gcTime: 30 * 1000,
        refetchOnWindowFocus: false,
        retry: false,
      },
      {
        queryKey: ['questionDetailAnswer', questionId, answerState],
        queryFn: questionDetailAnswerListQueryFn,
        staleTime: 30 * 1000,
        gcTime: 30 * 1000,
        refetchOnWindowFocus: false,
        retry: false,
      },
    ],
  });

  return (
    <Container>
      <QuestionDetailPageMetas />
      <QuestionDetailContent questionData={questionDetailContentData} />
      {answerState === 'notyet' && (
        <QuestionAnswerRequestCard
          onAnswerButtonClick={() => setAnswerState('progress')}
        />
      )}
      {answerState === 'progress' && (
        <QuestionAnswerFormCard
          handleCancel={() => setAnswerState('notyet')}
          handleSubmit={submitAnswer}
        />
      )}
      {!!questionAnswerListData &&
        questionAnswerListData.map((answer, idx: number) => (
          <QuestionAnswerCard key={idx} cardData={answer} />
        ))}
      {!questionAnswerListData && <NoAnswer>답변이 없습니다</NoAnswer>}
    </Container>
  );
};

export default QuestionDetailPage;
