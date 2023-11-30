import styled from 'styled-components';

export const Container = styled.article`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;

  width: 100%;
  min-width: 900px;
  max-width: ${({ theme }) => theme.maxWidth};
  height: 100%;
  padding: 1rem 0;
`;

interface HeaderProps {
  isadopted: string;
}

export const Header = styled.div<HeaderProps>`
  display: flex;
  justify-content: space-between;
  position: relative;

  height: 100%;
  align-items: center;
  color: ${({ theme }) => theme.color.mainColor.blueMain};
  border-bottom: ${({ isadopted }) =>
    isadopted === 'false' ? '0.25rem solid' : 'none'};

  > div {
    font-weight: 900;
    font-size: 4rem;
    margin-bottom: 1rem;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-top: 2rem;
  }
`;

export const AdoptedBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  position: absolute;
  left: 4rem;
  bottom: 1rem;

  > span {
    margin-top: 0.1rem;
    ${({ theme }) => theme.font.bold16}
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

export const LikeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  > svg {
    cursor: pointer;
  }
`;
