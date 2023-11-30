import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  width: 100%;
  min-width: 900px;
  max-width: ${({ theme }) => theme.maxWidth};
  height: 100%;
  padding: 2rem 0;

  > div:nth-of-type(1) {
    width: 100%;

    .editor {
      height: 10rem;
    }
  }
`;

export const Header = styled.header`
  width: 100%;
  ${({ theme }) => theme.font.bold24};
  color: ${({ theme }) => theme.color.grayscale.black};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.color.grayscale[300]};

  > span {
    ${({ theme }) => theme.font.medium14};
  }

  > div {
    display: flex;
    gap: 0.5rem;
    ${({ theme }) => theme.font.medium16};

    > button:first-of-type {
      color: inherit;
    }
  }
`;
