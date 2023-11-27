import styled from 'styled-components';

interface ContainerProps {
  isSelect: boolean;
  isInteractive: boolean;
}

export const Container = styled.button<ContainerProps>`
  height: 2rem;
  padding: 0.3rem 1rem;
  border-radius: 1rem;
  border: none;
  box-shadow: ${({ isSelect, theme }) =>
    isSelect ? `0 0 0 1px ${theme.color.grayscale.black} inset` : 'none'};
  background-color: ${({ isSelect, theme }) =>
    isSelect ? theme.color.grayscale.white : theme.color.grayscale[50]};
  color: ${({ isSelect, theme }) =>
    isSelect ? theme.color.grayscale.black : theme.color.grayscale[200]};
  ${({ theme }) => theme.font.medium14}
  cursor: ${({ isInteractive }) => (isInteractive ? 'pointer' : 'default')};
`;
