import styled from 'styled-components';

export const LoginContainer = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.color.grayscale[400]};
  text-align: center;

  > div {
    ${({ theme }) => theme.font.light14}
    margin-bottom: 0.5rem;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 3rem;

  color: ${({ theme }) => theme.color.grayscale.white};
  background-color: ${({ theme }) => theme.color.mainColor.blueMain};
  ${({ theme }) => theme.font.medium16};
  border: none;
  border-radius: 0.25rem;

  transition: 0.2s ease-in all;
  opacity: 80%;

  &:hover {
    transform: translateY(-0.2rem);
    opacity: 100%;
  }
`;

export const QuestionProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  width: 20rem;
  padding: 2rem 1.5rem 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.color.grayscale[50]};
`;

export const Signup = styled.div`
  margin-top: 1rem;
  cursor: pointer;
`;
