import styled, { css } from 'styled-components';

interface ContainerProps {
  ismydata: boolean;
}

const myDataStyle = css`
  border: 1px solid ${({ theme }) => theme.color.mainColor.blueMain};
`;

export const Container = styled.li<ContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 3rem;
  margin: 1rem 0;
  padding: 0 0.5rem;
  border-radius: 0.5rem;

  ${({ ismydata }) => (ismydata ? myDataStyle : '')}

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
