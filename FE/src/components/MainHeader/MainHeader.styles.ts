import styled from 'styled-components';

export const Logo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.2rem;

  img {
    width: 2rem;
    height: 2rem;
  }

  h1 {
    position: relative;
    top: 0.2rem;
    color: ${({ theme }) => theme.color.mainColor.blueMain};
    ${({ theme }) => theme.font.bold24};
    font-size: 1.7rem;
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
  border: 1px solid ${({ theme }) => theme.color.mainColor.blueLight};
  border-radius: 0.25rem;

  &:focus-within {
    border: 1px solid ${({ theme }) => theme.color.mainColor.blueMain};
    outline: 1px solid ${({ theme }) => theme.color.mainColor.blueMain};
  }
`;

export const SearchbarLabel = styled.label`
  display: none;
`;

export const SearchbarInput = styled.input`
  flex: 1;
  height: 1.5rem;
  border: none;
  ${({ theme }) => theme.font.medium14}

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale[100]};
    ${({ theme }) => theme.font.light14}
  }

  &:focus {
    outline: none;
  }
`;

export const SearchbarButton = styled.button`
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
`;

export const MainHeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  width: 100%;
  height: 4rem;
  padding: 0 3rem;

  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    height: 100%;
    max-width: ${({ theme }) => theme.maxWidth};
  }
`;
