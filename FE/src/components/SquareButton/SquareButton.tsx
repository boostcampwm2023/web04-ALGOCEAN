import React from 'react';
import { SquareButtonProps } from '../../types/type.d';
import { Container } from './SquareButton.styles';

const SquareButton = ({
  content,
  type = 'fill',
  handleClick,
}: SquareButtonProps) => {
  const onButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (handleClick) {
      handleClick();
    }
  };

  return (
    <Container styletype={type} onClick={onButtonClick}>
      {content}
    </Container>
  );
};

export default SquareButton;
