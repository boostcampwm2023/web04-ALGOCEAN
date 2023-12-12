import styled from 'styled-components';

export const Container = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 3rem;
  margin: 1rem 0;
  padding: 0 0.5rem;
  border-radius: 0.5rem;

  &:last-of-type {
    margin: 0;
  }

  > div {
    width: 5rem;
    text-align: center;
    cursor: default;
  }

  > div:first-of-type {
    text-align: left;
  }

  > div:nth-of-type(2) {
    ${({ theme }) => theme.font.bold16}
    text-align: left;
    cursor: pointer;
    margin-right: auto;
    width: fit-content;

    &:hover {
      text-decoration: underline;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.grayscale[50]};
  }
`;
