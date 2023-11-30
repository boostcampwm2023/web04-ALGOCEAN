import styled, { css } from 'styled-components';

interface ContainerProps {
  styletype: 'fill' | 'stroke';
}

const fillTypeStyle = css`
  color: ${({ theme }) => theme.color.grayscale.white};
  background-color: ${({ theme }) => theme.color.mainColor.blueMain};

  &:hover {
    background-color: ${({ theme }) => theme.color.mainColor.blueLight};
  }
`;

const strokeTypeStyle = css`
  color: ${({ theme }) => theme.color.mainColor.blueMain};
  background-color: ${({ theme }) => theme.color.grayscale.white};
  border: 1px solid;

  &:hover {
    background-color: ${({ theme }) => theme.color.grayscale[50]};
  }
`;

export const Container = styled.button<ContainerProps>`
  width: 17rem;
  height: 3rem;
  border-radius: 0.25rem;
  ${({ theme }) => theme.font.medium16}
  transition: 0.1s ease-in all;

  ${({ styletype }) =>
    styletype === 'fill' ? fillTypeStyle : strokeTypeStyle};
`;
