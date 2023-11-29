import { useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import {
  QuestionDetailData as QuestionData,
  QuestionAnswerCardProps,
} from 'src/types/type';

import { Container } from './QuestionDetailPage.styles';

const dummyQuestionAnswerCardProps = {
  cardData: {
    userId: 122,
    nickname: '질문자 본인',
    answerId: 1243,
    content:
      't incidunt. Ut fugit possimus sequi voluptatem. Qui quas reprehenderit ut repellendus sint aut voluptatibus. Veniam vel ut dolorum voluptas. Culpa deleniti rerum inventore enim asperiores eius neque eveniet.',
    videoLink: '',
    isAdopted: true,
    createdAt: '2023-11-27T13:17:31.000Z',
    isLiked: false,
  },
} as const;
const dummyQuestionAnswerCardProps2 = {
  cardData: {
    userId: 124,
    nickname: '제주도 감귤',
    answerId: 1243,
    content:
      't incidunt. Ut fugit possimus sequi voluptatem. Qui quas reprehenderit ut repellendus sint aut voluptatibus. Veniam vel ut dolorum voluptas. Culpa deleniti rerum inventore enim asperiores eius neque eveniet.',
    videoLink: '',
    isAdopted: false,
    createdAt: '2023-11-27T13:17:31.000Z',
    isLiked: false,
  },
} as const;
const dummyQuestionAnswerList = [
  dummyQuestionAnswerCardProps,
  dummyQuestionAnswerCardProps2,
];
const GLOBAL_USER_ID = 123;

const QuestionDetailPage = () => {
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isUserAnswering, setIsUserAnswering] = useState(false);
  const [isUserAnswered, setIsUserAnswered] = useState(false);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [answerList, setAnswerList] = useState<
    QuestionAnswerCardProps[] | null
  >(null);

  const activateUserAnswering = () => {
    setIsUserAnswering(true);
  };

  const deactivateUserAnswering = () => {
    setIsUserAnswering(false);
  };

  const submitUserAnswer = async (content: string) => {
    setIsUserAnswered(true);

    const newAnswerData = await postAnswer(content);
    setAnswerList((prevList) => [...prevList!, newAnswerData]);

    alert(`${content} 추가 완료`);
    deactivateUserAnswering();
  };

  const isAnswerListContainsUserAnswer = () => {
    return answerList!.find(
      ({ cardData }) => cardData.userId === GLOBAL_USER_ID,
    );
  };

  const initAnswerList = async () => {
    const { questionId } = state;
    try {
      const answerList = await getQuestionAnswerListData(questionId);
      setAnswerList(answerList);
    } catch (e) {
      setAnswerList(dummyQuestionAnswerList);
    }
  };

  const initQuestionDetailContentData = async () => {
    const { questionId } = state;
    const questionData = await getQuestionDetailContentData(questionId);
    setQuestionData(questionData);
  };

  const initFetchData = async () => {
    await initQuestionDetailContentData();
    await initAnswerList();
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    initFetchData();
  }, []);

  useLayoutEffect(() => {
    if (answerList && isAnswerListContainsUserAnswer()) {
      setIsUserAnswered(true);
    } else {
      setIsUserAnswered(false);
    }
  }, [answerList]);

  return (
    <Container>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          {questionData && (
            <QuestionDetailContent questionData={questionData} />
          )}
          {!isUserAnswered && !isUserAnswering && (
            <QuestionAnswerRequestCard
              onAnswerButtonClick={activateUserAnswering}
            />
          )}
          {isUserAnswering && (
            <QuestionAnswerFormCard
              handleCancel={deactivateUserAnswering}
              handleSubmit={submitUserAnswer}
            />
          )}
          {!!answerList &&
            answerList.map(({ cardData }) => (
              <QuestionAnswerCard cardData={cardData} />
            ))}
        </>
      )}
    </Container>
  );
};

export default QuestionDetailPage;
