import styled from 'styled-components';

export const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: default;

  img {
    width: 2.3rem;
    height: 2.3rem;
  }

  h1 {
    position: relative;
    top: 0.2rem;
    color: var(--color-blue-100);
    font-size: 1.75rem;
    font-weight: 900;
  }
`;

export const Searchbar = styled.form`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 25rem;
  height: 2.5rem;
  padding: 0 1rem;
  border: 1px solid var(--color-blue-100);
  border-radius: 0.25rem;

  label {
    display: none;
  }
  input {
    flex: 1;
    height: 1.5rem;
    border: none;
    ::placeholder {
      color: var(--color-grayscale-100);
    }
    &:focus {
      outline: none;
    }
  }
  button {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    padding: 0;
    border: none;
    background: none;

    img {
      width: 100%;
      aspect-ratio: 1/1;
    }
  }
`;

export const Container = styled.header`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  width: 100%;
  height: 5rem;
  padding: 0 3rem;
  border-bottom: 1px solid var(--color-grayscale-100);
  background-color: var(--color-grayscale-white);
`;
