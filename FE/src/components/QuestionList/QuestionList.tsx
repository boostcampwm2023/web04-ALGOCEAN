import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../index';
import { getQuestionList } from '../../api';
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

const PAGINATION_SPLIT_NUMBER = 10;

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

export function Header() {
  return (
    <HeaderContainer>
      <div className="by-recent selected">✔️ 최신순</div>
      <div className="by-old">오래된순</div>
    </HeaderContainer>
  );
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
    navigate(`/question/${id}`, { state: { questionId: id } });
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

export function QuestionList() {
  const [wholePageCount, setwholePageCount] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [questionListData, setQuestionListData] = useState<ItemData[] | null>(
    null,
  );

  const getCurrentQuestionListData = async () => {
    const { questions, totalPage: totalPageNum } = await getQuestionList({
      page: currentPage + 1,
    });
    setQuestionListData(questions);
    setwholePageCount(totalPageNum);
  };

  const handleCurrentPage = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  useLayoutEffect(() => {
    getCurrentQuestionListData();
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <QuestionListContainer>
      <ul>
        {!!questionListData &&
          questionListData.map((itemData, idx) => (
            <Item key={idx} itemData={itemData} />
          ))}
      </ul>
      {!!wholePageCount && (
        <Pagination
          wholePageCount={wholePageCount}
          currentPage={currentPage}
          handleCurrentPage={handleCurrentPage}
          splitNumber={PAGINATION_SPLIT_NUMBER}
        />
      )}
    </QuestionListContainer>
  );
}
