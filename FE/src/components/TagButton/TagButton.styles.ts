import styled from 'styled-components';

interface ContainerProps {
  isselected: string;
  isinteractive: string;
}

export const Container = styled.button<ContainerProps>`
  height: 2rem;
  padding: 0.3rem 1rem;
  border-radius: 1rem;
  border: none;
  box-shadow: ${({ isselected, theme }) =>
    isselected === 'true'
      ? `0 0 0 1px ${theme.color.grayscale.black} inset`
      : 'none'};
  background-color: ${({ isselected, theme }) =>
    isselected === 'true'
      ? theme.color.grayscale.white
      : theme.color.grayscale[50]};
  color: ${({ isselected, theme }) =>
    isselected === 'true'
      ? theme.color.grayscale.black
      : theme.color.grayscale[200]};
  ${({ theme }) => theme.font.medium14}
  cursor: ${({ isinteractive }) =>
    isinteractive === 'true' ? 'pointer' : 'default'};
`;
