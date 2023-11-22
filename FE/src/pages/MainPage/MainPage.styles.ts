import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  padding: 2rem 3rem;

  > .inner {
    display: flex;
    gap: 2rem;
    width: 100%;
    max-width: var(--max-width);

    > div {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      flex: 1;
      width: 1px;
    }

    > aside {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      flex-shrink: 0;
      width: 23rem;
      min-height: 100%;

      > .banner {
        width: 100%;
        height: 10rem;
        object-fit: cover;
      }
    }
  }
`;
