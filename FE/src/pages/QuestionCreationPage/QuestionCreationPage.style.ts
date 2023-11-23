import styled from 'styled-components';

interface TagButtonProps {
  $isactive: boolean;
}

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

export const Header = styled.header`
  ${({ theme }) => theme.font.bold24};
  ${({ theme }) => theme.color.grayscale.black};
  margin-bottom: 2rem;
`;

export const Form = styled.form`
  display: flex;
  gap: 3rem;
  ${({ theme }) => theme.font.bold24};
`;

export const Aside = styled.aside`
  width: 15rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  > button {
    cursor: pointer;
    padding: 0.75rem 3rem;
    ${({ theme }) => theme.font.medium16};
    border: 1px solid ${({ theme }) => theme.color.mainColor.blueMain};
    border-radius: 4px;
    &:first-child {
      background-color: ${({ theme }) => theme.color.mainColor.blueMain};
      color: ${({ theme }) => theme.color.grayscale.white};
    }
    &:nth-child(2) {
      background-color: ${({ theme }) => theme.color.grayscale.white};
      color: ${({ theme }) => theme.color.mainColor.blueMain};
    }
    &:nth-child(3) {
      width: 6rem;
      height: 1.5rem;
      padding: 0;
      border: none;
      background-color: transparent;
      ${({ theme }) => theme.font.light16};
      color: ${({ theme }) => theme.color.grayscale[200]};
    }
  }
`;

export const ContentDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Label = styled.label`
  margin-top: 1rem;
  ${({ theme }) => theme.font.bold16};
  ${({ theme }) => theme.color.grayscale[500]};
`;

export const Input = styled.input`
  height: 2.5rem;
  ${({ theme }) => theme.font.medium16};
  ${({ theme }) => theme.color.grayscale.black};
  border: 2px solid ${({ theme }) => theme.color.grayscale[100]};
  border-radius: 0.4rem;
  padding-left: 0.5rem;
  &:focus {
    border-color: ${({ theme }) => theme.color.mainColor.blueOutline};
    outline: none;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const TagButton = styled.button<TagButtonProps>`
  height: 2rem;
  padding: 0 0.8rem;
  cursor: pointer;
  border: ${({ $isactive, theme }) =>
    $isactive ? `1px ${theme}.color.grayscale.black` : '1px solid transparent'};
  border-radius: 1rem;
  background-color: ${({ $isactive, theme }) =>
    $isactive ? theme.color.grayscale.white : theme.color.grayscale[50]};
  color: ${({ $isactive, theme }) =>
    $isactive ? theme.color.grayscale.black : theme.color.grayscale[200]};
`;
