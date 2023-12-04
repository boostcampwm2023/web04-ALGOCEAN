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
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 30rem;

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
  }

  input {
    border: 1px solid;
    border-radius: 0.25rem;
  }

  small {
    color: ${({ theme }) => theme.color.system.alert};
  }
`;
