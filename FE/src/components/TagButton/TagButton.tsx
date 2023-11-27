import { useState } from 'react';
import { TagbuttonProps } from '../../types/type';
import { Container } from './TagButton.styles';

const TagButton = ({
  content,
  initialState = 'select',
  isInteractive = true,
  handleToggle,
}: TagbuttonProps) => {
  const [isSelect, setIsSelect] = useState(initialState === 'select');

  const handleButtonState = () => {
    if (!isInteractive) {
      return;
    }

    setIsSelect((v) => !v);

    if (handleToggle) {
      handleToggle(!isSelect);
    }
  };

  return (
    <Container
      isSelect={isSelect}
      isInteractive={isInteractive}
      onClick={handleButtonState}
    >
      {content}
    </Container>
  );
};

export default TagButton;
