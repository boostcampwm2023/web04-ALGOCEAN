import { useState, useLayoutEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

import { Container, NoAnswer } from './QuestionDetailPage.styles';
import { AuthContext } from '../../contexts/AuthContexts';
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
  const { getAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const activateUserAnswering = () => {
    setIsUserAnswering(true);
  };

  const deactivateUserAnswering = () => {
    setIsUserAnswering(false);
  };

  const submitUserAnswer = async (content: string) => {
    const isLogined = !!localStorage.getItem('userInfo');
    if (!isLogined || !getAccessToken()) {
      return navigate('/login');
    }

    const { questionId } = state;
    await postAnswer(content, questionId);
    setIsUserAnswered(true);
    initAnswerList();

    alert('답변이 성공적으로 추가되었습니다.');
    deactivateUserAnswering();
  };

  const isAnswerListContainsUserAnswer = () => {
    return answerList!.find(
      ({ cardData }) => cardData.User.Id === GLOBAL_USER_ID,
    );
  };

  const initAnswerList = async () => {
    const { questionId } = state;
    const answersData = await getQuestionAnswerListData(questionId);
    if (!answersData) {
      return;
    }
    const answerList = answersData.map((answer: QuestionAnswerCardProps) => {
      return { cardData: answer };
    });
    setAnswerList(answerList);
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
            answerList.map(({ cardData }, idx) => (
              <QuestionAnswerCard key={idx} cardData={cardData} />
            ))}
          {!answerList && <NoAnswer>답변이 없습니다</NoAnswer>}
        </>
      )}
    </Container>
  );
};

export default QuestionDetailPage;
