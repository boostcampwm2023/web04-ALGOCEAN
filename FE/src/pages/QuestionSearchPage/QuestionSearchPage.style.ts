import styled from 'styled-components';

export const Main = styled.main`
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  padding: 2rem 3rem;
`;

export const InnerDiv = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
`;

export const Header = styled.header`
  ${({ theme }) => theme.font.bold24};
  color: ${({ theme }) => theme.color.grayscale.black};
  margin-bottom: 3rem;
`;

export const Label = styled.label`
  margin-top: 1rem;
  ${({ theme }) => theme.font.bold16};
  color: ${({ theme }) => theme.color.grayscale[500]};
`;
