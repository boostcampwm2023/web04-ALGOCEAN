import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  QuestionDetailContent,
  QuestionAnswerRequestCard,
  QuestionAnswerCard,
  QuestionAnswerFormCard,
  Loading,
} from '../../components';
import {
  getQuestionDetailContentData,
  getQuestionAnswerListData,
  postAnswer,
} from '../../api';
import { QuestionDetailPageMetas } from '../../metas/metas';
import {
  Container,
  AnswerContainer,
  NoAnswer,
} from './QuestionDetailPage.styles';

const QuestionContent = ({ questionId }: { questionId: string }) => {
  const getContent = async () => {
    return await getQuestionDetailContentData(questionId);
  };

  const { data: questionDetailContentData } = useSuspenseQuery({
    queryKey: ['questionDetailContent', questionId],
    queryFn: getContent,
    staleTime: 10 * 6000,
    gcTime: 30 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return <QuestionDetailContent questionData={questionDetailContentData} />;
};

const QuestionAnswers = ({ questionId }: { questionId: string }) => {
  const getAnswers = async () => {
    return await getQuestionAnswerListData(questionId!);
  };

  const { data: questionAnswerListData } = useSuspenseQuery({
    queryKey: ['questionDetailAnswer', questionId],
    queryFn: getAnswers,
    staleTime: 30 * 1000,
    gcTime: 30 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <AnswerContainer>
      {!!questionAnswerListData &&
        questionAnswerListData.map((answer, idx: number) => (
          <QuestionAnswerCard key={idx} cardData={answer} />
        ))}
      {!questionAnswerListData && <NoAnswer>답변이 없습니다</NoAnswer>}
    </AnswerContainer>
  );
};

const QuestionDetailPage = () => {
  const { id: questionId } = useParams();
  const [answerActivate, setAnswerActivate] = useState(false);

  const submitAnswer = async (content: string) => {
    setAnswerActivate(false);
    await postAnswer(content, questionId!);
  };

  return (
    <Container>
      <QuestionDetailPageMetas />
      <Suspense fallback={<Loading />}>
        <QuestionContent questionId={questionId!} />
        {!answerActivate && (
          <QuestionAnswerRequestCard
            onAnswerButtonClick={() => setAnswerActivate(true)}
          />
        )}
        {answerActivate && (
          <QuestionAnswerFormCard
            handleCancel={() => setAnswerActivate(false)}
            handleSubmit={submitAnswer}
          />
        )}
        <Suspense fallback={<div>답변 로딩중!</div>}>
          <QuestionAnswers questionId={questionId!} />
        </Suspense>
      </Suspense>
    </Container>
  );
};

export default QuestionDetailPage;
