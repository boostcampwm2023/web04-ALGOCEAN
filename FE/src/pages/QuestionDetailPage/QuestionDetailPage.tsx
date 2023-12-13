import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useSuspenseQuery,
  useQuery,
  keepPreviousData,
} from '@tanstack/react-query';
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
    refetchOnWindowFocus: false,
    retry: false,
  });

  return <QuestionDetailContent questionData={questionDetailContentData} />;
};

const QuestionAnswers = ({
  questionId,
  answerReloadTrigger,
}: {
  questionId: string;
  answerReloadTrigger: unknown;
}) => {
  const getAnswers = async () => {
    return await getQuestionAnswerListData(questionId!);
  };

  const { data: questionAnswerListData, isLoading } = useQuery({
    queryKey: ['questionDetailAnswer', questionId, answerReloadTrigger],
    queryFn: getAnswers,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
    placeholderData: keepPreviousData,
  });

  return (
    <AnswerContainer>
      {!!questionAnswerListData &&
        questionAnswerListData.map((answer, idx: number) => (
          <QuestionAnswerCard key={idx} cardData={answer} />
        ))}
      {!isLoading && !questionAnswerListData && (
        <NoAnswer>답변이 없습니다</NoAnswer>
      )}
    </AnswerContainer>
  );
};

const QuestionDetailPage = () => {
  const { id: questionId } = useParams();
  const [answerActivate, setAnswerActivate] = useState(false);
  const [answerCount, setAnswerCount] = useState(0);

  const submitAnswer = async (content: string) => {
    setAnswerActivate(false);
    await postAnswer(content, questionId!);
    setAnswerCount((v) => v + 1);
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
        <QuestionAnswers
          questionId={questionId!}
          answerReloadTrigger={answerCount}
        />
      </Suspense>
    </Container>
  );
};

export default QuestionDetailPage;
