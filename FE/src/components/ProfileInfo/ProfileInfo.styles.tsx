import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  width: 100%;
  gap: 5%;
  height: 15rem;
  border: 5px solid ${({ theme }) => theme.color.mainColor.blueOutline};
`;

export const PersonalInfoLeftDiv = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  gap: 1rem;
`;

export const ProfileImage = styled.img`
  width: 50%;
`;

export const Nickname = styled.p`
  ${({ theme }) => theme.font.bold24}
`;

export const Rank = styled.p`
  ${({ theme }) => theme.font.medium16}
`;

export const PersonalInfoRightDiv = styled.div`
  width: 30%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > div {
    margin-bottom: 0.5rem;
    display: flex;
    gap: 3rem;
    justify-content: space-between;
  }
`;

export const Topic = styled.p`
  ${({ theme }) => theme.font.bold16}
`;

export const Content = styled.p`
  ${({ theme }) => theme.font.medium16}
`;

// 추후에 수정
export const PointMarket = styled.button`
  width: 30%;
  background-color: ${({ theme }) => theme.color.mainColor.blueFocus};
  font-size: 3rem;
  padding: 1rem;
  align-self: center;
`;
