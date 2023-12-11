import styled from 'styled-components';

interface TagProps {
  $tag: string;
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
  color: ${({ theme }) => theme.color.grayscale[200]};

  .selected,
  div:hover {
    color: ${({ theme }) => theme.color.grayscale.black};
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
  color: ${({ theme }) => theme.color.grayscale[400]};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.1s ease-in all;

  &:hover {
    background-color: ${({ theme }) => theme.color.grayscale[50]};
  }
`;

export const ItemMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  width: 1px;
`;

export const Title = styled.h3`
  width: 100%;
  color: ${({ theme }) => theme.color.grayscale[500]};
  ${({ theme }) => theme.font.bold16}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Details = styled.div`
  display: flex;
  gap: 1rem;
  color: ${({ theme }) => theme.color.grayscale[400]};
  ${({ theme }) => theme.font.light14}
`;

export const AdoptBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: ${({ theme }) => theme.color.mainColor.blueMain};
  ${({ theme }) => theme.font.medium14}
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
    ${({ theme }) => theme.font.medium14}

    svg {
      margin-right: 0.2rem;
      width: 1.5rem;
      height: 1.5rem;
      fill: ${({ theme }) => theme.color.grayscale[400]};
    }
  }
`;

export const Tag = styled.div<TagProps>`
  color: ${({ $tag, theme }) => theme.color.rainbow[$tag] || 'inherit'};
`;

export const ProgrammingLanguage = styled.div``;

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
`;
