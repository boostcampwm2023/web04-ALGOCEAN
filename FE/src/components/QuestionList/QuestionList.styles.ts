import styled from 'styled-components';

interface ItemProps {
  color: string;
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

export const Item = styled.li<ItemProps>`
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  width: 100%;
  padding: 1.5rem 1rem;
  border: 1px solid var(--color-grayscale-50);
  color: var(--color-grayscale-200);
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grayscale-50);
  }

  .main {
    flex: 1;
    width: 1px;

    .title {
      display: flex;
      justify-content: left;
      gap: 0.2rem;
      width: 100%;

      h4 {
        flex-shrink: 1;

        font-size: 1rem;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--color-grayscale-black);
      }

      .adopted {
        flex-shrink: 0;
        font-size: 0.7rem;
        font-weight: 300;
        padding: 0.3rem 0.5rem;
        border-radius: 1rem;
        color: var(--color-grayscale-white);
        background-color: var(--color-blue-100);
        position: relative;
        top: -0.1rem;
      }
    }

    .details {
      display: flex;
      gap: 1rem;
      margin-top: 0.8rem;

      .tag {
        color: ${({ color }) => color};
      }
    }
  }

  .aside {
    display: flex;
    gap: 0.5rem;

    .view-count,
    .like-count {
      display: flex;
      align-items: center;
      width: 3rem;
      flex-shrink: 0;

      img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
`;

export const QuestionList = styled.section`
  width: 100%;
  background-color: var(--color-grayscale-white);
  border-radius: 1rem;
`;
