import { useNavigate } from 'react-router-dom';
import eyeIcon from '/icons/eye.svg';
import likeIcon from '/icons/like.svg';
import CheckIcon from '../../assets/icons/check-circle.svg?react';
import { getFormalizedDate } from '../../hooks/index';
import {
  Header as HeaderContainer,
  Item as ItemContainer,
  ItemMain,
  Title,
  Details,
  AdoptBadge,
  Author,
  Date,
  ItemAside,
  Tag,
  ProgrammingLanguage,
  ViewCount,
  LikeCount,
  QuestionList as QuestionListContainer,
} from './QuestionList.styles';

interface QuestionListProps {
  questionListData?: Array<ItemData> | undefined;
}

export function Header() {
  return (
    <HeaderContainer>
      <div className="by-recent selected">✔️ 최신순</div>
      <div className="by-old">오래된순</div>
    </HeaderContainer>
  );
}

interface ItemData {
  id: number;
  title: string;
  nickname: string;
  tag: string;
  createdAt: string;
  programmingLanguage: string;
  isAdopted: number;
  viewCount: number;
  likeCount: number;
}

export function Item({ itemData }: { itemData: ItemData }) {
  const navigate = useNavigate();
  const {
    id,
    title,
    nickname,
    tag,
    createdAt,
    programmingLanguage,
    isAdopted,
    viewCount,
    likeCount,
  } = itemData;

  const handleItemClick = () => {
    navigate(`/question/${id}`);
  };

  return (
    <ItemContainer data-id={id} onClick={handleItemClick}>
      <ItemMain>
        <Title>{title}</Title>
        <Details>
          {isAdopted && (
            <AdoptBadge>
              <CheckIcon />
              채택 완료
            </AdoptBadge>
          )}
          <Author>{nickname}</Author>
          <Date>{getFormalizedDate(createdAt)}</Date>
        </Details>
      </ItemMain>
      <ItemAside>
        <Tag $tag={tag}>{tag}</Tag>
        <ProgrammingLanguage>{programmingLanguage}</ProgrammingLanguage>
        <ViewCount>
          <img src={eyeIcon} />
          <span>{viewCount}</span>
        </ViewCount>
        <LikeCount>
          <img src={likeIcon} alt="좋아요 수" />
          <span>{likeCount}</span>
        </LikeCount>
      </ItemAside>
    </ItemContainer>
  );
}

export function QuestionList({ questionListData }: QuestionListProps) {
  return (
    <QuestionListContainer>
      <ul>
        {!!questionListData &&
          questionListData.map((itemData, idx) => (
            <Item key={idx} itemData={itemData} />
          ))}
      </ul>
    </QuestionListContainer>
  );
}
