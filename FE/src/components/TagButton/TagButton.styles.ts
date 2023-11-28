import styled from 'styled-components';

interface ContainerProps {
  isSelected: boolean;
  isInteractive: boolean;
}

export const Container = styled.button<ContainerProps>`
  height: 2rem;
  padding: 0.3rem 1rem;
  border-radius: 1rem;
  border: none;
  box-shadow: ${({ isSelected, theme }) =>
    isSelected ? `0 0 0 1px ${theme.color.grayscale.black} inset` : 'none'};
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.color.grayscale.white : theme.color.grayscale[50]};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.color.grayscale.black : theme.color.grayscale[200]};
  ${({ theme }) => theme.font.medium14}
  cursor: ${({ isInteractive }) => (isInteractive ? 'pointer' : 'default')};
`;
