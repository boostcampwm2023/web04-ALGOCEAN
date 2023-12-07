import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  text-align: center;

  div {
    font-size: 8rem;
    font-weight: 500;
    color: ${({ theme }) => theme.color.mainColor.blueMain};
    span {
      font-size: 11rem;
      font-weight: 900;
      position: relative;
      top: 1rem;
    }
  }
  p {
    margin-top: 3rem;
    ${({ theme }) => theme.font.medium16}
  }
  small {
    margin-top: 1rem;
    ${({ theme }) => theme.font.light16}

    span {
      padding: 0 0.2rem;
      font-weight: 700;
    }
  }
`;
