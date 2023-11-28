import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  height: fit-content;
  background-color: ${({ theme }) => theme.color.grayscale[50]};

  > * {
    background-color: ${({ theme }) => theme.color.grayscale.white};
  }
`;
