import styled from 'styled-components';

export const MainNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 3.2rem;
  padding: 0 3rem;
  border-bottom: 1px solid var(--color-grayscale-100);
  background-color: var(--color-grayscale-white);

  ol {
    display: flex;
    align-items: center;
    gap: 2rem;

    li {
      font-size: 0.9rem;
      font-weight: 400;
      color: var(--color-grayscale-200);
      cursor: pointer;
    }
    li[class='selected'],
    li:hover {
      text-decoration: underline;
      color: var(--color-grayscale-black);
      font-weight: 700;
      cursor: pointer;
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    height: 100%;
    border: none;
    padding: 0 1.5rem;
    color: var(--color-grayscale-white);
    background-color: var(--color-blue-100);

    img {
      height: 1rem;
      aspect-ratio: 1/1;
    }

    span {
      position: relative;
      top: -0.1rem;
    }
  }
`;
