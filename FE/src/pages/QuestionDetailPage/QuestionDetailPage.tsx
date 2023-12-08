import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import Swal from 'sweetalert2';

const QuestionDetailPage = () => {
  const { id: questionId } = useParams();
  const { getAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [answerState, setAnswerState] = useState<
    'notyet' | 'progress' | 'done'
  >('notyet');
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [answerListData, setAnswerListData] = useState<
    QuestionAnswerCardProps[] | null
  >(null);

  const submitAnswer = async (content: string) => {
    if (!getAccessToken()) {
      Swal.fire({
        icon: 'error',
        title: '로그인후 답변가능합니다',
        confirmButtonText: '확인',
      });
      return navigate('/login');
    }

    await postAnswer(content, questionId!);
    setAnswerState(() => 'done');
    initAnswerListData();
  };

  const initQuestionDetailContentData = async () => {
    try {
      const questionData = await getQuestionDetailContentData(questionId!);
      setQuestionData(questionData);
    } catch (e) {
      return navigate('/notfound');
    }
  };

  const initAnswerListData = async () => {
    const answerListData = await getQuestionAnswerListData(questionId!);
    setAnswerListData(answerListData);
  };

  const initFetchData = async () => {
    await initQuestionDetailContentData();
    await initAnswerListData();
    setIsLoading(false);
  };

  useEffect(() => {
    initFetchData();
  }, []);

  useEffect(() => {
    // TODO : 이미 질문에 응답했는지 확인 여부 확인 필요
  }, []);

  return (
    <Container>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <QuestionDetailContent questionData={questionData!} />
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
          {!!answerListData &&
            answerListData.map(({ cardData }, idx) => (
              <QuestionAnswerCard key={idx} cardData={cardData} />
            ))}
          {!answerListData && <NoAnswer>답변이 없습니다</NoAnswer>}
        </>
      )}
    </Container>
  );
};

export default QuestionDetailPage;
