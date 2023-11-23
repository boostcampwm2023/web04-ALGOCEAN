import styled from 'styled-components';

export const Login = styled.div`
  width: 100%;
  color: var(--color-grayscale-200);
  font-size: 0.9rem;
  font-weight: 300;

  button {
    border: none;
    background: none;
    cursor: pointer;

    &:hover {
      font-weight: 500;
    }
  }

  .login-button {
    width: 100%;
    padding: 1rem;
    text-align: center;
    background-color: var(--color-blue-100);
    opacity: 80%;
    border: none;
    border-radius: 0.25rem;
    color: white;
    font-size: 1.1rem;
    margin: 0.8rem 0;
    transition: 0.2s ease-in all;

    &:hover {
      transform: translateY(-0.2rem);
      opacity: 100%;
    }
  }

  .signup-button {
    color: var(--color-blue-50);
    font-size: inherit;
    font-weight: inherit;
  }
`;

export const UserQuestion = styled.section`
  width: 100%;
  padding: 2.5rem 1rem;
  border-radius: 1rem;
  background-color: var(--color-grayscale-white);
`;
