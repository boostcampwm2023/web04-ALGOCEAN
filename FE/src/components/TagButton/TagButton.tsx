import { useState } from 'react';
import { TagbuttonProps } from '../../types/type';
import { Container } from './TagButton.styles';

const TagButton = ({
  content,
  initialState = 'select',
  isInteractive = true,
  handleToggle,
}: TagbuttonProps) => {
  const [isSelected, setIsSelected] = useState(initialState === 'select');

  const handleButtonState = () => {
    if (!isInteractive) {
      return;
    }

    setIsSelected((prevIsSelectedValue) => !prevIsSelectedValue);

    if (handleToggle) {
      handleToggle(!isSelected);
    }
  };

  return (
    <Container
      isselected={String(isSelected)}
      isinteractive={String(isInteractive)}
      onClick={handleButtonState}
    >
      {content}
    </Container>
  );
};

export default TagButton;
