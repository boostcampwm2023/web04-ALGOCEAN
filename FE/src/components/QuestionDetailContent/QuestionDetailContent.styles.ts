import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 3rem 0;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

  svg {
    cursor: pointer;
  }
`;

export const Title = styled.h1`
  ${({ theme }) => theme.font.bold24}

  > div:last-of-type {
    color: ${({ theme }) => theme.color.mainColor.blueMain};
    font-weight: 900;
    font-size: 4rem;
    margin-bottom: 2rem;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

export const Content = styled.p`
  ${({ theme }) => theme.font.medium16};
`;

export const QuestionInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TagInfo = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const CreateInfo = styled.div``;

export const ViewLikeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  > span {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  > span:last-of-type > * {
    cursor: pointer;
  }
`;
