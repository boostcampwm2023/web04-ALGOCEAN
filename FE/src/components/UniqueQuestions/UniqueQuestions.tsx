import { useNavigate } from 'react-router-dom';
import { UniqueQuestionItem as Item } from '../../types/type';
import {
  ItemContainer,
  ItemTitle,
  ItemContent,
  ItemIcon,
  UniqueQuestionsContainer,
} from './UniqueQuestions.styles';

const itemTypeInfo = {
  hot: {
    title: '조회수 급상승 질문',
    imageUrl: '/images/fire.png',
  },
  today: {
    title: '오늘의 질문',
    imageUrl: '/images/clock.png',
  },
  random: {
    title: '랜덤 질문',
    imageUrl: '/images/link.png',
  },
};

function Item({ type, title: content, id }: Item) {
  const { title, imageUrl } = itemTypeInfo[type];

  const navigate = useNavigate();

  const handleNavigate = (questionId: number) => {
    navigate(`/question/${questionId}`);
  };

  return (
    <ItemContainer $type={type} onClick={() => handleNavigate(id)}>
      <ItemTitle>{title}</ItemTitle>
      <ItemContent>{content}</ItemContent>
      <ItemIcon src={imageUrl} alt={title} />
    </ItemContainer>
  );
}

export function UniqueQuestions({ questions }: { questions: Item[] }) {
  return (
    <UniqueQuestionsContainer>
      {questions?.map(({ type, title, id }, idx) => (
        <Item key={idx} type={type} title={title} id={id} />
      ))}
    </UniqueQuestionsContainer>
  );
}
