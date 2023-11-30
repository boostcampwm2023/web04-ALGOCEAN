import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TagButton } from '../';
import {
  ArrowBackIcon,
  KebabIcon,
  EyeIcon,
  LikeIcon,
} from '../../assets/icons';
import { getFormalizedDate } from '../../hooks/index';
import { QuestionDetailContentProps } from '../../types/type';
import {
  Container,
  Inner,
  Header,
  Title,
  Content,
  QuestionInfo,
  CreateInfo,
  ViewLikeInfo,
  TagInfo,
} from './QuestionDetailContent.styles';

const QuestionDetailContent = ({
  questionData,
}: QuestionDetailContentProps) => {
  const navigate = useNavigate();
  const {
    title,
    nickname,
    tag,
    createdAt,
    programmingLanguage,
    viewCount,
    likeCount,
    isLiked: isLikedInitial,
    content,
  } = questionData;
  const [isLiked, setIsLiked] = useState(isLikedInitial);

  useEffect(() => {
    // 질문 좋아요 API 연동
  }, [isLiked]);

  return (
    <Container>
      <Inner>
        <Header>
          <ArrowBackIcon onClick={() => navigate(-1)} />
          <KebabIcon />
        </Header>
        <Title>
          <div>Q</div>
          {title}
        </Title>
        <Content dangerouslySetInnerHTML={{ __html: content }}></Content>
        <TagInfo>
          <TagButton content={programmingLanguage} isInteractive={false} />
          <TagButton content={tag} isInteractive={false} />
        </TagInfo>
        <QuestionInfo>
          <CreateInfo>
            {nickname} {getFormalizedDate(createdAt)}
          </CreateInfo>
          <ViewLikeInfo>
            <span>
              <EyeIcon /> {viewCount}
            </span>
            <span>
              <LikeIcon
                fill={isLiked ? '#4F60FF' : '#6E8091'}
                onClick={() => setIsLiked((v) => !v)}
              />
              {likeCount}
            </span>
          </ViewLikeInfo>
        </QuestionInfo>
      </Inner>
    </Container>
  );
};

export default QuestionDetailContent;
