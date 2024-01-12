import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  padding: 2rem 3rem;
`;

export const InnerDiv = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};

  ul {
    li:first-of-type {
      div:first-of-type {
        color: #ecbd00;
        font-weight: 700;
        text-decoration: underline;
      }
    }
    li:nth-of-type(2) {
      div:first-of-type {
        color: #c0c0c0;
        font-weight: 700;
        text-decoration: underline;
      }
    }
    li:nth-of-type(3) {
      div:first-of-type {
        color: #804a00;
        font-weight: 700;
        text-decoration: underline;
      }
    }
  }
`;

export const Header = styled.header`
  ${({ theme }) => theme.font.bold24};
  color: ${({ theme }) => theme.color.grayscale.black};
  margin-bottom: 3rem;
  cursor: default;
`;

export const Label = styled.label`
  margin-top: 1rem;
  ${({ theme }) => theme.font.bold16}
  color: ${({ theme }) => theme.color.grayscale[500]};
`;

export const RankingTitle = styled.div`
  ${({ theme }) => theme.font.bold16}
  margin-bottom: 1rem;
`;

export const RankingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 3rem;
  padding: 0 0.5rem;

  > div {
    width: 5rem;
    text-align: center;
    ${({ theme }) => theme.font.medium14}
    color: ${({ theme }) => theme.color.grayscale[400]};
    cursor: default;
  }

  > div:first-of-type {
    text-align: left;
  }

  > div:nth-of-type(2) {
    flex: 1;
    text-align: left;
  }
`;

export const MyRankingContainer = styled.div`
  width: 100%;
  padding-bottom: 5rem;
`;
