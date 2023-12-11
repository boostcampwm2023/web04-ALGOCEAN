import styled, { css } from 'styled-components';

interface ItemProps {
  $type: 'hot' | 'today' | 'random';
}

const hot = css`
  color: ${({ theme }) => theme.color.grayscale.white};
  background-color: ${({ theme }) => theme.color.rainbow.rainbowViolet};
`;

const today = css`
  color: ${({ theme }) => theme.color.grayscale[500]};
  background-color: ${({ theme }) => theme.color.rainbow.rainbowLilac};
`;

const random = css`
  color: ${({ theme }) => theme.color.grayscale.white};
  background-color: ${({ theme }) => theme.color.rainbow.rainbowCornFlower};
`;

const itemStyle = {
  hot,
  today,
  random,
};

export const ItemContainer = styled.div<ItemProps>`
  ${({ $type }) => itemStyle[$type]}

  flex: 1;
  position: relative;

  width: 12rem;
  height: 10.5rem;
  padding: 1rem;
  border-radius: 1rem;
  transition: all 0.2s ease-in;
  cursor: pointer;

  &:hover {
    transform: translateY(-0.5rem);
  }
`;

export const ItemTitle = styled.h2`
  ${({ theme }) => theme.font.bold16}
  margin-bottom: 0.5rem;
`;

export const ItemContent = styled.div`
  height: 2.7rem;
  ${({ theme }) => theme.font.medium14}
  line-height: 150%;
  word-break: break-all;
  overflow: hidden;
  white-space: no-wrap;
  text-overflow: ellipsis;
`;

export const ItemIcon = styled.img`
  position: absolute;
  bottom: 1rem;
  width: 3rem;
  height: 3rem;
`;

export const UniqueQuestionsContainer = styled.div`
  display: flex;
  gap: 1rem;

  width: 100%;
  flex: 1;
`;
