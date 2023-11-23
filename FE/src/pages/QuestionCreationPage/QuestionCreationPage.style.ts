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
  max-width: var(--max-width);
`;

export const Header = styled.header``;

export const Form = styled.form`
  display: flex;
  gap: 3rem;
  ${({ theme }) => theme.font.bold24}
`;

export const Aside = styled.aside`
  background-color: red;
  width: 15rem;
`;

export const ContentDiv = styled.div`
  flex: 1;
`;
