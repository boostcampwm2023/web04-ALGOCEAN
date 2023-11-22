import { useLayoutEffect, useState } from 'react';
import { Pagination } from '../index';
import { getQuestionList } from '../../api';
import eyeIcon from '/icons/eye.svg';
import likeIcon from '/icons/like.svg';
import CheckIcon from '../../assets/icons/check-circle.svg?react';
import { getFormalizedDate } from '../../hooks/index';
import * as S from './QuestionList.styles';

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
    <S.Header>
      <div className="by-recent selected">✔️ 최신순</div>
      <div className="by-old">오래된순</div>
    </S.Header>
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
    <S.Item data-id={id}>
      <S.ItemMain>
        <S.Title>{title}</S.Title>
        <S.Details>
          {isAdopted && (
            <S.AdoptBadge>
              <CheckIcon />
              채택 완료
            </S.AdoptBadge>
          )}
          <S.Author>{nickname}</S.Author>
          <S.Date>{getFormalizedDate(createdAt)}</S.Date>
        </S.Details>
      </S.ItemMain>
      <S.ItemAside>
        <S.Tag tag={tag}>{tag}</S.Tag>
        <S.ProgrammingLanguage>{programmingLanguage}</S.ProgrammingLanguage>
        <S.ViewCount>
          <img src={eyeIcon} />
          <span>{viewCount}</span>
        </S.ViewCount>
        <S.LikeCount>
          <img src={likeIcon} alt="좋아요 수" />
          <span>{likeCount}</span>
        </S.LikeCount>
      </S.ItemAside>
    </S.Item>
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
    <S.QuestionList>
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
    </S.QuestionList>
  );
}
