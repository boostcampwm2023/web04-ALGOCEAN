import styled from 'styled-components';

interface TagProps {
  tag: string;
}

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  font-size: 0.8rem;
  color: var(--color-grayscale-200);

  .selected,
  div:hover {
    color: var(--color-grayscale-black);
    font-weight: 500;
    cursor: default;
  }
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
  padding: 1rem 0.5rem;
  color: #6e8091;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grayscale-50);
  }
`;

export const ItemMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  width: 1px;
`;

export const Title = styled.h4`
  width: 100%;
  color: #38424c;
  font: 700 1rem 'Noto Sans KR';
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Details = styled.div`
  display: flex;
  gap: 1rem;
  color: #879298;
  font: 300 0.875rem 'Noto Sans KR';
`;

export const AdoptBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: #4f60ff;
`;

export const Author = styled.div``;
export const Date = styled.div``;

export const ItemAside = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-shrink: 0;

  > * {
    width: 6rem;

    img {
      margin-right: 0.2rem;
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export const Tag = styled.div<TagProps>`
  color: ${({ tag }) => {
    switch (tag) {
      case 'programemrs':
        return '';
      case 'leetcode':
        return '';
      default:
        return '#2f77bb';
    }
  }};
  font: 500 0.875rem 'Noto Sans KR';
`;

export const ProgrammingLanguage = styled.div`
  font: 500 0.875rem 'Noto Sans KR';
`;

export const ViewCount = styled.div`
  display: flex;
  align-items: center;
  width: 4rem;
`;

export const LikeCount = styled.div`
  display: flex;
  align-items: center;
  width: 4rem;
`;

export const QuestionList = styled.section`
  width: 100%;
  min-width: 45rem;
  background-color: var(--color-grayscale-white);
`;
