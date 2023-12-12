import styled from 'styled-components';

export const Pagination = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;

  > * {
    cursor: pointer;
  }

  .page-list {
    display: flex;
    gap: 0.5rem;
    font-weight: 300;

    li {
      width: 1.7rem;
      height: 1.7rem;
      border-radius: 50%;
      line-height: 100%;
      text-align: center;
      padding-top: 0.25rem;
      transition: 0.1s ease-in all;
    }
    .current,
    :hover {
      color: var(--color-grayscale-white);
      background-color: var(--color-blue-50);
    }
  }

  button {
    background: none;
    border: none;
  }
`;
