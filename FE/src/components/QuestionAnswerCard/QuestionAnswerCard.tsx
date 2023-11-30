import { useState, useEffect } from 'react';
import { KebabIcon, LikeIcon, CheckCircleIcon } from '../../assets/icons';
import { getFormalizedDate } from '../..//hooks';
import { QuestionAnswerCardProps } from '../../types/type';
import {
  Container,
  Inner,
  Header,
  Content,
  QuestionInfo,
  CreateInfo,
  LikeInfo,
  AdoptedBadge,
} from './QuestionAnswerCard.styles';

const QuestionAnswerCard = ({ cardData }: QuestionAnswerCardProps) => {
  const {
    Content: content,
    CreatedAt: createdAt,
    IsAdopted: isAdopted,
    User,
  } = cardData;
  const { Nickname: nickname } = User;
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // useDidMoundEffect로 변경 & API 로직 구현
  }, [isLiked]);

  return (
    <Container>
      <Inner>
        <Header isadopted={String(isAdopted)}>
          <div>A</div>
          {isAdopted && (
            <AdoptedBadge>
              <CheckCircleIcon width={32} height={32} />
              <span>질문자 채택</span>
            </AdoptedBadge>
          )}
          <KebabIcon />
        </Header>
        <Content dangerouslySetInnerHTML={{ __html: content }}></Content>
        <QuestionInfo>
          <CreateInfo>
            {nickname} {getFormalizedDate(createdAt)}
          </CreateInfo>
          <LikeInfo>
            <LikeIcon
              fill={isLiked ? '#4F60FF' : '#6E8091'}
              onClick={() => setIsLiked((prevValue) => !prevValue)}
            />
          </LikeInfo>
        </QuestionInfo>
      </Inner>
    </Container>
  );
};

export default QuestionAnswerCard;
