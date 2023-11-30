import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 5rem;
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  min-width: 900px;
  max-width: ${({ theme }) => theme.maxWidth};
  height: 100%;
  padding: 1rem 0;

  > div {
    flex-grow: 1;

    > div {
      ${({ theme }) => theme.font.bold16}
      color: ${({ theme }) => theme.color.grayscale[500]}
    }
    > span {
      ${({ theme }) => theme.font.medium14}
      color: ${({ theme }) => theme.color.grayscale[300]}
    }
  }

  > button {
    flex-shrink: 0;
  }
`;
