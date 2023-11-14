import * as S from './UniqueQuestions.styles';

interface Item {
  type: 'today' | 'hot' | 'random';
  title: string;
  url: string;
}

const typeInfo = {
  hot: {
    title: '조회수 급상승 질문',
    emoji: '🔥',
    color: '#4B91FF',
  },
  today: {
    title: '오늘의 질문',
    emoji: '🕔',
    color: '#7572FF',
  },
  random: {
    title: '랜덤 질문',
    emoji: '🔗',
    color: '#A160FF',
  },
};

function Item({ type, title: questionTime, url }: Item) {
  const { title, emoji, color } = typeInfo[type];

  return (
    <S.Item bgColor={color} data-url={url}>
      <h3>{title}</h3>
      <div>{questionTime}</div>
      <span>{emoji}</span>
    </S.Item>
  );
}

export function UniqueQuestions({ questions }: { questions: Item[] }) {
  return (
    <S.UniqueQuestions>
      {questions.map(({ type, title, url }) => (
        <Item type={type} title={title} url={url} />
      ))}
    </S.UniqueQuestions>
  );
}
