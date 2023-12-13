import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 30rem;
  padding: 3rem;
`;

export const Inner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  > * {
    height: 3rem;
    margin-bottom: 2rem;
  }

  > label {
    height: 1.5rem;
    margin-bottom: 1rem;
  }

  button {
    color: white;
    background: ${({ theme }) => theme.color.mainColor.blueGradient};
    border-radius: 0.25rem;
    transition: 0.15s ease-in all;

    &:hover {
      opacity: 80%;
    }
  }

  input {
    border: 1px solid ${({ theme }) => theme.color.grayscale[200]};
    border-radius: 0.25rem;
    transition: 0.15s ease-in outline;

    &:focus {
      border: 1.5px solid ${({ theme }) => theme.color.mainColor.blueMain};
      outline: none;
    }
  }

  small {
    color: ${({ theme }) => theme.color.system.alert};
  }
`;

export const SocialContainer = styled.div`
  width: 100%;
  text-align: center;

  p {
    margin-bottom: 2rem;
    ${({ theme }) => theme.font.light14}
  }

  button {
    position: relative;
    text-align: center;
    width: 100%;
    height: 3rem;
    padding: 0.5rem 0;
    border-radius: 0.25rem;
    background-color: ${({ theme }) => theme.color.grayscale.black};
    color: ${({ theme }) => theme.color.grayscale.white};
    ${({ theme }) => theme.font.medium16}
    transition: 0.15s ease-in all;

    &:hover {
      opacity: 80%;
    }
  }

  img {
    position: absolute;
    width: 1.8rem;
    aspect-ratio: 1/1;
    top: 0.6rem;
    left: 2rem;
  }
`;
