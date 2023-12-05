import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  height: 18rem;
  padding: 1rem;
`;

export const Topic = styled.p`
  ${({ theme }) => theme.font.bold24}
  color:${({ theme }) => theme.color.system.info};
`;

export const QuestionListDiv = styled.div`
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
    width: 50%;
  }
  :nth-child(2) {
    width: 8%;
  }
  :nth-child(3) {
    width: 8%;
  }
  :nth-child(4) {
    width: 6%;
  }
  :nth-child(5) {
    width: 6%;
  }
  :nth-child(6) {
    width: 10%;
  }
`;

export const ContentDiv = styled.div`
  display: flex;
  ${({ theme }) => theme.font.light14}
  padding: 0.4rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayscale[100]};
  color: ${({ theme }) => theme.color.grayscale[400]};
  gap: 3%;
  :nth-child(n) {
    text-align: center;
  }
  :nth-child(1) {
    width: 50%;
    text-align: left;
    ${({ theme }) => theme.font.bold14}
    color: ${({ theme }) => theme.color.grayscale.black};
  }
  :nth-child(2) {
    width: 8%;
  }
  :nth-child(3) {
    width: 8%;
  }
  :nth-child(4) {
    width: 6%;
  }
  :nth-child(5) {
    width: 6%;
  }
  :nth-child(6) {
    width: 10%;
  }
`;
