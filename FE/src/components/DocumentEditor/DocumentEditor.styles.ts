import styled from 'styled-components';

export const EditorWrapper = styled.div`
  .wrapper-class {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 1rem;
    background-color: ${({ theme }) => theme.color.grayscale.white};
  }
  .editor {
    height: 31.25rem;
    border: 1px solid ${({ theme }) => theme.color.grayscale[50]};
    padding: 5px;
    border-radius: 0.4rem;
  }
  .toolbar-class {
    border: 1px solid ${({ theme }) => theme.color.grayscale[50]};
  }
`;
