import styled from 'styled-components';

export const MainNav = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 4rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.grayscale[100]};
  padding: 0 3rem;

  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    max-width: ${({ theme }) => theme.maxWidth};
  }
  ol {
    display: flex;
    align-items: center;
    gap: 2rem;

    li {
      color: ${({ theme }) => theme.color.grayscale[400]};
      ${({ theme }) => theme.font.medium16}
      cursor: pointer;

      a {
        text-decoration: none;
        color: inherit;
      }
    }
    li[class='selected'],
    li:hover {
      border-bottom: 2px solid;
      color: ${({ theme }) => theme.color.grayscale.black};
      font-weight: 700;
      cursor: pointer;
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    height: 3.2rem;
    border: none;
    border-radius: 0.25rem;
    padding: 0 1rem;
    color: ${({ theme }) => theme.color.grayscale.white};
    background: ${({ theme }) => theme.color.mainColor.blueGradient};
    opacity: 90%;
    transition: 0.2s ease-in all;

    &:hover {
      opacity: 100%;
      transform: translateY(-0.2rem);
    }
    img {
      height: 1.25rem;
      aspect-ratio: 1/1;
    }

    span {
      ${({ theme }) => theme.font.medium16}
    }
  }
`;
