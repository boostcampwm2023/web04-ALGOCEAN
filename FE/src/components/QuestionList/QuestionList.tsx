import { useLayoutEffect, useState } from 'react';
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
  ItemAside,
  Tag,
  ProgrammingLanguage,
  ViewCount,
  LikeCount,
  QuestionList as QuestionListContainer,
} from './QuestionList.styles';

const LAST_PAGINATION_PAGE = 11;
const PAGINATION_SPLIT_NUMBER = 10;

const LAST_PAGINATION_PAGE = 11;
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

  return (
    <ItemContainer data-id={id}>
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
        <Tag tag={tag}>{tag}</Tag>
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
  const [currentPage, setCurrentPage] = useState(0);
  const [questionListData, setQuestionListData] = useState<ItemData[] | null>(
    null,
  );

  const getCurrentQuestionListData = async () => {
    const data = await getQuestionList(currentPage + 1);
    setQuestionListData(data);
  };

  const handleCurrentPage = (nextPage: number) => {
    setCurrentPage(nextPage);
  };

  useLayoutEffect(() => {
    getCurrentQuestionListData();
  }, [currentPage]);

  return (
    <QuestionListContainer>
      <ul>
        {!!questionListData &&
          questionListData.map((itemData, idx) => (
            <Item key={idx} itemData={itemData} />
          ))}
      </ul>
      <Pagination
        wholePageCount={LAST_PAGINATION_PAGE}
        currentPage={currentPage}
        handleCurrentPage={handleCurrentPage}
        splitNumber={PAGINATION_SPLIT_NUMBER}
      />
    </QuestionListContainer>
  );
}
