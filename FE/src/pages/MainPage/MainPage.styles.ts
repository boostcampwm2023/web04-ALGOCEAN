import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 3rem 0;
  padding: 0 3rem;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
`;

export const HeroBanner = styled.section`
  display: flex;
  gap: 2rem;
  width: 100%;
`;

export const Main = styled.section`
  width: 100%;
`;
