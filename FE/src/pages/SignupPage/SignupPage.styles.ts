import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 3rem 0;
  padding: 0 3rem;
`;

export const Inner = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 30rem;
  position: relative;

  > * {
    height: 3rem;
    margin-bottom: 2rem;
  }

  > label {
    height: 1.5rem;
    margin-bottom: 1rem;
  }

  small {
    position: absolute;
    top: 8.25rem;
    left: 6rem;
    margin-bottom: 0;
    color: ${({ theme }) => theme.color.system.info};
  }

  button {
    color: white;
    background: ${({ theme }) => theme.color.mainColor.blueGradient};
    border-radius: 0.25rem;
  }

  button:first-of-type {
    background: ${({ theme }) => theme.color.mainColor.blueMain};
  }

  button:first-of-type {
    width: 5rem;
  }

  input {
    border: 1px solid;
    border-radius: 0.25rem;
  }

  p {
    color: ${({ theme }) => theme.color.system.alert};
  }
`;
