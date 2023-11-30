import styled from 'styled-components';

interface ItemProps {
  $bgcolor: string;
}

export const Item = styled.div<ItemProps>`
  flex: 1;
  position: relative;

  width: 1px;
  height: 10rem;
  padding: 1.2rem 1rem;
  border-radius: 0.5rem;
  box-shadow: -0.2rem 0.2rem 0.2rem #00000025;
  background-color: ${({ $bgcolor }) => $bgcolor};
  color: var(--color-grayscale-white);
  transition: all 0.2s ease-in;
  cursor: pointer;

  &:hover {
    transform: translateY(-0.5rem);
  }

  h3 {
    font-size: 1rem;
    font-weight: 500;
  }

  div {
    width: 100%;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    font-weight: 300;
    line-height: 150%;
  }

  span {
    position: absolute;
    bottom: 1rem;
    font-size: 3rem;
  }
`;

export const UniqueQuestions = styled.div`
  display: flex;
  gap: 1rem;
`;
