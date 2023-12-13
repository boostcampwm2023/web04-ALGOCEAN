import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  height: 22rem;
  padding: 1rem;
`;

export const Topic = styled.p`
  ${({ theme }) => theme.font.bold24}
  color:${({ theme }) => theme.color.system.info};
`;

export const AnswerListDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderDiv = styled.div`
  display: flex;
  ${({ theme }) => theme.font.bold14}
  padding: 0.4rem 0;
  border-top: 2px solid ${({ theme }) => theme.color.grayscale[100]};
  border-bottom: 2px solid ${({ theme }) => theme.color.grayscale[100]};
  gap: 3%;
  :nth-child(n) {
    text-align: center;
  }
  :nth-child(1) {
    width: 78%;
  }
  :nth-child(2) {
    width: 8%;
  }
  :nth-child(3) {
    width: 8%;
  }
`;

export const ContentDiv = styled.div`
  display: flex;
  ${({ theme }) => theme.font.light14}
  padding: 0.4rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayscale[100]};
  color: ${({ theme }) => theme.color.grayscale[400]};
  gap: 3%;
  > :nth-child(n) {
    text-align: center;
  }
  > :nth-child(1) {
    width: 78%;
  }
  > :nth-child(2) {
    width: 8%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > :nth-child(3) {
    width: 8%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const TitleText = styled.p`
  ${({ theme }) => theme.font.bold14}
  color: ${({ theme }) => theme.color.grayscale.black};
  text-align: left;
`;

export const ContentText = styled.p`
  ${({ theme }) => theme.font.medium14}
  color: ${({ theme }) => theme.color.grayscale[500]};
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /* WebKit 기반 브라우저를 위한 설정 */
  -webkit-line-clamp: 2; /* 최대 2줄을 보이도록 함 */
  -webkit-box-orient: vertical; /* 수직 방향으로 정렬 */
`;
