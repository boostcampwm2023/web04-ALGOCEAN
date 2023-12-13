import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  height: fit-content;
  background-color: ${({ theme }) => theme.color.grayscale[50]};
  margin-bottom: 6rem;

  > * {
    background-color: ${({ theme }) => theme.color.grayscale.white};
  }
`;

export const AnswerContainer = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column-reverse;
  gap: 2rem;
  width: 100%;

  > * {
    background-color: ${({ theme }) => theme.color.grayscale.white};
  }
`;

export const NoAnswer = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.color.grayscale[200]};
`;
