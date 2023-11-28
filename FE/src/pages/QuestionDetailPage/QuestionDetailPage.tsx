import { useState, useLayoutEffect } from 'react';
import {
  QuestionDetailContent,
  QuestionAnswerRequestCard,
  QuestionAnswerCard,
  QuestionAnswerFormCard,
} from '../../components';
import { QuestionAnswerCardProps } from 'src/types/type';
import { Container } from './QuestionDetailPage.styles';

const QuestionDetailContentProps = {
  questionData: {
    id: 123,
    title: 'Voluptas consequatur iure ea cupiditate.',
    nickname: '닉네임',
    tag: 'baekjoon',
    createdAt: '2023-11-27T13:17:31.000Z',
    programmingLanguage: 'C',
    isAdopted: false,
    viewCount: 123,
    likeCount: 12,
    isLiked: true,
    content:
      'Molestiae vel fugit vitae ut consequuntur minima sunt eaque ut. Dolor aut incidunt. Ut fugit possimus sequi voluptatem. Qui quas reprehenderit ut repellendus sint aut voluptatibus. Veniam vel ut dolorum voluptas. Culpa deleniti rerum inventore enim asperiores eius neque eveniet.',
  },
} as const;
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
  const [isUserAnswering, setIsUserAnswering] = useState(false);
  const [isUserAnswered, setIsUserAnswered] = useState(false);
  const [answerList, setAnswerList] = useState<
    QuestionAnswerCardProps[] | null
  >(null);

  const activateUserAnswering = () => {
    setIsUserAnswering(true);
  };

  const deactivateUserAnswering = () => {
    setIsUserAnswering(false);
  };

  const submitUserAnswer = (content: string) => {
    setIsUserAnswered(true);
    // ⚠️ 서버로의 POST 로직
    initAnswerList();
    alert(`${content} 추가 완료`);
    deactivateUserAnswering();
  };

  const isAnswerListContainsUserAnswer = () => {
    return answerList!.find(
      ({ cardData }) => cardData.userId === GLOBAL_USER_ID,
    );
  };

  const initAnswerList = async () => {
    const answerList = dummyQuestionAnswerList;
    setAnswerList(answerList);
  };

  useLayoutEffect(() => {
    if (answerList && isAnswerListContainsUserAnswer()) {
      setIsUserAnswered(true);
    } else {
      setIsUserAnswered(false);
    }
  }, [answerList]);

  useLayoutEffect(() => {
    initAnswerList();
  }, []);

  return (
    <Container>
      <QuestionDetailContent {...QuestionDetailContentProps} />
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
    </Container>
  );
};

export default QuestionDetailPage;
