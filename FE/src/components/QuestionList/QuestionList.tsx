import eyeIcon from '/icons/eye.svg';
import likeIcon from '/icons/like.svg';
import * as S from './QuestionList.styles';

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

const getColor = (programmingLanguage: string) => {
  switch (programmingLanguage) {
    case '프로그래머스':
      return 'var(--color-programmers)';
    case '리트코드':
      return 'var(--color-leetcode)';
    default:
      return 'var(--color-baekjoon)';
  }
};

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
    <S.Item data-id={id} color={getColor(tag)}>
      <div className="main">
        <div className="title">
          <h4>{title}</h4>
          {!!isAdopted && <div className="adopted">채택 완료</div>}
        </div>
        <div className="details">
          <span className="tag">{tag}</span>
          <span className="programming-language">{programmingLanguage}</span>
          <span className="nickname">{nickname}</span>
          <span className="created-at">{createdAt}</span>
        </div>
      </div>
      <div className="aside">
        <div className="view-count">
          <img src={eyeIcon} />
          <span>{viewCount}</span>
        </div>
        <div className="like-count">
          <img src={likeIcon} alt="좋아요 수" />
          <span>{likeCount}</span>
        </div>
      </div>
    </S.Item>
  );
}

export function QuestionList({ itemDatas }: { itemDatas: ItemData[] }) {
  return (
    <S.QuestionList>
      <Header />
      <ul>
        {itemDatas.map((itemData, idx) => (
          <Item key={idx} itemData={itemData} />
        ))}
      </ul>
    </S.QuestionList>
  );
}
